// Static audit: every power-up / fusion / illegal tag must actually be read by gameplay.
// Wired = has at least one hasEffect("tag") read, OR the card carries its own execute()
// (cards like I03 inject a timed item instead of relying on a tag reader).
import fs from "node:fs";
const src = fs.readFileSync("index.html", "utf8");

function block(name) {
  const start = src.indexOf(`const ${name} = [`);
  if (start < 0) throw new Error(`missing ${name}`);
  const open = src.indexOf("[", start);
  let depth = 0;
  for (let i = open; i < src.length; i++) {
    if (src[i] === "[") depth++;
    else if (src[i] === "]") {
      depth--;
      if (depth === 0) return src.slice(open + 1, i);
    }
  }
  throw new Error(`unterminated ${name}`);
}

function entries(body) {
  const out = [];
  let depth = 0, buf = "";
  for (const ch of body) {
    if (ch === "{") { depth++; if (depth === 1) buf = ""; }
    if (depth > 0) buf += ch;
    if (ch === "}") { depth--; if (depth === 0) out.push(buf); }
  }
  return out;
}

const defs = [];
function collect(name, kind) {
  for (const e of entries(block(name))) {
    const id = e.match(/id:\s*"([^"]+)"/)?.[1];
    if (!id) continue;
    const tags = [...e.matchAll(/tags:\s*\[([^\]]*)\]/g)].flatMap((t) =>
      [...t[1].matchAll(/"([a-z0-9_]+)"/g)].map((x) => x[1]),
    );
    defs.push({ id, kind, tags, hasExecute: /execute:\s*\(/.test(e) });
  }
}
collect("BASE_POWERUPS", "powerup");
collect("ALCHEMY_FUSIONS", "fusion");
collect("ILLEGAL_CARDS", "illegal");

const reads = (tag) =>
  (src.match(new RegExp(`hasEffect\\("${tag}"\\)`, "g")) || []).length +
  (src.match(new RegExp(`includes\\("${tag}"\\)`, "g")) || []).length;

// Cards whose behaviour lives in buyPowerup()/special-case code rather than a tag reader.
const SPECIAL_CASED = new Set(["I04"]);

const rows = defs.flatMap((d) => d.tags.map((tag) => ({ ...d, tag, reads: reads(tag) })));
const noReader = rows.filter((r) => r.reads === 0);
const missing = noReader.filter((r) => !r.hasExecute && !SPECIAL_CASED.has(r.id));

console.log(`definitions: ${defs.length}`);
console.log(`  powerups:  ${defs.filter((d) => d.kind === "powerup").length}`);
console.log(`  fusions:   ${defs.filter((d) => d.kind === "fusion").length}`);
console.log(`  illegal:   ${defs.filter((d) => d.kind === "illegal").length}`);
console.log(`tag links:   ${rows.length}`);
console.log(`read sites:  ${rows.reduce((s, r) => s + r.reads, 0)}`);
console.log(`tags without a reader: ${noReader.length}`);
for (const r of noReader) {
  console.log(`  ${r.kind.padEnd(8)} ${r.id.padEnd(7)} -> ${r.tag}${r.hasExecute ? "  (execute() covers it)" : SPECIAL_CASED.has(r.id) ? "  (special-cased in buyPowerup)" : "  *** NOT IMPLEMENTED ***"}`);
}
if (missing.length) {
  console.log(`\nFAIL: ${missing.length} tag(s) have no gameplay effect`);
  process.exit(1);
}
console.log("\nOK: every tag is either read by gameplay or backed by execute()");
