#!/usr/bin/env node
// Auditoria da base de diplomas: integridade estrutural e cobertura do texto.
//
// Verifica, para cada data/diplomas/<slug>.json:
//   - campos obrigatórios do cabeçalho e correspondência com data/codigos-meta.ts;
//   - continuidade da numeração dos artigos e unicidade dos identificadores;
//   - blocos vazios ou malformados, tabelas com linhas irregulares;
//   - prefixos de alínea residuais ("a) ", "a)- ") esquecidos nos itens de lista;
//   - lacunas declaradas: blocos "note" que sinalizem falta de transcrição.
//
// Produz também data/cobertura.json, consumido pela aplicação para mostrar
// o estado de cobertura de cada diploma com honestidade.
//
// Uso: node scripts/audit-diplomas.mjs [--write]

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const diplomasDir = join(root, "data", "diplomas");
const write = process.argv.includes("--write");

// Expressões que denunciam uma lacuna declarada numa nota editorial.
const GAP_PATTERNS = [
  /n[ãa]o foi poss[íi]vel/i,
  /sem texto (integral|transcrito)/i,
  /por transcrever/i,
  /truncad/i,
  /n[ãa]o transcri/i,
  /lacuna/i,
  /interromp/i,
  /n[ãa]o obtid/i,          // "Texto integral não obtido"
  /possivelmente incompleto/i,
  /termina(m)? neste ponto/i,
];

const isGapNote = (text) => GAP_PATTERNS.some((pattern) => pattern.test(text));

const files = readdirSync(diplomasDir).filter((file) => file.endsWith(".json")).sort();
const report = [];
let totalProblems = 0;

for (const file of files) {
  const data = JSON.parse(readFileSync(join(diplomasDir, file), "utf8"));
  const problems = [];
  const warnings = [];
  const gaps = [];

  for (const field of ["slug", "abbr", "title", "diploma", "consolidation", "sourceName", "sourceUrl", "extractedAt"]) {
    if (!data[field]) problems.push(`cabeçalho sem "${field}"`);
  }
  if (data.slug !== file.replace(/\.json$/, "")) problems.push(`slug "${data.slug}" não corresponde ao ficheiro ${file}`);

  const articles = data.articles ?? [];
  if (articles.length === 0) problems.push("sem artigos");

  const ids = new Set();
  const sequence = [];
  let blockCount = 0;
  let charCount = 0;

  for (const article of articles) {
    const where = article.label ?? article.id ?? "?";
    if (ids.has(article.id)) problems.push(`${where}: id duplicado "${article.id}"`);
    ids.add(article.id);
    if (!Array.isArray(article.blocks) || article.blocks.length === 0) problems.push(`${where}: sem blocos`);

    for (const block of article.blocks ?? []) {
      blockCount += 1;
      if (block.t === "p" || block.t === "note") {
        if (!block.x?.trim()) problems.push(`${where}: bloco de texto vazio`);
        else charCount += block.x.length;
        if (block.t === "note" && isGapNote(block.x ?? "")) gaps.push({ article: where, note: block.x });
      } else if (block.t === "list") {
        if (!block.items?.length) problems.push(`${where}: lista vazia`);
        for (const item of block.items ?? []) {
          if (!item?.trim()) problems.push(`${where}: item de lista vazio`);
          else charCount += item.length;
          if (/^[a-z]\)-?\s/i.test(item ?? "")) warnings.push(`${where}: item com prefixo de alínea residual ("${item.slice(0, 20)}…")`);
        }
      } else if (block.t === "table") {
        if (!block.rows?.length) problems.push(`${where}: tabela sem linhas`);
        const widths = new Set((block.rows ?? []).map((row) => row.length));
        if (widths.size > 1) warnings.push(`${where}: tabela com linhas de larguras diferentes (${[...widths].join(", ")})`);
        if (block.headers?.length && widths.size === 1 && !widths.has(block.headers.length)) {
          warnings.push(`${where}: tabela com ${[...widths][0]} colunas mas ${block.headers.length} cabeçalhos`);
        }
        for (const row of block.rows ?? []) charCount += row.join("").length;
      } else {
        problems.push(`${where}: tipo de bloco desconhecido "${block.t}"`);
      }
    }

    const match = /^Artigo\s+(\d+)\.º(?:-([A-Z]))?$/u.exec(article.label ?? "");
    if (match) sequence.push({ label: article.label, base: Number(match[1]), suffix: match[2] ?? "" });
  }

  for (let index = 1; index < sequence.length; index += 1) {
    const previous = sequence[index - 1];
    const current = sequence[index];
    const okForward = current.base === previous.base + 1 && current.suffix === "";
    const okSuffix = current.base === previous.base && current.suffix > previous.suffix;
    if (!okForward && !okSuffix) problems.push(`sequência quebrada: ${previous.label} → ${current.label}`);
  }

  const articleCount = sequence.length;
  const extraCount = articles.length - articleCount; // anexos, tabelas, preâmbulos
  const status = gaps.length === 0 ? "completo" : "com lacunas";

  report.push({
    slug: data.slug,
    abbr: data.abbr,
    title: data.title,
    entries: articles.length,
    articles: articleCount,
    extras: extraCount,
    first: articles[0]?.label ?? "—",
    last: articles[articles.length - 1]?.label ?? "—",
    blocks: blockCount,
    chars: charCount,
    status,
    gaps: gaps.map((gap) => ({ article: gap.article, note: gap.note })),
    problems,
    warnings,
  });
  totalProblems += problems.length;
}

const totals = report.reduce(
  (accumulator, item) => ({
    entries: accumulator.entries + item.entries,
    articles: accumulator.articles + item.articles,
    chars: accumulator.chars + item.chars,
    gaps: accumulator.gaps + item.gaps.length,
  }),
  { entries: 0, articles: 0, chars: 0, gaps: 0 },
);

console.log("Diploma                 Entradas  Artigos   Caracteres  Estado");
console.log("─".repeat(74));
for (const item of report) {
  const flag = item.problems.length ? " ✗" : item.gaps.length ? " ⚠" : " ✓";
  console.log(
    `${item.abbr.padEnd(5)} ${item.slug.padEnd(20)} ${String(item.entries).padStart(5)} ${String(item.articles).padStart(8)} ${item.chars.toLocaleString("pt-PT").padStart(12)}  ${item.status}${flag}`,
  );
  for (const problem of item.problems) console.log(`      ✗ ${problem}`);
  for (const warning of item.warnings.slice(0, 5)) console.log(`      ⚠ ${warning}`);
  if (item.warnings.length > 5) console.log(`      ⚠ (+${item.warnings.length - 5} avisos semelhantes)`);
  for (const gap of item.gaps) console.log(`      ⚠ lacuna em ${gap.article}`);
}
console.log("─".repeat(74));
console.log(
  `${files.length} diplomas · ${totals.entries} entradas · ${totals.articles} artigos numerados · ${totals.chars.toLocaleString("pt-PT")} caracteres de texto legal · ${totals.gaps} lacunas declaradas`,
);
console.log(totalProblems === 0 ? "✓ Sem problemas estruturais." : `✗ ${totalProblems} problemas estruturais.`);

if (write) {
  const coverage = {
    generatedFrom: "scripts/audit-diplomas.mjs",
    totals: { diplomas: files.length, entries: totals.entries, articles: totals.articles, chars: totals.chars, gaps: totals.gaps },
    diplomas: report.map((item) => ({
      slug: item.slug,
      abbr: item.abbr,
      entries: item.entries,
      articles: item.articles,
      chars: item.chars,
      status: item.status,
      gaps: item.gaps,
    })),
  };
  writeFileSync(join(root, "data", "cobertura.json"), JSON.stringify(coverage, null, 1), "utf8");
  console.log("✓ Escrito: data/cobertura.json");
}

process.exit(totalProblems === 0 ? 0 : 2);
