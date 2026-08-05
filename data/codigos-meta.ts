// Metadados dos códigos e leis-base da biblioteca.
// Partilhados pela página inicial e pelas páginas de leitura de cada diploma.

export type Change = {
  date: string;
  label: string;
  detail: string;
  href: string;
};

export type FiscalCode = {
  slug: string; // rota interna /codigos/<slug>
  abbr: string;
  title: string;
  diploma: string;
  date: string;
  area: string;
  status: "Vigente" | "Vigente com medidas anuais";
  latest: string;
  summary: string;
  href: string; // fonte externa (Angolex)
  changes: Change[];
};

export const oge2026 =
  "https://angolex.com/paginas/leis/lei-que-aprova-o-orcamento-geral-do-estado-para-o-exercicio-economico-de-2026a-14a-25a.html";

export const codes: FiscalCode[] = [
  {
    slug: "cgt",
    abbr: "CGT",
    title: "Código Geral Tributário",
    diploma: "Lei n.º 21/14",
    date: "22 Out 2014",
    area: "Geral",
    status: "Vigente",
    latest: "Última alteração estrutural: Lei n.º 21/20",
    summary: "Regras gerais da relação tributária, garantias, procedimento, infracções e responsabilidade tributária.",
    href: "https://angolex.com/paginas/codigos/codigo-geral-tributario.html",
    changes: [
      { date: "09 Jul 2020", label: "Lei n.º 21/20", detail: "Alteração ao Código Geral Tributário.", href: "https://angolex.com/paginas/leis/lei-que-altera-o-codigo-geral-tributario-21a-20a.html" },
      { date: "01 Jan 2026", label: "OGE 2026", detail: "Pagamento em prestações estendido a certas dívidas aduaneiras e regras anuais de regularização.", href: oge2026 },
    ],
  },
  {
    slug: "cpt",
    abbr: "CPT",
    title: "Código do Processo Tributário",
    diploma: "Lei n.º 22/14",
    date: "05 Dez 2014",
    area: "Processo",
    status: "Vigente",
    latest: "Texto-base em vigor",
    summary: "Impugnação judicial, recursos, incidentes e demais garantias processuais em matéria tributária.",
    href: "https://angolex.com/paginas/codigos/codigo-do-processo-tributario.html",
    changes: [],
  },
  {
    slug: "cef",
    abbr: "CEF",
    title: "Código das Execuções Fiscais",
    diploma: "Lei n.º 20/14",
    date: "22 Out 2014",
    area: "Cobrança",
    status: "Vigente com medidas anuais",
    latest: "Actualizado pelo artigo 26.º do OGE 2026",
    summary: "Cobrança coerciva de dívidas tributárias, situação regularizada, penhora, oposição e venda executiva.",
    href: "https://angolex.com/paginas/codigos/codigo-das-execucoes-fiscais.html",
    changes: [
      { date: "01 Jan 2026", label: "Lei n.º 14/25 — art. 26.º", detail: "Irregularidade tributária impede o desalfandegamento e permite retenção de mercadorias para pagamento de dívida.", href: oge2026 },
    ],
  },
  {
    slug: "ca",
    abbr: "CA",
    title: "Código Aduaneiro",
    diploma: "Decreto-Lei n.º 5/06",
    date: "04 Out 2006",
    area: "Aduaneiro",
    status: "Vigente com medidas anuais",
    latest: "Actualizado pelos artigos 17.º–20.º do OGE 2026",
    summary: "Regimes, procedimentos, fiscalização e infracções aplicáveis à entrada, saída e trânsito de mercadorias.",
    href: "https://angolex.com/paginas/codigos/codigo-aduaneiro.html",
    changes: [
      { date: "03 Jan 2024", label: "DLP n.º 1/24", detail: "Nova Pauta Aduaneira e respectivas Instruções Preliminares.", href: "https://angolex.com/paginas/decreto-legislativo-presidencial/instrucoes-preliminares-da-pauta-aduaneira-dos-direitos-de-importacao-e-exportacao-1a-24a.html" },
      { date: "01 Jan 2026", label: "Lei n.º 14/25 — arts. 17.º–20.º", detail: "Leilões, armazenagem, prestações e benefícios para Operadores Económicos Autorizados.", href: oge2026 },
    ],
  },
  {
    slug: "imposto-industrial",
    abbr: "CII",
    title: "Código do Imposto Industrial",
    diploma: "Lei n.º 19/14",
    date: "22 Out 2014",
    area: "Rendimento",
    status: "Vigente com medidas anuais",
    latest: "Medidas aplicáveis em 2026",
    summary: "Tributação dos lucros das actividades comerciais, industriais e equiparadas.",
    href: "https://angolex.com/paginas/codigos/codigo-do-imposto-industrial.html",
    changes: [
      { date: "20 Jul 2020", label: "Lei n.º 26/20", detail: "Alteração ampla de incidência, grupos, taxas, deduções e obrigações.", href: "https://angolex.com/paginas/codigos/alteracao-do-codigo-do-imposto-industrial.html" },
      { date: "22 Ago 2022", label: "Lei n.º 27/22", detail: "Alteração da taxa e pagamento do imposto provisório sobre vendas.", href: "https://angolex.com/paginas/codigos/alteracao-do-codigo-do-imposto-industrial-27a-22a.html" },
      { date: "01 Jan 2026", label: "Lei n.º 14/25 — art. 22.º", detail: "Declarações electrónicas obrigatórias e novas regras de amortização para sectores agrícola, pecuário e serviços financeiros móveis.", href: oge2026 },
    ],
  },
  {
    slug: "irt",
    abbr: "IRT",
    title: "Código do Imposto sobre os Rendimentos do Trabalho",
    diploma: "Lei n.º 18/14",
    date: "22 Out 2014",
    area: "Rendimento",
    status: "Vigente com medidas anuais",
    latest: "Tabela e isenção actualizadas para 2026",
    summary: "Tributação dos rendimentos por conta de outrem, por conta própria e de actividades profissionais.",
    href: "https://angolex.com/paginas/codigos/codigo-do-imposto-sobre-rendimento-de-trabalho.html",
    changes: [
      { date: "22 Jul 2020", label: "Lei n.º 28/20", detail: "Alteração ao Código do IRT e reorganização dos grupos de tributação.", href: "https://angolex.com/paginas/leis/lei-que-altera-o-codigo-do-imposto-sobre-os-rendimentos-do-trabalho-28a-20a.html" },
      { date: "01 Jan 2026", label: "Lei n.º 14/25 — art. 21.º", detail: "Isenção até Kz 150.000, nova tabela e regras do Grupo C.", href: oge2026 },
    ],
  },
  {
    slug: "iac",
    abbr: "IAC",
    title: "Código do Imposto sobre a Aplicação de Capitais",
    diploma: "DLP n.º 2/14",
    date: "20 Out 2014",
    area: "Capitais",
    status: "Vigente",
    latest: "Revisão e republicação de 2014",
    summary: "Tributação de juros, dividendos, royalties e outros rendimentos de aplicação de capitais.",
    href: "https://angolex.com/paginas/codigos/codigo-do-imposto-sobre-aplicacao-de-capitais-revisao-e-republicacao.html",
    changes: [],
  },
  {
    slug: "imposto-predial",
    abbr: "IP",
    title: "Código do Imposto Predial",
    diploma: "Lei n.º 20/20",
    date: "09 Jul 2020",
    area: "Património",
    status: "Vigente com medidas anuais",
    latest: "Benefícios habitacionais para 2026",
    summary: "Tributação da posse, renda e transmissão onerosa ou gratuita de imóveis urbanos e rústicos.",
    href: "https://angolex.com/paginas/codigos/codigo-do-imposto-predial.html",
    changes: [
      { date: "01 Jan 2026", label: "Lei n.º 14/25 — art. 27.º", detail: "Isenção na transmissão habitacional até Kz 40 milhões e redução de 50% até Kz 100 milhões.", href: oge2026 },
    ],
  },
  {
    slug: "imposto-selo",
    abbr: "IS",
    title: "Código do Imposto de Selo",
    diploma: "DLP n.º 3/14",
    date: "21 Out 2014",
    area: "Consumo",
    status: "Vigente com medidas anuais",
    latest: "Isenções introduzidas pelo OGE 2026",
    summary: "Tributação dos actos, contratos, documentos, títulos, operações e situações previstos na tabela anexa.",
    href: "https://angolex.com/paginas/codigos/codigo-do-imposto-de-selo.html",
    changes: [
      { date: "01 Jan 2026", label: "Lei n.º 14/25 — arts. 30.º e 35.º", detail: "Isenções para Mercado Monetário Interbancário, aumentos de capital e certas transacções financeiras móveis.", href: oge2026 },
    ],
  },
  {
    slug: "iva",
    abbr: "IVA",
    title: "Código do Imposto sobre o Valor Acrescentado",
    diploma: "Lei n.º 7/19",
    date: "24 Abr 2019",
    area: "Consumo",
    status: "Vigente com medidas anuais",
    latest: "Taxas e mudança de regime actualizadas para 2026",
    summary: "Imposto geral sobre o consumo incidente em transmissões, prestações de serviços e importações.",
    href: "https://angolex.com/paginas/codigos/codigo-do-imposto-sobre-o-valor-acrescentado.html",
    changes: [
      { date: "28 Dez 2023", label: "Lei n.º 14/23", detail: "Primeira alteração ao Código do IVA.", href: "https://angolex.com/paginas/leis/lei-de-alteracao-ao-codigo-do-imposto-sobre-o-valor-acrescentado-primeira-alteracao-14a-23a.html" },
      { date: "01 Jan 2026", label: "Lei n.º 14/25 — art. 23.º", detail: "IVA de 5% para certos equipamentos industriais e mudança de regime após ultrapassar limiares legais.", href: oge2026 },
    ],
  },
  {
    slug: "iec",
    abbr: "IEC",
    title: "Lei do Imposto Especial de Consumo",
    diploma: "Lei n.º 16/21",
    date: "19 Jul 2021",
    area: "Consumo",
    status: "Vigente com medidas anuais",
    latest: "Taxas anuais de 2026",
    summary: "Tributação selectiva de bens sujeitos a especial desincentivo ou compensação de custos sociais.",
    href: "https://angolex.com/paginas/leis/lei-do-imposto-especial-de-consumo.html",
    changes: [
      { date: "01 Jan 2026", label: "Lei n.º 14/25 — art. 34.º", detail: "Taxas de 2026 para bebidas espirituosas, tabaco e derivados no Anexo IV.", href: oge2026 },
    ],
  },
  {
    slug: "beneficios-fiscais",
    abbr: "CBF",
    title: "Código dos Benefícios Fiscais",
    diploma: "Lei n.º 8/22",
    date: "14 Abr 2022",
    area: "Benefícios",
    status: "Vigente com medidas anuais",
    latest: "Âmbito condicionado pelo OGE 2026",
    summary: "Regime geral de isenções, deduções, créditos e demais incentivos fiscais ao investimento.",
    href: "https://angolex.com/paginas/codigos/codigo-dos-beneficios-fiscais.html",
    changes: [
      { date: "01 Jan 2026", label: "Lei n.º 14/25 — art. 36.º", detail: "Benefícios ao investimento na fase de implementação; vedação da atribuição a reinvestimentos.", href: oge2026 },
    ],
  },
  {
    slug: "ivm",
    abbr: "IVM",
    title: "Lei do Imposto sobre os Veículos Motorizados",
    diploma: "Lei n.º 24/20",
    date: "13 Jul 2020",
    area: "Património",
    status: "Vigente com medidas anuais",
    latest: "Tabelas actualizadas para 2026",
    summary: "Imposto anual sobre automóveis, motociclos, embarcações e aeronaves sujeitos a registo.",
    href: "https://angolex.com/paginas/leis/lei-do-imposto-sobre-os-veiculos-motorizados.html",
    changes: [
      { date: "01 Jan 2026", label: "Lei n.º 14/25 — art. 25.º", detail: "Nova fórmula para embarcações, isenção até 25 HP e actualização da tabela de aeronaves.", href: oge2026 },
    ],
  },
];

export const codeBySlug = (slug: string) => codes.find((item) => item.slug === slug);
