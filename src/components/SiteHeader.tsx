"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { useLanguage } from "@/lib/language-context";

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="h-4 w-4"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
    </svg>
  );
}

const navLinkClass =
  "relative pb-1 text-xs font-medium uppercase tracking-widest text-vertex-black transition after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-vertex-black after:transition-all after:duration-300 hover:text-vertex-gray hover:after:w-full";

export function SiteHeader() {
  const { totalItems } = useCart();
  const { locale, setLocale, t } = useLanguage();

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/#colecao", label: t.nav.drop },
    { href: "/sobre", label: t.nav.about },
    { href: "/contacto", label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-vertex-offwhite/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-5">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src="/images/brand/v-mark-solid.png"
            alt=""
            width={18}
            height={18}
            className="opacity-90"
          />
          <span className="font-serif text-lg font-semibold tracking-wide text-vertex-black">
            VERTEX
          </span>
        </Link>

        <nav className="hidden items-center gap-8 sm:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={navLinkClass}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-5">
          <Link
            href="/pesquisa"
            aria-label={t.nav.search}
            className="text-vertex-black transition hover:text-vertex-gray"
          >
            <SearchIcon />
          </Link>

          <div className="flex items-center gap-1 text-xs font-medium uppercase tracking-widest text-vertex-black">
            <button
              onClick={() => setLocale("pt")}
              className={locale === "pt" ? "underline" : "text-vertex-gray hover:text-vertex-black"}
            >
              Pt
            </button>
            <span className="text-vertex-gray">/</span>
            <button
              onClick={() => setLocale("en")}
              className={locale === "en" ? "underline" : "text-vertex-gray hover:text-vertex-black"}
            >
              En
            </button>
          </div>

          <Link
            href="/carrinho"
            className="text-xs font-medium uppercase tracking-widest text-vertex-black"
          >
            {t.nav.cart}
            {totalItems > 0 ? ` (${totalItems})` : ""}
          </Link>
        </div>
      </div>
    </header>
  );
}
