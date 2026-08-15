"use client";

import { useLanguage } from "@/lib/language-context";
import { ContactForm } from "@/components/ContactForm";

export default function ContactoPage() {
  const { t } = useLanguage();

  return (
    <section className="mx-auto max-w-xl px-6 py-24">
      <div className="text-center">
        <h1 className="font-serif text-3xl font-bold uppercase tracking-tight text-vertex-black md:text-4xl">
          {t.contact.title}
        </h1>
        <p className="mt-6 text-base text-vertex-gray">{t.contact.body}</p>
      </div>

      <div className="mt-12">
        <ContactForm />
      </div>

      <div className="mt-12 border-t border-vertex-black/10 pt-8 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-vertex-gray">
          {t.contact.emailLabel}
        </p>
        <a
          href="mailto:contact@vertexwear.pt"
          className="mt-2 inline-block text-lg text-vertex-black underline decoration-vertex-gray underline-offset-4"
        >
          contact@vertexwear.pt
        </a>

        <p className="mt-6 text-xs font-bold uppercase tracking-widest text-vertex-gray">
          {t.contact.phoneLabel}
        </p>
        <a
          href="tel:+351913477769"
          className="mt-2 inline-block text-lg text-vertex-black underline decoration-vertex-gray underline-offset-4"
        >
          913 477 769
        </a>

        <p className="mt-6 text-xs font-bold uppercase tracking-widest text-vertex-gray">
          {t.contact.hoursLabel}
        </p>
        <p className="mt-2 text-sm text-vertex-black/80">{t.contact.hoursValue}</p>
      </div>
    </section>
  );
}
