# 🎪 The Cosmic Circus Loop

**Game arkade roguelike absurd bertema gameshow kosmik.**  
Pantulkan bakso dengan stik es krim di hadapan 700 miliar penonton alien yang terus menyiksa. Bentuk kombinasi Power-Up legendaris, pilih Arena dan Stick berjiwa, dan ubah setiap kekalahan menjadi kemajuan.

---

## ✨ Fitur Utama

- **7 Fase Chaos** – Timer siksaan makin cepat, penonton makin brutal, hingga "PENONTON TURUN KE ARENA!"
- **30+ Power-Up & Sistem Fusi 3 Level** – Gabungkan dua Power-Up menjadi Ultimate Form, lalu berevolusi hingga level 3. Semua kombinasi dirahasiakan—temukan sendiri!
- **6 Arena & 6 Stick dengan Kepribadian** – Setiap Arena punya musik dan efek unik. Setiap Stick punya cerita, mastery, dan kemampuan spesial (Glarp si Pemberontak, Sendok Bengkok, Tongkat Manajer...).
- **21 Mini Boss + 1 Final Boss** – Setiap arena punya tiga penjaga dengan mekanik unik (tirai, segel, sorot, hapus, bisikan, gravitasi…). Selesaikan semuanya untuk membuka **Final Boss "Manajer"** — tiga babak, sembilan HP, dan ending rahasia *"TIRAI DITUTUP"*.
- **Kartu Power-Up Premium** – Rarity (Umum→Legenda), tipe, artwork SVG, statistik akurat, serta state *hover / focus / dipilih / terkunci / tidak mampu / bisa di-upgrade / MAX*.
- **Comic Archive** – 34 panel ilustrasi komik orisinal, satu cerita visual per pencapaian: run pertama, 100 GONG, tiap mini boss, Manajer, dan ending rahasia. Galeri full-screen dengan filter bab, progress koleksi, detail view, state terkunci/terbuka, dan toast unlock.
- **Relik & Kartu Nasib** – Equip Relik pengubah aturan sebelum run, dan temukan Kartu Nasib sekali pakai di tengah kekacauan.
- **Dua Mode** – Mode *Chaos* untuk teror penuh, Mode *Zen* untuk bersantai tanpa siksaan.
- **Meta-Progresi** – Kumpulkan Poin Ketenaran, naikkan Level Mastery Arena/Stick, dan buka momen cerita rahasia.
- **Kejutan Tanpa Henti** – Mikro-Twist, Plot Twist, alien tamu spesial, Roulette Kematian, dan rahasia yang hanya bisa ditemukan oleh pemain paling gigih.

---

## 🖼️ Aset

Seluruh artwork kartu, potret boss, dan ikon bahaya final boss dibuat **prosedural** oleh `scripts/generate-art.mjs` (SVG, tanpa dependensi eksternal). Jalankan ulang dengan:

```bash
node scripts/generate-art.mjs
```

- `assets/art/powerups/` — 30 Power-Up
- `assets/art/illegal/` — 5 Kartu Ilegal
- `assets/art/fate/` — 4 Kartu Nasib
- `assets/art/modifiers/` — 8 Modifier Kutukan
- `assets/art/bosses/` — 21 Mini Boss + 3 varian Manajer
- `assets/art/ui/` — 5 ikon bahaya final boss
- `assets/art/comic/` — **34 panel Comic Archive** (1200×800, risograph comic)

Panel komik dibuat oleh generator terpisah dan diverifikasi integritasnya:

```bash
node scripts/comic/generate.mjs   # tulis 34 SVG + manifest
node scripts/comic/verify.mjs     # cek mapping achievement <-> art, format, ukuran
node scripts/audit-powerups.mjs   # cek setiap tag Power-Up/Fusi/Ilegal punya efek nyata
```

Panduan art direction lengkap: [`docs/game-design/VISUAL & INTERAKSI/COMIC ARCHIVE ART DIRECTION.md`](docs/game-design/VISUAL%20%26%20INTERAKSI/COMIC%20ARCHIVE%20ART%20DIRECTION.md).

> **Catatan jujur:** tidak ada layanan image-generation di environment ini. Seluruh panel
> adalah **ilustrasi vektor prosedural** (SVG) yang ditulis tangan lewat generator — bukan
> hasil model gambar. Ini memberi kontrol komposisi dan konsistensi karakter, tetapi bukan
> lukisan raster/airbrush.

---

## 📌 Status

🟢 **Playable end-to-end.** Loop inti, 7 fase, 21 mini boss, final boss, toko, kartu nasib, fusi, relik, dan ending rahasia semuanya berjalan.

Sisa pekerjaan yang diketahui ada di bagian *Remaining Gaps* laporan audit internal.

---

## 🎪 Kredit

Game oleh **[Ardi Wiryawan]**.  
Dokumen desain lengkap tersedia di [GDD.md](GDD.md).
