"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { ProductInfoAccordion } from "@/components/ProductInfoAccordion";
import { useLanguage } from "@/lib/language-context";

type ProductVariant = {
  id: string;
  price_cents: number;
  currency: string;
  image_url: string | null;
  size: string | null;
  color: string | null;
  in_stock: boolean;
};

type Product = {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  composition_pt?: string | null;
  composition_en?: string | null;
  product_variants: ProductVariant[];
};

function formatPrice(cents: number, currency: string) {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency,
  }).format(cents / 100);
}

export function VariantPicker({ product }: { product: Product }) {
  const { t, locale } = useLanguage();
  const variants = product.product_variants ?? [];

  const colors = useMemo(
    () =>
      Array.from(
        new Set(variants.map((v) => v.color).filter((c): c is string => !!c))
      ),
    [variants]
  );
  const sizes = useMemo(
    () =>
      Array.from(
        new Set(variants.map((v) => v.size).filter((s): s is string => !!s))
      ),
    [variants]
  );

  const [selectedColor, setSelectedColor] = useState<string | null>(
    colors[0] ?? null
  );
  const [selectedSize, setSelectedSize] = useState<string | null>(
    sizes[0] ?? null
  );
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const selectedVariant =
    variants.find(
      (v) =>
        (colors.length === 0 || v.color === selectedColor) &&
        (sizes.length === 0 || v.size === selectedSize)
    ) ?? variants[0];

  const image = selectedVariant?.image_url ?? product.image_url;

  function handleAddToCart() {
    if (!selectedVariant) return;
    const label = [selectedVariant.color, selectedVariant.size]
      .filter(Boolean)
      .join(" / ");
    addItem({
      variantId: selectedVariant.id,
      productName: product.name,
      variantLabel: label || t.product.oneSize,
      priceCents: selectedVariant.price_cents,
      currency: selectedVariant.currency,
      imageUrl: selectedVariant.image_url,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
      <div className="relative aspect-square w-full overflow-hidden bg-black/5">
        {image ? (
          <Image
            src={image}
            alt={product.name}
            fill
            className="object-cover"
            unoptimized
          />
        ) : null}
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <h1 className="font-serif text-2xl font-bold uppercase tracking-tight text-vertex-black md:text-3xl">
            {product.name}
          </h1>
          {selectedVariant ? (
            <p className="mt-2 text-lg text-vertex-gray">
              {formatPrice(selectedVariant.price_cents, selectedVariant.currency)}
            </p>
          ) : null}
        </div>

        {product.description ? (
          <p className="text-sm text-vertex-gray">{product.description}</p>
        ) : null}

        {colors.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-vertex-black">
              {t.product.color}
            </p>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`border px-3 py-1.5 text-sm transition ${
                    selectedColor === color
                      ? "border-vertex-black bg-vertex-black text-white"
                      : "border-vertex-black/20 text-vertex-black hover:border-vertex-black"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}

        {sizes.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-vertex-black">
              {t.product.size}
            </p>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border px-3 py-1.5 text-sm transition ${
                    selectedSize === size
                      ? "border-vertex-black bg-vertex-black text-white"
                      : "border-vertex-black/20 text-vertex-black hover:border-vertex-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleAddToCart}
          disabled={!selectedVariant}
          className="mt-2 border border-vertex-black bg-vertex-black px-6 py-3 text-xs font-medium uppercase tracking-widest text-white transition hover:bg-vertex-gray hover:border-vertex-gray disabled:opacity-50"
        >
          {added ? t.product.added : t.product.addToCart}
        </button>

        <div className="mt-6">
          <ProductInfoAccordion
            composition={
              (locale === "en" ? product.composition_en : product.composition_pt) ??
              product.composition_pt ??
              product.composition_en ??
              null
            }
          />
        </div>
      </div>
    </div>
  );
}
