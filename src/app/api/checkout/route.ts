import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase/server";

/** Países para os quais aceitamos morada de entrega, por agora. */
const ALLOWED_COUNTRIES: string[] = [
  "PT", "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE",
  "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "RO", "SK",
  "SI", "ES", "SE",
];

const PT_SHIPPING_CENTS = 490;
const PT_FREE_THRESHOLD_CENTS = 5000;
const EU_SHIPPING_CENTS = 590;
const EU_FREE_THRESHOLD_CENTS = 7000;

type CheckoutItem = { variantId: string; quantity: number };

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const requestedItems: CheckoutItem[] = Array.isArray(body?.items)
      ? body.items
      : [];

    if (requestedItems.length === 0) {
      return NextResponse.json(
        { error: "Carrinho vazio." },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();

    // Nunca confiar em preços vindos do cliente — vamos buscar os valores
    // reais à base de dados a partir dos IDs de variante.
    const variantIds = requestedItems.map((i) => i.variantId);
    const { data: variants, error } = await supabase
      .from("product_variants")
      .select(
        "id, price_cents, currency, printful_variant_id, size, color, image_url, in_stock, products(name)"
      )
      .in("id", variantIds);

    if (error || !variants || variants.length === 0) {
      return NextResponse.json(
        { error: "Não foi possível validar os artigos do carrinho." },
        { status: 400 }
      );
    }

    const lineItems: Array<{
      variantId: string;
      productName: string;
      variantLabel: string;
      quantity: number;
      priceCents: number;
      currency: string;
      imageUrl: string | null;
    }> = [];

    let subtotalCents = 0;
    const currency = variants[0]?.currency ?? "EUR";

    for (const requested of requestedItems) {
      const variant = variants.find((v) => v.id === requested.variantId);
      if (!variant) continue;
      if (!variant.in_stock) {
        return NextResponse.json(
          { error: "Um dos artigos já não está disponível." },
          { status: 409 }
        );
      }
      const quantity = Math.max(1, Math.floor(requested.quantity));
      const productName =
        (variant.products as unknown as { name: string } | null)?.name ??
        "VERTEX";
      const variantLabel = [variant.color, variant.size]
        .filter(Boolean)
        .join(" / ");

      lineItems.push({
        variantId: variant.id,
        productName,
        variantLabel,
        quantity,
        priceCents: variant.price_cents,
        currency: variant.currency,
        imageUrl: variant.image_url,
      });
      subtotalCents += variant.price_cents * quantity;
    }

    if (lineItems.length === 0) {
      return NextResponse.json(
        { error: "Não foi possível validar os artigos do carrinho." },
        { status: 400 }
      );
    }

    // Cria a encomenda "pending" (o total definitivo, com portes, só fica
    // a saber quando o webhook confirmar o pagamento).
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        status: "pending",
        total_cents: subtotalCents,
        currency,
      })
      .select("id")
      .single();

    if (orderError || !order) {
      console.error("Erro ao criar a encomenda:", orderError);
      return NextResponse.json(
        { error: "Não foi possível criar a encomenda." },
        { status: 500 }
      );
    }

    const { error: itemsError } = await supabase.from("order_items").insert(
      lineItems.map((item) => ({
        order_id: order.id,
        product_variant_id: item.variantId,
        quantity: item.quantity,
        unit_price_cents: item.priceCents,
      }))
    );

    if (itemsError) {
      console.error("Erro ao criar os itens da encomenda:", itemsError);
      return NextResponse.json(
        { error: "Não foi possível criar a encomenda." },
        { status: 500 }
      );
    }

    const origin =
      request.headers.get("origin") ?? "https://www.vertexwear.site";

    const ptFree = subtotalCents >= PT_FREE_THRESHOLD_CENTS;
    const euFree = subtotalCents >= EU_FREE_THRESHOLD_CENTS;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      allow_promotion_codes: true,
      phone_number_collection: { enabled: true },
      line_items: lineItems.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: item.currency.toLowerCase(),
          unit_amount: item.priceCents,
          product_data: {
            name: item.variantLabel
              ? `${item.productName} — ${item.variantLabel}`
              : item.productName,
            images: item.imageUrl?.startsWith("https://")
              ? [item.imageUrl]
              : undefined,
          },
        },
      })),
      shipping_address_collection: {
        allowed_countries: ALLOWED_COUNTRIES as Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: ptFree ? 0 : PT_SHIPPING_CENTS,
              currency: "eur",
            },
            display_name: ptFree
              ? "Portugal — Envio grátis"
              : "Portugal — Envio standard",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 5 },
              maximum: { unit: "business_day", value: 6 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: euFree ? 0 : EU_SHIPPING_CENTS,
              currency: "eur",
            },
            display_name: euFree
              ? "Restante União Europeia — Envio grátis"
              : "Restante União Europeia — Envio standard",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 5 },
              maximum: { unit: "business_day", value: 6 },
            },
          },
        },
      ],
      metadata: { order_id: order.id },
      success_url: `${origin}/checkout/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/carrinho`,
    });

    await supabase
      .from("orders")
      .update({ stripe_checkout_session_id: session.id })
      .eq("id", order.id);

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Erro no checkout:", err);
    return NextResponse.json(
      { error: "Erro interno ao iniciar o pagamento." },
      { status: 500 }
    );
  }
}
