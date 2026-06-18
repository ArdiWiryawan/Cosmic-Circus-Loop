# The Cosmic Circus Loop 🎪
> **An Absurd Cosmic Gameshow Roguelike Arcade Game**

[![Status](https://img.shields.io/badge/Status-Prototype_/_Under_Development-yellow?style=for-the-badge)](https://github.com/ArdiWiryawan/Cosmic-Circus-Loop)
[![Language](https://img.shields.io/badge/Stack-JavaScript_/_HTML5_/_CSS3-orange?style=for-the-badge&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Documentation](https://img.shields.io/badge/Specs-GDD_Available-blue?style=for-the-badge)](GDD.md)

Welcome to the **Cosmic Circus Loop**, an absurd roguelike arcade gameshow. Bounce meatballs with ice cream sticks to survive and entertain a crowd of 700 billion demanding alien spectators. Mix legendary power-ups, choose unique arenas, and turn every defeat into progress.

---

## 🌟 Key Features

### ⏱️ 1. 7 Phases of Chaos
- A progressive difficulty timer that accelerates alien demands and arena obstacles.
- Dynamic crowd reactions that intensify as you survive, culminating in high-stakes phase modifiers.
- Custom game modes: **Chaos Mode** for active challenges, or **Zen Mode** for stress-free arcade bouncing.

### ⚡ 2. 30+ Power-Ups & 3-Tier Fusion System
- Upgrade your paddle and balls dynamically as you play.
- Combine distinct power-ups to unlock hidden **Ultimate Forms**, each evolving up to Level 3.
- Uncover secret recipes and custom equipment modifiers.

### 🏟️ 3. Arenas & Paddles with Personality
- **6 Playable Arenas**: Each featuring distinct background music tracks, speed factors, and unique environmental hazards.
- **6 Playable Sticks**: Bouncing paddles with unique character backgrounds and mastery scaling (e.g., Glarp the Rebel, the Bent Spoon, the Manager's Cane).
- **Relics & Fate Cards**: Pre-equip passive rules-bending Relics or trigger single-use Fate Cards during runs.

---

## 🛠️ Tech Stack
- **Game Engine**: Custom Vanilla HTML5 Canvas Engine
- **Logic**: Pure Object-Oriented JavaScript (ES6+)
- **Styling**: Modern CSS3 grid systems & absolute positioning layouts
- **Specification Document**: Game Design Document ([GDD.md](GDD.md)) included in the repository

---

## 📂 Project Structure
```text
Cosmic-Circus-Loop/
├── src/             # Core game logic and system components
├── assets/          # Sprites, audio files, and mockups
├── GDD.md           # Game Design Document (GDD)
└── README.md        # Project overview and installation guide
```

---

## 🚀 Running Locally
Because this game utilizes external audio tracks and sprite assets, launching a local web server is recommended:

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

## 📄 License
This project is open-source and licensed under the [MIT License](LICENSE).
