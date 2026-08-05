#!/usr/bin/env node
// Gera as rotas /codigos/<slug> para todos os diplomas presentes em data/diplomas/*.json.
// Cada rota importa apenas o seu próprio JSON, mantendo os bundles separados por página.

import { readdirSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const diplomasDir = join(root, "data", "diplomas");
const slugs = readdirSync(diplomasDir)
  .filter((file) => file.endsWith(".json"))
  .map((file) => file.replace(/\.json$/, ""));

for (const slug of slugs) {
  const routeDir = join(root, "app", "codigos", slug);
  mkdirSync(routeDir, { recursive: true });
  const source = `// Gerado por scripts/generate-routes.mjs — não editar à mão.
import data from "@/data/diplomas/${slug}.json";
import type { Diploma } from "@/data/diplomas/types";
import { DiplomaReader, diplomaMetadata } from "../reader";

export const generateMetadata = () => diplomaMetadata("${slug}");

export default function Page() {
  return <DiplomaReader data={data as unknown as Diploma} />;
}
`;
  writeFileSync(join(routeDir, "page.tsx"), source, "utf8");
  console.log(`✓ app/codigos/${slug}/page.tsx`);
}

if (slugs.length === 0) console.log("Nenhum diploma em data/diplomas/*.json — nada a gerar.");
