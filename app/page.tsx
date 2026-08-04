"use client";

import { useMemo, useState } from "react";

type Change = {
  date: string;
  label: string;
  detail: string;
  href: string;
};

type FiscalCode = {
  abbr: string;
  title: string;
  diploma: string;
  date: string;
  area: string;
  status: "Vigente" | "Vigente com medidas anuais";
  latest: string;
  summary: string;
  href: string;
  changes: Change[];
};

type OfficialFile = {
  year: number;
  no: string;
  title: string;
  topic: string;
  href: string;
  kind?: "Circular" | "Anexo";
};

const oge2026 = "https://angolex.com/paginas/leis/lei-que-aprova-o-orcamento-geral-do-estado-para-o-exercicio-economico-de-2026a-14a-25a.html";

const codes: FiscalCode[] = [
  {
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

const updateHighlights = [
  { code: "IRT", title: "Isenção elevada", value: "Kz 150.000", detail: "Novo limite mensal de isenção e tabela do trabalho por conta de outrem.", article: "Art. 21.º" },
  { code: "IVA", title: "Equipamento industrial", value: "5%", detail: "Taxa reduzida condicionada à verificação da natureza e finalidade industrial.", article: "Art. 23.º" },
  { code: "IP", title: "Habitação", value: "Até Kz 40 M", detail: "Isenção na transmissão; redução de 50% entre Kz 40 M e Kz 100 M.", article: "Art. 27.º" },
  { code: "CEOC", title: "Operações cambiais", value: "2,5% / 10%", detail: "Contribuição especial para pessoas singulares e colectivas em transferências abrangidas.", article: "Art. 16.º" },
  { code: "IVA", title: "Mudança de regime", value: "Mês seguinte", detail: "Prazo após ultrapassar os limiares dos regimes de exclusão ou simplificado.", article: "Art. 23.º" },
  { code: "IS", title: "Novas isenções", value: "MMI + capital", detail: "Mercado Monetário Interbancário e aumentos de capital social.", article: "Art. 30.º" },
];

const circulars: OfficialFile[] = [
  { year: 2026, no: "01", title: "Medidas tributárias introduzidas pela Lei do OGE 2026", topic: "OGE", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw41/mzux/~edisp/minfin5351435.pdf" },
  { year: 2026, no: "02", title: "Política de atendimento e assistência ao contribuinte", topic: "Atendimento", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw41/mzux/~edisp/minfin5351436.pdf" },
  { year: 2026, no: "03", title: "Aprovação de manuais de processos e procedimentos", topic: "Gestão interna", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw41/mzux/~edisp/minfin5351439.pdf" },
  { year: 2026, no: "05-A", title: "Circular de 13 de Fevereiro de 2026", topic: "Fiscal", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw41/mzuz/~edisp/minfin5353750.pdf" },
  { year: 2026, no: "05-B", title: "Circular GACA / DSF / GJ / AGT", topic: "Fiscal", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw41/ndqz/~edisp/minfin5443713.pdf" },
  { year: 2026, no: "06", title: "Circular — ficheiro publicado pela AGT", topic: "Geral", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw41/ndqz/~edisp/minfin5443714.pdf" },
  { year: 2026, no: "Anexo", title: "Lista de sociedades diamantíferas e investidoras petrolíferas isentas", topic: "Tributação especial", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw41/ndcw/~edisp/minfin5470640.pdf", kind: "Anexo" },
  { year: 2026, no: "07", title: "Alfandegamento em situação de contingência", topic: "Aduaneiro", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw41/ntaw/~edisp/minfin5500120.pdf" },
  { year: 2026, no: "08", title: "Circular GACA / GJ / AGT", topic: "Geral", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw41/ntaw/~edisp/minfin5500121.pdf" },
  { year: 2026, no: "09-A", title: "Sentido e alcance do n.º 3 do artigo 41.º do OGE 2026", topic: "OGE", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw41/ndg2/~edisp/minfin5486547.pdf" },
  { year: 2026, no: "09-B", title: "Circular GACA / GJ / AGT", topic: "Geral", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw41/ntaw/~edisp/minfin5500122.pdf" },
  { year: 2026, no: "10", title: "Circular GACA / GAF / GJ / AGT", topic: "Administração", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw41/nju1/~edisp/minfin5655279.pdf" },
  { year: 2026, no: "11", title: "Circular GACA / DSA / DCRR / GJ / AGT", topic: "Aduaneiro", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw42/mze2/~edisp/minfin6316102.pdf" },
  { year: 2026, no: "12", title: "Imposto Predial aplicável a prédios rústicos destinados à exploração agrícola e pecuária", topic: "Imposto Predial", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw42/mze2/~edisp/minfin6316103.pdf" },
  { year: 2025, no: "01", title: "Medidas tributárias do OGE 2025", topic: "OGE", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw40/njmz/~edisp/minfin4633613.pdf" },
  { year: 2025, no: "02", title: "Guia do contribuinte sobre entrada e saída de produtos, mercadorias e bens", topic: "Aduaneiro", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw40/njmz/~edisp/minfin4633614.pdf" },
  { year: 2025, no: "03", title: "Aplicação da taxa do IVA na importação de equipamentos industriais", topic: "IVA", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw40/njmz/~edisp/minfin4633615.pdf" },
  { year: 2025, no: "04", title: "Procedimentos aplicáveis no sector mineiro", topic: "Minas", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw40/nza0/~edisp/minfin4704888.pdf" },
  { year: 2025, no: "05", title: "Circular GACA / DSAdu / AGT", topic: "Aduaneiro", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw40/nza0/~edisp/minfin4704889.pdf" },
  { year: 2025, no: "06", title: "Circular GACA / GJ / DSF / AGT", topic: "Fiscal", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw40/nza0/~edisp/minfin4704890.pdf" },
  { year: 2025, no: "07", title: "Regras de acesso de pessoas e equipamentos ao edifício sede da AGT", topic: "Administração", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw40/nza0/~edisp/minfin4704891.pdf" },
  { year: 2025, no: "08", title: "Procedimentos de desalfandegamento com diferimento de direitos aduaneiros", topic: "Aduaneiro", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw40/nza0/~edisp/minfin4704892.pdf" },
  { year: 2025, no: "09", title: "Circular GACA / DSF / GJ / AGT", topic: "Fiscal", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw40/nza0/~edisp/minfin4704893.pdf" },
  { year: 2025, no: "10", title: "Circular GACA / GJ / DSAdu / AGT", topic: "Aduaneiro", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw40/nza0/~edisp/minfin4704894.pdf" },
  { year: 2025, no: "11", title: "Procedimento provisório de tratamento de mercadorias por operadores de correio e carga expressa", topic: "Aduaneiro", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw40/nzuy/~edisp/minfin4752846.pdf" },
  { year: 2025, no: "12", title: "Circular GACA / GJ / DRH / GTI / AGT", topic: "Administração", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw40/nzuy/~edisp/minfin4752847.pdf" },
  { year: 2025, no: "13", title: "Circular GACA / GJ / DCRR / AGT", topic: "Fiscal", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw40/nzuy/~edisp/minfin4752848.pdf" },
  { year: 2025, no: "14", title: "Circular GACA / GJ / AGT", topic: "Geral", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw40/nzuy/~edisp/minfin4752849.pdf" },
  { year: 2025, no: "15", title: "Manual de procedimentos da operação", topic: "Procedimentos", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw40/odq4/~edisp/minfin4848776.pdf" },
  { year: 2025, no: "16", title: "Procedimentos para suspensão e cessação do NIF", topic: "NIF", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw40/odq4/~edisp/minfin4848777.pdf" },
  { year: 2025, no: "17-A", title: "Inspecção de mercadorias expedidas por operadores de correio e carga expressa", topic: "Aduaneiro", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw40/odg4/~edisp/minfin4888478.pdf" },
  { year: 2025, no: "17-B", title: "Inspecção de mercadorias — versão adicional publicada", topic: "Aduaneiro", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw40/odkz/~edisp/minfin4893139.pdf" },
  { year: 2025, no: "18-A", title: "Autorização do pagamento em prestações de dívidas tributárias", topic: "Cobrança", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw40/otuy/~edisp/minfin4952338.pdf" },
  { year: 2025, no: "19-A", title: "Prestação e restituição de caução", topic: "Garantias", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw40/otuy/~edisp/minfin4952339.pdf" },
  { year: 2025, no: "18-B", title: "Pagamento em prestações — versão adicional publicada", topic: "Cobrança", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw40/otkw/~edisp/minfin4990618.pdf" },
  { year: 2025, no: "19-B", title: "Prestação e restituição de caução — versão adicional publicada", topic: "Garantias", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw40/otkw/~edisp/minfin4990619.pdf" },
  { year: 2025, no: "20-A", title: "Procedimentos na mudança de software de facturação", topic: "Facturação", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw41/mdu1/~edisp/minfin5055531.pdf" },
  { year: 2025, no: "20-B", title: "Mudança de software de facturação — versão adicional publicada", topic: "Facturação", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw41/mtk2/~edisp/minfin5196918.pdf" },
  { year: 2025, no: "Anexo", title: "Cessação do NIF", topic: "NIF", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw41/mtk2/~edisp/minfin5196919.pdf", kind: "Anexo" },
  { year: 2025, no: "Anexo 1", title: "Anexo à circular de cessação do NIF", topic: "NIF", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw41/mtk2/~edisp/minfin5196944.pdf", kind: "Anexo" },
  { year: 2024, no: "08", title: "Manual de procedimentos relativos a operações informais", topic: "Procedimentos", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw40/mdkx/~edisp/minfin4091465.pdf" },
  { year: 2024, no: "10", title: "Realização da 39.ª edição da FILDA", topic: "Aduaneiro", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw40/mjaw/~edisp/minfin4200661.pdf" },
  { year: 2024, no: "11", title: "Realização da 13.ª edição da FIB", topic: "Aduaneiro", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw40/mjaw/~edisp/minfin4200663.pdf" },
  { year: 2024, no: "12", title: "Cobrança de encargos aduaneiros sobre mercadorias importadas por correio expresso", topic: "Aduaneiro", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw40/mjaw/~edisp/minfin4200662.pdf" },
  { year: 2024, no: "13", title: "Realização de feiras internacionais", topic: "Aduaneiro", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw40/mjaw/~edisp/minfin4200667.pdf" },
  { year: 2024, no: "14", title: "Circular DSAdu / DSIVA / GJ / AGT", topic: "IVA e Aduaneiro", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw40/mjaw/~edisp/minfin4200664.pdf" },
  { year: 2024, no: "15", title: "Isenção de IVA na transmissão e importação de livros", topic: "IVA", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw40/mjaw/~edisp/minfin4200665.pdf" },
  { year: 2024, no: "Anexo", title: "Manual de fiscalização de obras da AGT", topic: "Administração", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw40/mjaw/~edisp/minfin4200666.pdf", kind: "Anexo" },
  { year: 2024, no: "16", title: "Circular — ficheiro publicado pela AGT", topic: "Geral", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw40/mjk5/~edisp/minfin4299312.pdf" },
  { year: 2024, no: "17", title: "Entrada, trânsito e saída de féretros", topic: "Aduaneiro", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw40/nda2/~edisp/minfin4406235.pdf" },
  { year: 2024, no: "18", title: "Reembolso de direitos e demais imposições aduaneiras", topic: "Aduaneiro", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw40/nda2/~edisp/minfin4406256.pdf" },
  { year: 2024, no: "19", title: "Dedutibilidade de custos com infra-estruturas de apoio ao sector agrícola", topic: "Imposto Industrial", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw40/nda2/~edisp/minfin4406271.pdf" },
  { year: 2024, no: "20", title: "Circular GACA / DSAdu / AGT", topic: "Aduaneiro", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw40/nda2/~edisp/minfin4406275.pdf" },
  { year: 2024, no: "21", title: "Circular DSAdu / GJ / AGT", topic: "Aduaneiro", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw40/nda2/~edisp/minfin4406280.pdf" },
  { year: 2024, no: "Anexo", title: "Resenha legislativa — Agosto de 2024", topic: "Resenha", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw40/nda2/~edisp/minfin4406433.pdf", kind: "Anexo" },
  { year: 2024, no: "22", title: "Manual da política de mobilidade interna dos funcionários tributários", topic: "Administração", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw40/njiw/~edisp/minfin4620150.pdf" },
  { year: 2024, no: "23-A", title: "Circular GACA / GJ / DSF / DSAdu / AGT — PROSEFA", topic: "Fiscal e Aduaneiro", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw40/nja2/~edisp/minfin4606635.pdf" },
  { year: 2024, no: "23-B", title: "PROSEFA — versão adicional publicada", topic: "Fiscal e Aduaneiro", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw40/njiw/~edisp/minfin4620124.pdf" },
  { year: 2024, no: "24", title: "Manual de acolhimento e integração na AGT", topic: "Administração", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw40/njiw/~edisp/minfin4620123.pdf" },
  { year: 2024, no: "Anexo", title: "Manual de acolhimento da AGT", topic: "Administração", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw40/njiw/~edisp/minfin4620125.pdf", kind: "Anexo" },
  { year: 2024, no: "Anexo", title: "Estatuto Orgânico da AGT — versão 2025", topic: "Administração", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw40/nzuy/~edisp/minfin4752873.pdf", kind: "Anexo" },
];

const instructions: OfficialFile[] = [
  { year: 2026, no: "01", title: "Regras a observar na elaboração de normativos internos", topic: "Normativos", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw41/ndqz/~edisp/minfin5443746.pdf" },
  { year: 2025, no: "01", title: "Instrutivo GACA / GJ / AGT", topic: "Administração", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw40/otkw/~edisp/minfin4990635.pdf" },
  { year: 2025, no: "02", title: "Regras para a atribuição do subsídio de instalação", topic: "Administração", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw41/mtk2/~edisp/minfin5196920.pdf" },
  { year: 2024, no: "05", title: "Tributação dos valores apreendidos nas fronteiras", topic: "Aduaneiro", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw40/mzq3/~edisp/minfin4347795.pdf" },
  { year: 2024, no: "06", title: "Comunicação institucional da AGT", topic: "Comunicação", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw40/nda2/~edisp/minfin4406307.pdf" },
  { year: 2024, no: "07", title: "Exercício de funções e participação da AGT em organizações", topic: "Administração", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw40/nda2/~edisp/minfin4406303.pdf" },
  { year: 2024, no: "08", title: "Regras e directrizes para a contratação", topic: "Contratação", href: "https://www.ucm.minfin.gov.ao/cs/groups/public/documents/document/aw40/njiw/~edisp/minfin4620158.pdf" },
];

const normalise = (value: string) =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export default function Home() {
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("Todos");
  const [year, setYear] = useState("Todos");
  const [showAllCirculars, setShowAllCirculars] = useState(false);

  const q = normalise(query.trim());
  const areas = ["Todos", ...Array.from(new Set(codes.map((item) => item.area)))];

  const visibleCodes = useMemo(
    () => codes.filter((item) => {
      const haystack = normalise(`${item.abbr} ${item.title} ${item.diploma} ${item.area} ${item.summary} ${item.latest}`);
      return (!q || haystack.includes(q)) && (area === "Todos" || item.area === area);
    }),
    [q, area],
  );

  const filteredCirculars = useMemo(
    () => circulars.filter((item) => {
      const haystack = normalise(`${item.no} ${item.title} ${item.topic} ${item.year}`);
      return (!q || haystack.includes(q)) && (year === "Todos" || String(item.year) === year);
    }),
    [q, year],
  );

  const visibleCirculars = showAllCirculars || q || year !== "Todos" ? filteredCirculars : filteredCirculars.slice(0, 12);
  const sourceCount = circulars.length + instructions.length;

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="FiscalLex Angola — início">
          <span className="brand-mark">FL</span>
          <img className="header-flag" src="/angola-flag.png" alt="Bandeira de Angola" width="30" height="20" />
          <span>FISCALLEX <i>ANGOLA</i></span>
        </a>
        <nav aria-label="Navegação principal">
          <a href="#codigos">Códigos</a>
          <a href="#actualizacoes">Actualizações</a>
          <a href="#circulares">Circulares</a>
          <a href="#instrutivos">Instrutivos</a>
        </nav>
        <a className="source-link" href="https://agt.minfin.gov.ao/#!/legislacao/circulares" target="_blank" rel="noreferrer">Fonte AGT <span>↗</span></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-kicker"><span /> Biblioteca fiscal angolana</div>
        <div className="hero-grid">
          <div>
            <h1>Legislação fiscal.<br /><em>Rastreável.</em> Actualizada.</h1>
            <p className="hero-copy">Códigos, alterações legislativas, circulares e instrutivos da AGT — organizados por matéria, diploma e ano.</p>
          </div>
          <aside className="edition-card" aria-label="Edição da base">
            <span className="edition-label">Edição da base</span>
            <strong>03 AGO<br />2026</strong>
            <p>Verificação manual nas fontes indicadas.</p>
            <span className="edition-line" />
          </aside>
        </div>

        <div className="search-shell">
          <span className="search-icon" aria-hidden="true">⌕</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Pesquisar código, imposto, diploma ou tema…"
            aria-label="Pesquisar na biblioteca fiscal"
          />
          {query && <button onClick={() => setQuery("")} aria-label="Limpar pesquisa">Limpar</button>}
          <kbd>⌘ K</kbd>
        </div>

        <div className="stat-strip">
          <div><strong>{codes.length}</strong><span>Códigos e leis-base</span></div>
          <div><strong>{circulars.length}</strong><span>Circulares e anexos</span></div>
          <div><strong>{instructions.length}</strong><span>Instrutivos AGT</span></div>
          <div><strong>2026</strong><span>Medidas em destaque</span></div>
        </div>
      </section>

      <section className="notice">
        <span className="notice-badge">NOTA JURÍDICA</span>
        <p>Base de consulta <strong>não oficial</strong>. A redacção publicada no Diário da República prevalece. As fichas resumem alterações e ligam ao texto disponibilizado por Angolex e aos ficheiros da AGT.</p>
      </section>

      <section className="content-section" id="codigos">
        <div className="section-heading">
          <div>
            <span className="eyebrow">01 — Biblioteca principal</span>
            <h2>Códigos fiscais e tributários</h2>
          </div>
          <p>Base legislativa com histórico de alterações e medidas anuais que afectam a aplicação de cada diploma.</p>
        </div>

        <div className="filter-row" aria-label="Filtrar por matéria">
          {areas.map((item) => (
            <button key={item} className={area === item ? "active" : ""} onClick={() => setArea(item)}>{item}</button>
          ))}
        </div>

        {visibleCodes.length ? (
          <div className="code-grid">
            {visibleCodes.map((item) => (
              <article className="code-card" key={item.abbr}>
                <div className="card-topline">
                  <span className="code-abbr">{item.abbr}</span>
                  <span className="status"><i />{item.status}</span>
                </div>
                <h3>{item.title}</h3>
                <div className="diploma-row"><span>{item.diploma}</span><span>{item.date}</span><span>{item.area}</span></div>
                <p className="code-summary">{item.summary}</p>
                <div className="latest-change">
                  <span>ACTUALIZAÇÃO</span>
                  <strong>{item.latest}</strong>
                </div>
                {item.changes.length > 0 && (
                  <details>
                    <summary>Ver histórico <span>{item.changes.length}</span></summary>
                    <div className="history-list">
                      {item.changes.map((change) => (
                        <a href={change.href} target="_blank" rel="noreferrer" key={`${item.abbr}-${change.label}`}>
                          <time>{change.date}</time>
                          <div><strong>{change.label}</strong><p>{change.detail}</p></div>
                        </a>
                      ))}
                    </div>
                  </details>
                )}
                <a className="card-link" href={item.href} target="_blank" rel="noreferrer">Abrir texto indexado <span>↗</span></a>
              </article>
            ))}
          </div>
        ) : <div className="empty-state">Nenhum código corresponde à pesquisa.</div>}
      </section>

      <section className="updates-section" id="actualizacoes">
        <div className="section-heading light">
          <div>
            <span className="eyebrow">02 — O que mudou</span>
            <h2>Actualizações fiscais de 2026</h2>
          </div>
          <p>Leitura rápida das medidas tributárias da Lei n.º 14/25, que aprovou o OGE 2026.</p>
        </div>
        <div className="update-grid">
          {updateHighlights.map((item) => (
            <article key={`${item.code}-${item.title}`}>
              <div><span className="update-code">{item.code}</span><span>{item.article}</span></div>
              <h3>{item.title}</h3>
              <strong className="update-value">{item.value}</strong>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
        <a className="primary-link" href={oge2026} target="_blank" rel="noreferrer">Consultar Lei do OGE 2026 <span>↗</span></a>
      </section>

      <section className="content-section documents" id="circulares">
        <div className="section-heading">
          <div>
            <span className="eyebrow">03 — Administração Geral Tributária</span>
            <h2>Circulares e ficheiros associados</h2>
          </div>
          <p>{circulars.length} ficheiros encontrados no arquivo público actual da AGT, preservando versões adicionais e anexos quando o portal os apresenta.</p>
        </div>

        <div className="document-toolbar">
          <div className="year-tabs" aria-label="Filtrar circulares por ano">
            {["Todos", "2026", "2025", "2024"].map((item) => (
              <button key={item} className={year === item ? "active" : ""} onClick={() => setYear(item)}>{item}</button>
            ))}
          </div>
          <span>{filteredCirculars.length} resultados</span>
        </div>

        <div className="document-list">
          {visibleCirculars.map((item, index) => (
            <a className="document-row" href={item.href} target="_blank" rel="noreferrer" key={`${item.year}-${item.no}-${index}`}>
              <span className="doc-number">{item.kind === "Anexo" ? "A" : item.no.padStart(2, "0")}</span>
              <div className="doc-main">
                <div><span>{item.kind ?? "Circular"}</span><span>{item.year}</span><span>{item.topic}</span></div>
                <h3>{item.title}</h3>
              </div>
              <span className="pdf-label">PDF OFICIAL</span>
              <span className="row-arrow">↗</span>
            </a>
          ))}
        </div>

        {!q && year === "Todos" && filteredCirculars.length > 12 && (
          <button className="show-more" onClick={() => setShowAllCirculars((value) => !value)}>
            {showAllCirculars ? "Mostrar selecção inicial" : `Ver todos os ${filteredCirculars.length} ficheiros`}
            <span>{showAllCirculars ? "↑" : "↓"}</span>
          </button>
        )}
      </section>

      <section className="instruction-section" id="instrutivos">
        <div className="section-heading">
          <div>
            <span className="eyebrow">04 — Orientações internas publicadas</span>
            <h2>Instrutivos AGT</h2>
          </div>
          <p>Compilação do separador “Instrutivos” e do bloco de 2026 publicado pela AGT na área de circulares.</p>
        </div>
        <div className="instruction-grid">
          {instructions.map((item) => (
            <a href={item.href} target="_blank" rel="noreferrer" key={`${item.year}-${item.no}`}>
              <div className="instruction-meta"><span>{item.year}</span><span>INSTRUTIVO N.º {item.no}</span></div>
              <h3>{item.title}</h3>
              <div><span>{item.topic}</span><strong>Abrir PDF ↗</strong></div>
            </a>
          ))}
        </div>
      </section>

      <section className="sources-section">
        <span className="eyebrow">Metodologia e fontes</span>
        <div>
          <h2>Uma base verificável,<br />não uma consolidação oficial.</h2>
          <div className="source-copy">
            <p>Os códigos e diplomas foram indexados a partir do ramo de Direito Tributário do Angolex. As circulares e os instrutivos ligam directamente aos ficheiros publicados pela AGT/UCM do Ministério das Finanças.</p>
            <p>“Vigente” indica que não foi identificada revogação expressa nas fontes consultadas. Medidas do OGE podem ter duração anual e devem ser lidas com o diploma-base.</p>
          </div>
        </div>
        <div className="source-actions">
          <a href="https://angolex.com/paginas/ramos-direito/direito-tributario.html" target="_blank" rel="noreferrer">Angolex — Direito Tributário ↗</a>
          <a href="https://agt.minfin.gov.ao/#!/legislacao/circulares" target="_blank" rel="noreferrer">AGT — Circulares ↗</a>
          <a href="https://agt.minfin.gov.ao/#!/legislacao/instrutivos" target="_blank" rel="noreferrer">AGT — Instrutivos ↗</a>
        </div>
      </section>

      <section className="credits-strip" aria-label="Créditos">
        <img className="angola-flag" src="/angola-flag.png" alt="Bandeira de Angola" width="150" height="100" />
        <div className="credits-copy">
          <span className="credits-kicker">Feito em Angola</span>
          <strong>Concebido e desenvolvido por Márcio Charata</strong>
          <span>Pesquisa, estrutura editorial e desenvolvimento da plataforma FiscalLex Angola.</span>
        </div>
        <a className="linkedin-link" href="https://www.linkedin.com/in/mjcharata/" target="_blank" rel="noreferrer">
          Ver perfil no LinkedIn <span aria-hidden="true">↗</span>
        </a>
      </section>

      <footer>
        <div className="brand footer-brand"><span className="brand-mark">FL</span><span>FISCALLEX <i>ANGOLA</i></span></div>
        <p>Biblioteca independente de consulta fiscal angolana.<br />© 2026 Márcio Charata.</p>
        <div><span>{sourceCount} ficheiros oficiais indexados</span><span>Actualizado em 03.08.2026</span></div>
      </footer>
    </main>
  );
}
