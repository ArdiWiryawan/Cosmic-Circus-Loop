Berikut adalah **Animation Bible** untuk *The Cosmic Circus Loop*. Dokumen ini adalah panduan gerak untuk setiap elemen dalam game—dari pantulan bola yang memuaskan hingga ledakan Fusi yang megah. Semua timing dalam frame (60 FPS).

---

# 🎬 THE COSMIC CIRCUS LOOP — ANIMATION BIBLE v1.0

**Dokumen:** Panduan Animasi  
**Keterkaitan:** Art Style Guide, Asset List, GDD  
**Target:** Animator 2D, Programmer Visual

---

## DAFTAR ISI
1. [Prinsip Animasi Global](#1-prinsip-animasi-global)
2. [Bola: Squash & Stretch](#2-bola-squash--stretch)
3. [Paddle: Getaran & Interaksi](#3-paddle-getaran--interaksi)
4. [Transisi Boss](#4-transisi-boss)
5. [Animasi Fusi](#5-animasi-fusi)
6. [Efek Visual & Partikel](#6-efek-visual--partikel)
7. [UI & Notifikasi](#7-ui--notifikasi)
8. [Kepribadian Stick](#8-kepribadian-stick)

---

## 1. PRINSIP ANIMASI GLOBAL

### 1.1 12 Prinsip Animasi yang Digunakan
| Prinsip | Penerapan |
|---------|-----------|
| **Squash & Stretch** | Bola saat pantulan, paddle saat kena bola. |
| **Anticipation** | Boss sebelum menyerang, GONG sebelum berbunyi. |
| **Staging** | Notifikasi di tengah layar, Boss di tengah arena. |
| **Straight Ahead** | Partikel debu, confetti, gelembung (animasi frame-by-frame). |
| **Follow Through** | Paddle setelah kena bola (getaran mereda), bola setelah glue terlepas. |
| **Slow In & Slow Out** | Transisi Boss, zoom in/out. |
| **Exaggeration** | Close Call (zoom kecil + shake), Fusi (ledakan besar). |
| **Secondary Action** | Ekor partikel pada bola magnetik, semut berjalan. |
| **Timing** | Kunci dari semua animasi. Lihat detail di bawah. |
| **Appeal** | Karakter harus lucu dan menggemaskan, bahkan saat menyerang. |

### 1.2 Timing Standard (60 FPS)
| Aksi Cepat | 6–12 frame (0.1–0.2 detik) |
|-----------|---------------------------|
| Pantulan bola normal | 8 frame |
| Getaran paddle | 10 frame |
| Notifikasi muncul | 15 frame |
| **Aksi Sedang** | 20–40 frame (0.3–0.7 detik) |
| Squash & stretch bola | 12 frame |
| Boss serangan | 30–40 frame |
| Transisi Boss masuk | 60 frame (1 detik) |
| **Aksi Lambat** | 60–120 frame (1–2 detik) |
| Fusi Lv1 | 90 frame (1.5 detik) |
| Fusi Lv2 | 120 frame (2 detik) |
| Boss kalah | 90–120 frame |

---

## 2. BOLA: SQUASH & STRETCH

### 2.1 Pantulan Normal (Paddle)
**Trigger:** Bola menyentuh paddle.

**Animasi (12 frame):**
| Frame | Aksi | Visual |
|-------|------|--------|
| 0 | Kontak dengan paddle | Bola mulai squash (lebar +20%, tinggi -20%). |
| 1–3 | Squash maksimum | Bola melebar maksimal. |
| 4–7 | Stretch | Bola memanjang vertikal (tinggi +30%, lebar -15%) saat meluncur ke atas. |
| 8–11 | Kembali | Bola kembali ke bentuk normal. |

**Easing:** Fast out (squash cepat), slow in (kembali normal lebih lambat).

### 2.2 Pantulan Dinding
**Animasi (6 frame):**
| Frame | Aksi | Visual |
|-------|------|--------|
| 0 | Kontak dinding | Squash horizontal ringan (lebar +10%). |
| 1–2 | Squash | Maksimum. |
| 3–5 | Kembali | Normal. |

**Catatan:** Getaran kecil pada bola setelah pantulan (3 frame).

### 2.3 Bola Mati (Jatuh)
**Animasi (20 frame):**
| Frame | Aksi | Visual |
|-------|------|--------|
| 0–5 | Bola jatuh ke bawah | Bola stretch vertikal (tinggi +20%). |
| 6–10 | Bola menghilang di bawah | Fade out alpha. |
| 11–20 | Efek "bloop" | Partikel kecil di posisi terakhir bola. |

### 2.4 Bola Glue (Menempel)
**Animasi (saat menempel):**
- Bola sedikit squash (lebar +10%) seperti menempel pada paddle.
- Tidak ada stretch saat dilepas (bola langsung terlepas dengan kecepatan).

**Animasi (saat dilepas, 8 frame):**
| Frame | Aksi |
|-------|------|
| 0–3 | Bola stretch vertikal (tinggi +25%). |
| 4–7 | Kembali normal saat meluncur. |

### 2.5 Bola Immortal (Memantul di Bawah)
**Animasi:** Sama seperti pantulan dinding, tapi di batas bawah. Bola stretch vertikal sebelum memantul ke atas.

---

## 3. PADDLE: GETARAN & INTERAKSI

### 3.1 Getaran Ringan (Hit Normal)
**Trigger:** Bola mengenai paddle.

**Animasi (10 frame):**
| Frame | Aksi | Visual |
|-------|------|--------|
| 0–2 | Paddle bergeser turun 2px. | - |
| 3–7 | Paddle bergetar (offset X ±1px, ±2px). | Random offset. |
| 8–9 | Getaran mereda. | Kembali ke posisi normal. |

### 3.2 Getaran Berat (Close Call / Paddle Patah kena)
**Animasi (16 frame):**
| Frame | Aksi |
|-------|------|
| 0–3 | Paddle bergeser turun 4px. |
| 4–12 | Paddle bergetar kuat (offset X ±3px). |
| 13–15 | Reda. |

### 3.3 Paddle Patah (Retak)
**Animasi (30 frame):**
| Frame | Aksi |
|-------|------|
| 0–5 | Retakan muncul di tengah paddle (animasi retak). |
| 6–15 | Paddle terbelah jadi dua, bagian kiri bergeser ke kiri, kanan ke kanan. |
| 16–30 | Kedua bagian diam di posisi baru (masih bisa digunakan). |

### 3.4 Paddle Glue (Menempel)
**Animasi (saat bola menempel):**
- Paddle sedikit tertarik ke bawah (offset Y +3px) karena berat bola.
- Partikel lem kecil di antara bola dan paddle.

### 3.5 Paddle Membangkang (Glarp)
**Animasi (60 frame, 1 detik):**
| Frame | Aksi |
|-------|------|
| 0–10 | Paddle bergetar ringan (anticipation). |
| 11–30 | Paddle bergerak sendiri ke arah acak (offset X ±20px). |
| 31–50 | Paddle "melawan" input pemain. |
| 51–60 | Kembali normal. |

---

## 4. TRANSISI BOSS

### 4.1 Boss Muncul
**Durasi:** 60 frame (1 detik).

| Frame | Aksi | Visual | Audio |
|-------|------|--------|-------|
| 0–10 | Arena freeze, background meredup. | Overlay gelap (alpha 0 → 0.7). | SFX_BOSS_APPEAR |
| 11–30 | Boss muncul dari atas/bawah/samping. | Boss slide in atau fade in dengan efek partikel. | - |
| 31–50 | Boss idle, nama boss muncul. | Teks "[Nama Boss]" besar di tengah. | Sting Boss |
| 51–60 | Pertarungan dimulai. | UI boss muncul (health bar segmented). | Musik Boss mulai. |

### 4.2 Boss Menyerang
**Durasi:** 30–40 frame per serangan.

| Frame | Aksi | Visual |
|-------|------|--------|
| 0–10 | Anticipation. | Boss mundur atau membesar, efek partikel. |
| 11–20 | Serangan dilancarkan. | Proyektil atau efek area. |
| 21–30 | Follow through. | Boss kembali ke posisi idle. |

### 4.3 Boss Kalah
**Durasi:** 90–120 frame (1.5–2 detik).

| Frame | Aksi | Visual | Audio |
|-------|------|--------|-------|
| 0–15 | Boss terkena pukulan terakhir. | Boss squash & stretch ekstrem. | SFX_BOSS_HIT |
| 16–40 | Boss "hancur" atau mundur. | Animasi spesifik per boss (meleleh, pecah, fade out). | SFX_BOSS_DEFEAT |
| 41–70 | Efek ledakan/confetti. | Partikel kemenangan. | Stinger kemenangan |
| 71–90 | Arena kembali normal. | Overlay gelap fade out. | Musik arena kembali. |
| 91–120 | Dialog Boss. | Teks dialog muncul. | - |

---

## 5. ANIMASI FUSI

### 5.1 Fusi Level 1
**Durasi:** 90 frame (1.5 detik).

| Frame | Aksi | Visual | Audio |
|-------|------|--------|-------|
| 0–15 | Freeze singkat. | Arena pause. | - |
| 16–20 | Ikon dua Power-Up muncul dan bergerak ke tengah. | Slide in dari kiri dan kanan. | - |
| 21–30 | Ikon bertabrakan. | Efek partikel emas. | SFX_FUSION_LV1 |
| 31–60 | Ultimate Form baru muncul. | Ikon baru scale up (0 → 1.2x → 1x). | - |
| 61–75 | Nama Fusion muncul. | Teks "HADIAH FUSI!" + nama Fusion. | Sting emas |
| 76–90 | Arena unfreeze. | Partikel memudar. | - |

### 5.2 Fusi Level 2
**Durasi:** 120 frame (2 detik).

| Frame | Aksi | Visual | Audio |
|-------|------|--------|-------|
| 0–20 | Freeze. Ikon Lv1 dan material muncul. | Slide in. | - |
| 21–35 | Tabrakan besar. | Partikel pelangi. | SFX_FUSION_LV2 |
| 36–70 | Ultimate Form baru muncul. | Scale up + rotasi ringan. | - |
| 71–90 | Nama Fusion muncul. | Teks "EVOLUSI LEGENDARIS!" | Sting pelangi |
| 91–120 | Arena unfreeze, screen shake ringan. | - | - |

### 5.3 Fusi Level 3
**Durasi:** 180 frame (3 detik).

| Frame | Aksi | Visual | Audio |
|-------|------|--------|-------|
| 0–30 | Freeze. Semua elemen UI menghilang. | Latar menjadi hitam. | - |
| 31–50 | Ikon Lv2 dan Kartu Ilegal muncul. | Ikon Kartu Ilegal dengan border merah berdenyut. | - |
| 51–70 | Tabrakan dahsyat. | Ledakan warna-warni + glitch + screen shake. | SFX_FUSION_LV3 |
| 71–110 | Ultimate Form baru muncul perlahan. | Scale up dari kegelapan, dengan efek "pembukaan tirai". | - |
| 111–140 | Nama Fusion muncul. | Teks "FUSI TERLARANG!" dengan efek glitch. | Sting chaos |
| 141–160 | Semua elemen UI kembali. | Partikel mereda. | - |
| 161–180 | Arena unfreeze. | - | - |

### 5.4 Spoof Fusion
**Durasi:** 60 frame (1 detik).
- Tabrakan kecil → partikel abu-abu.
- Teks "ALKEMIS GAGAL..." dengan nada turun.
- Tidak ada screen shake.

---

## 6. EFEK VISUAL & PARTIKEL

### 6.1 Debu (Ambient)
- **Animasi:** Loop. Partikel kecil (3–5px) melayang perlahan ke atas dengan sedikit goyangan horizontal.
- **Frame Count:** Loop 60 frame (1 detik).
- **Jumlah Partikel:** 10–20 per arena.

### 6.2 Confetti (Fusi / Boss Kalah)
- **Animasi:** Partikel jatuh dari atas, berputar, memudar dalam 60–90 frame.
- **Warna:** Pelangi (merah, kuning, hijau, biru, magenta).

### 6.3 Neon Glow
- **Animasi:** Denyut (pulse) dengan alpha berosilasi antara 0.6 dan 1.0. Loop 30 frame.
- **Efek:** Gaussian blur + additive blending.

### 6.4 Glitch
- **Animasi:** Frame-based. Berganti setiap 2–3 frame. 4 variasi frame.
- **Efek:** Offset RGB, blok warna acak.

### 6.5 Air Mata (Boss Nenek Lumi)
- **Animasi:** Tetesan jatuh dari atas. Squash saat mengenai tanah, lalu menghilang. 40 frame.

---

## 7. UI & NOTIFIKASI

### 7.1 Notifikasi "NYARIS!"
**Durasi:** 30 frame (0.5 detik).

| Frame | Aksi | Visual |
|-------|------|--------|
| 0–5 | Teks muncul. | Scale 0 → 1.2x. |
| 6–10 | Teks bounce. | Scale 1.2x → 0.9x → 1x. |
| 11–25 | Teks diam. | Alpha 1.0. |
| 26–30 | Teks fade out. | Alpha 1.0 → 0. |

### 7.2 Notifikasi "KOMBO x2/x3/dst"
- Sama seperti "NYARIS!", tapi scale lebih besar tiap level kombo, dan warna teks makin terang.

### 7.3 Mood Bar (PENONTON)
- **Animasi isi:** Smooth transition (tween) selama 20 frame setiap kali nilai berubah.
- **Flash:** Saat Mood ≤ 10, bar berkedip merah (alpha 1.0 ↔ 0.3, loop 15 frame).

### 7.4 Timer Siksaan
- **Lingkaran:** Fill radial yang berkurang secara linear.
- **Peringatan:** Saat timer ≤ 3 detik, lingkaran berkedip (merah), teks numerik membesar.

---

## 8. KEPRIBADIAN STICK

### 8.1 Glarp Membangkang
- **Durasi:** 60 frame.
- **Visual:** Paddle bergerak sendiri (offset X ±20px), getaran kuat, mata Glarp (jika ada) berubah merah.
- **Cooldown visual:** Kembali normal dalam 20 frame.

### 8.2 Sendok Bengkok (Portal Mini)
- **Animasi:** Portal kecil (lingkaran ungu) muncul di ujung sendok selama 30 frame, lalu menghilang. Bola yang masuk portal akan animasi "whoosh".

### 8.3 Remote TV (Ganti Bentuk)
- **Animasi:** 15 frame. Remote "berganti channel" dengan efek statis (noise putih) di seluruh paddle, lalu muncul bentuk baru.

### 8.4 Ikan Beku (Frost)
- **Animasi:** Kristal es menyebar dari paddle ke seluruh arena dalam 30 frame. Efek frost (warna biru pucat) dengan alpha 0.3 di seluruh layar.

### 8.5 Tongkat Ajaib (Keajaiban)
- **Animasi:** Partikel magis (bintang-bintang kecil) muncul dari ujung tongkat. Loop 40 frame. Saat Kartu Ilegal muncul, efek lebih besar (60 frame).

---

**Animation Bible ini adalah koreografi untuk setiap gerakan di The Cosmic Circus Loop.** Dengan panduan ini, animator dan programmer dapat menciptakan gerakan yang konsisten, responsif, dan penuh karakter. 🎪
