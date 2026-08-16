import type { Metadata } from "next";
import { LegalBlocks, type LegalBlock } from "@/components/LegalBlocks";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description: "Como a VERTEX usa cookies no site e como podes geri-los.",
  alternates: { canonical: "/cookies" },
};

const blocks: LegalBlock[] = [
  { type: "p", text: "A VERTEX utiliza cookies e tecnologias semelhantes para garantir o funcionamento da loja, guardar preferências e compreender a utilização do website." },

  { type: "h2", text: "Cookies essenciais" },
  { type: "p", text: "São necessários para funções como:" },
  { type: "ul", items: ["Carrinho", "Checkout", "Segurança", "Sessão", "Preferências fundamentais"] },
  { type: "p", text: "Estes cookies estão sempre ativos, pois o site não funciona corretamente sem eles." },

  { type: "h2", text: "Cookies de análise" },
  { type: "p", text: "Podem ajudar-nos a compreender como os visitantes utilizam o website e quais páginas ou produtos despertam maior interesse. Só são ativados com o seu consentimento." },

  { type: "h2", text: "Cookies de marketing" },
  { type: "p", text: "Poderão ser utilizados para medir campanhas ou apresentar publicidade relevante. Só são ativados com o seu consentimento." },

  { type: "h2", text: "As suas escolhas" },
  { type: "p", text: "Pode gerir as suas preferências de cookies a qualquer momento através do banner apresentado na primeira visita ao site, ou limpando os cookies guardados no seu navegador." },
];

export default function CookiesPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <h1 className="font-serif text-3xl font-bold uppercase tracking-tight text-vertex-black md:text-4xl">
        Política de Cookies
      </h1>
      <p className="mt-2 text-xs uppercase tracking-widest text-vertex-gray">
        Última atualização: agosto de 2026
      </p>
      <div className="mt-8">
        <LegalBlocks blocks={blocks} />
      </div>
    </section>
  );
}
