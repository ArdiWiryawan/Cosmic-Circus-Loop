import {
  W, H, P, rng, panel, paddle, ball, burst, speed, splatter,
  perspectiveFloor, audience, crowdEyes, curtains, spotlight, bulb,
  halftone, hatch, ledger, memo, sealStamp, crownOfEyes,
} from "./lib.mjs";

function ring(cx, cy, r, color, w = 3, op = 0.7, dash = "") {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="${w}" opacity="${op}"${dash ? ` stroke-dasharray="${dash}"` : ""}/>`;
}
function ell(cx, cy, rx, ry, color, w = 3, op = 0.7, rot = 0) {
  return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="${color}" stroke-width="${w}" opacity="${op}" transform="rotate(${rot} ${cx} ${cy})"/>`;
}

function ghostBox(x, y, s, p, opts = {}) {
  const { lit = true, label = false } = opts;
  const fill = lit ? p.paper : p.third;
  return `<g transform="translate(${x} ${y}) scale(${s})" stroke="${p.ink}" stroke-width="3">
    <path d="M-44 -46h88v74q-12 12 -22 0t-22 0t-22 0t-22 0Z" fill="${fill}" opacity="${lit ? 1 : 0.55}"/>
    <rect x="-26" y="-30" width="18" height="16" fill="${lit ? p.a : p.ink}" opacity="${lit ? 0.9 : 0.4}"/>
    <rect x="8" y="-30" width="18" height="16" fill="${lit ? p.a : p.ink}" opacity="${lit ? 0.9 : 0.4}"/>
    ${label ? `<rect x="-22" y="4" width="44" height="8" fill="${p.ink}" opacity=".45"/>` : ""}
  </g>`;
}

function cheeseWedge(x, y, s, p) {
  return `<g transform="translate(${x} ${y}) scale(${s})" stroke="${p.ink}" stroke-width="5">
    <path d="M-220 -120L210 -10L-160 160Z" fill="${p.b}"/>
    <path d="M-220 -120L210 -10L-20 20Z" fill="${p.paper}" opacity=".35"/>
    <g fill="${p.ink}"><circle cx="-120" cy="-40" r="20"/><circle cx="-40" cy="40" r="14"/><circle cx="60" cy="-6" r="24"/><circle cx="-150" cy="90" r="10"/></g>
  </g>`;
}

function toyBlocks(x, y, s, p, rot = 0) {
  const cols = [p.a, p.b, p.paper, "#7d2cff", "#00ffff"];
  let out = `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})" stroke="${p.ink}" stroke-width="4">`;
  const stack = [[-70, -40], [0, -40], [70, -40], [-35, 30], [35, 30], [0, 100]];
  stack.forEach(([bx, by], i) => {
    out += `<rect x="${bx - 33}" y="${by - 33}" width="66" height="66" rx="7" fill="${cols[i % cols.length]}"/>`;
    out += `<circle cx="${bx}" cy="${by}" r="9" fill="${p.ink}" opacity=".18"/>`;
  });
  return out + `</g>`;
}

function racer(x, y, s, p) {
  return `<g transform="translate(${x} ${y}) scale(${s})" stroke="${p.ink}" stroke-width="5">
    <path d="M-240 40L-170 -30L120 -50L230 20L210 70L-220 80Z" fill="${p.third}"/>
    <path d="M-150 -20L80 -34L150 10L-130 20Z" fill="${p.a}" opacity=".85"/>
    <circle cx="-140" cy="82" r="34" fill="${p.ink}"/><circle cx="-140" cy="82" r="14" fill="${p.a}"/>
    <circle cx="140" cy="82" r="34" fill="${p.ink}"/><circle cx="140" cy="82" r="14" fill="${p.a}"/>
    <rect x="-250" y="34" width="46" height="12" fill="${p.b}"/>
    <path d="M170 10l70 30" stroke="${p.b}" stroke-width="8"/>
  </g>`;
}

function speaker(x, y, s, p, flip = 1) {
  return `<g transform="translate(${x} ${y}) scale(${s * flip} ${s})" stroke="${p.ink}" stroke-width="5">
    <rect x="-110" y="-160" width="220" height="320" rx="14" fill="${p.third}"/>
    <circle cx="0" cy="-62" r="66" fill="${p.ink}"/><circle cx="0" cy="-62" r="38" fill="${p.b}" opacity=".8"/><circle cx="0" cy="-62" r="14" fill="${p.paper}"/>
    <circle cx="0" cy="74" r="48" fill="${p.ink}"/><circle cx="0" cy="74" r="24" fill="${p.a}" opacity=".75"/>
  </g>`;
}

function hood(x, y, s, p, op = 1) {
  return `<g transform="translate(${x} ${y}) scale(${s})" opacity="${op}">
    <path d="M0 -170Q120 -110 96 40L70 180H-70L-96 40Q-120 -110 0 -170Z" fill="${p.ink}" stroke="${p.a}" stroke-width="4"/>
    <path d="M0 -140Q64 -92 54 20L44 120H-44L-54 20Q-64 -92 0 -140Z" fill="${p.paper}" opacity=".08"/>
    <rect x="-40" y="-56" width="80" height="12" fill="${p.a}"/>
  </g>`;
}

function eye(cx, cy, rx, ry, p, opts = {}) {
  const { lid = 0, iris = null, pupil = true } = opts;
  return `<g>
    <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${p.paper}" stroke="${p.ink}" stroke-width="5"/>
    <ellipse cx="${cx}" cy="${cy}" rx="${rx * 0.9}" ry="${ry * (0.9 - lid * 0.5)}" fill="none" stroke="${p.ink}" stroke-width="2" opacity=".4"/>
    <circle cx="${cx + (iris || 0)}" cy="${cy}" r="${ry * 0.62}" fill="${p.a}" stroke="${p.ink}" stroke-width="3"/>
    ${pupil ? `<circle cx="${cx + (iris || 0)}" cy="${cy}" r="${ry * 0.28}" fill="${p.ink}"/><circle cx="${cx + (iris || 0) - 8}" cy="${cy - 10}" r="${ry * 0.09}" fill="${p.paper}"/>` : ""}
  </g>`;
}

function tentacle(x, y, h, w, p, bend = 1, rot = 0) {
  return `<g transform="translate(${x} ${y}) rotate(${rot})" fill="none" stroke="${p.ink}" stroke-width="${w}" stroke-linecap="round">
    <path d="M0 0C${bend * 34} ${-h * 0.3} ${bend * -30} ${-h * 0.7} ${bend * 14} ${-h}" stroke="${p.a}" stroke-width="${w + 6}" opacity=".55"/>
    <path d="M0 0C${bend * 34} ${-h * 0.3} ${bend * -30} ${-h * 0.7} ${bend * 14} ${-h}"/>
    <path d="M${bend * 14} ${-h}l-14 -8M${bend * 14} ${-h}l16 -4" />
  </g>`;
}

function toque(x, y, s, p) {
  return `<g transform="translate(${x} ${y}) scale(${s})" stroke="${p.ink}" stroke-width="4">
    <path d="M-70 20q-40 -60 0 -80q-6 -50 44 -54q20 -34 56 -6q46 -12 44 44q34 34 -6 76Z" fill="${p.paper}"/>
    <rect x="-56" y="18" width="112" height="26" rx="4" fill="${p.paper}"/>
    <path d="M-56 32h112" stroke-width="2" opacity=".4"/>
  </g>`;
}

function tongue(x, y, w, h, p, rot = 0) {
  return `<g transform="translate(${x} ${y}) rotate(${rot})" stroke="${p.ink}" stroke-width="4">
    <path d="M0 0q${w * 0.5} ${-h} ${w} 0q${-w * 0.5} ${h * 0.55} ${-w} 0Z" fill="${p.a}"/>
    <path d="M${w * 0.18} 0q${w * 0.32} ${-h * 0.35} ${w * 0.64} 0" fill="none" stroke="${p.ink}" opacity=".5"/>
  </g>`;
}

function diva(x, y, s, p) {
  return `<g transform="translate(${x} ${y}) scale(${s})" stroke="${p.ink}" stroke-width="5">
    <path d="M0 -210L150 190H-150Z" fill="${p.third}"/>
    <path d="M0 -180L96 176H-96Z" fill="${p.a}" opacity=".18"/>
    <circle cx="0" cy="-214" r="42" fill="${p.ink}"/>
    <circle cx="0" cy="-214" r="26" fill="${p.paper}"/>
    <path d="M-42 -238q42 -60 84 0" fill="none" stroke="${p.b}" stroke-width="6"/>
    <path d="M0 -170v300" stroke="${p.b}" stroke-width="3" opacity=".5"/>
    <path d="M-96 176q96 34 192 0" fill="none"/>
  </g>`;
}

function placard(x, y, w, h, p, stars = 2) {
  let out = `<g transform="translate(${x} ${y})" stroke="${p.ink}" stroke-width="5">
    <rect width="${w}" height="${h}" fill="${p.paper}"/>
    <rect x="14" y="14" width="${w - 28}" height="${h - 28}" fill="none" stroke-width="2" opacity=".5"/>
    <g fill="${p.a}">`;
  for (let i = 0; i < stars; i++) {
    const cx = w / 2 + (i - (stars - 1) / 2) * 90;
    out += `<path d="M${cx} ${h * 0.34 - 34}l12 26l28 4l-20 20l5 28l-25 -14l-25 14l5 -28l-20 -20l28 -4Z"/>`;
  }
  out += `</g><rect x="${w * 0.18}" y="${h * 0.62}" width="${w * 0.64}" height="8" fill="${p.ink}" opacity=".5"/>
  <rect x="${w * 0.26}" y="${h * 0.72}" width="${w * 0.48}" height="6" fill="${p.ink}" opacity=".32"/></g>`;
  return out;
}

function calculator(x, y, s, p) {
  return `<g transform="translate(${x} ${y}) scale(${s})" stroke="${p.ink}" stroke-width="4">
    <rect x="-150" y="-230" width="300" height="460" rx="18" fill="${p.third}"/>
    <rect x="-118" y="-196" width="236" height="96" rx="8" fill="${p.paper}"/>
    <rect x="-96" y="-172" width="150" height="14" fill="${p.ink}" opacity=".3"/>
    <g fill="${p.paper}" stroke-width="2">
      ${Array.from({ length: 12 }, (_, i) => `<rect x="${-118 + (i % 3) * 82}" y="${-66 + Math.floor(i / 3) * 74}" width="64" height="56" rx="6"/>`).join("")}
    </g>
    <rect x="-118" y="160" width="236" height="52" rx="8" fill="${p.a}"/>
  </g>`;
}

function glovedHand(x, y, s, p) {
  return `<g transform="translate(${x} ${y}) scale(${s})" stroke="${p.ink}" stroke-width="5">
    <path d="M-40 140q-60 -40 -20 -120q20 -40 54 -30q-8 -46 30 -50q34 -4 36 36q22 -26 48 -4q22 20 2 48q30 0 32 30q2 30 -30 38q4 34 -30 42Z" fill="${p.paper}"/>
    <path d="M-30 140q-16 -60 12 -100" fill="none" opacity=".4"/>
  </g>`;
}

export const bosses = {
  lumi(p) {
    const pp = { ...p, tear: "#6ec6ff" };
    const body = `
      <rect x="0" y="0" width="${W}" height="${H}" fill="${p.paper}"/>
      <rect x="0" y="300" width="${W}" height="500" fill="${pp.tear}" opacity=".22"/>
      ${perspectiveFloor(520, pp.tear, p.ink, 10)}
      <g stroke="${p.ink}" stroke-width="2" opacity=".25">
        <path d="M0 380q300 -26 600 0t600 0M0 470q300 26 600 0t600 0M0 610q300 -30 600 0t600 0"/>
      </g>
      ${halftone(`M0 300h${W}v500H0Z`, "lumi", "ink", 0.16)}
      <g transform="translate(810 330)">
        <ellipse cx="0" cy="230" rx="150" ry="34" fill="${p.ink}" opacity=".3"/>
        <rect x="-96" y="-110" width="192" height="220" rx="18" fill="${p.b}" stroke="${p.ink}" stroke-width="6"/>
        <rect x="-74" y="-88" width="148" height="150" fill="${p.paper}" opacity=".55"/>
        <rect x="-74" y="-88" width="148" height="150" fill="none" stroke="${p.ink}" stroke-width="3"/>
        <rect x="-58" y="-70" width="44" height="40" fill="${pp.tear}" opacity=".8"/>
        <rect x="16" y="-70" width="44" height="40" fill="${pp.tear}" opacity=".8"/>
        <circle cx="-34" cy="-48" r="7" fill="${p.ink}"/><circle cx="38" cy="-48" r="7" fill="${p.ink}"/>
        <path d="M-30 -20q30 18 60 0" fill="none" stroke="${p.ink}" stroke-width="3"/>
        <path d="M-54 22v46M54 22v46" stroke="${p.ink}" stroke-width="4"/>
        <path d="M-30 62q-10 40 -30 56M30 62q10 40 30 56" fill="none" stroke="${p.ink}" stroke-width="3"/>
      </g>
      ${ring(810, 300, 170, pp.tear, 3, 0.5, "10 12")}
      <g fill="${pp.tear}" stroke="${p.ink}" stroke-width="2">
        <path d="M760 470q-14 26 0 34q14 -8 0 -34Z"/><path d="M860 470q-14 26 0 34q14 -8 0 -34Z"/>
        <path d="M700 520q-12 22 0 30q12 -8 0 -30Z"/><path d="M920 520q-12 22 0 30q12 -8 0 -30Z"/>
      </g>
      <g transform="translate(250 600) rotate(8)">${paddle(-100, -20, 200, 40, p, {})}</g>
      ${ball(180, 520, 26, p, 2, 1.2)}
      ${splatter("lumi_spl", 6, pp.tear, 0.5, [80, 420, 500, 300])}
    `;
    return panel({ id: "lumi", palette: p, body });
  },

  pipo(p) {
    const body = `
      <rect x="0" y="0" width="${W}" height="${H}" fill="${p.third}"/>
      ${halftone(`M0 0h${W}v${H}H0Z`, "pipo", "ink", 0.22)}
      <g transform="rotate(-8 600 400)">
        ${perspectiveFloor(360, p.paper, p.ink, 12)}
      </g>
      ${speed(420, 400, 18, 120, 620, p.a, 5, 0.5, 0.45)}
      ${toyBlocks(760, 370, 1.5, p, 8)}
      <g fill="${p.a}" stroke="${p.ink}" stroke-width="3">
        <rect x="300" y="150" width="52" height="52" rx="5" transform="rotate(-16 326 176)"/>
        <rect x="430" y="110" width="44" height="44" rx="5" transform="rotate(22 452 132)" fill="${p.b}"/>
        <rect x="560" y="180" width="38" height="38" rx="4" transform="rotate(-8 579 199)" fill="${p.paper}"/>
      </g>
      <g transform="translate(300 520) rotate(-18)">${paddle(-110, -24, 220, 48, p, {})}</g>
      ${ball(430, 470, 24, p, 3, 0.4)}
      ${burst(330, 500, 20, 150, 12, p.a, 0.6)}
      ${audience(760, p, 18, 0.8)}
      ${splatter("pipo_spl", 7, p.a, 0.5, [60, 60, 500, 240])}
    `;
    return panel({ id: "pipo", palette: p, body });
  },

  kapten_keju(p) {
    const body = `
      <rect x="0" y="0" width="${W}" height="${H}" fill="${p.ink}"/>
      <circle cx="600" cy="400" r="420" fill="${p.b}" opacity=".2"/>
      ${halftone(`M0 0h${W}v${H}H0Z`, "keju", "ink", 0.3)}
      ${cheeseWedge(560, 420, 1.25, p)}
      ${ring(560, 400, 300, p.a, 8, 0.8, "22 14")}
      ${ring(560, 400, 340, p.a, 3, 0.45, "8 16")}
      <g transform="translate(560 400)">
        <ellipse rx="54" ry="34" fill="${p.a}" stroke="${p.ink}" stroke-width="4"/>
        <ellipse rx="34" ry="20" fill="${p.paper}" opacity=".5"/>
        <circle cx="0" cy="-30" r="16" fill="${p.a}" stroke="${p.ink}" stroke-width="3"/>
        <path d="M-18 -14l-16 -20M18 -14l16 -20M0 -20v-24" stroke="${p.ink}" stroke-width="3"/>
      </g>
      <g transform="translate(940 560) rotate(-32)">${paddle(-190, -32, 380, 64, p, { glow: 0.2 })}</g>
      ${burst(700, 520, 12, 130, 16, p.paper, 0.85)}
      ${speed(700, 520, 14, 60, 260, p.paper, 4, 0.7, 0.5)}
      ${splatter("keju_spl", 8, p.a, 0.55, [80, 80, 1040, 200])}
    `;
    return panel({ id: "kapten_keju", palette: p, body });
  },

  overclock(p) {
    const body = `
      <rect x="0" y="0" width="${W}" height="${H}" fill="${p.paper}"/>
      <rect x="0" y="0" width="${W}" height="430" fill="url(#sky-overclock)"/>
      <g stroke="${p.b}" stroke-width="2" opacity=".55">
        ${Array.from({ length: 12 }, (_, i) => `<line x1="${i * 110}" y1="0" x2="${600 + (i - 6) * 40}" y2="430"/>`).join("")}
      </g>
      <circle cx="600" cy="330" r="150" fill="${p.b}" opacity=".35"/>
      ${perspectiveFloor(430, p.third, p.a, 18)}
      <g transform="translate(760 390)">${racer(0, 0, 1.25, p)}</g>
      ${speed(420, 400, 26, 80, 620, p.a, 6, 0.32, 0.7)}
      <g stroke="${p.a}" stroke-width="4" opacity=".8">
        <path d="M60 330h260M20 390h220M90 450h200M40 520h300"/>
      </g>
      <g transform="translate(260 520) rotate(10)">${paddle(-90, -20, 180, 40, p, {})}</g>
      ${ball(400, 470, 24, p, 4, 0.2)}
      ${burst(520, 420, 20, 160, 14, p.a, 0.4)}
      <g fill="${p.a}" opacity=".7"><rect x="0" y="686" width="${W}" height="6"/><rect x="0" y="706" width="${W}" height="3"/></g>
    `;
    return panel({ id: "overclock", palette: p, body });
  },

  dj_synth(p) {
    const body = `
      <rect x="0" y="0" width="${W}" height="${H}" fill="${p.ink}"/>
      ${halftone(`M0 0h${W}v${H}H0Z`, "dj", "ink", 0.35)}
      ${speed(600, 400, 26, 100, 700, p.b, 4, 0.5, 0.35)}
      <g transform="translate(300 400)">${speaker(0, 0, 1.15, p, 1)}</g>
      <g transform="translate(900 400)">${speaker(0, 0, 1.15, p, -1)}</g>
      <g fill="none" stroke="${p.a}" stroke-width="7" opacity=".9">
        <path d="M430 300q40 -90 80 0t80 0t80 0t80 0t80 0"/>
        <path d="M430 500q40 90 80 0t80 0t80 0t80 0t80 0" opacity=".6"/>
        <path d="M470 390h260" stroke-width="3" stroke-dasharray="10 8"/>
      </g>
      ${ball(600, 390, 34, p, 3, 0.9)}
      <g transform="translate(600 720) rotate(-4)">${paddle(-160, -26, 320, 52, p, { glow: 0.15 })}</g>
      ${burst(600, 390, 20, 140, 12, p.a, 0.4)}
      ${splatter("dj_spl", 8, p.a, 0.4, [80, 60, 1040, 180])}
    `;
    return panel({ id: "dj_synth", palette: p, body });
  },

  neon_phantom(p) {
    const body = `
      <rect x="0" y="0" width="${W}" height="${H}" fill="${p.ink}"/>
      ${perspectiveFloor(380, p.third, p.a, 16)}
      <circle cx="600" cy="330" r="190" fill="${p.b}" opacity=".28"/>
      ${ring(600, 330, 210, p.b, 3, 0.5, "12 14")}
      ${hood(700, 400, 1.0, p, 0.18)}
      ${hood(660, 400, 1.0, p, 0.28)}
      <g opacity=".5">${hood(620, 400, 1.0, p, 0.45)}</g>
      ${hood(560, 400, 1.05, p, 1)}
      <g transform="translate(300 600) rotate(-12)">${paddle(-100, -22, 200, 44, p, { glow: 0.2 })}</g>
      ${ball(420, 560, 22, p, 3, 1.1)}
      ${speed(560, 400, 16, 140, 500, p.a, 3, 0.5, 0.4)}
      <g fill="${p.a}" opacity=".8">
        <rect x="0" y="640" width="180" height="3"/><rect x="1020" y="700" width="180" height="3"/>
      </g>
      ${splatter("phantom_spl", 6, p.a, 0.4, [60, 60, 400, 300])}
    `;
    return panel({ id: "neon_phantom", palette: p, body });
  },

  echo(p) {
    const body = `
      <rect x="0" y="0" width="${W}" height="${H}" fill="${p.ink}"/>
      ${halftone(`M0 0h${W}v${H}H0Z`, "echo", "ink", 0.28)}
      <g stroke="${p.a}" stroke-width="2" opacity=".55">
        ${Array.from({ length: 26 }, (_, i) => `<line x1="${(i * 47) % W}" y1="${(i * 83) % H}" x2="${(i * 47) % W}" y2="${((i * 83) % H) + 30 + (i % 4) * 14}" stroke-dasharray="3 7"/>`).join("")}
      </g>
      <circle cx="600" cy="380" r="300" fill="${p.paper}" opacity=".14"/>
      <circle cx="600" cy="380" r="215" fill="${p.paper}" opacity=".1"/>
      ${ghostBox(300, 330, 1.1, p, { lit: false, label: true })}
      ${ghostBox(930, 380, 1.1, p, { lit: false, label: true })}
      <g opacity=".8">${ghostBox(300, 330, 1.1, p, { lit: true })}</g>
      <g opacity=".8">${ghostBox(930, 380, 1.1, p, { lit: true })}</g>
      ${ring(600, 360, 150, p.a, 5, 0.7, "8 10")}
      ${ghostBox(600, 360, 1.9, p, { lit: true })}
      <g transform="translate(600 700) rotate(-3)">${paddle(-190, -28, 380, 56, p, { glow: 0.18 })}</g>
      ${ball(600, 560, 26, p, 2, -1.4)}
      ${burst(600, 360, 30, 240, 18, p.a, 0.4)}
      ${splatter("echo_spl", 7, p.b, 0.4, [80, 60, 1040, 160])}
    `;
    return panel({ id: "echo", palette: p, body });
  },

  error404(p) {
    const body = `
      <rect x="0" y="0" width="${W}" height="${H}" fill="${p.ink}"/>
      <rect x="0" y="0" width="${W}" height="${H}" fill="${p.paper}" opacity=".06"/>
      ${halftone(`M0 0h${W}v${H}H0Z`, "err", "a", 0.2)}
      <path d="M0 260L720 320L720 520L0 580Z" fill="${p.paper}" opacity=".16"/>
      <path d="M180 220L760 300L760 560L180 640Z" fill="${p.paper}" opacity=".12"/>
      <g transform="translate(320 400) scale(1.9)">${ghostBox(0, 0, 1, p, { lit: true })}</g>
      <g fill="${p.paper}" opacity=".9">
        <rect x="0" y="360" width="120" height="8"/><rect x="0" y="392" width="80" height="8"/>
      </g>
      ${ball(760, 400, 62, p, 0, 0)}
      <g fill="${p.ink}">
        ${Array.from({ length: 18 }, (_, i) => {
          const gx = 700 + (i * 37) % 150, gy = 340 + (i * 53) % 130;
          return `<rect x="${gx}" y="${gy}" width="16" height="16" opacity="${0.4 + (i % 3) * 0.2}"/>`;
        }).join("")}
      </g>
      <g transform="translate(600 720) rotate(-2)">${paddle(-200, -26, 400, 52, p, {})}</g>
      <g stroke="${p.paper}" stroke-width="4" fill="none" opacity=".8">
        <path d="M760 300l-60 -70M760 500l-60 70M700 400h-90"/>
      </g>
      ${splatter("err_spl", 9, p.a, 0.45, [80, 60, 1040, 160])}
    `;
    return panel({ id: "error404", palette: p, body });
  },

  archivist(p) {
    const body = `
      <rect x="0" y="0" width="${W}" height="${H}" fill="${p.ink}"/>
      ${perspectiveFloor(300, p.third, p.ink, 10)}
      <g transform="translate(140 330) rotate(-4)">
        ${ledger(0, 0, 920, 420, p, 9)}
        <g stroke="${p.ink}" stroke-width="2" opacity=".65">
          ${Array.from({ length: 9 }, (_, i) => `<path d="M60 ${52 + i * 40}q40 -10 80 0t80 0t80 0" fill="none"/>`).join("")}
        </g>
        <g fill="${p.a}" opacity=".8"><circle cx="640" cy="120" r="26"/><circle cx="700" cy="230" r="16"/><circle cx="600" cy="300" r="12"/></g>
      </g>
      <g transform="translate(960 600) rotate(18)">${paddle(-140, -26, 280, 52, p, { glow: 0.2 })}</g>
      <path d="M900 600q-60 -180 40 -260" fill="none" stroke="${p.paper}" stroke-width="3" stroke-dasharray="10 10"/>
      ${ball(880, 560, 22, p, 2, 1)}
      ${splatter("arch_spl", 6, p.a, 0.4, [60, 60, 300, 200])}
    `;
    return panel({ id: "archivist", palette: p, body });
  },

  whisperer(p) {
    const body = `
      <rect x="0" y="0" width="${W}" height="${H}" fill="${p.ink}"/>
      <circle cx="600" cy="400" r="460" fill="${p.third}" opacity=".55"/>
      ${Array.from({ length: 9 }, (_, i) => ring(600, 400, 90 + i * 48, p.a, 2 + (i % 3), 0.5 - i * 0.035, `${8 + i * 5} ${12 + i * 4}`)).join("")}
      <g fill="none" stroke="${p.a}" stroke-width="3" opacity=".55">
        ${Array.from({ length: 7 }, (_, i) => {
          const a = (i / 7) * Math.PI * 2;
          return `<path d="M${600 + Math.cos(a) * 120} ${400 + Math.sin(a) * 120}q${Math.cos(a) * 80} ${Math.sin(a) * 80} ${Math.cos(a + 0.5) * 210} ${Math.sin(a + 0.5) * 210}"/>`;
        }).join("")}
      </g>
      <circle cx="600" cy="400" r="86" fill="${p.ink}"/>
      ${paddle(520, 378, 160, 44, p, { glow: 0.15 })}
      ${ball(600, 330, 18, p, 2, 1.4)}
      <g fill="${p.a}" opacity=".8">
        ${Array.from({ length: 14 }, (_, i) => `<rect x="${120 + (i * 71) % 960}" y="${100 + (i * 97) % 620}" width="${16 + (i % 4) * 10}" height="3"/>`).join("")}
      </g>
      ${splatter("whisp_spl", 5, p.b, 0.5, [60, 60, 1080, 200])}
    `;
    return panel({ id: "whisperer", palette: p, body });
  },

  deep_one(p) {
    const body = `
      <rect x="0" y="0" width="${W}" height="${H}" fill="${p.ink}"/>
      <rect x="0" y="360" width="${W}" height="440" fill="${p.b}" opacity=".65"/>
      ${halftone(`M0 360h${W}v440H0Z`, "deep", "a", 0.22)}
      <g stroke="${p.a}" stroke-width="3" opacity=".5">
        <path d="M0 420q300 22 600 0t600 0M0 500q300 -26 600 0t600 0M0 620q300 20 600 0t600 0"/>
      </g>
      <circle cx="600" cy="300" r="130" fill="${p.a}" opacity=".18"/>
      ${tentacle(420, 520, 300, 30, p, 1, -12)}
      ${tentacle(520, 540, 360, 34, p, -1, 6)}
      ${tentacle(680, 540, 340, 32, p, 1, -6)}
      ${tentacle(790, 520, 280, 28, p, -1, 10)}
      ${tentacle(600, 560, 400, 38, p, 0.4, 0)}
      <g transform="translate(240 560)">
        <ellipse cx="0" cy="0" rx="190" ry="26" fill="${p.third}" stroke="${p.ink}" stroke-width="4"/>
        ${paddle(-80, -20, 160, 40, p, { glow: 0.2 })}
      </g>
      ${ball(300, 470, 26, p, 2, -1.2)}
      <g fill="${p.a}" opacity=".65">
        ${Array.from({ length: 22 }, (_, i) => `<circle cx="${(i * 113) % W}" cy="${380 + (i * 67) % 360}" r="${2 + (i % 3)}"/>`).join("")}
      </g>
      ${splatter("deep_spl", 6, p.a, 0.4, [60, 300, 1080, 400])}
    `;
    return panel({ id: "deep_one", palette: p, body });
  },

  unseeing_eye(p) {
    const body = `
      <rect x="0" y="0" width="${W}" height="${H}" fill="${p.ink}"/>
      ${halftone(`M0 0h${W}v${H}H0Z`, "eye", "ink", 0.3)}
      ${Array.from({ length: 5 }, (_, i) => `<ellipse cx="600" cy="400" rx="${470 - i * 46}" ry="${260 - i * 26}" fill="none" stroke="${p.a}" stroke-width="${2 + i}" opacity="${0.16 + i * 0.08}" transform="rotate(${i % 2 ? 3 : -3} 600 400)"/>`).join("")}
      ${ell(600, 400, 360, 150, p.ink, 8, 1)}
      ${eye(600, 400, 320, 120, p, { iris: 40, lid: 0.1 })}
      <g fill="${p.a}" opacity=".85">
        ${Array.from({ length: 6 }, (_, i) => {
          const x = 330 + i * 108;
          return `<ellipse cx="${x}" cy="${240 + Math.abs(2.5 - i) * 40}" rx="26" ry="12" stroke="${p.ink}" stroke-width="3"/>`;
        }).join("")}
      </g>
      <g stroke="${p.ink}" stroke-width="4" fill="none">
        ${Array.from({ length: 10 }, (_, i) => `<path d="M${240 + i * 72} 560q20 -60 40 0"/>`).join("")}
      </g>
      <g transform="translate(600 700)">${paddle(-180, -22, 360, 44, p, {})}</g>
      ${ball(600, 620, 22, p, 2, -1.4)}
      ${splatter("eye_spl", 7, p.b, 0.35, [60, 60, 1080, 200])}
    `;
    return panel({ id: "unseeing_eye", palette: p, body });
  },

  chef_ragu(p) {
    const body = `
      <rect x="0" y="0" width="${W}" height="${H}" fill="${p.paper}"/>
      ${perspectiveFloor(430, p.third, p.ink, 14)}
      <g stroke="${p.ink}" stroke-width="4" fill="${p.third}" opacity=".85">
        <rect x="80" y="60" width="210" height="12"/><rect x="910" y="80" width="210" height="12"/>
        <path d="M120 72v70q0 30 30 30h20q30 0 30 -30V72M950 92v60" fill="none"/>
      </g>
      <g transform="translate(600 300)">${toque(0, 0, 1.3, p)}</g>
      <g transform="translate(600 420)">
        <path d="M-120 40q120 70 240 0l-20 120q-100 40 -200 0Z" fill="${p.ink}"/>
        <path d="M-120 40q120 70 240 0" fill="none" stroke="${p.paper}" stroke-width="5"/>
        <g stroke="${p.a}" stroke-width="4" opacity=".8">
          <path d="M-70 -30q20 -50 40 0M-10 -40q20 -60 40 0M50 -30q20 -50 40 0" fill="none"/>
        </g>
      </g>
      <g fill="${p.a}" stroke="${p.ink}" stroke-width="2">
        <circle cx="360" cy="250" r="16"/><circle cx="830" cy="270" r="12"/><circle cx="760" cy="180" r="10"/>
      </g>
      <g fill="${p.b}" stroke="${p.ink}" stroke-width="2">
        <circle cx="430" cy="170" r="14"/><circle cx="880" cy="200" r="9"/>
      </g>
      <g transform="translate(300 620) rotate(-8)">${paddle(-120, -24, 240, 48, p, { skin: "spoon" })}</g>
      ${ball(470, 540, 24, p, 2, 0.4)}
      ${splatter("chef_spl", 6, p.a, 0.45, [60, 100, 300, 300])}
    `;
    return panel({ id: "chef_ragu", palette: p, body });
  },

  taster(p) {
    const body = `
      <rect x="0" y="0" width="${W}" height="${H}" fill="${p.ink}"/>
      ${halftone(`M0 0h${W}v${H}H0Z`, "taster", "ink", 0.3)}
      <g transform="translate(600 400)">
        <circle r="300" fill="${p.paper}" opacity=".07"/>
        <circle r="210" fill="${p.a}" opacity=".12"/>
      </g>
      ${ball(470, 380, 120, p, 0, 0)}
      <g fill="${p.ink}" opacity=".55">
        <path d="M470 300a120 120 0 0 1 120 120h-120Z"/>
        <path d="M350 380a120 120 0 0 1 120 -120v120Z" opacity=".5"/>
      </g>
      <circle cx="470" cy="380" r="120" fill="none" stroke="${p.ink}" stroke-width="5"/>
      <g transform="translate(560 400)">${tongue(0, 0, 520, 150, p, -6)}</g>
      <g fill="${p.ink}" opacity=".8">
        ${Array.from({ length: 7 }, (_, i) => `<circle cx="${640 + i * 52}" cy="${392 + (i % 2) * 16}" r="${4 + i}"/>`).join("")}
      </g>
      <g transform="translate(250 690) rotate(-6)">${paddle(-160, -24, 320, 48, p, {})}</g>
      ${speed(860, 400, 12, 100, 340, p.a, 3, 0.5, 0.45)}
      ${splatter("taster_spl", 8, p.a, 0.4, [60, 60, 1080, 200])}
    `;
    return panel({ id: "taster", palette: p, body });
  },

  ramuan_hidup(p) {
    const body = `
      <rect x="0" y="0" width="${W}" height="${H}" fill="${p.paper}"/>
      <rect x="0" y="420" width="${W}" height="380" fill="${p.b}" opacity=".35"/>
      ${perspectiveFloor(470, p.b, p.ink, 12)}
      <g transform="translate(640 540)">
        <ellipse cx="0" cy="90" rx="300" ry="60" fill="${p.a}" opacity=".7" stroke="${p.ink}" stroke-width="4"/>
        <path d="M-210 60q-40 -160 30 -250q40 -60 90 -20q20 -80 80 -40q50 30 20 90q60 0 50 60q-10 50 -70 60Z" fill="${p.a}" stroke="${p.ink}" stroke-width="6"/>
        <path d="M-160 40q0 -120 40 -190M-30 -20q0 -120 60 -170M120 20q30 -100 10 -150" fill="none" stroke="${p.ink}" stroke-width="4" opacity=".55"/>
        <g fill="${p.paper}" opacity=".55"><circle cx="-120" cy="-60" r="20"/><circle cx="60" cy="-120" r="14"/><circle cx="140" cy="-20" r="12"/></g>
      </g>
      <g transform="translate(300 600) rotate(14)">${paddle(-140, -24, 280, 48, p, { skin: "glarp" })}</g>
      ${ball(420, 470, 26, p, 3, 0.6)}
      ${burst(560, 500, 20, 140, 12, p.a, 0.45)}
      <g fill="${p.a}" stroke="${p.ink}" stroke-width="2">
        <circle cx="220" cy="240" r="10"/><circle cx="960" cy="300" r="14"/><circle cx="880" cy="200" r="7"/>
      </g>
      ${splatter("ooze_spl", 7, p.a, 0.5, [60, 420, 1080, 280])}
    `;
    return panel({ id: "ramuan_hidup", palette: p, body });
  },

  prima_donna(p) {
    const body = `
      <rect x="0" y="0" width="${W}" height="${H}" fill="${p.ink}"/>
      ${curtains(p, 0.16)}
      <path d="M600 0h190l-90 780H500Z" fill="${p.a}" opacity=".16"/>
      ${spotlight(600, 0, 760, 40, 660, p, 0.3)}
      ${perspectiveFloor(620, p.third, p.ink, 12)}
      <g fill="${p.a}" opacity=".25">
        <path d="M0 620h${W}v60H0Z"/>
        <path d="M180 680h840v40H180Z"/>
      </g>
      ${Array.from({ length: 5 }, (_, i) => ring(600, 330, 110 + i * 70, i % 2 ? p.b : p.a, 3, 0.45 - i * 0.05, `${10 + i * 4} ${14 + i * 4}`)).join("")}
      <g transform="translate(600 470)">${diva(0, 0, 1.25, p)}</g>
      <g fill="${p.a}">
        ${Array.from({ length: 9 }, (_, i) => `<circle cx="${70 + i * 132}" cy="742" r="11"/><circle cx="${70 + i * 132}" cy="742" r="22" opacity=".18"/>`).join("")}
      </g>
      <g transform="translate(220 640) rotate(-20)">${paddle(-120, -20, 240, 40, p, { glow: 0.18 })}</g>
      ${ball(380, 520, 22, p, 2, 0.2)}
      ${audience(780, p, 20, 0.85)}
      <g fill="${p.a}" opacity=".8">
        ${Array.from({ length: 5 }, (_, i) => `<circle cx="${140 + i * 40}" cy="${700}" r="8"/>`).join("")}
      </g>
      ${splatter("diva_spl", 7, p.b, 0.4, [60, 60, 400, 300])}
    `;
    return panel({ id: "prima_donna", palette: p, body });
  },

  critic(p) {
    const body = `
      <rect x="0" y="0" width="${W}" height="${H}" fill="${p.ink}"/>
      ${spotlight(600, 0, 760, 40, 700, p, 0.18)}
      ${placard(260, 90, 680, 560, p, 2)}
      <g transform="translate(600 690) scale(0.75)">${paddle(-140, -26, 280, 52, p, { glow: 0.15 })}</g>
      ${ball(820, 640, 22, p, 2, 1.2)}
      <g transform="translate(260 90)">
        <g stroke="${p.b}" stroke-width="6" opacity=".8">
          <path d="M60 60l40 40M100 60l-40 40"/>
        </g>
      </g>
      ${speed(600, 700, 12, 80, 360, p.a, 3, 0.6, 0.35)}
      ${splatter("critic_spl", 6, p.b, 0.4, [60, 60, 1080, 160])}
    `;
    return panel({ id: "critic", palette: p, body });
  },

  understudy(p) {
    const body = `
      <rect x="0" y="0" width="${W}" height="${H}" fill="${p.ink}"/>
      ${halftone(`M0 0h${W}v${H}H0Z`, "under", "ink", 0.3)}
      <g opacity=".28">${paddle(210, 150, 780, 130, p, {})}</g>
      <g opacity=".45">
        <ellipse cx="600" cy="420" rx="300" ry="330" fill="${p.paper}" opacity=".07"/>
      </g>
      <g transform="translate(600 520)">${paddle(-260, -52, 520, 104, p, { glow: 0.18 })}</g>
      <path d="M600 40v720" stroke="${p.a}" stroke-width="3" stroke-dasharray="14 12" opacity=".5"/>
      ${ball(470, 640, 26, p, 2, -1.2)}
      ${speed(600, 520, 16, 180, 520, p.b, 3, 0.4, 0.35)}
      ${splatter("under_spl", 7, p.a, 0.35, [60, 60, 1080, 200])}
    `;
    return panel({ id: "understudy", palette: p, body });
  },

  sekretaris(p) {
    const r = rng("sekretaris-memos");
    let memos = "";
    for (let i = 0; i < 26; i++) {
      memos += memo(60 + r() * 1000, 40 + r() * 660, 90 + r() * 70, 62 + r() * 40, (r() - 0.5) * 50, p);
    }
    const body = `
      <rect x="0" y="0" width="${W}" height="${H}" fill="${p.ink}"/>
      ${halftone(`M0 0h${W}v${H}H0Z`, "sek", "a", 0.16)}
      ${memos}
      <g transform="translate(600 560) rotate(-4)">${paddle(-200, -30, 400, 60, p, { glow: 0.25 })}</g>
      ${ball(600, 440, 26, p, 2, 1.4)}
      ${sealStamp(900, 260, 92, p, 14)}
      ${speed(600, 560, 14, 120, 420, p.paper, 3, 0.5, 0.3)}
      ${splatter("sek_spl", 8, p.a, 0.45, [60, 60, 1080, 200])}
    `;
    return panel({ id: "sekretaris", palette: p, body });
  },

  auditor(p) {
    const body = `
      <rect x="0" y="0" width="${W}" height="${H}" fill="${p.ink}"/>
      ${halftone(`M0 0h${W}v${H}H0Z`, "aud", "a", 0.18)}
      <g transform="translate(840 400) rotate(4)">${calculator(0, 0, 1.05, p)}</g>
      <g fill="${p.a}" stroke="${p.ink}" stroke-width="3">
        ${Array.from({ length: 16 }, (_, i) => `<circle cx="${120 + (i * 79) % 520}" cy="${220 + (i * 97) % 420}" r="${9 + (i % 3) * 4}"/>`).join("")}
      </g>
      <g stroke="${p.paper}" stroke-width="2" opacity=".4">
        ${Array.from({ length: 7 }, (_, i) => `<path d="M60 ${160 + i * 80}h360"/>`).join("")}
      </g>
      <g transform="translate(330 600) rotate(-16)">${paddle(-150, -24, 300, 48, p, { glow: 0.2 })}</g>
      ${ball(480, 520, 24, p, 3, 0.8)}
      ${speed(600, 460, 16, 120, 460, p.a, 4, 0.55, 0.45)}
      ${splatter("aud_spl", 7, p.a, 0.45, [60, 60, 500, 260])}
    `;
    return panel({ id: "auditor", palette: p, body });
  },

  penasihat(p) {
    const body = `
      <rect x="0" y="0" width="${W}" height="${H}" fill="${p.ink}"/>
      ${halftone(`M0 0h${W}v${H}H0Z`, "pen", "a", 0.2)}
      <g transform="translate(720 330) scale(1.35)">${glovedHand(0, 0, 1, p)}</g>
      <g transform="translate(300 430) rotate(-3)">
        <rect width="520" height="300" fill="${p.paper}" stroke="${p.ink}" stroke-width="5"/>
        <g stroke="${p.ink}" stroke-width="2" opacity=".55">
          ${Array.from({ length: 7 }, (_, i) => `<line x1="40" y1="${56 + i * 32}" x2="480" y2="${56 + i * 32}"/>`).join("")}
        </g>
        <path d="M60 250q120 -30 200 0t200 -10" fill="none" stroke="${p.a}" stroke-width="4"/>
        <rect x="330" y="218" width="150" height="4" fill="${p.ink}"/>
      </g>
      <g transform="translate(390 700) rotate(-8)">${paddle(-140, -22, 280, 44, p, { glow: 0.18 })}</g>
      <path d="M300 560q220 -160 440 -60" fill="none" stroke="${p.a}" stroke-width="4" stroke-dasharray="12 10" opacity=".7"/>
      ${ball(820, 560, 22, p, 2, -1)}
      ${splatter("pen_spl", 6, p.b, 0.4, [60, 60, 1080, 180])}
    `;
    return panel({ id: "penasihat", palette: p, body });
  },
};
