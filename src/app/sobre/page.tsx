"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/language-context";

const eyebrowClass =
  "mb-4 border-b pb-4 text-xs font-medium uppercase tracking-[0.25em]";

export default function AboutPage() {
  const { t } = useLanguage();
  const a = t.about;

  return (
    <div>
      {/* 1. Hero — foto + painel escuro lado a lado */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative aspect-[4/5] w-full md:aspect-auto md:min-h-[640px]">
          <Image
            src="/images/brand/campaign-gym-red.jpg"
            alt="VERTEX"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute left-6 top-6 md:left-10 md:top-10">
            <p className="font-serif text-2xl font-bold tracking-wide text-white md:text-3xl">
              VERTEX
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-white/80">
              {a.wordmarkTagline}
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center bg-vertex-dark px-6 py-16 text-white md:px-16 md:py-0">
          <p className={`${eyebrowClass} border-white/20 text-white/50`}>
            {a.panelEyebrow}
          </p>
          <h1 className="font-serif text-3xl font-bold uppercase leading-[1.1] tracking-tight md:text-5xl">
            {a.panelHeading}
          </h1>
          <p className="mt-6 max-w-md text-sm text-white/70">{a.introP1}</p>
          <div className="mt-6 space-y-1 text-sm text-white/70">
            {a.introLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <p className="mt-6 max-w-md text-sm text-white/70">{a.introClosing}</p>
        </div>
      </section>

      {/* 2. Entre mundos — painel claro + foto */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        <div className="order-2 flex flex-col justify-center bg-vertex-offwhite px-6 py-16 md:order-1 md:px-16 md:py-0">
          <p className={`${eyebrowClass} border-vertex-black/15 text-vertex-gray`}>
            {a.worldsLabel}
          </p>
          <h2 className="font-serif text-2xl font-bold uppercase leading-tight text-vertex-black md:text-3xl">
            {a.moreTitle}
          </h2>
          <p className="mt-6 max-w-md text-sm text-vertex-black/80">{a.moreBody}</p>
          <p className="mt-6 max-w-md whitespace-pre-line text-sm font-semibold text-vertex-black">
            {a.moreBold}
          </p>
        </div>
        <div className="relative order-1 aspect-[4/5] w-full md:order-2 md:aspect-auto md:min-h-[560px]">
          <Image
            src="/images/brand/lifestyle-jumprope-bw.jpg"
            alt={a.worldsLabel}
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* 3. Origem — painel escuro + foto */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col justify-center bg-vertex-dark px-6 py-16 text-white md:px-16 md:py-0">
          <p className={`${eyebrowClass} border-white/20 text-white/50`}>
            {a.originLabel}
          </p>
          <h2 className="font-serif text-2xl font-bold uppercase leading-tight md:text-3xl">
            {a.originHeading}
          </h2>
          <div className="mt-6 max-w-md space-y-4 text-sm text-white/70">
            <p>{a.originBody1}</p>
            <p>{a.originBody2}</p>
            <p>{a.originBody3}</p>
          </div>
          <p className="mt-6 max-w-md whitespace-pre-line text-sm font-semibold text-white">
            {a.originBold}
          </p>
        </div>
        <div className="relative aspect-[4/5] w-full md:aspect-auto md:min-h-[560px]">
          <Image
            src="/images/brand/campaign-runners-bridge.jpg"
            alt={a.originHeading}
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* 4. Mentalidade / Built by Discipline — foto + painel claro */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative order-1 aspect-[4/5] w-full md:aspect-auto md:min-h-[560px]">
          <Image
            src="/images/brand/lifestyle-weightlifter-bw.jpg"
            alt={a.disciplineHeading}
            fill
            className="object-cover"
          />
        </div>
        <div className="order-2 flex flex-col justify-center bg-vertex-offwhite px-6 py-16 md:px-16 md:py-0">
          <p className={`${eyebrowClass} border-vertex-black/15 text-vertex-gray`}>
            {a.mindsetLabel}
          </p>
          <h2 className="font-serif text-2xl font-bold uppercase leading-tight text-vertex-black md:text-3xl">
            {a.disciplineHeading}
          </h2>
          <p className="mt-6 max-w-md text-sm text-vertex-black/80">
            {a.disciplineBody}
          </p>
          <p className="mt-6 max-w-md text-sm font-semibold text-vertex-black">
            {a.disciplineBold}
          </p>
        </div>
      </section>

      {/* 5. Bloco final — 3 colunas compactas, off-white */}
      <section className="border-t border-vertex-black/10 bg-vertex-offwhite">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-16 md:grid-cols-3 md:gap-10 md:divide-x md:divide-vertex-black/10">
          <div className="md:pr-8">
            <p className={`${eyebrowClass} border-vertex-black/15 text-vertex-black`}>
              {a.movementHeading}
            </p>
            <p className="text-sm text-vertex-black/80">{a.movementBody}</p>
            <p className="mt-4 text-sm font-semibold text-vertex-black">
              {a.movementBold}
            </p>
          </div>
          <div className="md:px-8">
            <p className={`${eyebrowClass} border-vertex-black/15 text-vertex-black`}>
              {a.minimalHeading}
            </p>
            <p className="text-sm text-vertex-black/80">{a.minimalBody}</p>
            <p className="mt-4 text-sm font-semibold text-vertex-black">
              {a.minimalBold}
            </p>
          </div>
          <div className="md:pl-8">
            <p className={`${eyebrowClass} border-vertex-black/15 text-vertex-black`}>
              {a.closingHeading}
            </p>
            <p className="text-sm text-vertex-black/80">{a.closingBody1}</p>
            <p className="mt-3 text-sm text-vertex-black/80">{a.closingBody2}</p>
            <p className="mt-4 text-sm font-semibold text-vertex-black">
              {a.closingBold}
            </p>
          </div>
        </div>
      </section>

      {/* 6. From the founder — foto real do fundador + painel escuro */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative aspect-[4/5] w-full md:aspect-auto md:min-h-[640px]">
          <Image
            src="/images/brand/founder-pedro.jpg"
            alt={a.founderLabel}
            fill
            className="object-cover object-top"
          />
        </div>
        <div className="flex flex-col justify-center bg-vertex-dark px-6 py-16 text-white md:px-16 md:py-0">
          <p className={`${eyebrowClass} border-white/20 text-white/50`}>
            {a.founderLabel}
          </p>
          <p className="max-w-md text-sm italic text-white/60">{a.founderNote}</p>
        </div>
      </section>
    </div>
  );
}
