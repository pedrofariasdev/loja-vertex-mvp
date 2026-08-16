"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { useLanguage } from "@/lib/language-context";

export default function CheckoutSuccessPage() {
  const { clear, hydrated } = useCart();
  const { t } = useLanguage();

  useEffect(() => {
    // Só esvaziamos depois do carrinho guardado (localStorage) ter sido
    // carregado — caso contrário essa carga, que acontece a seguir,
    // sobrepõe-se ao clear() e o artigo "ressuscita" no carrinho.
    if (hydrated) clear();
  }, [hydrated, clear]);

  return (
    <main className="mx-auto max-w-xl px-6 py-24 text-center md:py-32">
      <h1 className="font-serif text-3xl font-bold uppercase tracking-tight text-vertex-black md:text-4xl">
        {t.checkoutSuccess.title}
      </h1>
      <p className="mt-6 text-sm text-vertex-black/80">
        {t.checkoutSuccess.body}
      </p>
      <p className="mt-2 text-sm text-vertex-gray">
        {t.checkoutSuccess.orderNote}
      </p>
      <Link
        href="/"
        className="mt-10 inline-block border border-vertex-black px-6 py-3 text-xs font-medium uppercase tracking-widest text-vertex-black transition hover:bg-vertex-black hover:text-white"
      >
        {t.checkoutSuccess.backToStore}
      </Link>
    </main>
  );
}
