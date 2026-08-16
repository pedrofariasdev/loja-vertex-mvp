import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase/server";
import { createOrder as createPrintfulOrder } from "@/lib/printful";
import { sendOrderConfirmationEmail } from "@/lib/email";

/**
 * Webhook da Stripe. Escuta `checkout.session.completed`:
 * 1. Atualiza a encomenda em Supabase de "pending" para "paid".
 * 2. Cria a encomenda de produção na Printful (como rascunho — `confirm: false` —
 *    para permitirmos uma revisão manual antes de entrar em produção enquanto
 *    estamos a validar o fluxo).
 *
 * Configuração necessária no painel da Stripe (Developers → Webhooks):
 *   URL:    https://www.vertexwear.site/api/webhooks/stripe
 *   Evento: checkout.session.completed
 * O "Signing secret" gerado deve ser colocado em STRIPE_WEBHOOK_SECRET.
 */

type StripeAddress = {
  city: string | null;
  country: string | null;
  line1: string | null;
  line2: string | null;
  postal_code: string | null;
  state: string | null;
} | null;

type ShippingDetails = { name: string | null; address: StripeAddress } | null;

export async function POST(request: NextRequest) {
  const signature = request.headers.get("stripe-signature");
  const rawBody = await request.text();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !secret) {
    return NextResponse.json(
      { error: "Webhook não configurado." },
      { status: 400 }
    );
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, secret);
  } catch (err) {
    console.error("Assinatura do webhook inválida:", err);
    return NextResponse.json({ error: "Assinatura inválida." }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const orderId = session.metadata?.order_id;
  if (!orderId) {
    console.error("Sessão Stripe sem order_id nos metadados:", session.id);
    return NextResponse.json({ received: true });
  }

  const supabase = createServiceClient();

  // Se foi usado um código promocional (ex.: de uma influencer), descobrimos
  // qual foi — `total_details.breakdown.discounts` só vem preenchido pedindo
  // expand explicitamente; a sessão do próprio evento do webhook não o traz.
  let usedPromotionCodeId: string | null = null;
  try {
    const sessionWithDiscounts = await stripe.checkout.sessions.retrieve(
      session.id,
      { expand: ["total_details.breakdown.discounts"] }
    );
    const discounts = (
      sessionWithDiscounts as unknown as {
        total_details?: {
          breakdown?: {
            discounts?: Array<{
              discount?: { promotion_code?: string | null };
            }>;
          };
        };
      }
    ).total_details?.breakdown?.discounts;
    usedPromotionCodeId = discounts?.[0]?.discount?.promotion_code ?? null;
  } catch (err) {
    console.error("Não consegui verificar o código promocional da sessão:", err);
  }

  // A morada de entrega vem em `collected_information.shipping_details`
  // nesta versão da API da Stripe (não é um campo de topo da sessão).
  const shippingDetails =
    (
      session as unknown as {
        collected_information?: { shipping_details?: ShippingDetails };
      }
    ).collected_information?.shipping_details ?? null;
  const address: StripeAddress =
    shippingDetails?.address ?? session.customer_details?.address ?? null;

  const paymentIntentId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent?.id ?? null;

  const { data: order, error: fetchError } = await supabase
    .from("orders")
    .update({
      status: "paid",
      stripe_payment_intent_id: paymentIntentId,
      customer_email: session.customer_details?.email ?? null,
      customer_name:
        shippingDetails?.name ?? session.customer_details?.name ?? null,
      shipping_address: address,
      total_cents: session.amount_total,
      updated_at: new Date().toISOString(),
    })
    .eq("id", orderId)
    .select("*")
    .single();

  if (fetchError || !order) {
    console.error("Não encontrei a encomenda para atualizar:", orderId, fetchError);
    return NextResponse.json({ received: true });
  }

  // Itens da encomenda com detalhes de produto/variante — usados quer para
  // criar a encomenda na Printful, quer para o email de confirmação abaixo.
  const { data: orderItems, error: itemsError } = await supabase
    .from("order_items")
    .select(
      "quantity, unit_price_cents, product_variants(printful_variant_id, size, color, products(name))"
    )
    .eq("order_id", orderId);

  if (itemsError || !orderItems || orderItems.length === 0) {
    console.error("Não encontrei os itens da encomenda:", orderId, itemsError);
  }

  // Cria a encomenda de produção na Printful, como rascunho para revisão manual.
  try {
    if (!orderItems || orderItems.length === 0 || !address) {
      throw new Error(
        `Faltam itens/morada para criar a encomenda na Printful (${itemsError?.message ?? "sem itens"}).`
      );
    }

    const printfulItems = orderItems
      .map((item) => {
        const variant = item.product_variants as unknown as {
          printful_variant_id: string | null;
        } | null;
        return variant?.printful_variant_id
          ? {
              sync_variant_id: Number(variant.printful_variant_id),
              quantity: item.quantity,
            }
          : null;
      })
      .filter((i): i is { sync_variant_id: number; quantity: number } => !!i);

    if (printfulItems.length === 0) {
      throw new Error("Nenhum item tem ID de variante Printful associado.");
    }

    const printfulOrder = (await createPrintfulOrder({
      recipient: {
        name: order.customer_name,
        address1: address.line1,
        address2: address.line2 ?? undefined,
        city: address.city,
        state_code: address.state ?? undefined,
        country_code: address.country,
        zip: address.postal_code,
        email: order.customer_email,
        phone: session.customer_details?.phone ?? undefined,
      },
      items: printfulItems,
      confirm: false,
      ...(order.is_gift && order.gift_message
        ? {
            packing_slip: {
              message: order.gift_message,
              store_name: "VERTEX",
            },
          }
        : {}),
    })) as { id?: number };

    await supabase
      .from("orders")
      .update({
        status: "fulfilling",
        printful_order_id: printfulOrder?.id ? String(printfulOrder.id) : null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", orderId);
  } catch (err) {
    console.error("Erro ao criar encomenda na Printful:", err);
    await supabase
      .from("orders")
      .update({
        status: "failed",
        printful_error: (err as Error).message,
        updated_at: new Date().toISOString(),
      })
      .eq("id", orderId);
  }

  // Credita pontos à influencer, se a encomenda usou o código dela.
  // Pontos = 10% do subtotal dos produtos (antes de portes), 1 ponto = 1 cêntimo.
  if (usedPromotionCodeId) {
    try {
      const { data: influencer } = await supabase
        .from("influencers")
        .select("id, points_cents, lifetime_sales_cents")
        .eq("stripe_promotion_code_id", usedPromotionCodeId)
        .maybeSingle();

      if (influencer) {
        const subtotalCents = session.amount_subtotal ?? 0;
        const pointsEarned = Math.round(subtotalCents * 0.1);

        await supabase
          .from("influencers")
          .update({
            points_cents: influencer.points_cents + pointsEarned,
            lifetime_sales_cents:
              influencer.lifetime_sales_cents + subtotalCents,
            updated_at: new Date().toISOString(),
          })
          .eq("id", influencer.id);

        await supabase
          .from("orders")
          .update({
            influencer_id: influencer.id,
            influencer_points_earned_cents: pointsEarned,
          })
          .eq("id", orderId);
      }
    } catch (err) {
      console.error("Erro ao creditar pontos de influencer:", err);
    }
  }

  // Envia o email de confirmação ao cliente. Não bloqueia nem falha o
  // webhook — a encomenda já está paga independentemente do email sair.
  if (order.customer_email && orderItems && orderItems.length > 0) {
    const emailItems = orderItems.map((item) => {
      const variant = item.product_variants as unknown as {
        size: string | null;
        color: string | null;
        products: { name: string } | null;
      } | null;
      return {
        productName: variant?.products?.name ?? "VERTEX",
        variantLabel: [variant?.color, variant?.size].filter(Boolean).join(" / "),
        quantity: item.quantity,
        unitPriceCents: item.unit_price_cents,
      };
    });

    await sendOrderConfirmationEmail({
      orderId: order.id,
      customerEmail: order.customer_email,
      customerName: order.customer_name,
      items: emailItems,
      totalCents: order.total_cents,
      currency: order.currency,
      shippingAddress: address
        ? {
            line1: address.line1,
            line2: address.line2,
            city: address.city,
            postalCode: address.postal_code,
            country: address.country,
          }
        : null,
      isGift: order.is_gift,
      giftMessage: order.gift_message,
    });
  }

  return NextResponse.json({ received: true });
}
