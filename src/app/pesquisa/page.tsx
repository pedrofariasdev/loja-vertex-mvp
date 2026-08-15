"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

type ProductVariant = {
  id: string;
  price_cents: number;
  currency: string;
  image_url: string | null;
  size: string | null;
  color: string | null;
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

export default function SearchPage() {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const trimmed = query.trim();

    if (!trimmed) {
      setProducts([]);
      setSearched(false);
      return;
    }

    setLoading(true);
    const timeout = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(trimmed)}`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data.products ?? []);
          setSearched(true);
        })
        .catch(() => {
          setProducts([]);
          setSearched(true);
        })
        .finally(() => setLoading(false));
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <h1 className="font-serif text-3xl font-bold uppercase tracking-tight text-vertex-black md:text-4xl">
        {t.search.title}
      </h1>

      <div className="mt-8 border-b border-vertex-black/20 pb-2">
        <input
          type="text"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.search.placeholder}
          className="w-full bg-transparent font-serif text-2xl text-vertex-black placeholder:text-vertex-gray/60 focus:outline-none md:text-3xl"
        />
      </div>

      <div className="mt-12">
        {!searched && !loading ? (
          <p className="text-sm text-vertex-gray">{t.search.hint}</p>
        ) : null}

        {loading ? (
          <p className="text-sm text-vertex-gray">…</p>
        ) : null}

        {searched && !loading && products.length === 0 ? (
          <p className="text-sm text-vertex-gray">{t.search.empty}</p>
        ) : null}

        {searched && !loading && products.length > 0 ? (
          <>
            <p className="mb-10 text-xs uppercase tracking-[0.3em] text-vertex-gray">
              {t.search.resultsFor} &ldquo;{query.trim()}&rdquo;
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
                  <Link
                    key={product.id}
                    href={`/produto/${product.slug}`}
                    className="group block"
                  >
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
                    <h2 className="mt-4 text-sm text-vertex-black">
                      {product.name}
                    </h2>
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
          </>
        ) : null}
      </div>
    </div>
  );
}
