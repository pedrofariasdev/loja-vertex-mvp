import type { Metadata } from "next";

// Página de resultados de pesquisa — conteúdo dinâmico controlado por
// querystring, sem valor a ser indexado diretamente pelo Google.
export const metadata: Metadata = {
  title: "Pesquisa",
  robots: { index: false, follow: false },
};

export default function PesquisaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
