import type { Metadata } from "next";
import { LegalBlocks, type LegalBlock } from "@/components/LegalBlocks";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como a VERTEX recolhe, usa e protege os teus dados pessoais, em conformidade com o RGPD.",
  alternates: { canonical: "/privacidade" },
};

const blocks: LegalBlock[] = [
  { type: "p", text: "A VERTEX respeita a privacidade dos seus clientes e visitantes." },
  { type: "p", text: "O tratamento de dados pessoais é realizado de acordo com o Regulamento Geral sobre a Proteção de Dados (RGPD) e restante legislação aplicável." },

  { type: "h2", text: "1. Responsável pelo tratamento" },
  { type: "p", text: "Responsável: Pedro Farias (VERTEX)" },
  { type: "p", text: "NIF: 316943223" },
  { type: "p", text: "Morada: Rua Nery Delgado, 7 cv Esq, Lisboa" },
  { type: "p", text: "Email de privacidade: contact@vertexwear.pt" },

  { type: "h2", text: "2. Dados que podemos recolher" },
  { type: "p", text: "Dependendo da utilização do website, poderemos recolher:" },
  { type: "ul", items: ["Nome", "Email", "Telefone", "Endereço de faturação", "Endereço de entrega", "Informações relacionadas com encomendas", "Histórico de compras", "Informações técnicas sobre dispositivo e navegador", "Endereço IP", "Preferências de comunicação", "Dados necessários à prevenção de fraude"] },
  { type: "p", text: "Os dados completos de pagamento são processados pelo prestador de pagamentos utilizado no checkout (Stripe), e não são armazenados diretamente pela VERTEX." },

  { type: "h2", text: "3. Para que utilizamos os dados" },
  { type: "p", text: "Os dados poderão ser utilizados para:" },
  { type: "ul", items: ["Processar encomendas", "Efetuar entregas", "Fornecer suporte", "Processar pagamentos", "Prevenir fraude", "Cumprir obrigações fiscais e legais", "Melhorar o website", "Enviar comunicações de marketing quando exista base legal apropriada", "Gerir a newsletter e o acesso antecipado aos drops"] },

  { type: "h2", text: "4. Bases legais" },
  { type: "p", text: "Consoante a situação, o tratamento poderá basear-se em:" },
  { type: "ul", items: ["Execução de contrato", "Cumprimento de obrigação legal", "Consentimento", "Interesse legítimo, quando aplicável"] },

  { type: "h2", text: "5. Partilha de dados" },
  { type: "p", text: "Poderemos partilhar dados estritamente necessários com prestadores responsáveis por:" },
  { type: "ul", items: ["Pagamentos (Stripe)", "Base de dados e infraestrutura tecnológica (Supabase)", "Produção e fulfillment (Printful)", "Transportadoras", "Email", "Analytics, quando legalmente permitido", "Contabilidade e cumprimento de obrigações legais"] },
  { type: "p", text: "Por exemplo, a Printful poderá necessitar de dados de identificação e entrega para produzir e enviar determinadas encomendas." },

  { type: "h2", text: "6. Transferências internacionais" },
  { type: "p", text: "Quando os nossos prestadores tratem dados fora do Espaço Económico Europeu, serão utilizados mecanismos legalmente adequados para essas transferências, sempre que exigido pelo RGPD." },

  { type: "h2", text: "7. Conservação" },
  { type: "p", text: "Os dados pessoais serão conservados apenas durante o período necessário às finalidades que justificaram a recolha, ou durante os períodos exigidos legalmente." },

  { type: "h2", text: "8. Direitos" },
  { type: "p", text: "Nos termos do RGPD, poderá ter direito a:" },
  { type: "ul", items: ["Acesso", "Retificação", "Apagamento", "Limitação do tratamento", "Oposição", "Portabilidade", "Retirada do consentimento"] },
  { type: "p", text: "Também poderá apresentar reclamação perante a Comissão Nacional de Proteção de Dados (CNPD)." },

  { type: "h2", text: "9. Newsletter" },
  { type: "p", text: "Pode cancelar a subscrição de comunicações de marketing a qualquer momento através do link incluído nos emails ou contactando-nos." },

  { type: "h2", text: "10. Segurança" },
  { type: "p", text: "Utilizamos medidas técnicas e organizativas adequadas para proteger os dados pessoais contra acesso, destruição, alteração ou divulgação não autorizados." },
];

export default function PrivacidadePage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <h1 className="font-serif text-3xl font-bold uppercase tracking-tight text-vertex-black md:text-4xl">
        Política de Privacidade
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
