// Meta shop artwork: paddle skins, arena themes, relics.
// 480x320 (3:2) panels that read at card size. Pure SVG, no dependencies.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "../..");
const OUT = path.join(ROOT, "assets/art/meta");
const W = 480;
const H = 320;

const P = {
  ink: "#0b0710",
  bone: "#f6e8c8",
  gold: "#ffd700",
  cyan: "#00ffff",
  magenta: "#ff00ff",
  red: "#ff3333",
  green: "#39ff14",
  cardboard: "#b07a45",
};

const n = (v) => Math.round(v * 100) / 100;

function rng(seed) {
  let a = 2166136261 >>> 0;
  for (const ch of String(seed)) a = Math.imul(a ^ ch.charCodeAt(0), 16777619);
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function defs(id, accent, bgA, bgB, extra = "") {
  return `<defs>
  <radialGradient id="bg" cx="46%" cy="34%" r="86%">
    <stop offset="0" stop-color="${bgA}"/>
    <stop offset=".55" stop-color="${bgB}"/>
    <stop offset="1" stop-color="${P.ink}"/>
  </radialGradient>
  <radialGradient id="halo" cx="50%" cy="50%" r="50%">
    <stop offset="0" stop-color="${accent}" stop-opacity=".38"/>
    <stop offset=".62" stop-color="${accent}" stop-opacity=".1"/>
    <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="acc" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${accent}"/>
    <stop offset="1" stop-color="${P.bone}"/>
  </linearGradient>
  <pattern id="ht" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(22)">
    <circle cx="3.5" cy="3.5" r="1.7" fill="${P.ink}" opacity=".85"/>
  </pattern>
  <pattern id="scan" width="4" height="4" patternUnits="userSpaceOnUse">
    <rect width="4" height="1" y="1" fill="${P.bone}" opacity=".05"/>
  </pattern>
  <filter id="soft" x="-30%" y="-30%" width="160%" height="160%">
    <feGaussianBlur stdDeviation="6"/>
  </filter>
  ${extra}
</defs>`;
}

function frame(id, accent, label) {
  return `<rect x="0" y="0" width="${W}" height="${H}" fill="url(#bg)"/>
<rect x="0" y="0" width="${W}" height="${H}" fill="url(#scan)"/>
<rect x="8" y="8" width="${W - 16}" height="${H - 16}" fill="none" stroke="${accent}" stroke-opacity=".55" stroke-width="2"/>
<rect x="14" y="14" width="${W - 28}" height="${H - 28}" fill="none" stroke="${P.ink}" stroke-opacity=".6" stroke-width="1"/>
<g stroke="${accent}" stroke-width="2.5" stroke-linecap="round" opacity=".8">
  <path d="M8 34V8h26"/><path d="M${W - 34} 8h26v26"/>
  <path d="M8 ${H - 34}v26h26"/><path d="M${W - 8} ${H - 34}v26h-26"/>
</g>
<text x="${W - 20}" y="${H - 18}" text-anchor="end" font-family="monospace" font-size="9" letter-spacing="2.4" fill="${accent}" opacity=".5">${label}</text>`;
}

function stars(id, count, color, op = 0.5) {
  const r = rng(id);
  let out = `<g fill="${color}" opacity="${op}">`;
  for (let i = 0; i < count; i++) {
    out += `<circle cx="${n(r() * W)}" cy="${n(r() * H * 0.8)}" r="${n(0.6 + r() * 1.5)}"/>`;
  }
  return out + `</g>`;
}

// ---------- paddle skin renderers ----------

function woodPaddle(cx, cy, w, h, accent) {
  return `<g>
    <rect x="${n(cx - w / 2)}" y="${n(cy - h / 2)}" width="${w}" height="${h}" rx="${n(h / 2)}" fill="#d8b984" stroke="${P.ink}" stroke-width="3"/>
    <rect x="${n(cx - w / 2 + 3)}" y="${n(cy - h / 2 + 3)}" width="${n(w - 6)}" height="${n(h * 0.4)}" rx="${n(h * 0.2)}" fill="#efd9b0"/>
    <rect x="${n(cx - w / 2 + 5)}" y="${n(cy + h * 0.1)}" width="${n(w - 10)}" height="${n(h * 0.26)}" rx="${n(h * 0.13)}" fill="#9c7642" opacity=".8"/>
    <g stroke="#7a5a30" stroke-width="1.4" opacity=".5">
      <path d="M${n(cx - w / 2 + 14)} ${n(cy - 4)}h${n(w - 28)}"/>
      <path d="M${n(cx - w / 2 + 18)} ${n(cy + 4)}h${n(w - 36)}"/>
    </g>
  </g>`;
}

function glarpPaddle(cx, cy, w, h, loyal) {
  const accent = loyal ? P.gold : P.red;
  return `<g>
    <path d="M${n(cx - w / 2)} ${cy}q0 ${n(-h)} ${n(w / 2)} ${n(-h)}t${n(w / 2)} ${h}q0 ${n(h)} ${n(-w / 2)} ${h}t${n(-w / 2)} ${n(-h)}Z" fill="#39e04f" stroke="${P.ink}" stroke-width="3"/>
    <path d="M${n(cx - w / 2 + 6)} ${n(cy - h * 0.4)}q${n(w * 0.4)} ${n(-h * 0.5)} ${n(w * 0.8)} ${n(-h * 0.1)}" fill="none" stroke="#9dff86" stroke-width="3" opacity=".8"/>
    <g fill="${P.ink}">
      <ellipse cx="${n(cx - 18)}" cy="${n(cy - 4)}" rx="7" ry="9"/>
      <ellipse cx="${n(cx + 18)}" cy="${n(cy - 4)}" rx="7" ry="9"/>
    </g>
    <g fill="#fff"><circle cx="${n(cx - 20)}" cy="${n(cy - 7)}" r="2.4"/><circle cx="${n(cx + 16)}" cy="${n(cy - 7)}" r="2.4"/></g>
    <path d="M${n(cx - 12)} ${n(cy + 12)}q12 10 24 0" fill="none" stroke="${P.ink}" stroke-width="2.6"/>
    ${loyal ? `<path d="M${n(cx - 16)} ${n(cy - h * 0.72)}l6 -12l6 10l6 -12l6 12" fill="none" stroke="${P.gold}" stroke-width="3"/>` : `<path d="M${n(cx + w * 0.36)} ${n(cy + h * 0.3)}q10 14 -2 22" fill="none" stroke="#39e04f" stroke-width="4"/>`}
    <g fill="${accent}" opacity=".9"><circle cx="${n(cx - 34)}" cy="${n(cy + 12)}" r="3"/><circle cx="${n(cx + 30)}" cy="${n(cy + 14)}" r="2.4"/></g>
  </g>`;
}

function spoonPaddle(cx, cy, w, h) {
  return `<g>
    <path d="M${n(cx - w / 2 + 10)} ${n(cy - h * 0.62)}q${n(w * 0.52)} ${n(-h * 0.7)} ${n(w * 0.92)} ${n(h * 0.16)}q${n(-w * 0.2)} ${n(h * 1.1)} ${n(-w * 0.94)} ${n(h * 0.46)}Z" fill="#eef3f8" stroke="${P.ink}" stroke-width="3"/>
    <path d="M${n(cx - w / 2 + 24)} ${n(cy - h * 0.3)}q${n(w * 0.36)} ${n(-h * 0.42)} ${n(w * 0.66)} ${n(-h * 0.04)}" fill="none" stroke="#b9c2cc" stroke-width="5" opacity=".8"/>
    <path d="M${n(cx + w / 2 - 12)} ${n(cy + h * 0.1)}q14 12 6 26" fill="none" stroke="${P.ink}" stroke-width="4"/>
    <ellipse cx="${n(cx - w * 0.16)}" cy="${n(cy - h * 0.16)}" rx="10" ry="5" fill="#fff" opacity=".7"/>
  </g>`;
}

function remotePaddle(cx, cy, w, h) {
  return `<g>
    <rect x="${n(cx - w / 2)}" y="${n(cy - h * 0.8)}" width="${w}" height="${n(h * 1.6)}" rx="10" fill="#24272d" stroke="${P.ink}" stroke-width="3"/>
    <rect x="${n(cx - w / 2 + 6)}" y="${n(cy - h * 0.64)}" width="${n(w - 12)}" height="${n(h * 0.5)}" rx="4" fill="#14161a"/>
    <g>
      <circle cx="${n(cx - w * 0.3)}" cy="${n(cy + 4)}" r="8" fill="${P.red}" stroke="${P.ink}" stroke-width="1.5"/>
      <circle cx="${n(cx - w * 0.12)}" cy="${n(cy + 4)}" r="8" fill="${P.green}" stroke="${P.ink}" stroke-width="1.5"/>
      <circle cx="${n(cx + w * 0.06)}" cy="${n(cy + 4)}" r="8" fill="${P.cyan}" stroke="${P.ink}" stroke-width="1.5"/>
      <circle cx="${n(cx + w * 0.24)}" cy="${n(cy + 4)}" r="8" fill="${P.gold}" stroke="${P.ink}" stroke-width="1.5"/>
    </g>
    <rect x="${n(cx + w * 0.32)}" y="${n(cy - 4)}" width="14" height="10" rx="3" fill="#8b1f1f" stroke="${P.ink}" stroke-width="1.5"/>
    <rect x="${n(cx - w / 2 + 10)}" y="${n(cy + h * 0.5)}" width="${n(w * 0.5)}" height="4" fill="#3a3f47"/>
  </g>`;
}

function brokenPaddle(cx, cy, w, h) {
  return `<g>
    <rect x="${n(cx - w / 2)}" y="${n(cy - h / 2)}" width="${n(w * 0.42)}" height="${h}" rx="6" fill="#d8b984" stroke="${P.ink}" stroke-width="3"/>
    <rect x="${n(cx + w * 0.08)}" y="${n(cy - h / 2)}" width="${n(w * 0.42)}" height="${h}" rx="6" fill="#d8b984" stroke="${P.ink}" stroke-width="3"/>
    <path d="M${n(cx - w * 0.08)} ${n(cy - h / 2)}l10 ${n(h * 0.34)}l-12 ${n(h * 0.2)}l10 ${n(h * 0.46)}" fill="none" stroke="${P.ink}" stroke-width="3"/>
    <path d="M${n(cx + w * 0.08)} ${n(cy - h / 2)}l-8 ${n(h * 0.3)}l12 ${n(h * 0.24)}l-10 ${n(h * 0.46)}" fill="none" stroke="${P.ink}" stroke-width="3"/>
    <rect x="${n(cx - w * 0.1)}" y="${n(cy - h * 0.3)}" width="${n(w * 0.2)}" height="${n(h * 0.6)}" fill="#c9a774" opacity=".45" transform="rotate(-8 ${n(cx)} ${n(cy)})"/>
    <g stroke="#7a5a30" stroke-width="1.2" opacity=".5">
      <path d="M${n(cx - w * 0.42)} ${n(cy - 3)}h${n(w * 0.3)}"/>
      <path d="M${n(cx + w * 0.12)} ${n(cy + 3)}h${n(w * 0.3)}"/>
    </g>
  </g>`;
}

function fishPaddle(cx, cy, w, h) {
  return `<g>
    <path d="M${n(cx - w / 2)} ${cy}q${n(w * 0.12)} ${n(-h)} ${n(w * 0.4)} ${n(-h)}q${n(w * 0.34)} 0 ${n(w * 0.4)} ${h}q${n(-w * 0.06)} ${n(h)} ${n(-w * 0.4)} ${h}q${n(-w * 0.28)} 0 ${n(-w * 0.4)} ${n(-h)}Z" fill="#bfeaf7" stroke="${P.ink}" stroke-width="3"/>
    <path d="M${n(cx - w / 2)} ${cy}l-22 -16v32Z" fill="#9fdcf0" stroke="${P.ink}" stroke-width="2.5"/>
    <g stroke="#7cc4dc" stroke-width="1.6" opacity=".8">
      <path d="M${n(cx - w * 0.26)} ${n(cy - h * 0.5)}q8 8 0 16"/>
      <path d="M${n(cx - w * 0.1)} ${n(cy - h * 0.5)}q8 8 0 16"/>
      <path d="M${n(cx + w * 0.06)} ${n(cy - h * 0.5)}q8 8 0 16"/>
    </g>
    <circle cx="${n(cx + w * 0.3)}" cy="${n(cy - h * 0.1)}" r="5" fill="${P.ink}"/>
    <circle cx="${n(cx + w * 0.31)}" cy="${n(cy - h * 0.16)}" r="1.8" fill="#fff"/>
    <path d="M${n(cx + w * 0.2)} ${n(cy + h * 0.45)}q10 8 20 2" fill="none" stroke="${P.ink}" stroke-width="2"/>
    <g fill="#fff" opacity=".5"><path d="M${n(cx - w * 0.3)} ${n(cy - h * 0.6)}l6 -12l6 12Z"/></g>
  </g>`;
}

function wandPaddle(cx, cy, w, h) {
  return `<g>
    <rect x="${n(cx - w / 2)}" y="${n(cy - h * 0.34)}" width="${w}" height="${n(h * 0.68)}" rx="${n(h * 0.34)}" fill="#3a1808" stroke="${P.ink}" stroke-width="3"/>
    <rect x="${n(cx - w / 2 + 4)}" y="${n(cy - h * 0.26)}" width="${n(w - 8)}" height="${n(h * 0.2)}" rx="${n(h * 0.1)}" fill="#5a2a12"/>
    <rect x="${n(cx + w * 0.16)}" y="${n(cy - h * 0.36)}" width="10" height="${n(h * 0.72)}" fill="${P.gold}" stroke="${P.ink}" stroke-width="2"/>
    <circle cx="${n(cx + w / 2 + 8)}" cy="${cy}" r="17" fill="#7d2cff" stroke="${P.ink}" stroke-width="3"/>
    <circle cx="${n(cx + w / 2 + 8)}" cy="${cy}" r="9" fill="#d9b3ff" opacity=".9"/>
    <circle cx="${n(cx + w / 2 + 3)}" cy="${n(cy - 6)}" r="3.4" fill="#fff" opacity=".9"/>
    <g stroke="${P.gold}" stroke-width="2" opacity=".8">
      <path d="M${n(cx + w / 2 + 8)} ${n(cy - 30)}v-10"/>
      <path d="M${n(cx + w / 2 + 8)} ${n(cy + 30)}v10"/>
      <path d="M${n(cx + w / 2 - 22)} ${cy}h-10"/>
    </g>
  </g>`;
}

function managerPaddle(cx, cy, w, h) {
  return `<g>
    <rect x="${n(cx - w / 2)}" y="${n(cy - h / 2)}" width="${w}" height="${h}" rx="${n(h / 2)}" fill="#12060a" stroke="${P.red}" stroke-width="3"/>
    <rect x="${n(cx - w / 2 + 4)}" y="${n(cy - h / 2 + 3)}" width="${n(w - 8)}" height="${n(h * 0.26)}" rx="${n(h * 0.13)}" fill="#3a0d16"/>
    <rect x="${n(cx - w / 2 + 2)}" y="${n(cy + h * 0.28)}" width="${n(w - 4)}" height="2.5" fill="${P.gold}" opacity=".85"/>
    <g>
      <ellipse cx="${n(cx - w * 0.18)}" cy="${cy}" rx="9" ry="6" fill="${P.bone}"/>
      <ellipse cx="${n(cx + w * 0.18)}" cy="${cy}" rx="9" ry="6" fill="${P.bone}"/>
      <circle cx="${n(cx - w * 0.18)}" cy="${cy}" r="4" fill="${P.red}"/>
      <circle cx="${n(cx + w * 0.18)}" cy="${cy}" r="4" fill="${P.red}"/>
    </g>
    <g stroke="${P.red}" stroke-width="2" opacity=".6">
      <path d="M${n(cx - w / 2 - 6)} ${n(cy - 12)}v24"/>
      <path d="M${n(cx + w / 2 + 6)} ${n(cy - 12)}v24"/>
    </g>
  </g>`;
}

// ---------- theme scenes ----------

function scenePiknik() {
  let tiles = "";
  const cell = 40;
  for (let x = -cell; x < W + cell; x += cell) {
    for (let y = 90; y < H + cell; y += cell) {
      tiles += `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" fill="${((x / cell + y / cell) & 1) ? "#e63946" : "#f1faee"}"/>`;
    }
  }
  return `<rect x="0" y="0" width="${W}" height="${H}" fill="#fff7ee"/>
  ${tiles}
  <rect x="0" y="0" width="${W}" height="96" fill="#ffd166"/>
  <circle cx="392" cy="54" r="34" fill="#fff3c4" opacity=".9"/>
  <path d="M330 118l44 22l-40 20Z" fill="#f4a261" stroke="${P.ink}" stroke-width="2.5"/>
  <g fill="#8b5a2b"><circle cx="344" cy="140" r="4"/><circle cx="356" cy="134" r="3"/></g>
  <g fill="${P.ink}" opacity=".7"><circle cx="70" cy="160" r="3"/><circle cx="96" cy="146" r="2.5"/><circle cx="120" cy="168" r="2"/></g>`;
}

function sceneNeon() {
  let grid = "";
  for (let i = -8; i <= 8; i++) {
    grid += `<path d="M${n(W / 2 + i * 34)} 320L${n(W / 2 + i * 7)} 176"/>`;
  }
  let horiz = "";
  for (let i = 0; i < 10; i++) {
    const y = 176 + Math.pow(i / 10, 1.8) * 144;
    horiz += `<path d="M0 ${n(y)}h${W}"/>`;
  }
  return `<rect x="0" y="0" width="${W}" height="${H}" fill="#0e0022"/>
  <circle cx="${W / 2}" cy="140" r="76" fill="#ff2bd6" opacity=".55"/>
  <g fill="#0e0022"><rect x="0" y="128" width="${W}" height="5"/><rect x="0" y="146" width="${W}" height="4"/><rect x="0" y="162" width="${W}" height="3"/></g>
  <g stroke="#00ffff" stroke-width="1.6" opacity=".85">${grid}${horiz}</g>
  <g stroke="#ff2bd6" stroke-width="2" opacity=".7"><path d="M0 176h${W}"/></g>`;
}

function sceneRetak() {
  const r = rng("retak");
  let cracks = "";
  for (let i = 0; i < 7; i++) {
    const sx = r() * W, sy = r() * H;
    cracks += `<path d="M${n(sx)} ${n(sy)}l${n((r() - 0.5) * 80)} ${n(40 + r() * 50)}l${n((r() - 0.5) * 70)} ${n(30 + r() * 40)}"/>`;
  }
  return `<rect x="0" y="0" width="${W}" height="${H}" fill="#1a1208"/>
  <rect x="0" y="0" width="${W}" height="${H}" fill="#b07a45" opacity=".55"/>
  <g stroke="#8a5c30" stroke-width="1.2" opacity=".6">
    <path d="M0 60h480M0 120h480M0 180h480M0 240h480"/>
  </g>
  <g stroke="#00ffff" stroke-width="2" opacity=".9" fill="none">${cracks}</g>
  <g stroke="#ff00ff" stroke-width="1.6" opacity=".7" fill="none">${cracks}</g>
  <g fill="${P.ink}" opacity=".5"><rect x="0" y="200" width="${W}" height="10"/></g>`;
}

function sceneLovecraft() {
  return `<rect x="0" y="0" width="${W}" height="${H}" fill="#04120c"/>
  <rect x="0" y="140" width="${W}" height="180" fill="#0b3d2e"/>
  <g stroke="#39ff14" stroke-width="2" opacity=".6" fill="none">
    <path d="M0 170q120 14 240 0t240 0"/>
    <path d="M0 210q120 -18 240 0t240 0"/>
    <path d="M0 258q120 16 240 0t240 0"/>
  </g>
  <g stroke="#0b3d2e" stroke-width="11" stroke-linecap="round" fill="none" opacity=".9">
    <path d="M110 320q30 -90 -10 -160"/>
    <path d="M200 320q-24 -100 16 -170"/>
    <path d="M300 320q30 -80 -6 -150"/>
    <path d="M390 320q-26 -96 12 -160"/>
  </g>
  <circle cx="240" cy="120" r="56" fill="#39ff14" opacity=".12"/>
  <g fill="#39ff14" opacity=".8"><circle cx="120" cy="70" r="2.5"/><circle cx="330" cy="60" r="2"/><circle cx="400" cy="96" r="1.8"/></g>`;
}

function sceneKuali() {
  return `<rect x="0" y="0" width="${W}" height="${H}" fill="#1a0b02"/>
  <rect x="0" y="150" width="${W}" height="170" fill="#2b1408"/>
  <ellipse cx="240" cy="196" rx="130" ry="46" fill="#0e0703" stroke="#a3300a" stroke-width="4"/>
  <ellipse cx="240" cy="190" rx="112" ry="36" fill="#ff8a1e" opacity=".35"/>
  <g fill="#ff8a1e" opacity=".75">
    <circle cx="196" cy="182" r="9"/><circle cx="262" cy="176" r="12"/><circle cx="300" cy="190" r="7"/><circle cx="226" cy="198" r="6"/>
  </g>
  <g stroke="#7fe36b" stroke-width="3" opacity=".7" fill="none">
    <path d="M150 120q20 -40 44 -10"/><path d="M300 110q18 -36 40 -6"/>
  </g>
  <g stroke="#a3300a" stroke-width="5" opacity=".8"><path d="M0 262h480"/></g>
  <g fill="#ff8a1e" opacity=".55"><circle cx="240" cy="140" r="60"/></g>`;
}

function scenePanggung() {
  return `<rect x="0" y="0" width="${W}" height="${H}" fill="#1c0009"/>
  <path d="M0 0h120q-22 120 6 240t-4 80H0Z" fill="#7a0010" stroke="${P.ink}" stroke-width="3"/>
  <path d="M480 0h-120q22 120-6 240t4 80h122Z" fill="#7a0010" stroke="${P.ink}" stroke-width="3"/>
  <path d="M200 0h80l-26 320h-28Z" fill="#ffd700" opacity=".18"/>
  <ellipse cx="240" cy="272" rx="150" ry="30" fill="#ffd700" opacity=".22"/>
  <g fill="#ffd700" opacity=".85">
    <circle cx="112" cy="286" r="7"/><circle cx="176" cy="292" r="6"/><circle cx="240" cy="296" r="8"/><circle cx="304" cy="292" r="6"/><circle cx="368" cy="286" r="7"/>
  </g>
  <g fill="#ff2bd6" opacity=".5"><circle cx="240" cy="120" r="40"/></g>`;
}

function sceneManajer() {
  return `<rect x="0" y="0" width="${W}" height="${H}" fill="#12040a"/>
  <path d="M0 0h96q-18 120 4 240t-2 80H0Z" fill="#4a0000" stroke="${P.ink}" stroke-width="3"/>
  <path d="M480 0h-96q18 120-4 240t2 80h98Z" fill="#4a0000" stroke="${P.ink}" stroke-width="3"/>
  <path d="M240 44l96 62v118l-96 62l-96 -62V106Z" fill="#2b0006" stroke="${P.red}" stroke-width="3"/>
  <ellipse cx="240" cy="150" rx="30" ry="19" fill="${P.bone}"/>
  <circle cx="240" cy="150" r="10" fill="${P.red}"/>
  <circle cx="236" cy="146" r="3.4" fill="#fff" opacity=".85"/>
  <g stroke="${P.gold}" stroke-width="2" opacity=".7"><path d="M240 44v-22"/><path d="M240 286v22"/></g>
  <g fill="${P.bone}" opacity=".8"><rect x="150" y="112" width="22" height="15" transform="rotate(-14 161 119)"/><rect x="308" y="196" width="22" height="15" transform="rotate(12 319 203)"/></g>`;
}

// ---------- relic objects ----------

function relic(kind, accent) {
  const c = 240, y = 158;
  const base = `<ellipse cx="${c}" cy="252" rx="104" ry="22" fill="${accent}" opacity=".14"/>`;
  const glow = `<circle cx="${c}" cy="${y}" r="88" fill="url(#halo)"/>`;
  const shapes = {
    bag: `<path d="M${c - 62} 196q-8 -76 62 -76t62 76q-6 46 -62 46t-62 -46Z" fill="${P.cardboard}" stroke="${P.ink}" stroke-width="3"/>
      <path d="M${c - 40} 132q40 -22 80 0" fill="none" stroke="${P.ink}" stroke-width="3"/>
      <circle cx="${c}" cy="150" r="9" fill="${P.gold}" stroke="${P.ink}" stroke-width="2"/>
      <path d="M${c - 46} 196q46 26 92 0" fill="none" stroke="#8a5c30" stroke-width="2.5"/>`,
    letter: `<rect x="${c - 72}" y="${y - 52}" width="144" height="100" rx="4" fill="${P.bone}" stroke="${P.ink}" stroke-width="3"/>
      <path d="M${c - 72} ${y - 52}l72 52l72 -52" fill="none" stroke="${P.ink}" stroke-width="2.5"/>
      <circle cx="${c}" cy="${y + 4}" r="15" fill="#8b0000" stroke="${P.ink}" stroke-width="2"/>
      <path d="M${c - 8} ${y + 4}h16M${c} ${y - 4}v16" stroke="${P.bone}" stroke-width="2"/>`,
    glasses: `<g fill="none" stroke="${P.cyan}" stroke-width="4">
        <circle cx="${c - 36}" cy="${y}" r="30"/><circle cx="${c + 36}" cy="${y}" r="30"/>
        <path d="M${c - 6} ${y}h12"/><path d="M${c - 66} ${y - 8}l-24 -14"/><path d="M${c + 66} ${y - 8}l24 -14"/>
      </g>
      <g fill="${P.cyan}" opacity=".22"><circle cx="${c - 36}" cy="${y}" r="30"/><circle cx="${c + 36}" cy="${y}" r="30"/></g>`,
    hourglass: `<path d="M${c - 42} ${y - 62}h84v14h-84Z" fill="${P.gold}" stroke="${P.ink}" stroke-width="2.5"/>
      <path d="M${c - 42} ${y + 48}h84v14h-84Z" fill="${P.gold}" stroke="${P.ink}" stroke-width="2.5"/>
      <path d="M${c - 34} ${y - 48}h68l-34 44l34 44h-68l34 -44Z" fill="${P.bone}" opacity=".28" stroke="${P.ink}" stroke-width="2.5"/>
      <path d="M${c - 20} ${y + 34}h40l-20 -18Z" fill="${P.gold}"/>
      <path d="M${c - 18} ${y - 34}h36l-18 16Z" fill="${P.gold}" opacity=".7"/>`,
    dice: `<g transform="rotate(-12 ${c} ${y})">
        <rect x="${c - 52}" y="${y - 52}" width="104" height="104" rx="14" fill="${P.bone}" stroke="${P.ink}" stroke-width="3"/>
        <g fill="${P.ink}"><circle cx="${c - 26}" cy="${y - 26}" r="8"/><circle cx="${c + 26}" cy="${y + 26}" r="8"/><circle cx="${c}" cy="${y}" r="8"/><circle cx="${c + 26}" cy="${y - 26}" r="8"/><circle cx="${c - 26}" cy="${y + 26}" r="8"/></g>
      </g>
      <path d="M${c + 60} ${y + 54}q16 12 4 26" fill="none" stroke="${P.red}" stroke-width="3"/>`,
    lens: `<circle cx="${c}" cy="${y}" r="56" fill="${P.magenta}" opacity=".18" stroke="${P.ink}" stroke-width="3"/>
      <circle cx="${c}" cy="${y}" r="56" fill="none" stroke="${P.magenta}" stroke-width="3"/>
      <circle cx="${c}" cy="${y}" r="34" fill="none" stroke="${P.cyan}" stroke-width="2" stroke-dasharray="6 5"/>
      <path d="M${c + 40} ${y + 40}l34 34" stroke="${P.ink}" stroke-width="9" stroke-linecap="round"/>
      <path d="M${c + 40} ${y + 40}l34 34" stroke="${P.gold}" stroke-width="4" stroke-linecap="round"/>
      <path d="M${c - 20} ${y - 22}a30 30 0 0 1 22 -10" fill="none" stroke="#fff" stroke-width="3" opacity=".7"/>`,
  };
  return base + glow + shapes[kind];
}

// ---------- assembly ----------

const SKINS = [
  { id: "skin_default", accent: "#ffd700", bg: ["#2a1f14", "#0f0a06"], draw: (cx, cy, w, h) => woodPaddle(cx, cy, w, h) },
  { id: "skin_glarp", accent: "#39ff14", bg: ["#0d2410", "#04100a"], draw: (cx, cy, w, h) => glarpPaddle(cx, cy, w, h, false) },
  { id: "skin_glarp_setia", accent: "#ffd700", bg: ["#1a2410", "#080d04"], draw: (cx, cy, w, h) => glarpPaddle(cx, cy, w, h, true) },
  { id: "skin_sendok", accent: "#c0c0c0", bg: ["#1c1f24", "#08090c"], draw: (cx, cy, w, h) => spoonPaddle(cx, cy, w, h) },
  { id: "skin_remote", accent: "#00ffff", bg: ["#14171c", "#06080a"], draw: (cx, cy, w, h) => remotePaddle(cx, cy, w, h) },
  { id: "skin_patah", accent: "#ff8a5c", bg: ["#241610", "#0c0705"], draw: (cx, cy, w, h) => brokenPaddle(cx, cy, w, h) },
  { id: "skin_ikan", accent: "#7cc4dc", bg: ["#0d1c24", "#040a0e"], draw: (cx, cy, w, h) => fishPaddle(cx, cy, w, h) },
  { id: "skin_tongkat", accent: "#7d2cff", bg: ["#1a0e2a", "#08040f"], draw: (cx, cy, w, h) => wandPaddle(cx, cy, w, h) },
  { id: "skin_manajer", accent: "#ff3333", bg: ["#2a0410", "#0d0206"], draw: (cx, cy, w, h) => managerPaddle(cx, cy, w, h) },
];

const THEMES = [
  { id: "theme_piknik", accent: "#e63946", bg: ["#ffe9c9", "#7a3a1a"], scene: scenePiknik },
  { id: "theme_neon", accent: "#00ffff", bg: ["#1a0033", "#05000c"], scene: sceneNeon },
  { id: "theme_retak", accent: "#00ffff", bg: ["#2a1c0e", "#0a0704"], scene: sceneRetak },
  { id: "theme_lovecraft", accent: "#39ff14", bg: ["#0a2418", "#020806"], scene: sceneLovecraft },
  { id: "theme_kuali", accent: "#ff8a1e", bg: ["#2a1206", "#0a0402"], scene: sceneKuali },
  { id: "theme_panggung", accent: "#ffd700", bg: ["#2b0010", "#0a0004"], scene: scenePanggung },
  { id: "theme_manajer", accent: "#ff3333", bg: ["#2a040c", "#0a0104"], scene: sceneManajer },
];

const RELICS = [
  { id: "R01", accent: "#ffd700", bg: ["#2a2210", "#0b0803"], kind: "bag", label: "KANTONG" },
  { id: "R02", accent: "#f6e8c8", bg: ["#2a2418", "#0b0906"], kind: "letter", label: "SURAT" },
  { id: "R03", accent: "#00ffff", bg: ["#0d2228", "#030a0c"], kind: "glasses", label: "KACAMATA" },
  { id: "R04", accent: "#ffd700", bg: ["#2a1e10", "#0b0603"], kind: "hourglass", label: "JAM PASIR" },
  { id: "R05", accent: "#ff3333", bg: ["#28101a", "#0b0407"], kind: "dice", label: "DADU" },
  { id: "R06", accent: "#ff00ff", bg: ["#200d28", "#08030b"], kind: "lens", label: "LENSA" },
];

function skinSvg(item) {
  const [bgA, bgB] = item.bg;
  const body = `<g>
    <circle cx="240" cy="152" r="126" fill="url(#halo)"/>
    <ellipse cx="240" cy="232" rx="128" ry="20" fill="${P.ink}" opacity=".5"/>
    ${stars(item.id, 30, item.accent, 0.45)}
    ${item.draw(240, 152, 236, 52)}
    <g stroke="${item.accent}" stroke-width="2" opacity=".45">
      <path d="M240 62v-24"/><path d="M240 250v22"/>
    </g>
  </g>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-labelledby="t" data-art-id="${item.id}">
<title id="t">${item.id}</title>
${defs(item.id, item.accent, bgA, bgB)}
${frame(item.id, item.accent, "STICK")}
${body}
</svg>`;
}

function themeSvg(item) {
  const [bgA, bgB] = item.bg;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-labelledby="t" data-art-id="${item.id}">
<title id="t">${item.id}</title>
${defs(item.id, item.accent, bgA, bgB)}
${item.scene()}
<rect x="0" y="0" width="${W}" height="${H}" fill="url(#halo)" opacity=".35"/>
${frame(item.id, item.accent, "ARENA")}
</svg>`;
}

function relicSvg(item) {
  const [bgA, bgB] = item.bg;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-labelledby="t" data-art-id="${item.id}">
<title id="t">${item.id}</title>
${defs(item.id, item.accent, bgA, bgB)}
${stars(item.id, 26, item.accent, 0.4)}
${relic(item.kind, item.accent)}
${frame(item.id, item.accent, item.label)}
</svg>`;
}

function check(svg, id) {
  if (!svg.startsWith("<svg")) throw new Error(`${id}: not svg`);
  if (!svg.includes(`data-art-id="${id}"`)) throw new Error(`${id}: bad id`);
  if (/<image|<script|<foreignObject|data:image/i.test(svg)) throw new Error(`${id}: forbidden content`);
  if (/undefined|NaN/.test(svg)) throw new Error(`${id}: invalid value`);
  const open = (svg.match(/<[a-zA-Z]/g) || []).length;
  const close = (svg.match(/<\/[a-zA-Z]/g) || []).length + (svg.match(/\/>/g) || []).length;
  if (open !== close) throw new Error(`${id}: unbalanced tags ${open}/${close}`);
}

const manifest = [];
const write = (rel, svg, id) => {
  check(svg, id);
  const full = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, svg);
  manifest.push({ id, file: `assets/art/meta/${rel}`, bytes: Buffer.byteLength(svg) });
};

for (const s of SKINS) write(`skins/${s.id}.svg`, skinSvg(s), s.id);
for (const t of THEMES) write(`themes/${t.id}.svg`, themeSvg(t), t.id);
for (const r of RELICS) write(`relics/${r.id}.svg`, relicSvg(r), r.id);

fs.writeFileSync(path.join(OUT, "manifest.json"), JSON.stringify({ count: manifest.length, items: manifest }, null, 2) + "\n");

const maxBytes = Math.max(...manifest.map((m) => m.bytes));
console.log(`meta assets: ${manifest.length}`);
console.log(`  skins:  ${SKINS.length}`);
console.log(`  themes: ${THEMES.length}`);
console.log(`  relics: ${RELICS.length}`);
console.log(`max bytes: ${maxBytes}`);
