import {
  W, H, P, rng, panel, paddle, ball, burst, speed, splatter,
  perspectiveFloor, audience, crowdEyes, curtains, spotlight, bulb,
  halftone, hatch, ledger, memo, tally, sealStamp,
} from "./lib.mjs";

function dust(id, color, count = 40) {
  const r = rng(id);
  let out = `<g fill="${color}">`;
  for (let i = 0; i < count; i++) {
    out += `<circle cx="${(r() * W).toFixed(0)}" cy="${(r() * H).toFixed(0)}" r="${(0.8 + r() * 2.4).toFixed(1)}" opacity="${(0.12 + r() * 0.35).toFixed(2)}"/>`;
  }
  return out + `</g>`;
}

function ring(cx, cy, rx, ry, color, w = 3, op = 0.7, dash = "") {
  return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="${color}" stroke-width="${w}" opacity="${op}"${dash ? ` stroke-dasharray="${dash}"` : ""}/>`;
}

function chair(x, y, s, p) {
  return `<g transform="translate(${x} ${y}) scale(${s})" stroke="${p.ink}" stroke-width="4" fill="${p.third}">
    <rect x="-46" y="-92" width="92" height="14" rx="4"/>
    <rect x="-38" y="-78" width="76" height="56" rx="4"/>
    <rect x="-46" y="-22" width="92" height="12" rx="3"/>
    <path d="M-40 -10v44M40 -10v44M-32 34h64" fill="none"/>
    <path d="M-46 -92v-56q0-12 12-12h68q12 0 12 12v56" fill="none"/>
  </g>`;
}

function rubberChicken(x, y, s, p) {
  return `<g transform="translate(${x} ${y}) scale(${s})" stroke="${p.ink}" stroke-width="3">
    <ellipse cx="0" cy="0" rx="34" ry="26" fill="${p.b}"/>
    <circle cx="26" cy="-24" r="17" fill="${p.b}"/>
    <path d="M40 -22l22 6l-22 8Z" fill="${p.a}"/>
    <circle cx="30" cy="-28" r="3" fill="${p.ink}"/>
    <path d="M-28 -2q-18 10 -24 26M-22 6q-14 12 -16 28" fill="none"/>
    <path d="M-26 20l-8 16M-14 22l-2 18M0 22l4 16" fill="none"/>
  </g>`;
}

function trophy(x, y, s, p) {
  return `<g transform="translate(${x} ${y}) scale(${s})" stroke="${p.ink}" stroke-width="3.5">
    <path d="M-30 -70h60v18q0 40 -30 50q-30 -10 -30 -50Z" fill="${p.a}"/>
    <path d="M-30 -62h-16q0 30 20 34M30 -62h16q0 30 -20 34" fill="none"/>
    <rect x="-8" y="-2" width="16" height="22" fill="${p.a}"/>
    <rect x="-30" y="20" width="60" height="12" rx="3" fill="${p.third}"/>
  </g>`;
}

function cardboardBox(x, y, s, p, rot = 0) {
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})" stroke="${p.ink}" stroke-width="3" fill="${p.third}">
    <path d="M-40 18l40 -22l40 22v44l-40 22l-40 -22Z"/>
    <path d="M-40 18l40 22l40 -22M0 40v44" fill="none"/>
    <path d="M-18 8l38 20v10l-38 -20Z" fill="${p.paper}" opacity=".5"/>
  </g>`;
}

function poster(x, y, w, h, p, rot = 0) {
  return `<g transform="translate(${x} ${y}) rotate(${rot})">
    <rect width="${w}" height="${h}" fill="${p.paper}" stroke="${p.ink}" stroke-width="3"/>
    <rect x="8" y="8" width="${w - 16}" height="${h - 16}" fill="none" stroke="${p.ink}" stroke-width="1.4" opacity=".5"/>
    <circle cx="${w / 2}" cy="${h * 0.36}" r="${w * 0.18}" fill="${p.a}" opacity=".7"/>
    <rect x="${w * 0.2}" y="${h * 0.62}" width="${w * 0.6}" height="6" fill="${p.ink}" opacity=".5"/>
    <rect x="${w * 0.28}" y="${h * 0.72}" width="${w * 0.44}" height="4" fill="${p.ink}" opacity=".35"/>
  </g>`;
}

export const milestones = {
  first_run(p) {
    const body = `
      <rect x="0" y="0" width="${W}" height="660" fill="${p.ink}"/>
      ${crowdEyes(470, p, 30)}
      ${audience(560, p, 24, 1.15)}
      ${perspectiveFloor(560, p.paper, p.ink, 14)}
      ${ring(600, 690, 320, 76, p.ink, 5, 0.7)}
      ${spotlight(600, 0, 700, 26, 420, p, 0.32)}
      ${bulb(600, 84, p, 20)}
      ${dust("first_run_dust", p.a, 34)}
      ${paddle(568, 592, 64, 132, p, { glow: 0.12 })}
      <path d="M600 728l-120 34h240Z" fill="${p.a}" opacity=".14"/>
      ${splatter("first_run_spl", 5, p.a, 0.5, [80, 640, 1040, 90])}
    `;
    return panel({ id: "first_run", palette: p, body });
  },

  first_bounce(p) {
    const body = `
      <rect x="0" y="0" width="${W}" height="${H}" fill="${p.ink}"/>
      <circle cx="560" cy="400" r="500" fill="${p.third}" opacity=".55"/>
      ${halftone(`M0 0h${W}v${H}H0Z`, "first_bounce", "ink", 0.22)}
      ${burst(560, 400, 90, 520, 22, p.paper, 0.18)}
      ${speed(560, 400, 26, 120, 640, p.a, 5, 0.5, 0.6)}
      ${ball(520, 360, 148, p, 3, -0.6)}
      <g transform="translate(700 640) rotate(-24)">
        <rect x="-260" y="-40" width="520" height="80" rx="40" fill="${p.b}" stroke="${p.ink}" stroke-width="7"/>
        <rect x="-250" y="-34" width="500" height="26" rx="13" fill="${p.paper}" opacity=".55"/>
        <path d="M-40 -40l34 26l-30 24l36 30" fill="none" stroke="${p.ink}" stroke-width="7"/>
      </g>
      ${burst(640, 470, 12, 96, 14, p.a, 0.95)}
      <g stroke="${p.ink}" stroke-width="4" fill="none">
        <path d="M636 470l84 -54M622 486l-58 66M660 500l96 18"/>
      </g>
      ${splatter("first_bounce_spl", 9, p.ink, 0.45, [60, 60, 1080, 240])}
    `;
    return panel({ id: "first_bounce", palette: { ...p, paper: "#fff3dc", ink: "#1a0d08", a: "#ffd166", b: "#e63946", third: "#8b5a2b" }, body });
  },

  gong_100(p) {
    const body = `
      <rect x="0" y="0" width="${W}" height="${H}" fill="${p.ink}"/>
      ${halftone(`M0 0h${W}v${H}H0Z`, "gong_100", "ink", 0.28)}
      ${ring(820, 380, 250, 250, p.a, 10, 0.9)}
      ${ring(820, 380, 292, 292, p.b, 4, 0.6, "18 14")}
      ${ring(820, 380, 340, 340, p.a, 2, 0.35, "6 16")}
      <circle cx="820" cy="380" r="220" fill="${p.third}" stroke="${p.ink}" stroke-width="8"/>
      <circle cx="820" cy="380" r="170" fill="none" stroke="${p.a}" stroke-width="4" opacity=".7"/>
      <circle cx="820" cy="380" r="54" fill="${p.ink}"/>
      <circle cx="820" cy="380" r="26" fill="${p.a}"/>
      ${speed(820, 380, 22, 260, 560, p.a, 4, 0.55, 0.5)}
      ${audience(770, p, 20, 0.8)}
      <g transform="translate(300 470) rotate(-28)">
        ${paddle(-180, -36, 360, 72, p, { glow: 0.18 })}
      </g>
      ${splatter("gong_spl", 7, p.a, 0.5, [60, 80, 300, 600])}
    `;
    return panel({ id: "gong_100", palette: p, body });
  },

  phase_5(p) {
    const body = `
      <rect x="0" y="0" width="${W}" height="${H}" fill="${p.ink}"/>
      <g transform="translate(0 -60) skewY(-6)">
        ${perspectiveFloor(430, p.third, p.paper, 18)}
        <g stroke="${p.a}" stroke-width="4" opacity=".8">
          <path d="M0 520L460 470l120 90l-210 180Z" fill="${p.third}"/>
          <path d="M760 430L1080 500l-60 220l-250 -80Z" fill="${p.third}"/>
        </g>
        ${paddle(500, 470, 210, 46, p, { angle: 8, glow: 0.25 })}
      </g>
      ${burst(610, 500, 60, 380, 16, p.b, 0.3)}
      ${speed(610, 500, 20, 160, 520, p.b, 3, 0.6, 0.5)}
      <g fill="${p.ink}" stroke="${p.a}" stroke-width="2">
        <path d="M140 200l120 40l-30 60l-110 -30Z"/>
        <path d="M930 180l110 -20l18 70l-100 24Z"/>
      </g>
      <g stroke="${p.paper}" stroke-width="5" fill="none" opacity=".8">
        <path d="M0 690l180 -60M220 740l120 -90M880 720l160 -80"/>
      </g>
      ${halftone(`M0 0h${W}v260H0Z`, "phase5", "a", 0.35)}
    `;
    return panel({ id: "phase_5", palette: { ...p, paper: "#0e0022", ink: "#04000a", a: "#ff2bd6", b: "#00ffff", third: "#2a0a44" }, body });
  },

  phase_7(p) {
    const body = `
      <rect x="0" y="0" width="${W}" height="${H}" fill="${p.ink}"/>
      <rect x="0" y="0" width="${W}" height="${H}" fill="${p.third}" opacity=".5"/>
      <g stroke="${p.ink}" stroke-width="2" opacity=".35">
        ${Array.from({ length: 11 }, (_, i) => `<line x1="0" y1="${90 + i * 62}" x2="${W}" y2="${90 + i * 62}"/>`).join("")}
        ${Array.from({ length: 16 }, (_, i) => `<line x1="${70 + i * 74}" y1="90" x2="${70 + i * 74}" y2="${H}"/>`).join("")}
      </g>
      ${curtains(p, 0.14)}
      ${spotlight(520, 0, 690, 18, 300, p, 0.24)}
      ${bulb(520, 120, p, 18)}
      ${chair(520, 640, 1.15, p)}
      <g transform="translate(660 560) rotate(14)">
        ${paddle(-90, -22, 180, 44, p, { skin: "default" })}
      </g>
      ${dust("phase7_dust", p.a, 46)}
      <path d="M240 690h560" stroke="${p.ink}" stroke-width="4" opacity=".5"/>
      ${splatter("phase7_spl", 4, p.ink, 0.3, [120, 700, 900, 60])}
    `;
    return panel({ id: "phase_7", palette: p, body });
  },

  absurdity_150(p) {
    const body = `
      <rect x="0" y="0" width="${W}" height="${H}" fill="${p.ink}"/>
      <path d="M600 0h260l-90 800H470Z" fill="${p.a}" opacity=".22"/>
      <path d="M600 0h90l-30 800H520Z" fill="${p.a}" opacity=".3"/>
      ${halftone(`M0 0h${W}v${H}H0Z`, "absurd", "ink", 0.3)}
      ${speed(600, 760, 22, 200, 760, p.a, 5, 0.32, 0.55)}
      <g transform="translate(600 430) rotate(-8)">
        ${paddle(-220, -48, 440, 96, p, { skin: "glarp", glow: 0.22 })}
      </g>
      ${rubberChicken(250, 240, 1.5, p)}
      ${rubberChicken(950, 300, 1.1, p)}
      <g transform="translate(860 180) rotate(18)">
        <rect x="-38" y="-38" width="76" height="76" rx="10" fill="${p.paper}" stroke="${p.ink}" stroke-width="4"/>
        <g fill="${p.ink}"><circle cx="-14" cy="-14" r="7"/><circle cx="14" cy="14" r="7"/><circle cx="14" cy="-14" r="7"/><circle cx="-14" cy="14" r="7"/></g>
      </g>
      ${cardboardBox(220, 160, 1, p, -12)}
      <g transform="translate(1040 520)">
        <ellipse cx="0" cy="0" rx="46" ry="58" fill="${p.b}" stroke="${p.ink}" stroke-width="3"/>
        <path d="M0 58l-8 44" stroke="${p.ink}" stroke-width="3"/>
        <ellipse cx="0" cy="0" rx="20" ry="30" fill="${p.paper}" opacity=".4"/>
      </g>
      ${audience(790, p, 18, 0.7)}
      ${splatter("absurd_spl", 8, p.a, 0.55, [60, 60, 1080, 200])}
    `;
    return panel({ id: "absurdity_150", palette: { ...p, a: "#ffd700", b: "#ff3333" }, body });
  },

  fusion_first(p) {
    const body = `
      <rect x="0" y="0" width="${W}" height="${H}" fill="${p.paper}"/>
      <circle cx="600" cy="400" r="330" fill="${p.ink}"/>
      <circle cx="600" cy="400" r="330" fill="none" stroke="${p.ink}" stroke-width="8"/>
      ${halftone(`M270 70h660v660H270Z`, "fusion", "ink", 0.16)}
      <g fill="none" stroke="${p.paper}" stroke-width="3" opacity=".7">
        <circle cx="600" cy="400" r="270"/><circle cx="600" cy="400" r="200" stroke-dasharray="14 12"/>
        <path d="M600 150l220 140v240L600 670L380 530V290Z"/>
        <path d="M600 190l180 115v210L600 630L420 515V305Z" stroke-dasharray="8 10"/>
      </g>
      ${burst(600, 400, 90, 440, 20, p.b, 0.42)}
      <circle cx="470" cy="360" r="104" fill="${p.paper}" stroke="${p.ink}" stroke-width="6"/>
      <circle cx="470" cy="360" r="58" fill="${p.b}" stroke="${p.ink}" stroke-width="4"/>
      <circle cx="730" cy="450" r="88" fill="${p.paper}" stroke="${p.ink}" stroke-width="6"/>
      <circle cx="730" cy="450" r="44" fill="${p.a}" stroke="${p.ink}" stroke-width="4"/>
      ${speed(600, 400, 22, 70, 430, p.paper, 5, 0.7, 0.5)}
      <g transform="translate(600 400)">
        <circle r="56" fill="${p.paper}" stroke="${p.ink}" stroke-width="6"/>
        <path d="M0 -36l32 18v36L0 36L-32 18V-18Z" fill="${p.a}" stroke="${p.ink}" stroke-width="4"/>
        <circle cx="-40" cy="22" r="10" fill="${p.b}" stroke="${p.ink}" stroke-width="3"/>
        <circle cx="38" cy="-32" r="8" fill="${p.a}" stroke="${p.ink}" stroke-width="3"/>
      </g>
      <g stroke="${p.ink}" stroke-width="6" fill="none">
        <path d="M520 320l36 -28l30 34M680 440l36 30l28 -34"/>
      </g>
      <g fill="${p.ink}" opacity=".55">
        ${Array.from({ length: 10 }, (_, i) => `<circle cx="${100 + (i * 137) % 1000}" cy="${100 + (i * 89) % 600}" r="${5 + (i % 4) * 4}"/>`).join("")}
      </g>
      ${splatter("fusion_spl", 10, p.a, 0.6, [80, 80, 1040, 220])}
    `;
    return panel({ id: "fusion_first", palette: { paper: "#f3e6cf", ink: "#0b0710", a: "#ff2bd6", b: "#00ffff", third: "#7a4a12" }, body });
  },

  torment_25(p) {
    const body = `
      <rect x="0" y="0" width="${W}" height="${H}" fill="${p.ink}"/>
      <circle cx="600" cy="420" r="360" fill="${p.third}" opacity=".8"/>
      ${halftone(`M240 60h720v680H240Z`, "torment", "ink", 0.4)}
      ${speed(600, 420, 30, 120, 560, p.a, 3, 0.55, 0.35)}
      ${audience(760, p, 24, 1.05)}
      <g transform="translate(600 470) rotate(-4)">
        ${paddle(-230, -50, 460, 100, p, { skin: "broken" })}
      </g>
      <g stroke="${p.a}" stroke-width="5" fill="none" opacity=".9">
        <path d="M380 450l70 34l-40 30M820 470l-68 -40l30 -28"/>
      </g>
      ${tally(120, 640, 25, p, 20)}
      ${splatter("torment_spl", 12, p.a, 0.4, [80, 60, 1040, 140])}
      ${splatter("torment_spl2", 8, p.ink, 0.5, [80, 600, 1040, 160])}
    `;
    return panel({ id: "torment_25", palette: { ...p, a: "#ff3333", b: "#ffd700", third: "#3a0008" }, body });
  },

  run_50(p) {
    const body = `
      <rect x="0" y="0" width="${W}" height="${H}" fill="${p.ink}"/>
      <rect x="0" y="0" width="${W}" height="${H}" fill="${p.third}" opacity=".45"/>
      ${poster(70, 90, 190, 250, p, -3)}
      ${poster(290, 60, 160, 210, p, 4)}
      ${poster(940, 100, 180, 240, p, 5)}
      <g stroke="${p.ink}" stroke-width="6" fill="${p.third}">
        <rect x="120" y="520" width="960" height="18"/>
        <rect x="120" y="618" width="960" height="18"/>
        <path d="M160 538v80M1040 538v80M160 636v90M1040 636v90" fill="none"/>
      </g>
      ${trophy(260, 520, 1.15, p)}
      ${trophy(400, 520, 0.9, p)}
      ${trophy(520, 520, 0.7, p)}
      <g transform="translate(790 470) rotate(-6)">
        ${paddle(-180, -38, 360, 76, p, { skin: "default", glow: 0.16 })}
        <g transform="translate(0 52)">
          <circle r="26" fill="${p.a}" stroke="${p.ink}" stroke-width="3"/>
          <path d="M-9 -12h18v16l-9 10l-9 -10Z" fill="${p.ink}"/>
        </g>
      </g>
      ${spotlight(790, 0, 700, 20, 280, p, 0.2)}
      ${dust("run50_dust", p.a, 36)}
      ${splatter("run50_spl", 5, p.ink, 0.35, [60, 700, 1080, 80])}
    `;
    return panel({ id: "run_50", palette: p, body });
  },

  true_fusion(p) {
    const body = `
      <rect x="0" y="0" width="${W}" height="${H}" fill="#f7f7f2"/>
      <g fill="none" stroke="${p.ink}" stroke-width="3">
        ${Array.from({ length: 9 }, (_, i) => `<rect x="${180 - i * 18}" y="${210 - i * 16}" width="${840 + i * 36}" height="${380 + i * 32}" opacity="${(0.55 - i * 0.05).toFixed(2)}"/>`).join("")}
      </g>
      <g fill="none" stroke="${p.a}" stroke-width="4" opacity=".85">
        <path d="M600 120L980 700H220Z"/><path d="M600 680L220 120h760Z" opacity=".45"/>
        <circle cx="600" cy="410" r="210"/><circle cx="600" cy="410" r="150" stroke-dasharray="12 10"/>
      </g>
      ${paddle(370, 372, 460, 76, p, { glow: 0.2 })}
      <path d="M600 250l30 40l-30 40l-30 -40Z" fill="${p.ink}"/>
      <path d="M600 560l44 60l-44 60l-44 -60Z" fill="${p.b}"/>
      <ellipse cx="600" cy="410" rx="16" ry="120" fill="${p.ink}"/>
      <g stroke="${p.ink}" stroke-width="6" fill="none">
        <path d="M540 330l-40 -60M660 330l40 -60M540 490l-40 60M660 490l40 60"/>
      </g>
      ${splatter("trufusion_spl", 6, p.ink, 0.25, [80, 80, 1040, 100])}
    `;
    return panel({ id: "true_fusion", palette: { paper: "#f7f7f2", ink: "#0a0a0c", a: "#00ffff", b: "#ff2bd6", third: "#d9d9d9" }, body });
  },
};
