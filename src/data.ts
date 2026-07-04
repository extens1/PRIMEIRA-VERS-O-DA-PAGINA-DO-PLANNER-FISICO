import { FAQItem, Testimonial, PlannerTab, KitOption } from "./types";

export const FAQ_DATA: FAQItem[] = [
  {
    id: "faq-1",
    question: "Quanto tempo demora para chegar na minha casa?",
    answer: "O envio é feito via Correios ou Transportadora parceira em até 24 horas úteis após a aprovação da compra. O prazo médio de entrega varia de 3 a 10 dias úteis, dependendo da sua região. Você receberá um código de rastreamento no e-mail e no WhatsApp para acompanhar cada passo da entrega."
  },
  {
    id: "faq-2",
    question: "O planner serve para mães de filhos de qualquer idade?",
    answer: "Com certeza! Seja você mãe de bebês, crianças pequenas, adolescentes ou até de filhos adultos. O planner foi estruturado sobre princípios bíblicos atemporais. A necessidade de clamor, direcionamento, proteção espiritual e organização do lar acompanha todas as fases da maternidade."
  },
  {
    id: "faq-3",
    question: "Quais são as formas de pagamento?",
    answer: "Você pode garantir o seu planner via PIX (com aprovação imediata e envio mais rápido) ou parcelar em até 12 vezes no Cartão de Crédito. Utilizamos uma plataforma de pagamento 100% segura e criptografada."
  },
  {
    id: "faq-4",
    question: "O frete é seguro?",
    answer: "Sim, absolutamente. Todas as nossas entregas têm seguro total contra extravio ou danos físicos causados pelo transporte. Caso ocorra qualquer imprevisto, nós enviamos um novo exemplar imediatamente, sem nenhum custo adicional para você."
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "t-1",
    name: "Mariana S.",
    childrenInfo: "Mãe do Léo (6 anos) e da Bia (3 anos)",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
    text: "Eu me sentia perdida e culpada por não conseguir orar com constância. Com o Planner, consegui criar o hábito de acordar 15 minutos mais cedo. Meus filhos já reparam que estou mais calma e que a nossa casa mudou de atmosfera. É visível o ambiente de paz!",
    rating: 5
  },
  {
    id: "t-2",
    name: "Rute M.",
    childrenInfo: "Mãe do Gustavo (14 anos) e da Letícia (11 anos)",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150",
    text: "O material é lindo demais, dá gosto de abrir todo dia! A capa dura e os detalhes dourados são impecáveis. Mas o melhor é o conteúdo: ter um mapa de oração específico pelos meus filhos adolescentes me deu um direcionamento que eu não tinha. Ver as orações sendo respondidas anotadas nele não tem preço.",
    rating: 5
  },
  {
    id: "t-3",
    name: "Ana Cláudia V.",
    childrenInfo: "Mãe da Rebeca (8 anos)",
    avatarUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=150&h=150",
    text: "O planner mudou meu devocional. Agora eu sei exatamente por onde começar, como mapear os jejuns e como manter meu lar organizado sob a direção de Deus. Um verdadeiro escudo espiritual para nossa casa.",
    rating: 5
  }
];

export const PLANNER_TABS: PlannerTab[] = [
  {
    id: "tab-capa",
    title: "Capa Dura Premium",
    shortDesc: "Acabamento de luxo com detalhes dourados em Hot Stamping.",
    badge: "MATERIAL FÍSICO",
    fullDesc: "Produzido com materiais nobres de alta durabilidade para suportar o uso diário ao longo do ano inteiro. Possui laminação fosca antirrisco suave ao toque e detalhes em Hot Stamping dourado que brilham à luz.",
    contentLines: [
      "Papelão cinza de alta densidade (capa rígida ultra-resistente)",
      "Acabamento Wire-O (espiral metálico duplo) em tom dourado nobre",
      "Cantoneiras de proteção metálicas para evitar amassados",
      "Fita marcadora de página em cetim premium",
      "Tamanho perfeito para carregar na bolsa ou deixar na mesa de cabeceira"
    ]
  },
  {
    id: "tab-oracao",
    title: "Mapeamento de Oração",
    shortDesc: "Clamor estratégico focado em cada área da vida do seu filho.",
    badge: "CONTEÚDO DEVOCIONAL",
    fullDesc: "Uma seção dedicada exclusivamente para estruturar suas preces por cada um dos seus filhos. Pare de orar de forma genérica e passe a clamar com foco e autoridade pelas áreas cruciais do desenvolvimento deles.",
    contentLines: [
      "Espaço individualizado para cada filho",
      "Campos para: Saúde física, Proteção espiritual, Futuro acadêmico e profissional",
      "Espaço para registrar: Amizades, Emoções, Caráter e Relacionamento com Deus",
      "Página de 'Orações Respondidas': O testemunho escrito da fidelidade do Senhor no seu lar",
      "Guia bíblico de promessas para os filhos para declarar durante a oração"
    ]
  },
  {
    id: "tab-devocional",
    title: "Devocional Diário",
    shortDesc: "Sua rotina espiritual com direcionamento e constância diária.",
    badge: "CONTEÚDO DEVOCIONAL",
    fullDesc: "Um roteiro intencional para os seus momentos de solitude com Deus. Chega de abrir a Bíblia sem rumo ou se perder em pensamentos durante a leitura diária.",
    contentLines: [
      "Versículo da Semana em destaque para memorização e meditação",
      "Perguntas de reflexão profunda para aplicar a palavra no seu dia a dia",
      "Seção de Gratidão diária: Exercite o coração grato logo pela manhã",
      "Espaço para anotações das revelações e insights do seu estudo bíblico",
      "Lembrete visual para manter a constância e o foco diário"
    ]
  },
  {
    id: "tab-jejum",
    title: "Jejum e Clamor",
    shortDesc: "Organize o seu posicionamento de guerra espiritual com propósito.",
    badge: "GUERRA ESPIRITUAL",
    fullDesc: "O jejum é uma arma poderosa. Com esta seção, você planejará seus períodos de consagração de forma clara, com propósitos definidos e acompanhamento do seu progresso espiritual.",
    contentLines: [
      "Cronograma mensal de consagração e jejum",
      "Motivo principal do Jejum (Quebra de correntes, sabedoria, cura, portas abertas)",
      "Passagens bíblicas de suporte para meditar durante o período de abstinência",
      "Diário de sentimentos e revelações durante os dias de jejum",
      "Registro de vitórias e libertações alcançadas"
    ]
  },
  {
    id: "tab-lar",
    title: "Organização do Lar",
    shortDesc: "Sabedoria prática para que o seu lar seja um ambiente de paz.",
    badge: "ORGANIZAÇÃO DIÁRIA",
    fullDesc: "Provérbios 14:1 diz que 'a mulher sábia edifica a sua casa'. Esta seção une espiritualidade e gestão do lar, permitindo planejar tarefas com facilidade para eliminar o caos físico da sua rotina.",
    contentLines: [
      "Planejamento semanal de rotinas e tarefas da casa",
      "Cardápio semanal básico para alimentar sua família com tranquilidade",
      "Checklist de organização por cômodo (para manter a ordem sem exaustão)",
      "Espaço de finanças da família sob a ótica da mordomia cristã",
      "Notas livres para lembretes de mercado, escola e consultas"
    ]
  }
];

export const KITS_DATA: KitOption[] = [
  {
    id: "kit-1",
    name: "01 Planner Mães de Joelhos",
    tagline: "O seu novo aliado diário na proteção espiritual da sua família",
    originalPrice: 197.00,
    salePrice: 119.90,
    installments: 12,
    installmentValue: 11.94,
    isPopular: false,
    savings: 77.10,
    benefits: [
      "01 Planner Físico Mães de Joelhos",
      "Capa Dura Premium com Hot Stamping Dourado",
      "Gramatura das folhas: 90g (não mancha)",
      "Bônus 1: E-book '31 Motivos de Oração' (Digital)",
      "Bônus 2: Comunidade Mães Intercessoras (Acesso vitalício)",
      "Envio com Frete Promocional Seguro"
    ]
  },
  {
    id: "kit-2",
    name: "Combo Duplo: 02 Planners (Mãe + Presente)",
    tagline: "Perfeito para presentear uma amiga, mãe, irmã ou filha",
    originalPrice: 394.00,
    salePrice: 197.00,
    installments: 12,
    installmentValue: 19.62,
    isPopular: true,
    savings: 197.00,
    benefits: [
      "02 Planners Físicos Mães de Joelhos",
      "Capa Dura Premium com Hot Stamping Dourado nos dois",
      "Gramatura das folhas: 90g (não mancha)",
      "Bônus 1: E-book '31 Motivos de Oração' (Para ambas)",
      "Bônus 2: Comunidade Mães Intercessoras (2 Acessos)",
      "Frete Promocional Seguro para todo o Brasil",
      "Economia máxima (pague 1 leve o segundo pela metade do preço!)"
    ]
  },
  {
    id: "kit-3",
    name: "Combo Triplo: Ministério de Mães (03 Planners)",
    tagline: "Ideal para células, grupos de oração de mães ou famílias numerosas",
    originalPrice: 591.00,
    salePrice: 269.90,
    installments: 12,
    installmentValue: 26.88,
    isPopular: false,
    savings: 321.10,
    benefits: [
      "03 Planners Físicos Mães de Joelhos",
      "Acabamento luxuoso de altíssima qualidade nos três",
      "Gramatura das folhas: 90g (não mancha)",
      "Bônus 1: E-book '31 Motivos de Oração' (3 Cópias digitais)",
      "Bônus 2: Comunidade Mães Intercessoras (3 Acessos)",
      "FRETE GRÁTIS para todo o Brasil neste combo",
      "Melhor custo-benefício por unidade"
    ]
  }
];
