import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase/server";

/**
 * Troca o saldo de pontos acumulado por uma influencer por um código de
 * desconto de uso único, no valor exato do saldo (1 ponto = 1 cêntimo).
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
      .select("id, code, points_cents")
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

    const { error: updateError } = await supabase
      .from("influencers")
      .update({ points_cents: 0, updated_at: new Date().toISOString() })
      .eq("id", influencer.id);

    if (updateError) {
      console.error("Erro ao atualizar saldo após resgate:", updateError);
      await stripe.promotionCodes.update(promotionCode.id, { active: false });
      await stripe.coupons.del(coupon.id);
      return NextResponse.json(
        { error: "Não foi possível concluir o resgate." },
        { status: 500 }
      );
    }

    await supabase.from("influencer_redemptions").insert({
      influencer_id: influencer.id,
      points_redeemed_cents: pointsCents,
      discount_code: discountCode,
      stripe_promotion_code_id: promotionCode.id,
    });

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
