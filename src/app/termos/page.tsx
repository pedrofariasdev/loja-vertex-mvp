import { LegalBlocks, type LegalBlock } from "@/components/LegalBlocks";

const blocks: LegalBlock[] = [
  { type: "p", text: "Bem-vindo à VERTEX. Ao utilizar este website ou efetuar uma compra na VERTEX, o utilizador concorda com os presentes Termos & Condições." },
  { type: "p", text: "A VERTEX é uma marca de vestuário e acessórios dedicada à criação de produtos lifestyle, streetwear e performance." },

  { type: "h2", text: "1. Identificação" },
  { type: "p", text: "Nome comercial: VERTEX" },
  { type: "p", text: "Titular / entidade responsável: Pedro Farias" },
  { type: "p", text: "NIF/NIPC: 316943223" },
  { type: "p", text: "Morada: Rua Nery Delgado, 7 cv Esq, Lisboa" },
  { type: "p", text: "Email: contact@vertexwear.pt" },
  { type: "p", text: "Telefone: 913 477 769" },

  { type: "h2", text: "2. Produtos" },
  { type: "p", text: "Procuramos apresentar cada produto da forma mais precisa possível, incluindo cores, materiais, tamanhos e características." },
  { type: "p", text: "No entanto, pequenas diferenças de cor ou aparência podem ocorrer devido às configurações do ecrã, iluminação das fotografias ou características próprias do processo de produção." },
  { type: "p", text: "Alguns produtos VERTEX são produzidos sob demanda após a realização da encomenda." },

  { type: "h2", text: "3. Preços" },
  { type: "p", text: "Todos os preços apresentados no website são indicados em euros (€), salvo indicação em contrário." },
  { type: "p", text: "Os impostos aplicáveis serão apresentados de acordo com a legislação e o destino da encomenda." },
  { type: "p", text: "Custos de envio, quando aplicáveis, são apresentados antes da confirmação final da compra." },

  { type: "h2", text: "4. Pagamentos" },
  { type: "p", text: "Os métodos de pagamento disponíveis serão apresentados durante o checkout." },
  { type: "p", text: "A encomenda apenas será considerada confirmada após a autorização do respetivo pagamento." },

  { type: "h2", text: "5. Encomendas" },
  { type: "p", text: "Após concluir uma compra, o cliente receberá uma confirmação da encomenda através do endereço de email fornecido." },
  { type: "p", text: "A VERTEX reserva-se o direito de cancelar uma encomenda em situações excecionais, incluindo erro evidente de preço, indisponibilidade do produto, suspeita de fraude ou impossibilidade de produção." },
  { type: "p", text: "Sempre que uma encomenda seja cancelada pela VERTEX após pagamento, o respetivo valor será reembolsado." },

  { type: "h2", text: "6. Entregas" },
  { type: "p", text: "Os prazos indicados são estimativas e podem variar de acordo com:" },
  { type: "ul", items: ["País de destino", "Produto adquirido", "Local de produção", "Transportadora", "Períodos de elevada procura", "Circunstâncias fora do controlo razoável da VERTEX"] },
  { type: "p", text: "As condições completas estão disponíveis na página Envios & Entregas." },

  { type: "h2", text: "7. Livre resolução" },
  { type: "p", text: "Nas compras realizadas online, consumidores residentes na União Europeia dispõem, regra geral, de 14 dias após a receção dos produtos para exercer o direito de livre resolução, sem necessidade de apresentar justificação." },
  { type: "p", text: "Existem exceções previstas legalmente, nomeadamente para determinados bens personalizados ou claramente fabricados de acordo com especificações individuais do consumidor." },
  { type: "p", text: "O simples facto de um produto ser produzido sob demanda não significa, por si só, que o direito de devolução deixa de existir — a exceção aplica-se sobretudo quando o produto é efetivamente personalizado para aquele cliente em concreto." },

  { type: "h2", text: "8. Produtos com defeito ou não conformes" },
  { type: "p", text: "Os produtos vendidos em Portugal encontram-se abrangidos pela garantia legal aplicável." },
  { type: "p", text: "Atualmente, em Portugal, os bens móveis novos beneficiam de um prazo de 3 anos de garantia de conformidade." },
  { type: "p", text: "Caso receba um produto defeituoso, danificado ou diferente do encomendado, contacte-nos através de contact@vertexwear.pt, preferencialmente incluindo fotografias e o número da encomenda." },

  { type: "h2", text: "9. Propriedade intelectual" },
  { type: "p", text: "Todos os elementos associados à VERTEX, incluindo nome, logótipos, símbolos, designs, fotografias, textos, gráficos e conteúdos, pertencem à VERTEX ou são utilizados com autorização dos respetivos titulares." },
  { type: "p", text: "Não podem ser reproduzidos, distribuídos ou utilizados comercialmente sem autorização prévia." },

  { type: "h2", text: "10. Responsabilidade" },
  { type: "p", text: "A VERTEX não será responsável por atrasos ou incumprimentos provocados por acontecimentos fora do seu controlo razoável." },
  { type: "p", text: "Nada nestes Termos limita direitos que sejam legalmente atribuídos ao consumidor." },

  { type: "h2", text: "11. Alterações" },
  { type: "p", text: "A VERTEX poderá atualizar estes Termos sempre que necessário." },
  { type: "p", text: "A versão publicada no website será a versão aplicável no momento da utilização ou compra." },

  { type: "h2", text: "12. Lei aplicável e conflitos" },
  { type: "p", text: "Os presentes Termos regem-se pela legislação portuguesa e pela legislação da União Europeia aplicável." },
  { type: "p", text: "Em caso de conflito, recomendamos primeiro o contacto direto através de contact@vertexwear.pt." },
  { type: "p", text: "O consumidor poderá ainda recorrer às entidades competentes de resolução alternativa de litígios de consumo. Portugal dispõe de centros autorizados para mediação, conciliação e arbitragem de conflitos de consumo." },
];

export default function TermosPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <h1 className="font-serif text-3xl font-bold uppercase tracking-tight text-vertex-black md:text-4xl">
        Termos & Condições
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
