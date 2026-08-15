import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  const firstName = typeof body?.firstName === "string" ? body.firstName.trim() : "";
  const lastName = typeof body?.lastName === "string" ? body.lastName.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!firstName || !lastName || !email || !EMAIL_RE.test(email) || !message) {
    return NextResponse.json({ error: "Campos em falta ou inválidos." }, { status: 400 });
  }

  const supabase = createServiceClient();
  const { error } = await supabase.from("contact_messages").insert({
    first_name: firstName,
    last_name: lastName,
    email,
    phone: phone || null,
    message,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
