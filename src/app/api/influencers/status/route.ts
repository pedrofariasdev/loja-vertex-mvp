import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

/** Consulta pública do saldo de pontos de uma influencer, por email. */
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
      .select("name, code, points_cents, lifetime_sales_cents")
      .eq("email", email)
      .maybeSingle();

    if (error || !influencer) {
      return NextResponse.json(
        { error: "Não encontrámos nenhuma candidatura com este email." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      name: influencer.name,
      code: influencer.code,
      pointsCents: influencer.points_cents,
      lifetimeSalesCents: influencer.lifetime_sales_cents,
    });
  } catch (err) {
    console.error("Erro ao consultar saldo de influencer:", err);
    return NextResponse.json(
      { error: "Erro interno ao consultar o saldo." },
      { status: 500 }
    );
  }
}
