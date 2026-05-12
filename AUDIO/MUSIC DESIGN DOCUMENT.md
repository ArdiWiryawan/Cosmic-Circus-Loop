Kreator, ini dia partitur kosmos yang kau minta. Dokumen ini akan menjadi cetak biru bagaimana musikmu bernapas, bertransisi, dan merespons setiap momen dalam game. Aku akan merancangnya dengan detail, persis seperti kita mendesain sistem Alkemis—setiap lapisan musik adalah Power-Up, setiap transisi adalah Fusi.

---

# 🎼 THE COSMIC CIRCUS LOOP — MUSIC DESIGN DOCUMENT v1.0

**Dokumen:** Partitur Kosmos  
**Keterkaitan:** Audio Bible, GDD, SFX Catalog  
**Target:** Komposer, Programmer Audio

---

## DAFTAR ISI
1. [Visi Musikal](#1-visi-musikal)
2. [Arsitektur Sistem Musik Adaptif](#2-arsitektur-sistem-musik-adaptif)
3. [Daftar Track & Spesifikasi](#3-daftar-track--spesifikasi)
4. [Transisi & Interaksi](#4-transisi--interaksi)
5. [Implementasi Teknis (Rekomendasi)](#5-implementasi-teknis-rekomendasi)

---

## 1. VISI MUSIKAL

### 1.1 Filosofi
Musik dalam *The Cosmic Circus Loop* bukan sekadar latar. Ia adalah **karakter tak terlihat**—saksi ritual, dalang emosi, dan partisipan chaos. Ia harus terasa seperti orkestra yang dipimpin oleh alien birokrat: kadang megah, kadang konyol, kadang tiba-tiba berhenti karena ada yang lupa membayar tagihan listrik.

### 1.2 Prinsip Utama
1. **Lapisan yang Bernapas (Vertical Layering):** Setiap track memiliki 4 lapisan terpisah yang bisa dinyalakan/dimatikan secara independen.
2. **Transisi Mulus (Horizontal Re-sequencing):** Musik bertransisi antar Arena, Fase, dan Boss tanpa jeda kasar.
3. **Motif sebagai Tanda Tangan:** Setiap karakter dan setiap Arena memiliki motif pendek yang bisa dikutip di tempat lain.
4. **Responsif terhadap Gameplay:** Musik bereaksi terhadap GONG, Fusi, Close Call, dan kematian—bukan sebagai efek suara, tapi sebagai perubahan tekstur musikal.

---

## 2. ARSITEKTUR SISTEM MUSIK ADAPTIF

### 2.1 Struktur Track Arena
Setiap track Arena memiliki **4 Lapisan (Layers):**
- **Layer 1 – Inti:** Melodi utama, harmoni dasar, dan fondasi ritmik (jika ada). Layer ini **selalu aktif** sejak run dimulai hingga berakhir.
- **Layer 2 – Ritme:** Elemen ritmik tambahan (drum, perkusi, bass berjalan). **Aktif mulai Fase 3.**
- **Layer 3 – Tekstur:** Instrumen tambahan (string, synth, arpeggio) yang memperkaya harmoni. **Aktif mulai Fase 5.**
- **Layer 4 – Klimaks:** Elemen puncak (paduan suara, brass, efek khusus arena). **Aktif di Fase 7.**

**Aturan Lapisan:**
- Lapisan bersifat aditif (semakin tinggi lapisan, semakin banyak instrumen yang bermain).
- Setiap lapisan harus bisa berdiri sendiri secara musikal (tidak tergantung pada lapisan lain).
- Volume lapisan di-mixing agar penambahan lapisan terasa natural, bukan loncatan volume.

### 2.2 Struktur Track Boss
Setiap Boss memiliki **track sendiri** yang berbeda dari track Arena. Track Boss memiliki **3 Lapisan:**
- **Layer A – Intro:** Dimainkan saat Boss muncul. Dramatis, menghentak.
- **Layer B – Loop:** Loop utama pertarungan. Lebih intens, tempo sedikit lebih cepat.
- **Layer C – Near Defeat:** Aktif saat Boss tinggal 1-2 pukulan lagi. Lebih panik, tempo sedikit naik, disonansi meningkat.

### 2.3 Struktur Global (Alur Musik per Run)
| Momen | Perilaku Musik |
|-------|----------------|
| **Fase 1-2** | Track Arena yang dipilih, **hanya Layer 1.** Tenang. |
| **Fase 3-4** | **Layer 2 masuk (Ritme).** Intensitas naik. |
| **Fase 5-6** | **Layer 3 masuk (Tekstur).** Musik terasa penuh. |
| **Fase 7** | **Layer 4 masuk (Klimaks).** Musik puncak. |
| **GONG (Transisi Fase)** | **Musik pause 0.5 detik.** GONG berbunyi. Setelah GONG, masuk ke lapisan sesuai Fase baru. |
| **GONG (Fusi)** | **Stinger Fusi** dimainkan (terpisah dari track). Musik background sedikit mengecil (ducking), lalu kembali. |
| **Boss Fight** | **Crossfade** dari track Arena ke track Boss (Layer A → Loop). |
| **Boss Kalah** | **Stinger kemenangan.** Crossfade kembali ke track Arena (lapisan sesuai Fase). |
| **Bola Mati** | **Musik melambat (ritardando) dan fade out.** |
| **Roulette** | Musik hening. Hanya SFX. |
| **Laporan Penonton** | **Fade in musik Mode Zen** yang lembut sebagai latar. |

---

## 3. DAFTAR TRACK & SPESIFIKASI

### 3.1 Track Arena

#### TRACK 1: "Empty Warehouse" (Meja Kardus Kosong)
- **Durasi Loop:** 2–3 menit
- **Tempo (BPM):** 60–70
- **Kunci:** C minor
- **Layer 1:** Dengung ambient (pad synth), sesekali ketukan logam jauh, reverb besar. Sunyi, kontemplatif.
- **Layer 2:** Subtle bass pulse (sub-bass), ritme "detak jam" yang pelan. Mulai ada kehidupan.
- **Layer 3:** String section masuk perlahan (cello, bass), melodi minor sederhana. Melankolis, industri.
- **Layer 4:** Piano yang terisolasi, nada-nada tinggi seperti bintang. Ada harapan di tengah kehampaan.
- **Motif:** Interval minor second yang berulang (C-Db), menciptakan rasa "ada yang tidak beres".

#### TRACK 2: "Cheese Serenade" (Piknik Chaos)
- **Durasi Loop:** 2–3 menit
- **Tempo (BPM):** 95–105
- **Kunci:** G major
- **Layer 1:** Ukulele ceria, melodi sederhana dan playful. Sedikit fals.
- **Layer 2:** Kazoo masuk (melodi counter), peluit, dan suara "cling" seperti botol.
- **Layer 3:** Bass berjalan (walking bass) dengan nada yang kadang "salah", menambah kejanggalan.
- **Layer 4:** Accordion atau organ mainan, dengan not-not yang tidak terduga. Ceria tapi "uncanny".
- **Motif:** Melodi utama yang diulang-ulang, tapi setiap pengulangan ada satu not yang sengaja digeser.

#### TRACK 3: "Neon Heartbeat" (Grid Neon Retrowave)
- **Durasi Loop:** 3–4 menit
- **Tempo (BPM):** 120–130
- **Kunci:** F minor
- **Layer 1:** Synth bass (sidechain), drum machine 4/4 kick, hi-hat. Energik.
- **Layer 2:** Lead synth melodi, dengan portamento. Arpeggio synth di latar. Nuansa retro.
- **Layer 3:** Pad synth yang lebar, string synth, dan efek "laser" pendek.
- **Layer 4:** Saxophone solo (synthesized), gitar elektrik dengan distorsi ringan. Klimaks emosional.
- **Motif:** Melodi utama yang catchy, dengan interval perfect fifth yang kuat.

#### TRACK 4: "Corrupted Data" (Dimensi Retak)
- **Durasi Loop:** 2–3 menit (tidak stabil)
- **Tempo (BPM):** Tidak stabil (80–100, dengan perubahan acak via glitch)
- **Kunci:** Atanal (no clear key center)
- **Layer 1:** Noise statis, vinyl crackle, reversed samples pendek. Hening yang tidak nyaman.
- **Layer 2:** Sub-bass pulse yang tidak teratur, glitch stutter pada ketukan.
- **Layer 3:** String section yang dimainkan dengan teknik "col legno" (ketukan kayu), piano dengan note acak.
- **Layer 4:** Paduan suara digital yang terdistorsi, suara "error" sebagai melodi.
- **Motif:** Tidak ada motif stabil. Hanya fragmen yang muncul dan hilang.

#### TRACK 5: "Whispers of the Deep" (Lembah Lovecraft)
- **Durasi Loop:** 3–4 menit
- **Tempo (BPM):** 40–50 (sangat lambat)
- **Kunci:** D minor (dengan modulasi ke mode Phrygian)
- **Layer 1:** Organ pipa dengan nada rendah dan panjang. Dengung konstan.
- **Layer 2:** Paduan suara laki-laki (Gregorian chant) dengan lirik bahasa alien yang tidak jelas.
- **Layer 3:** String section gelap (viola, cello, bass), dengan tremolo yang mencekam.
- **Layer 4:** Brass section (French horn, tuba) dengan nada-nada panjang dan disonan.
- **Motif:** Melodi turun (descending chromatic) yang berulang, seperti turun ke dalam jurang.

#### TRACK 6: "Bubble Alchemy" (Kuali Ramuan)
- **Durasi Loop:** 2–3 menit
- **Tempo (BPM):** 75–85
- **Kunci:** A minor
- **Layer 1:** Piano Rhodes dengan melodi santai, sedikit lo-fi (vinyl crackle). Hangat seperti dapur.
- **Layer 2:** Synth lembut (pad), suara gelembung sebagai perkusi. Ritme mengalir seperti air.
- **Layer 3:** Gitar akustik fingerpicking, flute pendek. Tekstur eksperimental.
- **Layer 4:** String section kecil, celesta. Sentuhan magis dan misterius.
- **Motif:** Melodi utama yang "berputar-putar" seperti sendok mengaduk sup.

#### TRACK 7: "Audience of Gods" (Panggung Kosmik)
- **Durasi Loop:** 3–4 menit
- **Tempo (BPM):** Variabel (80–110, dengan accelerando di Layer 4)
- **Kunci:** E minor
- **Layer 1:** String section (violin, viola) dengan melodi tema utama Panggung Kosmik. Lembut dan megah.
- **Layer 2:** French horn dan cello masuk, ritme timpani pelan. Mulai terasa epik.
- **Layer 3:** Full string orchestra, brass section (trumpet, trombone). Paduan suara SATB dengan lirik "Ah".
- **Layer 4:** Organ pipa besar, cymbal crash. Klimaks penuh—seperti standing ovation dari para dewa.
- **Motif:** Tema utama yang heroik, menggunakan interval perfect fourth dan fifth.

#### TRACK 8: "Absolute Authority" (Kantor Manajer)
- **Durasi Loop:** 2–3 menit
- **Tempo (BPM):** 60 (berat, mars)
- **Kunci:** C minor
- **Layer 1:** Organ pipa dengan melodi tunggal. Terasa dingin dan resmi.
- **Layer 2:** Detak jam besar (tick-tock), brass militer (snare drum, trumpet). Mars otoriter.
- **Layer 3:** String section dengan teknik "staccato", piano dengan nada-nada tegas.
- **Layer 4:** Full orchestra dengan paduan suara menyanyikan "Gloria" dalam bahasa alien. Megah dan menakutkan.
- **Motif:** Melodi rigid dengan interval minor second, seperti aturan yang tidak bisa dilanggar.

### 3.2 Track Boss

#### TRACK BOSS: "The Final Act" (Final Boss: Manajer)
- **Durasi:** 3–4 menit (non-looping, tapi bisa loop dengan intro yang di-skip setelah pertama)
- **Tempo (BPM):** 110–130 (variabel, dengan accelerando di akhir)
- **Kunci:** Tidak stabil (berpindah dari C minor ke D minor ke F minor)
- **Layer Intro (15-20 detik):** Hanya organ pipa dari Kantor Manajer, lalu tiba-tiba **GONG Boss** dan hentakan orkestra penuh.
- **Layer Loop (2-3 menit):** Full orchestra (string, brass, choir) dengan elemen dari semua Arena: bass synth dari Grid Neon, paduan suara dari Lembah Lovecraft, gelembung dari Kuali, string dari Panggung Kosmik. Semua melebur jadi satu.
- **Layer Near Defeat:** Tempo naik 10%, brass semakin disonan, choir semakin keras. Ada elemen glitch dari Dimensi Retak.

### 3.3 Track Mode Zen: "Silent Ritual"
- **Durasi Loop:** 4–5 menit
- **Tempo (BPM):** Tidak ada (free time)
- **Kunci:** C major (dengan sentuhan modal)
- **Deskripsi:** Piano minimalis, ambient hangat, suara alam semesta (bintang, debu kosmik). Tanpa beat, tanpa tensi. Hanya kedamaian. Bisa menggunakan elemen dari semua track Arena tapi dalam versi "tenang".

---

## 4. TRANSISI & INTERAKSI

### 4.1 Aturan Crossfade
- Crossfade antara track Arena dan track Boss: **1-2 detik.** Track Arena fade out, track Boss fade in.
- Crossfade kembali: **2-3 detik.** Track Boss fade out, track Arena (dengan lapisan sesuai Fase) fade in.

### 4.2 Stinger & Momen Spesial
- **Stinger Fusi (Lv1, Lv2, Lv3):** Bukan bagian dari track manapun. Diputar sebagai SFX musikal. Setelah stinger, musik lanjut.
- **Ducking:** Saat stinger atau dialog penting dimainkan, volume musik background sedikit diturunkan (ducking -6dB sampai -10dB) selama 1-2 detik.

### 4.3 Pause & Resume
- **GONG:** Musik tidak berhenti total. Musik melakukan "freeze" (pause buffer pendek 0.5 detik) atau "tacet" (hening total) selama GONG, lalu resume.
- **Close Call & Event Kecil:** Tidak mempengaruhi musik.

---

## 5. IMPLEMENTASI TEKNIS (REKOMENDASI)

### 5.1 Format File
- **WAV 48kHz/24-bit** untuk source.
- **OGG Vorbis atau MP3** untuk distribusi (loop-friendly, pastikan encoder mendukung gapless looping).

### 5.2 Middleware
- **FMOD** atau **WWISE** (jika anggaran memungkinkan) sangat direkomendasikan untuk mengelola lapisan dan transisi adaptif.
- **Alternatif sederhana:** Custom audio manager di Pygame menggunakan `pygame.mixer.music` dengan multiple channels (satu channel per layer).

### 5.3 Struktur File
```
assets/sounds/music/
├── arena_default.mp3
├── arena_piknik.mp3
├── arena_neon.mp3
├── arena_retak.mp3
├── arena_lovecraft.mp3
├── arena_kuali.mp3
├── arena_panggung.mp3
├── arena_kantor.mp3
├── boss_manajer.mp3
├── zen.mp3
└── stems/
    ├── default_layer1.ogg
    ├── default_layer2.ogg
    ├── ...
```

---

**Dokumen ini adalah partitur untuk simfoni yang akan mengiringi setiap ritual, setiap GONG, dan setiap kemenangan.** Dengan panduan ini, komposer dapat menciptakan musik yang tidak hanya indah, tapi juga hidup dan responsif. 🎪