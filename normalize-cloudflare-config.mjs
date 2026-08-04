import { readFile, writeFile } from "node:fs/promises";

const configUrl = new URL("./dist/server/wrangler.json", import.meta.url);
const config = JSON.parse(await readFile(configUrl, "utf8"));
const flags = Array.isArray(config.compatibility_flags)
  ? config.compatibility_flags
  : [];

config.compatibility_flags = [
  ...new Set([
    ...flags.filter((flag) => flag !== "nodejs_compat"),
    "nodejs_compat",
  ]),
];

const nodeCompatibilityFlagCount = config.compatibility_flags.filter(
  (flag) => flag === "nodejs_compat",
).length;

if (nodeCompatibilityFlagCount !== 1) {
  throw new Error(
    `Expected exactly one nodejs_compat flag, found ${nodeCompatibilityFlagCount}.`,
  );
}

await writeFile(configUrl, `${JSON.stringify(config, null, 2)}\n`, "utf8");
console.log("Cloudflare configuration normalized: nodejs_compat appears once.");
