# The Cosmic Circus Loop 🎪
> **An Absurd Cosmic Gameshow Roguelike Arcade Game**

[![Status](https://img.shields.io/badge/Status-Playable_End--to--End-brightgreen?style=for-the-badge)](https://github.com/ArdiWiryawan/Cosmic-Circus-Loop)
[![Language](https://img.shields.io/badge/Stack-JavaScript_/_HTML5_/_CSS3-orange?style=for-the-badge&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Documentation](https://img.shields.io/badge/Specs-GDD_Available-blue?style=for-the-badge)](docs/game-design/)

Welcome to the **Cosmic Circus Loop**, an absurd roguelike arcade gameshow. Bounce meatballs with ice cream sticks to survive and entertain a crowd of 700 billion demanding alien spectators. Mix legendary power-ups, choose unique arenas, and turn every defeat into progress.

---

## 🌟 Key Features

### ⏱️ 1. 7 Phases of Chaos
- A progressive difficulty timer that accelerates alien demands and arena obstacles.
- Dynamic crowd reactions that intensify as you survive, culminating in high-stakes phase modifiers.
- Custom game modes: **Chaos Mode** for active challenges, or **Zen Mode** for stress-free arcade bouncing.

### ⚡ 2. 30 Power-Ups, 36 Fusions, 3-Tier Evolution
- Upgrade your paddle and balls dynamically as you play.
- Combine distinct power-ups to unlock hidden **Ultimate Forms**, evolving through levels 1 to 5.
- Every power-up tag is wired to real gameplay. Run `node scripts/audit-powerups.mjs` to verify.
- **Premium card presentation**: rarity tiers (Common → Legendary, plus Illegal and Fate), type badges, real artwork, accurate stat chips, and hover / focus / selected / disabled / locked / upgrade / MAX states.

### 🏟️ 3. Arenas & Paddles with Personality
- **7 Playable Arenas**: Each featuring distinct background music tracks, speed factors, and unique environmental hazards.
- **7 Playable Sticks**: Bouncing paddles with unique character backgrounds and mastery scaling (e.g., Glarp the Rebel, the Bent Spoon, the Manager's Cane).
- **Relics & Fate Cards**: Pre-equip passive rules-bending Relics or trigger single-use Fate Cards during runs.

### 👹 4. 21 Mini Bosses + 1 Final Boss
- Each arena has three guardians with distinct mechanics: curtains, seals, spotlights, erase beams, whispers, gravity, and more.
- Defeat all 21 to open the **Final Boss "Manajer"**: three acts, nine HP, five hazard types, and the secret ending *"TIRAI DITUTUP"*.

### 📖 5. Comic Archive
- **34 illustrated achievements**, one original comic panel per milestone: first run, 100th GONG, every mini boss, the Manager, and the secret endings.
- Full-viewport gallery with chapter filters, collection progress, rarity badges, locked/unlocked states, detail view with story and quote, and unlock toasts.
- Legacy lore entries and boss dossiers are preserved inside a collapsible document section.

### 🎭 6. Meta-Progression & Secrets
- Collect Fame, raise Arena and Stick mastery levels, and unlock hidden narrative moments.
- Micro-Twists, Plot Twists, special guest aliens, the Death Roulette, and secrets only the most persistent players will find.

---

## 🛠️ Tech Stack
- **Game Engine**: Custom Vanilla HTML5 Canvas Engine
- **Logic**: Pure Object-Oriented JavaScript (ES6+)
- **Styling**: Modern CSS3 grid systems & absolute positioning layouts
- **Art**: Procedural SVG generated from code — no external dependencies, no build step
- **Specification Document**: Game Design Document in [`docs/game-design/`](docs/game-design/)

---

## 📂 Project Structure
```text
Cosmic-Circus-Loop/
├── index.html                      # The entire game (engine, UI, logic)
├── assets/
│   ├── art/
│   │   ├── powerups/               # 30 power-up icons
│   │   ├── illegal/                # 5 illegal cards
│   │   ├── fate/                   # 4 fate cards
│   │   ├── modifiers/              # 8 curse modifiers
│   │   ├── bosses/                 # 21 mini bosses + 3 Manager phases
│   │   ├── ui/                     # 5 final-boss hazard icons
│   │   ├── comic/                  # 34 comic archive panels + manifest
│   │   └── meta/                   # 22 shop assets: 9 skins, 7 themes, 6 relics
│   └── audio/                      # Music and SFX
├── scripts/
│   ├── generate-art.mjs            # Builds the 76 card/boss/UI SVGs
│   ├── audit-powerups.mjs          # Verifies every tag has a real effect
│   ├── comic/                      # Comic panel generator + integrity check
│   └── meta/                       # Shop artwork generator + integrity check
├── docs/game-design/               # GDD, boss bible, art direction, UI flow
└── legacy/                         # Previous GitHub version
```

---

## 🚀 Running Locally
Because this game utilizes external audio tracks and assets, launching a local web server is recommended:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ArdiWiryawan/Cosmic-Circus-Loop.git
   cd Cosmic-Circus-Loop
   ```
2. **Start a local development server:**
   *Using Node.js:*
   ```bash
   npx serve .
   ```
   *Using Python:*
   ```bash
   python -m http.server 8000
   ```
3. Open `http://localhost:8000` or `http://localhost:3000` in your web browser.

---

## 🖼️ Regenerating Assets

All artwork is authored as procedural SVG, so it can be rebuilt at any time:

```bash
node scripts/generate-art.mjs   # 76 card, boss, and UI assets
node scripts/comic/generate.mjs # 34 comic panels + manifest
node scripts/comic/verify.mjs   # art <-> achievement mapping, format, size
node scripts/meta/generate.mjs  # 22 shop assets (skins, themes, relics)
node scripts/meta/verify.mjs    # every shop item has artwork
node scripts/audit-powerups.mjs # every power-up/fusion/illegal tag has an effect
```

Art direction for the comic archive is documented in
[`docs/game-design/VISUAL & INTERAKSI/COMIC ARCHIVE ART DIRECTION.md`](docs/game-design/VISUAL%20%26%20INTERAKSI/COMIC%20ARCHIVE%20ART%20DIRECTION.md).

> **Honest note:** no image-generation service is used. Every panel is hand-authored
> vector art generated from code — not model output. This keeps composition and character
> consistency under direct control, but it is not raster painting.

---

## 📄 License
This project is open-source and licensed under the [MIT License](LICENSE).
