import { NextRequest, NextResponse } from "next/server";
import { createPublicServerClient } from "@/lib/supabase/public";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim() ?? "";

  if (!query) {
    return NextResponse.json({ products: [] });
  }

  const supabase = createPublicServerClient();
  const { data, error } = await supabase
    .from("products")
    .select(
      "id, name, slug, image_url, product_variants(id, price_cents, currency, image_url, size, color)"
    )
    .eq("active", true)
    .ilike("name", `%${query}%`)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Erro na pesquisa:", error.message);
    return NextResponse.json({ products: [], error: error.message }, { status: 500 });
  }

  return NextResponse.json({ products: data ?? [] });
}
