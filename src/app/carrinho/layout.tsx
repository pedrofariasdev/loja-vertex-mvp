import type { Metadata } from "next";

// O carrinho é sempre vazio/único por sessão para o Googlebot — não faz
// sentido indexar, e evita conteúdo duplicado/instável no Google.
export const metadata: Metadata = {
  title: "Carrinho",
  robots: { index: false, follow: false },
};

export default function CarrinhoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
