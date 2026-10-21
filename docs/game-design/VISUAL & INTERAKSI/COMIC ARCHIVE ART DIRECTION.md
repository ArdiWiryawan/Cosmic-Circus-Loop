# COMIC ARCHIVE — INTERNAL ART DIRECTION & PRODUCTION BIBLE

> Status: production document. Source of truth for every `assets/art/comic/*.svg`.
> Derived from the shipped implementation in `index.html` (canvas sprites, arena backdrops,
> palette variables). Nothing here is invented from the game's title.

---

## 0. Production reality

No raster image-generation service is available in this environment. All artwork is authored
as **procedural vector comic panels** (SVG) by `scripts/comic/*`. This is a deliberate,
honest medium choice — not an AI-photo substitute. The target look is **risograph / alternative
comic screenprint**, which vector art reproduces faithfully: flat spot colours, hard ink,
visible halftone, deliberate misregistration.

Each panel is a self-contained composition. No panel is a recoloured copy of another: camera
height, subject scale, horizon, light direction and panel rhythm all change per achievement.

---

## 1. What the game actually looks like (visual evidence)

| Element | Shipped design cue (must be preserved) |
|---|---|
| Protagonist "Atlet" | A **paddle / stick**, horizontal rounded bar. Never a human. Wood-cream default, special skins (spoon, remote, frozen fish, manager wand, broken stick). |
| Ball | Cream "bakso" sphere, small, with a motion trail. Functions as a singularity. |
| Manajer | Tall black robe, triangular shoulders, gold-trimmed collar, **one glowing eye**, floating paper seals, phase 3 = red crown of eyes. No legs visible. |
| Mini bosses | Geometric/abstract: lantern box, toy blocks, cheese triangle, racer robot, twin speakers, silhouette phantom, ghost fragments, ledger, whisper rings, lake mass with tentacles, many-lidded eye, chef hat, tongue, ooze, diva triangle, review card, mimic paddle, memo storm, calculator, advisor hand. |
| Arenas | Piknik (red/ivory checker), Neon (magenta/cyan grid sun), Retak (cardboard + glitch lines), Lovecraft (swamp green), Kuali (kitchen fire), Panggung (maroon/gold theatre), Manajer (backstage red curtain). |
| Palette | `--neon-cyan #00ffff`, `--neon-magenta #ff00ff`, `--alien-green #39ff14`, `--blood-red #ff3333`, `--gold #ffd700`, `--cardboard #c4a47a`, `--paper #f5deb3`, void `#0a0a0c`. |
| Texture | CRT scanlines, halftone, cardboard fibre, paper grain. |
| Type | VT323 monospace in UI — **never baked into artwork**. |

**Hard rule:** the game renders all titles, rarity, badges and captions. Artwork contains no
typography except abstract ink marks.

---

## 2. Illustration style

- **Genre:** 1990s alternative comic / risograph screenprint. Heavy brush ink, flat spot colour,
  Ben-Day halftone, one-colour misregistration.
- **Line:** 3–5 px ink at 1200×800, variable weight; thicker on silhouettes, thinner on interior
  detail. Hatching only inside shadow shapes.
- **Shading:** two-tone. Flat shadow shape + halftone gradient. No soft photographic gradients.
- **Detail budget:** one hero subject + one supporting shape + environment. Backgrounds are
  suggested with 3–5 shapes, not rendered fully.
- **Forbidden:** generic AI glow, lens flares, random particles, rainbow gradients, text, UI chrome.

## 3. Colour & light

Each panel uses **paper + ink + 2 spot colours** (max 4 + paper). One dominant light source.

| Chapter | Paper | Ink | Spot A | Spot B | Light |
|---|---|---|---|---|---|
| Ritual | `#f1e2c6` | `#0b0710` | `#ffd700` | `#ff3333` | single overhead bulb |
| Piknik | `#fff3dc` | `#1a0d08` | `#e63946` | `#ffd166` | hard afternoon sun |
| Neon | `#0e0022` | `#04000a` | `#00ffff` | `#ff2bd6` | neon rim / grid glow |
| Retak | `#c4a47a` | `#0a0a0c` | `#00ffff` | `#ff00ff` | CRT scan / broken monitor |
| Lovecraft | `#dcefcf` | `#020604` | `#39ff14` | `#0b3d2e` | underlight from black water |
| Kuali | `#f6e2bf` | `#1a0b02` | `#ff8a1e` | `#7fe36b` | fire from below |
| Panggung | `#f7e8cf` | `#2b0010` | `#ffd700` | `#ff2bd6` | footlights / follow spot |
| Manajer | `#f6e8c8` | `#08060a` | `#ff3333` | `#ffd700` | hard side key + red bounce |
| Rahasia | `#0a0a0c` | `#000000` | `#00ffff` | `#ffffff` | monitor / void |

Rim light is a 6–10 px accent stroke on the shadow side, never a glow filter.

## 4. Character consistency sheet

### Atlet (paddle)
Horizontal rounded bar, ratio ≈ 8:1. Cream wood body, thin ink outline, one darker underside.
No eyes, no limbs. In hero shots it is lit from one end; in defeat it is cracked/tilted.
Skins: default wood, Glarp (green goo), spoon (silver, bent), remote (dark + 4 coloured buttons),
broken stick (split centre), frozen fish (pale blue, tail), manager wand (dark + gold + violet orb).

### Bola
Radius 18–26 units. Cream fill, ink crescent shadow, one highlight dot. Trail = 3 tapering
streaks. Never drawn with a face.

### Manajer
Body: tall isosceles robe, shoulders 2.2× head width, hem dissolves into ink. Collar: gold
chevron. Head: black egg, single horizontal eye, bone sclera, gold/red iris. Seals: small paper
rectangles orbiting at chest height. Phase 3: four extra eyes on a red crown arc.

### Boss silhouettes
Every boss keeps its gameplay silhouette key:
Lumi = lantern box with dripping eyes; Pipo = stacked toy blocks; Kapten Keju = cheese wedge
with holes + golden ant; Overclock = low racer wedge with light bar; DJ Synth = twin speaker
rings; Neon Phantom = tapered hood silhouette; Echo = three ghost boxes; Error404 = blank ghost
box; Archivist = open ledger slab; Whisperer = concentric broken rings; Deep One = low mass +
five tentacles; Unseeing Eye = wide ellipse + many lids; Chef Ragu = toque + apron slab;
Taster = tongue ellipse; Ramuan = wobbling ooze; Prima Donna = tall triangle gown + head orb;
Critic = rectangular placard; Understudy = pale copy paddle; Sekretaris = memo stack;
Auditor = calculator slab; Penasihat = gloved hand + contract.

## 5. Composition grammar

Six panel types, rotated so no two adjacent achievements feel the same:

1. **LOW HERO** — camera below subject, horizon low, subject dominates 65%, speed lines up.
2. **EXTREME CLOSE** — object fills frame, impact at optical centre, environment cropped out.
3. **WIDE STAGE** — subject small, environment tells the story, strong negative space.
4. **POV** — first-person from the paddle, threat looms, foreground blur shapes.
5. **SILHOUETTE** — backlit, subject pure ink against spot colour, minimal interior detail.
6. **DIAGONAL ACTION** — tilted horizon 8–14°, motion across the frame corner-to-corner.

Rules:
- Focal point on a thirds intersection, never dead centre except EXTREME CLOSE.
- Keep the outer 8% free of critical detail (safe crop for card + detail view).
- One caption gutter strip reserved at top-left; the game may overlay metadata there.
- Thumbnail test: the panel must read as a distinct shape at 160 px wide.

## 6. Effects

- **Impact:** 12–18 radial ink wedges + one solid starburst, no blur.
- **Energy:** concentric broken rings, flat.
- **Motion:** tapered speed streaks parallel to travel.
- **Atmosphere:** halftone density, not fog gradients.
- **Damage:** cracked ink lines + paper-white chips.
- **Ink splatter:** 5–9 hard-edged blobs, clustered off-focal.

## 7. Format & pipeline

- ViewBox `0 0 1200 800` (3:2). Card shows 3:2; detail view shows 3:2; no destructive crop.
- File: `assets/art/comic/<achievement-id>.svg`.
- Every file ≤ 14 KB, no external refs, no fonts, `role="img"` + `<title>`.
- Generated by `node scripts/comic/generate.mjs`; manifest emitted to
  `assets/art/comic/manifest.json` for integrity checking.
- Artwork is mapped to achievement IDs through the single `COMIC_ACHIEVEMENTS` array in
  `index.html`. No second mapping table.

---

## 8. Achievement art briefs

Legend: **Type** = panel grammar. **Moment** = the single instant frozen.

### Ritual chapter

| ID | Title | Type | Moment / composition |
|---|---|---|---|
| `first_run` | Panggung Menyala | WIDE STAGE | Empty circus ring, one bulb snapping on, stick standing upright in dust, audience eyes as ink dots in the dark. |
| `first_bounce` | Kontak Pertama | EXTREME CLOSE | Ball crushing into stick, 16 ink wedges, wood splinters, single gold spark at contact. |
| `gong_100` | Gong Keseratus | LOW HERO | Giant gong filling frame, stick silhouette mid-swing, shockwave rings bending the audience. |
| `phase_5` | Bencana Kelima | DIAGONAL ACTION | Arena floor splitting, checker tiles falling, tiny stick holding the last tile. |
| `phase_7` | Istirahat Terakhir | WIDE STAGE | Backstage chair, single hanging bulb, stick leaning, curtain edge, dust motes. |
| `absurdity_150` | Kekonyolan Mutlak | LOW HERO | Stick ascending in a column of gold light, rubber chicken and floating props orbiting. |
| `fusion_first` | Alkimia Pertama | EXTREME CLOSE | Two power-up orbs colliding, splitting into a third, ink explosion, alchemical ring. |
| `torment_25` | Dua Puluh Lima Luka | SILHOUETTE | Cracked stick under a jeering audience, 25 tally marks carved into the frame. |
| `run_50` | Veteran Sirkus | WIDE STAGE | Trophy shelf, faded posters, stick with medals, single spotlight, worn ring. |
| `true_fusion` | Fusi Sejati | POV | White void, forbidden geometry, stick reflected infinitely, one black tear in reality. |

### Boss chapter (21)

| ID | Type | Moment / composition |
|---|---|---|
| `lumi` | WIDE STAGE | Lantern grandmother floating over a flooded ring, tears becoming ball-sized droplets, stick tiny below. |
| `pipo` | DIAGONAL ACTION | Toy-block creature juggling neon blocks, stick dodging, blocks trailing primary colours. |
| `kapten_keju` | LOW HERO | Cheese wedge boss with golden ant shield, stick striking the shield, cheese holes as spot lights. |
| `overclock` | DIAGONAL ACTION | Low racer robot drifting, speed streaks, stick and ball caught in the slipstream. |
| `dj_synth` | EXTREME CLOSE | Twin speaker cones blasting a visible waveform that bends the ball's trail. |
| `neon_phantom` | SILHOUETTE | Hooded phantom splitting into three afterimages across a neon grid, stick choosing the real one. |
| `echo` | WIDE STAGE | Three floating ghost boxes, one lit, two grey, stick aiming at the lit one, broken data rain. |
| `error404` | EXTREME CLOSE | Blank ghost box opening a white erase beam, ball half-deleted into pixels. |
| `archivist` | POV | Open ledger filling the view, pages listing deaths, stick reflected in the page gutter. |
| `whisperer` | SILHOUETTE | Concentric broken rings in darkness, stick silhouette at centre, whispered ink marks spiralling. |
| `deep_one` | LOW HERO | Black lake surface, five tentacles rising, stick on a floating plank, green underlight. |
| `unseeing_eye` | EXTREME CLOSE | Giant ellipse eye with many lids, stick reflected in the pupil, one lid closing. |
| `chef_ragu` | WIDE STAGE | Kitchen arena, toque boss over a boiling pot, ingredients arcing, stick as a tasting spoon. |
| `taster` | EXTREME CLOSE | Long tongue stealing colour from the ball, colour draining to grey along the tongue. |
| `ramuan_hidup` | DIAGONAL ACTION | Ooze hand rising from a puddle, grabbing at the ball, stick slipping on slime. |
| `prima_donna` | LOW HERO | Diva triangle gown on a maroon stage, aria rings, stick as a conductor's baton. |
| `critic` | WIDE STAGE | Enormous review placard stamped two stars, stick small under it, spotlight harsh. |
| `understudy` | SILHOUETTE | Pale copy paddle looming behind the real stick, mirror split, stage dust. |
| `sekretaris` | POV | Storm of red memo papers filling the view, stick buried, one paper with an ink stamp. |
| `auditor` | DIAGONAL ACTION | Calculator slab raining fines, stick dodging ledgers, gold coins scattering. |
| `penasihat` | EXTREME CLOSE | Gloved hand offering a contract, stick at the signature line, red thread binding. |

### Secret chapter (3)

| ID | Type | Moment / composition |
|---|---|---|
| `manajer` | LOW HERO | Manajer revealed behind a torn curtain, single eye lit, seals orbiting, stick tiny at the foot of the stage. |
| `true_ending` | WIDE STAGE | Theatre curtains closing on the stick's silhouette, gold footlights dying, one empty chair. |
| `glitch` | POV | CRT reality tearing, scanlines displaced, stick duplicated across RGB channels, void beyond. |
