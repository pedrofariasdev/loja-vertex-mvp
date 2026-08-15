import { LegalBlocks, type LegalBlock } from "@/components/LegalBlocks";

const blocks: LegalBlock[] = [
  { type: "p", text: "Produzido para si. Enviado para onde estiver." },
  { type: "p", text: "Alguns produtos VERTEX são produzidos apenas após a realização da encomenda. Por isso, o prazo total poderá incluir produção, preparação e transporte." },

  { type: "h2", text: "Processamento" },
  { type: "p", text: "O tempo de produção depende do produto e do centro responsável pelo fulfillment." },
  { type: "p", text: "O prazo estimado será apresentado sempre que possível durante o processo de compra." },

  { type: "h2", text: "Entrega" },
  { type: "p", text: "Portugal e restante União Europeia: entrega estimada entre 5 a 6 dias úteis após o envio." },
  { type: "p", text: "Outros destinos: entrega estimada entre 5 a 10 dias úteis, dependendo do país." },
  { type: "p", text: "Uma estimativa de entrega será apresentada no checkout sempre que tecnicamente possível." },

  { type: "h2", text: "Custos" },
  { type: "p", text: "Os custos de envio são fixos, por zona de destino, e apresentados no checkout antes da conclusão da encomenda:" },
  { type: "ul", items: [
    "Portugal — 4,90 € (grátis em encomendas acima de 50 €)",
    "Restante União Europeia — 5,90 € (grátis em encomendas acima de 70 €)",
    "Resto do mundo — 12,90 €",
  ] },

  { type: "h2", text: "Tracking" },
  { type: "p", text: "Quando disponível, o cliente receberá um código de acompanhamento após o envio da encomenda." },

  { type: "h2", text: "Encomendas internacionais" },
  { type: "p", text: "Para destinos fora da União Europeia, a encomenda poderá estar sujeita a impostos de importação, direitos aduaneiros ou outras taxas cobradas pelas autoridades locais no momento da entrega." },
  { type: "p", text: "Estes encargos não estão incluídos no valor da encomenda nem no custo de envio, e são da responsabilidade do cliente. A VERTEX não tem controlo sobre o valor destes encargos, que varia consoante o país de destino." },

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
