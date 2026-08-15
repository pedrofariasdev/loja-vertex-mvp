"use client";

import Link from "next/link";
import { NewsletterForm } from "@/components/NewsletterForm";
import { useLanguage } from "@/lib/language-context";

const linkClass =
  "inline-block transition-transform duration-200 hover:-translate-x-1 hover:text-white";

export function SiteFooter() {
  const { t } = useLanguage();

  return (
    <footer className="bg-vertex-black text-vertex-white">
      {/* Newsletter */}
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h2 className="font-serif text-3xl font-bold uppercase tracking-tight md:text-4xl">
          {t.newsletter.title}
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-white/60">
          {t.newsletter.sub}
        </p>
        <div className="mt-8">
          <NewsletterForm />
        </div>
      </div>

      {/* Nav / links — grupo de colunas centrado na página, conteúdo de cada coluna alinhado à esquerda */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-12 px-6 py-16 text-sm sm:flex-row sm:items-start sm:justify-center sm:gap-20">
          <div className="flex flex-col items-start gap-3 text-left">
            <p className="text-xs uppercase tracking-widest text-white/40">
              {t.footer.vertexCol}
            </p>
            <ul className="flex flex-col items-start gap-2 text-white/70">
              <li>
                <Link href="/#colecao" className={linkClass}>
                  {t.footer.collection}
                </Link>
              </li>
              <li>
                <Link href="/sobre" className={linkClass}>
                  {t.footer.about}
                </Link>
              </li>
              <li>
                <Link href="/jornal" className={linkClass}>
                  {t.footer.journal}
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-start gap-3 text-left">
            <p className="text-xs uppercase tracking-widest text-white/40">
              {t.footer.support}
            </p>
            <ul className="flex flex-col items-start gap-2 text-white/70">
              <li>
                <Link href="/contacto" className={linkClass}>
                  {t.footer.contact}
                </Link>
              </li>
              <li>
                <Link href="/envios" className={linkClass}>
                  {t.footer.shipping}
                </Link>
              </li>
              <li>
                <Link href="/guia-tamanhos" className={linkClass}>
                  {t.footer.sizeGuide}
                </Link>
              </li>
              <li>
                <Link href="/devolucoes" className={linkClass}>
                  {t.footer.returns}
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-start gap-3 text-left">
            <p className="text-xs uppercase tracking-widest text-white/40">
              {t.footer.legal}
            </p>
            <ul className="flex flex-col items-start gap-2 text-white/70">
              <li>
                <Link href="/privacidade" className={linkClass}>
                  {t.footer.privacy}
                </Link>
              </li>
              <li>
                <Link href="/termos" className={linkClass}>
                  {t.footer.terms}
                </Link>
              </li>
              <li>
                <Link href="/cookies" className={linkClass}>
                  {t.footer.cookies}
                </Link>
              </li>
              <li>
                <a
                  href="https://www.livroreclamacoes.pt/Inicio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {t.footer.complaintsBook}
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-start gap-3 text-left">
            <p className="text-xs uppercase tracking-widest text-white/40">
              {t.footer.social}
            </p>
            <ul className="flex flex-col items-start gap-2 text-white/70">
              <li>
                <a
                  href="https://www.instagram.com/vertexwearstore/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@vertex.wearstore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  TikTok
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/profile.php?id=61593271466606"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 px-6 py-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}
