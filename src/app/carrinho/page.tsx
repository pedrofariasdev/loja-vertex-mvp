"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { useLanguage } from "@/lib/language-context";

function formatPrice(cents: number, currency: string) {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency,
  }).format(cents / 100);
}

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalCents } = useCart();
  const { t } = useLanguage();
  const currency = items[0]?.currency ?? "EUR";
  const [loading, setLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState(false);
  const [isGift, setIsGift] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");

  async function handleCheckout() {
    setLoading(true);
    setCheckoutError(false);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            variantId: i.variantId,
            quantity: i.quantity,
          })),
          isGift,
          giftMessage: isGift ? giftMessage.trim().slice(0, 400) : "",
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error ?? "Erro");
      window.location.href = data.url;
    } catch {
      setCheckoutError(true);
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="text-sm text-vertex-gray">{t.cart.empty}</p>
        <Link
          href="/"
          className="mt-6 inline-block border border-vertex-black px-6 py-3 text-xs font-medium uppercase tracking-widest text-vertex-black transition hover:bg-vertex-black hover:text-white"
        >
          {t.cart.backToStore}
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-20 md:py-28">
      <h1 className="mb-10 font-serif text-3xl font-bold uppercase tracking-tight text-vertex-black md:text-4xl">
        {t.cart.title}
      </h1>

      <div className="flex flex-col gap-6">
        {items.map((item) => (
          <div
            key={item.variantId}
            className="flex gap-4 border-b border-vertex-black/10 pb-6"
          >
            <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden bg-black/5 md:h-32 md:w-32">
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.productName}
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : null}
            </div>
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <p className="font-serif font-bold text-vertex-black">
                  {item.productName}
                </p>
                <p className="text-sm text-vertex-gray">{item.variantLabel}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                    className="h-7 w-7 border border-vertex-black/20 text-sm text-vertex-black transition hover:border-vertex-black"
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-sm text-vertex-black">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                    className="h-7 w-7 border border-vertex-black/20 text-sm text-vertex-black transition hover:border-vertex-black"
                  >
                    +
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-vertex-black">
                    {formatPrice(item.priceCents * item.quantity, item.currency)}
                  </span>
                  <button
                    onClick={() => removeItem(item.variantId)}
                    className="text-xs text-vertex-gray underline hover:text-vertex-black"
                  >
                    {t.cart.remove}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t border-vertex-black/10 pt-6">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-vertex-black">
          <input
            type="checkbox"
            checked={isGift}
            onChange={(e) => setIsGift(e.target.checked)}
            className="h-4 w-4 accent-vertex-black"
          />
          {t.cart.giftLabel}
        </label>
        {isGift ? (
          <div className="mt-3">
            <textarea
              value={giftMessage}
              onChange={(e) => setGiftMessage(e.target.value)}
              placeholder={t.cart.giftMessagePlaceholder}
              maxLength={400}
              rows={3}
              className="w-full resize-none border border-vertex-black/20 bg-transparent px-3 py-2 text-sm text-vertex-black placeholder:text-vertex-gray focus:border-vertex-black focus:outline-none"
            />
            <p className="mt-1 text-xs text-vertex-gray">{t.cart.giftNote}</p>
          </div>
        ) : null}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <span className="font-serif text-lg font-bold uppercase tracking-tight text-vertex-black">
          {t.cart.total}
        </span>
        <span className="text-lg font-semibold text-vertex-black">
          {formatPrice(totalCents, currency)}
        </span>
      </div>

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="mt-6 w-full border border-vertex-black bg-vertex-black px-6 py-3 text-xs font-medium uppercase tracking-widest text-white transition hover:bg-vertex-gray hover:border-vertex-gray disabled:opacity-50"
      >
        {loading ? t.cart.checkoutLoading : t.cart.checkout}
      </button>
      {checkoutError ? (
        <p className="mt-3 text-center text-xs text-red-600">
          {t.cart.checkoutError}
        </p>
      ) : null}
    </main>
  );
}
