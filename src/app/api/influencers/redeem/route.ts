import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase/server";

/**
 * Troca o saldo de pontos acumulado por uma influencer por um código de
 * desconto de uso único, no valor máximo do saldo (1 ponto = 1 cêntimo).
 *
 * O saldo NÃO é zerado aqui — o código fica "pending" e só é descontado do
 * saldo real quando a Stripe confirma (via webhook) que foi efetivamente
 * usado numa encomenda, pelo valor realmente aplicado. Assim, se a compra
 * for mais barata do que o código, a diferença continua disponível.
 *
 * Qualquer código de resgate anterior ainda por usar é desativado ao gerar
 * um novo, para nunca haver mais do que um código válido a apontar para o
 * mesmo saldo.
 */
const MIN_REDEMPTION_CENTS = 500; // 5€

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email =
      typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!email) {
      return NextResponse.json({ error: "Email inválido." }, { status: 400 });
    }

    const supabase = createServiceClient();
    const { data: influencer, error } = await supabase
      .from("influencers")
      .select("id, email, code, points_cents")
      .eq("email", email)
      .maybeSingle();

    if (error || !influencer) {
      return NextResponse.json(
        { error: "Não encontrámos nenhuma candidatura com este email." },
        { status: 404 }
      );
    }

    if (influencer.points_cents < MIN_REDEMPTION_CENTS) {
      return NextResponse.json(
        {
          error: `Precisas de pelo menos ${(MIN_REDEMPTION_CENTS / 100).toFixed(2)}€ em pontos para resgatar.`,
        },
        { status: 400 }
      );
    }

    // Desativa quaisquer códigos de resgate anteriores ainda pendentes,
    // para não coexistirem dois códigos válidos ao mesmo tempo sobre o
    // mesmo saldo (evita que ela possa gastar o mesmo saldo duas vezes).
    const { data: pendingRedemptions } = await supabase
      .from("influencer_redemptions")
      .select("id, stripe_promotion_code_id")
      .eq("influencer_id", influencer.id)
      .eq("status", "pending");

    if (pendingRedemptions && pendingRedemptions.length > 0) {
      await Promise.all(
        pendingRedemptions.map((r) =>
          stripe.promotionCodes
            .update(r.stripe_promotion_code_id, { active: false })
            .catch((err) =>
              console.error("Erro ao desativar resgate pendente antigo:", err)
            )
        )
      );
      await supabase
        .from("influencer_redemptions")
        .update({ status: "voided" }) // superado por um novo código; não será usado
        .in(
          "id",
          pendingRedemptions.map((r) => r.id)
        );
    }

    const pointsCents = influencer.points_cents;
    const discountCode = `${influencer.code}-${randomUUID().slice(0, 6).toUpperCase()}`;

    const coupon = await stripe.coupons.create({
      amount_off: pointsCents,
      currency: "eur",
      duration: "once",
      name: `Resgate — ${influencer.code}`,
    });

    const promotionCode = await stripe.promotionCodes.create({
      promotion: { type: "coupon", coupon: coupon.id },
      code: discountCode,
      max_redemptions: 1,
    });

    const { error: insertError } = await supabase
      .from("influencer_redemptions")
      .insert({
        influencer_id: influencer.id,
        points_redeemed_cents: pointsCents,
        discount_code: discountCode,
        stripe_promotion_code_id: promotionCode.id,
        status: "pending",
      });

    if (insertError) {
      console.error("Erro ao registar resgate:", insertError);
      await stripe.promotionCodes.update(promotionCode.id, { active: false });
      await stripe.coupons.del(coupon.id);
      return NextResponse.json(
        { error: "Não foi possível concluir o resgate." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      discountCode,
      amountCents: pointsCents,
    });
  } catch (err) {
    console.error("Erro ao resgatar pontos de influencer:", err);
    return NextResponse.json(
      { error: "Erro interno ao processar o resgate." },
      { status: 500 }
    );
  }
}
