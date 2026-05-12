Berikut adalah kode Markdown lengkap yang siap kamu upload ke GitHub sebagai dokumentasi resmi *The Cosmic Circus Loop*. Dokumen ini mencakup seluruh visi final game, termasuk semua sistem, mekanik, dan sentuhan naratif yang telah kita sempurnakan.

---

```markdown
# 🎪 The Cosmic Circus Loop — Game Design Document (Final)

> **"Sebuah ritual kosmik di balik tawa. Sebuah panggung tempat stik es krim dan bakso menjadi legenda."**

---

## Daftar Isi
1. [Deskripsi Singkat](#1-deskripsi-singkat)
2. [Pilar Desain](#2-pilar-desain)
3. [Core Game Loop](#3-core-game-loop)
4. [Ekonomi Game](#4-ekonomi-game)
5. [Sistem Fase & Siksaan](#5-sistem-fase--siksaan)
6. [Katalog Arena (Maps)](#6-katalog-arena-maps)
7. [Katalog Stick (Paddles)](#7-katalog-stick-paddles)
8. [Sistem Relik & Kartu Nasib](#8-sistem-relik--kartu-nasib)
9. [Sistem Alkemi Power-Up & Fusi](#9-sistem-alkemi-power-up--fusi)
10. [Mode Permainan](#10-mode-permainan)
11. [Momen Naratif & Cerita](#11-momen-naratif--cerita)
12. [Rahasia Sang Kreator](#12-rahasia-sang-kreator)
13. [Struktur Proyek](#13-struktur-proyek)
14. [Penutup](#14-penutup)

---

## 1. Deskripsi Singkat

**The Cosmic Circus Loop** adalah game arkade roguelike absurd bertema *gameshow kosmik*. Pemain mempertahankan bola (bakso) dengan paddle (stik es krim) di hadapan 700 miliar penonton alien. Mereka tidak hanya menonton—mereka menyiksa. Semakin lama bertahan, semakin kacau, lucu, dan personal permainan ini.

**Twist Utama:** Setiap 3 pantulan, **GONG** berbunyi dan pemain bisa membeli Power-Up. Dua Power-Up yang cocok akan **berfusi** menjadi **Ultimate Form** yang bertahan hingga bola mati. Ultimate Form bisa berevolusi hingga Level 3. Semua ini terjadi di atas Arena dan dengan Stick yang memiliki jiwa, cerita, dan level mastery masing-masing.

---

## 2. Pilar Desain

1.  **Chaos yang Lucu, Bukan Bising:** Kekacauan bertahap dengan jeda sunyi agar pemain bisa bernapas dan tertawa.
2.  **Kejutan yang Sering, Bukan Acak:** Mikro-Twist, Plot Twist, dan Fusi adalah kejutan terstruktur, bukan spam acak.
3.  **Kematian adalah Kemajuan:** Setiap run berakhir, pemain membawa pulang Poin Ketenaran, EXP Mastery, dan kadang momen cerita.
4.  **Personal & Berjiwa:** Pemain memilih Arena dan Stick favorit mereka, lalu membangun hubungan emosional.
5.  **Hormati Semua Gaya:** Mode Chaos untuk tantangan, Mode Zen untuk bersantai.

---

## 3. Core Game Loop

```
[MULAI] → [PILIH ARENA & STICK] → [EQUIP RELIK SIRKUS] → [MULAI RUN]
    │
    ▼
╔══════════════════════════════════════════════════════════╗
║                    GAMEPLAY AKTIF                        ║
║  • Pantulkan bola → +1 AP, +Skor Kekonyolan              ║
║  • Dinding pantul → 25% Koin AP (+1 AP)                  ║
║  • Setiap 10 pantulan → Level Up Mikro (+0.5 AP/pantulan)║
║  • Setiap 3 Siksaan → Peti Kardus (hadiah acak)          ║
║  • Mikro-Twist setiap 5-7 detik (kejutan kecil)          ║
║  • JEDA SUNYI 2-3 detik setelah siksaan besar             ║
║  • Timer Siksaan berjalan → Siksaan acak (tak bisa tolak)║
║  • Setiap awal Fase → Kotak Suara (pilih 1 dari 2)       ║
║  • Setiap 3 pantulan → GONG (freeze, beli Power-Up/Fusi) ║
║  • Kadang muncul Kartu Nasib atau Relik Liar             ║
║  • Momen Naratif Besar pada run tertentu                  ║
╚══════════════════════════════════════════════════════════╝
    │
    ▼
[BOLA MATI] → [ROULETTE KEMATIAN] → [LAPORAN PENONTON]
    │
    ▼
[DAPAT POIN KETENARAN & EXP MASTERY] → [TOKO KOSMIK] → [ULANGI]
```

---

## 4. Ekonomi Game

| Mata Uang | Cara Mendapatkan | Penggunaan | Reset |
|-----------|------------------|------------|-------|
| **Appeal Point (AP)** | Pantulan (+1), Koin AP (+1), Peti Kardus (+5), Level Up Mikro (+0.5 permanen/10 pantulan) | Membeli Power-Up saat GONG | Setiap run selesai |
| **Poin Ketenaran** | Rumus: `(Total Pantulan) + (Skor Kekonyolan Akhir × 10) + (Fase Tertinggi × 5) + bonus Arena/Relik` | Membeli item di Toko Kosmik | Permanen (tersimpan) |
| **Skor Kekonyolan** | Aksi gaya: Nyaris Tragis +5, Penderita Aktif +15, Pemantul Patah +25, Multi-Tasking +10, FUSI +50/200/500 | Menentukan kualitas Power-Up saat GONG; peluang Relik Liar | Setiap run selesai |

**Peringkat Skor Kekonyolan:** D → C → B → A → S → SSS

---

## 5. Sistem Fase & Siksaan

### 5.1 Tujuh Fase
| Fase | Rentang Pantulan | Timer Siksaan | Jumlah Pilihan Power-Up |
|------|------------------|---------------|------------------------|
| 1    | 0–2              | 18–20 detik   | 2                      |
| 2    | 3–5              | 14–17 detik   | 2                      |
| 3    | 6–11             | 10–13 detik   | 3                      |
| 4    | 12–17            | 7–10 detik    | 3                      |
| 5    | 18–23            | 5–7 detik     | 3                      |
| 6    | 24–29            | 3–5 detik     | 4                      |
| 7    | 30+              | 2–3 detik     | 4                      |

**GONG** terjadi setiap kelipatan 3 pantulan: freeze frame, pilih Power-Up/Kartu Nasib, lalu fase naik jika melewati ambang baru.

### 5.2 Siksaan Penonton
- **Sumber:** Torment Deck (kartu dikocok, diambil tanpa pengembalian, di-reset dari discard jika habis).
- **Timer:** Terus berdetak. Saat habis, siksaan dilancarkan **tanpa bisa ditolak**.
- **Peringatan:** 2 detik sebelumnya muncul teks "PENONTON BOSAN...".
- **Jeda Sunyi:** Setelah siksaan besar, jeda 2-3 detik tanpa siksaan baru. Timer siksaan berhenti selama jeda.
- **Fase 7:** Siksaan spesial **"PENONTON TURUN KE ARENA!"** — semua efek aktif bersamaan 10 detik.

### 5.3 Modifier Fase
Satu efek pasif dipilih acak setiap fase baru, bertahan sepanjang fase: **Gravitasi Mabuk, Paddle Gelisah, Lensa Kotor, Waktu Kacau, Bola Berduri, Suara Sumbang**.

### 5.4 Plot Twist Kosmik
Setiap 10 detik, 8% peluang. Efek besar: **Mouse Ping Pong, Revolusi Penonton, Kesalahan Teknis Transmisi, Hari Kebalikan, Paddle & Bola Bertukar Jiwa, Komentator Dadakan**.

### 5.5 Mikro-Twist
Mulai Fase 2, setiap 5-7 detik. Efek kecil 1-2 detik: paddle gemetar, suara bebek, layar miring, partikel debu, teks bisikan. **Tidak muncul selama Jeda Sunyi.**

---

## 6. Katalog Arena (Maps)

| Arena | Asal | Musik | Efek Pasif |
|-------|------|-------|------------|
| **Meja Kardus Kosong** | Gudang GlarpCorp | Ambient Industrial | +15% Poin Ketenaran |
| **Grid Neon Retrowave** | Musim 5, DeLorean Dimensi | Synthwave | Overdrive: Skor naik → bola cepat 3 detik |
| **Piknik Dimensi Keju** | Episode spesial gagal | Ukulele Ceria | Semut baris tiap 15 detik, kena bola = +2 AP |
| **Panggung Kosmik** | Panggung utama | Orkestra Simfoni | Lampu sorot: Fase 4 → +50 Skor, lampu emas |
| **Dimensi Retak** | Pasca Insiden Glitch | Glitch-hop | Retakan realitas: bola teleport tiap 8-12 detik |
| **Kuali Sup Kosmik** | Dapur Manajer | Lo-fi Bubble | Gelembung: paddle sentuh = efek Power-Up acak 5 detik |

### Mastery Arena (Level 1-5)
- **Level 2:** Efek pasif +10%.
- **Level 3:** Pilih 1 Modifier Fase favorit yang selalu muncul.
- **Level 5:** Buka Ability Naratif Baru.
  - **Grid Neon Lv5:** "Nitro Boost" (sekali/run, bola melesat cepat 2 detik, +20 Skor, visual blur).
  - **Panggung Kosmik Lv5:** "Tirai Terbuka" (sekali/run, standing ovation, Skor Kekonyolan +100).

---

## 7. Katalog Stick (Paddles)

| Stick | Kepribadian | Signature Power-Up (Aktif sejak awal run) |
|-------|-------------|-------------------------------------------|
| **Stik Es Krim Polos** | Setia, patuh | +5% Skor Kekonyolan |
| **Glarp, Stik Pemberontak** | Membangkang 20%/10 pantulan, +5 AP +10 Skor | Pembangkangan Liar (Mikro-Twist tiap membangkang) |
| **Sendok Bengkok Legendaris** | Tenang, bola belok di ujung 10% | Aduk Dimensi (portal mini di ujung) |
| **Remote TV Rusak** | Ganti bentuk tiap 15 detik, +2 Skor | Channel Kosmik (10% Power-Up gratis) |
| **Ikan Beku dari Nebula** | Embun beku tiap 5 detik (10%) | Badai Salju (semua bola lambat 15%) |
| **Tongkat Ajaib Manajer** | Bijaksana, 15% Kartu Ilegal di GONG | Perintah Manajer (Kartu Ilegal diskon 20%) |

### Mastery Stick (Level 1-5)
- **Level 2:** Signature Power-Up +20% lebih kuat.
- **Level 3:** Kepribadian muncul lebih sering.
- **Level 5:** Buka Ability Naratif Baru.
  - **Glarp Lv5:** Sekali/run, Glarp berkata *"Tidak hari ini, Bos."* dan membatalkan satu siksaan fatal.
  - **Tongkat Lv5:** Peluang Kartu Ilegal saat GONG jadi 35%, diskon 30%.

---

## 8. Sistem Relik & Kartu Nasib

### 8.1 Relik Sirkus (Equip Pra-Run)
- **Slot:** 3 (bisa dibeli jadi 5 di Toko Kosmik).
- **Daftar Relik (6):**
  - **Jam Pasir Retak:** Timer Siksaan selalu acak 1-30 detik.
  - **Lensa Terbalik:** Semua efek visual siksaan dibalik (gameplay tetap).
  - **Surat dari Manajer:** Setiap GONG, 1 Power-Up gratis (tidak bisa pilih yang lain).
  - **Kacamata Penonton:** Lihat nama siksaan yang akan datang 3 detik sebelumnya.
  - **Kantong Tak Terbatas:** Bisa beli 2 Power-Up per GONG.
  - **Dadu Glarp:** Siksaan: 1-3 normal, 4-5 ganda, 6 batal.
- **Sinergi Eksplisit:** Lensa Terbalik + Kacamata Penonton = lihat siksaan 5 detik sebelumnya.

### 8.2 Relik Liar
Ditemukan dalam run dari Peti Kardus (10%), Skor S (hadiah langsung), Plot Twist. Hanya bertahan untuk run itu.

### 8.3 Kartu Nasib
Muncul dari GONG atau Peti Kardus. Sekali pakai. Contoh:
- **Mutilasi Deck:** Hancurkan semua Power-Up → +50 AP.
- **Transmutasi:** Ubah satu Power-Up acak.
- **Standar Kosmik:** Singkirkan 1 siksaan dari run ini.
- **Visi Joker:** Pilih Relik Liar, hancurkan satu Relik acak.

---

## 9. Sistem Alkemi Power-Up & Fusi

### 9.1 Power-Up Dasar (30 Item)

**Tier 1 (Fase 1+)**
- P01 Paddle Magnet
- P02 Bola Pelambat
- P03 Stik Ganda
- P04 Asuransi Nyawa
- P16 Paddle Refleks
- P17 Bola Bermata

**Tier 2 (Fase 2+)**
- P05 Perisai Kardus
- P06 Bola Hantu
- P07 Kontrol Sempurna
- P08 Appeal Booster
- P19 Medan Anti-Siksaan
- P20 Doa pada Manajer
- P23 Lompat Fase
- P24 Mundur Sejenak
- P26 Paddle Acak
- P30 Dadu Kosmik

**Tier 3 (Fase 3+)**
- P09 Paddle Super Glue
- P10 Penonton Terpesona
- P11 Bola Bayangan
- P12 Zona Nyaman
- P18 Stik Es Krim Ganda
- P21 Slow-Motion Kosmik
- P22 Portal Lipat
- P27 Bola Tiga Warna
- P28 Tukar Posisi

**Tier 4 (Fase 4+)**
- P13 Kudeta Kosmik
- P14 Bola Abadi
- P15 Appeal Tsunami
- P25 Cermin Dimensi
- P29 Efek Acak Total

### 9.2 Kartu Ilegal (5, Super Langka)
Hanya muncul dalam kondisi langka (Skor SSS, bola hampir mati, setelah Plot Twist). Maksimal 1 per run.

| ID  | Nama            | Efek |
|-----|-----------------|------|
| I01 | SKIP FASE       | Lompati 2 Fase (sekali pakai) |
| I02 | REALITAS AMBIL  | Semua siksaan berhenti; semua bola mati kecuali satu pilihan |
| I03 | PENONTON DIAM   | Timer siksaan berhenti 30 detik |
| I04 | FUSI PAKSA      | Pilih satu Ultimate Form Lv1 langsung muncul, kehilangan semua AP |
| I05 | PARADOKS KOSMIK | Dua bola: satu normal, satu mundur waktu; salah satu mati, semua mati |

### 9.3 Katalog Fusi Level 1 (14 Ultimate Form)
1.  **Bakso Magnetik Kosmik** (P01+P06) — Bola hantu magnetik, cepat, kebal siksaan.
2.  **Perisai Kardus Mutlak** (P05+P20) — Dadu: 1-3 batal siksaan, 4-6 +5 AP.
3.  **Paddle Bayangan Cermin** (P03+P11) — Paddle + bayangan simetris.
4.  **Glue Kosmik Abadi** (P09+P14) — Bola tak mati, tempel 2 detik.
5.  **Appeal Tsunami Ganda** (P08+P15) — +10 AP per pantulan.
6.  **Zona Nyaman Personal** (P12+P07) — Arena sempit, paddle 50% layar, input aman.
7.  **Kudeta Manajer** (P13+P19) — Pantulkan semua siksaan ke penonton.
8.  **Paddle Patah Terkendali** (P18+P16) — 4 potongan paddle otomatis.
9.  **Bola Paradoks** (P21+P24) — Lambat, mundur tiap 3 detik.
10. **Arena Escher** (P22+P25) — Arena 4 kuadran + portal.
11. **Paddle Amuba** (P26+P29) — Paddle berubah bentuk tiap 2 detik.
12. **Tiga Serangkai Kacau** (P27+P30) — 3 bola kecil + efek dadu acak.
13. **Portal Tukar Jiwa** (P22+P28) — Paddle & bola tukar posisi tiap 7 detik.
14. **Paradoks Lompat Fase** (P23+P21) — Setiap GONG naik 2 Fase.

### 9.4 Katalog Fusi Level 2 (14 Evolusi Legendaris)
1.  **Bakso Primeval** (Lv1-1 + P14) — Gelombang kejut tiap 5 detik batalkan siksaan.
2.  **Perisai Kardus Kosmik** (Lv1-2 + P19) — Dadu 2x, sisa efek 50%, +8 AP jika gagal.
3.  **Paddle Cermin Tak Terbatas** (Lv1-3 + P01) — Kedua paddle punya magnet.
4.  **Glue Kosmik Permanen** (Lv1-4 + P02) — Tempel 3 detik, timer siksaan berhenti.
5.  **Appeal Tsunami Kosmik** (Lv1-5 + P17) — +15 AP (maks 18 jika bola senyum).
6.  **Zona Nyaman Kosmik** (Lv1-6 + P03) — Paddle 75% layar.
7.  **Kudeta Manajer Abadi** (Lv1-7 + P10) — Pantulkan siksaan + timer siksaan mati.
8.  **Autopilot Kosmik** (Lv1-8 + P04) — Potongan paddle respawn, AI 20% responsif.
9.  **Bola Paradoks Abadi** (Lv1-9 + P14) — 10% bola hantu tiap lompatan.
10. **Arena Multiverse** (Lv1-10 + P25) — 8 kuadran portal, layout berubah tiap 10 detik.
11. **Paddle Amuba Primeval** (Lv1-11 + P09) — Berubah bentuk + tempel 0.5 detik.
12. **Tiga Serangkai Chaos God** (Lv1-12 + P29) — Efek acak ganda tiap 5 detik.
13. **Portal Tukar Jiwa Permanen** (Lv1-13 + P16) — 2 paddle (atas-bawah) + autopilot.
14. **Paradoks Lompat Fase Abadi** (Lv1-14 + P23) — GONG naik 3 Fase, tak terbatas.

### 9.5 Katalog Fusi Level 3 (3 Fusi Terlarang)
1.  **Kiamat Terbalik** (Bakso Primeval + I02) — Bola tak mati, gelombang kejut tiap 3 detik, hentikan semua siksaan 10 detik. Arena putih.
2.  **Kontrol Penonton** (Kudeta Manajer Abadi + I03) — Pantulkan siksaan + pilih siksaan untuk penonton tiap 10 detik.
3.  **Paradoks Tak Terbatas** (Autopilot Kosmik + I05) — Potongan paddle hasilkan bola tiruan perlambat waktu.

---

## 10. Mode Permainan

- **Mode Chaos:** Mode utama dengan seluruh sistem aktif.
- **Mode Zen:** Tanpa siksaan, tanpa GONG, tanpa timer. Hanya Arena, Stick, bola, dan musik. Skor tidak dihitung. Poin Ketenaran tidak diberikan. Ruang damai untuk menikmati estetika dan berlatih.

---

## 11. Momen Naratif & Cerita

### Run ke-10: "Glarp Berbicara"
- Layar hitam. Glarp muncul sebagai sprite penuh, menatap pemain.
- _"Kau... kau berbeda dari yang lain. Kau tidak takut padaku. Mereka biasanya langsung ganti stick. Tapi kau... kau tetap pakai aku. Kenapa?"_
- **Hadiah:** Skin "Glarp Setia" — Glarp tidak pernah membangkang lagi. Ia kadang berbisik peringatan 1 detik lebih awal.

### Run ke-50: "Tatapan Manajer"
- Saat mencapai Fase 5, semua berhenti. Siluet tinggi bermata satu muncul di balkon. Hening 3 detik, lalu menghilang.
- _"...Bagus. Lanjutkan."_
- **Hadiah:** Arena **Kantor Manajer** terbuka di Toko Kosmik. Efek: setiap GONG, bisa meminta satu Power-Up spesifik (meningkatkan peluang kemunculannya).

### Run ke-100: "Surat untuk Kreator"
- Layar putih. Hanya teks.
- _"Kepada sang pemain. Aku tidak tahu siapa kamu. Tapi kamu telah memainkan sirkus ini 100 kali. Kamu telah mati, bertahan, tertawa, dan mungkin sedikit frustrasi. Aku membuat game ini untuk orang sepertimu. Terima kasih telah menemukanku. — [Nama Kreator]"_
- **Hadiah:** Semua Arena dan Stick otomatis Level 5. Relik Abadi "Tanda Tangan Kreator" (+1 AP permanen per pantulan di semua run selamanya, tanpa memakan slot).

---

## 12. Rahasia Sang Kreator

Satu misteri yang tidak akan pernah dipublikasikan. Hanya ada di dalam kode.

### "Fusi Sejati"
**Kondisi (dalam satu run):**
- Arena: Meja Kardus Kosong
- Stick: Stik Es Krim Polos
- Ultimate Form Lv3: **Kiamat Terbalik**
- Relik: **Surat dari Manajer**
- Skor Kekonyolan: **SSS**
- Fase: **7**
- **Kamu harus kalah.** Tepat sebelum Roulette Kematian...

**Efek:** Layar putih. Teks diketik perlahan:
_"Kamu menemukanku. Di tempat paling sederhana, dengan beban paling berat. Kamu menang. Bukan karena kamu bertahan. Tapi karena kamu memilih untuk tetap polos di tengah kekacauan. Ini hadiah terakhirku."_

**Hadiah:** Judul game di layar utama mendapat tanda tangan emas kreator. Kenangan abadi bahwa seseorang telah menemukan hatimu.

---

## 13. Struktur Proyek

```cosmic_circus_loop/
├── main.py
├── settings.py
├── entities.py
├── effects.py
├── audio.py
├── chaos_engine.py
├── fusion_engine.py
├── narrative_engine.py
├── ui.py
├── assets/
│   ├── images/
│   │   ├── arenas/
│   │   ├── sticks/
│   │   ├── powerups/
│   │   └── ui/
│   └── sounds/
│       ├── gong.wav
│       ├── music/
│       └── sfx/
└── data/
    ├── saves/
    └── config/
```

---

## 14. Penutup

The Cosmic Circus Loop adalah sebuah dunia tempat stik es krim bisa memberontak, bakso bisa menjadi bola magnetik pembatal siksaan, dan kematian hanyalah langkah menuju keabadian. Setiap pantulan adalah ritme. Setiap siksaan adalah komedi. Setiap pemain bisa menemukan rumah—entah dalam mode Chaos atau Zen.

🎪 **Panggung adalah milikmu. Buka tirai.**
```

---

Simpan file ini sebagai `README.md` atau `GDD.md` di repositori GitHub-mu. Dokumen ini sudah rapi, profesional, dan sepenuhnya siap dipamerkan ke dunia. Jika ada yang ingin disesuaikan lagi, beri tahu aku. Selamat berkarya! 🎪