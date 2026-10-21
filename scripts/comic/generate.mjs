import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { P } from "./lib.mjs";
import { milestones } from "./milestones.mjs";
import { bosses } from "./bosses.mjs";
import { secrets } from "./secrets.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const outDir = path.join(root, "assets/art/comic");

const plan = [
  ...Object.keys(milestones).map((id) => ({ id, fn: milestones[id], palette: id === "first_bounce" ? P.piknik : id === "fusion_first" ? { paper: "#f3e6cf", ink: "#0b0710", a: "#ff2bd6", b: "#00ffff", third: "#7a4a12" } : id === "phase_5" ? P.neon : id === "first_run" || id === "phase_7" || id === "absurdity_150" ? P.ritual : id === "torment_25" ? P.manajer : id === "run_50" ? P.panggung : P.secret })),
  ...Object.keys(bosses).map((id) => {
    const palette =
      ["lumi", "pipo", "kapten_keju"].includes(id) ? P.piknik :
      ["overclock", "dj_synth", "neon_phantom"].includes(id) ? P.neon :
      ["echo", "error404", "archivist"].includes(id) ? P.retak :
      ["whisperer", "deep_one", "unseeing_eye"].includes(id) ? P.lovecraft :
      ["chef_ragu", "taster", "ramuan_hidup"].includes(id) ? P.kuali :
      ["prima_donna", "critic", "understudy"].includes(id) ? P.panggung :
      P.manajer;
    return { id, fn: bosses[id], palette };
  }),
  ...Object.keys(secrets).map((id) => ({ id, fn: secrets[id], palette: id === "glitch" ? P.secret : P.manajer })),
];

fs.mkdirSync(outDir, { recursive: true });

const manifest = [];
let maxBytes = 0;
for (const item of plan) {
  const svg = item.fn(item.palette);
  if (!svg.startsWith("<svg") || !svg.includes("</svg>")) throw new Error(`invalid svg: ${item.id}`);
  if (/<text|<font/i.test(svg)) throw new Error(`artwork must not contain text: ${item.id}`);
  const file = path.join(outDir, `${item.id}.svg`);
  fs.writeFileSync(file, svg);
  const bytes = Buffer.byteLength(svg);
  maxBytes = Math.max(maxBytes, bytes);
  manifest.push({ id: item.id, file: `assets/art/comic/${item.id}.svg`, bytes });
}

fs.writeFileSync(path.join(outDir, "manifest.json"), JSON.stringify({ generatedBy: "scripts/comic/generate.mjs", count: manifest.length, maxBytes, items: manifest }, null, 2) + "\n");

console.log(`comic panels: ${plan.length}`);
console.log(`max bytes: ${maxBytes}`);
console.log(`out: ${path.relative(root, outDir)}`);
