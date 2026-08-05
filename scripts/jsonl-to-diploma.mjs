#!/usr/bin/env node
// Converte e valida um ficheiro de extracção JSONL num diploma JSON final.
//
// Formato de entrada (data/extract/<slug>.jsonl):
//   linha 1  → cabeçalho: {"slug","abbr","title","diploma","consolidation","sourceName","sourceUrl","extractedAt"}
//   linhas seguintes → um artigo por linha: {"id","label","epigraph","path":[],"blocks":[...]}
//
// Validações: JSON bem formado, campos obrigatórios, blocos não vazios,
// continuidade da numeração dos artigos (admitindo sufixos -A/-B e anexos no fim),
// identificadores únicos.
//
// Uso: node scripts/jsonl-to-diploma.mjs data/extract/cgt.jsonl [--write]

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const inputPath = process.argv[2];
const write = process.argv.includes("--write");

if (!inputPath) {
  console.error("Uso: node scripts/jsonl-to-diploma.mjs data/extract/<slug>.jsonl [--write]");
  process.exit(1);
}

const raw = readFileSync(join(root, inputPath), "utf8");
const lines = raw.split("\n").map((line) => line.trim()).filter(Boolean);

const problems = [];
const warnings = [];

let header;
const articles = [];

lines.forEach((line, index) => {
  let parsed;
  try {
    parsed = JSON.parse(line);
  } catch (error) {
    problems.push(`Linha ${index + 1}: JSON inválido (${error.message})`);
    return;
  }
  if (index === 0) header = parsed;
  else articles.push({ line: index + 1, article: parsed });
});

if (!header) {
  problems.push("Cabeçalho em falta na primeira linha.");
} else {
  for (const field of ["slug", "abbr", "title", "diploma", "consolidation", "sourceName", "sourceUrl", "extractedAt"]) {
    if (!header[field] || typeof header[field] !== "string") problems.push(`Cabeçalho sem campo obrigatório: ${field}`);
  }
}

const seenIds = new Set();
const numberSequence = [];

for (const { line, article } of articles) {
  const where = `Linha ${line} (${article?.label ?? "?"})`;
  if (!article.id || typeof article.id !== "string") problems.push(`${where}: falta "id".`);
  else if (seenIds.has(article.id)) problems.push(`${where}: id duplicado "${article.id}".`);
  else seenIds.add(article.id);

  if (!article.label || typeof article.label !== "string") problems.push(`${where}: falta "label".`);
  if (typeof article.epigraph !== "string") problems.push(`${where}: "epigraph" deve ser string (pode ser vazia).`);
  if (article.path && !Array.isArray(article.path)) problems.push(`${where}: "path" deve ser lista.`);

  if (!Array.isArray(article.blocks) || article.blocks.length === 0) {
    problems.push(`${where}: sem blocos de texto.`);
  } else {
    article.blocks.forEach((block, blockIndex) => {
      const blockWhere = `${where}, bloco ${blockIndex + 1}`;
      if (block.t === "p" || block.t === "note") {
        if (!block.x || !block.x.trim()) problems.push(`${blockWhere}: texto vazio.`);
      } else if (block.t === "list") {
        if (!Array.isArray(block.items) || block.items.length === 0) problems.push(`${blockWhere}: lista vazia.`);
        else if (block.items.some((item) => typeof item !== "string" || !item.trim())) problems.push(`${blockWhere}: item de lista vazio.`);
      } else if (block.t === "table") {
        if (!Array.isArray(block.rows) || block.rows.length === 0) problems.push(`${blockWhere}: tabela sem linhas.`);
      } else {
        problems.push(`${blockWhere}: tipo desconhecido "${block.t}".`);
      }
    });
  }

  const numberMatch = /^Artigo\s+(\d+)\.º(?:-([A-Z]))?$/u.exec(article.label ?? "");
  if (numberMatch) numberSequence.push({ line, base: Number(numberMatch[1]), suffix: numberMatch[2] ?? "" });
  else if (/^Artigo/u.test(article.label ?? "")) warnings.push(`${where}: rótulo de artigo fora do padrão.`);
}

// Continuidade da numeração: cada artigo deve ser igual, +1, ou sufixo seguinte.
for (let index = 1; index < numberSequence.length; index += 1) {
  const previous = numberSequence[index - 1];
  const current = numberSequence[index];
  const okForward = current.base === previous.base + 1 && current.suffix === "";
  const okSuffix = current.base === previous.base && current.suffix > previous.suffix;
  if (!okForward && !okSuffix) {
    problems.push(`Sequência quebrada na linha ${current.line}: Artigo ${previous.base}.º${previous.suffix ? `-${previous.suffix}` : ""} → Artigo ${current.base}.º${current.suffix ? `-${current.suffix}` : ""}`);
  }
}
if (numberSequence.length > 0 && numberSequence[0].base !== 1) {
  warnings.push(`Primeiro artigo numerado é o ${numberSequence[0].base}.º (esperava 1.º).`);
}

const articleCount = articles.length;
const firstLabel = articles[0]?.article?.label ?? "—";
const lastLabel = articles[articleCount - 1]?.article?.label ?? "—";

console.log(`Ficheiro: ${inputPath}`);
console.log(`Artigos/entradas: ${articleCount} (${firstLabel} → ${lastLabel})`);
console.log(`Problemas: ${problems.length} | Avisos: ${warnings.length}`);
for (const problem of problems) console.log(`  ✗ ${problem}`);
for (const warning of warnings) console.log(`  ⚠ ${warning}`);

if (problems.length > 0) process.exit(2);

if (write && header) {
  const output = { ...header, articles: articles.map((entry) => entry.article) };
  const outputPath = join(root, "data", "diplomas", `${header.slug}.json`);
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, JSON.stringify(output, null, 1), "utf8");
  console.log(`✓ Escrito: data/diplomas/${header.slug}.json`);
}
