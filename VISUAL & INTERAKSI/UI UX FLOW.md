Berikut adalah **UI/UX Flow** lengkap untuk *The Cosmic Circus Loop*. Dokumen ini menjelaskan setiap layar, setiap tombol, dan setiap interaksi yang akan dialami pemain—dari Menu Utama hingga Laporan Penonton.

---

# 🖥️ THE COSMIC CIRCUS LOOP — UI/UX FLOW v1.0

**Dokumen:** Wireframe & Alur Interaksi  
**Keterkaitan:** GDD, Art Style Guide, Asset List  
**Target:** UI/UX Designer, Programmer

---

## DAFTAR ISI
1. [Diagram Alur Utama](#1-diagram-alur-utama)
2. [Layar 1: Menu Utama](#2-layar-1-menu-utama)
3. [Layar 2: Toko Kosmik](#3-layar-2-toko-kosmik)
4. [Layar 3: Pilih Arena & Stick](#4-layar-3-pilih-arena--stick)
5. [Layar 4: Persiapan Run (Equip Relik & Kontrak)](#5-layar-4-persiapan-run-equip-relik--kontrak)
6. [Layar 5: Gameplay (HUD & In-Game)](#6-layar-5-gameplay-hud--in-game)
7. [Layar 6: GONG Shop (Pintu & Power-Up)](#7-layar-6-gong-shop-pintu--power-up)
8. [Layar 7: Boss Fight](#8-layar-7-boss-fight)
9. [Layar 8: Akhir Run (Tawaran Manajer & Roulette)](#9-layar-8-akhir-run-tawaran-manajer--roulette)
10. [Layar 9: Laporan Penonton](#10-layar-9-laporan-penonton)
11. [Wireframe Ringkas Semua Layar](#11-wireframe-ringkas-semua-layar)

---

## 1. DIAGRAM ALUR UTAMA

```
[MENU UTAMA]
    │
    ├─ [MULAI RUN] ──────────────────────────────────────────┐
    ├─ [TOKO KOSMIK] ───────────────────────┐                │
    ├─ [ARSIP SIKSAAN] ─────────────────────┤                │
    ├─ [MODE ZEN] ──────────────────────────┤                │
    │                                       │                │
    └───────────────────────────────────────┘                │
                                                             ▼
                                              [PILIH ARENA & STICK]
                                                             │
                                                             ▼
                                              [PERSIAPAN RUN: Equip Relik & Kontrak]
                                                             │
                                                             ▼
                                              ╔══════════════════════════════╗
                                              ║       GAMEPLAY AKTIF        ║
                                              ║  • HUD                     ║
                                              ║  • Pantulan, Skor, AP       ║
                                              ║  • Siksaan, Mikro-Twist     ║
                                              ║  • GONG → Shop              ║
                                              ║  • Boss Fight               ║
                                              ╚══════════════════════════════╝
                                                             │
                                                             ▼
                                              [AKHIR RUN: Tawaran Manajer / Roulette]
                                                             │
                                                             ▼
                                              [LAPORAN PENONTON]
                                                             │
                                                             ▼
                                              [MENU UTAMA] (ulangi)
```

---

## 2. LAYAR 1: MENU UTAMA

### 2.1 Deskripsi
Layar pertama yang dilihat pemain setelah splash screen. Latar belakang hitam dengan tekstur kardus samar. Logo game di tengah atas. Menu vertikal di tengah.

### 2.2 Elemen UI
| Posisi | Elemen | Jenis | Interaksi |
|--------|--------|-------|-----------|
| Tengah Atas | **Logo Game** | Gambar statis | Tidak ada interaksi. Di bawah logo: teks versi kecil (untuk easter egg "klik 10x"). |
| Tengah | **"MULAI RUN"** | Tombol besar | Klik → Lanjut ke Pilih Arena & Stick. |
| Tengah | **"TOKO KOSMIK"** | Tombol | Klik → Lanjut ke Toko Kosmik. |
| Tengah | **"ARSIP SIKSAAN"** | Tombol | Klik → Lanjut ke Arsip Siksaan (layar lore & statistik). |
| Tengah | **"MODE ZEN"** | Tombol | Klik → Langsung mulai Mode Zen tanpa persiapan. |
| Tengah | **"KELUAR"** | Tombol | Klik → Keluar game. |
| Kanan Atas | **Poin Ketenaran** | Teks + Ikon | Menampilkan Fame pemain saat ini. |

### 2.3 Interaksi Pemain
1. Pemain mengklik "MULAI RUN".
2. Transisi: fade out hitam 0.5 detik, fade in ke layar Pilih Arena & Stick.

### 2.4 Easter Egg
- Klik teks versi kecil di bawah logo 10x berturut-turut → **The Glitch Dimension** terbuka (akses ke arena rahasia).

---

## 3. LAYAR 2: TOKO KOSMIK

### 3.1 Deskripsi
Layar untuk membeli item dengan Poin Ketenaran. Tampilan seperti etalase toko asing dengan rak-rak miring. Setiap item ditampilkan sebagai kartu.

### 3.2 Elemen UI
| Posisi | Elemen | Jenis | Interaksi |
|--------|--------|-------|-----------|
| Kiri Atas | **"< KEMBALI"** | Tombol teks | Klik → Kembali ke Menu Utama. |
| Kanan Atas | **Poin Ketenaran** | Teks + Ikon | Menampilkan Fame. |
| Tengah | **Tab: ARENA / STICK / RELIK / LAINNYA** | Tab Bar | Klik untuk pindah kategori. |
| Grid Tengah | **Kartu Item** | Kartu (ikon, nama, harga) | Klik → Beli item jika Fame cukup. Jika sudah dibeli, tampil "TERBELI". |
| Bawah | **Deskripsi Item** | Teks | Menampilkan efek item yang dipilih. |

### 3.3 Kategori Item
| Kategori | Item yang Dijual |
|----------|------------------|
| **Arena** | 7 Arena (bertahap unlock). Harga: 1000–3000 Fame. |
| **Stick** | 6 Stick. Harga: 500–800 Fame. |
| **Relik** | 6 Relik. Harga: 500–1500 Fame. |
| **Slot Relik** | Slot ke-4 (2000), ke-5 (3000). |
| **Kosmetik** | Skin alternatif Stick, palet warna Arena. Harga: 200–500 Fame. |

### 3.4 Interaksi Pemain
1. Pemain memilih tab kategori.
2. Pemain mengklik kartu item.
3. Jika Fame cukup dan item belum dibeli → muncul pop-up konfirmasi "BELI [Nama]?" dengan tombol YA/TIDAK.
4. Jika YA → Fame berkurang, item terbuka, notifikasi kecil "DIBELI!".

---

## 4. LAYAR 3: PILIH ARENA & STICK

### 4.1 Deskripsi
Layar pemilihan Arena dan Stick sebelum run. Tampilan dua kolom besar: kiri untuk Arena, kanan untuk Stick. Pemain bisa melihat info mastery.

### 4.2 Elemen UI
| Posisi | Elemen | Jenis | Interaksi |
|--------|--------|-------|-----------|
| Kiri Atas | **"< KEMBALI"** | Tombol teks | Kembali ke Menu Utama. |
| Tengah Atas | **"PILIH ARENA & STICK"** | Judul | - |
| Kiri (50%) | **Daftar Arena** | Grid vertikal | Setiap Arena: thumbnail, nama, level mastery (bintang), efek pasif. |
| Kanan (50%) | **Daftar Stick** | Grid vertikal | Setiap Stick: thumbnail, nama, level mastery, signature ability. |
| Bawah | **"LANJUT >"** | Tombol | Klik → Lanjut ke Persiapan Run. (Hanya aktif jika Arena & Stick dipilih.) |

### 4.3 Interaksi Pemain
1. Pemain mengklik satu Arena → highlight border emas.
2. Pemain mengklik satu Stick → highlight border emas.
3. Tombol "LANJUT" aktif. Klik → transisi ke layar Persiapan Run.

---

## 5. LAYAR 4: PERSIAPAN RUN (EQUIP RELIK & KONTRAK)

### 5.1 Deskripsi
Layar terakhir sebelum run dimulai. Pemain bisa memasang Relik dan menandatangani Kontrak (opsional).

### 5.2 Elemen UI
| Posisi | Elemen | Jenis | Interaksi |
|--------|--------|-------|-----------|
| Kiri Atas | **"< KEMBALI"** | Tombol | Kembali ke Pilih Arena & Stick. |
| Kiri (60%) | **Slot Relik** | 3–5 slot | Klik slot → pilih Relik dari inventaris. Maks 3 (atau 4–5 jika sudah dibeli). |
| Kanan (40%) | **Kontrak** | Kartu teks | Dua kontrak opsional: "Kontrak I: +50% Fame, Relik disita jika mati < Fase 5" dan "Kontrak II: +100% Fame, AP hangus saat mati". Klik untuk mencentang. |
| Bawah | **"MULAI SIARAN!"** | Tombol besar | Klik → Mulai run. |

### 5.3 Interaksi Pemain
1. Pemain mengklik slot Relik → dropdown daftar Relik yang dimiliki. Pilih satu.
2. Pemain (opsional) mencentang satu atau dua Kontrak.
3. Pemain mengklik "MULAI SIARAN!" → layar loading singkat (fade out, teks "MENYIAPKAN ARENA..."), lalu masuk ke gameplay.

---

## 6. LAYAR 5: GAMEPLAY (HUD & IN-GAME)

### 6.1 Deskripsi
Layar utama permainan. Arena sesuai pilihan, paddle dan bola aktif. HUD minimal di pojok-pojok.

### 6.2 Elemen HUD
| Posisi | Elemen | Deskripsi |
|--------|--------|-----------|
| Kiri Atas | **Skor Kekonyolan** | Peringkat (huruf D–SSS) + angka. Peringkat berwarna sesuai tingkat. |
| Kiri Atas (bawah Skor) | **Pantulan Counter** | Angka kecil: "Pantulan: 12/25" (untuk GONG). |
| Kanan Atas | **AP (Appeal Point)** | Ikon AP + angka. |
| Kanan Atas (bawah AP) | **Slot Power-Up** | Ikon kecil (maks 6) dari Power-Up yang dimiliki. |
| Bawah Tengah | **Mood Bar** | Bar horizontal 200px. Gradien merah ke hijau. Label "PENONTON". |
| Kanan Bawah | **Timer Siksaan** | Lingkaran countdown dengan detik di tengah. |
| Tengah (sementara) | **Notifikasi** | "NYARIS!", "KOMBO x2!", "HADIAH FUSI!", dll. |

### 6.3 Interaksi Pemain
- **Mouse/Kursor:** Gerakkan paddle (posisi X mengikuti mouse, atau sentuh di mobile).
- **SPASI:** Skip Shop saat GONG.
- **Q:** Appeal Sacrifice (bakar 10 AP untuk -1 pantulan).
- **Cheat Codes:** Input keyboard "KUDETA", "BAKSO", dll.

---

## 7. LAYAR 6: GONG SHOP (PINTU & POWER-UP)

### 7.1 Deskripsi
Layar yang muncul saat GONG. Freeze frame. Pemain memilih 1 dari 3 Pintu, lalu membeli Power-Up.

### 7.2 Elemen UI (Tahap 1: Pilih Pintu)
| Posisi | Elemen | Deskripsi |
|--------|--------|-----------|
| Tengah | **3 Pintu** | Hijau (aman), Merah (risiko), Biru (misteri). Masing-masing dengan ikon dan deskripsi singkat. |
| Bawah | **"SKIP SHOP (SPASI)"** | Teks kecil. Tekan SPASI untuk lewati. |

### 7.3 Elemen UI (Tahap 2: Shop Power-Up)
| Posisi | Elemen | Deskripsi |
|--------|--------|-----------|
| Tengah | **Kartu Power-Up** | 2–4 kartu (sesuai Fase). Ikon, nama, harga, efek. Bisa di-klik untuk beli. |
| Bawah | **AP saat ini** | Menampilkan AP. |
| Bawah | **"LEWATI"** | Tombol untuk tidak membeli. |

### 7.4 Interaksi Pemain
1. Pemain mengklik salah satu Pintu.
2. Jika Pintu Merah: siksaan langsung dilancarkan (efek visual singkat).
3. Muncul kartu Power-Up. Pemain bisa:
   - Klik kartu → beli (jika AP cukup dan slot < 6).
   - Jika slot penuh (6), muncul pop-up "GANTI YANG MANA?" dengan daftar slot.
   - Klik "LEWATI" → tidak beli, lanjutkan permainan.
4. Setelah transaksi, cek Fusi otomatis.

---

## 8. LAYAR 7: BOSS FIGHT

### 8.1 Deskripsi
Layar saat Boss Fight. Arena berubah visual. Boss muncul di tengah. HUD menampilkan health bar Boss.

### 8.2 Elemen UI
| Posisi | Elemen | Deskripsi |
|--------|--------|-----------|
| Atas Tengah | **Nama Boss** | Teks besar. |
| Atas Tengah (bawah nama) | **Health Bar Boss** | Bar segmented (jumlah pukulan). Setiap segmen hilang saat kena. |
| Kiri Atas | **Skor Kekonyolan** | Tetap terlihat. |
| Kanan Atas | **AP** | Tetap terlihat. |

### 8.3 Interaksi Pemain
- Pantulkan bola ke arah Boss untuk memberi damage.
- Hindari serangan Boss (gerakan paddle).
- Saat Boss kalah: animasi kalah, dialog muncul, hadiah diberikan.

---

## 9. LAYAR 8: AKHIR RUN (TAWARAN MANAJER & ROULETTE)

### 9.1 Tawaran Manajer
- **Pemicu:** Semua bola mati, Fase 5+.
- **Tampilan:** Layar meredup. Siluet Manajer muncul. Teks tawaran (contoh: "Serahkan semua Power-Up, dan aku kembalikan bolamu.").
- **Pilihan:** Dua tombol: "YA (Korbankan Power-Up)" dan "TIDAK (Lanjut ke Roulette)".

### 9.2 Roulette Kematian
- **Tampilan:** Roda roulette 6 slot di tengah layar.
- **Tombol:** "PUTAR NASIB!".
- **Animasi:** Roda berputar 3 detik, melambat, berhenti.
- **Hasil:** Teks hasil muncul (RESPAWN GRATIS, AP DIGANDAKAN, dll.) + efek visual sesuai.

---

## 10. LAYAR 9: LAPORAN PENONTON

### 10.1 Deskripsi
Layar akhir setelah run benar-benar selesai. Menampilkan statistik dan hadiah.

### 10.2 Elemen UI
| Posisi | Elemen | Deskripsi |
|--------|--------|-----------|
| Tengah Atas | **"LAPORAN PENONTON"** | Judul. |
| Kiri | **Statistik Run** | Total Pantulan, Fase Tertinggi, Skor Kekonyolan Akhir, Siksaan Diterima. |
| Kanan | **Poin Ketenaran Didapat** | Angka besar. Rincian perhitungan. |
| Tengah Bawah | **Komentar Terpilih** | Kutipan acak dari penonton. |
| Bawah | **"LANJUTKAN"** | Tombol. Klik → kembali ke Menu Utama. |

### 10.3 Momen Naratif (Run 10, 50, 100)
- Jika ini Run ke-10/50/100, sebelum Laporan Penonton, adegan naratif dimainkan (Glarp Berbicara, Tatapan Manajer, Surat dari Kreator).

---

## 11. WIREFRAME RINGKAS SEMUA LAYAR

### 11.1 Menu Utama
```
┌──────────────────────────────────┐
│         [LOGO GAME]              │
│          v1.0 (klik 10x)         │
│                                  │
│     [ MULAI RUN ]                │
│     [ TOKO KOSMIK ]              │
│     [ ARSIP SIKSAAN ]            │
│     [ MODE ZEN ]                 │
│     [ KELUAR ]                   │
│                                  │
│                Fame: 12,345 ⭐   │
└──────────────────────────────────┘
```

### 11.2 Toko Kosmik
```
┌──────────────────────────────────┐
│ < KEMBALI        Fame: 12,345 ⭐ │
│                                  │
│ [ARENA] [STICK] [RELIK] [LAIN]   │
│                                  │
│ ┌──────┐ ┌──────┐ ┌──────┐      │
│ │Arena1│ │Arena2│ │Arena3│      │
│ │ Lv.1 │ │ Lv.3 │ │Terkunci│    │
│ │1500  │ │DIBELI│ │2000  │      │
│ └──────┘ └──────┘ └──────┘      │
│                                  │
│ Deskripsi: Meja Kardus Kosong.  │
│ +15% Poin Ketenaran.            │
└──────────────────────────────────┘
```

### 11.3 Pilih Arena & Stick
```
┌──────────────────────────────────┐
│ < KEMBALI    PILIH ARENA & STICK │
│                                  │
│  [ARENA]         [STICK]         │
│ ┌────────┐      ┌────────┐      │
│ │Meja    │      │Glarp   │      │
│ │Kardus  │      │Stik    │      │
│ │Lv.2 ★★ │      │Lv.4 ★★★★│    │
│ └────────┘      └────────┘      │
│ ┌────────┐      ┌────────┐      │
│ │Piknik  │      │Sendok  │      │
│ │Chaos   │      │Bengkok │      │
│ │Lv.0 ☆  │      │Lv.1 ★  │      │
│ └────────┘      └────────┘      │
│                                  │
│         [ LANJUT > ]             │
└──────────────────────────────────┘
```

### 11.4 Persiapan Run
```
┌──────────────────────────────────┐
│ < KEMBALI    PERSIAPAN RUN       │
│                                  │
│  Slot Relik:         Kontrak:    │
│ ┌──┐ ┌──┐ ┌──┐      ☐ Kontrak I │
│ │R1│ │R3│ │  │      ☐ Kontrak II│
│ └──┘ └──┘ └──┘                  │
│                                  │
│     [ MULAI SIARAN! ]            │
└──────────────────────────────────┘
```

### 11.5 GONG Shop (Pintu)
```
┌──────────────────────────────────┐
│         PILIH PINTU              │
│                                  │
│  ┌──────┐ ┌──────┐ ┌──────┐     │
│  │ HIJAU│ │MERAH │ │ BIRU │     │
│  │ Aman │ │Risiko│ │Misteri│    │
│  └──────┘ └──────┘ └──────┘     │
│                                  │
│  [SKIP SHOP: SPASI]             │
└──────────────────────────────────┘
```

### 11.6 GONG Shop (Power-Up)
```
┌──────────────────────────────────┐
│         BELI POWER-UP            │
│                                  │
│ ┌────┐ ┌────┐ ┌────┐            │
│ │P01 │ │P06 │ │P14 │            │
│ │ 2AP│ │ 5AP│ │ 8AP│            │
│ └────┘ └────┘ └────┘            │
│                                  │
│ AP: 12           [ LEWATI ]     │
└──────────────────────────────────┘
```

### 11.7 Boss Fight
```
┌──────────────────────────────────┐
│       NENEK LUMI                 │
│   [■ ■ ■ ■ □] (4/5 pukulan)      │
│                                  │
│         (Arena)                  │
│       👁️ (Boss)                 │
│         🏓 (Paddle)             │
│         ⚪ (Bola)               │
│                                  │
│ Skor: A (55)        AP: 20      │
└──────────────────────────────────┘
```

### 11.8 Akhir Run (Tawaran Manajer)
```
┌──────────────────────────────────┐
│                                  │
│    (Siluet Manajer)              │
│                                  │
│ "Serahkan semua Power-Up,       │
│  dan aku kembalikan bolamu."     │
│                                  │
│   [ YA ]          [ TIDAK ]      │
└──────────────────────────────────┘
```

### 11.9 Laporan Penonton
```
┌──────────────────────────────────┐
│     LAPORAN PENONTON             │
│                                  │
│ Pantulan:      28                │
│ Fase:          5                 │
│ Skor:          S (78)            │
│ Siksaan:       12                │
│                                  │
│ POIN KETENARAN:  +1,250 ⭐       │
│                                  │
│ "Komentar Terpilih:"            │
│ "Dia lucu. Jangan berhenti."    │
│                                  │
│       [ LANJUTKAN ]              │
└──────────────────────────────────┘
```

---

**Dokumen UI/UX Flow ini adalah peta navigasi untuk setiap langkah pemain.** Dengan ini, programmer dan UI designer dapat membangun antarmuka yang konsisten, intuitif, dan penuh karakter. 🎪