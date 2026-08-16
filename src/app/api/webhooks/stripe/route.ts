import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase/server";
import { createOrder as createPrintfulOrder } from "@/lib/printful";

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

type OrderItem = {
  variantId: string;
  printfulVariantId: string | null;
  productName: string;
  variantLabel: string;
  quantity: number;
  priceCents: number;
  currency: string;
};

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

  const { data: order, error: fetchError } = await supabase
    .from("orders")
    .update({
      status: "paid",
      customer_email: session.customer_details?.email ?? null,
      customer_name:
        shippingDetails?.name ?? session.customer_details?.name ?? null,
      shipping_address: address,
      shipping_cents: session.total_details?.amount_shipping ?? null,
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

  // Cria a encomenda de produção na Printful, como rascunho para revisão manual.
  try {
    const items = (order.items as OrderItem[]).filter((i) => i.printfulVariantId);

    if (items.length === 0 || !address) {
      throw new Error("Faltam itens com ID Printful ou morada de entrega.");
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
      },
      items: items.map((i) => ({
        sync_variant_id: Number(i.printfulVariantId),
        quantity: i.quantity,
      })),
      confirm: false,
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

  return NextResponse.json({ received: true });
}
