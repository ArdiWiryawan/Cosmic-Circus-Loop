@
---

## BAGIAN 1: PRINSIP MIXING “THE COSMIC CIRCUS LOOP” – AGAR TIDAK BERTABRAKAN

Bayangkan sirkus sungguhan. Ada aksi akrobat, badut, ringmaster, dan musik pengiring. Semua bersuara, tapi tidak ada yang saling memekikkan telinga. Itulah tujuan kita. Berikut adalah piramida prioritas audio yang harus kau patuhi:

1. **SFX Gameplay Kritis** (Prioritas Tertinggi) — Pantulan bola, GONG, peringatan siksaan, kematian bola.
2. **SFX Feedback Pemain** — Power-Up terkumpul, Fusi terjadi, UI click.
3. **SFX Atmosfer & Hiburan** — Tawa penonton, suara arena (angin, dengung lampu), Plot Twist konyol.
4. **Musik Latar** — Irama dan suasana arena.
5. **Ambience** — Noise lantai, reverb ekor ruangan.

Musik harus menjadi lantai dansa, bukan tembok. Maka, kita akan menggunakan teknik **Dynamic Ducking** dan **Frequency Slotting**.

### 1.1 Dynamic Ducking (Sidechain Compression) – Musik Minggir Saat Penting
Setiap kali SFX Prioritas 1 dan 2 berbunyi, musik harus otomatis mengecil sejenak, lalu kembali. Bukan fade lambat, tapi reaksi instan.
- **Trigger:** Suara pantulan bola, GONG, suara peringatan dadu siksaan, suara Fusi, suara Level Up.
- **Teknik:** Pasang *compressor* di bus Musik dengan *sidechain input* dari bus SFX Kritis. Atur:
  - **Threshold:** -24 dB (jadi suara kecil pun bisa memicu).
  - **Ratio:** 4:1 (cukup agresif).
  - **Attack:** 5 ms (secepat kilat).
  - **Release:** 150-200 ms (kembali halus, tidak berdenyut).
  - **Gain Reduction:** Maksimal -6 dB. Musik hanya perlu sedikit merunduk, bukan hilang total. Ini cukup agar pantulan bola tetap tajam.

Untuk momen sakral seperti GONG, bisa lebih dramatis: -10 dB gain reduction dengan release 500 ms, sehingga hening sejenak mengisi ruang sebelum musik kembali menggelegar.

### 1.2 Frequency Slotting – Setiap Suara Punya Kamar Sendiri
Jangan biarkan frekuensi bertabrakan. Aku membagi spektrum untuk game ini:

| Rentang Frekuensi | Penghuni Utama | Larangan |
|-------------------|----------------|----------|
| **20-80 Hz (Sub)** | Sub-bass GONG, bass drop Dimensi Retak | Musik orchestra cello/bass (high-pass di 80 Hz) |
| **80-250 Hz (Low)** | Kick drum (Grid Neon), taiko (Panggung Kosmik), body pantulan | Hindari low-mid piano/strings pad berlebihan |
| **250-800 Hz (Low-Mid)** | Fondasi musik, warmth | Jangan taruh SFX UI di sini (biar tidak muddy) |
| **800-2 kHz (High-Mid)** | **Pantulan bola** (prioritas!), vokal penonton, SFX Power-Up | Musik lead synth/melodi harus dikurangi di sini saat pantulan (pakai dynamic EQ sidechain) |
| **2-6 kHz (Presence)** | Kilauan SFX, gemerincing koin, detail string | Jangan terlalu tajam, bisa melelahkan |
| **6-20 kHz (Air)** | Reverb SFX, noise lantai (dust/static), ambience | Batasi hi-hat berlebihan |

**Aturan Emas:** Buat *dynamic EQ* di track musik yang dipicu oleh suara pantulan bola (sekitar 800-1200 Hz). Setiap pantulan, turunkan 3 dB di frekuensi itu dari musik selama 100 ms. Maka, "tak-tik" bola akan selalu menembus, tanpa musik terdengar dipotong.

### 1.3 Target Loudness & Dynamic Range
Untuk game mobile dan PC, aku merekomendasikan:
- **Musik (loop):** -20 LUFS Integrated, True Peak -2 dB (agar tidak klipping di speaker kecil).
- **SFX Campuran:** -16 LUFS Short-term (lebih keras dari musik, tetapi tidak memekakkan).
- **Master Bus:** -14 LUFS Integrated, True Peak -1 dBTP. Gunakan limiter ringan hanya untuk menangkap puncak liar.

Pastikan file musikmu sendiri sudah di-master di level itu. Jika belum, kamu bisa menurunkan gain-nya di mesin game sebesar 4-6 dB, lalu biarkan ducking bekerja.

---

## BAGIAN 2: DESAIN SOUND EFFECT – KATALOG LENGKAP “THE COSMIC CIRCUS LOOP”

Sekarang, mari kita ciptakan suara untuk setiap kejadian. Aku akan memberikan karakter sonik, referensi, dan catatan implementasi. Semua suara harus *mono* untuk presisi spasial, kecuali ambience dan musik yang stereo.

### 2.1 GAMEPLAY INTI (Prioritas Tertinggi)

| Kejadian | Nama SFX | Deskripsi & Karakter | Tips Teknis |
|----------|----------|----------------------|-------------|
| **Bola memantul di paddle** | `sfx_paddle_hit` | Pantulan kayu stik es krim yang padat, sedikit denting manis (lapisan sparkle). Variasi pitch random ±2 semitone agar tidak monoton. | Layer 1: transient kayu tegas (500 Hz). Layer 2: chime pendek (2 kHz). Volume -12 dB. |
| **Bola memantul di dinding** | `sfx_wall_bounce` | Sedikit lebih metalik, bergema pendek, seperti bola karet memantul di kardus atau neon. Untuk Arena Panggung Kosmik, tambahkan reverb plate halus (concert hall tiny). | Reverb hanya di pantulan dinding, bukan paddle. Durasi 0.2 detik. |
| **Bola mati** | `sfx_ball_death` | Suara gelembung pecah + sedikit efek "pop" digital, lalu diikuti suara penonton kecewa "aww" (halus). Tidak boleh traumatis, hanya sedikit sedih. | Layer bubble pop (300 Hz) + reversed chime pendek + crowd sigh. Volume -10 dB. |
| **GONG (Transisi Fase)** | `sfx_gong` | Dentuman gong raksasa kosmik, berlapis: low boom (50 Hz sustained), mid pang (400 Hz), dan high shimmer (10 kHz). Ada gaung panjang (2 detik) yang terasa sakral. | **Efek ducking maksimal pada musik** (-10 dB) saat ini dipicu. GONG adalah momen hening sebelum pilihan. |
| **Timer Siksaan (Dadu)** | `sfx_torment_timer` | Detak jam mekanis tapi dibuat geli—kayu ketuk dengan sedikit efek pitch bend naik setiap detik, makin cepat. | Loop pendek 1 detik, dimainkan bertumpuk sesuai sisa waktu. Volume rendah agar tidak panik. |

### 2.2 POWER-UP, FUSI, DAN PROGRESI

| Kejadian | Nama SFX | Deskripsi | Catatan |
|----------|----------|-----------|---------|
| **Power-Up Muncul (GONG)** | `sfx_powerup_appear` | Suara "shimmer" magis—seperti bintang kecil berdenting, atau sendok menyentuh gelas kristal. Berikan slight delay stereo (Haas effect) agar terasa tersebar di arena. | Durasi 0.5 detik, volume -15 dB. |
| **Power-Up Dipilih** | `sfx_powerup_select` | Suara mesin kasir "cha-ching!" yang konyol tapi futuristik. Atau bisa suara "confirmed" dengan nada naik. | Positive feedback. Pitch naik untuk setiap tier power-up. |
| **Fusi Terjadi!** | `sfx_fusion` | Ledakan kecil + suara "transformer" bergema, lalu lonceng kemenangan. Harus megah, karena momen langka. | Durasi 1.5 detik, ducking musik -5 dB. Dapat +50 Skor Kekonyolan, jadi layak dirayakan. |
| **Level Up Mikro** | `sfx_micro_levelup` | Nada pendek naik 3 oktaf, seperti xylophone. Ceria, tidak mengganggu. | Volume -18 dB, hanya aksen. |

### 2.3 PLOT TWIST & MIKRO-TWIST (WarioWare Style)

| Kejadian | SFX | Deskripsi |
|----------|-----|-----------|
| **Mikro-Twist Umum** | `sfx_micro_twist` | Suara kartun: peluit slide, “boing”, “sproing”, atau bebek karet. Pilih 5 variasi, acak. |
| **Plot Twist Besar** | `sfx_plot_twist` | Drumroll pendek (0.5 detik) + simbal terbalik + "ta-da!" yang dramatis. Atau bisa suara penonton histeris. |
| **Revolusi Penonton** | `sfx_crowd_revolt` | Tepuk tangan dan sorakan ramai, tapi diproses dengan radio-filter (seperti lewat megafon). Volume -12 dB. |

### 2.4 ARENA SPESIFIK (Ambience & Tambahan)

| Arena | SFX Khusus |
|-------|------------|
| **Meja Kardus** | `sfx_cardboard_sway` — Suara bohlam berayun pelan dengan dengung listrik, tetesan air jauh. Loop 10 detik, sangat redup (-30 dB). |
| **Grid Neon** | `sfx_neon_hum` — Dengung lampu neon, sesekali crackle listrik. Loop 8 detik dengan variasi kecil. |
| **Piknik Keju** | `sfx_piknik_amb` — Suara semut alien kecil "wiii" sesekali, angin sepoi-sepoi. Juga suara "om-nom" saat semut kena bola. |
| **Panggung Kosmik** | `sfx_stage_amb` — Reverb ruang besar (pakai impulse response gedung teater), bisikan penonton jauh, suara gorden bergerak. |
| **Dimensi Retak** | `sfx_glitch_amb` — Noise statis, suara data korup, potongan "error" Windows sesekali tapi sudah di-musicalkan. |
| **Kuali Sup** | `sfx_cauldron_amb` — Gelembung meletup, api kecil, sendok kayu diaduk. Loop 15 detik. |

### 2.5 UI & NAVIGASI

| Kejadian | SFX | Deskripsi |
|----------|-----|-----------|
| **Tombol Klik** | `sfx_ui_click` | Ketuk pendek kayu tipis, seperti stik es krim diketukkan ke meja. Volume -20 dB. |
| **Buka Peti Kardus** | `sfx_chest_open` | Suara kardus dibuka + "shimmer" hadiah. Ceria. |
| **Kartu Nasib Muncul** | `sfx_card_flip` | Kartu remi dibalik cepat, dengan glitter. |
| **Poin Ketenaran Naik** | `sfx_fame_up` | Tangga nada naik cepat (glissando) dengan lonceng kecil, makin tinggi semakin megah. |

---

## BAGIAN 3: IMPLEMENTASI TEKNIS (PANDUAN UNTUK ENGINE / MIDDLEWARE)

Kreator, aku tidak tahu apakah engkau menggunakan Unity, Unreal, FMOD, atau Wwise. Tetapi prinsipnya tetap sama. Berikut arsitektur sederhana yang bisa kau terapkan:

1. **Buat Audio Mixer dengan Bus Berlapis:**
   - `Master Bus` (output).
   - `SFX Bus` (semua SFX) → `Master`.
   - `Music Bus` → `Master`, dengan *sidechain compressor* yang mendengarkan `SFX_Critical` send.
   - `Ambience Bus` → `Master`.

2. **Di dalam `SFX Bus`, buat prioritas virtual:**
   - Kamu bisa menggunakan fitur *priority* di FMOD/Wwise (playback priority). Atur pantulan bola dan GONG dengan prioritas tertinggi (misalnya 128), sehingga jika terlalu banyak suara, yang paling penting tetap berbunyi. Fitur *voice limiting* bisa membunuh suara rendah prioritas.

3. **Gunakan Random Pitch & Volume untuk Variasi:**
   - Pantulan paddle: random pitch ±3 semitone, volume ±2 dB. Setiap pantulan akan terasa hidup.
   - Power-up muncul: random pitch ±1 oktaf (kecil vs besar).

4. **Uji dengan Banyak Pantulan Cepat:**
   - Saat bola tergila-gila, puluhan pantulan terjadi per detik. Pastikan ducking tidak menyebabkan musik "bernafas" terlalu kencang. Release 150 ms cukup aman. Uji dengan skenario *stress test*.

---

## BAGIAN 4: CHECKLIST UNTUKMU, KREATOR

Sebelum kau naikkan tirai, periksa ini:
- [ ] Setiap SFX sudah dalam format mono atau stereo yang tepat (SFX mono, ambience stereo).
- [ ] File SFX pendek (0.1-2 detik), tanpa silence di awal/akhir (trim rapat).
- [ ] Volume relatif sudah diatur berdasarkan prioritas (GONG paling keras, UI paling lemah).
- [ ] Ducking berfungsi: musik mengecil saat pantulan dan GONG.
- [ ] Frekuensi 800-1200 Hz pada musik tidak beradu dengan pantulan bola (pakai dynamic EQ).
- [ ] Tes di speaker kecil (smartphone) — apakah pantulan dan musik masih jelas?
- [ ] Tes dengan headphone — apakah ada kelelahan kuping (fatigue) setelah 15 menit? Jika ya, kurangi 2-6 kHz di SFX atau master.

---

Kini, Kreator, engkau tidak hanya memiliki musik untuk setiap arena, tetapi juga **rencana tata suara yang akan menjaga kewarasan pemain setelah puluhan jam**. Audio adalah sihir yang tak terlihat; ia mengalirkan emosi tanpa disadari. Dengan pengaturan ini, setiap pantulan akan terasa renyah, setiap GONG sakral, dan setiap kejutan konyol akan membuat pemain tersenyum—semua tanpa meninggalkan dengung kelelahan di telinga.

Pergilah, dan racik ramuan terakhirmu. Bila ada satu frekuensi pun yang memberontak, panggil aku. 🎩🔊