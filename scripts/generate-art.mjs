#!/usr/bin/env node
/**
 * Cosmic Circus Loop - procedural SVG art pack generator.
 *
 * No dependencies. Run from anywhere:
 *   node scripts/generate-art.mjs
 *
 * Art is deterministic. `generatedAt` follows SOURCE_DATE_EPOCH when set,
 * otherwise it is the only non-deterministic byte in the pack.
 */
import { mkdir, writeFile, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ART_ROOT = path.join(ROOT, 'assets', 'art');
const SVG_LIMIT = 8 * 1024;

const P = Object.freeze({
  ink: '#0b0710',
  cardboard: '#b07a45',
  gold: '#ffd700',
  cyan: '#00ffcc',
  magenta: '#ff00ff',
  red: '#ff3333',
  green: '#39ff14',
  bone: '#f6e8c8',
});

const num = (value) => {
  const n = Number(value);
  if (!Number.isFinite(n)) throw new Error(`Non-finite coordinate: ${value}`);
  return String(Math.round(n * 100) / 100);
};

const esc = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const starPath = (cx, cy, r, points = 5, innerRatio = 0.45, rotation = -90) => {
  const coords = [];
  for (let i = 0; i < points * 2; i += 1) {
    const radius = i % 2 === 0 ? r : r * innerRatio;
    const angle = ((rotation + (i * 180) / points) * Math.PI) / 180;
    coords.push(`${num(cx + Math.cos(angle) * radius)} ${num(cy + Math.sin(angle) * radius)}`);
  }
  return `M${coords.join('L')}Z`;
};

const spark = (cx, cy, r, color, opacity = 1) =>
  `<path d="${starPath(cx, cy, r, 4, 0.28)}" fill="${color}" opacity="${opacity}"/>`;

const eye = (cx, cy, rx, ry, iris, pupil = P.ink, sclera = P.bone, glow = false) => `
  <g${glow ? ' filter="url(#glow)"' : ''}>
    <ellipse cx="${num(cx)}" cy="${num(cy)}" rx="${num(rx)}" ry="${num(ry)}" fill="${sclera}"/>
    <ellipse cx="${num(cx)}" cy="${num(cy)}" rx="${num(rx * 0.62)}" ry="${num(ry * 0.62)}" fill="${iris}"/>
    <ellipse cx="${num(cx)}" cy="${num(cy)}" rx="${num(rx * 0.27)}" ry="${num(ry * 0.27)}" fill="${pupil}"/>
    <circle cx="${num(cx - rx * 0.22)}" cy="${num(cy - ry * 0.24)}" r="${num(Math.max(1.2, rx * 0.12))}" fill="#fff" opacity=".9"/>
  </g>`;

const ring = (cx, cy, r, color, width = 2, opacity = 1, dash = '') =>
  `<circle cx="${num(cx)}" cy="${num(cy)}" r="${num(r)}" fill="none" stroke="${color}" stroke-width="${num(width)}" opacity="${num(opacity)}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;

const line = (d, color, width = 2, opacity = 1, cap = 'round') =>
  `<path d="${d}" fill="none" stroke="${color}" stroke-width="${num(width)}" stroke-linecap="${cap}" opacity="${num(opacity)}"/>`;

const iconDefs = ({ primary, secondary, bgA, bgB, extra = '' }) => `<defs>
  <radialGradient id="bg" cx="34%" cy="26%" r="88%">
    <stop offset="0" stop-color="${bgA}"/>
    <stop offset=".58" stop-color="${bgB}"/>
    <stop offset="1" stop-color="${P.ink}"/>
  </radialGradient>
  <linearGradient id="acc" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${primary}"/>
    <stop offset=".55" stop-color="${secondary}"/>
    <stop offset="1" stop-color="${primary}"/>
  </linearGradient>
  <radialGradient id="vig" cx="50%" cy="46%" r="72%">
    <stop offset=".55" stop-color="${P.ink}" stop-opacity="0"/>
    <stop offset="1" stop-color="${P.ink}" stop-opacity=".62"/>
  </radialGradient>
  <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
    <feGaussianBlur stdDeviation="3.2" result="b"/>
    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <filter id="soft" x="-40%" y="-40%" width="180%" height="180%">
    <feGaussianBlur stdDeviation="5"/>
  </filter>
  <pattern id="scan" width="4" height="4" patternUnits="userSpaceOnUse">
    <rect width="4" height="1" y="1" fill="${P.bone}" opacity=".045"/>
  </pattern>
  <clipPath id="clip"><rect x="4" y="4" width="120" height="120" rx="22"/></clipPath>
  ${extra}
</defs>`;

const corners = (color) => `<g stroke="${color}" stroke-width="2" stroke-linecap="round" opacity=".55">
  <path d="M18 12h8M12 18v8M110 12h-8M116 18v8M18 116h8M12 110v-8M110 116h-8M116 110v-8"/>
</g>`;

function icon({ id, title, primary, secondary, bgA = '#241a2e', bgB = '#120c18', border = P.bone, extra = '', body }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128" role="img" aria-labelledby="title" data-art-id="${id}">
<title id="title">${esc(title)}</title>
${iconDefs({ primary, secondary, bgA, bgB, extra })}
<rect x="4" y="4" width="120" height="120" rx="22" fill="url(#bg)" stroke="${border}" stroke-opacity=".72" stroke-width="2"/>
<g clip-path="url(#clip)">
  <rect x="4" y="4" width="120" height="120" fill="url(#scan)"/>
  <circle cx="64" cy="58" r="46" fill="${primary}" opacity=".08" filter="url(#soft)"/>
  ${body}
  <rect x="4" y="4" width="120" height="120" fill="url(#vig)"/>
  <rect x="7" y="7" width="114" height="114" rx="20" fill="none" stroke="${primary}" stroke-width="5" opacity=".22" filter="url(#soft)"/>
  <rect x="9" y="9" width="110" height="110" rx="18" fill="none" stroke="${P.bone}" stroke-opacity=".08" stroke-width="2"/>
</g>
<rect x="10" y="10" width="108" height="108" rx="18" fill="none" stroke="${primary}" stroke-opacity=".2"/>
${corners(primary)}
</svg>`;
}

/* ------------------------------------------------------------------ */
/* Power-ups                                                           */
/* ------------------------------------------------------------------ */

const POWERUPS = [];

POWERUPS.push(
  {
    id: 'P01',
    title: 'P01 Paddle Magnet',
    primary: P.red,
    secondary: P.cyan,
    bgA: '#33121c',
    bgB: '#170b12',
    body: `
      <g filter="url(#glow)">
        <path d="M42 86V52a22 22 0 0 1 44 0v34H70V54a6 6 0 0 0-12 0v32Z" fill="url(#acc)" stroke="${P.bone}" stroke-opacity=".38" stroke-width="2"/>
        <rect x="42" y="82" width="16" height="12" rx="3" fill="${P.cyan}"/>
        <rect x="70" y="82" width="16" height="12" rx="3" fill="${P.cyan}"/>
      </g>
      <path d="M50 54v24M78 54v24" stroke="#fff" stroke-opacity=".45" stroke-width="2" stroke-linecap="round"/>
      <circle cx="64" cy="104" r="7" fill="${P.gold}" filter="url(#glow)"/>
      <path d="M56 97q8-6 16 0M54 90q10-8 20 0" fill="none" stroke="${P.cyan}" stroke-width="2" stroke-linecap="round" opacity=".7"/>
    `,
  },
  {
    id: 'P02',
    title: 'P02 Bola Pelambat',
    primary: P.cyan,
    secondary: '#b8fff2',
    bgA: '#0d2f34',
    bgB: '#0a1820',
    body: `
      <circle cx="64" cy="62" r="33" fill="url(#acc)" opacity=".16"/>
      <circle cx="64" cy="62" r="33" fill="none" stroke="${P.cyan}" stroke-width="2" stroke-dasharray="4 6" opacity=".75"/>
      <g transform="translate(64 62)" stroke="${P.bone}" stroke-width="3" stroke-linecap="round">
        <path d="M0-25V25M0-25l-6 7M0-25l6 7M0-17l-4 5M0-17l4 5M0 25l-6-7M0 25l6-7M0 17l-4-5M0 17l4-5"/>
        <path d="M0-25V25M0-25l-6 7M0-25l6 7M0-17l-4 5M0-17l4 5M0 25l-6-7M0 25l6-7M0 17l-4-5M0 17l4-5" transform="rotate(60)"/>
        <path d="M0-25V25M0-25l-6 7M0-25l6 7M0-17l-4 5M0-17l4 5M0 25l-6-7M0 25l6-7M0 17l-4-5M0 17l4-5" transform="rotate(120)"/>
      </g>
      <circle cx="64" cy="62" r="5" fill="${P.gold}" filter="url(#glow)"/>
      <path d="M24 104q10-8 20 0t20 0" fill="none" stroke="${P.cyan}" stroke-width="2" stroke-linecap="round" opacity=".55"/>
      ${spark(100, 34, 5, P.gold, 0.9)}
    `,
  },
  {
    id: 'P03',
    title: 'P03 Stik Ganda',
    primary: P.gold,
    secondary: P.cyan,
    bgA: '#332a10',
    bgB: '#17130a',
    body: `
      <circle cx="64" cy="44" r="11" fill="${P.gold}" filter="url(#glow)"/>
      <path d="M64 56v12" stroke="${P.cyan}" stroke-width="2" stroke-dasharray="3 4" opacity=".8"/>
      <g filter="url(#glow)">
        <rect x="24" y="76" width="80" height="16" rx="8" fill="url(#acc)" stroke="${P.bone}" stroke-opacity=".4" stroke-width="2"/>
      </g>
      <rect x="32" y="80" width="64" height="4" rx="2" fill="#fff" opacity=".3"/>
      <path d="M30 84H14m0 0 7-7m-7 7 7 7M98 84h16m0 0-7-7m7 7-7 7" fill="none" stroke="${P.gold}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      ${spark(26, 46, 4, P.cyan, 0.8)}
      ${spark(102, 50, 3, P.bone, 0.6)}
    `,
  },
  {
    id: 'P04',
    title: 'P04 Asuransi Nyawa',
    primary: P.green,
    secondary: P.gold,
    bgA: '#143018',
    bgB: '#0d1710',
    body: `
      <path d="M64 108 32 82V34h64v48Z" fill="#1b2a18" stroke="${P.gold}" stroke-width="3" filter="url(#glow)"/>
      <path d="M64 94 44 74V48h40v26Z" fill="none" stroke="${P.bone}" stroke-opacity=".28" stroke-width="2"/>
      <path d="M64 84c-17-10-23-19-18-28 4-8 14-8 18-2 4-6 14-6 18 2 5 9-1 18-18 28Z" fill="${P.green}" stroke="${P.bone}" stroke-opacity=".55" stroke-width="2"/>
      <path d="M64 56v16M56 64h16" stroke="${P.ink}" stroke-width="4" stroke-linecap="round"/>
      ${spark(32, 40, 4, P.gold, 0.8)}
      ${spark(96, 46, 3, P.bone, 0.6)}
    `,
  },
  {
    id: 'P16',
    title: 'P16 Paddle Refleks',
    primary: P.magenta,
    secondary: P.gold,
    bgA: '#30102c',
    bgB: '#170b17',
    body: `
      <g transform="rotate(-16 64 70)" filter="url(#glow)">
        <rect x="30" y="66" width="68" height="14" rx="7" fill="url(#acc)" stroke="${P.bone}" stroke-opacity=".4" stroke-width="2"/>
      </g>
      <path d="M64 32 50 66h10l-4 24 20-30H66l8-28Z" fill="${P.gold}" stroke="${P.bone}" stroke-opacity=".35" stroke-width="1.5" filter="url(#glow)"/>
      <path d="M22 46q7-9 14 0M22 58q7-9 14 0M92 92q7-9 14 0" fill="none" stroke="${P.cyan}" stroke-width="2" stroke-linecap="round" opacity=".65"/>
      ${spark(100, 38, 5, P.cyan, 0.9)}
    `,
  },
  {
    id: 'P17',
    title: 'P17 Bola Bermata',
    primary: P.cyan,
    secondary: P.gold,
    bgA: '#0d2c30',
    bgB: '#0a1719',
    body: `
      <circle cx="64" cy="60" r="34" fill="${P.bone}" stroke="${P.cyan}" stroke-opacity=".65" stroke-width="2" filter="url(#glow)"/>
      <circle cx="64" cy="60" r="22" fill="${P.cyan}" opacity=".9"/>
      <circle cx="64" cy="60" r="11" fill="${P.ink}"/>
      <circle cx="57" cy="52" r="5" fill="#fff" opacity=".9"/>
      <path d="M36 48q10-10 22-9M40 78q10 10 24 8" fill="none" stroke="${P.red}" stroke-width="2" stroke-linecap="round" opacity=".6"/>
      <path d="M44 29q20-8 40 0M30 84q34 20 68 0" fill="none" stroke="${P.gold}" stroke-width="2" opacity=".5"/>
      ${spark(98, 30, 4, P.gold, 0.9)}
      ${spark(28, 94, 3, P.cyan, 0.7)}
    `,
  },
  {
    id: 'P05',
    title: 'P05 Perisai Kardus',
    primary: P.cardboard,
    secondary: P.gold,
    bgA: '#332315',
    bgB: '#181008',
    body: `
      <path d="M64 108 32 82V34h64v48Z" fill="${P.cardboard}" stroke="${P.gold}" stroke-width="3" filter="url(#glow)"/>
      <path d="M44 40v42M56 36v50M68 36v50M80 40v42" stroke="#6b3f14" stroke-width="2" opacity=".7"/>
      <path d="M36 52h56M36 70h56" stroke="${P.bone}" stroke-opacity=".28" stroke-width="2"/>
      <path d="M48 36 64 52 80 36" fill="none" stroke="${P.bone}" stroke-opacity=".55" stroke-width="6" stroke-linecap="square"/>
      <path d="M64 52v44" stroke="${P.bone}" stroke-opacity=".45" stroke-width="6" stroke-linecap="square"/>
      <circle cx="40" cy="42" r="3" fill="${P.gold}"/><circle cx="88" cy="42" r="3" fill="${P.gold}"/>
      <circle cx="40" cy="82" r="3" fill="${P.gold}"/><circle cx="88" cy="82" r="3" fill="${P.gold}"/>
    `,
  },
  {
    id: 'P06',
    title: 'P06 Bola Hantu',
    primary: P.cyan,
    secondary: '#8effe9',
    bgA: '#0b2630',
    bgB: '#0a141c',
    body: `
      <g filter="url(#glow)">
        <path d="M64 26c-19 0-31 15-31 33v40l8-7 8 7 7-7 8 7 8-7 8 7 8-7 7 7V59c0-18-12-33-31-33Z" fill="url(#acc)" opacity=".55" stroke="${P.cyan}" stroke-width="2"/>
      </g>
      <circle cx="53" cy="58" r="5" fill="${P.ink}"/><circle cx="75" cy="58" r="5" fill="${P.ink}"/>
      <path d="M59 71q5 5 10 0" fill="none" stroke="${P.ink}" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="64" cy="60" r="25" fill="none" stroke="${P.bone}" stroke-opacity=".22" stroke-width="2" stroke-dasharray="4 5"/>
      ${spark(30, 34, 4, P.cyan, 0.8)}
      ${spark(98, 82, 3, P.bone, 0.6)}
    `,
  },
  {
    id: 'P07',
    title: 'P07 Kontrol Sempurna',
    primary: P.magenta,
    secondary: P.cyan,
    bgA: '#2b102f',
    bgB: '#150b19',
    body: `
      <circle cx="64" cy="64" r="35" fill="none" stroke="${P.cyan}" stroke-width="2" opacity=".8"/>
      <circle cx="64" cy="64" r="21" fill="none" stroke="${P.magenta}" stroke-width="2" stroke-dasharray="5 5" opacity=".9"/>
      <path d="M64 20v18M64 90v18M20 64h18M90 64h18" stroke="${P.bone}" stroke-width="4" stroke-linecap="round"/>
      <path d="M34 34l10 10M84 84l10 10M94 34 84 44M44 84 34 94" stroke="${P.gold}" stroke-width="2" stroke-linecap="round"/>
      <circle cx="64" cy="64" r="7" fill="${P.gold}" filter="url(#glow)"/>
      <circle cx="64" cy="64" r="3" fill="${P.ink}"/>
      ${spark(102, 28, 4, P.cyan, 0.8)}
    `,
  },
  {
    id: 'P08',
    title: 'P08 Appeal Booster',
    primary: P.gold,
    secondary: P.green,
    bgA: '#2f2a0d',
    bgB: '#161508',
    body: `
      <path d="M64 24 98 62H79v24H49V62H30Z" fill="url(#acc)" stroke="${P.bone}" stroke-opacity=".45" stroke-width="2" filter="url(#glow)"/>
      <path d="M64 40v34" stroke="${P.ink}" stroke-opacity=".25" stroke-width="2"/>
      <path d="M42 88l22 17 22-17M48 101l16 11 16-11" fill="none" stroke="${P.gold}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      ${spark(32, 44, 6, P.green, 0.9)}
      ${spark(96, 44, 6, P.green, 0.9)}
      ${spark(64, 18, 4, P.bone, 0.7)}
    `,
  },
);

POWERUPS.push(
  {
    id: 'P19',
    title: 'P19 Medan Anti-Siksaan',
    primary: P.cyan,
    secondary: P.gold,
    bgA: '#0b2c2a',
    bgB: '#0a1718',
    body: `
      <path d="M64 22 99 39v29c0 23-17 36-35 42-18-6-35-19-35-42V39Z" fill="#0b2422" stroke="${P.cyan}" stroke-width="3" filter="url(#glow)"/>
      <path d="M64 35 87 46v22c0 16-11 26-23 31-12-5-23-15-23-31V46Z" fill="none" stroke="${P.gold}" stroke-width="2" stroke-dasharray="3 5" opacity=".8"/>
      <path d="M50 50l28 28M78 50 50 78" stroke="${P.red}" stroke-width="5" stroke-linecap="round"/>
      <circle cx="64" cy="64" r="8" fill="${P.gold}" filter="url(#glow)"/>
      <path d="M20 64a44 44 0 0 1 88 0" fill="none" stroke="${P.magenta}" stroke-width="2" stroke-dasharray="2 7" opacity=".55"/>
      ${spark(28, 96, 4, P.cyan, 0.8)}
    `,
  },
  {
    id: 'P20',
    title: 'P20 Doa pada Manajer',
    primary: P.gold,
    secondary: P.bone,
    bgA: '#30260f',
    bgB: '#171208',
    body: `
      <circle cx="64" cy="40" r="27" fill="none" stroke="${P.gold}" stroke-width="2" stroke-dasharray="3 6" opacity=".55"/>
      <path d="M62 30c-12 12-20 26-20 40 0 9 7 15 15 15h5V30Z" fill="${P.bone}"/>
      <path d="M66 30c12 12 20 26 20 40 0 9-7 15-15 15h-5V30Z" fill="#d9c8a6"/>
      <path d="M42 84 34 104h22l8-20ZM86 84l8 20H72l-8-20Z" fill="${P.gold}" stroke="${P.bone}" stroke-opacity=".3"/>
      <path d="M64 34v46M50 46q7 12 7 24M78 46q-7 12-7 24" fill="none" stroke="${P.ink}" stroke-opacity=".25" stroke-width="2" stroke-linecap="round"/>
      ${spark(30, 28, 4, P.bone, 0.8)}
      ${spark(98, 30, 4, P.gold, 0.9)}
    `,
  },
  {
    id: 'P23',
    title: 'P23 Lompat Fase',
    primary: P.magenta,
    secondary: P.cyan,
    bgA: '#2c1030',
    bgB: '#150b19',
    body: `
      <path d="M24 100h24V80h24V60h24V40h14" fill="none" stroke="${P.cyan}" stroke-width="5" stroke-linecap="square" stroke-linejoin="round" opacity=".25" filter="url(#soft)"/>
      <path d="M24 100h24V80h24V60h24V40h14" fill="none" stroke="${P.cyan}" stroke-width="3" stroke-linecap="square" stroke-linejoin="round"/>
      <path d="M30 70q20-18 48-32" fill="none" stroke="${P.gold}" stroke-width="2" stroke-dasharray="4 5"/>
      <circle cx="30" cy="70" r="5" fill="${P.gold}"/>
      <path d="M94 28l14 4-6 13Z" fill="${P.magenta}" filter="url(#glow)"/>
      <circle cx="100" cy="40" r="3" fill="${P.bone}"/>
      <path d="M24 106h80" stroke="${P.bone}" stroke-opacity=".2" stroke-width="2"/>
    `,
  },
  {
    id: 'P24',
    title: 'P24 Mundur Sejenak',
    primary: P.cyan,
    secondary: P.magenta,
    bgA: '#0d2a33',
    bgB: '#0a151b',
    body: `
      <circle cx="64" cy="64" r="38" fill="none" stroke="${P.cyan}" stroke-width="6" stroke-dasharray="178 62" transform="rotate(-58 64 64)" filter="url(#glow)"/>
      <path d="M64 18 48 26l16 10Z" fill="${P.gold}" filter="url(#glow)"/>
      <circle cx="64" cy="64" r="23" fill="none" stroke="${P.bone}" stroke-opacity=".22" stroke-width="2"/>
      <path d="M64 46v19l13 8" fill="none" stroke="${P.magenta}" stroke-width="3" stroke-linecap="round"/>
      <circle cx="64" cy="64" r="4" fill="${P.gold}"/>
      <path d="M64 34v-5M94 64h5M64 94v5M34 64h-5" stroke="${P.bone}" stroke-width="2" opacity=".6"/>
    `,
  },
  {
    id: 'P26',
    title: 'P26 Paddle Acak',
    primary: P.green,
    secondary: P.cyan,
    bgA: '#123018',
    bgB: '#0b1710',
    body: `
      <g filter="url(#glow)">
        <path d="M36 78c-9-14 2-27 13-29 2-12 18-16 27-6 13-2 21 9 16 19 9 10 2 23-9 25-4 10-19 10-25 2-12 4-21-3-22-11Z" fill="url(#acc)" stroke="${P.bone}" stroke-opacity=".45" stroke-width="2"/>
      </g>
      <path d="M44 74c0-10 8-17 17-17M46 84c10 5 24 4 32-3" fill="none" stroke="${P.ink}" stroke-opacity=".3" stroke-width="2" stroke-linecap="round"/>
      <path d="M64 40V28M100 90l9 9M28 90l-9 9" stroke="${P.cyan}" stroke-width="2" stroke-dasharray="3 4" opacity=".7"/>
      <circle cx="64" cy="22" r="4" fill="${P.green}"/><circle cx="112" cy="102" r="4" fill="${P.green}"/><circle cx="16" cy="102" r="4" fill="${P.green}"/>
      ${spark(100, 36, 4, P.gold, 0.8)}
    `,
  },
  {
    id: 'P30',
    title: 'P30 Dadu Kosmik',
    primary: P.gold,
    secondary: P.magenta,
    bgA: '#2c2310',
    bgB: '#160f16',
    body: `
      <g transform="translate(64 66)">
        <path d="M0-36 32-19 0-2-32-19Z" fill="#2b1c3c" stroke="${P.gold}" stroke-width="2"/>
        <path d="M-32-19 0-2v36l-32-17Z" fill="#1a1028" stroke="${P.gold}" stroke-width="2"/>
        <path d="M32-19 0-2v36l32-17Z" fill="#3a2050" stroke="${P.gold}" stroke-width="2"/>
        <circle cx="0" cy="-19" r="4" fill="${P.cyan}"/><circle cx="-10" cy="-24" r="3" fill="${P.cyan}"/><circle cx="10" cy="-14" r="3" fill="${P.cyan}"/>
        <circle cx="-16" cy="4" r="4" fill="${P.magenta}"/><circle cx="-16" cy="18" r="4" fill="${P.magenta}"/>
        <circle cx="16" cy="8" r="4" fill="${P.gold}"/>
      </g>
      <path d="M22 58a46 46 0 0 1 84-4" fill="none" stroke="${P.cyan}" stroke-width="2" stroke-dasharray="3 6" opacity=".5"/>
      ${spark(28, 32, 5, P.cyan, 0.9)}
      ${spark(102, 96, 4, P.magenta, 0.8)}
    `,
  },
  {
    id: 'P09',
    title: 'P09 Super Glue',
    primary: P.gold,
    secondary: P.green,
    bgA: '#2f2a0e',
    bgB: '#171408',
    body: `
      <g filter="url(#glow)">
        <path d="M64 22c0 0-27 31-27 47a27 27 0 0 0 54 0c0-16-27-47-27-47Z" fill="url(#acc)" stroke="${P.bone}" stroke-opacity=".45" stroke-width="2"/>
      </g>
      <path d="M50 61c0-8 6-16 11-21" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="3" stroke-linecap="round"/>
      <circle cx="64" cy="76" r="9" fill="${P.gold}" opacity=".85"/>
      <path d="M64 96v15" stroke="${P.green}" stroke-width="5" stroke-linecap="round"/>
      <circle cx="64" cy="116" r="4" fill="${P.green}"/>
      <path d="M34 104H22M94 104h12" stroke="${P.gold}" stroke-width="2" stroke-linecap="round" opacity=".7"/>
      ${spark(98, 38, 4, P.cyan, 0.8)}
    `,
  },
  {
    id: 'P10',
    title: 'P10 Penonton Terpesona',
    primary: P.magenta,
    secondary: P.cyan,
    bgA: '#30102f',
    bgB: '#170b1a',
    body: `
      <path d="M20 64q44-40 88 0-44 40-88 0Z" fill="#1b0d22" stroke="${P.magenta}" stroke-width="3" filter="url(#glow)"/>
      <path d="M64 46a18 18 0 1 1-18 18 13 13 0 0 0 26 0 9 9 0 0 0-18 0 5 5 0 0 0 10 0 2 2 0 0 0-4 0" fill="none" stroke="${P.cyan}" stroke-width="3" stroke-linecap="round"/>
      <circle cx="64" cy="64" r="4" fill="${P.gold}"/>
      <path d="M28 34l9 9M100 34l-9 9M28 94l9-9M100 94l-9-9" stroke="${P.gold}" stroke-width="2" stroke-linecap="round"/>
      ${spark(100, 24, 4, P.cyan, 0.8)}
    `,
  },
  {
    id: 'P11',
    title: 'P11 Bola Bayangan',
    primary: '#8a2be2',
    secondary: P.magenta,
    bgA: '#25102e',
    bgB: '#120a18',
    body: `
      <circle cx="48" cy="50" r="20" fill="#241032" opacity=".7"/>
      <circle cx="58" cy="59" r="23" fill="#1a0b24" opacity=".9" stroke="${P.magenta}" stroke-opacity=".4" stroke-width="2"/>
      <circle cx="70" cy="69" r="26" fill="#000" stroke="${P.magenta}" stroke-width="2" filter="url(#glow)"/>
      <circle cx="70" cy="69" r="9" fill="${P.magenta}" opacity=".85"/>
      <path d="M82 47a26 26 0 0 1 10 22" fill="none" stroke="${P.cyan}" stroke-width="2" stroke-dasharray="3 5"/>
      <path d="M28 96q22 10 44 0" fill="none" stroke="${P.magenta}" stroke-width="3" stroke-linecap="round" opacity=".35"/>
      ${spark(102, 34, 4, P.cyan, 0.8)}
    `,
  },
  {
    id: 'P12',
    title: 'P12 Zona Nyaman',
    primary: P.gold,
    secondary: P.cardboard,
    bgA: '#332415',
    bgB: '#181008',
    body: `
      <path d="M28 54 64 36l36 18v46H28Z" fill="#6b3f14" stroke="${P.gold}" stroke-width="2"/>
      <path d="M28 54h72v10H28Z" fill="${P.cardboard}"/>
      <path d="M64 36v64M36 64h56" stroke="#8a5a2b" stroke-width="2" opacity=".8"/>
      <path d="M36 66h56v26H36Z" fill="#2a1830" stroke="${P.bone}" stroke-opacity=".25"/>
      <path d="M44 90q0-15 20-15t20 15" fill="${P.gold}" opacity=".25"/>
      <rect x="52" y="68" width="24" height="12" rx="6" fill="${P.gold}" opacity=".8"/>
      <path d="M18 94a46 46 0 0 1 92 0" fill="none" stroke="${P.cyan}" stroke-width="2" stroke-dasharray="4 6" opacity=".7"/>
      ${spark(98, 40, 4, P.cyan, 0.8)}
    `,
  },
);

POWERUPS.push(
  {
    id: 'P18',
    title: 'P18 Stik Es Krim Ganda',
    primary: P.cyan,
    secondary: P.gold,
    bgA: '#0d2d31',
    bgB: '#0a1619',
    body: `
      <g transform="rotate(-8 64 64)" filter="url(#glow)">
        <rect x="24" y="48" width="80" height="12" rx="6" fill="${P.cyan}" stroke="${P.bone}" stroke-opacity=".35"/>
        <rect x="24" y="78" width="80" height="12" rx="6" fill="${P.gold}" stroke="${P.bone}" stroke-opacity=".35"/>
      </g>
      <circle cx="64" cy="69" r="8" fill="${P.magenta}" filter="url(#glow)"/>
      <path d="M32 36V26M96 36V26M32 102v10M96 102v10" stroke="${P.bone}" stroke-width="2" stroke-linecap="round" opacity=".5"/>
      ${spark(26, 64, 4, P.gold, 0.8)}
      ${spark(102, 64, 4, P.cyan, 0.8)}
    `,
  },
  {
    id: 'P21',
    title: 'P21 Slow-Motion',
    primary: P.cyan,
    secondary: P.gold,
    bgA: '#0d2a30',
    bgB: '#0a151a',
    body: `
      <circle cx="64" cy="62" r="35" fill="#101a22" stroke="${P.gold}" stroke-width="2" filter="url(#glow)"/>
      <circle cx="64" cy="62" r="28" fill="none" stroke="${P.cyan}" stroke-width="1.5" stroke-dasharray="3 5" opacity=".7"/>
      <path d="M64 38v24l15 9" fill="none" stroke="${P.bone}" stroke-width="3" stroke-linecap="round"/>
      <path d="M64 62c9 8 7 21-3 29-9 7-21 1-19-10 2-9 11-11 17-5" fill="none" stroke="${P.magenta}" stroke-width="3" stroke-linecap="round"/>
      <path d="M64 32v-6M94 62h6M64 92v6M34 62h-6" stroke="${P.gold}" stroke-width="2" stroke-linecap="round"/>
      <path d="M26 100q14 8 28 0" fill="none" stroke="${P.cyan}" stroke-width="2" stroke-dasharray="3 4" opacity=".6"/>
      ${spark(98, 30, 4, P.cyan, 0.8)}
    `,
  },
  {
    id: 'P22',
    title: 'P22 Portal Lipat',
    primary: P.magenta,
    secondary: P.cyan,
    bgA: '#2d1033',
    bgB: '#150b1b',
    body: `
      <g transform="rotate(-18 64 64)">
        <ellipse cx="64" cy="64" rx="42" ry="23" fill="none" stroke="${P.magenta}" stroke-width="3" filter="url(#glow)"/>
        <ellipse cx="64" cy="64" rx="31" ry="16" fill="none" stroke="${P.cyan}" stroke-width="2"/>
        <ellipse cx="64" cy="64" rx="20" ry="9" fill="none" stroke="${P.gold}" stroke-width="2" stroke-dasharray="3 4"/>
      </g>
      <circle cx="64" cy="64" r="7" fill="${P.bone}" filter="url(#glow)"/>
      <circle cx="40" cy="46" r="3" fill="${P.cyan}"/><circle cx="90" cy="82" r="2.5" fill="${P.magenta}"/>
      ${spark(96, 34, 5, P.gold, 0.9)}
      ${spark(28, 92, 4, P.cyan, 0.8)}
    `,
  },
  {
    id: 'P27',
    title: 'P27 Tiga Warna',
    primary: P.cyan,
    secondary: P.magenta,
    bgA: '#131c32',
    bgB: '#0b101c',
    body: `
      <circle cx="64" cy="42" r="15" fill="${P.cyan}" stroke="${P.bone}" stroke-opacity=".4" stroke-width="2" filter="url(#glow)"/>
      <circle cx="42" cy="80" r="15" fill="${P.magenta}" stroke="${P.bone}" stroke-opacity=".35" stroke-width="2" filter="url(#glow)"/>
      <circle cx="86" cy="80" r="15" fill="${P.gold}" stroke="${P.bone}" stroke-opacity=".35" stroke-width="2" filter="url(#glow)"/>
      <path d="M56 50 48 68M72 50l8 18M52 88h24" fill="none" stroke="${P.bone}" stroke-width="2" stroke-dasharray="3 5" opacity=".35"/>
      <circle cx="59" cy="37" r="4" fill="#fff" opacity=".7"/><circle cx="37" cy="75" r="4" fill="#fff" opacity=".6"/><circle cx="81" cy="75" r="4" fill="#fff" opacity=".6"/>
      ${spark(102, 38, 4, P.cyan, 0.7)}
    `,
  },
  {
    id: 'P28',
    title: 'P28 Tukar Posisi',
    primary: P.green,
    secondary: P.magenta,
    bgA: '#12301b',
    bgB: '#0b1710',
    body: `
      <path d="M24 46h52a18 18 0 0 1 0 36H60" fill="none" stroke="${P.cyan}" stroke-width="5" stroke-linecap="round" filter="url(#glow)"/>
      <path d="M96 82H44a18 18 0 0 1 0-36h12" fill="none" stroke="${P.magenta}" stroke-width="5" stroke-linecap="round" filter="url(#glow)"/>
      <path d="M60 34l-12 12 12 12M68 70l12 12-12 12" fill="none" stroke="${P.gold}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="24" cy="46" r="8" fill="${P.gold}" stroke="${P.bone}" stroke-opacity=".4"/>
      <rect x="84" y="74" width="22" height="9" rx="4.5" fill="${P.green}" stroke="${P.bone}" stroke-opacity=".35"/>
      ${spark(96, 32, 4, P.cyan, 0.8)}
    `,
  },
  {
    id: 'P13',
    title: 'P13 Kudeta',
    primary: P.gold,
    secondary: P.red,
    bgA: '#301b10',
    bgB: '#170d0a',
    body: `
      <g transform="rotate(-8 64 64)">
        <path d="M32 82 40 36l18 18 12-26 12 26 18-18 8 46Z" fill="url(#acc)" stroke="${P.bone}" stroke-opacity=".5" stroke-width="2" filter="url(#glow)"/>
        <rect x="32" y="82" width="64" height="12" rx="4" fill="${P.red}"/>
        <circle cx="64" cy="56" r="4" fill="${P.cyan}"/><circle cx="46" cy="62" r="3" fill="${P.cyan}"/><circle cx="82" cy="62" r="3" fill="${P.cyan}"/>
      </g>
      <path d="M36 98l-10 12M92 98l10 12" stroke="${P.red}" stroke-width="4" stroke-linecap="round" opacity=".8"/>
      <path d="M28 108h8M92 108h8" stroke="${P.gold}" stroke-width="3" stroke-linecap="round"/>
      ${spark(102, 30, 4, P.cyan, 0.8)}
    `,
  },
  {
    id: 'P14',
    title: 'P14 Bola Abadi',
    primary: P.gold,
    secondary: P.red,
    bgA: '#32140d',
    bgB: '#180b09',
    body: `
      <circle cx="64" cy="64" r="31" fill="#2a0b0b" stroke="${P.gold}" stroke-width="2" filter="url(#glow)"/>
      <path d="M64 34c-10 10-8 18 0 26 8-8 10-16 0-26Z" fill="${P.gold}"/>
      <path d="M64 58c-18-14-30-8-34 4 12 2 20 8 26 16Z" fill="${P.red}" opacity=".9"/>
      <path d="M64 58c18-14 30-8 34 4-12 2-20 8-26 16Z" fill="${P.red}" opacity=".9"/>
      <path d="M64 50v22" stroke="${P.bone}" stroke-width="2" stroke-linecap="round"/>
      <circle cx="64" cy="46" r="5" fill="${P.bone}"/>
      <circle cx="64" cy="64" r="40" fill="none" stroke="${P.gold}" stroke-width="2" stroke-dasharray="2 7" opacity=".45"/>
      ${spark(98, 30, 4, P.cyan, 0.8)}
      ${spark(30, 98, 3, P.gold, 0.8)}
    `,
  },
  {
    id: 'P15',
    title: 'P15 Appeal Tsunami',
    primary: P.cyan,
    secondary: '#0a6f8a',
    bgA: '#0b2c35',
    bgB: '#09151b',
    body: `
      <path d="M18 92c20 0 23-11 25-25 2-17 19-29 38-24 15 4 23 17 23 31v18Z" fill="url(#acc)" stroke="${P.bone}" stroke-opacity=".45" stroke-width="2" filter="url(#glow)"/>
      <path d="M44 70c9-2 13-8 15-17M60 52c6-4 13-5 19-2" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="3" stroke-linecap="round"/>
      <path d="M24 96h76" stroke="${P.gold}" stroke-width="3" stroke-linecap="round"/>
      <path d="${starPath(84, 34, 8, 5)}" fill="${P.gold}" filter="url(#glow)"/>
      <path d="${starPath(48, 30, 5, 5)}" fill="${P.gold}" opacity=".85"/>
      <path d="M32 30l4 8 8 4-8 4-4 8-4-8-8-4 8-4Z" fill="${P.bone}" opacity=".5"/>
    `,
  },
  {
    id: 'P25',
    title: 'P25 Cermin Dimensi',
    primary: P.cyan,
    secondary: P.bone,
    bgA: '#0d2b32',
    bgB: '#0a151a',
    body: `
      <path d="M34 24h26v80H34Z" fill="#163a3a" stroke="${P.cyan}" stroke-width="2"/>
      <path d="M68 21h26v80H68Z" fill="#2a1830" stroke="${P.cyan}" stroke-width="2" transform="translate(3 -2) rotate(2 81 61)"/>
      <path d="M60 24l-4 18 8 8-6 18 4 16 6 18" fill="none" stroke="${P.bone}" stroke-width="2" stroke-linecap="round"/>
      <path d="M44 40v44M82 42v42" stroke="${P.bone}" stroke-opacity=".25" stroke-width="2"/>
      <circle cx="84" cy="56" r="9" fill="${P.magenta}" opacity=".55" filter="url(#glow)"/>
      <path d="M24 108h80" stroke="${P.gold}" stroke-width="2" opacity=".6"/>
      ${spark(102, 28, 4, P.gold, 0.8)}
    `,
  },
  {
    id: 'P29',
    title: 'P29 Acak Total',
    primary: P.magenta,
    secondary: P.cyan,
    bgA: '#2d1030',
    bgB: '#150b18',
    body: `
      <path d="M64 16l8 22 20-12-6 24 24 4-18 16 18 16-24 4 6 24-20-12-8 22-8-22-20 12 6-24-24-4 18-16-18-16 24-4-6-24 20 12Z" fill="url(#acc)" stroke="${P.bone}" stroke-opacity=".5" stroke-width="1.5" filter="url(#glow)"/>
      <circle cx="64" cy="64" r="19" fill="${P.ink}" stroke="${P.gold}" stroke-width="2"/>
      <circle cx="64" cy="64" r="7" fill="${P.cyan}"/>
      <circle cx="44" cy="40" r="3" fill="${P.magenta}"/><circle cx="84" cy="84" r="3" fill="${P.green}"/><circle cx="88" cy="40" r="2.5" fill="${P.gold}"/>
      ${spark(28, 88, 3, P.cyan, 0.8)}
    `,
  },
);

/* ------------------------------------------------------------------ */
/* Illegal cards                                                       */
/* ------------------------------------------------------------------ */

const HAZARD_DEFS = `<pattern id="hazard" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
  <rect width="6" height="12" fill="${P.red}" opacity=".55"/>
</pattern>`;

const hazardStrip = (y, opacity = 0.5) =>
  `<rect x="4" y="${y}" width="120" height="7" fill="url(#hazard)" opacity="${opacity}"/>`;

const ILLEGAL = [
  {
    id: 'I01',
    title: 'I01 Skip Fase',
    primary: P.red,
    secondary: '#ff8a8a',
    bgA: '#360d12',
    bgB: '#18080b',
    border: '#ff9a9a',
    extra: HAZARD_DEFS,
    body: `
      ${hazardStrip(8, 0.45)}
      <rect x="20" y="38" width="20" height="10" rx="3" fill="#3a0a0a" stroke="${P.red}" stroke-width="2"/>
      <rect x="20" y="54" width="32" height="10" rx="3" fill="#3a0a0a" stroke="${P.red}" stroke-width="2" opacity=".7"/>
      <rect x="20" y="70" width="14" height="10" rx="3" fill="#3a0a0a" stroke="${P.red}" stroke-width="2" opacity=".45"/>
      <path d="M52 34 80 64 52 94Z" fill="${P.red}" filter="url(#glow)"/>
      <path d="M76 34 104 64 76 94Z" fill="#ff8a8a" filter="url(#glow)"/>
      <path d="M32 92 90 34" stroke="${P.bone}" stroke-width="2" stroke-dasharray="4 5" opacity=".45"/>
      ${hazardStrip(113, 0.45)}
    `,
  },
  {
    id: 'I02',
    title: 'I02 Realitas Ambil',
    primary: P.red,
    secondary: P.cyan,
    bgA: '#320c18',
    bgB: '#16080d',
    border: '#ff9a9a',
    extra: HAZARD_DEFS,
    body: `
      ${hazardStrip(8, 0.4)}
      <circle cx="64" cy="64" r="34" fill="#000" stroke="${P.red}" stroke-width="3" filter="url(#glow)"/>
      <path d="M64 34a30 30 0 0 1 30 30M64 94a30 30 0 0 1-30-30" fill="none" stroke="#ff8a8a" stroke-width="2" opacity=".65"/>
      <path d="M64 40a24 24 0 1 0 20 36" fill="none" stroke="${P.magenta}" stroke-width="2" stroke-dasharray="4 5"/>
      <circle cx="44" cy="44" r="8" fill="${P.cyan}" opacity=".75"/>
      <circle cx="82" cy="48" r="6" fill="${P.gold}" opacity=".7"/>
      <circle cx="66" cy="86" r="9" fill="${P.magenta}" opacity=".65"/>
      <circle cx="102" cy="98" r="5" fill="${P.cyan}" filter="url(#glow)"/>
      <path d="M96 92q8-8 14 0" fill="none" stroke="${P.cyan}" stroke-width="2" stroke-linecap="round"/>
      ${hazardStrip(113, 0.4)}
    `,
  },
  {
    id: 'I03',
    title: 'I03 Penonton Diam',
    primary: P.red,
    secondary: '#ff8a8a',
    bgA: '#300d10',
    bgB: '#16080a',
    border: '#ff9a9a',
    extra: HAZARD_DEFS,
    body: `
      ${hazardStrip(8, 0.4)}
      <path d="M28 52q36-24 72 0v26q-36 24-72 0Z" fill="#1c0b0d" stroke="${P.red}" stroke-width="2"/>
      <path d="M40 65h48" stroke="${P.bone}" stroke-width="4" stroke-linecap="round" opacity=".65"/>
      <path d="M44 56l40 18M84 56 44 74" stroke="${P.red}" stroke-width="6" stroke-linecap="round" filter="url(#glow)"/>
      <path d="M18 42q-9 22 0 44M110 42q9 22 0 44" fill="none" stroke="${P.red}" stroke-width="2" stroke-dasharray="4 5" opacity=".6"/>
      <path d="M14 34 114 94" stroke="${P.bone}" stroke-width="2" opacity=".3"/>
      ${hazardStrip(113, 0.4)}
    `,
  },
  {
    id: 'I04',
    title: 'I04 Fusi Paksa',
    primary: P.gold,
    secondary: P.red,
    bgA: '#34280b',
    bgB: '#191307',
    border: '#ffe066',
    extra: HAZARD_DEFS,
    body: `
      ${hazardStrip(8, 0.28)}
      <circle cx="64" cy="64" r="33" fill="#2a1b00" stroke="${P.gold}" stroke-width="3" filter="url(#glow)"/>
      <circle cx="52" cy="58" r="13" fill="${P.cyan}" stroke="${P.bone}" stroke-opacity=".4"/>
      <circle cx="78" cy="70" r="13" fill="${P.magenta}" stroke="${P.bone}" stroke-opacity=".4"/>
      <path d="M52 58 78 70" stroke="${P.bone}" stroke-width="2" stroke-dasharray="3 4"/>
      <path d="M64 22v10M64 96v10M22 64h10M96 64h10M34 34l8 8M86 86l8 8M94 34l-8 8M42 86l-8 8" stroke="${P.gold}" stroke-width="2" stroke-linecap="round"/>
      <circle cx="64" cy="64" r="6" fill="${P.gold}" filter="url(#glow)"/>
      ${spark(28, 90, 4, P.red, 0.8)}
      ${hazardStrip(113, 0.28)}
    `,
  },
  {
    id: 'I05',
    title: 'I05 Paradoks Kosmik',
    primary: P.red,
    secondary: P.cyan,
    bgA: '#2d0c1a',
    bgB: '#140a12',
    border: '#ff9a9a',
    extra: HAZARD_DEFS,
    body: `
      ${hazardStrip(8, 0.4)}
      <path d="M28 64c0-20 16-36 36-36s36 16 36 36-16 36-36 36" fill="none" stroke="${P.red}" stroke-width="4" filter="url(#glow)"/>
      <path d="M100 64c0 20-16 36-36 36S28 84 28 64" fill="none" stroke="${P.cyan}" stroke-width="4" filter="url(#glow)"/>
      <circle cx="44" cy="64" r="10" fill="${P.cyan}" stroke="${P.bone}" stroke-opacity=".35"/>
      <circle cx="84" cy="64" r="10" fill="${P.red}" stroke="${P.bone}" stroke-opacity=".35"/>
      <path d="M54 64h20" stroke="${P.bone}" stroke-width="2" stroke-dasharray="3 4"/>
      <path d="M64 30v8M64 90v8M34 36l6 6M94 36l-6 6" stroke="${P.gold}" stroke-width="2" stroke-linecap="round"/>
      ${hazardStrip(113, 0.4)}
    `,
  },
];

/* ------------------------------------------------------------------ */
/* Fate cards                                                          */
/* ------------------------------------------------------------------ */

const fateCard = (inner) => `
  <path d="M28 108V56a36 36 0 0 1 72 0v52Z" fill="#081c20" stroke="${P.cyan}" stroke-width="2"/>
  <path d="M34 106V57a30 30 0 0 1 60 0v49Z" fill="none" stroke="${P.gold}" stroke-width="1.5" stroke-dasharray="3 5" opacity=".7"/>
  <path d="${starPath(64, 19, 7, 5)}" fill="${P.gold}"/>
  ${inner}
  <circle cx="37" cy="96" r="2" fill="${P.cyan}"/>
  <circle cx="91" cy="96" r="2" fill="${P.gold}"/>
`;

const FATE = [
  {
    id: 'C01',
    title: 'C01 Mutilasi Deck',
    primary: P.cyan,
    secondary: P.gold,
    bgA: '#0d2e33',
    bgB: '#0a171b',
    border: '#8effe9',
    body: `
      ${fateCard(`
        <g transform="rotate(-12 64 74)">
          <rect x="36" y="54" width="24" height="42" rx="3" fill="#0d3038" stroke="${P.cyan}" stroke-width="2"/>
          <rect x="44" y="49" width="24" height="44" rx="3" fill="#123f48" stroke="${P.gold}" stroke-width="2"/>
          <rect x="52" y="44" width="24" height="48" rx="3" fill="#1a5058" stroke="${P.cyan}" stroke-width="2"/>
          <path d="M57 54h14M57 61h9M73 54h1" stroke="${P.bone}" stroke-width="2" stroke-linecap="round" opacity=".55"/>
        </g>
        <path d="M34 94 94 44" stroke="${P.red}" stroke-width="4" stroke-linecap="round"/>
        <path d="M88 36l12 12M84 40l12 12" stroke="${P.gold}" stroke-width="3" stroke-linecap="round"/>
      `)}
    `,
  },
  {
    id: 'C02',
    title: 'C02 Transmutasi',
    primary: P.cyan,
    secondary: P.magenta,
    bgA: '#0d2833',
    bgB: '#0a151b',
    border: '#8effe9',
    body: `
      ${fateCard(`
        <circle cx="64" cy="72" r="25" fill="none" stroke="${P.cyan}" stroke-width="2" opacity=".8"/>
        <path d="M64 47 83 82H45Z" fill="none" stroke="${P.gold}" stroke-width="2"/>
        <path d="M64 97 45 62h38Z" fill="none" stroke="${P.magenta}" stroke-width="2"/>
        <circle cx="64" cy="72" r="8" fill="${P.gold}" filter="url(#glow)"/>
        <path d="M64 34v7M31 72h7M90 72h7M64 103v-4" stroke="${P.bone}" stroke-width="2" stroke-linecap="round" opacity=".7"/>
      `)}
    `,
  },
  {
    id: 'C03',
    title: 'C03 Standar Kosmik',
    primary: P.gold,
    secondary: P.cyan,
    bgA: '#2e280d',
    bgB: '#171408',
    border: '#ffe066',
    body: `
      ${fateCard(`
        <path d="M64 38v58" stroke="${P.gold}" stroke-width="3" stroke-linecap="round"/>
        <path d="${starPath(64, 62, 18, 5)}" fill="${P.gold}" filter="url(#glow)"/>
        <circle cx="64" cy="62" r="5" fill="${P.cyan}"/>
        <path d="M40 52q-9 8 0 16M88 52q9 8 0 16" fill="none" stroke="${P.cyan}" stroke-width="2" stroke-dasharray="3 4"/>
        <path d="M40 84q-9 8 0 16M88 84q9 8 0 16" fill="none" stroke="${P.cyan}" stroke-width="2" stroke-dasharray="3 4" opacity=".6"/>
        <path d="M54 96h20" stroke="${P.bone}" stroke-width="2" stroke-linecap="round" opacity=".7"/>
      `)}
    `,
  },
  {
    id: 'C04',
    title: 'C04 Visi Joker',
    primary: P.magenta,
    secondary: P.cyan,
    bgA: '#2c1030',
    bgB: '#150b18',
    border: '#ff9af5',
    body: `
      ${fateCard(`
        <path d="M38 54 28 30l22 8 14-16 14 16 22-8-10 24Z" fill="${P.magenta}" opacity=".55" stroke="${P.gold}" stroke-width="2"/>
        <circle cx="38" cy="32" r="4" fill="${P.cyan}"/><circle cx="90" cy="32" r="4" fill="${P.gold}"/>
        <path d="M38 62q26-22 52 0-26 26-52 0Z" fill="#0b0710" stroke="${P.cyan}" stroke-width="2"/>
        <circle cx="64" cy="62" r="14" fill="${P.cyan}"/>
        <circle cx="64" cy="62" r="6" fill="${P.ink}"/>
        <path d="M32 94q32 18 64 0" fill="none" stroke="${P.gold}" stroke-width="2" stroke-dasharray="3 4" opacity=".7"/>
      `)}
    `,
  },
];

/* ------------------------------------------------------------------ */
/* Cursed modifiers                                                    */
/* ------------------------------------------------------------------ */

const sigil = (inner) => `
  <circle cx="64" cy="64" r="43" fill="none" stroke="${P.bone}" stroke-width="1.5" stroke-dasharray="2 7" opacity=".22"/>
  <circle cx="64" cy="64" r="36" fill="none" stroke="${P.bone}" stroke-width="1.5" opacity=".12"/>
  ${inner}
`;

const MODIFIERS = [
  {
    id: 'm_mabuk',
    title: 'm_mabuk Gravitasi Mabuk',
    primary: P.magenta,
    secondary: P.green,
    bgA: '#2c102c',
    bgB: '#150b16',
    border: '#ff9af5',
    body: `
      ${sigil(`
        <g transform="rotate(-13 64 64)">
          <circle cx="64" cy="64" r="25" fill="none" stroke="${P.magenta}" stroke-width="2"/>
          <ellipse cx="64" cy="64" rx="38" ry="15" fill="none" stroke="${P.cyan}" stroke-width="2" transform="rotate(24 64 64)"/>
          <circle cx="92" cy="42" r="7" fill="${P.gold}" filter="url(#glow)"/>
        </g>
        <path d="M64 38c-10 12-16 20-8 30 6 8 18 2 14-8-4-8-14-4-10 4" fill="none" stroke="${P.green}" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M42 94q10-6 20 0t20 0" fill="none" stroke="${P.magenta}" stroke-width="2" stroke-dasharray="3 4" opacity=".7"/>
      `)}
    `,
  },
  {
    id: 'm_sabun',
    title: 'm_sabun Fisika Sabun',
    primary: P.cyan,
    secondary: P.magenta,
    bgA: '#0d2b30',
    bgB: '#0a1519',
    border: '#8effe9',
    body: `
      ${sigil(`
        <rect x="34" y="58" width="60" height="26" rx="13" fill="#1a2c34" stroke="${P.cyan}" stroke-width="2" transform="rotate(-10 64 64)" filter="url(#glow)"/>
        <path d="M44 68h40" stroke="${P.bone}" stroke-width="2" stroke-linecap="round" opacity=".45"/>
        <circle cx="44" cy="44" r="7" fill="none" stroke="${P.cyan}" stroke-width="2"/>
        <circle cx="82" cy="40" r="5" fill="none" stroke="${P.magenta}" stroke-width="2"/>
        <circle cx="92" cy="56" r="3" fill="${P.gold}"/>
        <path d="M26 96q16-10 32 0" fill="none" stroke="${P.magenta}" stroke-width="2" stroke-dasharray="3 4" opacity=".7"/>
      `)}
    `,
  },
  {
    id: 'm_sumbang',
    title: 'm_sumbang Audio Sumbang',
    primary: P.magenta,
    secondary: P.cyan,
    bgA: '#2d1028',
    bgB: '#150b14',
    border: '#ff9af5',
    body: `
      ${sigil(`
        <path d="M50 30v34a14 14 0 0 0 28 0V30" fill="none" stroke="${P.magenta}" stroke-width="6" stroke-linecap="round" filter="url(#glow)"/>
        <path d="M64 78v18" stroke="${P.gold}" stroke-width="4" stroke-linecap="round"/>
        <path d="M30 58q8-12 16 0t16 0 16 0 16 0" fill="none" stroke="${P.cyan}" stroke-width="2" stroke-linecap="round"/>
        <path d="M30 84q8 12 16 0t16 0 16 0 16 0" fill="none" stroke="${P.cyan}" stroke-width="2" stroke-linecap="round" opacity=".55"/>
        <path d="M28 100h72" stroke="${P.bone}" stroke-width="1.5" opacity=".25"/>
      `)}
    `,
  },
  {
    id: 'm_silinder',
    title: 'm_silinder Mata Silinder',
    primary: P.cyan,
    secondary: P.gold,
    bgA: '#0d2930',
    bgB: '#0a151a',
    border: '#8effe9',
    body: `
      ${sigil(`
        <g fill="none" stroke="${P.cyan}" stroke-width="1.5" opacity=".65">
          <path d="M32 40h64M28 52h72M26 64h76M28 76h72M32 88h64"/>
          <path d="M40 34v60M64 30v68M88 34v60"/>
        </g>
        <path d="M32 40q32-12 64 0M32 88q32 12 64 0" fill="none" stroke="${P.magenta}" stroke-width="2"/>
        <ellipse cx="64" cy="64" rx="24" ry="34" fill="none" stroke="${P.gold}" stroke-width="2" stroke-dasharray="3 5"/>
      `)}
    `,
  },
  {
    id: 'm_getar',
    title: 'm_getar Stik Gelisah',
    primary: P.magenta,
    secondary: P.gold,
    bgA: '#2c1024',
    bgB: '#150b13',
    border: '#ff9af5',
    body: `
      ${sigil(`
        <rect x="28" y="60" width="72" height="10" rx="5" fill="${P.magenta}" transform="rotate(-6 64 64)" filter="url(#glow)"/>
        <rect x="28" y="60" width="72" height="10" rx="5" fill="none" stroke="${P.cyan}" stroke-width="2" opacity=".45" transform="rotate(5 64 64)"/>
        <rect x="28" y="60" width="72" height="10" rx="5" fill="none" stroke="${P.bone}" stroke-width="1.5" opacity=".2" transform="rotate(-13 64 64)"/>
        <path d="M40 42l-8-8M88 42l8-8M36 86l-8 8M92 86l8 8M64 36v-8M64 92v8" stroke="${P.gold}" stroke-width="2" stroke-linecap="round"/>
      `)}
    `,
  },
  {
    id: 'm_kotor',
    title: 'm_kotor Lensa Kotor',
    primary: P.cardboard,
    secondary: P.gold,
    bgA: '#2f2415',
    bgB: '#171008',
    border: '#e0b07a',
    body: `
      ${sigil(`
        <circle cx="64" cy="64" r="33" fill="none" stroke="${P.bone}" stroke-width="2" opacity=".45"/>
        <path d="M38 48q18-9 30 4t22 2" fill="none" stroke="#6b3f14" stroke-width="7" stroke-linecap="round" opacity=".85"/>
        <circle cx="48" cy="76" r="9" fill="#3a2a10" opacity=".9"/>
        <circle cx="82" cy="52" r="6" fill="#3a2a10" opacity=".85"/>
        <circle cx="76" cy="86" r="4" fill="#3a2a10" opacity=".8"/>
        <path d="M30 90q18-12 36-2" fill="none" stroke="${P.bone}" stroke-width="2" stroke-linecap="round" opacity=".3"/>
        <circle cx="64" cy="64" r="6" fill="${P.gold}" opacity=".55"/>
      `)}
    `,
  },
  {
    id: 'm_waktu',
    title: 'm_waktu Waktu Karet',
    primary: P.red,
    secondary: P.gold,
    bgA: '#321016',
    bgB: '#170b0c',
    border: '#ff9a9a',
    body: `
      ${sigil(`
        <circle cx="64" cy="60" r="29" fill="#1a0d14" stroke="${P.red}" stroke-width="3" filter="url(#glow)"/>
        <path d="M64 36v24l15 9" fill="none" stroke="${P.gold}" stroke-width="3" stroke-linecap="round"/>
        <path d="M64 60c10 8 8 22-4 30-10 8-22 2-20-10 2-10 12-12 18-6" fill="none" stroke="${P.magenta}" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M34 60h-8M94 60h8M64 28v-6M64 92v6" stroke="${P.bone}" stroke-width="2" stroke-linecap="round" opacity=".6"/>
        <path d="M64 98v14" stroke="${P.red}" stroke-width="5" stroke-linecap="round"/>
      `)}
    `,
  },
  {
    id: 'm_duri',
    title: 'm_duri Duri Kosmik',
    primary: P.green,
    secondary: P.magenta,
    bgA: '#123018',
    bgB: '#0b1710',
    border: '#8aff70',
    body: `
      ${sigil(`
        <circle cx="64" cy="64" r="24" fill="#1a0b24" stroke="${P.green}" stroke-width="2" filter="url(#glow)"/>
        <g stroke="${P.green}" stroke-width="3" stroke-linecap="round">
          <path d="M64 40V28M64 88v12M40 64H28M88 64h12M46 46l-8-8M82 82l8 8M82 46l8-8M46 82l-8 8"/>
          <path d="M55 55l-6-6M73 73l6 6M73 55l6-6M55 73l-6 6"/>
        </g>
        <circle cx="64" cy="64" r="8" fill="${P.magenta}"/>
        <circle cx="98" cy="32" r="2.5" fill="${P.gold}"/>
        <circle cx="30" cy="92" r="2.5" fill="${P.cyan}"/>
      `)}
    `,
  },
];


async function writeSvg(relativePath, svg) {
  const target = path.join(ART_ROOT, relativePath);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, svg, 'utf8');
  return { relativePath, bytes: Buffer.byteLength(svg, 'utf8') };
}

/* ------------------------------------------------------------------ */
/* Boss portraits                                                      */
/* ------------------------------------------------------------------ */

const bossCorners = (color) => `<g stroke="${color}" stroke-width="3" stroke-linecap="round" opacity=".55">
  <path d="M34 68V34h34M222 34h-34M222 34v34M34 188v34h34M222 222h-34M222 222v-34"/>
</g>`;

function bossSvg({ id, title, accent, dark, border = P.bone, extra = '', body }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title" data-art-id="${id}">
<title id="title">${esc(title)}</title>
<defs>
  <radialGradient id="bg" cx="50%" cy="34%" r="84%">
    <stop offset="0" stop-color="${dark}"/>
    <stop offset=".62" stop-color="${dark}"/>
    <stop offset="1" stop-color="${P.ink}"/>
  </radialGradient>
  <radialGradient id="spot" cx="50%" cy="42%" r="55%">
    <stop offset="0" stop-color="${accent}" stop-opacity=".28"/>
    <stop offset=".6" stop-color="${accent}" stop-opacity=".07"/>
    <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="rim" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${accent}"/>
    <stop offset="1" stop-color="${P.bone}"/>
  </linearGradient>
  <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${P.ink}" stop-opacity="0"/>
    <stop offset="1" stop-color="${P.ink}" stop-opacity=".88"/>
  </linearGradient>
  <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
    <feGaussianBlur stdDeviation="4" result="b"/>
    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <filter id="soft" x="-40%" y="-40%" width="180%" height="180%">
    <feGaussianBlur stdDeviation="7"/>
  </filter>
  <pattern id="scan" width="4" height="4" patternUnits="userSpaceOnUse">
    <rect width="4" height="1" y="1" fill="${P.bone}" opacity=".04"/>
  </pattern>
  <clipPath id="clip"><rect x="8" y="8" width="240" height="240" rx="30"/></clipPath>
  ${extra}
</defs>
<rect x="8" y="8" width="240" height="240" rx="30" fill="url(#bg)" stroke="${border}" stroke-opacity=".62" stroke-width="2"/>
<g clip-path="url(#clip)">
  <rect x="8" y="8" width="240" height="240" fill="url(#scan)"/>
  <path d="M8 8h68c-16 76-16 166 0 240H8Z" fill="${accent}" opacity=".09"/>
  <path d="M248 8h-68c16 76 16 166 0 240h68Z" fill="${accent}" opacity=".05"/>
  <ellipse cx="128" cy="138" rx="116" ry="120" fill="url(#spot)"/>
  ${body}
  <rect x="8" y="212" width="240" height="36" fill="url(#floor)"/>
  <rect x="12" y="12" width="232" height="232" rx="27" fill="none" stroke="${accent}" stroke-width="5" opacity=".18" filter="url(#soft)"/>
  <rect x="14" y="14" width="228" height="228" rx="24" fill="none" stroke="${P.bone}" stroke-opacity=".07" stroke-width="2"/>
  <g fill="${accent}" opacity=".45">
    <circle cx="32" cy="226" r="2"/><circle cx="52" cy="226" r="2"/><circle cx="72" cy="226" r="2"/>
    <circle cx="184" cy="226" r="2"/><circle cx="204" cy="226" r="2"/><circle cx="224" cy="226" r="2"/>
  </g>
</g>
<rect x="18" y="18" width="220" height="220" rx="22" fill="none" stroke="${P.bone}" stroke-opacity=".14"/>
${bossCorners(accent)}
</svg>`;
}

const MANAJER_BASE = `
  <path d="M128 22c16 0 24 12 26 28l8 34-12 8 8 62 24 82H74l24-82 8-62-12-8 8-34c2-16 10-28 26-28Z" fill="#efe6d2" stroke="#b3122b" stroke-width="3"/>
  <path d="M128 150v84M96 178q-8 30-12 54M160 178q8 30 12 54" stroke="#b3122b" stroke-opacity=".18" stroke-width="2"/>
  <path d="M84 226q44-16 88 0" fill="none" stroke="#b3122b" stroke-opacity=".25" stroke-width="2"/>
  <ellipse cx="128" cy="84" rx="30" ry="36" fill="#f7efdd" stroke="#b3122b" stroke-width="2"/>
  ${eye(128, 82, 18, 22, '#b3122b', '#0b0710', '#f7efdd')}
  <path d="M110 54q18-12 36 0" fill="none" stroke="#b3122b" stroke-width="2" opacity=".45"/>
  <path d="M118 128q10 6 20 0" fill="none" stroke="#b3122b" stroke-width="3" stroke-linecap="round"/>
  <path d="M104 146h48l-8 20-16 10-16-10Z" fill="#b3122b"/>
  <path d="M128 176v46" stroke="#b3122b" stroke-width="6" stroke-linecap="round"/>
  <path d="M104 142q-30 18-34 58M152 142q30 18 34 58" fill="none" stroke="#b3122b" stroke-width="3" stroke-linecap="round"/>
  <circle cx="70" cy="204" r="7" fill="#efe6d2" stroke="#b3122b" stroke-width="2"/>
  <circle cx="186" cy="204" r="7" fill="#efe6d2" stroke="#b3122b" stroke-width="2"/>
`;

const MANAJER_CHAINS = `
  <g fill="none" stroke="#a9adb6" stroke-width="3" stroke-linecap="round" opacity=".85">
    <path d="M86 148q42 26 84 0" stroke-dasharray="7 5"/>
    <path d="M80 198q48 22 96 0" stroke-dasharray="7 5"/>
    <path d="M96 156l-12 42M160 156l12 42" stroke-dasharray="6 5"/>
  </g>
  <g>
    <circle cx="74" cy="168" r="11" fill="#8f1220" stroke="#ffb3bd" stroke-width="2"/>
    <path d="${starPath(74, 168, 5, 5, 0.45)}" fill="#ffd9de"/>
    <circle cx="184" cy="188" r="13" fill="#8f1220" stroke="#ffb3bd" stroke-width="2"/>
    <path d="${starPath(184, 188, 6, 5, 0.45)}" fill="#ffd9de"/>
    <path d="M68 178l-8 18 10-2 6 10 2-20M190 200l8 16 2-12 10 2-8-18" fill="#b3122b"/>
    <rect x="44" y="176" width="26" height="40" rx="3" fill="#f6e8c8" stroke="#b3122b" stroke-width="2" transform="rotate(-8 57 196)"/>
    <path d="M50 186h14M50 194h14M50 202h10" stroke="#b3122b" stroke-width="2" transform="rotate(-8 57 196)"/>
  </g>
`;

const MANAJER_CROWN = `
  <path d="M128 0 44 236h168Z" fill="#fff3c4" opacity=".08"/>
  <path d="M128 0 74 236h108Z" fill="#fff3c4" opacity=".07"/>
  <path d="M98 50 90 22l18 10 12-16 10 16 20-10-8 28Z" fill="#ffd700" stroke="#fff3c4" stroke-width="2" stroke-linejoin="round" filter="url(#glow)"/>
  <circle cx="90" cy="20" r="4" fill="#ffd700"/><circle cx="128" cy="14" r="4" fill="#ffd700"/><circle cx="166" cy="20" r="4" fill="#ffd700"/>
  ${eye(42, 78, 9, 12, '#ff3b4e', '#0b0710', '#f6e8c8')}
  ${eye(210, 96, 9, 12, '#ff3b4e', '#0b0710', '#f6e8c8')}
  ${eye(34, 140, 7, 10, '#ff3b4e', '#0b0710', '#f6e8c8')}
  ${eye(220, 154, 7, 10, '#ff3b4e', '#0b0710', '#f6e8c8')}
  ${eye(62, 44, 6, 8, '#ff3b4e', '#0b0710', '#f6e8c8')}
  ${eye(196, 40, 6, 8, '#ff3b4e', '#0b0710', '#f6e8c8')}
`;

const BOSSES = [];

BOSSES.push(
  {
    id: 'lumi',
    title: 'lumi - Nenek Lumi',
    accent: '#e9c46a',
    dark: '#2a1a0b',
    body: `
      <g opacity=".5" fill="${P.bone}">
        <circle cx="52" cy="54" r="2"/><circle cx="204" cy="46" r="2.5"/><circle cx="186" cy="82" r="1.5"/>
        <path d="${starPath(70, 36, 4, 4, 0.3)}" fill="#7fe7ff"/><path d="${starPath(210, 102, 3, 4, 0.3)}" fill="#e9c46a"/>
      </g>
      <path d="M34 236q6-62 60-72h68q54 10 60 72Z" fill="#24160a" stroke="#e9c46a" stroke-opacity=".45" stroke-width="2"/>
      <path d="M92 172q-6-58 36-78 42 20 36 78-18-14-36-14t-36 14Z" fill="#3d2811" stroke="#e9c46a" stroke-opacity=".55" stroke-width="2"/>
      <path d="M84 136q10-56 44-64 34 8 44 64-22-14-44-14t-44 14Z" fill="#5b3a17" stroke="#e9c46a" stroke-width="2"/>
      <rect x="102" y="92" width="52" height="58" rx="12" fill="#140c05" stroke="#e9c46a" stroke-width="3"/>
      <path d="M115 94v54M128 92v58M141 94v54" stroke="#e9c46a" stroke-opacity=".45" stroke-width="2"/>
      <circle cx="128" cy="118" r="16" fill="#ffd98a" opacity=".35" filter="url(#glow)"/>
      <circle cx="128" cy="118" r="7" fill="#fff3cf"/>
      <path d="M118 74q10-12 20 0" fill="none" stroke="#e9c46a" stroke-width="3" stroke-linecap="round"/>
      <path d="M112 152q-5 12 2 17 7-5 2-17Z" fill="#7fe7ff" opacity=".9"/>
      <path d="M144 152q-5 16 2 21 7-5 2-21Z" fill="#7fe7ff" opacity=".9"/>
      <path d="M86 190q-24 14-26 42M170 190q24 14 26 42" fill="none" stroke="#e9c46a" stroke-opacity=".55" stroke-width="3" stroke-linecap="round"/>
      <circle cx="60" cy="232" r="5" fill="#e9c46a"/><circle cx="196" cy="232" r="5" fill="#e9c46a"/>
      <path d="M96 206q32 12 64 0" fill="none" stroke="#e9c46a" stroke-opacity=".22" stroke-width="2"/>
    `,
  },
  {
    id: 'pipo',
    title: 'pipo - Pipo',
    accent: '#f4a261',
    dark: '#3a1418',
    body: `
      <g opacity=".35" fill="none" stroke="${P.magenta}" stroke-width="2">
        <path d="M54 84q32-34 68-14t64-2"/>
        <path d="M46 104q38-24 72-4t72-10"/>
      </g>
      <g fill="${P.gold}" opacity=".8">
        <path d="${starPath(42, 58, 4, 4, 0.3)}"/><path d="${starPath(212, 74, 5, 4, 0.3)}"/><path d="${starPath(196, 124, 3, 4, 0.3)}"/>
      </g>
      <path d="M34 236q4-54 52-64h84q48 10 52 64Z" fill="#3a1418" stroke="#f4a261" stroke-opacity=".6" stroke-width="2"/>
      <circle cx="128" cy="120" r="52" fill="#e76f51" stroke="#f4a261" stroke-width="3"/>
      <circle cx="128" cy="120" r="52" fill="url(#spot)" opacity=".55"/>
      ${eye(108, 112, 13, 16, '#2a0b12', P.ink, P.bone)}
      ${eye(148, 112, 13, 16, '#2a0b12', P.ink, P.bone)}
      <circle cx="128" cy="91" r="6" fill="${P.gold}" filter="url(#glow)"/>
      <path d="M106 139q22 20 44 0" fill="none" stroke="#2a0b12" stroke-width="4" stroke-linecap="round"/>
      <path d="M102 74q-16-24-28-28M154 74q16-24 28-28" fill="none" stroke="${P.gold}" stroke-width="3" stroke-linecap="round"/>
      <path d="${starPath(72, 42, 10, 5)}" fill="${P.cyan}" filter="url(#glow)"/>
      <path d="${starPath(184, 42, 10, 5)}" fill="${P.magenta}" filter="url(#glow)"/>
      <path d="M188 190l18-44 16 8-18 44Z" fill="${P.cyan}" stroke="${P.bone}" stroke-opacity=".5" stroke-width="2"/>
      <path d="M194 180l-18 28" stroke="${P.gold}" stroke-width="4" stroke-linecap="round"/>
      <g fill="${P.cyan}"><rect x="56" y="196" width="7" height="7" transform="rotate(24 59 199)"/><rect x="74" y="184" width="5" height="5" transform="rotate(-18 76 186)" fill="${P.magenta}"/></g>
      <g fill="${P.magenta}"><rect x="62" y="176" width="5" height="5" transform="rotate(40 64 178)"/></g>
    `,
  },
  {
    id: 'kapten_keju',
    title: 'kapten_keju - Kapten Keju',
    accent: '#ffd166',
    dark: '#3a3a16',
    body: `
      <path d="M38 236q8-58 54-68h72q46 10 54 68Z" fill="#4a4a1e" stroke="#ffd166" stroke-opacity=".55" stroke-width="2"/>
      <path d="M86 178q-4-44 42-44t42 44q-20-12-42-12t-42 12Z" fill="#7f8f39" stroke="#ffd166" stroke-width="2"/>
      <path d="M88 150h80v34H88Z" fill="#ffd166" opacity=".18" stroke="#ffd166" stroke-opacity=".5" stroke-width="2"/>
      <circle cx="108" cy="166" r="5" fill="#7f8f39"/><circle cx="128" cy="174" r="6" fill="#7f8f39"/><circle cx="150" cy="162" r="4" fill="#7f8f39"/>
      <ellipse cx="128" cy="118" rx="44" ry="40" fill="#7f8f39" stroke="#ffd166" stroke-width="3"/>
      <path d="M92 136q-24 8-30 28M164 136q24 8 30 28" fill="none" stroke="#ffd166" stroke-width="5" stroke-linecap="round"/>
      <path d="M92 136q-10 16-4 28M164 136q10 16 4 28" fill="none" stroke="#ffd166" stroke-width="3" stroke-linecap="round"/>
      <path d="M102 78q-16-26-30-30M154 78q16-26 30-30" fill="none" stroke="#ffd166" stroke-width="3" stroke-linecap="round"/>
      <circle cx="70" cy="46" r="6" fill="${P.gold}"/><circle cx="186" cy="46" r="6" fill="${P.gold}"/>
      <path d="M94 80 88 56l22 8 18-24 18 24 22-8-6 24Z" fill="#ffd166" stroke="${P.bone}" stroke-opacity=".55" stroke-width="2" filter="url(#glow)"/>
      <circle cx="108" cy="68" r="4" fill="#7f8f39"/><circle cx="128" cy="60" r="3" fill="#7f8f39"/><circle cx="150" cy="68" r="4" fill="#7f8f39"/>
      ${eye(112, 116, 10, 13, '#2a1a00', P.ink, P.bone)}
      ${eye(144, 116, 10, 13, '#2a1a00', P.ink, P.bone)}
      <path d="M116 138q12 8 24 0" fill="none" stroke="#2a1a00" stroke-width="3" stroke-linecap="round"/>
    `,
  },
  {
    id: 'overclock',
    title: 'overclock - Overclock',
    accent: '#00ffff',
    dark: '#0b1027',
    body: `
      <g stroke="#00ffff" stroke-width="2" opacity=".35">
        <path d="M38 72h22M196 72h22M30 92h18M208 92h18"/>
        <path d="M44 178l-18-8M212 178l18-8"/>
      </g>
      <path d="M34 236q8-50 50-60h88q42 10 50 60Z" fill="#101a3a" stroke="#00ffff" stroke-opacity=".5" stroke-width="2"/>
      <path d="M92 92 112 62h32l20 30-12 52h-48Z" fill="#16234a" stroke="#00ffff" stroke-width="3"/>
      <path d="M98 74 82 46l24 8M158 74l16-28-24 8" fill="#16234a" stroke="#00ffff" stroke-width="3" stroke-linejoin="round"/>
      <rect x="104" y="94" width="48" height="14" rx="7" fill="#00ffff" filter="url(#glow)"/>
      <path d="M128 62v-16" stroke="#ff3333" stroke-width="3"/><circle cx="128" cy="42" r="6" fill="#ff3333" filter="url(#glow)"/>
      <path d="M106 122h44" stroke="#00ffff" stroke-opacity=".5" stroke-width="3"/>
      <circle cx="128" cy="178" r="26" fill="#0b1027" stroke="${P.gold}" stroke-width="3"/>
      <path d="M128 158v20l14 10" fill="none" stroke="#ff3333" stroke-width="3" stroke-linecap="round"/>
      <g fill="${P.gold}"><circle cx="128" cy="156" r="2"/><circle cx="150" cy="178" r="2"/><circle cx="128" cy="200" r="2"/><circle cx="106" cy="178" r="2"/></g>
      <g fill="#00ffff" opacity=".65">
        <rect x="60" y="198" width="8" height="8"/><rect x="72" y="210" width="5" height="5"/><rect x="188" y="198" width="8" height="8"/><rect x="178" y="210" width="5" height="5"/>
      </g>
      <path d="M52 156l-10-8M204 156l10-8" stroke="#ff3333" stroke-width="3" stroke-linecap="round"/>
    `,
  },
  {
    id: 'dj_synth',
    title: 'dj_synth - DJ Synth',
    accent: '#ff2bd6',
    dark: '#1a1030',
    body: `
      <g fill="none" stroke="#ff2bd6" stroke-width="2" opacity=".35">
        <path d="M36 92q-12 28 0 56M220 92q12 28 0 56"/>
        <path d="M28 108q-8 22 0 44M228 108q8 22 0 44"/>
      </g>
      <path d="M42 236q4-48 46-58h80q42 10 46 58Z" fill="#171129" stroke="#ff2bd6" stroke-opacity=".55" stroke-width="2"/>
      <rect x="62" y="168" width="132" height="46" rx="10" fill="#241a3d" stroke="#ff2bd6" stroke-width="2"/>
      <g fill="#ff2bd6" opacity=".8">
        <rect x="74" y="180" width="10" height="10"/><rect x="90" y="180" width="10" height="10"/><rect x="106" y="180" width="10" height="10"/>
        <rect x="138" y="180" width="10" height="10"/><rect x="154" y="180" width="10" height="10"/><rect x="170" y="180" width="10" height="10"/>
      </g>
      <circle cx="128" cy="112" r="54" fill="#1d1533" stroke="#ff2bd6" stroke-width="3"/>
      <circle cx="128" cy="112" r="54" fill="url(#spot)" opacity=".6"/>
      <path d="M74 112h108" stroke="${P.ink}" stroke-width="20" stroke-linecap="round"/>
      <rect x="82" y="104" width="92" height="16" rx="8" fill="#ff2bd6" filter="url(#glow)"/>
      <path d="M112 104v16M128 104v16M144 104v16" stroke="${P.ink}" stroke-width="3" opacity=".55"/>
      <circle cx="68" cy="112" r="18" fill="#241a3d" stroke="#ff2bd6" stroke-width="3"/>
      <circle cx="188" cy="112" r="18" fill="#241a3d" stroke="#ff2bd6" stroke-width="3"/>
      <path d="M68 94V78M188 94V78" stroke="#ff2bd6" stroke-width="3"/>
      <path d="M128 58V34" stroke="#ff2bd6" stroke-width="3"/><circle cx="128" cy="30" r="6" fill="#ff2bd6" filter="url(#glow)"/>
      <circle cx="48" cy="188" r="22" fill="#0b0710" stroke="#ff2bd6" stroke-width="3"/>
      <circle cx="48" cy="188" r="9" fill="#ff2bd6" opacity=".8"/>
      <circle cx="208" cy="188" r="22" fill="#0b0710" stroke="#ff2bd6" stroke-width="3"/>
      <circle cx="208" cy="188" r="9" fill="#ff2bd6" opacity=".8"/>
    `,
  },
  {
    id: 'neon_phantom',
    title: 'neon_phantom - Neon Phantom',
    accent: '#ff2bd6',
    dark: '#1c0f2b',
    body: `
      <path d="M128 28q50 4 60 66l12 116-22-12-16 14-14-14-12 16-12-16-14 14-16-14-22 12 12-116q10-62 60-66Z" fill="#1c0f2b" stroke="#ff2bd6" stroke-width="3"/>
      <path d="M96 96q32-30 64 0v54q-32 22-64 0Z" fill="${P.ink}" stroke="#ff2bd6" stroke-opacity=".55" stroke-width="2"/>
      <path d="M106 118q8-8 16 0M138 118q8-8 16 0" stroke="#ff2bd6" stroke-width="4" stroke-linecap="round" filter="url(#glow)"/>
      <path d="M118 146q10 6 20 0" stroke="#ff2bd6" stroke-width="2" opacity=".6"/>
      <path d="M128 28v-14M104 34 92 20M152 34l12-14" stroke="#ff2bd6" stroke-width="2" opacity=".6"/>
      <path d="M78 160q-24 16-28 50M178 160q24 16 28 50" fill="none" stroke="#ff2bd6" stroke-width="3" stroke-linecap="round" opacity=".75"/>
      <path d="M50 210l-8 18M54 210l2 20M58 210l10 18M206 210l8 18M202 210l-2 20M198 210l-10 18" stroke="#ff2bd6" stroke-width="3" stroke-linecap="round"/>
      <path d="M88 74q40-22 80 0" fill="none" stroke="#ff2bd6" stroke-opacity=".25" stroke-width="2"/>
      <circle cx="128" cy="196" r="4" fill="#ff2bd6" opacity=".8"/>
    `,
  },
  {
    id: 'echo',
    title: 'echo - Echo',
    accent: '#00ffcc',
    dark: '#0c2422',
    body: `
      <g fill="none" stroke="#00ffcc" opacity=".28">
        <circle cx="128" cy="112" r="76" stroke-width="2"/><circle cx="128" cy="112" r="62" stroke-width="2"/>
      </g>
      <path d="M52 236q6-46 44-56h64q38 10 44 56Z" fill="#0c2422" stroke="#00ffcc" stroke-opacity=".5" stroke-width="2"/>
      <circle cx="128" cy="112" r="46" fill="#0e2f2b" stroke="#00ffcc" stroke-width="3"/>
      <circle cx="128" cy="112" r="32" fill="none" stroke="#00ffcc" stroke-opacity=".65" stroke-width="2" stroke-dasharray="6 5"/>
      <circle cx="128" cy="112" r="18" fill="#00ffcc" opacity=".16"/>
      <circle cx="128" cy="112" r="9" fill="#d8fff8"/>
      <circle cx="128" cy="112" r="4" fill="${P.ink}"/>
      <path d="M112 148q16 10 32 0" fill="none" stroke="#00ffcc" stroke-width="2" opacity=".7"/>
      <path d="M74 112q-18-10-26-2M182 112q18-10 26-2" fill="none" stroke="#00ffcc" stroke-width="3" stroke-linecap="round" opacity=".55"/>
      <path d="M70 138q-20 8-26 22M186 138q20 8 26 22" fill="none" stroke="#00ffcc" stroke-width="2" stroke-linecap="round" opacity=".4"/>
      <circle cx="128" cy="60" r="3" fill="#00ffcc"/><circle cx="128" cy="164" r="3" fill="#00ffcc"/>
    `,
  },
  {
    id: 'error404',
    title: 'error404 - Error 404',
    accent: '#ff3333',
    dark: '#1c0b12',
    body: `
      <g fill="#ff3333" opacity=".55">
        <rect x="30" y="70" width="22" height="8"/><rect x="204" y="126" width="24" height="8"/><rect x="36" y="150" width="14" height="6"/>
      </g>
      <path d="M48 236q6-44 42-54h76q36 10 42 54Z" fill="#1c0b12" stroke="#ff3333" stroke-opacity=".5" stroke-width="2"/>
      <rect x="70" y="54" width="116" height="98" rx="10" fill="#1a0d14" stroke="#ff3333" stroke-width="3"/>
      <rect x="82" y="66" width="92" height="58" rx="4" fill="#0b0710" stroke="#ff3333" stroke-opacity=".45" stroke-width="2"/>
      <g stroke="#ff3333" stroke-width="5" stroke-linecap="round" filter="url(#glow)">
        <path d="M94 78l14 14M108 78l-14 14"/><path d="M148 78l14 14M162 78l-14 14"/>
      </g>
      <path d="M98 108h16M118 108h12M138 108h16M158 108h10" stroke="#ff3333" stroke-width="4" opacity=".8"/>
      <rect x="94" y="120" width="68" height="10" fill="#ff3333" opacity=".25"/>
      <rect x="82" y="140" width="92" height="6" fill="#ff3333" opacity=".4"/>
      <g fill="#ff3333" opacity=".6">
        <rect x="118" y="156" width="10" height="10"/><rect x="132" y="156" width="6" height="6"/><rect x="142" y="156" width="8" height="8"/>
      </g>
      <path d="M88 168q-20 12-24 40M168 168q20 12 24 40" fill="none" stroke="#ff3333" stroke-width="3" stroke-linecap="round"/>
      <path d="M52 212l-6 12M204 212l6 12" stroke="#ff3333" stroke-width="4" stroke-linecap="round"/>
    `,
  },
  {
    id: 'archivist',
    title: 'archivist - Sang Arsip',
    accent: '#d9a441',
    dark: '#2a1c10',
    body: `
      <g stroke="#d9a441" stroke-width="2" opacity=".4">
        <path d="M62 96 34 72M66 118 30 108M194 96l28-24M190 118l36-10"/>
      </g>
      <g>
        <rect x="60" y="196" width="136" height="24" rx="3" fill="#2a1c10" stroke="#d9a441" stroke-width="2"/>
        <rect x="68" y="172" width="120" height="24" rx="3" fill="#3a2714" stroke="#d9a441" stroke-width="2"/>
        <rect x="76" y="148" width="104" height="24" rx="3" fill="#2a1c10" stroke="#d9a441" stroke-width="2"/>
        <rect x="86" y="126" width="84" height="22" rx="3" fill="#3a2714" stroke="#d9a441" stroke-width="2"/>
        <path d="M72 208h112M80 184h96M88 160h80" stroke="#d9a441" stroke-opacity=".35" stroke-width="2"/>
      </g>
      <path d="M96 128q-8-32 32-38 40 6 32 38Z" fill="#4a3118" stroke="#d9a441" stroke-width="2"/>
      <ellipse cx="128" cy="100" rx="30" ry="28" fill="#c9a06a" stroke="#d9a441" stroke-width="2"/>
      <path d="M98 98h24M134 98h24" stroke="#d9a441" stroke-width="2"/>
      <circle cx="112" cy="100" r="9" fill="${P.ink}" stroke="#d9a441" stroke-width="2"/>
      <circle cx="144" cy="100" r="9" fill="${P.ink}" stroke="#d9a441" stroke-width="2"/>
      <circle cx="112" cy="100" r="3" fill="#ffd98a"/><circle cx="144" cy="100" r="3" fill="#ffd98a"/>
      <path d="M120 114q8 6 16 0" stroke="#3a2714" stroke-width="2" stroke-linecap="round"/>
      <path d="M128 72V56l10 6-10 6" fill="#d9a441" stroke="#d9a441" stroke-width="2" stroke-linejoin="round"/>
      <rect x="60" y="128" width="8" height="34" fill="#d9a441" opacity=".6"/>
    `,
  },
  {
    id: 'whisperer',
    title: 'whisperer - Si Pembisik',
    accent: '#9ef0c0',
    dark: '#101f1c',
    body: `
      <path d="M104 236q-8-54 8-96l16-26 16 26q16 42 8 96Z" fill="#101f1c" stroke="#9ef0c0" stroke-opacity=".55" stroke-width="2"/>
      <ellipse cx="128" cy="86" rx="24" ry="34" fill="#d8c9a8" stroke="#9ef0c0" stroke-width="2"/>
      <path d="M152 66q34-6 38 26 4 34-30 38" fill="#1a2f28" stroke="#9ef0c0" stroke-width="3"/>
      <path d="M158 78q20-2 22 16 2 18-16 20" fill="none" stroke="#9ef0c0" stroke-width="2"/>
      <path d="M162 90q10 0 10 8t-10 8" fill="none" stroke="#9ef0c0" stroke-width="2"/>
      <path d="M108 80q-10-2-12 8M148 80q10-2 12 8" fill="none" stroke="#9ef0c0" stroke-width="2"/>
      <path d="M112 90q8-4 14 0M134 90q8-4 14 0" stroke="#9ef0c0" stroke-width="3" stroke-linecap="round"/>
      <path d="M120 116q10-8 18-2" stroke="#d8c9a8" stroke-width="5" stroke-linecap="round"/>
      <path d="M124 112q8 4 14-2" stroke="#9ef0c0" stroke-width="2" stroke-linecap="round" opacity=".7"/>
      <path d="M104 150q-26 12-34 44M152 150q26 12 34 44" fill="none" stroke="#9ef0c0" stroke-width="2" stroke-linecap="round" opacity=".5"/>
      <path d="M128 152v54" stroke="#9ef0c0" stroke-width="2" opacity=".3"/>
      <path d="M84 64q-18-4-24 8M172 62q18-4 24 8" fill="none" stroke="#9ef0c0" stroke-width="2" stroke-linecap="round" opacity=".6"/>
      <circle cx="128" cy="128" r="3" fill="#9ef0c0"/>
    `,
  },
  {
    id: 'deep_one',
    title: 'deep_one - Deep One',
    accent: '#2ee6c8',
    dark: '#0d2b2a',
    body: `
      <g stroke="#2ee6c8" fill="none" stroke-linecap="round" opacity=".6">
        <path d="M96 208q-12 18-2 30M112 212q-6 18 4 26M144 212q6 18-4 26M160 208q12 18 2 30"/>
      </g>
      <path d="M64 118q0-62 64-62t64 62q0 44-28 62H92q-28-18-28-62Z" fill="#0d2b2a" stroke="#2ee6c8" stroke-width="3"/>
      <path d="M86 60 74 34l24 10 18-22 12 24 20-18 2 28Z" fill="#1b4a44" stroke="#2ee6c8" stroke-width="2" stroke-linejoin="round"/>
      ${eye(104, 112, 16, 20, '#2ee6c8', '#0b0710', '#d8fff8')}
      ${eye(152, 112, 12, 15, '#2ee6c8', '#0b0710', '#d8fff8')}
      ${eye(128, 80, 8, 10, '#2ee6c8', '#0b0710', '#d8fff8')}
      <path d="M98 156q30 16 60 0" fill="none" stroke="#2ee6c8" stroke-width="2" opacity=".5"/>
      <g fill="#2ee6c8" opacity=".7">
        <circle cx="92" cy="184" r="5"/><circle cx="108" cy="198" r="4"/><circle cx="148" cy="198" r="4"/><circle cx="164" cy="184" r="5"/>
      </g>
      <path d="M64 136q-24 8-32 30M192 136q24 8 32 30" fill="none" stroke="#2ee6c8" stroke-width="3" stroke-linecap="round"/>
    `,
  },
  {
    id: 'unseeing_eye',
    title: 'unseeing_eye - Mata Buta',
    accent: '#ffd700',
    dark: '#241c0b',
    body: `
      <path d="M40 236q10-42 44-52h88q34 10 44 52Z" fill="#241c0b" stroke="#ffd700" stroke-opacity=".45" stroke-width="2"/>
      <circle cx="128" cy="116" r="58" fill="#f6e8c8" stroke="#ffd700" stroke-width="3"/>
      <circle cx="128" cy="116" r="34" fill="#ffd700" opacity=".8"/>
      <circle cx="128" cy="116" r="16" fill="#0b0710"/>
      <circle cx="120" cy="106" r="6" fill="#fff" opacity=".9"/>
      <path d="M72 94q56-26 112 0v18q-56 24-112 0Z" fill="#1a1206" stroke="#ffd700" stroke-width="2"/>
      <path d="M76 100q52-18 104 0" fill="none" stroke="#ffd700" stroke-opacity=".5" stroke-width="2"/>
      <path d="M76 112q52 20 104 0" fill="none" stroke="#ffd700" stroke-opacity=".3" stroke-width="2"/>
      <g stroke="#f6e8c8" stroke-width="3" stroke-linecap="round">
        <path d="M80 64l-8-12M100 54l-4-14M128 50v-14M156 54l4-14M176 64l8-12"/>
      </g>
      <path d="M68 164q-20 10-26 34M188 164q20 10 26 34" fill="none" stroke="#ffd700" stroke-width="3" stroke-linecap="round"/>
      <path d="M60 200l-10 16M64 202l-2 18M196 200l10 16M192 202l2 18" stroke="#ffd700" stroke-width="3" stroke-linecap="round"/>
      <path d="M96 190q32 12 64 0" fill="none" stroke="#ffd700" stroke-opacity=".25" stroke-width="2"/>
    `,
  },
  {
    id: 'chef_ragu',
    title: 'chef_ragu - Chef Ragu',
    accent: '#ff8c42',
    dark: '#2a160c',
    body: `
      <g fill="none" stroke="#ff8c42" stroke-width="2" opacity=".45">
        <path d="M92 52q-10-12 0-22M112 48q-8-10 0-18M148 48q8-10 0-18M168 52q10-12 0-22"/>
      </g>
      <path d="M40 236q8-48 50-58h76q42 10 50 58Z" fill="#2a160c" stroke="#ff8c42" stroke-opacity=".5" stroke-width="2"/>
      <ellipse cx="128" cy="178" rx="50" ry="44" fill="#4a2a14" stroke="#ff8c42" stroke-width="2"/>
      <path d="M88 172h80v22H88Z" fill="#ff8c42" opacity=".18"/>
      <path d="M90 196q38 18 76 0" fill="none" stroke="#ff8c42" stroke-width="2" opacity=".5"/>
      <ellipse cx="128" cy="116" rx="40" ry="38" fill="#d9a06a" stroke="#ff8c42" stroke-width="3"/>
      <path d="M92 100q-8-34 36-40 44 6 36 40-16-14-36-14t-36 14Z" fill="#f6e8c8" stroke="#ff8c42" stroke-width="2"/>
      <path d="M84 78q-14-6-8-18 6-10 18-2 8-16 22-10 8-14 20-2 14-6 20 10 12-4 16 8 4 12-10 14Z" fill="#f6e8c8" stroke="#ff8c42" stroke-width="2"/>
      <path d="M106 112q8-6 16 0M134 112q8-6 16 0" stroke="#2a160c" stroke-width="4" stroke-linecap="round"/>
      <path d="M112 136q16-8 32 0-8 12-16 12t-16-12Z" fill="#2a160c"/>
      <path d="M100 130q-14 4-18 14M156 130q14 4 18 14" fill="none" stroke="#2a160c" stroke-width="3" stroke-linecap="round"/>
      <path d="M184 186l16-48 10 4-16 48Z" fill="#f6e8c8" stroke="#ff8c42" stroke-width="2"/>
      <ellipse cx="202" cy="136" rx="12" ry="8" transform="rotate(-20 202 136)" fill="#ff8c42" stroke="#f6e8c8" stroke-width="2"/>
      <path d="M70 190q-18 10-22 34" fill="none" stroke="#ff8c42" stroke-width="3" stroke-linecap="round"/>
    `,
  },
  {
    id: 'taster',
    title: 'taster - Si Pencicip',
    accent: '#c6ff4a',
    dark: '#1c2408',
    body: `
      <path d="M44 236q6-40 40-50h88q34 10 40 50Z" fill="#1c2408" stroke="#c6ff4a" stroke-opacity=".5" stroke-width="2"/>
      <path d="M176 196 92 74l12-8 84 122Z" fill="#f6e8c8" stroke="#c6ff4a" stroke-width="2"/>
      <ellipse cx="86" cy="68" rx="20" ry="14" transform="rotate(-36 86 68)" fill="#c6ff4a" stroke="#f6e8c8" stroke-width="2"/>
      <ellipse cx="86" cy="68" rx="10" ry="7" transform="rotate(-36 86 68)" fill="#1c2408"/>
      <path d="M176 196l14 20-18 6-10-18Z" fill="#f6e8c8" stroke="#c6ff4a" stroke-width="2"/>
      <ellipse cx="128" cy="138" rx="34" ry="32" fill="#d9c08a" stroke="#c6ff4a" stroke-width="2"/>
      <path d="M94 132q-12-24 34-30 46 6 34 30-18-12-34-12t-34 12Z" fill="#2a2a10" stroke="#c6ff4a" stroke-width="2"/>
      <circle cx="142" cy="140" r="12" fill="none" stroke="#c6ff4a" stroke-width="3"/>
      <circle cx="142" cy="140" r="5" fill="#1c2408"/>
      <path d="M112 140q8-4 14 0" stroke="#1c2408" stroke-width="3" stroke-linecap="round"/>
      <path d="M122 158q10 14 22 2-4 18-14 16t-8-18Z" fill="#ff5c8a" stroke="#1c2408" stroke-width="2"/>
      <path d="M96 168q-14 10-16 30M160 168q14 10 16 30" fill="none" stroke="#c6ff4a" stroke-width="3" stroke-linecap="round"/>
      <path d="M100 66q-8-12 2-20M156 60q8-12-2-20" fill="none" stroke="#c6ff4a" stroke-width="2" opacity=".5"/>
    `,
  },
  {
    id: 'ramuan_hidup',
    title: 'ramuan_hidup - Ramuan Hidup',
    accent: '#39ff14',
    dark: '#0e2a10',
    body: `
      <g fill="none" stroke="#39ff14" stroke-width="2" opacity=".35">
        <circle cx="94" cy="62" r="6"/><circle cx="108" cy="46" r="4"/><circle cx="166" cy="58" r="5"/>
      </g>
      <path d="M96 82h64l10 44v70q0 20-20 20h-44q-20 0-20-20v-70Z" fill="#0e2a10" stroke="#39ff14" stroke-width="3"/>
      <path d="M106 138h44v58q0 10-10 10h-24q-10 0-10-10Z" fill="#39ff14" opacity=".55"/>
      <path d="M106 138q22-10 44 0" fill="none" stroke="#39ff14" stroke-width="2"/>
      <rect x="112" y="62" width="32" height="22" rx="4" fill="#6b4a24" stroke="#39ff14" stroke-width="2"/>
      <path d="M118 62V50h20v12" fill="none" stroke="#39ff14" stroke-width="2"/>
      ${eye(128, 164, 20, 24, '#39ff14', '#0b0710', '#d8ffd0')}
      <path d="M112 202q16 10 32 0" fill="none" stroke="#0b0710" stroke-width="3" opacity=".6"/>
      <path d="M90 154q-22 8-26 30M166 154q22 8 26 30" fill="none" stroke="#39ff14" stroke-width="3" stroke-linecap="round"/>
      <path d="M62 186l-6 12M68 188l-2 14M194 186l6 12M188 188l2 14" stroke="#39ff14" stroke-width="3" stroke-linecap="round"/>
      <circle cx="98" cy="126" r="3" fill="#39ff14"/><circle cx="158" cy="118" r="4" fill="#39ff14"/>
    `,
  },
  {
    id: 'prima_donna',
    title: 'prima_donna - Prima Donna',
    accent: '#ff5c8a',
    dark: '#2a0c1a',
    body: `
      <g fill="#ff5c8a" opacity=".35">
        <circle cx="52" cy="54" r="3"/><circle cx="204" cy="64" r="4"/><circle cx="190" cy="34" r="2"/>
      </g>
      <path d="M54 236q4-64 40-84h68q36 20 40 84Z" fill="#2a0c1a" stroke="#ff5c8a" stroke-opacity=".55" stroke-width="2"/>
      <path d="M96 154q-4-30 32-32 36 2 32 32-16-10-32-10t-32 10Z" fill="#4a1230" stroke="#ff5c8a" stroke-width="2"/>
      <ellipse cx="128" cy="112" rx="34" ry="38" fill="#e8b48a" stroke="#ff5c8a" stroke-width="2"/>
      <path d="M86 92q-10-38 18-46 6-16 24-16t24 16q28 8 18 46-10-20-26-24-10 10-30 4-18 4-28 20Z" fill="#1c0812" stroke="#ff5c8a" stroke-width="2"/>
      <path d="M94 104q-14-8-18-26M162 104q14-8 18-26" fill="none" stroke="#1c0812" stroke-width="8" stroke-linecap="round"/>
      <path d="M102 96q26-12 52 0v10q-26 12-52 0Z" fill="#1c0812" opacity=".85"/>
      <path d="M110 108q8-6 14 0M134 108q8-6 14 0" stroke="#1c0812" stroke-width="4" stroke-linecap="round"/>
      <circle cx="108" cy="100" r="3" fill="#ff5c8a"/><circle cx="148" cy="100" r="3" fill="#ff5c8a"/>
      <path d="M118 128q10-6 20 0" stroke="#b3122b" stroke-width="4" stroke-linecap="round"/>
      <circle cx="92" cy="120" r="4" fill="#ffd700"/><circle cx="164" cy="120" r="4" fill="#ffd700"/>
      <path d="M176 168q30-26 40-2 8 22-22 34Z" fill="#ff5c8a" opacity=".5" stroke="#ff5c8a" stroke-width="2"/>
      <path d="M180 172q18-12 26 0M178 180q20-10 30 2M176 188q18-8 30 4" fill="none" stroke="#f6e8c8" stroke-width="2" opacity=".6"/>
      <path d="M74 196q-18 10-22 34M182 196q18 10 22 34" fill="none" stroke="#ff5c8a" stroke-width="2" stroke-linecap="round" opacity=".6"/>
    `,
  },
  {
    id: 'critic',
    title: 'critic - Sang Kritikus',
    accent: '#b388ff',
    dark: '#1a1024',
    body: `
      <path d="M62 236q4-54 40-66h52q36 12 40 66Z" fill="#1a1024" stroke="#b388ff" stroke-opacity=".55" stroke-width="2"/>
      <path d="M96 170 88 236h80l-8-66Z" fill="#241636" stroke="#b388ff" stroke-width="2"/>
      <ellipse cx="128" cy="106" rx="28" ry="38" fill="#d9c9b0" stroke="#b388ff" stroke-width="2"/>
      <path d="M100 96q-16-40 28-48 44 8 28 48-14-16-28-16t-28 16Z" fill="#2a1a3a" stroke="#b388ff" stroke-width="2"/>
      <path d="M104 100q8-6 16 0M136 100q8-6 16 0" stroke="#2a1a3a" stroke-width="3" stroke-linecap="round"/>
      <path d="M128 106v22l-6 4" fill="none" stroke="#2a1a3a" stroke-width="2" stroke-linecap="round"/>
      <path d="M114 144q14 8 28 0" stroke="#b3122b" stroke-width="3" stroke-linecap="round"/>
      <circle cx="144" cy="104" r="11" fill="none" stroke="#b388ff" stroke-width="3"/>
      <path d="M155 108q10 6 4 20" fill="none" stroke="#b388ff" stroke-width="2"/>
      <path d="M168 168l26-62 8 4-26 62Z" fill="#f6e8c8" stroke="#b388ff" stroke-width="2"/>
      <path d="M172 172l-4 14M198 110l6 4" stroke="#b388ff" stroke-width="2"/>
      <rect x="62" y="176" width="38" height="48" rx="3" fill="#2a1a3a" stroke="#b388ff" stroke-width="2"/>
      <path d="M68 186h26M68 194h26M68 202h18M68 210h22" stroke="#b388ff" stroke-opacity=".5" stroke-width="2"/>
      <path d="M96 158q-18 10-22 30" fill="none" stroke="#b388ff" stroke-width="3" stroke-linecap="round"/>
    `,
  },
  {
    id: 'understudy',
    title: 'understudy - Understudy',
    accent: '#7fe7ff',
    dark: '#0e1c24',
    body: `
      <path d="M40 236q8-50 50-60h76q42 10 50 60Z" fill="#0e1c24" stroke="#7fe7ff" stroke-opacity=".5" stroke-width="2"/>
      <path d="M128 42v186" stroke="#7fe7ff" stroke-width="2" opacity=".35"/>
      <path d="M128 48q-36 6-40 54l-8 92 48 20Z" fill="#162b36" stroke="#7fe7ff" stroke-width="2"/>
      <path d="M128 48q36 6 40 54l8 92-48 20Z" fill="#0b141a" stroke="#7fe7ff" stroke-opacity=".6" stroke-width="2"/>
      <ellipse cx="106" cy="112" rx="18" ry="24" fill="#c9d9d4" stroke="#7fe7ff" stroke-width="2"/>
      <ellipse cx="150" cy="112" rx="18" ry="24" fill="#1a2f38" stroke="#7fe7ff" stroke-width="2"/>
      ${eye(106, 112, 10, 13, '#7fe7ff', '#0b0710', '#f6e8c8')}
      <path d="M144 108q6-6 12 0M144 120q6 6 12 0" stroke="#7fe7ff" stroke-width="2" stroke-linecap="round"/>
      <path d="M100 144q8 6 16 0" stroke="#7fe7ff" stroke-width="2" stroke-linecap="round"/>
      <path d="M150 144q-8 6-16 0" stroke="#7fe7ff" stroke-width="2" stroke-linecap="round" opacity=".4"/>
      <path d="M180 156q26 4 28 30-24 10-38-4Z" fill="#f6e8c8" stroke="#7fe7ff" stroke-width="2"/>
      <circle cx="194" cy="174" r="4" fill="#0b0710"/><path d="M186 186q8 4 14-2" stroke="#0b0710" stroke-width="2"/>
      <path d="M188 154q10-12 16-2" fill="none" stroke="#7fe7ff" stroke-width="2"/>
      <path d="M66 190q-16 12-18 34M190 190q16 12 18 34" fill="none" stroke="#7fe7ff" stroke-width="2" stroke-linecap="round" opacity=".5"/>
    `,
  },
  {
    id: 'sekretaris',
    title: 'sekretaris - Sekretaris',
    accent: '#7fb8ff',
    dark: '#101a2b',
    body: `
      <path d="M54 236q6-52 44-62h60q38 10 44 62Z" fill="#101a2b" stroke="#7fb8ff" stroke-opacity=".55" stroke-width="2"/>
      <path d="M100 150q-6-28 28-30 34 2 28 30l-8 26h-40Z" fill="#1c2b44" stroke="#7fb8ff" stroke-width="2"/>
      <ellipse cx="128" cy="108" rx="32" ry="36" fill="#e0c3a0" stroke="#7fb8ff" stroke-width="2"/>
      <path d="M94 98q-8-38 34-42 42 4 34 42-16-18-34-18t-34 18Z" fill="#1a2438" stroke="#7fb8ff" stroke-width="2"/>
      <circle cx="160" cy="70" r="14" fill="#1a2438" stroke="#7fb8ff" stroke-width="2"/>
      <path d="M96 108h26M134 108h26" stroke="#1a2438" stroke-width="2"/>
      <circle cx="109" cy="110" r="9" fill="none" stroke="#7fb8ff" stroke-width="3"/>
      <circle cx="147" cy="110" r="9" fill="none" stroke="#7fb8ff" stroke-width="3"/>
      <circle cx="109" cy="110" r="3" fill="#0b0710"/><circle cx="147" cy="110" r="3" fill="#0b0710"/>
      <path d="M118 134q10 6 20 0" stroke="#8a5a3a" stroke-width="3" stroke-linecap="round"/>
      <path d="M92 84q-18-2-20 14 0 16 16 16" fill="none" stroke="#7fb8ff" stroke-width="3"/>
      <path d="M72 104q-10 6 0 12" fill="#7fb8ff"/>
      <path d="M164 84q18-2 20 14 0 16-16 16" fill="none" stroke="#7fb8ff" stroke-width="3"/>
      <rect x="58" y="180" width="46" height="52" rx="4" fill="#1c2b44" stroke="#7fb8ff" stroke-width="2"/>
      <rect x="66" y="172" width="46" height="52" rx="4" fill="#243a5c" stroke="#7fb8ff" stroke-width="2"/>
      <path d="M72 184h32M72 194h32M72 204h22M72 214h28" stroke="#7fb8ff" stroke-opacity=".45" stroke-width="2"/>
      <path d="M168 176l18-38 8 4-18 38Z" fill="#7fb8ff" stroke="#f6e8c8" stroke-width="2"/>
      <path d="M176 186q18 12 22 32" fill="none" stroke="#7fb8ff" stroke-width="2" stroke-linecap="round" opacity=".5"/>
    `,
  },
  {
    id: 'auditor',
    title: 'auditor - Auditor',
    accent: '#ff3333',
    dark: '#200c10',
    body: `
      <g fill="#ff3333" opacity=".4">
        <rect x="32" y="86" width="16" height="5"/><rect x="208" y="112" width="18" height="5"/><rect x="36" y="142" width="12" height="4"/>
      </g>
      <path d="M52 236q4-50 42-60h68q38 10 42 60Z" fill="#200c10" stroke="#ff3333" stroke-opacity=".5" stroke-width="2"/>
      <rect x="86" y="146" width="84" height="76" rx="8" fill="#2a1118" stroke="#ff3333" stroke-width="2"/>
      <g fill="#ff3333" opacity=".65">
        <rect x="98" y="160" width="12" height="10"/><rect x="116" y="160" width="12" height="10"/><rect x="134" y="160" width="12" height="10"/><rect x="152" y="160" width="8" height="10"/>
        <rect x="98" y="176" width="12" height="10"/><rect x="116" y="176" width="12" height="10"/><rect x="134" y="176" width="12" height="10"/><rect x="152" y="176" width="8" height="10"/>
        <rect x="98" y="192" width="12" height="10"/><rect x="116" y="192" width="12" height="10"/><rect x="134" y="192" width="12" height="10"/>
      </g>
      <rect x="80" y="58" width="96" height="72" rx="8" fill="#1a0d12" stroke="#ff3333" stroke-width="3"/>
      <rect x="90" y="68" width="76" height="30" rx="3" fill="#0b0710" stroke="#ff3333" stroke-opacity=".4" stroke-width="2"/>
      <g fill="#ff3333" filter="url(#glow)">
        <rect x="98" y="80" width="8" height="14"/><rect x="112" y="74" width="8" height="20"/><rect x="126" y="84" width="8" height="10"/><rect x="140" y="70" width="8" height="24"/>
      </g>
      <path d="M96 112h64" stroke="#ff3333" stroke-width="3" opacity=".6"/>
      <path d="M128 130v16" stroke="#ff3333" stroke-width="4"/>
      <path d="M64 172l-26-8 8 22 24-4Z" fill="#ff3333" opacity=".7" stroke="#f6e8c8" stroke-width="2"/>
      <path d="M188 168q20 10 24 36" fill="none" stroke="#ff3333" stroke-width="3" stroke-linecap="round"/>
      <path d="M204 204l8 14M198 206l2 16" stroke="#ff3333" stroke-width="3" stroke-linecap="round"/>
      <path d="M72 210q-18 8-22 24" fill="none" stroke="#ff3333" stroke-width="2" stroke-linecap="round" opacity=".5"/>
    `,
  },
  {
    id: 'penasihat',
    title: 'penasihat - Penasihat',
    accent: '#ffd700',
    dark: '#241a08',
    body: `
      <path d="M60 236q4-56 44-70h48q40 14 44 70Z" fill="#241a08" stroke="#ffd700" stroke-opacity=".55" stroke-width="2"/>
      <path d="M94 166q-4-44 34-46 38 2 34 46-16-12-34-12t-34 12Z" fill="#3a2a10" stroke="#ffd700" stroke-width="2"/>
      <ellipse cx="128" cy="112" rx="30" ry="34" fill="#d9c3a0" stroke="#ffd700" stroke-width="2"/>
      <path d="M96 104q-6-46 32-50 38 4 32 50-14-16-32-16t-32 16Z" fill="#2a1c08" stroke="#ffd700" stroke-width="2"/>
      <path d="M100 76 84 38l30 10 14-24 14 24 30-10-16 38Z" fill="#3a2a10" stroke="#ffd700" stroke-width="2" stroke-linejoin="round"/>
      <circle cx="128" cy="34" r="5" fill="#ffd700" filter="url(#glow)"/>
      <circle cx="114" cy="112" r="5" fill="#ffd700" filter="url(#glow)"/>
      <circle cx="142" cy="112" r="5" fill="#ffd700" filter="url(#glow)"/>
      <path d="M110 142q-2 26 18 30 20-4 18-30-18 10-36 0Z" fill="#e8e0d0" stroke="#ffd700" stroke-width="2"/>
      <path d="M118 150v18M128 150v22M138 150v18" stroke="#d9c3a0" stroke-width="2" opacity=".6"/>
      <path d="M188 236l-4-120" stroke="#ffd700" stroke-width="4" stroke-linecap="round"/>
      <circle cx="184" cy="102" r="16" fill="#0b0710" stroke="#ffd700" stroke-width="3"/>
      <circle cx="184" cy="102" r="7" fill="#ffd700" filter="url(#glow)"/>
      <path d="M96 168q-22 10-28 38M160 168q22 10 28 38" fill="none" stroke="#ffd700" stroke-width="3" stroke-linecap="round"/>
      <path d="M70 196q-18 8-22 26" fill="none" stroke="#ffd700" stroke-width="2" stroke-linecap="round" opacity=".5"/>
      <rect x="56" y="170" width="30" height="22" rx="2" fill="#f6e8c8" stroke="#ffd700" stroke-width="2" transform="rotate(-10 71 181)"/>
      <path d="M62 178h18M62 184h12" stroke="#2a1c08" stroke-width="2" transform="rotate(-10 71 181)"/>
    `,
  },
  {
    id: 'manajer',
    title: 'manajer - Sang Manajer',
    accent: '#ff3b4e',
    dark: '#1c070c',
    body: MANAJER_BASE,
  },
  {
    id: 'manajer_phase2',
    title: 'manajer_phase2 - Manajer: Kontrak',
    accent: '#ff3b4e',
    dark: '#22080d',
    body: `${MANAJER_BASE}${MANAJER_CHAINS}`,
  },
  {
    id: 'manajer_phase3',
    title: 'manajer_phase3 - Manajer: Puncak',
    accent: '#ff3b4e',
    dark: '#2a0a10',
    body: `${MANAJER_BASE}${MANAJER_CHAINS}${MANAJER_CROWN}`,
  },
);

/* ------------------------------------------------------------------ */
/* UI accents                                                          */
/* ------------------------------------------------------------------ */

function uiSvg({ id, title, accent, body }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128" role="img" aria-labelledby="title" data-art-id="${id}">
<title id="title">${esc(title)}</title>
<defs>
  <radialGradient id="uiGlow" cx="50%" cy="42%" r="62%">
    <stop offset="0" stop-color="${accent}" stop-opacity=".18"/>
    <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
  </radialGradient>
  <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
    <feGaussianBlur stdDeviation="3" result="b"/>
    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <clipPath id="uiClip"><rect x="4" y="4" width="120" height="120" rx="24"/></clipPath>
</defs>
<rect x="4" y="4" width="120" height="120" rx="24" fill="${P.ink}" fill-opacity=".55" stroke="${accent}" stroke-opacity=".3" stroke-width="2"/>
<g clip-path="url(#uiClip)">
  <rect x="4" y="4" width="120" height="120" fill="url(#uiGlow)"/>
  ${body}
</g>
</svg>`;
}

const UI = [
  {
    id: 'curtain',
    title: 'Curtain',
    accent: '#b3122b',
    body: `
      <path d="M4 4h36q10 36 6 120H4Z" fill="#5c0d1c"/>
      <path d="M124 4H88q-10 36-6 120h42Z" fill="#5c0d1c"/>
      <path d="M20 4q8 40 4 120M36 4q6 36 2 120M108 4q-8 40-4 120M92 4q-6 36-2 120" stroke="#b3122b" stroke-width="2" opacity=".85"/>
      <path d="M40 4q4 60 0 120M88 4q-4 60 0 120" stroke="#ffd700" stroke-width="2" opacity=".5"/>
      <path d="M40 4h48v14q-24 10-48 0Z" fill="#7a1224" stroke="#ffd700" stroke-width="2"/>
      <path d="M52 124q12-18 12-38M76 124q-12-18-12-38" stroke="#ffd700" stroke-width="2" opacity=".45"/>
      <circle cx="64" cy="80" r="3" fill="#ffd700" opacity=".6"/>
    `,
  },
  {
    id: 'spotlight',
    title: 'Spotlight',
    accent: '#ffd700',
    body: `
      <path d="M64 6 22 112h84Z" fill="#ffd700" opacity=".14"/>
      <path d="M64 6 36 112h56Z" fill="#fff3c4" opacity=".12"/>
      <ellipse cx="64" cy="112" rx="44" ry="12" fill="#ffd700" opacity=".18"/>
      <ellipse cx="64" cy="112" rx="28" ry="7" fill="#fff3c4" opacity=".22"/>
      <rect x="54" y="2" width="20" height="10" rx="4" fill="#ffd700"/>
      <path d="M58 12h12" stroke="#fff3c4" stroke-width="3"/>
      <g fill="#ffd700" opacity=".5"><circle cx="46" cy="52" r="2"/><circle cx="82" cy="72" r="1.5"/><circle cx="70" cy="42" r="1.5"/></g>
    `,
  },
  {
    id: 'seal',
    title: 'Seal',
    accent: '#b3122b',
    body: `
      <path d="M46 74h36l-6 44-12-8-12 8Z" fill="#7a1224" stroke="#b3122b" stroke-width="2"/>
      <path d="${starPath(64, 58, 34, 14, 0.9)}" fill="#8f1220" stroke="#ffb3bd" stroke-width="2"/>
      <circle cx="64" cy="58" r="24" fill="none" stroke="#b3122b" stroke-width="3"/>
      <path d="${starPath(64, 58, 13, 5, 0.45)}" fill="#ffd9de"/>
      <path d="M58 22l-6-10M70 22l6-10" stroke="#ffb3bd" stroke-width="2" opacity=".5"/>
    `,
  },
  {
    id: 'ink',
    title: 'Ink',
    accent: '#b388ff',
    body: `
      <path d="M40 74q-10-18 8-28 2-20 24-18 16-14 32 2 20 0 20 20 12 16-4 30 2 18-18 22-14 12-30 2-20 4-24-14-12-6-8-16Z" fill="#1a1024" stroke="#b388ff" stroke-width="2"/>
      <path d="M84 44 106 20l-4 20-14 10Z" fill="#b388ff" stroke="#f6e8c8" stroke-width="2"/>
      <path d="M102 22 84 44" stroke="#0b0710" stroke-width="2"/>
      <circle cx="96" cy="96" r="3" fill="#b388ff"/>
      <path d="M32 96q-4 8 0 12M44 104q-4 8 0 10M84 110q-3 6 0 8" stroke="#b388ff" stroke-width="2" stroke-linecap="round" opacity=".7"/>
    `,
  },
  {
    id: 'erase',
    title: 'Erase',
    accent: '#00ffcc',
    body: `
      <g transform="rotate(-18 64 64)">
        <rect x="34" y="50" width="60" height="34" rx="8" fill="#f6e8c8" stroke="#00ffcc" stroke-width="2"/>
        <rect x="34" y="50" width="26" height="34" rx="8" fill="#00ffcc" opacity=".75"/>
        <path d="M60 50v34" stroke="#0b0710" stroke-width="2" opacity=".4"/>
      </g>
      <path d="M22 96q22-10 40-4M82 100q14-6 24 0" stroke="#00ffcc" stroke-width="3" stroke-linecap="round" opacity=".45"/>
      <g fill="#00ffcc" opacity=".7"><circle cx="34" cy="100" r="2"/><circle cx="44" cy="106" r="1.5"/><circle cx="90" cy="104" r="2"/><circle cx="100" cy="98" r="1.5"/></g>
      <path d="M20 110h88" stroke="#f6e8c8" stroke-width="2" opacity=".18"/>
    `,
  },
];

function xmlSanity(text) {
  if (!text.startsWith('<svg')) return 'does not start with <svg';
  if (!text.trimEnd().endsWith('</svg>')) return 'does not end with </svg>';
  const body = text.replace(/<!--[\s\S]*?-->/g, '').replace(/<\?[\s\S]*?\?>/g, '');
  const tagRe = /<\/?([A-Za-z][\w:.-]*)((?:"[^"]*"|'[^']*'|[^'">])*)\/?>/g;
  const stack = [];
  let lastIndex = 0;
  let first = true;
  let match;
  while ((match = tagRe.exec(body))) {
    const between = body.slice(lastIndex, match.index);
    if (between.includes('<')) return `stray "<" before ${match[1]}`;
    lastIndex = tagRe.lastIndex;
    const raw = match[0];
    const name = match[1];
    if (first && name !== 'svg') return 'root element is not svg';
    first = false;
    if (raw.startsWith('</')) {
      const open = stack.pop();
      if (open !== name) return `mismatched </${name}> (expected </${open || 'none'}>)`;
    } else if (!raw.trimEnd().endsWith('/>')) {
      stack.push(name);
    }
  }
  if (lastIndex === 0) return 'no tags found';
  if (stack.length) return `unclosed <${stack[stack.length - 1]}>`;
  if (body.slice(lastIndex).includes('<')) return 'stray "<" after root';
  return null;
}

async function validateSvg(relativePath) {
  const fullPath = path.join(ART_ROOT, relativePath);
  const text = await readFile(fullPath, 'utf8');
  const bytes = Buffer.byteLength(text, 'utf8');
  const errors = [];
  if (bytes >= SVG_LIMIT) errors.push(`${relativePath}: ${bytes} bytes (limit ${SVG_LIMIT})`);
  for (const token of ['undefined', 'NaN']) {
    if (text.includes(token)) errors.push(`${relativePath}: contains "${token}"`);
  }
  for (const forbidden of ['<script', '<image', '<foreignObject', '<text', 'data:image', 'xlink:href', 'href="http']) {
    if (text.includes(forbidden)) errors.push(`${relativePath}: forbidden ${forbidden}`);
  }
  if (/\son[a-z]+\s*=/i.test(text)) errors.push(`${relativePath}: event handler attribute`);
  const sanity = xmlSanity(text);
  if (sanity) errors.push(`${relativePath}: ${sanity}`);
  return { bytes, errors };
}

async function main() {
  const written = [];
  for (const item of POWERUPS) {
    written.push(await writeSvg(`powerups/${item.id}.svg`, icon(item)));
  }
  for (const item of ILLEGAL) {
    written.push(await writeSvg(`illegal/${item.id}.svg`, icon(item)));
  }
  for (const item of FATE) {
    written.push(await writeSvg(`fate/${item.id}.svg`, icon(item)));
  }
  for (const item of MODIFIERS) {
    written.push(await writeSvg(`modifiers/${item.id}.svg`, icon(item)));
  }
  for (const item of BOSSES) {
    written.push(await writeSvg(`bosses/${item.id}.svg`, bossSvg(item)));
  }
  for (const item of UI) {
    written.push(await writeSvg(`ui/${item.id}.svg`, uiSvg(item)));
  }

  const validation = await Promise.all(written.map((file) => validateSvg(file.relativePath)));
  const errors = validation.flatMap((entry) => entry.errors);
  const max = validation.reduce((m, entry) => Math.max(m, entry.bytes), 0);
  if (errors.length) {
    console.error(`Validation failed (${errors.length}):`);
    for (const error of errors) console.error(`  - ${error}`);
    process.exitCode = 1;
    return;
  }

  console.log(`powerups: ${POWERUPS.length}`);
  console.log(`illegal: ${ILLEGAL.length}`);
  console.log(`fate: ${FATE.length}`);
  console.log(`modifiers: ${MODIFIERS.length}`);
  console.log(`bosses: ${BOSSES.length}`);
  console.log(`ui: ${UI.length}`);
  console.log(`total: ${written.length}`);
  console.log(`max bytes: ${max}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
