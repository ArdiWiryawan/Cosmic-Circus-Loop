// Integrity check for the comic archive: art <-> achievement mapping, file format, size.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const comicDir = path.join(root, "assets/art/comic");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");

const manifest = JSON.parse(fs.readFileSync(path.join(comicDir, "manifest.json"), "utf8"));
const ids = [...html.matchAll(/id:\s*"([a-z0-9_]+)",\s*chapter:/g)].map((m) => m[1]);
const arts = [...html.matchAll(/art:\s*"assets\/art\/comic\/([a-z0-9_]+)\.svg"/g)].map((m) => m[1]);

const errors = [];
if (manifest.count !== manifest.items.length) errors.push("manifest count mismatch");
if (ids.length !== new Set(ids).size) errors.push("duplicate achievement ids");
if (arts.length !== ids.length) errors.push(`achievement/art count mismatch: ${ids.length} vs ${arts.length}`);
for (const id of ids) if (!arts.includes(id)) errors.push(`missing art mapping: ${id}`);
for (const id of arts) if (!ids.includes(id)) errors.push(`orphan art mapping: ${id}`);

for (const item of manifest.items) {
  const file = path.join(comicDir, `${item.id}.svg`);
  if (!fs.existsSync(file)) { errors.push(`missing file: ${item.id}`); continue; }
  const svg = fs.readFileSync(file, "utf8");
  if (!svg.startsWith("<svg")) errors.push(`not svg: ${item.id}`);
  if (!svg.includes(`data-art-id="${item.id}"`)) errors.push(`wrong art id: ${item.id}`);
  if (/<text|<font/i.test(svg)) errors.push(`contains text: ${item.id}`);
  if (Buffer.byteLength(svg) > 18 * 1024) errors.push(`too large: ${item.id}`);
}

const extra = fs.readdirSync(comicDir).filter((f) => f.endsWith(".svg") && !manifest.items.some((i) => `${i.id}.svg` === f));
if (extra.length) errors.push(`unlisted svg files: ${extra.join(", ")}`);

console.log(`achievements: ${ids.length}`);
console.log(`art files: ${manifest.items.length}`);
console.log(`total: ${Math.round(manifest.items.reduce((s, i) => s + i.bytes, 0) / 1024)} KB`);
console.log(`max: ${Math.round(manifest.maxBytes / 1024)} KB`);
if (errors.length) {
  console.error("FAIL");
  for (const e of errors) console.error(" - " + e);
  process.exit(1);
}
console.log("OK: archive integrity verified");
