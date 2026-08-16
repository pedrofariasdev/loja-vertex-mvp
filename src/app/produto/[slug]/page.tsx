import { notFound } from "next/navigation";
import { createPublicServerClient } from "@/lib/supabase/public";
import { VariantPicker } from "@/components/VariantPicker";
import { RelatedProducts } from "@/components/RelatedProducts";

type ProductVariant = {
  id: string;
  price_cents: number;
  currency: string;
  image_url: string | null;
  size: string | null;
  color: string | null;
  in_stock: boolean;
};

type GalleryImage = {
  image_url: string;
  position: number;
};

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  composition_pt: string | null;
  composition_en: string | null;
  product_variants: ProductVariant[];
  product_gallery_images: GalleryImage[];
};

async function getProduct(slug: string): Promise<Product | null> {
  const supabase = createPublicServerClient();
  const { data, error } = await supabase
    .from("products")
    .select(
      "id, name, slug, description, image_url, composition_pt, composition_en, product_variants(id, price_cents, currency, image_url, size, color, in_stock), product_gallery_images(image_url, position)"
    )
    .eq("slug", slug)
    .eq("active", true)
    .order("position", { foreignTable: "product_gallery_images" })
    .single();

  if (error || !data) return null;
  return data as Product;
}

async function getRelatedProducts(excludeId: string) {
  const supabase = createPublicServerClient();
  const { data, error } = await supabase
    .from("products")
    .select(
      "id, name, slug, image_url, product_variants(price_cents, currency, image_url)"
    )
    .eq("active", true)
    .neq("id", excludeId)
    .order("created_at", { ascending: true })
    .limit(3);

  if (error) return [];
  return data ?? [];
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();
  const related = await getRelatedProducts(product.id);

  return (
    <main className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <VariantPicker product={product} />
      <RelatedProducts products={related} />
    </main>
  );
}
