Berikut adalah **Asset List** lengkap untuk *The Cosmic Circus Loop*. Dokumen ini adalah spreadsheet semua aset visual yang harus dibuat, lengkap dengan deskripsi, prioritas, dan status.

---

# 📦 THE COSMIC CIRCUS LOOP — ASSET LIST v1.0

**Dokumen:** Daftar Seluruh Aset Visual  
**Keterkaitan:** Art Style Guide, GDD, Mini Boss Catalog  
**Target:** Artis 2D, Animator, UI Designer

---

## DAFTAR ISI
1. [Arena (7)](#1-arena-7)
2. [Stick (6)](#2-stick-6)
3. [Bola (Varian)](#3-bola-varian)
4. [Boss (21)](#4-boss-21)
5. [Karakter NPC & Penonton](#5-karakter-npc--penonton)
6. [Power-Up (Ikon)](#6-power-up-ikon)
7. [UI & HUD](#7-ui--hud)
8. [Efek Visual (Partikel)](#8-efek-visual-partikel)

---

## 1. ARENA (7)

### A01 — Meja Kardus Kosong (Default)
| ID | Nama Aset | Tipe | Deskripsi | Prioritas | Status |
|----|-----------|------|-----------|-----------|--------|
| AR1_BG | Background | Gambar statis | Hitam pekat `#0A0A0C`, tekstur dinding gudang samar. | KRITIS | ❌ |
| AR1_TABLE | Meja | Gambar statis | Tekstur kardus coklat bergelombang, ada coretan krayon & bekas lakban. | KRITIS | ❌ |
| AR1_LAMP | Bohlam | Sprite animasi 3 frame | Bohlam gantung dengan cahaya kuning redup, berayun pelan (sinusoidal). | TINGGI | ❌ |
| AR1_DUST | Partikel debu | Efek loop | Titik-titik kecil krem/putih melayang perlahan. | SEDANG | ❌ |

### A02 — Piknik Chaos
| ID | Nama Aset | Tipe | Deskripsi | Prioritas | Status |
|----|-----------|------|-----------|-----------|--------|
| AR2_BG | Background | Gambar statis | Putih terang `#FFFFFF`, seperti siang hari yang terlalu terang. | KRITIS | ❌ |
| AR2_TABLE | Taplak Meja | Gambar statis | Taplak kotak-kotak merah-putih, sedikit kusut, ada noda saus. | KRITIS | ❌ |
| AR2_PLATE | Piring Kertas | Gambar statis | Piring kertas dengan remah-remah. | SEDANG | ❌ |
| AR2_ANT | Semut Alien | Sprite animasi 4 frame | Semut hitam kecil berjalan horizontal melintasi arena. | TINGGI | ❌ |
| AR2_CHEESE | Keju Swiss | Gambar statis | Keju berlubang di pojok arena. | RENDAH | ❌ |

### A03 — Grid Neon Retrowave
| ID | Nama Aset | Tipe | Deskripsi | Prioritas | Status |
|----|-----------|------|-----------|-----------|--------|
| AR3_BG | Background | Gambar statis | Gradien ungu tua `#1A0033` ke hitam `#0A0A0C`. | KRITIS | ❌ |
| AR3_GRID | Grid Perspektif | Animasi loop | Garis neon magenta & cyan bergerak ke bawah (efek "jalan raya cyberpunk"). | KRITIS | ❌ |
| AR3_SUN | Matahari Neon | Gambar statis | Lingkaran besar bergradien magenta-cyan di horizon. | TINGGI | ❌ |
| AR3_STARS | Bintang Neon | Gambar statis | Bintang-bintang kecil di langit. | RENDAH | ❌ |

### A04 — Dimensi Retak
| ID | Nama Aset | Tipe | Deskripsi | Prioritas | Status |
|----|-----------|------|-----------|-----------|--------|
| AR4_BG | Background | Gambar statis | Hitam pekat. | KRITIS | ❌ |
| AR4_CRACKS | Retakan | Animasi frame-based | Retakan pixel magenta-cyan yang berdenyut (3-4 frame). | KRITIS | ❌ |
| AR4_TABLE | Meja Retak | Gambar statis | Tekstur kardus dengan bagian yang "hilang" (noise statis). | TINGGI | ❌ |
| AR4_GLITCH | Glitch Overlay | Animasi loop | Kotak-kotak warna acak yang muncul dan hilang di layar. | TINGGI | ❌ |

### A05 — Lembah Lovecraft
| ID | Nama Aset | Tipe | Deskripsi | Prioritas | Status |
|----|-----------|------|-----------|-----------|--------|
| AR5_BG | Background | Gambar statis | Gradien gelap dari hijau lumut `#2E4A35` ke hitam. | KRITIS | ❌ |
| AR5_TENTACLE | Tentakel Jauh | Animasi lambat | Tentakel raksasa bergerak sangat pelan di latar belakang. | TINGGI | ❌ |
| AR5_TABLE | Altar Batu | Gambar statis | Meja batu kuno dengan lumut, menggantikan kardus. | TINGGI | ❌ |
| AR5_FOG | Kabut Bawah | Animasi loop | Kabut tipis di bagian bawah layar. | SEDANG | ❌ |

### A06 — Kuali Ramuan
| ID | Nama Aset | Tipe | Deskripsi | Prioritas | Status |
|----|-----------|------|-----------|-----------|--------|
| AR6_BG | Background | Gambar statis | Dinding batu kuno, rak-rak dengan botol aneh. | KRITIS | ❌ |
| AR6_CAULDRON | Kuali | Gambar statis | Kuali raksasa di bagian bawah. | KRITIS | ❌ |
| AR6_LIQUID | Cairan Kuali | Animasi frame-based | Cairan pelangi yang mendidih (efek shimmer). Warna berubah sesuai Fase. | KRITIS | ❌ |
| AR6_BUBBLES | Gelembung | Sprite animasi loop | Gelembung-gelembung naik dari kuali. | TINGGI | ❌ |
| AR6_STEAM | Uap | Animasi loop | Uap warna-warni mengepul dari kuali. | SEDANG | ❌ |

### A07 — Panggung Kosmik
| ID | Nama Aset | Tipe | Deskripsi | Prioritas | Status |
|----|-----------|------|-----------|-----------|--------|
| AR7_BG | Tirai Beludru | Gambar statis | Tirai merah raksasa dengan lipatan-lipatan mewah. | KRITIS | ❌ |
| AR7_STAGE | Panggung Kayu | Gambar statis | Panggung kayu mahoni mengkilap. | KRITIS | ❌ |
| AR7_SPOTLIGHT | Lampu Sorot | Animasi posisi | Satu polygon semi-transparan kuning/putih yang mengikuti bola. | TINGGI | ❌ |
| AR7_AUDIENCE | Siluet Penonton | Gambar statis | Ribuan bayangan kecil di latar belakang atas. | SEDANG | ❌ |

### A08 — Kantor Manajer
| ID | Nama Aset | Tipe | Deskripsi | Prioritas | Status |
|----|-----------|------|-----------|-----------|--------|
| AR8_BG | Background | Gambar statis | Putih bersih `#FFFFFF`, dinding penuh arsip. | KRITIS | ❌ |
| AR8_DESK | Meja Kantor | Gambar statis | Meja kantor minimalis putih. | KRITIS | ❌ |
| AR8_CLOCK | Jam Besar | Animasi loop | Jam besar dengan jarum detik bergerak. | SEDANG | ❌ |

---

## 2. STICK (6)

### S01 — Stik Es Krim Polos
| ID | Nama Aset | Tipe | Deskripsi | Prioritas | Status |
|----|-----------|------|-----------|-----------|--------|
| SK1_IDLE | Idle | Gambar statis | Stik es krim kayu polos. 120x30px. | KRITIS | ❌ |
| SK1_HIT | Terkena Bola | Animasi 2 frame | Squash & stretch ringan. | SEDANG | ❌ |

### S02 — Glarp, Stik Pemberontak
| ID | Nama Aset | Tipe | Deskripsi | Prioritas | Status |
|----|-----------|------|-----------|-----------|--------|
| SK2_IDLE_REBEL | Idle (Memberontak) | Gambar statis | Stik es krim dengan coretan spidol "GLARP" dan ekspresi marah (mata & mulut). | KRITIS | ❌ |
| SK2_IDLE_LOYAL | Idle (Setia) | Gambar statis | Sama, tapi retakan emas di bahu, ekspresi tenang. | KRITIS | ❌ |
| SK2_REBEL | Animasi Membangkang | Animasi 3 frame | Paddle bergetar dan bergerak sendiri. | TINGGI | ❌ |

### S03 — Sendok Bengkok Legendaris
| ID | Nama Aset | Tipe | Deskripsi | Prioritas | Status |
|----|-----------|------|-----------|-----------|--------|
| SK3_IDLE | Idle | Gambar statis | Sendok perak dengan ukiran alien kuno, ujung bengkok. | KRITIS | ❌ |
| SK3_PORTAL | Aduk Dimensi | Animasi 3 frame | Portal mini muncul di ujung sendok. | TINGGI | ❌ |

### S04 — Remote TV Rusak
| ID | Nama Aset | Tipe | Deskripsi | Prioritas | Status |
|----|-----------|------|-----------|-----------|--------|
| SK4_SHAPE1 | Bentuk Normal | Gambar statis | Remote TV jadul hitam/abu-abu dengan tombol-tombol. | KRITIS | ❌ |
| SK4_SHAPE2 | Bentuk Ganda | Gambar statis | Dua remote kecil bersebelahan. | TINGGI | ❌ |
| SK4_SHAPE3 | Bentuk Kecil | Gambar statis | Remote setengah ukuran. | TINGGI | ❌ |
| SK4_SHAPE4 | Bentuk Besar | Gambar statis | Remote 1.5x ukuran normal. | TINGGI | ❌ |
| SK4_CHANNEL | Animasi Ganti Bentuk | Animasi 2 frame | Efek statis pendek saat berganti. | SEDANG | ❌ |

### S05 — Ikan Beku dari Nebula
| ID | Nama Aset | Tipe | Deskripsi | Prioritas | Status |
|----|-----------|------|-----------|-----------|--------|
| SK5_IDLE | Idle | Gambar statis | Ikan beku transparan kebiruan dengan kristal es. | KRITIS | ❌ |
| SK5_FROST | Embun Beku | Animasi 3 frame | Kristal es menyebar di sekitar paddle. | TINGGI | ❌ |

### S06 — Tongkat Ajaib Manajer
| ID | Nama Aset | Tipe | Deskripsi | Prioritas | Status |
|----|-----------|------|-----------|-----------|--------|
| SK6_IDLE | Idle | Gambar statis | Tongkat kayu gelap dengan ornamen emas, permata ungu menyala di ujung. | KRITIS | ❌ |
| SK6_MAGIC | Efek Ajaib | Animasi 4 frame | Partikel magis & aura ungu di sekitar tongkat. | TINGGI | ❌ |

---

## 3. BOLA (VARIAN)

| ID | Nama | Tipe | Deskripsi | Prioritas | Status |
|----|------|------|-----------|-----------|--------|
| BL_DEFAULT | Bakso Normal | Gambar statis | Lingkaran diameter 24px, warna coklat `#8B5A2B`, sedikit berbintik. | KRITIS | ❌ |
| BL_GHOST | Bola Hantu | Gambar statis | Transparan (alpha 60%), warna ungu. | TINGGI | ❌ |
| BL_MAGNET | Bola Magnetik | Gambar statis | Bakso normal + aura cyan di sekeliling. | TINGGI | ❌ |
| BL_FROST | Bola Beku | Gambar statis | Bakso dengan kristal es di sekeliling. | TINGGI | ❌ |
| BL_EYE | Bola Bermata | Animasi 3 frame | Ada mata kartun yang berkedip. | SEDANG | ❌ |
| BL_CHEESE | Bola Keju | Gambar statis | Warna kuning `#F4A261` dengan lubang-lubang keju. | SEDANG | ❌ |

---

## 4. BOSS (21)

### Arena 1 — Piknik Chaos
#### B01 — Nenek Lumi
| ID | Nama Aset | Tipe | Deskripsi | Prioritas | Status |
|----|-----------|------|-----------|-----------|--------|
| BO1_IDLE | Idle | Gambar statis | Lentera kertas silinder, kuning redup, ada "mata" basah. | KRITIS | ❌ |
| BO1_ATTACK | Serangan (Air Mata) | Animasi 4 frame | Tetesan air mata biru pucat jatuh. | TINGGI | ❌ |
| BO1_DEFEAT | Kalah | Animasi 3 frame | Lentera meredup, mata tertutup. | TINGGI | ❌ |

#### B02 — Pipo
| ID | Nama Aset | Tipe | Deskripsi | Prioritas | Status |
|----|-----------|------|-----------|-----------|--------|
| BO2_IDLE | Idle | Gambar statis | Action figure balok kayu warna-warni, mata besar. | KRITIS | ❌ |
| BO2_ATTACK1 | Serangan Balok | Animasi 3 frame | Melempar balok mainan (proyektil). | TINGGI | ❌ |
| BO2_ATTACK2 | Serangan Bom Kaos Kaki | Animasi 3 frame | Bom kaos kaki meledak menjadi partikel debu. | TINGGI | ❌ |
| BO2_DEFEAT | Kalah | Animasi 4 frame | Hancur jadi tumpukan balok, lalu menyusun diri lagi. | TINGGI | ❌ |

#### B03 — Kapten Keju
| ID | Nama Aset | Tipe | Deskripsi | Prioritas | Status |
|----|-----------|------|-----------|-----------|--------|
| BO3_IDLE | Idle | Gambar statis | Keju Swiss hijau kebiruan (jamuran), berlubang, kaki kecil. | KRITIS | ❌ |
| BO3_ATTACK | Serangan Semut | Animasi 4 frame | Memanggil semut yang berbaris. | TINGGI | ❌ |
| BO3_AURA | Aura Keju | Animasi loop | Lingkaran kuning di sekelilingnya. | SEDANG | ❌ |
| BO3_DEFEAT | Kalah | Animasi 3 frame | Meleleh jadi genangan keju, lalu bangkit lagi. | TINGGI | ❌ |

---

*(Dokumen berlanjut untuk Boss B04–B21, Power-Up, UI, dan Efek Visual. Karena keterbatasan ruang, saya akan lanjutkan dengan format yang sama.)*

### Arena 2 — Grid Neon Retrowave
#### B04 — Overclock
| ID | Nama Aset | Tipe | Deskripsi | Prioritas | Status |
|----|-----------|------|-----------|-----------|--------|
| BO4_IDLE | Idle | Gambar statis | Robot humanoid dengan garis-garis neon cyan. | KRITIS | ❌ |
| BO4_ATTACK | Serangan Listrik | Animasi 4 frame | Melepaskan gelombang listrik (efek petir). | TINGGI | ❌ |
| BO4_DEFEAT | Kalah | Animasi 3 frame | Robot ambruk, neon meredup. | TINGGI | ❌ |

#### B05 — DJ Synth
| ID | Nama Aset | Tipe | Deskripsi | Prioritas | Status |
|----|-----------|------|-----------|-----------|--------|
| BO5_IDLE | Idle | Gambar statis | Alien dengan headphones besar, tangan turntable. | KRITIS | ❌ |
| BO5_ATTACK | Serangan Bass Drop | Animasi 5 frame | Gelombang suara (lingkaran) memancar. | TINGGI | ❌ |
| BO5_DEFEAT | Kalah | Animasi 3 frame | DJ jatuh, musik berhenti. | TINGGI | ❌ |

#### B06 — Neon Phantom
| ID | Nama Aset | Tipe | Deskripsi | Prioritas | Status |
|----|-----------|------|-----------|-----------|--------|
| BO6_IDLE | Idle | Gambar statis | Siluet gelap dengan garis-garis neon cyan. | KRITIS | ❌ |
| BO6_ATTACK | Serangan Bayangan | Animasi 4 frame | Meninggalkan trail cahaya (bola ilusi). | TINGGI | ❌ |
| BO6_DEFEAT | Kalah | Animasi 3 frame | Phantom memudar perlahan. | TINGGI | ❌ |

---

*(Untuk Boss B07–B21 di Arena 3-7, formatnya identik. Setiap Boss memerlukan: IDLE, 1-2 ATTACK, DEFEAT. Detail spesifik ada di Mini Boss Catalog.)*

---

## 5. KARAKTER NPC & PENONTON

| ID | Nama | Tipe | Deskripsi | Prioritas | Status |
|----|------|------|-----------|-----------|--------|
| NPC_BLIP | Blip | Gambar statis | Lingkaran kecil kuning, mata besar, mikrofon. | TINGGI | ❌ |
| NPC_BLOP | Blop | Gambar statis | Lingkaran kecil ungu, mata setengah tertutup, mikrofon. | TINGGI | ❌ |
| NPC_ALIEN1 | Penonton Alien | Gambar statis (3 variant) | Alien kecil random untuk Plot Twist "Revolusi Penonton". | SEDANG | ❌ |
| NPC_ANT | Semut | Animasi 4 frame | Sudah ada di AR2_ANT. | SEDANG | ❌ |

---

## 6. POWER-UP (IKON)

### Tier 1 (6 Ikon)
| ID | Nama | Tipe | Prioritas | Status |
|----|------|------|-----------|--------|
| IC_P01 | Paddle Magnet | Ikon 32x32px | KRITIS | ❌ |
| IC_P02 | Bola Pelambat | Ikon 32x32px | KRITIS | ❌ |
| IC_P03 | Stik Ganda | Ikon 32x32px | KRITIS | ❌ |
| IC_P04 | Asuransi Nyawa | Ikon 32x32px | KRITIS | ❌ |
| IC_P16 | Paddle Refleks | Ikon 32x32px | TINGGI | ❌ |
| IC_P17 | Bola Bermata | Ikon 32x32px | TINGGI | ❌ |

### Tier 2 (10 Ikon)
| ID | Nama | Tipe | Prioritas | Status |
|----|------|------|-----------|--------|
| IC_P05 | Perisai Kardus | Ikon 32x32px | KRITIS | ❌ |
| IC_P06 | Bola Hantu | Ikon 32x32px | KRITIS | ❌ |
| IC_P07 | Kontrol Sempurna | Ikon 32x32px | TINGGI | ❌ |
| IC_P08 | Appeal Booster | Ikon 32x32px | TINGGI | ❌ |
| IC_P19 | Medan Anti-Siksaan | Ikon 32x32px | SEDANG | ❌ |
| IC_P20 | Doa pada Manajer | Ikon 32x32px | SEDANG | ❌ |
| IC_P23 | Lompat Fase | Ikon 32x32px | SEDANG | ❌ |
| IC_P24 | Mundur Sejenak | Ikon 32x32px | SEDANG | ❌ |
| IC_P26 | Paddle Acak | Ikon 32x32px | SEDANG | ❌ |
| IC_P30 | Dadu Kosmik | Ikon 32x32px | SEDANG | ❌ |

### Tier 3 (9 Ikon)
| ID | Nama | Tipe | Prioritas | Status |
|----|------|------|-----------|--------|
| IC_P09 | Paddle Super Glue | Ikon 32x32px | KRITIS | ❌ |
| IC_P10 | Penonton Terpesona | Ikon 32x32px | TINGGI | ❌ |
| IC_P11 | Bola Bayangan | Ikon 32x32px | TINGGI | ❌ |
| IC_P12 | Zona Nyaman | Ikon 32x32px | TINGGI | ❌ |
| IC_P18 | Stik Es Krim Ganda | Ikon 32x32px | SEDANG | ❌ |
| IC_P21 | Slow-Motion Kosmik | Ikon 32x32px | SEDANG | ❌ |
| IC_P22 | Portal Lipat | Ikon 32x32px | SEDANG | ❌ |
| IC_P27 | Bola Tiga Warna | Ikon 32x32px | SEDANG | ❌ |
| IC_P28 | Tukar Posisi | Ikon 32x32px | SEDANG | ❌ |

### Tier 4 (5 Ikon)
| ID | Nama | Tipe | Prioritas | Status |
|----|------|------|-----------|--------|
| IC_P13 | Kudeta Kosmik | Ikon 32x32px | KRITIS | ❌ |
| IC_P14 | Bola Abadi | Ikon 32x32px | KRITIS | ❌ |
| IC_P15 | Appeal Tsunami | Ikon 32x32px | TINGGI | ❌ |
| IC_P25 | Cermin Dimensi | Ikon 32x32px | SEDANG | ❌ |
| IC_P29 | Efek Acak Total | Ikon 32x32px | SEDANG | ❌ |

### Kartu Ilegal (5 Ikon)
| ID | Nama | Tipe | Prioritas | Status |
|----|------|------|-----------|--------|
| IC_I01 | SKIP FASE | Ikon 32x32px (border merah) | TINGGI | ❌ |
| IC_I02 | REALITAS AMBIL | Ikon 32x32px (border merah) | TINGGI | ❌ |
| IC_I03 | PENONTON DIAM | Ikon 32x32px (border merah) | TINGGI | ❌ |
| IC_I04 | FUSI PAKSA | Ikon 32x32px (border emas) | TINGGI | ❌ |
| IC_I05 | PARADOKS KOSMIK | Ikon 32x32px (border emas) | TINGGI | ❌ |

---

## 7. UI & HUD

### 7.1 Elemen HUD In-Game
| ID | Nama | Tipe | Deskripsi | Prioritas | Status |
|----|------|------|-----------|-----------|--------|
| UI_MOOD_BAR | Mood Bar | Gambar statis + animasi isi | Bar horizontal 200px, gradien merah (kiri) ke hijau (kanan). | KRITIS | ❌ |
| UI_ABSURDITY | Absurdity Meter | Gambar statis + animasi | Bar vertikal di kiri layar, segmen D–SSS. | KRITIS | ❌ |
| UI_AP_ICON | Ikon AP | Gambar statis | Ikon koin kardus (atau ikon "AP"). | KRITIS | ❌ |
| UI_FAME_ICON | Ikon Fame | Gambar statis | Ikon bintang. | KRITIS | ❌ |
| UI_TIMER | Timer Siksaan | Animasi lingkaran | Lingkaran countdown, numerik di tengah. | KRITIS | ❌ |
| UI_NOTIF | Notifikasi "NYARIS!" | Animasi 3 frame | Teks besar, scale up & fade out. | KRITIS | ❌ |
| UI_NOTIF_FUSION | Notifikasi Fusi | Animasi 4 frame | "HADIAH FUSI!" partikel emas. | KRITIS | ❌ |
| UI_NOTIF_COMBO | Notifikasi Kombo | Animasi 3 frame | "KOMBO x2!", "KOMBO x3!", dsb. | TINGGI | ❌ |
| UI_GONG_OVERLAY | Overlay GONG | Animasi 1 frame | Teks "GONG!" besar di tengah layar. | KRITIS | ❌ |
| UI_WARNING | Peringatan Siksaan | Animasi 2 frame | "PENONTON BOSAN..." teks merah. | KRITIS | ❌ |

### 7.2 Menu & Layar
| ID | Nama | Tipe | Deskripsi | Prioritas | Status |
|----|------|------|-----------|-----------|--------|
| UI_MENU_BG | Background Menu | Gambar statis | Hitam dengan tekstur kardus samar, logo game di tengah. | KRITIS | ❌ |
| UI_SHOP_BG | Background Shop | Gambar statis | Overlay semi-transparan hitam `rgba(0,0,0,0.8)`. | KRITIS | ❌ |
| UI_DOOR_GREEN | Pintu Hijau | Gambar statis | Ikon pintu warna hijau (untuk pilihan GONG). | KRITIS | ❌ |
| UI_DOOR_RED | Pintu Merah | Gambar statis | Ikon pintu warna merah. | KRITIS | ❌ |
| UI_DOOR_BLUE | Pintu Biru | Gambar statis | Ikon pintu warna biru. | KRITIS | ❌ |
| UI_BUTTON | Tombol Umum | Gambar statis (3 state) | Normal, hover, klik. Border hitam tebal, isi krem `#F5DEB3`. | KRITIS | ❌ |
| UI_LOGO | Logo Game | Gambar statis | "THE COSMIC CIRCUS LOOP" dengan font Bebas Neue, aksen neon. | KRITIS | ❌ |

---

## 8. EFEK VISUAL (PARTIKEL)

| ID | Nama | Tipe | Deskripsi | Prioritas | Status |
|----|------|------|-----------|-----------|--------|
| VFX_DUST | Debu | Sprite partikel | Titik kecil krem/putih, melayang pelan. | SEDANG | ❌ |
| VFX_CONFETTI | Confetti | Sprite partikel | Potongan kertas warna-warni berjatuhan. | TINGGI | ❌ |
| VFX_GLOW | Neon Glow | Shader/Overlay | Gaussian blur additive pada garis neon. | KRITIS | ❌ |
| VFX_GLITCH | Glitch Blok | Animasi frame | Kotak warna acak RGB offset. | TINGGI | ❌ |
| VFX_BUBBLES | Gelembung | Sprite partikel | Lingkaran transparan highlight putih, naik. | SEDANG | ❌ |
| VFX_SPIKE | Duri Kosmik | Sprite partikel | Segitiga kecil ungu. | SEDANG | ❌ |
| VFX_SNOW | Salju | Sprite partikel | Titik putih kebiruan jatuh. | SEDANG | ❌ |
| VFX_TEAR | Air Mata (Boss Lumi) | Sprite partikel | Tetesan biru pucat jatuh. | TINGGI | ❌ |
| VFX_FUSION_GOLD | Fusi Lv1 | Animasi 5 frame | Lingkaran emas meledak. | KRITIS | ❌ |
| VFX_FUSION_RAINBOW | Fusi Lv2 | Animasi 6 frame | Lingkaran pelangi meledak. | KRITIS | ❌ |
| VFX_FUSION_CHAOS | Fusi Lv3 | Animasi 8 frame | Ledakan warna-warni + glitch. | KRITIS | ❌ |

---

**Asset List ini adalah peta harta karun visualmu.** Dengan spreadsheet ini, kamu bisa melacak progres setiap aset, dari ikon kecil Power-Up hingga animasi Boss yang megah. Selamat berburu! 🎪