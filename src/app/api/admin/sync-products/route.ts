import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { listSyncProducts, getSyncProduct } from "@/lib/printful";

/**
 * Sincroniza os produtos da Printful para a base de dados Supabase.
 *
 * Uso (com `npm run dev` a correr): abre no browser
 *   http://localhost:3000/api/admin/sync-products?secret=O_TEU_ADMIN_SYNC_SECRET
 *
 * É só uma rota interna/admin enquanto não há um painel próprio — não
 * partilhes o URL com o secret fora do teu ambiente de testes.
 */

function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // remove acentos
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Extrai "Cor / Tamanho" do nome canónico da Printful (o que vem entre parênteses). */
function parseVariantOptions(productName: string): {
  color: string | null;
  size: string | null;
} {
  const match = productName.match(/\(([^)]+)\)\s*$/);
  if (!match) return { color: null, size: null };

  const parts = match[1].split("/").map((s) => s.trim());
  if (parts.length === 2) return { color: parts[0], size: parts[1] };

  const sizeLike = /^(XXS|XS|S|M|L|XL|2XL|3XL|4XL|5XL|One size)$/i;
  if (sizeLike.test(parts[0])) return { color: null, size: parts[0] };
  return { color: parts[0], size: null };
}

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (!process.env.ADMIN_SYNC_SECRET || secret !== process.env.ADMIN_SYNC_SECRET) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const supabase = createServiceClient();
  const summary = await listSyncProducts();

  let productsUpserted = 0;
  let variantsUpserted = 0;
  const errors: string[] = [];

  for (const item of summary) {
    try {
      const detail = await getSyncProduct(item.id);
      const { sync_product, sync_variants } = detail;

      const { data: product, error: productError } = await supabase
        .from("products")
        .upsert(
          {
            printful_product_id: String(sync_product.id),
            name: sync_product.name,
            slug: slugify(sync_product.name),
            image_url: sync_product.thumbnail_url,
            active: true,
          },
          { onConflict: "printful_product_id" }
        )
        .select("id")
        .single();

      if (productError || !product) {
        errors.push(`Produto ${sync_product.name}: ${productError?.message}`);
        continue;
      }
      productsUpserted++;

      for (const variant of sync_variants) {
        const { color, size } = parseVariantOptions(variant.product.name);
        const preview =
          variant.files.find((f) => f.type === "preview")?.preview_url ?? null;
        const priceCents = Math.round(parseFloat(variant.retail_price) * 100);

        const { error: variantError } = await supabase
          .from("product_variants")
          .upsert(
            {
              product_id: product.id,
              printful_variant_id: String(variant.id),
              size,
              color,
              price_cents: priceCents,
              currency: variant.currency,
              image_url: preview ?? variant.product.image,
              in_stock: true,
            },
            { onConflict: "printful_variant_id" }
          );

        if (variantError) {
          errors.push(`Variante ${variant.name}: ${variantError.message}`);
        } else {
          variantsUpserted++;
        }
      }
    } catch (err) {
      errors.push(`Produto ${item.name}: ${(err as Error).message}`);
    }
  }

  return NextResponse.json({
    ok: errors.length === 0,
    productsUpserted,
    variantsUpserted,
    errors,
  });
}
