// Testes da base de diplomas e das páginas de leitura.
// Garante que o texto integral é servido no HTML pelo servidor (sem depender
// de JavaScript no cliente) e que a base não regride em cobertura.

import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import test from "node:test";

const diplomasDir = new URL("../data/diplomas/", import.meta.url);
const slugs = readdirSync(diplomasDir)
  .filter((file) => file.endsWith(".json"))
  .map((file) => file.replace(/\.json$/, ""));

const readDiploma = (slug) =>
  JSON.parse(readFileSync(new URL(`${slug}.json`, diplomasDir), "utf8"));

async function render(path) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("a biblioteca cobre os 13 códigos fiscais", () => {
  assert.equal(slugs.length, 13, `esperava 13 diplomas, encontrei ${slugs.length}`);
});

test("cada diploma tem cabeçalho completo e artigos com texto", () => {
  for (const slug of slugs) {
    const data = readDiploma(slug);
    for (const field of ["slug", "abbr", "title", "diploma", "consolidation", "sourceName", "sourceUrl", "extractedAt"]) {
      assert.ok(data[field], `${slug}: falta "${field}" no cabeçalho`);
    }
    assert.equal(data.slug, slug);
    assert.ok(data.articles.length > 0, `${slug}: sem artigos`);

    const ids = new Set();
    for (const article of data.articles) {
      assert.ok(article.id, `${slug}: artigo sem id`);
      assert.ok(!ids.has(article.id), `${slug}: id duplicado "${article.id}"`);
      ids.add(article.id);
      assert.ok(article.label, `${slug}/${article.id}: sem rótulo`);
      assert.ok(Array.isArray(article.blocks) && article.blocks.length > 0, `${slug}/${article.label}: sem blocos`);
    }
  }
});

test("a numeração dos artigos é contínua em cada diploma", () => {
  for (const slug of slugs) {
    const sequence = readDiploma(slug)
      .articles.map((article) => /^Artigo\s+(\d+)\.º(?:-([A-Z]))?$/u.exec(article.label))
      .filter(Boolean)
      .map((match) => ({ base: Number(match[1]), suffix: match[2] ?? "", label: match[0] }));

    for (let index = 1; index < sequence.length; index += 1) {
      const previous = sequence[index - 1];
      const current = sequence[index];
      const okForward = current.base === previous.base + 1 && current.suffix === "";
      const okSuffix = current.base === previous.base && current.suffix > previous.suffix;
      assert.ok(okForward || okSuffix, `${slug}: sequência quebrada em ${previous.label} → ${current.label}`);
    }
  }
});

test("a base declara a cobertura e mantém o volume de texto", () => {
  const coverage = JSON.parse(readFileSync(new URL("../data/cobertura.json", import.meta.url), "utf8"));
  assert.equal(coverage.diplomas.length, slugs.length);
  assert.ok(coverage.totals.articles >= 1441, `regressão de cobertura: ${coverage.totals.articles} artigos`);
  assert.ok(coverage.totals.chars >= 1_100_000, `regressão de texto: ${coverage.totals.chars} caracteres`);

  // As lacunas conhecidas têm de continuar declaradas, para não passarem por texto completo.
  for (const item of coverage.diplomas) {
    assert.ok(["completo", "com lacunas"].includes(item.status));
    if (item.status === "com lacunas") assert.ok(item.gaps.length > 0, `${item.slug}: estado inconsistente`);
  }
});

test("a página inicial anuncia o texto integral e liga às páginas de leitura", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /<title>FiscalLex Angola — Biblioteca Fiscal e Tributária<\/title>/i);
  assert.match(html, /Texto integral/i);
  assert.match(html, /Ler texto integral/);
  assert.match(html, /Cobertura da transcrição/);
  assert.match(html, /Concebido e desenvolvido por Márcio Charata/);
  assert.match(html, /https:\/\/www\.linkedin\.com\/in\/mjcharata\//);

  for (const slug of slugs) {
    assert.match(html, new RegExp(`/codigos/${slug}`), `página inicial sem ligação para ${slug}`);
  }
});

for (const slug of slugs) {
  test(`/codigos/${slug} serve o articulado no HTML do servidor`, async () => {
    const response = await render(`/codigos/${slug}`);
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

    const html = await response.text();
    const data = readDiploma(slug);

    // Todos os artigos presentes no documento servido, não injectados no cliente.
    const rendered = (html.match(/data-article/g) ?? []).length;
    assert.ok(rendered >= data.articles.length, `${slug}: ${rendered} artigos no HTML para ${data.articles.length} na base`);

    assert.match(html, /Índice/);
    assert.match(html, new RegExp(data.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));

    // Amostra de texto legal: o primeiro parágrafo do primeiro artigo tem de estar no HTML.
    const firstParagraph = data.articles[0].blocks.find((block) => block.t === "p")?.x
      ?? data.articles[0].blocks.find((block) => block.t === "list")?.items?.[0];
    if (firstParagraph) {
      const excerpt = firstParagraph.slice(0, 40).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      assert.match(html, new RegExp(excerpt), `${slug}: texto do primeiro artigo ausente do HTML`);
    }
  });
}
