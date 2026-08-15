import { LegalBlocks, type LegalBlock } from "@/components/LegalBlocks";

const blocks: LegalBlock[] = [
  { type: "p", text: "Produzido para si. Enviado para onde estiver." },
  { type: "p", text: "Alguns produtos VERTEX são produzidos apenas após a realização da encomenda. Por isso, o prazo total poderá incluir produção, preparação e transporte." },

  { type: "h2", text: "Processamento" },
  { type: "p", text: "O tempo de produção depende do produto e do centro responsável pelo fulfillment." },
  { type: "p", text: "O prazo estimado será apresentado sempre que possível durante o processo de compra." },

  { type: "h2", text: "Entrega" },
  { type: "p", text: "Os prazos variam segundo o destino e o método de envio selecionado." },
  { type: "p", text: "Uma estimativa de entrega será apresentada no checkout sempre que tecnicamente possível." },

  { type: "h2", text: "Custos" },
  { type: "p", text: "Os custos de envio são calculados de acordo com:" },
  { type: "ul", items: ["Destino", "Produtos", "Quantidade", "Fornecedor/centro de produção", "Modalidade de entrega"] },
  { type: "p", text: "O valor será apresentado antes da conclusão da encomenda." },

  { type: "h2", text: "Tracking" },
  { type: "p", text: "Quando disponível, o cliente receberá um código de acompanhamento após o envio da encomenda." },

  { type: "h2", text: "Encomendas internacionais" },
  { type: "p", text: "Encomendas enviadas para determinados destinos internacionais poderão estar sujeitas a impostos, taxas alfandegárias ou outros encargos de importação. [A PREENCHER: definir quem suporta estes encargos antes de ativar envios para esses mercados.]" },

  { type: "h2", text: "Endereço incorreto" },
  { type: "p", text: "O cliente é responsável por confirmar que o endereço indicado no checkout está correto." },
  { type: "p", text: "Caso identifique um erro, deverá contactar a VERTEX o mais rapidamente possível." },
  { type: "p", text: "Uma vez iniciada a produção ou expedida a encomenda, poderá não ser possível alterar o endereço." },
];

export default function EnviosPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <h1 className="font-serif text-3xl font-bold uppercase tracking-tight text-vertex-black md:text-4xl">
        Envios & Entregas
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
