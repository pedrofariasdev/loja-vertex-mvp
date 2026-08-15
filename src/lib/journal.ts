export type JournalPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  content: string[];
};

export const journalPosts: JournalPost[] = [
  {
    slug: "bem-vindos-a-vertex",
    title: "Bem-vindos à VERTEX",
    date: "Agosto 2026",
    excerpt:
      "Uma marca que começou com uma ideia simples: construir algo próprio, todos os dias.",
    image: "/images/brand/campaign-gym-red.jpg",
    content: [
      "A VERTEX nasceu de um sonho simples: construir algo próprio. Não apenas uma marca de roupa, mas uma ideia capaz de representar pessoas que estão constantemente a construir alguma coisa — um corpo, uma carreira, um projeto, uma nova versão de si mesmas.",
      "Este espaço vai ser o nosso diário: bastidores, decisões, aprendizagens e tudo o que vai moldando a marca à medida que crescemos. Sem atalhos, sem fórmulas prontas — construído passo a passo, como tudo o resto na VERTEX.",
      "Obrigado por estares aqui desde o início.",
    ],
  },
  {
    slug: "minimal-by-design",
    title: "Minimal by Design: porque escolhemos menos",
    date: "Agosto 2026",
    excerpt:
      "Não acreditamos em colocar mais só para parecer mais. Uma reflexão sobre a nossa estética.",
    image: "/images/brand/lifestyle-weightlifter-bw.jpg",
    content: [
      "Vivemos rodeados de ruído — visual, digital, constante. Por isso, desde o primeiro dia, decidimos que a VERTEX ia para o lado oposto.",
      "Formas simples. Identidade forte. Detalhes que têm um propósito, não que existem só para preencher espaço. Preto, branco, texturas e movimento — o resto é o corpo e a atitude de quem veste.",
      "Minimalista por fora. Mas com uma ideia por trás de cada peça.",
    ],
  },
  {
    slug: "drop-001",
    title: "Drop 001: a primeira coleção",
    date: "Agosto 2026",
    excerpt: "As primeiras peças que representam tudo o que a VERTEX quer ser.",
    image: "/images/brand/campaign-runners-bridge.jpg",
    content: [
      "O Drop 001 não é só a nossa primeira coleção — é a primeira prova daquilo em que acreditamos: peças que acompanham o treino, a cidade e tudo o que vem no meio.",
      "Cada peça foi pensada para o dia a dia real: da academia ao trabalho, da rua a uma viagem. Sem termos de escolher entre performance e estilo.",
      "É só o início. Cada coleção, cada produto e cada decisão vai continuar a construir esta ideia.",
    ],
  },
];

export function getJournalPost(slug: string) {
  return journalPosts.find((post) => post.slug === slug) ?? null;
}
