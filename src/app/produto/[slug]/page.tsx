import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createPublicServerClient } from "@/lib/supabase/public";
import { VariantPicker } from "@/components/VariantPicker";
import { RelatedProducts } from "@/components/RelatedProducts";
import { absoluteUrl, SITE_NAME } from "@/lib/seo";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};

  const description =
    product.description ??
    `${product.name} — disponível na VERTEX. Envio para Portugal e Europa.`;
  const image = product.image_url ?? product.product_gallery_images[0]?.image_url;
  const url = `/produto/${product.slug}`;

  return {
    title: product.name,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title: product.name,
      description,
      url,
      images: image ? [image] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description,
      images: image ? [image] : undefined,
    },
  };
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

  const inStockVariants = product.product_variants.filter((v) => v.in_stock);
  const prices = product.product_variants.map((v) => v.price_cents / 100);
  const lowPrice = prices.length ? Math.min(...prices) : undefined;
  const highPrice = prices.length ? Math.max(...prices) : undefined;
  const currency = product.product_variants[0]?.currency ?? "EUR";
  const galleryImages = [
    product.image_url,
    ...product.product_gallery_images.map((g) => g.image_url),
  ].filter((url): url is string => !!url);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description ?? undefined,
    image: galleryImages,
    brand: { "@type": "Brand", name: SITE_NAME },
    url: absoluteUrl(`/produto/${product.slug}`),
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: currency,
      lowPrice,
      highPrice,
      offerCount: product.product_variants.length,
      availability:
        inStockVariants.length > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      url: absoluteUrl(`/produto/${product.slug}`),
    },
  };

  return (
    <main className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <VariantPicker product={product} />
      <RelatedProducts products={related} />
    </main>
  );
}
