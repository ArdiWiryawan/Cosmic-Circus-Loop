// Comic panel primitive library — risograph / alternative comic screenprint look.
// All output is self-contained SVG. No fonts, no external refs, no raster.

export const W = 1200;
export const H = 800;

export const P = {
  ritual:   { paper: "#f1e2c6", ink: "#0b0710", a: "#ffd700", b: "#ff3333", third: "#7a4a12" },
  piknik:   { paper: "#fff3dc", ink: "#1a0d08", a: "#e63946", b: "#ffd166", third: "#8b5a2b" },
  neon:     { paper: "#0e0022", ink: "#04000a", a: "#00ffff", b: "#ff2bd6", third: "#ffd700" },
  retak:    { paper: "#c4a47a", ink: "#0a0a0c", a: "#00ffff", b: "#ff00ff", third: "#6b4a2a" },
  lovecraft:{ paper: "#dcefcf", ink: "#020604", a: "#39ff14", b: "#0b3d2e", third: "#7fe36b" },
  kuali:    { paper: "#f6e2bf", ink: "#1a0b02", a: "#ff8a1e", b: "#7fe36b", third: "#a3300a" },
  panggung: { paper: "#f7e8cf", ink: "#2b0010", a: "#ffd700", b: "#ff2bd6", third: "#7a0010" },
  manajer:  { paper: "#f6e8c8", ink: "#08060a", a: "#ff3333", b: "#ffd700", third: "#5c0016" },
  secret:   { paper: "#0a0a0c", ink: "#000000", a: "#00ffff", b: "#ffffff", third: "#ff2bd6" },
};

export function rng(seed) {
  let a = 2166136261 >>> 0;
  for (const ch of String(seed)) a = Math.imul(a ^ ch.charCodeAt(0), 16777619);
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const n = (v) => Math.round(v * 100) / 100;

function pat(id, color, size, r, op, angle = 0) {
  return `<pattern id="${id}" width="${size}" height="${size}" patternUnits="userSpaceOnUse" patternTransform="rotate(${angle})">
    <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="${color}" opacity="${op}"/>
  </pattern>`;
}

function hatchPat(id, color, gap = 9, width = 1.6, angle = 38) {
  return `<pattern id="${id}" width="${gap}" height="${gap}" patternUnits="userSpaceOnUse" patternTransform="rotate(${angle})">
    <line x1="0" y1="0" x2="0" y2="${gap}" stroke="${color}" stroke-width="${width}" opacity=".55"/>
  </pattern>`;
}

function grainPat(id, color) {
  const r = rng(id + "grain");
  let dots = "";
  for (let i = 0; i < 16; i++) {
    const x = (r() * 64).toFixed(1), y = (r() * 64).toFixed(1), s = (0.7 + r() * 1.5).toFixed(1);
    dots += `<rect x="${x}" y="${y}" width="${s}" height="${s}" fill="${color}" opacity="${(0.06 + r() * 0.1).toFixed(2)}"/>`;
  }
  return `<pattern id="gr-${id}" width="64" height="64" patternUnits="userSpaceOnUse">${dots}</pattern>`;
}

export function defs(p, id) {
  return `<defs>
    ${pat(`ht-${id}`, p.ink, 7, 1.85, 0.95, 22)}
    ${pat(`ht2-${id}`, p.a, 9, 2.4, 0.85, -18)}
    ${hatchPat(`hx-${id}`, p.ink)}
    ${grainPat(id, p.ink)}
    <radialGradient id="vig-${id}" cx="50%" cy="46%" r="72%">
      <stop offset=".55" stop-color="${p.ink}" stop-opacity="0"/>
      <stop offset="1" stop-color="${p.ink}" stop-opacity=".42"/>
    </radialGradient>
    <linearGradient id="sky-${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${p.a}" stop-opacity=".22"/>
      <stop offset="1" stop-color="${p.b}" stop-opacity=".06"/>
    </linearGradient>
  </defs>`;
}

export function paper(p) {
  return `<rect x="0" y="0" width="${W}" height="${H}" fill="${p.paper}"/>`;
}

export function frame(p) {
  return `<rect x="10" y="10" width="${W - 20}" height="${H - 20}" fill="none" stroke="${p.ink}" stroke-width="9"/>
  <rect x="23" y="23" width="${W - 46}" height="${H - 46}" fill="none" stroke="${p.ink}" stroke-width="1.6" opacity=".55"/>
  <g stroke="${p.ink}" stroke-width="7" opacity=".9">
    <path d="M0 0h44M0 0v44"/><path d="M${W} 0h-44M${W} 0v44"/>
    <path d="M0 ${H}h44M0 ${H}v-44"/><path d="M${W} ${H}h-44M${W} ${H}v-44"/>
  </g>`;
}

export function misreg(p) {
  return `<g opacity=".5">
    <rect x="16" y="4" width="${W - 20}" height="${H - 20}" fill="none" stroke="${p.a}" stroke-width="2"/>
    <rect x="4" y="16" width="${W - 20}" height="${H - 20}" fill="none" stroke="${p.b}" stroke-width="2"/>
  </g>`;
}

export function grain(id, p, seed) {
  return `<rect x="0" y="0" width="${W}" height="${H}" fill="url(#gr-${id})"/>`;
}

export function vignette(id) {
  return `<rect x="0" y="0" width="${W}" height="${H}" fill="url(#vig-${id})"/>`;
}

export function halftone(shapeD, id, color = "ink", op = 0.5) {
  const fill = color === "ink" ? `url(#ht-${id})` : `url(#ht2-${id})`;
  return `<path d="${shapeD}" fill="${fill}" opacity="${op}"/>`;
}

export function hatch(shapeD, id, op = 0.45) {
  return `<path d="${shapeD}" fill="url(#hx-${id})" opacity="${op}"/>`;
}

// Radial ink wedges — impact / focus burst.
export function burst(cx, cy, r1, r2, count, color, op = 1) {
  let out = `<g fill="${color}" opacity="${op}">`;
  for (let i = 0; i < count; i++) {
    const a0 = (i / count) * Math.PI * 2;
    const a1 = a0 + (Math.PI / count) * 0.62;
    out += `<path d="M${n(cx + Math.cos(a0) * r1)} ${n(cy + Math.sin(a0) * r1)}L${n(cx + Math.cos(a1) * r2)} ${n(cy + Math.sin(a1) * r2)}L${n(cx + Math.cos(a1) * r1)} ${n(cy + Math.sin(a1) * r1)}Z"/>`;
  }
  return out + `</g>`;
}

// Long tapered speed streaks radiating from a point.
export function speed(cx, cy, count, inner, outer, color, width = 3, spread = 0.55, op = 0.75) {
  const r = rng(cx + cy + count);
  let out = `<g fill="${color}" opacity="${op}">`;
  for (let i = 0; i < count; i++) {
    const a = -Math.PI / 2 + (r() - 0.5) * Math.PI * 2 * spread;
    const x1 = cx + Math.cos(a) * inner, y1 = cy + Math.sin(a) * inner;
    const x2 = cx + Math.cos(a) * outer, y2 = cy + Math.sin(a) * outer;
    const w = width * (0.4 + r() * 0.9);
    out += `<path d="M${n(x1)} ${n(y1)}L${n(x2)} ${n(y2)}L${n(x2 + w)} ${n(y2 + w * 0.3)}L${n(x1)} ${n(y1)}Z"/>`;
  }
  return out + `</g>`;
}

export function splatter(id, count, color, op = 0.85, region = [0, 0, W, H]) {
  const r = rng(id);
  let out = `<g fill="${color}" opacity="${op}">`;
  for (let i = 0; i < count; i++) {
    const x = region[0] + r() * region[2], y = region[1] + r() * region[3];
    const rad = 3 + r() * 14;
    const pts = [];
    for (let k = 0; k < 7; k++) {
      const a = (k / 7) * Math.PI * 2;
      const rr = rad * (0.55 + r() * 0.7);
      pts.push(`${n(x + Math.cos(a) * rr)} ${n(y + Math.sin(a) * rr)}`);
    }
    out += `<path d="M${pts.join("L")}Z"/>`;
  }
  return out + `</g>`;
}

export function perspectiveFloor(y, color, ink, lines = 16) {
  let out = `<rect x="0" y="${y}" width="${W}" height="${H - y}" fill="${color}"/>`;
  out += `<g stroke="${ink}" stroke-width="2" opacity=".5">`;
  for (let i = 0; i < lines; i++) {
    const x2 = (i / (lines - 1)) * W;
    out += `<line x1="${W / 2}" y1="${y}" x2="${x2}" y2="${H}"/>`;
  }
  for (let i = 1; i < 6; i++) {
    const yy = y + Math.pow(i / 6, 1.9) * (H - y);
    out += `<line x1="0" y1="${n(yy)}" x2="${W}" y2="${n(yy)}"/>`;
  }
  return out + `</g>`;
}

export function audience(y, p, count = 22, scale = 1) {
  const r = rng("aud" + y + count);
  let out = `<g fill="${p.ink}">`;
  for (let i = 0; i < count; i++) {
    const x = (i / (count - 1)) * W + (r() - 0.5) * 26;
    const h = (44 + r() * 54) * scale;
    const w = (26 + r() * 22) * scale;
    out += `<path d="M${n(x - w / 2)} ${y}q${n(w / 2)} ${n(-h)} ${n(w)} 0Z"/>`;
    if (r() > 0.35) out += `<circle cx="${n(x)}" cy="${n(y - h - 7)}" r="${n(6 * scale)}"/>`;
    if (r() > 0.55) out += `<circle cx="${n(x - 6 * scale)}" cy="${n(y - h - 8)}" r="${n(1.9 * scale)}" fill="${p.a}"/><circle cx="${n(x + 6 * scale)}" cy="${n(y - h - 8)}" r="${n(1.9 * scale)}" fill="${p.a}"/>`;
  }
  return out + `</g>`;
}

export function crowdEyes(y, p, count = 26) {
  const r = rng("eyes" + y + count);
  let out = `<g>`;
  for (let i = 0; i < count; i++) {
    const x = (i / (count - 1)) * W + (r() - 0.5) * 20;
    const yy = y + (r() - 0.5) * 80;
    out += `<ellipse cx="${n(x)}" cy="${n(yy)}" rx="7" ry="3.4" fill="${p.a}" opacity=".8"/>`;
    out += `<circle cx="${n(x)}" cy="${n(yy)}" r="1.8" fill="${p.ink}"/>`;
  }
  return out + `</g>`;
}

export function curtains(p, open = 0.24) {
  const lw = W * open, rw = W * open;
  let out = `<g fill="${p.third}" stroke="${p.ink}" stroke-width="3">`;
  out += `<path d="M0 0h${lw}q-30 200 8 400t-6 400H0Z"/>`;
  out += `<path d="M${W} 0h${-rw}q30 200-8 400t6 400h${rw}Z"/>`;
  out += `</g><g stroke="${p.ink}" stroke-width="2" opacity=".45" fill="none">`;
  for (let i = 1; i < 5; i++) {
    out += `<path d="M${(lw / 5) * i} 0q-14 210 6 400t-10 400"/>`;
    out += `<path d="M${W - (rw / 5) * i} 0q14 210-6 400t10 400"/>`;
  }
  return out + `</g>`;
}

export function spotlight(cx, top, bottom, wTop, wBottom, p, op = 0.22) {
  return `<path d="M${n(cx - wTop / 2)} ${top}L${n(cx + wTop / 2)} ${top}L${n(cx + wBottom / 2)} ${bottom}L${n(cx - wBottom / 2)} ${bottom}Z" fill="${p.a}" opacity="${op}"/>
  <ellipse cx="${n(cx)}" cy="${bottom}" rx="${n(wBottom / 2)}" ry="26" fill="${p.a}" opacity="${op * 0.7}"/>`;
}

export function bulb(x, y, p, r = 16) {
  return `<g><line x1="${x}" y1="0" x2="${x}" y2="${y - r}" stroke="${p.ink}" stroke-width="3"/>
  <circle cx="${x}" cy="${y}" r="${r}" fill="${p.a}" stroke="${p.ink}" stroke-width="3"/>
  <circle cx="${x - r * 0.28}" cy="${y - r * 0.28}" r="${r * 0.26}" fill="${p.paper}" opacity=".85"/></g>`;
}

export function ball(x, y, r, p, trail = 0, angle = 0) {
  let out = "";
  if (trail > 0) {
    for (let i = 1; i <= trail; i++) {
      const t = i / trail;
      out += `<circle cx="${n(x - Math.cos(angle) * r * 2.4 * i)}" cy="${n(y - Math.sin(angle) * r * 2.4 * i)}" r="${n(r * (1 - t * 0.55))}" fill="${p.paper}" opacity="${n(0.5 - t * 0.4)}" stroke="${p.ink}" stroke-width="1.4"/>`;
    }
  }
  out += `<circle cx="${x}" cy="${y}" r="${r}" fill="${p.paper}" stroke="${p.ink}" stroke-width="3"/>`;
  out += `<path d="M${n(x - r * 0.9)} ${n(y + r * 0.25)}a${r} ${r} 0 0 1 ${n(r * 1.7)} ${n(-r * 0.5)}a${r} ${r} 0 0 0 ${n(-r * 1.7)} ${n(r * 0.5)}Z" fill="${p.ink}" opacity=".28"/>`;
  out += `<circle cx="${n(x - r * 0.32)}" cy="${n(y - r * 0.36)}" r="${n(r * 0.22)}" fill="${p.paper}"/>`;
  return out;
}

// Atlet — horizontal stick. Always the hero, never a human.
export function paddle(x, y, w, h, p, opts = {}) {
  const { angle = 0, skin = "default", lit = "top", glow = 0 } = opts;
  const cx = x + w / 2, cy = y + h / 2;
  const body = {
    default: { top: "#efd9b0", mid: "#d8b984", low: "#9c7642" },
    glarp: { top: "#9dff86", mid: "#39e04f", low: "#0e6b24" },
    spoon: { top: "#f4f7fa", mid: "#b9c2cc", low: "#6b7480" },
    remote: { top: "#3b4048", mid: "#22262c", low: "#111317" },
    fish: { top: "#e6fbff", mid: "#9fdcf0", low: "#4b8fa6" },
    wand: { top: "#3a1808", mid: "#241005", low: "#120702" },
    broken: { top: "#efd9b0", mid: "#c9a774", low: "#8a6536" },
  }[skin] || { top: "#efd9b0", mid: "#d8b984", low: "#9c7642" };
  let out = `<g transform="translate(${cx} ${cy}) rotate(${angle})">`;
  if (glow) out += `<rect x="${-w / 2 - 8}" y="${-h / 2 - 8}" width="${w + 16}" height="${h + 16}" rx="${h}" fill="${p.a}" opacity="${glow}"/>`;
  out += `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${h / 2}" fill="${body.mid}" stroke="${p.ink}" stroke-width="4"/>`;
  out += `<rect x="${-w / 2 + 3}" y="${-h / 2 + 2}" width="${w - 6}" height="${h * 0.42}" rx="${h * 0.3}" fill="${body.top}"/>`;
  out += `<rect x="${-w / 2 + 5}" y="${h * 0.12}" width="${w - 10}" height="${h * 0.28}" rx="${h * 0.14}" fill="${body.low}" opacity=".85"/>`;
  if (skin === "remote") {
    ["#ff3333", "#39ff14", "#00ffff", "#ffd700"].forEach((c, i) => {
      out += `<circle cx="${-w / 2 + 14 + i * 15}" cy="0" r="4" fill="${c}" stroke="${p.ink}" stroke-width="1"/>`;
    });
  }
  if (skin === "glarp") {
    out += `<path d="M${-w * 0.2} ${h / 2}q10 14 20 0q10 18 20 2" fill="none" stroke="${body.low}" stroke-width="5"/>`;
  }
  if (skin === "broken") {
    out += `<path d="M${-4} ${-h / 2}l10 ${h * 0.32}l-14 ${h * 0.2}l12 ${h * 0.48}" fill="none" stroke="${p.ink}" stroke-width="4"/>`;
  }
  if (skin === "fish") {
    out += `<path d="M${w / 2 - 2} 0l26 -16v32Z" fill="${body.mid}" stroke="${p.ink}" stroke-width="3"/>`;
    out += `<circle cx="${-w / 2 + 16}" cy="-3" r="4" fill="${p.ink}"/>`;
  }
  if (skin === "wand") {
    out += `<circle cx="${w / 2 + 4}" cy="0" r="13" fill="${p.b}" stroke="${p.ink}" stroke-width="3"/>`;
  }
  if (lit === "edge") out += `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="4" fill="${p.paper}" opacity=".7"/>`;
  return out + `</g>`;
}

export function manajer(x, y, scale, p, opts = {}) {
  const { phase = 1, eye = "gold", sway = 0 } = opts;
  return `<g transform="translate(${x} ${y}) scale(${scale}) rotate(${sway})">
    <ellipse cx="0" cy="10" rx="150" ry="190" fill="${p.a}" opacity=".1"/>
    <path d="M-26 -96L-52 -58L-92 150Q-46 176 0 176Q46 176 92 150L52 -58L26 -96Z" fill="${p.ink}" stroke="${p.paper}" stroke-width="3"/>
    <path d="M-42 -64L0 -30L42 -64L30 -96L-30 -96Z" fill="${p.third}" stroke="${p.b}" stroke-width="3"/>
    <path d="M-40 30Q-58 90 -70 150M40 30Q58 90 70 150" fill="none" stroke="${p.b}" stroke-width="2" opacity=".4"/>
    <ellipse cx="0" cy="-118" rx="34" ry="42" fill="${p.ink}" stroke="${p.paper}" stroke-width="3"/>
    <ellipse cx="0" cy="-118" rx="21" ry="13" fill="${p.paper}"/>
    <ellipse cx="0" cy="-118" rx="9" ry="9" fill="${eye === "red" ? p.a : p.b}"/>
    <circle cx="-3" cy="-121" r="3" fill="${p.paper}"/>
    ${phase >= 3 ? `<g fill="${p.a}"><ellipse cx="-46" cy="-150" rx="10" ry="6"/><ellipse cx="46" cy="-150" rx="10" ry="6"/><ellipse cx="-24" cy="-172" rx="8" ry="5"/><ellipse cx="24" cy="-172" rx="8" ry="5"/></g>` : ""}
    ${phase >= 2 ? `<g fill="${p.paper}" stroke="${p.third}" stroke-width="2"><rect x="-104" y="-40" width="30" height="20" transform="rotate(-18 -89 -30)"/><rect x="76" y="-20" width="30" height="20" transform="rotate(14 91 -10)"/><rect x="-118" y="34" width="26" height="18" transform="rotate(8 -105 43)"/></g>` : ""}
  </g>`;
}

export function ledger(x, y, w, h, p, lines = 7) {
  let out = `<g transform="translate(${x} ${y})">
    <rect x="0" y="0" width="${w}" height="${h}" rx="6" fill="${p.paper}" stroke="${p.ink}" stroke-width="5"/>
    <rect x="${w / 2 - 4}" y="0" width="8" height="${h}" fill="${p.third}" opacity=".35"/>
    <g stroke="${p.ink}" stroke-width="2" opacity=".6">`;
  for (let i = 0; i < lines; i++) {
    out += `<line x1="20" y1="${22 + i * (h - 40) / lines}" x2="${w / 2 - 18}" y2="${22 + i * (h - 40) / lines}"/>`;
    out += `<line x1="${w / 2 + 18}" y1="${22 + i * (h - 40) / lines}" x2="${w - 20}" y2="${22 + i * (h - 40) / lines}"/>`;
  }
  return out + `</g></g>`;
}

export function memo(x, y, w, h, rot, p) {
  return `<g transform="translate(${x} ${y}) rotate(${rot})">
    <rect width="${w}" height="${h}" fill="${p.paper}" stroke="${p.ink}" stroke-width="3"/>
    <rect x="8" y="8" width="${w - 16}" height="5" fill="${p.third}" opacity=".5"/>
    <rect x="8" y="${h - 22}" width="${w * 0.45}" height="6" fill="${p.a}" opacity=".7"/>
  </g>`;
}

export function sealStamp(cx, cy, r, p, rot = 0) {
  return `<g transform="translate(${cx} ${cy}) rotate(${rot})" fill="none" stroke="${p.a}" stroke-width="4">
    <circle r="${r}"/><circle r="${r - 8}" stroke-width="2"/>
    <path d="M${-r * 0.5} 0h${r}M0 ${-r * 0.5}v${r}" stroke-width="3" opacity=".8"/>
  </g>`;
}

export function tally(x, y, count, p, step = 22) {
  let out = `<g stroke="${p.ink}" stroke-width="4" opacity=".8">`;
  for (let i = 0; i < count; i++) {
    const gx = x + Math.floor(i / 5) * step * 5, gy = y + (i % 2) * 2;
    const g = i % 5;
    if (g < 4) out += `<line x1="${gx + g * step}" y1="${gy}" x2="${gx + g * step}" y2="${gy + 34}"/>`;
    else out += `<line x1="${gx}" y1="${gy + 26}" x2="${gx + step * 4}" y2="${gy - 6}"/>`;
  }
  return out + `</g>`;
}

export function crownOfEyes(cx, cy, p, count = 4) {
  let out = `<g>`;
  for (let i = 0; i < count; i++) {
    const a = -Math.PI * 0.86 + (i / (count - 1)) * Math.PI * 0.72;
    const x = cx + Math.cos(a) * 92, y = cy + Math.sin(a) * 62;
    out += `<ellipse cx="${n(x)}" cy="${n(y)}" rx="15" ry="9" fill="${p.paper}" stroke="${p.ink}" stroke-width="2.5"/>`;
    out += `<circle cx="${n(x)}" cy="${n(y)}" r="5.5" fill="${p.a}"/>`;
  }
  return out + `</g>`;
}

export function panel({ id, palette, body, extraDefs = "" }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-labelledby="t" data-art-id="${id}">
<title id="t">${id} — Cosmic Circus Loop comic archive panel</title>
${defs(palette, id)}${extraDefs}
${paper(palette)}
${body}
${frame(palette)}
${misreg(palette)}
${grain(id, palette, id)}
${vignette(id)}
</svg>`;
}
