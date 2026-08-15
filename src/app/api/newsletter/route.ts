import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Email inválido." }, { status: 400 });
  }

  const supabase = createServiceClient();
  const { error } = await supabase
    .from("newsletter_signups")
    .upsert({ email }, { onConflict: "email", ignoreDuplicates: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
