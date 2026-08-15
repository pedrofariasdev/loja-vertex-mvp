export type Locale = "pt" | "en";

export type Dictionary = {
  nav: {
    home: string;
    drop: string;
    about: string;
    contact: string;
    search: string;
    cart: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    cta: string;
  };
  manifesto: {
    line1: string;
    line2: string;
    sub: string;
  };
  collection: {
    label: string;
    empty: string;
    from: string;
    variants: string;
    youMayLike: string;
  };
  lifestyle: {
    line1: string;
    line2: string;
  };
  featured: {
    label: string;
    cta: string;
    desc: string;
  };
  philosophy: {
    line1: string;
    line2: string;
  };
  newsletter: {
    title: string;
    sub: string;
    placeholder: string;
    button: string;
    success: string;
    error: string;
  };
  footer: {
    vertexCol: string;
    collection: string;
    about: string;
    journal: string;
    support: string;
    contact: string;
    shipping: string;
    sizeGuide: string;
    returns: string;
    legal: string;
    privacy: string;
    terms: string;
    cookies: string;
    complaintsBook: string;
    social: string;
    rights: string;
  };
  search: {
    title: string;
    placeholder: string;
    empty: string;
    resultsFor: string;
    hint: string;
  };
  promo: {
    message: string;
    code: string;
    detail: string;
    dismiss: string;
  };
  cookieConsent: {
    message: string;
    acceptAll: string;
    rejectNonEssential: string;
    customize: string;
    save: string;
    analytics: string;
    marketing: string;
    essential: string;
    essentialNote: string;
  };
  cart: {
    title: string;
    empty: string;
    backToStore: string;
    total: string;
    checkout: string;
    remove: string;
  };
  product: {
    color: string;
    size: string;
    addToCart: string;
    added: string;
    oneSize: string;
    priceTbd: string;
    compositionTitle: string;
    compositionBody: string;
    availabilityTitle: string;
    availabilityBody: string;
    shippingTitle: string;
    shippingBody: string;
    shippingLink: string;
    returnsLink: string;
  };
  about: {
    wordmarkTagline: string;
    panelEyebrow: string;
    panelHeading: string;
    introP1: string;
    introLines: string[];
    introClosing: string;
    worldsLabel: string;
    moreTitle: string;
    moreBody: string;
    moreBold: string;
    originLabel: string;
    originHeading: string;
    originBody1: string;
    originBody2: string;
    originBody3: string;
    originBold: string;
    mindsetLabel: string;
    disciplineHeading: string;
    disciplineBody: string;
    disciplineBold: string;
    movementHeading: string;
    movementBody: string;
    movementBold: string;
    minimalHeading: string;
    minimalBody: string;
    minimalBold: string;
    founderLabel: string;
    founderIntro: string;
    founderBody: string[];
    founderQuote: string;
    founderSignature: string;
    closingHeading: string;
    closingBody1: string;
    closingBody2: string;
    closingBold: string;
  };
  contact: {
    title: string;
    body: string;
    emailLabel: string;
    phoneLabel: string;
    hoursLabel: string;
    hoursValue: string;
    formFirstName: string;
    formLastName: string;
    formEmail: string;
    formPhone: string;
    formPhoneOptional: string;
    formMessage: string;
    formSubmit: string;
    formSubmitting: string;
    formSuccess: string;
    formError: string;
  };
};

export const dictionaries: Record<Locale, Dictionary> = {
  pt: {
    nav: {
      home: "Início",
      drop: "Drop 001",
      about: "Sobre",
      contact: "Contacto",
      search: "Pesquisar",
      cart: "Carrinho",
    },
    hero: {
      eyebrow: "Vertex",
      title: "Built by Discipline.",
      cta: "Shop Drop 001",
    },
    manifesto: {
      line1: "Discipline isn't what you show.",
      line2: "It's what you repeat.",
      sub: "VERTEX não é um produto. É uma ideia que se repete todos os dias.",
    },
    collection: {
      label: "Drop 001",
      empty: "Ainda não há produtos sincronizados.",
      from: "Desde",
      variants: "variante(s)",
      youMayLike: "Também podes gostar",
    },
    lifestyle: {
      line1: "Every rep. Every mile.",
      line2: "Every rise before dawn.",
    },
    featured: {
      label: "Peça em destaque",
      cta: "Ver Produto",
      desc: "Algodão pesado, corte estruturado, feitio que aguenta o treino e a cidade. Construída para se repetir todos os dias.",
    },
    philosophy: {
      line1: "Minimal by design.",
      line2: "Built with purpose.",
    },
    newsletter: {
      title: "Join the Discipline.",
      sub: "Early access to drops, stories and everything we're building.",
      placeholder: "O teu email",
      button: "Juntar",
      success: "Bem-vindo à disciplina.",
      error: "Algo correu mal. Tenta outra vez.",
    },
    footer: {
      vertexCol: "Vertex",
      collection: "Coleção",
      about: "Sobre",
      journal: "Jornal",
      support: "Apoio",
      contact: "Contacto",
      shipping: "Envios & Entregas",
      sizeGuide: "Guia de Tamanhos",
      returns: "Trocas & Devoluções",
      legal: "Legal",
      privacy: "Política de Privacidade",
      terms: "Termos e Condições",
      cookies: "Política de Cookies",
      complaintsBook: "Livro de Reclamações",
      social: "Social",
      rights: "VERTEX. Built by Discipline.",
    },
    search: {
      title: "Pesquisar",
      placeholder: "Pesquisar produtos...",
      empty: "Sem resultados.",
      resultsFor: "Resultados para",
      hint: "Escreve para pesquisar o catálogo VERTEX.",
    },
    promo: {
      message: "Bem-vindo à VERTEX. Usa o código",
      code: "BEMVINDO10",
      detail: "e ganha 10% de desconto na tua primeira encomenda.",
      dismiss: "Fechar",
    },
    cookieConsent: {
      message:
        "Usamos cookies para o site funcionar e, com a tua autorização, para perceber como é utilizado. Consulta a nossa Política de Cookies.",
      acceptAll: "Aceitar todos",
      rejectNonEssential: "Rejeitar não essenciais",
      customize: "Personalizar",
      save: "Guardar preferências",
      analytics: "Cookies de análise",
      marketing: "Cookies de marketing",
      essential: "Cookies essenciais",
      essentialNote: "Sempre ativos — necessários para o funcionamento do site.",
    },
    cart: {
      title: "Carrinho",
      empty: "O teu carrinho está vazio.",
      backToStore: "Voltar à loja",
      total: "Total",
      checkout: "Finalizar compra (em breve)",
      remove: "remover",
    },
    product: {
      color: "Cor",
      size: "Tamanho",
      addToCart: "Adicionar ao carrinho",
      added: "Adicionado ✓",
      oneSize: "Tamanho único",
      priceTbd: "Preço a definir",
      compositionTitle: "Composição, Cuidados e Origem",
      compositionBody:
        "Peça feita maioritariamente em algodão pesado, com corte estruturado pensado para durar. Lavar à máquina a frio, do avesso, com cores semelhantes. Não usar lixívia. Secar à sombra ou a baixa temperatura. Não engomar diretamente sobre estampados.",
      availabilityTitle: "Disponibilidade em Loja",
      availabilityBody:
        "A VERTEX é uma marca 100% online — não temos loja física por agora. Todas as peças são produzidas por encomenda e enviadas diretamente para a tua morada.",
      shippingTitle: "Envios e Devoluções",
      shippingBody:
        "Os prazos de entrega variam consoante o destino e o produto. Tens 14 dias após a receção para exercer o direito de livre resolução.",
      shippingLink: "Ver política de envios",
      returnsLink: "Ver política de devoluções",
    },
    about: {
      wordmarkTagline: "Built by Discipline.",
      panelEyebrow: "Sobre a Vertex",
      panelHeading: "Mais que uma marca. Um movimento.",
      introP1:
        "VERTEX nasceu de um sonho simples: construir algo próprio. Não apenas uma marca de roupa, mas uma ideia capaz de representar pessoas que estão constantemente construindo alguma coisa — um corpo, uma carreira, um projeto, uma história ou uma nova versão de si mesmas.",
      introLines: ["Sem atalhos.", "Sem fórmulas prontas.", "Construída passo a passo."],
      introClosing: "Assim como tudo que acreditamos que realmente vale a pena.",
      worldsLabel: "Entre mundos",
      moreTitle: "Lifestyle. Performance. Street. Everyday.",
      moreBody:
        "A VERTEX vive no encontro entre diferentes mundos. Não queremos definir quem pode vestir VERTEX. Queremos criar peças que façam sentido em diferentes momentos da vida — no treino, na corrida, na cidade, no trabalho, numa viagem ou simplesmente no dia a dia.",
      moreBold: "Estilo não deveria limitar pessoas.\nDeveria acompanhar quem elas são.",
      originLabel: "Origem",
      originHeading: "Uma história real.",
      originBody1:
        "Por trás da VERTEX existe uma pessoa, uma família e um sonho de construir algo maior. A marca nasceu da vontade de transformar uma ideia em algo real.",
      originBody2:
        "Do desejo de empreender, aprender, criar e construir um negócio que pudesse crescer sem perder aquilo que o originou.",
      originBody3: "Começou com uma ideia. E com a decisão de levá-la a sério.",
      originBold: "Começar com o que temos.\nEvoluir todos os dias.",
      mindsetLabel: "Mentalidade",
      disciplineHeading: "Built by Discipline.",
      disciplineBody:
        "Disciplina para nós não significa perfeição. Significa aparecer novamente. Treinar novamente. Criar novamente. Tentar novamente. Continuar quando ainda não existe resultado para mostrar.",
      disciplineBold:
        "É essa filosofia que deu origem ao nosso lema: BUILT BY DISCIPLINE. Porque aquilo que construímos todos os dias eventualmente se torna parte de quem somos.",
      movementHeading: "Designed for movement",
      movementBody:
        "A VERTEX não pertence apenas à academia. Nem apenas às ruas. Nem apenas ao lifestyle. Queremos existir entre esses mundos. Minimalismo do everyday wear. Energia do streetwear. Mentalidade do universo de treino e performance.",
      movementBold:
        "Peças que acompanham movimento. E continuam fazendo sentido quando o treino termina.",
      minimalHeading: "Minimal by design. Built with purpose.",
      minimalBody:
        "Não acreditamos em colocar mais apenas para parecer mais. Preferimos formas simples, identidade forte e detalhes que tenham propósito. Preto. Branco. Texturas. Movimento.",
      minimalBold: "Uma estética limpa que deixa a pessoa e o produto falarem.",
      founderLabel: "From the founder",
      founderIntro: "A VERTEX nasceu da vontade de construir algo próprio.",
      founderBody: [
        "Sou Pedro Farias, fundador da VERTEX, e sempre fui movido pela ideia de criar, aprender e evoluir. Entre tecnologia, treino, família e novos projetos, percebi que a disciplina estava presente em quase tudo que eu queria construir na minha vida.",
        "Mudar de país, começar novos caminhos e continuar perseguindo objetivos ensinou-me que grandes mudanças raramente acontecem de uma vez. Elas são construídas através de pequenas decisões repetidas todos os dias.",
        "Foi dessa visão que nasceu a VERTEX. Uma marca criada para quem vive em movimento — entre o treino, a rua, o trabalho, os projetos e a vida real.",
        "Mais do que roupa, quero construir uma identidade que represente evolução, propósito e a coragem de continuar construindo mesmo quando o resultado ainda não apareceu.",
      ],
      founderQuote: "Built by Discipline.",
      founderSignature: "— Pedro Farias, Founder, VERTEX",
      closingHeading: "This is only the beginning.",
      closingBody1: "A VERTEX ainda está sendo construída. E fazemos questão de não esconder isso.",
      closingBody2:
        "Cada coleção, cada produto e cada decisão faz parte dessa evolução. Estamos construindo uma marca que queremos que dure.",
      closingBold:
        "Uma marca que pode crescer junto com as pessoas que acreditarem nela desde o início.",
    },
    contact: {
      title: "Contacto",
      body: "Alguma questão sobre uma encomenda, uma peça, ou só queres dizer olá?",
      emailLabel: "Email",
      phoneLabel: "Telefone",
      hoursLabel: "Horário de apoio",
      hoursValue: "Segunda a sexta, das 09h às 18h",
      formFirstName: "Nome",
      formLastName: "Sobrenome",
      formEmail: "Email",
      formPhone: "Telefone",
      formPhoneOptional: "Telefone (opcional)",
      formMessage: "Mensagem",
      formSubmit: "Enviar mensagem",
      formSubmitting: "A enviar...",
      formSuccess: "Mensagem enviada. Obrigado — vamos responder em breve.",
      formError: "Algo correu mal. Tenta outra vez.",
    },
  },
  en: {
    nav: {
      home: "Home",
      drop: "Drop 001",
      about: "About",
      contact: "Contact",
      search: "Search",
      cart: "Cart",
    },
    hero: {
      eyebrow: "Vertex",
      title: "Built by Discipline.",
      cta: "Shop Drop 001",
    },
    manifesto: {
      line1: "Discipline isn't what you show.",
      line2: "It's what you repeat.",
      sub: "VERTEX isn't a product. It's an idea repeated every day.",
    },
    collection: {
      label: "Drop 001",
      empty: "No products synced yet.",
      from: "From",
      variants: "variant(s)",
      youMayLike: "You may also like",
    },
    lifestyle: {
      line1: "Every rep. Every mile.",
      line2: "Every rise before dawn.",
    },
    featured: {
      label: "Featured piece",
      cta: "View Product",
      desc: "Heavyweight cotton, structured cut, built to take the training and the city. Made to be repeated every day.",
    },
    philosophy: {
      line1: "Minimal by design.",
      line2: "Built with purpose.",
    },
    newsletter: {
      title: "Join the Discipline.",
      sub: "Early access to drops, stories and everything we're building.",
      placeholder: "Your email",
      button: "Join",
      success: "Welcome to the discipline.",
      error: "Something went wrong. Try again.",
    },
    footer: {
      vertexCol: "Vertex",
      collection: "Collection",
      about: "About",
      journal: "Journal",
      support: "Support",
      contact: "Contact",
      shipping: "Shipping & Delivery",
      sizeGuide: "Size Guide",
      returns: "Returns & Exchanges",
      legal: "Legal",
      privacy: "Privacy Policy",
      terms: "Terms & Conditions",
      cookies: "Cookie Policy",
      complaintsBook: "Complaints Book",
      social: "Social",
      rights: "VERTEX. Built by Discipline.",
    },
    search: {
      title: "Search",
      placeholder: "Search products...",
      empty: "No results.",
      resultsFor: "Results for",
      hint: "Type to search the VERTEX catalog.",
    },
    promo: {
      message: "Welcome to VERTEX. Use code",
      code: "BEMVINDO10",
      detail: "for 10% off your first order.",
      dismiss: "Close",
    },
    cookieConsent: {
      message:
        "We use cookies to make the site work and, with your permission, to understand how it's used. See our Cookie Policy.",
      acceptAll: "Accept all",
      rejectNonEssential: "Reject non-essential",
      customize: "Customize",
      save: "Save preferences",
      analytics: "Analytics cookies",
      marketing: "Marketing cookies",
      essential: "Essential cookies",
      essentialNote: "Always on — required for the site to work.",
    },
    cart: {
      title: "Cart",
      empty: "Your cart is empty.",
      backToStore: "Back to store",
      total: "Total",
      checkout: "Checkout (coming soon)",
      remove: "remove",
    },
    product: {
      color: "Color",
      size: "Size",
      addToCart: "Add to cart",
      added: "Added ✓",
      oneSize: "One size",
      priceTbd: "Price TBD",
      compositionTitle: "Composition, Care & Origin",
      compositionBody:
        "Made mostly from heavyweight cotton, with a structured cut built to last. Machine wash cold, inside out, with similar colors. Do not bleach. Dry in shade or on low heat. Do not iron directly over printed areas.",
      availabilityTitle: "Store Availability",
      availabilityBody:
        "VERTEX is a 100% online brand — we don't have a physical store yet. Every piece is made to order and shipped straight to your address.",
      shippingTitle: "Shipping & Returns",
      shippingBody:
        "Delivery times vary by destination and product. You have 14 days after receiving your order to exercise your right of withdrawal.",
      shippingLink: "View shipping policy",
      returnsLink: "View returns policy",
    },
    about: {
      wordmarkTagline: "Built by Discipline.",
      panelEyebrow: "About Vertex",
      panelHeading: "More than a brand. A movement.",
      introP1:
        "VERTEX was born from a simple dream: to build something of our own. Not just a clothing brand, but an idea that speaks to people who are constantly building something — a body, a career, a project, a story, or a new version of themselves.",
      introLines: ["No shortcuts.", "No ready-made formulas.", "Built step by step."],
      introClosing: "Just like everything we believe is truly worth it.",
      worldsLabel: "Between worlds",
      moreTitle: "Lifestyle. Performance. Street. Everyday.",
      moreBody:
        "VERTEX lives at the intersection of different worlds. We don't want to define who gets to wear VERTEX. We want to create pieces that make sense in different moments of life — training, running, the city, work, travel, or simply everyday life.",
      moreBold: "Style shouldn't limit people.\nIt should follow who they are.",
      originLabel: "Origin",
      originHeading: "A real story.",
      originBody1:
        "Behind VERTEX there's a person, a family, and a dream to build something bigger. The brand was born from the will to turn an idea into something real.",
      originBody2:
        "From the drive to build a business, learn, create, and grow without losing what started it.",
      originBody3: "It started with an idea. And the decision to take it seriously.",
      originBold: "Start with what we have.\nEvolve every day.",
      mindsetLabel: "Mindset",
      disciplineHeading: "Built by Discipline.",
      disciplineBody:
        "To us, discipline doesn't mean perfection. It means showing up again. Training again. Creating again. Trying again. Continuing when there's still no result to show.",
      disciplineBold:
        "That's the philosophy behind our motto: BUILT BY DISCIPLINE. Because what we build every day eventually becomes part of who we are.",
      movementHeading: "Designed for movement",
      movementBody:
        "VERTEX doesn't belong only to the gym. Or only to the streets. Or only to lifestyle. We want to exist between those worlds. The minimalism of everyday wear. The energy of streetwear. The mindset of training and performance.",
      movementBold:
        "Pieces built to move with you. And that still make sense once the training ends.",
      minimalHeading: "Minimal by design. Built with purpose.",
      minimalBody:
        "We don't believe in adding more just to look like more. We prefer simple forms, a strong identity, and details that serve a purpose. Black. White. Texture. Movement.",
      minimalBold: "A clean aesthetic that lets the person and the product speak.",
      founderLabel: "From the founder",
      founderIntro: "VERTEX was born from the will to build something of my own.",
      founderBody: [
        "I'm Pedro Farias, founder of VERTEX, and I've always been driven by the idea of creating, learning, and evolving. Between technology, training, family, and new projects, I realized discipline was present in almost everything I wanted to build in my life.",
        "Moving to a new country, starting new paths, and continuing to chase goals taught me that big changes rarely happen all at once. They're built through small decisions repeated every day.",
        "That vision is where VERTEX was born. A brand built for those who live in motion — between training, the street, work, projects, and real life.",
        "More than clothing, I want to build an identity that represents evolution, purpose, and the courage to keep building even when the results haven't shown up yet.",
      ],
      founderQuote: "Built by Discipline.",
      founderSignature: "— Pedro Farias, Founder, VERTEX",
      closingHeading: "This is only the beginning.",
      closingBody1: "VERTEX is still being built. And we make a point of not hiding that.",
      closingBody2:
        "Every collection, every product, and every decision is part of that evolution. We're building a brand we want to last.",
      closingBold:
        "One that can grow together with the people who believe in it from the start.",
    },
    contact: {
      title: "Contact",
      body: "Question about an order, a piece, or just want to say hi?",
      emailLabel: "Email",
      phoneLabel: "Phone",
      hoursLabel: "Support hours",
      hoursValue: "Monday to Friday, 9am–6pm",
      formFirstName: "First name",
      formLastName: "Last name",
      formEmail: "Email",
      formPhone: "Phone",
      formPhoneOptional: "Phone (optional)",
      formMessage: "Message",
      formSubmit: "Send message",
      formSubmitting: "Sending...",
      formSuccess: "Message sent. Thanks — we'll get back to you soon.",
      formError: "Something went wrong. Try again.",
    },
  },
};
