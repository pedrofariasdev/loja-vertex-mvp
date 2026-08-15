"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

type ProductVariant = {
  price_cents: number;
  currency: string;
  image_url: string | null;
};

type Product = {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
  product_variants: ProductVariant[];
};

function formatPrice(cents: number, currency: string) {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency,
  }).format(cents / 100);
}

export function RelatedProducts({ products }: { products: Product[] }) {
  const { t } = useLanguage();

  if (products.length === 0) return null;

  return (
    <section className="mx-auto mt-24 max-w-6xl border-t border-vertex-black/10 px-6 pt-16 md:mt-32">
      <p className="mb-10 text-xs uppercase tracking-[0.3em] text-vertex-gray">
        {t.collection.youMayLike}
      </p>
      <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => {
          const variants = product.product_variants ?? [];
          const prices = variants.map((v) => v.price_cents);
          const minPrice = prices.length ? Math.min(...prices) : null;
          const maxPrice = prices.length ? Math.max(...prices) : null;
          const currency = variants[0]?.currency ?? "EUR";
          const image = product.image_url ?? variants[0]?.image_url ?? null;

          return (
            <Link key={product.id} href={`/produto/${product.slug}`} className="group block">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-black/5">
                {image ? (
                  <Image
                    src={image}
                    alt={product.name}
                    fill
                    unoptimized
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : null}
              </div>
              <h3 className="mt-4 text-sm text-vertex-black">{product.name}</h3>
              <p className="mt-1 text-sm text-vertex-gray">
                {minPrice !== null
                  ? minPrice === maxPrice
                    ? formatPrice(minPrice, currency)
                    : `${t.collection.from} ${formatPrice(minPrice, currency)}`
                  : t.product.priceTbd}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
