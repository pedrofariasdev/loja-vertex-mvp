import type { Metadata } from "next";
import { LegalBlocks, type LegalBlock } from "@/components/LegalBlocks";

export const metadata: Metadata = {
  title: "Trocas & Devoluções",
  description:
    "Como trocar ou devolver uma encomenda VERTEX — prazos, condições e direito de livre resolução.",
  alternates: { canonical: "/devolucoes" },
};

const blocks: LegalBlock[] = [
  { type: "p", text: "Built to be worn. Supported when something goes wrong." },
  { type: "p", text: "Queremos que cada produto VERTEX corresponda ao que espera receber." },

  { type: "h2", text: "1. Prazo para devolução" },
  { type: "p", text: "Nas compras online abrangidas pelo direito de livre resolução (por exemplo, mudança de ideias ou tamanho errado), poderá comunicar a intenção de devolver a encomenda no prazo de 14 dias após a sua receção." },
  { type: "p", text: "A comunicação pode ser feita através de: contact@vertexwear.pt" },
  { type: "p", text: "Inclua:" },
  { type: "ul", items: ["Nome", "Número da encomenda", "Produtos que pretende devolver"] },
  { type: "p", text: "Após a validação do pedido, a VERTEX indicará a morada para onde a peça deve ser enviada. As peças devem ser sempre devolvidas diretamente à VERTEX, nunca ao nosso parceiro de produção." },

  { type: "h2", text: "2. Estado dos produtos" },
  { type: "p", text: "Os artigos deverão ser devolvidos em condições que permitam verificar apenas aquilo que normalmente seria possível verificar numa loja física." },
  { type: "p", text: "Poderá existir responsabilidade por eventual diminuição de valor decorrente de uma utilização que vá além do necessário para verificar a natureza, características e funcionamento do artigo." },

  { type: "h2", text: "3. Custos de devolução" },
  { type: "p", text: "Quando a devolução ocorrer apenas por mudança de opinião ou escolha de tamanho errado, os custos diretos do envio de volta ficam a cargo do cliente, salvo indicação em contrário no momento do contacto." },
  { type: "p", text: "Quando o artigo estiver defeituoso, danificado ou incorreto por responsabilidade da VERTEX, a situação será tratada sem custos indevidos para o consumidor." },

  { type: "h2", text: "4. Reembolsos" },
  { type: "p", text: "Após o exercício válido do direito de livre resolução, os montantes abrangidos serão reembolsados nos termos legalmente aplicáveis." },
  { type: "p", text: "O reembolso deverá ocorrer no prazo legal aplicável e poderá ser retido até à receção dos bens devolvidos ou até ser apresentada prova do respetivo envio." },

  { type: "h2", text: "5. Produtos personalizados" },
  { type: "p", text: "Produtos que tenham sido claramente personalizados de acordo com especificações individuais do cliente poderão estar excluídos do direito de livre resolução, quando a legislação assim o permita." },
  { type: "p", text: "Produtos VERTEX normais produzidos sob demanda não são automaticamente tratados como personalizados apenas pelo seu método de produção." },

  { type: "h2", text: "6. Defeitos e produtos incorretos" },
  { type: "p", text: "Se receber:" },
  { type: "ul", items: ["Produto defeituoso", "Produto danificado", "Tamanho ou modelo diferente do solicitado", "Artigo com erro de produção"] },
  { type: "p", text: "Contacte contact@vertexwear.pt com o número da encomenda e fotografias do problema, de preferência nos primeiros 30 dias após a receção." },
  { type: "p", text: "Nestes casos não é necessário devolver fisicamente a peça — as fotografias são normalmente suficientes para validar a substituição gratuita ou o reembolso, já que os nossos produtos são feitos por encomenda junto do nosso parceiro de produção." },
];

export default function DevolucoesPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <h1 className="font-serif text-3xl font-bold uppercase tracking-tight text-vertex-black md:text-4xl">
        Trocas & Devoluções
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
