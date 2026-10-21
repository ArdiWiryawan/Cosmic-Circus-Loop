import {
  W, H, P, rng, panel, paddle, ball, burst, speed, splatter,
  curtains, spotlight, bulb, halftone, manajer, sealStamp, crownOfEyes,
} from "./lib.mjs";

function scanlines(p, op = 0.16) {
  return `<g>${Array.from({ length: 26 }, (_, i) => `<rect x="0" y="${i * 31}" width="${W}" height="2" fill="${p.paper}" opacity="${op}"/>`).join("")}</g>`;
}

export const secrets = {
  manajer(p) {
    const body = `
      <rect x="0" y="0" width="${W}" height="${H}" fill="${p.ink}"/>
      ${curtains(p, 0.19)}
      <path d="M330 0h540v520l-80 -40l-70 54l-90 -60l-80 48l-90 -52l-70 46l-60 -38Z" fill="${p.third}" opacity=".55"/>
      ${spotlight(600, 0, 700, 30, 420, p, 0.2)}
      <circle cx="600" cy="380" r="330" fill="${p.a}" opacity=".08"/>
      ${manajer(600, 400, 1.55, p, { phase: 3, eye: "red", sway: -2 })}
      ${sealStamp(360, 330, 34, p, -14)}
      ${sealStamp(850, 300, 28, p, 18)}
      ${sealStamp(310, 470, 22, p, 6)}
      <g transform="translate(600 716)">${paddle(-150, -20, 300, 40, p, { glow: 0.18 })}</g>
      ${ball(730, 660, 20, p, 2, 1.2)}
      ${speed(600, 640, 12, 60, 300, p.a, 3, 0.5, 0.3)}
      ${splatter("manajer_spl", 8, p.a, 0.4, [60, 60, 1080, 200])}
    `;
    return panel({ id: "manajer", palette: p, body });
  },

  true_ending(p) {
    const body = `
      <rect x="0" y="0" width="${W}" height="${H}" fill="${p.ink}"/>
      ${curtains(p, 0.31)}
      ${spotlight(600, 90, 720, 20, 260, p, 0.2)}
      <g fill="${p.a}" opacity=".85">
        ${Array.from({ length: 9 }, (_, i) => `<circle cx="${80 + i * 130}" cy="742" r="${6 + (i % 3) * 3}"/>`).join("")}
      </g>
      <g transform="translate(600 560)">${paddle(-220, -34, 440, 68, p, { glow: 0.2 })}</g>
      <g transform="translate(600 700)">
        <ellipse cx="0" cy="0" rx="240" ry="22" fill="${p.paper}" opacity=".18"/>
      </g>
      <g transform="translate(860 560)">
        <g stroke="${p.ink}" stroke-width="4" fill="${p.third}">
          <rect x="-46" y="-92" width="92" height="14" rx="4"/>
          <rect x="-38" y="-78" width="76" height="56" rx="4"/>
          <path d="M-40 -10v44M40 -10v44M-46 -22h92" fill="none"/>
        </g>
      </g>
      <g fill="${p.a}" opacity=".7">
        ${Array.from({ length: 22 }, (_, i) => `<circle cx="${(i * 127) % W}" cy="${120 + (i * 83) % 420}" r="${1 + (i % 3)}"/>`).join("")}
      </g>
      ${splatter("ending_spl", 6, p.a, 0.35, [60, 620, 1080, 140])}
    `;
    return panel({ id: "true_ending", palette: p, body });
  },

  glitch(p) {
    const r = rng("glitch-slices");
    let slices = "";
    for (let i = 0; i < 22; i++) {
      const y = r() * H, h = 6 + r() * 26, dx = (r() - 0.5) * 90;
      slices += `<rect x="${dx}" y="${y}" width="${W}" height="${h}" fill="${i % 3 === 0 ? p.a : p.third}" opacity="${0.06 + r() * 0.1}"/>`;
    }
    const body = `
      <rect x="0" y="0" width="${W}" height="${H}" fill="${p.ink}"/>
      ${slices}
      ${scanlines(p, 0.12)}
      <g transform="translate(-14 0)" opacity=".55">${paddle(240, 380, 720, 78, { ...p, paper: "#ff2bd6" }, {})}</g>
      <g transform="translate(14 0)" opacity=".55">${paddle(240, 380, 720, 78, { ...p, paper: "#00ffff" }, {})}</g>
      ${paddle(240, 380, 720, 78, p, { glow: 0.25 })}
      <g fill="${p.paper}" opacity=".85">
        ${Array.from({ length: 26 }, (_, i) => {
          const x = (i * 97) % W, y = (i * 53) % H;
          return `<rect x="${x}" y="${y}" width="${8 + (i % 5) * 6}" height="3"/>`;
        }).join("")}
      </g>
      <path d="M600 80l-40 160l120 120l-80 200l100 160" fill="none" stroke="${p.a}" stroke-width="5" stroke-dasharray="18 12"/>
      ${ball(860, 300, 26, p, 3, 2.4)}
      ${burst(600, 420, 40, 260, 14, p.a, 0.28)}
      ${splatter("glitch_spl", 9, p.b, 0.4, [60, 60, 1080, 200])}
    `;
    return panel({ id: "glitch", palette: p, body });
  },
};
