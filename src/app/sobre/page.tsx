import type { Metadata } from "next";
import { AboutPageClient } from "./AboutPageClient";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Conhece a história da VERTEX — uma marca construída todos os dias, peça a peça, sem atalhos. Built by Discipline.",
  alternates: { canonical: "/sobre" },
  openGraph: {
    title: "Sobre | VERTEX",
    description:
      "Conhece a história da VERTEX — uma marca construída todos os dias, peça a peça, sem atalhos. Built by Discipline.",
    url: "/sobre",
    images: ["/images/brand/founder-pedro.jpg"],
  },
};

export default function SobrePage() {
  return <AboutPageClient />;
}
