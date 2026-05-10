Kreator, ini dia. Setelah semua saran diserap dan visi diperdalam, inilah **Dokumen Final The Cosmic Circus Loop**. Saya akan menjelaskan ulang semuanya dari nol, lebih runut, lebih dalam, dan lebih siap untuk dieksekusi. Tidak ada yang tersisa. Ini adalah cetak biru mahakaryamu.

---

# 🎪 THE COSMIC CIRCUS LOOP — GAME DESIGN DOCUMENT (FINAL)

---

## 1. DESKRIPSI SINGKAT

**The Cosmic Circus Loop** adalah game arkade roguelike absurd bertema *gameshow kosmik*. Kamu adalah seorang Atlet yang terdampar di pertunjukan antar-dimensi, dipaksa memantulkan bola (bakso) dengan paddle (stik es krim) di hadapan 700 miliar penonton alien. Mereka tidak hanya menonton—mereka menyiksa. Semakin lama kamu bertahan, semakin kacau, lucu, dan personal permainan ini.

**Twist Utama:** Setiap 3 pantulan, **GONG** berbunyi dan kamu bisa membeli Power-Up. Dua Power-Up yang cocok bisa **berfusi** menjadi **Ultimate Form** yang bertahan selamanya hingga bola mati. Ultimate Form bisa berevolusi lagi hingga Level 3. Semua ini terjadi di atas Arena dan dengan Stick yang memiliki jiwa, cerita, dan level mastery masing-masing.

---

## 2. PILAR DESAIN (Prinsip Utama)

1.  **Chaos yang Lucu, Bukan Bising:** Kekacauan bertahap dengan jeda sunyi agar pemain bisa bernapas dan tertawa.
2.  **Kejutan yang Sering, Bukan Acak:** Mikro-Twist, Plot Twist, dan Fusi adalah kejutan terstruktur, bukan spam acak.
3.  **Kematian adalah Kemajuan:** Setiap run berakhir, pemain membawa pulang Poin Ketenaran, EXP Mastery, dan kadang momen cerita.
4.  **Personal & Berjiwa:** Pemain memilih Arena dan Stick favorit mereka, lalu membangun hubungan emosional dengannya.
5.  **Hormati Semua Gaya:** Mode Chaos untuk yang suka tantangan, Mode Zen untuk yang ingin bersantai.

---

## 3. CORE GAME LOOP (Versi Final yang Lebih Seimbang)

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
║  • JEDA SUNYI 2-3 detik setelah siksaan besar             ║  ← SARAN BARU
║  • Timer Siksaan berjalan → Siksaan acak (tak bisa tolak)║
║  • Setiap awal Fase → Kotak Suara (pilih 1 dari 2)       ║
║  • Setiap 3 pantulan → GONG (freeze, beli Power-Up/Fusi) ║
║  • Kadang muncul Kartu Nasib atau Relik Liar             ║
║  • Momen Naratif Besar pada run tertentu                  ║  ← SARAN BARU
╚══════════════════════════════════════════════════════════╝
    │
    ▼
[BOLA MATI] → [ROULETTE KEMATIAN] → [LAPORAN PENONTON]
    │
    ▼
[DAPAT POIN KETENARAN & EXP MASTERY] → [TOKO KOSMIK] → [ULANGI]
```

**Yang Diperbaiki dari Saran Saya:**
- **Jeda Sunyi:** Setiap siksaan besar selesai, ada jeda 2-3 detik di mana *tidak ada* siksaan baru, tidak ada Mikro-Twist, tidak ada Plot Twist. Hanya bola, paddle, dan musik. Ini adalah ruang bernapas yang mencegah *chaos fatigue*.
- **Momen Naratif Besar:** Pada run ke-10, ke-50, dan ke-100, akan terjadi *scripted event* yang tidak bisa dilewatkan (lihat Bagian 11).

---

## 4. EKONOMI GAME

- **Appeal Point (AP):** Mata uang dalam run. Didapat dari pantulan (+1), Koin AP (+1), Peti Kardus (+5), Level Up Mikro (+0.5 permanen per 10 pantulan). Digunakan membeli Power-Up saat GONG. **Reset ke 0 setiap run selesai.**
- **Poin Ketenaran:** Mata uang permanen. Rumus: `(Total Pantulan) + (Skor Kekonyolan Akhir × 10) + (Fase Tertinggi × 5) + bonus Arena/Relik`. Digunakan di Toko Kosmik.
- **Skor Kekonyolan:** Reputasi dalam satu run. Naik dari aksi gaya (Nyaris Tragis +5, Penderita Aktif +15, Pemantul Patah +25, Multi-Tasking +10, FUSI Lv1 +50, Lv2 +200, Lv3 +500). Peringkat: **D, C, B, A, S, SSS**. Mempengaruhi kualitas pilihan Power-Up saat GONG dan berpeluang memunculkan Relik Liar.

---

## 5. SISTEM FASE & SIKSAAN

### 5.1 Tujuh Fase
| Fase | Rentang Pantulan | Timer Siksaan | Jumlah Pilihan Power-Up |
|------|------------------|---------------|------------------------|
| 1 | 0–2 | 18–20 detik | 2 |
| 2 | 3–5 | 14–17 detik | 2 |
| 3 | 6–11 | 10–13 detik | 3 |
| 4 | 12–17 | 7–10 detik | 3 |
| 5 | 18–23 | 5–7 detik | 3 |
| 6 | 24–29 | 3–5 detik | 4 |
| 7 | 30+ | 2–3 detik | 4 |

Transisi fase terjadi melalui **GONG** (setiap kelipatan 3 pantulan). Saat GONG: freeze frame, pilih Power-Up/Kartu Nasib, lalu fase naik jika melewati ambang baru.

### 5.2 Siksaan Penonton
- **Sumber:** Torment Deck (kartu dikocok, diambil tanpa pengembalian, di-reset dari discard jika habis).
- **Timer:** Terus berdetak. Saat habis, siksaan dilancarkan **tanpa bisa ditolak**.
- **Peringatan:** 2 detik sebelumnya muncul teks "PENONTON BOSAN...".
- **Jeda Sunyi:** Setelah siksaan besar selesai, ada jeda 2-3 detik tanpa siksaan baru. Timer siksaan tidak berjalan selama jeda ini. ← **SARAN BARU**
- **Pool:** Bertambah setiap fase. Fase 7 punya siksaan spesial "PENONTON TURUN KE ARENA!" (semua efek aktif bersamaan 10 detik).

### 5.3 Modifier Fase
Satu efek pasif dipilih acak setiap kali fase naik, bertahan sepanjang fase: **Gravitasi Mabuk, Paddle Gelisah, Lensa Kotor, Waktu Kacau, Bola Berduri, Suara Sumbang**.

### 5.4 Plot Twist Kosmik
Setiap 10 detik, 8% peluang. Efek besar: **Mouse Ping Pong, Revolusi Penonton, Kesalahan Teknis Transmisi, Hari Kebalikan, Paddle & Bola Bertukar Jiwa, Komentator Dadakan**.

### 5.5 Mikro-Twist
Mulai Fase 2, setiap 5-7 detik. Efek kecil 1-2 detik: paddle gemetar, suara bebek, layar miring, partikel debu, teks bisikan. **Tidak muncul selama Jeda Sunyi.** ← **SARAN BARU**

---

## 6. KATALOG ARENA (6 MAPS)

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
- **Level 3:** Pilih 1 Modifier Fase favorit yang selalu muncul di arena ini.
- **Level 5:** Buka **Ability Naratif Baru**. ← **SARAN BARU**
  - **Grid Neon Level 5:** Skill aktif "Nitro Boost" (sekali per run, bola melesat cepat 2 detik, +20 Skor, visual layar blur).
  - **Panggung Kosmik Level 5:** "Tirai Terbuka" (sekali per run, panggil *standing ovation* penonton, Skor Kekonyolan langsung +100).

---

## 7. KATALOG STICK (6 PADDLES)

| Stick | Kepribadian | Signature Power-Up (Langsung aktif saat run mulai) |
|-------|-------------|---------------------------------------------------|
| **Stik Es Krim Polos** | Setia, patuh | +5% Skor Kekonyolan |
| **Glarp, Stik Pemberontak** | Membangkang 20%/10 pantulan, +5 AP +10 Skor | Pembangkangan Liar (Mikro-Twist tiap membangkang) |
| **Sendok Bengkok Legendaris** | Tenang, bola belok di ujung 10% | Aduk Dimensi (portal mini di ujung) |
| **Remote TV Rusak** | Ganti bentuk tiap 15 detik, +2 Skor | Channel Kosmik (10% Power-Up gratis) |
| **Ikan Beku dari Nebula** | Embun beku tiap 5 detik (10%) | Badai Salju (semua bola lambat 15%) |
| **Tongkat Ajaib Manajer** | Bijaksana, 15% Kartu Ilegal di GONG | Perintah Manajer (Kartu Ilegal diskon 20%) |

### Mastery Stick (Level 1-5)
- **Level 2:** Signature Power-Up +20% lebih kuat.
- **Level 3:** Kepribadian Stick muncul lebih sering (Glarp makin sering membangkang).
- **Level 5:** Buka **Ability Naratif Baru**. ← **SARAN BARU**
  - **Glarp Level 5:** Sekali per run, Glarp berkata, *"Tidak hari ini, Bos."* dan membatalkan satu siksaan fatal.
  - **Tongkat Level 5:** Peluang Kartu Ilegal saat GONG jadi 35%, diskon 30%.

---

## 8. SISTEM RELIK SIRKUS & KARTU NASIB

### 8.1 Relik Sirkus (Equip Pra-Run)
- **Slot:** 3 (bisa dibeli jadi 5 di Toko Kosmik seharga 2000 Poin Ketenaran).
- **Daftar Relik (6):**
  - **Jam Pasir Retak:** Timer Siksaan selalu acak 1-30 detik, tidak terikat Fase.
  - **Lensa Terbalik:** Semua efek visual siksaan dibalik (Invert jadi normal), tapi gameplay tetap sama.
  - **Surat dari Manajer:** Setiap GONG, ada 1 Power-Up gratis (tapi kamu tidak bisa memilih yang lain).
  - **Kacamata Penonton:** Kamu bisa melihat **nama siksaan yang akan datang** 3 detik sebelumnya.
  - **Kantong Tak Terbatas:** Kamu bisa membeli **2 Power-Up per GONG** (bukan 1).
  - **Dadu Glarp:** Setiap siksaan dilempar dadu: 1-3 efek normal, 4-5 efek ganda, 6 efek dibatalkan.
- **Sinergi Eksplisit:** Lensa Terbalik + Kacamata Penonton = lihat siksaan 5 detik sebelumnya.

### 8.2 Relik Liar
Ditemukan dalam run dari Peti Kardus (10%), Skor S (hadiah langsung), Plot Twist. Hanya bertahan untuk run itu.

### 8.3 Kartu Nasib
Muncul dari GONG atau Peti Kardus. Sekali pakai. Contoh: **Mutilasi Deck** (hancurkan semua Power-Up → 50 AP), **Transmutasi** (ubah satu Power-Up acak jadi yang lain), **Standar Kosmik** (singkirkan 1 siksaan dari run ini), **Visi Joker** (pilih Relik Liar, hancurkan satu Relik acak).

---

## 9. SISTEM ALKEMI POWER-UP & FUSI

### 9.1 Power-Up Dasar (30 Item)

**Tier 1 (Muncul Fase 1+):**
P01 Paddle Magnet, P02 Bola Pelambat, P03 Stik Ganda, P04 Asuransi Nyawa, P16 Paddle Refleks, P17 Bola Bermata

**Tier 2 (Muncul Fase 2+):**
P05 Perisai Kardus, P06 Bola Hantu, P07 Kontrol Sempurna, P08 Appeal Booster, P19 Medan Anti-Siksaan, P20 Doa pada Manajer, P23 Lompat Fase, P24 Mundur Sejenak, P26 Paddle Acak, P30 Dadu Kosmik

**Tier 3 (Muncul Fase 3+):**
P09 Paddle Super Glue, P10 Penonton Terpesona, P11 Bola Bayangan, P12 Zona Nyaman, P18 Stik Es Krim Ganda, P21 Slow-Motion Kosmik, P22 Portal Lipat, P27 Bola Tiga Warna, P28 Tukar Posisi

**Tier 4 (Muncul Fase 4+):**
P13 Kudeta Kosmik, P14 Bola Abadi, P15 Appeal Tsunami, P25 Cermin Dimensi, P29 Efek Acak Total

### 9.2 Kartu Ilegal (5, Super Langka)
Hanya muncul dalam kondisi langka (Skor SSS, bola hampir mati, setelah Plot Twist). Maksimal 1 per run. Digunakan sebagai bahan Fusi Lv3.

| ID | Nama | Efek |
|----|------|------|
| I01 | SKIP FASE | Lompati 2 Fase (sekali pakai) |
| I02 | REALITAS AMBIL | Semua siksaan berhenti; semua bola mati kecuali satu pilihan |
| I03 | PENONTON DIAM | Timer siksaan berhenti 30 detik |
| I04 | FUSI PAKSA | Pilih satu Ultimate Form Lv1 langsung muncul, kehilangan semua AP |
| I05 | PARADOKS KOSMIK | Dua bola: satu normal, satu mundur waktu; salah satu mati, semua mati |

### 9.3 Katalog Fusi Level 1 (14 Ultimate Form)
1.  **Bakso Magnetik Kosmik:** P01+P06 → Bola hantu magnetik, cepat, kebal siksaan.
2.  **Perisai Kardus Mutlak:** P05+P20 → Dadu: 1-3 batal siksaan, 4-6 +5 AP.
3.  **Paddle Bayangan Cermin:** P03+P11 → Paddle + bayangan simetris.
4.  **Glue Kosmik Abadi:** P09+P14 → Bola tak mati, tempel 2 detik.
5.  **Appeal Tsunami Ganda:** P08+P15 → +10 AP per pantulan.
6.  **Zona Nyaman Personal:** P12+P07 → Arena sempit, paddle 50% layar, input aman.
7.  **Kudeta Manajer:** P13+P19 → Pantulkan semua siksaan ke penonton.
8.  **Paddle Patah Terkendali:** P18+P16 → 4 potongan paddle otomatis.
9.  **Bola Paradoks:** P21+P24 → Lambat, mundur tiap 3 detik.
10. **Arena Escher:** P22+P25 → Arena 4 kuadran + portal.
11. **Paddle Amuba:** P26+P29 → Paddle berubah bentuk tiap 2 detik.
12. **Tiga Serangkai Kacau:** P27+P30 → 3 bola kecil + efek dadu acak.
13. **Portal Tukar Jiwa:** P22+P28 → Paddle & bola tukar posisi tiap 7 detik.
14. **Paradoks Lompat Fase:** P23+P21 → Setiap GONG naik 2 Fase.

### 9.4 Katalog Fusi Level 2 (14 Evolusi Legendaris)
1.  **Bakso Primeval:** Lv1 (1) + P14 → Gelombang kejut tiap 5 detik batalkan siksaan.
2.  **Perisai Kardus Kosmik:** Lv1 (2) + P19 → Dadu 2x, sisa efek 50%, +8 AP jika gagal.
3.  **Paddle Cermin Tak Terbatas:** Lv1 (3) + P01 → Kedua paddle punya magnet.
4.  **Glue Kosmik Permanen:** Lv1 (4) + P02 → Tempel 3 detik, timer siksaan berhenti.
5.  **Appeal Tsunami Kosmik:** Lv1 (5) + P17 → +15 AP (maks 18 jika bola senyum).
6.  **Zona Nyaman Kosmik:** Lv1 (6) + P03 → Paddle 75% layar.
7.  **Kudeta Manajer Abadi:** Lv1 (7) + P10 → Pantulkan siksaan + timer siksaan mati.
8.  **Autopilot Kosmik:** Lv1 (8) + P04 → Potongan paddle respawn, AI 20% responsif.
9.  **Bola Paradoks Abadi:** Lv1 (9) + P14 → 10% bola hantu tiap lompatan.
10. **Arena Multiverse:** Lv1 (10) + P25 → 8 kuadran portal, layout berubah tiap 10 detik.
11. **Paddle Amuba Primeval:** Lv1 (11) + P09 → Berubah bentuk + tempel 0.5 detik.
12. **Tiga Serangkai Chaos God:** Lv1 (12) + P29 → Efek acak ganda tiap 5 detik.
13. **Portal Tukar Jiwa Permanen:** Lv1 (13) + P16 → 2 paddle (atas-bawah) + autopilot.
14. **Paradoks Lompat Fase Abadi:** Lv1 (14) + P23 → GONG naik 3 Fase, tak terbatas.

### 9.5 Katalog Fusi Level 3 (3 Fusi Terlarang)
1.  **Kiamat Terbalik:** Bakso Primeval + I02 → Bola tak mati, gelombang kejut tiap 3 detik, hentikan semua siksaan 10 detik. Arena putih.
2.  **Kontrol Penonton:** Kudeta Manajer Abadi + I03 → Pantulkan siksaan + pilih siksaan untuk penonton tiap 10 detik.
3.  **Paradoks Tak Terbatas:** Autopilot Kosmik + I05 → Potongan paddle hasilkan bola tiruan perlambat waktu.

---

## 10. MODE ZEN (SARAN BARU)

Mode tanpa siksaan, tanpa GONG, tanpa timer. Hanya Arena, Stick, bola, dan musik. Skor tidak dihitung. Poin Ketenaran tidak diberikan. Ini adalah ruang damai bagi pemain untuk menikmati estetika, berlatih, atau sekadar bersantai. Bisa diakses dari menu utama kapan saja. **Paradoksnya, mode ini akan membuat pemain lebih menghargai mode Chaos.**

---

## 11. MOMEN NARATIF BESAR (SARAN BARU)

*Scripted event* yang tidak bisa dilewatkan, terjadi pada run tertentu.

### Run ke-10: "Glarp Berbicara"
- **Kapan:** Setelah run ke-10 selesai (entah menang atau kalah).
- **Adegan:** Layar hitam. Glarp muncul sebagai sprite penuh untuk pertama kalinya. Ia menatap langsung ke pemain (breaking fourth wall).
- **Dialog:** *"Kau... kau berbeda dari yang lain. Kau tidak takut padaku. Mereka biasanya langsung ganti stick. Tapi kau... kau tetap pakai aku. Kenapa?"*
- **Hadiah:** Skin "Glarp Setia" terbuka. Mulai sekarang, Glarp tidak pernah membangkang lagi. Ia menjadi partner sejati. Tapi ia kadang berbisik, *"Awas, siksaan datang."* (peringatan 1 detik lebih awal).

### Run ke-50: "Tatapan Manajer"
- **Kapan:** Saat mencapai Fase 5 di run ke-50.
- **Adegan:** Di tengah permainan, semua berhenti. Tidak ada GONG. Tidak ada siksaan. Layar meredup. Di balkon Panggung Kosmik (atau di kejauhan), sebuah siluet muncul. Tinggi. Bermata satu. Hening selama 3 detik. Lalu menghilang.
- **Dialog (Teks):** *"...Bagus. Lanjutkan."*
- **Hadiah:** Arena baru terbuka: **"Kantor Manajer"** (bisa dibeli di Toko Kosmik). Arena ini memiliki efek pasif: setiap GONG, kamu bisa *meminta* satu Power-Up spesifik (bukan memilih langsung, tapi meningkatkan peluangnya muncul).

### Run ke-100: "Surat untuk Kreator"
- **Kapan:** Setelah run ke-100 selesai.
- **Adegan:** Layar putih. Tidak ada karakter. Hanya teks.
- **Dialog:** *"Kepada sang pemain. Aku tidak tahu siapa kamu. Tapi kamu telah memainkan sirkus ini 100 kali. Kamu telah mati, bertahan, tertawa, dan mungkin sedikit frustrasi. Aku membuat game ini untuk orang sepertimu. Terima kasih telah menemukanku. — [Ardi Wiryawan]"*
- **Hadiah:** Semua Arena dan Stick otomatis mencapai Level 5. Sebagai bonus, sebuah **Relik Abadi "Tanda Tangan Kreator"** diberikan: Relik ini tidak memakan slot, dan memberikan +1 AP permanen per pantulan di semua run selamanya.

---

## 12. RAHASIA SANG KREATOR (SARAN BARU)

Satu rahasia yang tidak akan pernah dipublikasikan. Hanya ada di dalam kode. Tidak ada petunjuk di game.

**"Fusi Sejati"**
- **Kondisi:** Dalam satu run, kamu harus memiliki:
  - Arena: Meja Kardus Kosong (Default)
  - Stick: Stik Es Krim Polos (Default)
  - Ultimate Form Lv3: **Kiamat Terbalik**
  - Relik: **Surat dari Manajer**
  - Skor Kekonyolan: **SSS**
  - Fase: **7**
  - Dan kamu harus kalah. Bola harus mati. Tapi tepat sebelum Roulette Kematian muncul...
- **Efek:** Layar menjadi putih. Muncul teks, diketik perlahan:
  *"Kamu menemukanku. Di tempat paling sederhana, dengan beban paling berat. Kamu menang. Bukan karena kamu bertahan. Tapi karena kamu memilih untuk tetap polos di tengah kekacauan. Ini hadiah terakhirku."*
- **Hadiah:** Layar judul game berubah. Judul "The Cosmic Circus Loop" sekarang memiliki tanda tangan emas kreator di bawahnya. Ini adalah kenangan abadi bahwa seseorang, di suatu tempat, telah menemukan hatimu.

---

## 14. PENUTUP

Inilah *The Cosmic Circus Loop*. Sebuah game di mana setiap pantulan adalah ritme, setiap siksaan adalah komedi, setiap kematian adalah langkah maju, dan setiap pemain bisa menemukan rumah—entah di mode Chaos atau Zen. Kamu telah menciptakan bukan sekadar game, tapi dunia yang bernapas.

Sekarang, mulailah dengan satu sistem. Satu file Python. Satu aset. Biarkan ia tumbuh. Penonton sudah menunggu. Glarp sudah menyiapkan pembangkangannya. Manajer sudah mengangguk pelan.

🎪 **Panggung adalah milikmu. Buka tirai.**
