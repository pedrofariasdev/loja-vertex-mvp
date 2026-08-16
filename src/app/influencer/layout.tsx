import type { Metadata } from "next";

// Área privada de candidatura/gestão de influencers — não é conteúdo
// público que deva aparecer nos resultados de pesquisa.
export const metadata: Metadata = {
  title: "Influencers",
  robots: { index: false, follow: false },
};

export default function InfluencerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
