"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { codes, oge2026 } from "@/data/codigos-meta";
import cobertura from "@/data/cobertura.json";

type OfficialFile = {
  year: number;
  no: string;
  title: string;
  topic: string;
  href: string;
  kind?: "Circular" | "Anexo";
};

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

// Cobertura do texto integral por diploma, gerada por scripts/audit-diplomas.mjs.
const coverageBySlug = new Map(cobertura.diplomas.map((item) => [item.slug, item]));

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
            <h1>Legislação fiscal.<br /><em>Texto integral.</em> Pesquisável.</h1>
            <p className="hero-copy">Os {codes.length} códigos fiscais angolanos com o articulado completo dentro do portal — artigo a artigo, sem descarregar PDF. Com as circulares e instrutivos da AGT ligados às fontes oficiais.</p>
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
          <div><strong>{codes.length}</strong><span>Códigos em texto integral</span></div>
          <div><strong>{cobertura.totals.articles.toLocaleString("pt-PT")}</strong><span>Artigos consultáveis</span></div>
          <div><strong>{circulars.length}</strong><span>Circulares e anexos</span></div>
          <div><strong>{instructions.length}</strong><span>Instrutivos AGT</span></div>
        </div>
      </section>

      <section className="notice">
        <span className="notice-badge">NOTA JURÍDICA</span>
        <p>Base de consulta <strong>não oficial</strong>. A redacção publicada no Diário da República prevalece. O articulado é transcrito das fontes indicadas em cada diploma; as lacunas de transcrição, quando existem, estão assinaladas no próprio texto.</p>
      </section>

      <section className="content-section" id="codigos">
        <div className="section-heading">
          <div>
            <span className="eyebrow">01 — Biblioteca principal</span>
            <h2>Códigos fiscais e tributários</h2>
          </div>
          <p>Cada ficha abre o texto integral do diploma dentro do portal, com índice, pesquisa por artigo e histórico de alterações.</p>
        </div>

        <div className="filter-row" aria-label="Filtrar por matéria">
          {areas.map((item) => (
            <button key={item} className={area === item ? "active" : ""} onClick={() => setArea(item)}>{item}</button>
          ))}
        </div>

        {visibleCodes.length ? (
          <div className="code-grid">
            {visibleCodes.map((item) => (
              <article className="code-card readable" key={item.abbr}>
                <div className="card-topline">
                  <span className="code-abbr">{item.abbr}</span>
                  <span className="status"><i />{item.status}</span>
                </div>
                {coverageBySlug.get(item.slug) && (
                  <span className={`coverage-tag ${coverageBySlug.get(item.slug)!.status === "completo" ? "full" : "partial"}`}>
                    {coverageBySlug.get(item.slug)!.articles} artigos
                    {coverageBySlug.get(item.slug)!.status === "completo" ? " · texto integral" : " · com lacunas assinaladas"}
                  </span>
                )}
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
                <Link className="card-link primary" href={`/codigos/${item.slug}`}>Ler texto integral <span>→</span></Link>
                <a className="card-source" href={item.href} target="_blank" rel="noreferrer">Fonte original <span>↗</span></a>
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
            <p>O articulado dos {codes.length} códigos foi transcrito do ramo de Direito Tributário do Angolex e é apresentado aqui em texto corrido, preservando a redacção e a ortografia originais — incluindo as gralhas da fonte, que não são corrigidas. Cada diploma indica a consolidação que representa e as alterações nela incorporadas.</p>
            <p>As circulares e os instrutivos ligam directamente aos ficheiros publicados pela AGT/UCM do Ministério das Finanças, por serem documentos digitalizados sem camada de texto.</p>
            <p>“Vigente” indica que não foi identificada revogação expressa nas fontes consultadas. Medidas do OGE podem ter duração anual e devem ser lidas com o diploma-base.</p>
          </div>
        </div>
        <div className="coverage-panel">
          <div className="coverage-head">
            <strong>Cobertura da transcrição</strong>
            <span>{cobertura.totals.articles.toLocaleString("pt-PT")} artigos · {Math.round(cobertura.totals.chars / 1000).toLocaleString("pt-PT")} mil caracteres de texto legal</span>
          </div>
          <ul className="coverage-list">
            {cobertura.diplomas.map((item) => (
              <li key={item.slug} className={item.status === "completo" ? "full" : "partial"}>
                <Link href={`/codigos/${item.slug}`}>
                  <span className="cov-abbr">{item.abbr}</span>
                  <span className="cov-count">{item.articles} art.</span>
                  <span className="cov-status">
                    {item.status === "completo" ? "íntegra" : `${item.gaps.length} lacuna${item.gaps.length === 1 ? "" : "s"}`}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          {cobertura.totals.gaps > 0 && (
            <p className="coverage-note">
              As lacunas resultam de limites de leitura das páginas de origem e estão assinaladas artigo a artigo no próprio texto, com indicação do que falta. Nenhum texto foi inventado para as preencher.
            </p>
          )}
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
        <div><span>{cobertura.totals.articles.toLocaleString("pt-PT")} artigos em texto integral · {sourceCount} ficheiros AGT indexados</span><span>Actualizado em 04.08.2026</span></div>
      </footer>
    </main>
  );
}
