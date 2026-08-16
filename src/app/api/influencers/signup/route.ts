import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase/server";

/**
 * Candidatura a influencer VERTEX. Cria automaticamente:
 * - um coupon Stripe de 15% de desconto (fixo para todas as influencers,
 *   por isso não há aprovação manual a fazer aqui);
 * - um promotion code Stripe com o código escolhido pela pessoa;
 * - a linha correspondente em `influencers`, com saldo de pontos a 0.
 */

const CODE_MIN_LENGTH = 3;
const CODE_MAX_LENGTH = 20;
const INFLUENCER_DISCOUNT_PERCENT = 15;

function normalizeCode(raw: string): string {
  return raw
    .trim()
    .toUpperCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // remove acentos
    .replace(/[^A-Z0-9]/g, "");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const email =
      typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    const code = normalizeCode(
      typeof body?.code === "string" ? body.code : ""
    );

    if (!name || name.length > 120) {
      return NextResponse.json({ error: "Nome inválido." }, { status: 400 });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Email inválido." }, { status: 400 });
    }
    if (code.length < CODE_MIN_LENGTH || code.length > CODE_MAX_LENGTH) {
      return NextResponse.json(
        {
          error: `O código deve ter entre ${CODE_MIN_LENGTH} e ${CODE_MAX_LENGTH} letras/números.`,
        },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();

    // Duas queries separadas (em vez de um único `.or()` com os valores
    // interpolados na string do filtro) para não haver forma de um email
    // com vírgulas/parênteses escapar do filtro pretendido.
    const [{ data: existingByEmail }, { data: existingByCode }] =
      await Promise.all([
        supabase
          .from("influencers")
          .select("id")
          .eq("email", email)
          .maybeSingle(),
        supabase
          .from("influencers")
          .select("id")
          .eq("code", code)
          .maybeSingle(),
      ]);

    if (existingByEmail || existingByCode) {
      return NextResponse.json(
        { error: "Já existe uma candidatura com este email ou código." },
        { status: 409 }
      );
    }

    // Confirmar também do lado da Stripe que o código não está em uso
    // (ex.: colisão com códigos promocionais gerais como o BEMVINDO10).
    const existingPromo = await stripe.promotionCodes.list({
      code,
      limit: 1,
    });
    if (existingPromo.data.length > 0) {
      return NextResponse.json(
        { error: "Este código já está em uso. Escolhe outro." },
        { status: 409 }
      );
    }

    const coupon = await stripe.coupons.create({
      percent_off: INFLUENCER_DISCOUNT_PERCENT,
      duration: "forever",
      name: `Influencer — ${name}`,
    });

    const promotionCode = await stripe.promotionCodes.create({
      promotion: { type: "coupon", coupon: coupon.id },
      code,
    });

    const { error: insertError } = await supabase.from("influencers").insert({
      name,
      email,
      code,
      stripe_coupon_id: coupon.id,
      stripe_promotion_code_id: promotionCode.id,
    });

    if (insertError) {
      console.error("Erro ao gravar influencer:", insertError);
      // Reverte o que já foi criado na Stripe para não ficar lixo órfão.
      await stripe.promotionCodes.update(promotionCode.id, { active: false });
      await stripe.coupons.del(coupon.id);
      return NextResponse.json(
        { error: "Não foi possível concluir a candidatura." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      code,
      discountPercent: INFLUENCER_DISCOUNT_PERCENT,
    });
  } catch (err) {
    console.error("Erro na candidatura de influencer:", err);
    return NextResponse.json(
      { error: "Erro interno ao processar a candidatura." },
      { status: 500 }
    );
  }
}
