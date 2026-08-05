// Componente de leitura de um diploma fiscal.
// Server component: todo o texto legislativo é renderizado como HTML no servidor,
// ficando presente no próprio documento (pesquisável, indexável e imprimível).

import type { Metadata } from "next";
import Link from "next/link";
import type { Article, Block, Diploma } from "@/data/diplomas/types";
import { codeBySlug, codes } from "@/data/codigos-meta";
import { ReaderTools } from "./reader-tools";

// Metadados da página de leitura (título e descrição por diploma).
export function diplomaMetadata(slug: string): Metadata {
  const meta = codeBySlug(slug);
  if (!meta) return { title: "FiscalLex Angola" };
  return {
    title: `${meta.title} — texto integral | FiscalLex Angola`,
    description: `${meta.diploma}. ${meta.summary} Texto integral consolidado, artigo a artigo.`,
  };
}

// Alguns diplomas — o Código Aduaneiro em particular — têm um terceiro nível de
// subdivisão (i., ii., iii. ...) que a fonte marca com quebras de linha dentro do
// próprio item. Sem tratamento, o HTML colapsa essas quebras e as subdivisões
// surgem numa única linha corrida. Esta função separa o texto de abertura das
// subdivisões, para que possam ser renderizadas como lista encadeada.
const SUBALINEA = /^\s*[ivx]+\s*[.)]\s+/i;

function separarSubalineas(texto: string): { abertura: string; subalineas: string[] } {
  if (!texto.includes("\n")) return { abertura: texto, subalineas: [] };
  const linhas = texto.split("\n");
  const [abertura, ...resto] = linhas;
  if (resto.length > 0 && resto.every((linha) => SUBALINEA.test(linha))) {
    return { abertura, subalineas: resto.map((linha) => linha.replace(SUBALINEA, "").trim()) };
  }
  // Quebra sem subdivisões reconhecíveis: junta as linhas para não perder texto.
  return { abertura: linhas.join(" "), subalineas: [] };
}

// Item de lista, com o nível de subdivisão encadeado quando existe.
function ItemLista({ texto }: { texto: string }) {
  const { abertura, subalineas } = separarSubalineas(texto);
  if (subalineas.length === 0) return <li>{abertura}</li>;
  return (
    <li>
      {abertura}
      <ol className="art-sublist" type="i">
        {subalineas.map((subalinea, index) => <li key={index}>{subalinea}</li>)}
      </ol>
    </li>
  );
}

// Renderização de um bloco de texto do artigo.
function BlockView({ block }: { block: Block }) {
  if (block.t === "p") {
    const { abertura, subalineas } = separarSubalineas(block.x);
    if (subalineas.length === 0) return <p>{abertura}</p>;
    return (
      <>
        <p>{abertura}</p>
        <ol className="art-sublist" type="i">
          {subalineas.map((subalinea, index) => <li key={index}>{subalinea}</li>)}
        </ol>
      </>
    );
  }
  if (block.t === "note") return <p className="art-note">{block.x}</p>;
  if (block.t === "list") {
    const style = block.style ?? "alpha";
    if (style === "dash") {
      return (
        <ul className="art-list dash">
          {block.items.map((item, index) => <ItemLista key={index} texto={item} />)}
        </ul>
      );
    }
    const type = style === "num" ? "1" : style === "roman" ? "i" : "a";
    return (
      <ol className="art-list" type={type}>
        {block.items.map((item, index) => <ItemLista key={index} texto={item} />)}
      </ol>
    );
  }
  if (block.t === "table") {
    return (
      <div className="art-table-wrap">
        <table className="art-table">
          {block.headers && block.headers.length > 0 && (
            <thead>
              <tr>{block.headers.map((header, index) => <th key={index}>{header}</th>)}</tr>
            </thead>
          )}
          <tbody>
            {block.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return null;
}

// Compara a hierarquia (TÍTULO/CAPÍTULO/SECÇÃO) entre artigos consecutivos e
// devolve os níveis novos, para inserir os cabeçalhos de divisão no fluxo do texto.
function newPathLevels(previous: Article | undefined, current: Article): { level: number; label: string }[] {
  const currentPath = current.path ?? [];
  const previousPath = previous?.path ?? [];
  const levels: { level: number; label: string }[] = [];
  for (let index = 0; index < currentPath.length; index += 1) {
    if (previousPath[index] !== currentPath[index]) {
      for (let rest = index; rest < currentPath.length; rest += 1) {
        levels.push({ level: rest, label: currentPath[rest] });
      }
      break;
    }
  }
  return levels;
}

// Agrupa os artigos pelo primeiro nível da hierarquia, para o índice lateral.
function tocGroups(articles: Article[]) {
  const groups: { label: string | null; items: Article[] }[] = [];
  for (const article of articles) {
    const label = article.path?.[0] ?? null;
    const lastGroup = groups[groups.length - 1];
    if (lastGroup && lastGroup.label === label) lastGroup.items.push(article);
    else groups.push({ label, items: [article] });
  }
  return groups;
}

export function DiplomaReader({ data }: { data: Diploma }) {
  const meta = codeBySlug(data.slug);
  const groups = tocGroups(data.articles);
  const currentIndex = codes.findIndex((item) => item.slug === data.slug);
  const previousCode = currentIndex > 0 ? codes[currentIndex - 1] : null;
  const nextCode = currentIndex >= 0 && currentIndex < codes.length - 1 ? codes[currentIndex + 1] : null;

  return (
    <main className="reader-page">
      <header className="topbar">
        <Link className="brand" href="/" aria-label="FiscalLex Angola — início">
          <span className="brand-mark">FL</span>
          <img className="header-flag" src="/angola-flag.png" alt="Bandeira de Angola" width="30" height="20" />
          <span>FISCALLEX <i>ANGOLA</i></span>
        </Link>
        <nav aria-label="Navegação principal">
          <Link href="/#codigos">Códigos</Link>
          <Link href="/#actualizacoes">Actualizações</Link>
          <Link href="/#circulares">Circulares</Link>
          <Link href="/#instrutivos">Instrutivos</Link>
        </nav>
        <a className="source-link" href={data.sourceUrl} target="_blank" rel="noreferrer">Fonte <span>↗</span></a>
      </header>

      <section className="reader-hero">
        <nav className="crumbs" aria-label="Localização">
          <Link href="/">Início</Link><span>/</span><Link href="/#codigos">Códigos</Link><span>/</span><strong>{data.abbr}</strong>
        </nav>
        <div className="reader-head">
          <div>
            <span className="code-abbr">{data.abbr}</span>
            <h1>{data.title}</h1>
            <p className="reader-diploma">{data.diploma}{meta ? ` · ${meta.area}` : ""}</p>
            <p className="reader-consolidation">{data.consolidation}</p>
          </div>
          <aside className="reader-meta-card">
            {meta && <span className="status"><i />{meta.status}</span>}
            <dl>
              <div><dt>Artigos</dt><dd>{data.articles.length}</dd></div>
              <div><dt>Fonte do texto</dt><dd><a href={data.sourceUrl} target="_blank" rel="noreferrer">{data.sourceName} ↗</a></dd></div>
              <div><dt>Verificado em</dt><dd>{data.extractedAt}</dd></div>
            </dl>
          </aside>
        </div>

        {meta && meta.changes.length > 0 && (
          <details className="reader-history">
            <summary>Histórico de alterações <span>{meta.changes.length}</span></summary>
            <div className="history-list">
              {meta.changes.map((change) => (
                <a href={change.href} target="_blank" rel="noreferrer" key={`${data.slug}-${change.label}`}>
                  <time>{change.date}</time>
                  <div><strong>{change.label}</strong><p>{change.detail}</p></div>
                </a>
              ))}
            </div>
          </details>
        )}

        <div className="notice reader-notice">
          <span className="notice-badge">NOTA JURÍDICA</span>
          <p>Transcrição de consulta, <strong>não oficial</strong>, obtida da fonte indicada. A redacção publicada no Diário da República prevalece para efeitos jurídicos.</p>
        </div>
      </section>

      <ReaderTools total={data.articles.length} />

      <div className="reader-layout">
        <aside className="reader-toc" aria-label="Índice do diploma">
          <details className="toc-shell" open>
            <summary>Índice</summary>
            <div className="toc-scroll">
              {groups.map((group, groupIndex) => (
                <div className="toc-group" key={groupIndex}>
                  {group.label && <span className="toc-group-label">{group.label}</span>}
                  <ul>
                    {group.items.map((article) => (
                      <li key={article.id}>
                        <a href={`#${article.id}`}>
                          <span>{article.label}</span>
                          {article.epigraph && <em>{article.epigraph}</em>}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </details>
        </aside>

        <div className="reader-body" id="texto-integral">
          {data.articles.map((article, index) => {
            const headings = newPathLevels(data.articles[index - 1], article);
            return (
              <div key={article.id}>
                {headings.map((heading) => (
                  <h2 className={`division level-${Math.min(heading.level, 2)}`} key={`${article.id}-${heading.label}`}>
                    {heading.label}
                  </h2>
                ))}
                <article className="law-article" id={article.id} data-article data-label={article.label}>
                  <h3>
                    <a className="art-anchor" href={`#${article.id}`} aria-label={`Ligação para ${article.label}`}>§</a>
                    <span className="art-num">{article.label}</span>
                    {article.epigraph && <span className="art-epigraph">{article.epigraph}</span>}
                  </h3>
                  <div className="art-body">
                    {article.blocks.map((block, blockIndex) => <BlockView block={block} key={blockIndex} />)}
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>

      <nav className="reader-pager" aria-label="Navegar entre diplomas">
        {previousCode ? (
          <Link href={`/codigos/${previousCode.slug}`}><span>← Anterior</span><strong>{previousCode.abbr} — {previousCode.title}</strong></Link>
        ) : <span />}
        {nextCode ? (
          <Link className="pager-next" href={`/codigos/${nextCode.slug}`}><span>Seguinte →</span><strong>{nextCode.abbr} — {nextCode.title}</strong></Link>
        ) : <span />}
      </nav>

      <footer>
        <div className="brand footer-brand"><span className="brand-mark">FL</span><span>FISCALLEX <i>ANGOLA</i></span></div>
        <p>Biblioteca independente de consulta fiscal angolana.<br />© 2026 Márcio Charata.</p>
        <div><span>{data.title}</span><span>Verificado em {data.extractedAt}</span></div>
      </footer>
    </main>
  );
}
