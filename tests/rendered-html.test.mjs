import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the FiscalLex Angola portal", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>FiscalLex Angola — Biblioteca Fiscal e Tributária<\/title>/i);
  assert.match(html, /Legislação fiscal\./);
  assert.match(html, /Códigos fiscais e tributários/);
  assert.match(html, /Concebido e desenvolvido por Márcio Charata/);
  assert.match(html, /https:\/\/www\.linkedin\.com\/in\/mjcharata\//);
  assert.match(html, /src="\/angola-flag\.png"/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});

test("keeps the Cloudflare Workers deployment self-contained", async () => {
  const [packageJson, viteConfig, wranglerConfig, cloudflareGuide] =
    await Promise.all([
      readFile(new URL("../package.json", import.meta.url), "utf8"),
      readFile(new URL("../vite.config.ts", import.meta.url), "utf8"),
      readFile(new URL("../wrangler.jsonc", import.meta.url), "utf8"),
      readFile(new URL("../CLOUDFLARE.md", import.meta.url), "utf8"),
    ]);

  assert.match(packageJson, /"name": "fiscallex-angola"/);
  assert.match(packageJson, /"deploy:cloudflare"/);
  assert.match(packageJson, /"preview:cloudflare"/);
  assert.doesNotMatch(viteConfig, /hostingConfig|\.openai\/hosting\.json/);
  assert.match(wranglerConfig, /"name": "fiscallex-angola"/);
  assert.match(wranglerConfig, /"main": "dist\/server\/index\.js"/);
  assert.match(wranglerConfig, /"directory": "dist\/client"/);
  assert.match(cloudflareGuide, /npm run deploy:cloudflare/);

  await access(new URL("../public/angola-flag.png", import.meta.url));
  await access(new URL("../dist/server/index.js", import.meta.url));
});
