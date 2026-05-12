Kreator, setelah merancang 7 Arena, 21 Mini Boss, sistem Alkemis, Chaos Engine, dan semua mekanik pendukung, kini saatnya menyatukan semuanya ke dalam satu **Core Game Loop** yang ketat. Loop ini adalah detak jantung *The Cosmic Circus Loop*—setiap detik pemain selalu berada dalam ketegangan, pilihan, dan kejutan.

---

## 🎪 CORE GAME LOOP FINAL — "THE COSMIC CIRCUS LOOP"

### 1. PRA-RUN (PERSIAPAN)

1. **Menu Utama:** Pemain mengakses Toko Kosmik, Arsip Siksaan, Mode Zen, atau mulai run.
2. **Pilih Arena:** Pilih 1 dari 7 Arena yang sudah dibeli/dibuka. Setiap Arena memiliki progres Bossnya sendiri.
3. **Pilih Stick:** Pilih 1 dari 6 Stick. Masing-masing memiliki Signature Power-Up dan Kepribadian.
4. **Equip Relik:** Pasang maksimal 3 Relik Sirkus yang sudah dibeli. Relik memberikan efek pasif sepanjang run.
5. **Kontrak (Opsional):** Tandatangani Kontrak untuk meningkatkan risiko demi Poin Ketenaran.
6. **Mulai Run:** Inisialisasi Fase 1, deck siksaan awal, Mood Penonton 50, counter pantulan GONG = 0.

---

### 2. GAMEPLAY AKTIF (LOOP DETIK PER DETIK)

```
╔══════════════════════════════════════════════════════╗
║                 GAMEPLAY LOOP                        ║
║                                                      ║
║  ■ INPUT: Gerakkan paddle (mouse/sentuh)             ║
║  ■ FISIKA: Bola bergerak, pantul di paddle & dinding ║
║  ■ SETIAP PANTULAN:                                  ║
║      - +1 AP                                         ║
║      - Cek tipe pantulan (aman / close call)         ║
║      - Update Mood Penonton                          ║
║      - Cek syarat GONG                               ║
║      - Cek Kombo & Skor Kekonyolan                   ║
║                                                      ║
║  ■ CHAOS ENGINE (berjalan paralel):                  ║
║      - Mood Bar terus berubah                        ║
║      - Timer Siksaan berdetak                        ║
║      - Timer Mikro-Twist berdetak                    ║
║      - Timer Plot Twist berdetak                     ║
║      - Cek Crash Fusion (benturan siksaan)           ║
║                                                      ║
║  ■ BOLA MATI:                                        ║
║      - Jika masih ada nyawa, respawn                 ║
║      - Jika semua bola mati → Akhiri Run             ║
╚══════════════════════════════════════════════════════╝
```

---

### 3. CHAOS ENGINE (OTAK KETEGANGAN)

| Sistem | Pemicu | Efek |
|--------|--------|------|
| **Mood Penonton** | Pantulan aman (-5), Close Call (+5), Siksaan diterima (+10), Fusi (+20) | Mood ≤ 0: siksaan bertubi-tubi. Mood ≥ 100: GONG instan. |
| **Siksaan** | Timer habis (durasi sesuai Fase). Diambil dari Torment Deck. | Efek acak: paddle licin, bola kecil, invert control, portal, dll. |
| **Mikro-Twist** | Setiap 5-7 detik (mulai Fase 2). | Efek 1-2 detik: suara bebek, layar miring, paddle gemetar. |
| **Plot Twist** | Setiap 10 detik, 8% peluang. | Efek besar: Mouse Ping Pong, Revolusi Penonton, Hari Kebalikan. |
| **Crash Fusion** | Dua siksaan aktif bersamaan (contoh: Bola Ciut + Gravitasi Miring). | Efek fusi liar sementara (10 detik). |
| **Jeda Sunyi** | Setelah siksaan besar selesai. | Timer siksaan berhenti 2-3 detik, Mikro-Twist tidak muncul. |

---

### 4. GONG & TRANSISI FASE (MOMEN STRATEGIS)

1. **Pemicu GONG:** Counter pantulan mencapai target sesuai Fase (3, 5, 7, 10, 13, 16, 20...). Bisa dipercepat dengan aksi gaya (Close Call Kombo, Torment Survivor, Fusi) atau Appeal Sacrifice (bakar 10 AP).
2. **Freeze Frame:** Permainan membeku 1.5 detik.
3. **Pilih Pintu:** Pemain memilih 1 dari 3 Pintu:
   - **Hijau:** Power-Up Defensif (2 pilihan, aman).
   - **Merah:** Power-Up Langka (1 pilihan, tier tinggi) + Siksaan langsung.
   - **Biru:** Kartu Nasib + Relik Liar (misteri).
4. **Shop:** Beli Power-Up (maks 6 slot). Jika penuh, harus mengganti yang lama.
5. **Cek Fusi:** Sistem mengecek apakah ada kombinasi Power-Up yang memicu Fusi Lv1, Lv2, atau Lv3. Jika ya, Fusi otomatis terjadi dengan animasi spesial.
6. **Naik Fase:** Jika syarat pantulan fase terpenuhi, Fase naik. Deck siksaan ditambah, timer siksaan makin cepat.

---

### 5. FINALE FASE (BOSS MINI)

- **Terjadi setelah GONG terakhir di setiap Fase** (setelah syarat pantulan fase terpenuhi dan semua GONG di fase itu selesai).
- **Pool Boss:** Setiap Arena memiliki 3 Mini Boss. Boss dipilih acak dari yang belum dikalahkan di history pemain.
- **Setelah Boss Kalah:**
  - Dapat hadiah: AP besar, Relik Liar, atau item kosmetik.
  - Boss memberikan dialog teaser yang mengarah ke Boss lain atau misteri lebih besar.
  - Progres Boss tersimpan permanen.
  - Arena berikutnya dalam urutan terbuka jika semua 3 Boss di Arena saat ini sudah dikalahkan.

---

### 6. AKHIR RUN (RESOLUSI)

1. **Semua Bola Mati:** Jika tidak ada nyawa tersisa.
2. **Tawaran Manajer (jika Fase 5+):** Manajer memberikan satu pilihan personal—mengorbankan sesuatu demi melanjutkan run atau menerima kematian dengan bonus.
3. **Roulette Kematian:** Satu kesempatan terakhir keberuntungan (respawn, AP 2x, Fase lompat, dll.).
4. **Laporan Penonton:**
   - Hitung Poin Ketenaran: `(Total Pantulan) + (Skor Kekonyolan × 10) + (Fase Tertinggi × 5)`.
   - Tampilkan statistik, komentar penonton acak, dan Komentator Terpilih.
   - Jika ada dialog naratif run (10, 50, 100), mainkan di sini.
5. **Mastery Progression:** EXP ditambahkan ke Arena dan Stick yang digunakan. Level naik, buka ability baru.
6. **Kembali ke Menu Utama.**

---

### 7. META-PROGRESI (ANTAR RUN)

| Sistem | Kemajuan |
|--------|----------|
| **Poin Ketenaran** | Mata uang permanen untuk Toko Kosmik. |
| **Mastery Arena** | Level 1-5, buka Modifier favorit (Lv3) dan Ability Naratif (Lv5). |
| **Mastery Stick** | Level 1-5, efek Signature makin kuat, buka Ability Pamungkas (Lv5). |
| **Progres Boss** | 21 Mini Boss dilacak permanen. Semua terkalahkan → Stage Rahasia terbuka. |
| **Momen Naratif** | Run 10: Glarp Berbicara. Run 50: Tatapan Manajer. Run 100: Surat dari Kreator. |

---

### 8. MODE ZEN

- **Akses:** Dari menu utama.
- **Perbedaan:** Tidak ada siksaan, GONG, Boss, atau timer. Hanya pantulan, musik, dan estetika.
- **Tujuan:** Relaksasi, latihan, atau sekadar menikmati dunia tanpa tekanan.

---

## 📊 VISUALISASI LOOP UTAMA

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
║  GAMEPLAY AKTIF                                  ║
║  • Pantulan → AP, Skor, Mood                     ║
║  • Chaos Engine → Siksaan, Twist, Mikro          ║
║  • GONG → Pilih Pintu → Shop → Fusi             ║
║  • Boss Mini → Dialog → Teaser                  ║
╚══════════════════════════════════════════════════╝
    │
    ▼
[MATI] → [TAWARAN MANAJER] → [ROULETTE] → [LAPORAN]
    │
    ▼
[POIN KETENARAN & MASTERY] → [MENU UTAMA]
```

---

Inilah Core Game Loop final *The Cosmic Circus Loop*. Setiap elemen saling terkait, setiap detik ada keputusan atau kejutan, dan setiap run membawa pemain lebih dekat pada misteri yang lebih besar—atau pada kemenangan melawan Manajer. Apakah loop ini sudah sesuai dengan visimu, atau ada bagian yang ingin kita dalami lagi? 🎪