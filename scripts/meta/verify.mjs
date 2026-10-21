// Integrity check for meta shop art: every META_ITEMS entry needs a mapped asset.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "../..");
const ART = path.join(ROOT, "assets/art/meta");
const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");

const start = html.indexOf("const META_ITEMS = [");
if (start < 0) throw new Error("META_ITEMS not found");
const open = html.indexOf("[", start);
let depth = 0, end = -1;
for (let i = open; i < html.length; i++) {
  if (html[i] === "[") depth++;
  else if (html[i] === "]") { depth--; if (depth === 0) { end = i; break; } }
}
const body = html.slice(open + 1, end);

const items = [];
let d = 0, buf = "";
for (const ch of body) {
  if (ch === "{") { d++; if (d === 1) buf = ""; }
  if (d > 0) buf += ch;
  if (ch === "}") { d--; if (d === 0) items.push(buf); }
}

const parsed = items.map((e) => ({
  type: e.match(/type:\s*"([^"]+)"/)?.[1],
  id: e.match(/id:\s*"([^"]+)"/)?.[1],
  name: e.match(/name:\s*"([^"]+)"/)?.[1],
  hidden: /hiddenUntilOwned:\s*true/.test(e),
})).filter((x) => x.type && x.id);

const manifest = JSON.parse(fs.readFileSync(path.join(ART, "manifest.json"), "utf8"));
const files = new Set(manifest.items.map((m) => m.id));

const errors = [];
const seen = new Set();
for (const it of parsed) {
  if (seen.has(it.id)) errors.push(`duplicate item id: ${it.id}`);
  seen.add(it.id);
  const rel = `${it.type === "skin" ? "skins" : it.type === "theme" ? "themes" : "relics"}/${it.id}.svg`;
  const full = path.join(ART, rel);
  if (!fs.existsSync(full)) { errors.push(`missing art: ${it.type} ${it.id}`); continue; }
  const svg = fs.readFileSync(full, "utf8");
  if (!svg.includes(`data-art-id="${it.id}"`)) errors.push(`wrong id in art: ${it.id}`);
  if (!files.has(it.id)) errors.push(`not in manifest: ${it.id}`);
}

for (const m of manifest.items) {
  if (!seen.has(m.id)) errors.push(`orphan art file: ${m.id}`);
}

const byType = (t) => parsed.filter((i) => i.type === t).length;
console.log(`meta items:  ${parsed.length}`);
console.log(`  skins:     ${byType("skin")}`);
console.log(`  themes:    ${byType("theme")}`);
console.log(`  relics:    ${byType("relic")}`);
console.log(`art files:   ${manifest.items.length}`);
console.log(`total size:  ${Math.round(manifest.items.reduce((s, i) => s + i.bytes, 0) / 1024)} KB`);
if (errors.length) {
  console.error("FAIL");
  for (const e of errors) console.error(" - " + e);
  process.exit(1);
}
console.log("OK: every shop item has artwork");
