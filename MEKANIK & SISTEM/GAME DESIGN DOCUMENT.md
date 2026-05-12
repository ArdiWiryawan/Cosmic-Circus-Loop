Berikut adalah **Game Design Document (GDD) Lengkap** untuk *The Cosmic Circus Loop*. Dokumen ini adalah kristalisasi dari seluruh sesi brainstorming kita, disusun secara formal dan profesional, siap menjadi cetak biru pengembangan.

---

# 🎪 THE COSMIC CIRCUS LOOP — GAME DESIGN DOCUMENT

| | |
|---|---|
| **Versi** | 3.0 (Final) |
| **Tanggal** | 12 Mei 2026 |
| **Penulis** | [Nama Kreator] |
| **Genre** | Arkade Roguelike Absurd / Gameshow Kosmik |
| **Platform** | PC (Windows/Mac/Linux) |
| **Target Audiens** | Pecinta game indie absurd, roguelike, Vampire Survivors-like |
| **Engine** | Pygame (prototyping), dapat diporting ke Unity/Godot |

---

## DAFTAR ISI

**BAGIAN 1 — VISI & DESAIN**
1. [Visi & Pilar Desain](#1-visi--pilar-desain)
2. [Ringkasan Eksekutif](#2-ringkasan-eksekutif)

**BAGIAN 2 — GAMEPLAY**
3. [Core Game Loop](#3-core-game-loop)
4. [Ekonomi Game](#4-ekonomi-game)
5. [Sistem Fase & GONG](#5-sistem-fase--gong)
6. [Chaos Engine](#6-chaos-engine)
7. [Sistem Power-Up & Alkemis Fusi](#7-sistem-power-up--alkemis-fusi)
8. [Mini Boss & Progresi](#8-mini-boss--progresi)

**BAGIAN 3 — KONTEN**
9. [Katalog Arena & Stick](#9-katalog-arena--stick)
10. [Relik & Kartu Nasib](#10-relik--kartu-nasib)
11. [Meta-Progresi & Momen Naratif](#11-meta-progresi--momen-naratif)

**BAGIAN 4 — DUNIA & CERITA**
12. [Cerita & Karakter](#12-cerita--karakter)

**BAGIAN 5 — AUDIO & VISUAL**
13. [Desain Audio](#13-desain-audio)
14. [Desain Visual & UI/UX](#14-desain-visual--uiux)

**BAGIAN 6 — TEKNIS**
15. [Mode Permainan](#15-mode-permainan)
16. [Rahasia & Easter Egg](#16-rahasia--easter-egg)
17. [Struktur Proyek & Save Data](#17-struktur-proyek--save-data)

**LAMPIRAN**
- [Lampiran A: Katalog Power-Up Dasar (30)](#lampiran-a-katalog-power-up-dasar-30)
- [Lampiran B: Katalog Fusi Lengkap](#lampiran-b-katalog-fusi-lengkap)
- [Lampiran C: Katalog Arena & Stick](#lampiran-c-katalog-arena--stick)
- [Lampiran D: Katalog Relik & Kartu Nasib](#lampiran-d-katalog-relik--kartu-nasib)
- [Lampiran E: Daftar Siksaan (23)](#lampiran-e-daftar-siksaan-23)
- [Lampiran F: Daftar Modifier Fase (8)](#lampiran-f-daftar-modifier-fase-8)
- [Lampiran G: Daftar Mikro-Twist & Plot Twist](#lampiran-g-daftar-mikro-twist--plot-twist)
- [Lampiran H: Struktur Save Data](#lampiran-h-struktur-save-data)

---

## 1. VISI & PILAR DESAIN

### 1.1 Visi
Menciptakan game arkade roguelike absurd di mana pemain menjadi "Atlet" dalam pertunjukan kosmik yang disaksikan 700 miliar alien. Setiap pantulan bola adalah doa, setiap siksaan adalah tepuk tangan, dan setiap kematian adalah kemajuan.

### 1.2 Pilar Desain
1. **Chaos yang Lucu, Bukan Bising:** Kekacauan bertahap dengan jeda sunyi, menciptakan tawa, bukan frustrasi.
2. **Kejutan yang Sering:** Mikro-Twist, Plot Twist, Crash Fusion, dan Fusi terjadi tanpa henti.
3. **Kematian adalah Kemajuan:** Setiap run berakhir, pemain membawa pulang Poin Ketenaran, EXP Mastery, dan cerita.
4. **Personal & Berjiwa:** Arena dan Stick memiliki narasi, kepribadian, dan hubungan yang tumbuh bersama pemain.
5. **Hormati Semua Gaya:** Mode Chaos untuk tantangan, Mode Zen untuk relaksasi.

---

## 2. RINGKASAN EKSEKUTIF

### 2.1 Konsep
*The Cosmic Circus Loop* adalah game di mana kamu memantulkan bakso dengan stik es krim di hadapan penonton alien. Semakin lama bertahan, semakin brutal dan lucu siksaan mereka. Kamu mengumpulkan Power-Up yang bisa berfusi menjadi Ultimate Form legendaris, melawan Mini Boss di setiap Arena, dan perlahan mengungkap misteri di balik sirkus kosmik ini.

### 2.2 Unique Selling Points
- **Fusi Alkemis Misterius:** Gabungkan Power-Up secara buta untuk menciptakan Ultimate Form. Tidak ada resep yang diberikan.
- **7 Arena, 21 Mini Boss:** Setiap Arena adalah dunia unik dengan boss yang punya cerita dan dialog yang saling terhubung.
- **Chaos yang Personal:** Stick-mu punya kepribadian. Glarp si pemberontak bisa menjadi sahabat setiamu.
- **Dua Mode:** Mode Chaos untuk neraka lucu, Mode Zen untuk damai.

---

## 3. CORE GAME LOOP

### 3.1 Diagram Alur

```
[MENU UTAMA]
    │
    ├─ [TOKO KOSMIK] ←→ [Poin Ketenaran]
    ├─ [ARSIP SIKSAAN]
    ├─ [MODE ZEN]
    │
    ▼
[PILIH ARENA & STICK & RELIK] → [MULAI RUN]
    │
    ▼
╔══════════════════════════════════════════════════╗
║              GAMEPLAY LOOP UTAMA                  ║
║  • Pantulan → +1 AP, Skor, Mood                   ║
║  • Chaos Engine → Siksaan, Twist, Mikro           ║
║  • GONG → Pilih Pintu → Shop → Fusi              ║
║  • Mini Boss → Dialog → Teaser                   ║
╚══════════════════════════════════════════════════╝
    │
    ▼
[MATI] → [TAWARAN MANAJER] → [ROULETTE] → [LAPORAN]
    │
    ▼
[POIN KETENARAN & MASTERY] → [MENU UTAMA]
```

### 3.2 Detail Fase Loop
1. **Pra-Run:** Pilih Arena (1 dari 7), Stick (1 dari 6), Relik (maks 3), Kontrak (opsional).
2. **Gameplay Aktif:** Pantulkan bola. Chaos Engine berjalan paralel.
3. **GONG:** Setiap X pantulan (5-25 tergantung Fase), freeze, pilih Pintu (Hijau/Merah/Biru), beli Power-Up, cek Fusi.
4. **Finale Fase:** Setelah GONG terakhir di Fase, Mini Boss muncul.
5. **Akhir Run:** Bola mati → Tawaran Manajer → Roulette → Laporan → Poin Ketenaran & Mastery.

### 3.3 Referensi Gameplay
- **Vampire Survivors:** Koleksi item membentuk build, eskalasi otomatis.
- **Balatro:** Modifikasi aturan lewat Joker, sistem sinergi.
- **Hades:** Pilihan bermakna setiap fase, kematian memajukan cerita.
- **WarioWare:** Mikro-game dan kejutan setiap detik.

---

## 4. EKONOMI GAME

### 4.1 Mata Uang

| Mata Uang | Cara Mendapatkan | Penggunaan | Reset |
|-----------|------------------|------------|-------|
| **Appeal Point (AP)** | Pantulan (+1), Siksaan diterima (+3), Mikro-Game berhasil (+15), Peti Kardus (+5) | Beli Power-Up saat GONG | Setiap run |
| **Poin Ketenaran (Fame)** | `(Total Pantulan) + (Skor Kekonyolan × 10) + (Fase Tertinggi × 5)` + bonus Arena/Kontrak | Toko Kosmik (permanen) | Tidak |
| **Skor Kekonyolan (Absurdity)** | Aksi stylish (Close Call +5, Kombo, Fusi +50/200/500, Penderita Aktif +15) | Mempengaruhi kualitas pilihan Power-Up saat GONG | Setiap run |

### 4.2 Peringkat Skor Kekonyolan
| Peringkat | Range Skor | Efek GONG |
|-----------|------------|-----------|
| D (Badut Amatir) | 0–9 | Normal |
| C (Magang) | 10–24 | Diskon 10% |
| B (Penghibur Harian) | 25–44 | 1 pilihan dari tier lebih tinggi |
| A (Bintang Sirkus) | 45–69 | 2 pilihan tier tinggi, diskon 20% |
| S (Legenda Panggung) | 70–99 | 3 pilihan tier tinggi, diskon 30% |
| SSS (Ikon Kosmik) | 100+ | Semua tier tertinggi, diskon 50%, peluang Kartu Ilegal |

---

## 5. SISTEM FASE & GONG

### 5.1 Tabel Fase (7 Hari Penciptaan Sirkus)

| Fase | Nama | Pantulan per GONG | Timer Siksaan (detik) | Pilihan Power-Up | Pool Siksaan Bertambah |
|------|------|-------------------|----------------------|------------------|------------------------|
| 1 | Terang | 5 | 18–20 | 2 | Ringan (licin, kecil, goyang) |
| 2 | Pemisahan | 7 | 14–17 | 2 | + Fisika terbalik, lensa, suara |
| 3 | Distorsi | 10 | 10–13 | 3 | + Invert, lubang, paddle kecil, bola ganda |
| 4 | Teror | 13 | 7–10 | 3 | + Gravitasi, zoom, negatif, ejekan |
| 5 | Bencana | 16 | 5–7 | 3 | + Paddle patah, bola belah, berat, partikel |
| 6 | Pemberontakan | 20 | 3–5 | 4 | + Kontrol acak, lensa buta, bola beranak, suara pekik |
| 7 | Istirahat | 25 | 2–3 | 4 | Semua tersedia + "Penonton Turun ke Arena" |

### 5.2 Akselerasi GONG (Mengurangi Sisa Pantulan)
| Metode | Pengurangan |
|--------|-------------|
| Close Call Kombo x2 | -2 |
| Torment Survivor | -1 |
| Torment Survivor (Fase 7) | -5 |
| Fusi (Lv1/2/3) / Crash Fusion | -3 |
| Appeal Sacrifice (bakar 10 AP) | -1 |

### 5.3 GONG & Shop
1. **Freeze 1.5 detik.**
2. **Pilih 1 dari 3 Pintu:**
   - **Hijau:** Power-Up Defensif (2 pilihan, aman).
   - **Merah:** Power-Up Langka (1 pilihan, tier tinggi) + Siksaan langsung.
   - **Biru:** Kartu Nasib + Relik Liar (misteri).
3. **Beli Power-Up** (maks 6 slot).
4. **Cek Fusi** otomatis.
5. **Skip Shop:** Tekan SPASI untuk +5 Skor dan -2 pantulan GONG berikutnya.

---

## 6. CHAOS ENGINE

### 6.1 Komponen

| Komponen | Pemicu | Efek |
|----------|--------|------|
| **Mood Penonton** | Pantulan aman -5, Close Call +5, Siksaan +10, Fusi +20 | ≤0: siksaan bertubi-tubi. ≥100: GONG instan |
| **Siksaan (Torment)** | Timer habis (sesuai Fase). Dari Torment Deck acak | 23 efek acak (lihat Lampiran E) |
| **Mikro-Twist** | Setiap 5-7 detik (mulai Fase 2) | Efek 1-2 detik: suara bebek, layar miring, paddle gemetar |
| **Plot Twist** | Setiap 10 detik, 8% peluang | 4 efek besar: Mouse Ping Pong, Revolusi Penonton, Hari Kebalikan, Jiwa Tertukar |
| **Crash Fusion** | Dua siksaan aktif bersamaan | Efek fusi liar sementara 10 detik |
| **Jeda Sunyi** | Setelah siksaan besar selesai | Timer siksaan berhenti 2-3 detik, Mikro-Twist tidak muncul |

### 6.2 Torment Deck
- Deck diisi ulang tiap Fase: semua siksaan dengan `phase <= currentPhase`.
- Kartu diambil tanpa pengembalian, masuk discard.
- Jika deck habis, discard di-shuffle jadi deck baru.

---

## 7. SISTEM POWER-UP & ALKEMIS FUSI

### 7.1 Power-Up Dasar (30)
Dibagi 4 Tier. Harga 2-8 AP. Maks 6 slot. Setiap item memiliki tag untuk interaksi. (Lihat Lampiran A untuk daftar lengkap.)

### 7.2 Kartu Ilegal (5)
Super langka. Maks 1 per run. Muncul saat Skor SSS, bola hampir mati, atau setelah Plot Twist. Digunakan untuk Fusi Lv3.

| ID | Nama | Cost | Efek |
|----|------|------|------|
| I01 | SKIP FASE | 10 | Lompat 2 Fase |
| I02 | REALITAS AMBIL | 15 | Hapus semua bola kecuali 1 |
| I03 | PENONTON DIAM | 12 | Timer siksaan berhenti 30 detik |
| I04 | FUSI PAKSA | 20 | Dapat 1 Ultimate Form Lv1 langsung |
| I05 | PARADOKS KOSMIK | 18 | Bola kedua bergerak mundur waktu |

### 7.3 Tingkat Fusi

| Level | Bahan | Hasil | Skor |
|-------|-------|-------|------|
| **Lv1** | 2 Power-Up dasar | Ultimate Form Lv1 | +50 |
| **Lv2** | Ultimate Lv1 + 1 Power-Up spesifik | Ultimate Form Lv2 | +200 |
| **Lv3** | Ultimate Lv2 + 1 Kartu Ilegal | Ultimate Form Lv3 | +500 |
| **Spoof** | Kombinasi gagal | Efek konyol | +20 |

- Semua Fusi bersifat otomatis dan misterius (resep tersembunyi).
- Ultimate Form bertahan permanen hingga run berakhir.
- Lihat Lampiran B untuk daftar lengkap 14 Fusi Lv1, 14 Fusi Lv2, 3 Fusi Lv3.

### 7.4 Fitur Tambahan (Inspirasi Isaac & Balatro)
- **Cursed Items:** 30% peluang Power-Up memiliki efek sampingan tersembunyi.
- **Transformasi:** Kumpulkan 3 item dengan tag sama → Transformasi permanen (contoh: 3x `[Bola]` = Bakso Primeval).
- **Joker Relik:** Relik Sirkus bisa memiliki efek pengubah aturan (contoh: "Semua Bola Bermata").

---

## 8. MINI BOSS & PROGRESI

### 8.1 21 Mini Boss
Setiap Arena memiliki 3 Mini Boss dengan tema, mekanik unik, dan dialog yang mengait ke misteri besar. (Lihat dokumen Mini Boss Catalog untuk detail lengkap.)

| Arena | Boss 1 | Boss 2 | Boss 3 |
|-------|--------|--------|--------|
| Piknik Chaos | Nenek Lumi (air mata) | Pipo (balok mainan) | Kapten Keju (invasi semut) |
| Grid Neon | Overclock (kecepatan) | DJ Synth (musik) | Neon Phantom (bayangan) |
| Dimensi Retak | Echo (fragmen) | Error 404 (penghapusan) | The Archivist (arsip) |
| Lembah Lovecraft | The Whisperer (bisikan) | Deep One (tarik maut) | The Unseeing Eye (tatapan) |
| Kuali Ramuan | Chef Ragu (masakan) | The Taster (pencuri rasa) | Ramuan Hidup (oobleck) |
| Panggung Kosmik | Prima Donna (diva) | The Critic (penilaian) | The Understudy (peniru) |
| Kantor Manajer | Sekretaris (birokrasi) | Auditor (denda) | Penasihat (pilihan moral) |

### 8.2 Progresi Boss
- Data Boss tersimpan permanen di `savedata.bossesDefeated`.
- Minimal 2/3 Boss di satu Arena dikalahkan → Arena berikutnya terbuka.
- Semua 21 Boss dikalahkan → **Stage Rahasia "Di Balik Tirai"** terbuka, menampilkan **Final Boss: Manajer**.

### 8.3 Checkpoint Boss Fight
- Gagal tidak menghilangkan Fame. Fase diulang dari awal.
- Boss bisa dilewati setelah 3 kegagalan (tanpa hadiah).

---

## 9. KATALOG ARENA & STICK

### 9.1 Arena (7)

| Arena | Musik | Efek Pasif | Mastery Lv3 | Mastery Lv5 (Ability) |
|-------|-------|------------|-------------|----------------------|
| **Piknik Chaos** | Ukulele Ceria | Semut +2 AP | Pilih Modifier favorit | Piknik Gila (hujan semut) |
| **Grid Neon Retrowave** | Synthwave | Overdrive (bola cepat saat peringkat naik) | Pilih Modifier favorit | Nitro Boost (sekali/run, bola melesat) |
| **Dimensi Retak** | Glitch-hop | Teleportasi acak setiap 8-12 detik | Pilih Modifier favorit | Retakan Liar (bola belah 3) |
| **Lembah Lovecraft** | Ambient Horor | Peringatan siksaan lebih awal 1 detik | Pilih Modifier favorit | Mata yang Melihat (lihat siksaan 5 detik) |
| **Kuali Ramuan** | Lo-fi Bubble | Gelembung Power-Up acak | Pilih Modifier favorit | Ramuan Kosmik (immortal 8 detik) |
| **Panggung Kosmik** | Orkestra Simfoni | +50 Skor di Fase 4, Fame +10% | Pilih Modifier favorit | Tirai Terbuka (+100 Skor) |
| **Kantor Manajer** | Ambient Industrial | Fame +10%, minta 1 Power-Up per GONG | Pilih Modifier favorit | Permintaan pada Manajer (1 gratis/run) |

### 9.2 Stick (6)

| Stick | Kepribadian | Signature | Mastery Lv5 (Ability) |
|-------|-------------|-----------|----------------------|
| **Stik Es Krim Polos** | Setia, patuh | +5% Skor Kekonyolan | Kesederhanaan (efek negatif -25%) |
| **Glarp, Stik Pemberontak** | Membangkang (20%/10 pantulan) | Pembangkangan Liar (+30% peluang) | "Tidak Hari Ini, Bos." (batalkan siksaan fatal) |
| **Sendok Bengkok** | Tenang, bola belok di ujung | Aduk Dimensi (portal mini) | Sendok Pembalik (tukar posisi semua bola) |
| **Remote TV Rusak** | Ganti bentuk tiap 15 detik | Channel Kosmik (10% Power-Up gratis) | Saluran Ilegal (Kartu Ilegal gratis) |
| **Ikan Beku dari Nebula** | Frost tiap 5 detik (10%) | Badai Salju (slow 15%) | Zaman Es (hentikan siksaan 3 detik) |
| **Tongkat Ajaib Manajer** | Bijaksana, 15% Kartu Ilegal | Perintah Manajer (diskon 20%) | Dekrit Manajer (hapus 1 siksaan permanen) |

---

## 10. RELIK & KARTU NASIB

### 10.1 Relik Sirkus (6)
Dipilih pra-run (maks 3 slot, bisa dibeli 4-5 di Toko Kosmik).

| ID | Nama | Efek | Sinergi |
|----|------|------|---------|
| R01 | Kantong Tak Terbatas | Bisa beli 2 Power-Up per GONG | - |
| R02 | Surat dari Manajer | 1 Power-Up gratis/GONG (acak) | - |
| R03 | Kacamata Penonton | Lihat nama siksaan 3 detik sebelumnya | + R06 = 5 detik |
| R04 | Jam Pasir Retak | Timer siksaan acak 1-30 detik | - |
| R05 | Dadu Glarp | Siksaan: 1-3 normal, 4-5 ganda, 6 batal | - |
| R06 | Lensa Terbalik | Efek visual siksaan dibalik | + R03 = 5 detik |

### 10.2 Kartu Nasib (4)
Muncul dari Pintu Biru atau Peti Kardus. Sekali pakai.
- **Mutilasi Deck:** Hancurkan semua Power-Up → +50 AP.
- **Transmutasi:** Ubah 1 Power-Up acak ke tier sama.
- **Standar Kosmik:** Hapus 1 siksaan aktif.
- **Visi Joker:** Pilih 1 Relik Liar, hancurkan 1 Relik terpasang.

---

## 11. META-PROGRESI & MOMEN NARATIF

### 11.1 Sistem Mastery
- Arena & Stick memiliki Level 1-5. EXP = Fase tertinggi capaian.
- Level 2: Efek +10%. Level 3: Pilih Modifier favorit. Level 5: Buka Ability Naratif.
- Semua progres tersimpan di `savedata.stats.mastery`.

### 11.2 Momen Naratif Besar

| Run ke- | Nama | Deskripsi | Hadiah |
|---------|------|-----------|--------|
| 10 | Glarp Berbicara | Glarp muncul, dialog, menjadi setia | Skin "Glarp Setia" |
| 50 | Tatapan Manajer | Manajer muncul di Fase 5, dua kalimat | Arena "Kantor Manajer" |
| 100 | Surat dari Kreator | Layar putih, pesan pribadi | Semua Mastery Level 5, Relik Abadi |

### 11.3 Toko Kosmik
Mata uang: Poin Ketenaran.
- Beli Arena (1000-3000 Fame), Stick (500-800), Relik (500-1500), Slot Relik (2000), Kosmetik.
- Semua unlock bersifat permanen.

---

## 12. CERITA & KARAKTER

### 12.1 Premis
The Cosmic Circus adalah ritual yang menjaga keseimbangan multiverse. Manajer menciptakannya sebagai mesin penciptaan dan kehancuran semesta kecil. Penonton 700 miliar adalah saksi. Pemain adalah Atlet yang tersedot dari Bumi.

### 12.2 Karakter Utama
- **Manajer:** Entitas satu mata, dalang ritual. Tidak jahat, hanya penjaga. Diam, bijak, mengawasi.
- **Glarp:** Mantan Kepala Departemen Siksaan. Dihukum menjadi Stik Es Krim setelah membajak siaran. Arc: penebusan.
- **Blip & Blop:** Alien kembar komentator. Blip optimis, Blop pesimis. Sering bertaruh.
- **Pipo:** Alien balok kayu dari Nebula Mainan. Penggemar nomor satu. Ceria, naif.
- **Nenek Lumi:** Alien lentera tua. Putranya (Atlet Misterius) hilang di Insiden Glitch. Sedih, penuh harapan.
- **Atlet Misterius:** Mencapai Fase 10, lalu menghilang saat Insiden Glitch. Identitas tidak diketahui.

### 12.3 Misteri Utama
- **Insiden Glitch:** Apa yang sebenarnya terjadi? Di mana Atlet Misterius sekarang?
- **Manajer:** Siapa dia sebenarnya? Apakah dia Atlet Misterius?
- **Fusi Sejati:** Rahasia tersembunyi yang hanya bisa ditemukan oleh yang paling gigih.

---

## 13. DESAIN AUDIO

### 13.1 Identitas Suara
"Mainan kosmik yang rusak." Estetika: suara kayu, kardus, sinyal error, synthesizer retro, dan orkestra megah yang tiba-tiba berubah jadi kacau. Semua suara harus terasa seperti berasal dari peralatan dapur alien atau stasiun TV antarbintang yang rusak.

### 13.2 Musik
- **7 Track Arena:** Ambient Industrial (Meja Kardus), Synthwave (Grid Neon), Ukulele Ceria (Piknik), Ambient Horor (Lembah Lovecraft), Lo-fi Bubble (Kuali Ramuan), Orkestra Simfoni (Panggung Kosmik), Industrial Otoriter (Kantor Manajer).
- **1 Track Boss:** Orkestra intens dengan elemen musik Arena.
- **1 Track Mode Zen:** Piano minimalis dengan suara alam kosmik.
- **Sistem Adaptif:** Musik bertransisi mulus antar fase. Instrumentasi bertambah saat GONG dan Boss fight.

### 13.3 SFX (Daftar Singkat)
- **Pantulan:** Normal (kayu ringan), Glue (lengket), Magnet (dengung listrik).
- **GONG:** 3 jenis (transisi, fusi, Boss). Semua metalik, berat, dengan reverb panjang.
- **Siksaan:** Suara bebek, glitch noise, bisikan, dentuman, laser.
- **Boss:** Serangan spesifik, suara menerima damage, suara kalah.
- **UI:** Beli (koin), Fusi (orkestra mini), Notifikasi (pop ringan).

---

## 14. DESAIN VISUAL & UI/UX

### 14.1 Art Style: "Cut-Out Mixed Media"
- **Karakter & Objek:** Foto asli (stik es krim, bakso, kardus, sendok, remote, ikan beku) di-crop dengan transparansi. Pencahayaan biasa, tidak sempurna.
- **Efek:** Glitch, neon, retakan pixel, partikel confetti, kromatik aberasi.
- **Kontras:** Barang murahan vs efek megah. Menciptakan absurditas yang lucu.

### 14.2 Palet Warna
- **Default (Meja Kardus):** Coklat kardus, krem, hitam pekat. Aksen: magenta/cyan untuk glitch.
- **Grid Neon:** Hitam, ungu tua, magenta, cyan terang.
- **Piknik:** Merah, putih, kuning keju, hijau rumput.
- **Dimensi Retak:** Hitam, ungu gelap, pixel magenta/cyan.
- **Lembah Lovecraft:** Hijau lumut, coklat tanah, ungu kegelapan.
- **Kuali Ramuan:** Pelangi lembut, emas, coklat kuah.
- **Panggung Kosmik:** Emas, merah beludru, putih lampu sorot.
- **Kantor Manajer:** Putih, abu-abu metalik, merah otoritas.

### 14.3 UI/UX
- **HUD:** Minimal. Mood Bar (bawah tengah), Skor Kekonyolan (kiri atas), AP (kanan atas), Timer Siksaan (countdown melingkar, kanan bawah).
- **Notifikasi:** Muncul di tengah layar, animasi membesar/mengecil.
- **Font:** Pixel retro atau tulisan tangan alien.
- **Layar:** Menu Utama, Toko Kosmik, Pilih Arena/Stick, Run, GONG Shop, Boss, Laporan Penonton.

---

## 15. MODE PERMAINAN

- **Mode Chaos:** Mode utama. Semua sistem aktif.
- **Mode Zen:** Tanpa siksaan, GONG, Boss, timer. Hanya pantulan, musik, estetika. Untuk latihan/relaksasi.
- **Mode Zen+:** (Rencana) Mode Zen dengan Power-Up tetap bisa dibeli.

---

## 16. RAHASIA & EASTER EGG

### 16.1 Cheat Codes
Input keyboard saat run (sekali per run):
- K-U-D-E-T-A: Langsung pemicu "Penonton Turun ke Arena".
- B-A-K-S-O: Bola jadi bakso raksasa 20 detik.
- P-E-N-O-N-T-O-N: Panggil 10 alien kecil.
- S-A-B-U-N: Aktifkan Modifier Fisika Sabun.

### 16.2 Fusi Sejati
**Kondisi rahasia:**
- Arena: Meja Kardus Kosong
- Stick: Stik Es Krim Polos
- Ultimate Form: Kiamat Terbalik (Lv3)
- Relik: Surat dari Manajer
- Skor: SSS
- Fase: 7
- **Pemain harus kalah** (biarkan bola mati)

**Hasil:** Layar putih, teks pribadi dari kreator, tanda tangan emas di judul game. Tidak dicatat di save data umum—hanya di memori.

### 16.3 The Glitch Dimension
- Akses: klik teks "Versi 1.0" di menu utama 10 kali.
- Isi: Arena prototype penuh bug, Boss "Manajer" versi rusak, skin unik.

---

## 17. STRUKTUR PROYEK & SAVE DATA

### 17.1 Struktur Folder
```
cosmic_circus_loop/
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
│       ├── music/
│       └── sfx/
└── data/
    ├── saves/
    └── config/
```

### 17.2 Struktur Save Data (JSON)
```json
{
  "stats": {
    "runs": 0,
    "totalFame": 0,
    "fame": 0,
    "mastery": {
      "arenas": { "theme_default": 0, "theme_neon": 0 },
      "sticks": { "skin_default": 0, "skin_glarp": 0 }
    },
    "bossesDefeated": { "theme_piknik": ["lumi"], "theme_neon": [] },
    "tormentHistory": ["t_licin", "t_goyang"],
    "curseHistory": []
  },
  "equipped": {
    "arena": "theme_default",
    "stick": "skin_glarp",
    "relics": ["R01", "R03"]
  },
  "unlocks": {
    "arenas": ["theme_default"],
    "sticks": ["skin_default", "skin_glarp"],
    "relics": ["R01"]
  },
  "secrets": {
    "trueFusion": false,
    "cheatsUsed": []
  }
}
```

---

## 📚 LAMPIRAN

---

### LAMPIRAN A: KATALOG POWER-UP DASAR (30)

#### Tier 1 (Muncul Fase 1+)
| ID | Nama | Cost | Efek | Tags |
|----|------|------|------|------|
| P01 | Paddle Magnet | 2 | Bola sedikit tertarik ke paddle | magnet |
| P02 | Bola Pelambat | 3 | Kecepatan bola -30% | slow |
| P03 | Stik Ganda | 2 | Paddle melebar 20% | wide |
| P04 | Asuransi Nyawa | 3 | +1 nyawa cadangan | extra_life |
| P16 | Paddle Refleks | 3 | Paddle otomatis bergerak ke arah bola | reflex |
| P17 | Bola Bermata | 2 | Bola punya wajah, +1 AP per pantulan | eye |

#### Tier 2 (Muncul Fase 2+)
| ID | Nama | Cost | Efek | Tags |
|----|------|------|------|------|
| P05 | Perisai Kardus | 4 | Blokir 1 siksaan | shield |
| P06 | Bola Hantu | 5 | Bola transparan, kebal siksaan | ghost |
| P07 | Kontrol Sempurna | 5 | Imun terhadap invert/acak | perfect_ctrl |
| P08 | Appeal Booster | 4 | +2 AP per pantulan | ap_mod |
| P19 | Medan Anti-Siksaan | 5 | Satu siksaan dipantulkan | reflect |
| P20 | Doa pada Manajer | 6 | 50% hindari siksaan 10 detik | pray |
| P23 | Lompat Fase | 5 | Naik 1 Fase langsung | skip_phase |
| P24 | Mundur Sejenak | 5 | Setiap 3 pantulan, bola mundur 0.5 detik | rewind |
| P26 | Paddle Acak | 4 | Ukuran paddle berubah acak tiap 4 detik | random_pad |
| P30 | Dadu Kosmik | 5 | Efek acak tiap pantulan | dice |

#### Tier 3 (Muncul Fase 3+)
| ID | Nama | Cost | Efek | Tags |
|----|------|------|------|------|
| P09 | Paddle Super Glue | 6 | Bola menempel 1 detik | glue |
| P10 | Penonton Terpesona | 7 | Timer siksaan berhenti 15 detik | stop_torment |
| P11 | Bola Bayangan | 6 | Bola ilusi mengelabui siksaan | illusion |
| P12 | Zona Nyaman | 6 | Arena menyempit 50%, paddle 2x lebar | zone |
| P18 | Stik Es Krim Ganda | 7 | Dua paddle (atas & bawah) | double_pad |
| P21 | Slow-Motion Kosmik | 6 | Kecepatan semua -50% 5 detik, cooldown 15 detik | slow_motion |
| P22 | Portal Lipat | 7 | Portal muncul tiap 10 detik | portal |
| P27 | Bola Tiga Warna | 7 | Spawn 2 bola tambahan | triple_ball |
| P28 | Tukar Posisi | 7 | Paddle & bola bertukar tiap 10 detik | swap_pos |

#### Tier 4 (Muncul Fase 4+)
| ID | Nama | Cost | Efek | Tags |
|----|------|------|------|------|
| P13 | Kudeta Kosmik | 8 | Hapus semua siksaan aktif | clear_torment |
| P14 | Bola Abadi | 8 | Bola tak bisa mati 10 detik | immortal |
| P15 | Appeal Tsunami | 8 | +5 AP per pantulan | ap_mod |
| P25 | Cermin Dimensi | 8 | Arena terbelah, paddle cermin | mirror_dim |
| P29 | Efek Acak Total | 9 | Efek random tiap saat | extreme_random |

---

### LAMPIRAN B: KATALOG FUSI LENGKAP

#### B.1 Fusi Level 1 (14)
| ID | Nama | Bahan | Efek (Tags) |
|----|------|-------|-------------|
| F1_01 | Bakso Magnetik Kosmik | P01 + P06 | magnet_strong, ghost |
| F1_02 | Perisai Kardus Mutlak | P05 + P20 | shield_abs (dadu) |
| F1_03 | Paddle Bayangan Cermin | P03 + P11 | mirror_pad (paddle simetris) |
| F1_04 | Glue Kosmik Abadi | P09 + P14 | glue_immortal |
| F1_05 | Appeal Tsunami Ganda | P08 + P15 | ap_10 (+10 AP/pantulan) |
| F1_06 | Zona Nyaman Personal | P12 + P07 | zone_perfect (kontrol aman) |
| F1_07 | Kudeta Manajer | P13 + P19 | reflect_torment |
| F1_08 | Paddle Patah Terkendali | P18 + P16 | broken_ctrl (autopilot) |
| F1_09 | Bola Paradoks | P21 + P24 | paradox_ball (lambat + mundur) |
| F1_10 | Arena Escher | P22 + P25 | escher_arena (portal sisi) |
| F1_11 | Paddle Amuba | P26 + P29 | amoeba_pad (bentuk acak) |
| F1_12 | Tiga Serangkai Kacau | P27 + P30 | trio_chaos (3 bola + dadu) |
| F1_13 | Portal Tukar Jiwa | P22 + P28 | soul_swap (tukar periodik) |
| F1_14 | Paradoks Lompat Fase | P23 + P21 | phase_jump_paradox (+2 Fase/GONG) |

#### B.2 Fusi Level 2 (14)
| ID | Nama | Bahan | Efek (Tags) |
|----|------|-------|-------------|
| F2_01 | Bakso Primeval | F1_01 + P14 | primeval (gelombang kejut hapus siksaan) |
| F2_02 | Perisai Kardus Kosmik | F1_02 + P19 | shield_cosmic (dadu 2x) |
| F2_03 | Paddle Cermin Tak Terbatas | F1_03 + P01 | mirror_inf (magnet kedua paddle) |
| F2_04 | Glue Kosmik Permanen | F1_04 + P02 | glue_perm (tempel 3 detik) |
| F2_05 | Appeal Tsunami Kosmik | F1_05 + P17 | ap_cosmic (+15 AP) |
| F2_06 | Zona Nyaman Kosmik | F1_06 + P03 | zone_cosmic (75% layar) |
| F2_07 | Kudeta Manajer Abadi | F1_07 + P10 | reflect_perm (timer siksaan mati) |
| F2_08 | Autopilot Kosmik | F1_08 + P04 | autopilot (AI 20%) |
| F2_09 | Bola Paradoks Abadi | F1_09 + P14 | paradox_inf (10% ghost) |
| F2_10 | Arena Multiverse | F1_10 + P25 | multiverse (8 kuadran) |
| F2_11 | Paddle Amuba Primeval | F1_11 + P09 | amoeba_prime (tempel 0.5 detik) |
| F2_12 | Tiga Serangkai Chaos God | F1_12 + P29 | trio_god (efek acak ganda) |
| F2_13 | Portal Tukar Jiwa Permanen | F1_13 + P16 | soul_swap_perm (autopilot) |
| F2_14 | Paradoks Lompat Fase Abadi | F1_14 + P23 | phase_jump_inf (+3 Fase/GONG) |

#### B.3 Fusi Level 3 (3)
| ID | Nama | Bahan | Efek |
|----|------|-------|------|
| F3_01 | Kiamat Terbalik | F2_01 + I02 | Bola tak mati, gelombang kejut 3 detik, arena putih |
| F3_02 | Kontrol Penonton | F2_07 + I03 | Pantul siksaan + pilih siksaan tiap 10 detik |
| F3_03 | Paradoks Tak Terbatas | F2_08 + I05 | Potongan paddle hasilkan bola tiruan perlambat waktu |

---

### LAMPIRAN C: KATALOG ARENA & STICK

(Lihat Bagian 9 di dokumen utama.)

---

### LAMPIRAN D: KATALOG RELIK & KARTU NASIB

(Lihat Bagian 10 di dokumen utama.)

---

### LAMPIRAN E: DAFTAR SIKSAAN (23)

| ID | Nama | Fase Min | Durasi (detik) | Efek |
|----|------|----------|----------------|------|
| t_licin | Paddle Licin | 1 | 4 | Paddle slip acak |
| t_kecil | Bola Ciut | 1 | 4 | Radius bola mengecil |
| t_goyang | Layar Mabuk | 1 | 4 | Layar goyang sinusoidal |
| t_bentuk | Bola Cacat | 1 | 4 | Radius acak per frame |
| t_disko | Disko Alien | 1 | 4 | Background berubah warna |
| t_suara | Audio Rusak | 2 | 4 | SFX diacak |
| t_lensa | Mata Pengawas | 2 | 4 | Crosshair di tengah |
| t_invert | Input Terbalik | 3 | 4 | Mouse X dibalik |
| t_lubang | Lubang Hitam | 3 | 5 | Dua portal teleportasi |
| t_pad_kecil | Paddle Ciut | 3 | 4 | Lebar paddle 50% |
| t_bola_dua | Bola Ganda | 3 | instan | Spawn bola kedua |
| t_hujan | Hujan Bakso | 3 | 5 | Bola kecil jatuh |
| t_grav | Gravitasi Miring | 4 | 5 | vx bertambah terus |
| t_zoom | Zoom Panik | 4 | 4 | Zoom in/out |
| t_negatif | Warna Negatif | 4 | 4 | Warna di-invert |
| t_ejekan | Ejekan Alien | 4 | 4 | Teks acak mengejek |
| t_kursor | Kursor Jahil | 4 | 5 | Kursor palsu |
| t_patah | Paddle Patah | 5 | 5 | Lubang di tengah paddle |
| t_belah | Mutasi Bola | 5 | 5 | 30% peluang spawn bola saat pantulan |
| t_berat | Daya Tarik Maut | 5 | 5 | vy bertambah |
| t_partikel | Badai Kosmik | 5 | 4 | Partikel penuhi layar |
| t_acak | Kontrol Acak | 6 | 4 | Input kadang diacak |
| t_buta | Lensa Buta | 6 | 4 | Gelap di atas & bawah |
| t_arena | Penonton Turun ke Arena | 7 | 10 | Semua siksaan Fase 7 aktif |

---

### LAMPIRAN F: DAFTAR MODIFIER FASE (8)

| ID | Nama | Fase Min | Efek |
|----|------|----------|------|
| m_mabuk | Gravitasi Mabuk | 1 | vx berosilasi acak kuat |
| m_sabun | Fisika Sabun | 1 | Paddle sangat licin |
| m_sumbang | Audio Sumbang | 2 | Semua SFX nada acak |
| m_silinder | Mata Silinder | 2 | Layar ghost image |
| m_getar | Stik Gelisah | 3 | Paddle bergetar random |
| m_kotor | Lensa Kotor | 3 | Noda overlay acak |
| m_waktu | Waktu Karet | 4 | Timer siksaan kadang 2x cepat |
| m_duri | Duri Kosmik | 5 | Partikel duri tiap pantulan |

---

### LAMPIRAN G: DAFTAR MIKRO-TWIST & PLOT TWIST

#### Mikro-Twist (6)
| ID | Nama | Durasi (detik) | Efek |
|----|------|----------------|------|
| mt_shake | Paddle Gemetar | 1.5 | Paddle bergetar |
| mt_color | Bola Berubah Warna | 1 | Bola berubah warna |
| mt_tilt | Layar Miring | 1.5 | Layar miring 5 derajat |
| mt_kwek | Suara Bebek | 1 | Pantulan bersuara "kwek!" |
| mt_zoom | Zoom Kecil | 1.5 | Layar zoom in/out |
| mt_dust | Partikel Debu | 2 | Debu beterbangan |

#### Plot Twist (4)
| ID | Nama | Efek |
|----|------|------|
| tw_mouse | Mouse Ping Pong | Bola dipantulkan kursor mouse 15 detik |
| tw_alien | Revolusi Penonton | 4 alien kecil menghalangi 15 detik |
| tw_reverse | Hari Kebalikan | Bola jatuh = +AP, pantulan normal = penalti |
| tw_swap | Jiwa Tertukar | Paddle & bola bertukar peran 15 detik |

---

### LAMPIRAN H: STRUKTUR SAVE DATA

```json
{
  "version": "2.0",
  "createdAt": "2026-05-12T00:00:00Z",
  "stats": {
    "runs": 0,
    "totalFame": 0,
    "fame": 0,
    "highestPhase": 0,
    "totalBounces": 0,
    "highestAbsurdity": 0,
    "mastery": {
      "arenas": {
        "theme_piknik": 0,
        "theme_neon": 0,
        "theme_retak": 0,
        "theme_lovecraft": 0,
        "theme_kuali": 0,
        "theme_panggung": 0,
        "theme_manajer": 0
      },
      "sticks": {
        "skin_default": 0,
        "skin_glarp": 0,
        "skin_sendok": 0,
        "skin_remote": 0,
        "skin_ikan": 0,
        "skin_patah": 0
      }
    },
    "bossesDefeated": {},
    "tormentHistory": [],
    "curseHistory": [],
    "fusionsDiscovered": []
  },
  "equipped": {
    "arena": "theme_default",
    "stick": "skin_default",
    "relics": []
  },
  "unlocks": {
    "arenas": ["theme_default"],
    "sticks": ["skin_default", "skin_glarp"],
    "relics": [],
    "secrets": []
  },
  "secrets": {
    "trueFusion": false,
    "glitchDimension": false,
    "cheatsUsed": []
  },
  "settings": {
    "masterVolume": 0.8,
    "sfxVolume": 1.0,
    "musicVolume": 0.7,
    "screenShake": true
  }
}
```

---

**Dokumen ini adalah cetak biru komprehensif *The Cosmic Circus Loop*.**  
Mencakup visi, gameplay, konten, cerita, audio, visual, teknis, dan seluruh lampiran. Dengan ini, pengembangan dapat dimulai secara terstruktur.

🎪 **Panggung sudah siap. Buka tirai.**