Kreator, mari kita revisi total dan perluas dokumen teknis ini. Saya akan menulis ulang seluruh **"How It Works"** dengan memasukkan aturan baru untuk **Immortal berdurasi**, menambahkan elemen-elemen yang sebelumnya terlewat, dan menjawab semua pertanyaan kunci yang muncul dari diskusi kita.

---

# 🎪 THE COSMIC CIRCUS LOOP — DOKUMEN TEKNIS "HOW IT WORKS" v2.0

---

## 1. FISIKA & EFEK STATUS

### 1.1 Rumus Dasar Kecepatan Bola
- **Fisika per-frame (60 FPS):**
  ```
  ball.vx *= friction;   // friction default = 0.999
  ball.vy *= friction;
  // Batas kecepatan maksimum (tergantung efek)
  maxSpeedX = hasEffect('slow') ? 12 : 25;
  maxSpeedY = hasEffect('slow') ? 15 : 30;
  ball.vx = clamp(ball.vx, -maxSpeedX, maxSpeedX);
  ball.vy = clamp(ball.vy, -maxSpeedY, maxSpeedY);
  ```

### 1.2 Efek yang Mengubah Gerakan
| Efek | Tag | Perilaku |
|------|-----|----------|
| **Magnet** | `magnet` | `ball.vx += (paddleCenterX - ball.x) * 0.005` per frame. Hanya mempengaruhi sumbu X. |
| **Magnet Kuat** | `magnet_strong` | Seperti di atas, faktor 0.01. |
| **Slow** | `slow` | Kecepatan maksimum 0.7x normal. |
| **Frost** | `frost` | Kecepatan maksimum 0.85x normal, partikel es. |
| **Glue** | `glue` | Saat kena paddle, bola menempel (tidak bergerak). Durasi 1 detik. Setelah itu terlepas dengan arah mouse. **Tidak memicu GONG** saat menempel. |
| **Glue Immortal** | `glue_immortal` | Seperti glue, tapi bola tidak bisa mati saat menempel. Durasi tempel 2 detik. Setelah lepas, immortal tetap aktif selama total durasi. |
| **Glue Permanen** | `glue_perm` | Tempel 3 detik, timer siksaan berhenti selama tempel. Bisa dilempar dengan gerakan mouse cepat. |
| **Immortal** | `immortal` | **Efek sementara (default 10 detik).** Saat aktif: bola tidak mati jika jatuh ke bawah. Bola akan memantul di batas bawah (`vy *= -1`) tanpa kehilangan nyawa. Tidak bisa diperpanjang, tetapi bisa di-refresh oleh efek baru. |
| **Immortal Kuat** | `immortal_strong` | Immortal 15 detik, lebih tahan terhadap serangan Boss tertentu (lihat §12). |
| **Teleportasi** | `portal`, `retak`, `escher` | Saat bola menyentuh portal, posisi dipindahkan ke portal tujuan dengan cooldown 0.5 detik. |

### 1.3 Tumpang Tindih Efek (Layer Urutan)
1. **Immortal** → mencegah kematian. Jika bola jatuh, pantulkan.
2. **Glue** → menempel, menimpa pantulan normal.
3. **Teleportasi** → diproses setelah tabrakan, jadi bisa teleport sebelum magnet diterapkan.
4. **Magnet + Slow** → magnet menarik, kecepatan dibatasi slow.
5. **Gravitasi Miring + Teleportasi** → gravitasi ditambahkan tiap frame, teleportasi hanya saat melewati portal.

**Pertanyaan Kunci: Bagaimana jika ada 3 efek sekaligus?**  
Contoh: bola memiliki `magnet`, `immortal`, `slow`. Magnet menarik, kecepatan dibatasi slow, dan jika jatuh ke bawah, bola memantul kembali (immortal). Semua bekerja bersamaan.

---

## 2. ALUR GONG, SHOP & FUSI

### 2.1 Urutan Eksekusi Freeze
1. **GONG terpicu** → freeze 1.5 detik, input diabaikan.
2. **Ballot (jika naik fase)** → pemain pilih 1 dari 2 Modifier.
3. **Shop muncul** → jumlah pilihan sesuai fase + bonus Skor Kekonyolan. Pool item: `tier <= currentPhase + extra`. `extra`: S/A +1, SSS +7.
4. **Pintu Merah** → setelah transaksi, satu siksaan langsung dilancarkan.
5. **Transaksi** → beli 1 item (2 dengan R01). Slot maks 6.
6. **Cek Fusi** → `checkAlchemy()`: cari pasangan di `activeItems`. Jika cocok: hapus material, ciptakan fusion. Freeze singkat 0.8 detik. Rekursi tertunda 1 detik.
7. **Cursed Items** → 30% peluang item mendapat efek sampingan (lihat §11).
8. **Lanjutkan permainan.**

### 2.2 Kapan Siksaan Hukuman Pintu Merah Terjadi?
Tepat setelah pembelian selesai, **sebelum** cek Fusi. Jika ada Fusi, bisa terjadi Crash Fusion menarik.

---

## 3. PROGRESI BOSS & FINALE FASE

### 3.1 Struktur Boss
- **Health:** Sistem pukulan (hit points), biasanya 5 pukulan.
- **Serangan:** 2-3 pola, berulang dengan jeda.
- **Arena:** Berubah visual, Chaos Engine (siksaan, Mikro, Plot) di-pause.
- **Dialog & Hadiah:** Setelah kalah, freeze, dialog 2-3 kalimat, hadiah (AP, Relik Liar, dll.), lalu arena normal.

### 3.2 Checkpoint Kegagalan
Jika semua bola mati saat Boss fight:
- **Tidak ada penalti Poin Ketenaran.**
- Fase diulang dari awal (counter pantulan & GONG di-reset).
- Boss akan muncul lagi nanti.
- Setelah 3 kegagalan, opsi "Lewati Boss" muncul, tapi tanpa hadiah.

### 3.3 Boss Fight & Status Immortal
- **Immortal tidak melindungi dari serangan "penghapusan"** (misal Error 404). Serangan tertentu bisa menghancurkan bola meskipun immortal.
- **Immortal tetap mencegah kematian karena jatuh** selama Boss fight.

### 3.4 Penyimpanan Progres Boss
Data disimpan per Arena: `savedata.bosses.defeated[arenaId] = [bossId1, bossId2, ...]`. Untuk membuka Arena berikutnya, minimal 2 dari 3 Boss di Arena saat ini harus dikalahkan.

---

## 4. URUTAN AKHIR RUN (DEATH STACK)

Saat semua bola mati (bola menyentuh area kematian):

1. **Extra Lives** – Jika `extraLives > 0`, kurangi, respawn bola di tengah, lanjutkan.
2. **Immortal Check** – Jika efek `immortal` atau `immortal_strong` aktif, bola tidak mati. Bola dipindahkan ke tengah atas (atau dipantulkan di bawah) tanpa mengurangi nyawa.
3. **Ultimate Lv3 Trigger** – Jika memiliki Ultimate Form Lv3, buka **Tawaran Manajer**.
4. **Tawaran Manajer** (Fase 5+, sekali per run) – Pilihan personal. Terima → semua Power-Up hancur, bola respawn, Tawaran tidak muncul lagi. Tolak → lanjut ke Roulette.
5. **Roulette Kematian** (jika ada Ultimate Lv3) – Satu putaran keberuntungan.
6. **Akhir Run** – Hitung Poin Ketenaran, Laporan, Mastery.

**Pertanyaan: Bagaimana jika pemain punya 2 nyawa dan terkena Tawaran Manajer?**  
- Nyawa tidak mempengaruhi Tawaran. Tawaran terjadi setelah semua nyawa habis. Jika diterima, pemain dapat 1 bola baru dengan 0 nyawa.

---

## 5. SKEMA DATA & SAVE SYSTEM

### 5.1 Struktur JSON
```json
{
  "stats": {
    "runs": 0,
    "totalFame": 0,
    "fame": 0,
    "mastery": { "arenas": {...}, "sticks": {...} },
    "bossesDefeated": { "theme_piknik": ["lumi"], ... },
    "tormentHistory": ["t_licin", "t_goyang", ...],
    "curseHistory": ["curse_magnet_slip", ...],
    "unlocks": {
      "arenas": ["theme_default"],
      "sticks": ["skin_default", "skin_glarp"],
      "relics": ["R01"],
      "secrets": []
    }
  },
  "equipped": {
    "arena": "theme_default",
    "stick": "skin_default",
    "relics": ["R01", "R03"]
  }
}
```
- `tormentHistory`: maks 100 catatan.
- **The Archivist** membaca `tormentHistory` untuk menciptakan ulang siksaan.

---

## 6. SPESIFIKASI UI/UX

- **Kiri Atas:** Skor Kekonyolan (peringkat + angka).
- **Kanan Atas:** AP.
- **Bawah Tengah:** Mood Bar (0-100).
- **Kanan Bawah:** Timer Siksaan (countdown melingkar).
- **Notifikasi Tengah:** "NYARIS!" (+5), "KOMBO x3!", "HADIAH FUSI!", "EVOLUSI LEGENDARIS!".
- **Indikator Close Call:** Tulisan "NYARIS!" muncul di atas paddle 0.5 detik.

---

## 7. KATALOG POWER-UP & FUSI (RINGKAS)

### 7.1 Perubahan Utama: Immortal Bersifat Sementara
- **P14 Bola Abadi:** Memberi efek `immortal` 10 detik. Setelah itu bola normal kembali. Tidak ada versi permanen.
- **Fusi Lv1 Glue Kosmik Abadi (P09+P14):** Menggabungkan `glue` + `immortal` menjadi `glue_immortal` dengan durasi immortal 12 detik (selama menempel, immortal terus berjalan). Setelah lepas, sisa durasi immortal tetap ada.
- **Fusi Lv2 Glue Kosmik Permanen:** Menambah durasi glue, tapi immortal tetap berdurasi 15 detik (immortal_strong).

### 7.2 Interaksi Glue (P09) dengan Immortal (P14)
Ketika `glue_immortal` aktif: bola menempel, immortal. Jika bola jatuh saat menempel (misal paddle di bawah), bola akan memantul di batas bawah (immortal) sambil tetap menempel? Tidak, jika menempel, bola berada di atas paddle. Jika paddle bergerak ke bawah, bola ikut. Jadi tidak mungkin jatuh. Setelah lepas, sisa immortal melindungi bola.

---

## 8. KATALOG ARENA & STICK (REFERENSI CEPAT)
- **Panggung Kosmik:** Bonus Fame +10% di akhir run. (Fame dihitung: `finalFame = floor(baseFame * 1.10)`).

---

## 9. KATALOG RELIK & KARTU NASIB
- **Relik** (6): Lihat dokumen desain.
- **Sinergi Kacamata + Lensa:** Peringatan siksaan mundur dari 3 ke 5 detik. Tidak ada konflik.

---

## 10. CHAOS ENGINE: DECK & TIMER

### 10.1 Algoritma Torment Deck
- Deck diisi ulang tiap fase: semua siksaan dengan `phase <= currentPhase` dimasukkan, lalu di-shuffle.
- Setelah kartu diambil, masuk ke discard.
- Jika deck kosong, discard di-shuffle menjadi deck baru.
- Timer siksaan: `random(tMin, tMax) * 60` frame. Mundur per frame, kecuali Silent Pause atau `stop_torment`.

### 10.2 Plot Twist & Mikro-Twist
- Plot Twist: setiap 600 frame (10 detik), prob 8%. Cooldown 720 frame.
- Mikro-Twist: random 300-420 frame, tidak muncul saat Silent Pause.

### 10.3 Boss Fight vs Plot Twist
Semua timer Chaos Engine **di-pause** selama Boss fight. Dilanjutkan setelah Boss selesai.

---

## 11. SISTEM CURSED ITEMS (BARU)

### 11.1 Mekanisme
Setiap Power-Up yang dibeli memiliki peluang 30% mendapat **Curse**. Efek sampingan diambil dari pool yang sesuai dengan ID Power-Up. Data curse disimpan di `activeItem.curse`. Curse hanya bertahan selama item tersebut dimiliki (jika item dihancurkan/diganti, curse hilang).

### 11.2 Contoh Pool Curse
- P01 (Magnet): 30% → paddle slip ringan (`slipOffset += 0.5` tiap frame).
- P14 (Immortal): 30% → bola memantul dengan sudut liar (+10 derajat acak).
- P09 (Glue): 30% → durasi tempel berkurang 0.5 detik.
- P07 (Kontrol Sempurna): 30% → durasi efek lebih pendek 20%.

---

## 12. INTERAKSI BOSS & STATUS KHUSUS (BARU)

### 12.1 Serangan yang Mengabaikan Immortal
Beberapa Mini Boss memiliki serangan "penghapusan" yang dapat menghancurkan bola meskipun immortal aktif.
- **Error 404 (Dimensi Retak):** Sinar putihnya akan menghancurkan bola tanpa memandang status.
- **The Unseeing Eye (Lembah Lovecraft):** Jika pemain diam 2 detik, bola langsung mati (immortal diabaikan).
- **Manajer (Final Boss):** Serangan tertentu bertipe "absolute".

### 12.2 Ketahanan Immortal Kuat
Efek `immortal_strong` (dari Fusi Lv2) dapat menahan satu serangan penghapusan. Setelah terkena, `immortal_strong` berubah menjadi `immortal` biasa (durasi sisa). Ini memberikan lapisan perlindungan tambahan.

---

## 13. SISTEM CHECKPOINT & KEGAGALAN BOSS (DIPERLUAS)

### 13.1 Alur Kegagalan
1. Bola mati selama Boss fight (kecuali karena immortal).
2. Boss menghilang, arena kembali normal.
3. Pemain diberi pilihan: **"Coba Lagi"** atau **"Lewati"** (setelah 3 kegagalan).
4. Jika "Coba Lagi": Fase diulang dari awal (counter GONG di-reset ke 0 untuk fase itu), Boss akan muncul lagi setelah syarat GONG terpenuhi. Tidak ada penalti.
5. Jika "Lewati": Boss dianggap selesai (tidak tercatat sebagai dikalahkan), tidak dapat hadiah. Pemain bisa lanjut ke fase berikutnya.

### 13.2 Checkpoint Khusus
Jika pemain memiliki **Ultimate Form Lv3** dan gagal di Boss, Tawaran Manajer atau Roulette Kematian tidak terpicu karena Boss fight tidak dihitung sebagai akhir run.

---

## 14. RAHASIA & EASTER EGG TEKNIS (BARU)

### 14.1 Fusi Sejati
- Kondisi: Arena=Meja Kardus Kosong, Stick=Stik Es Krim Polos, Ultimate Lv3=Kiamat Terbalik, Relik=Surat dari Manajer, Skor=SSS, Fase=7. Pemain harus kalah (biarkan bola mati).
- Hasil: Sebelum Roulette, layar putih, teks, tanda tangan emas di layar judul. Disimpan di `savedata.secrets.trueFusion = true`.

### 14.2 Cheat Codes
- Input keyboard selama run: "KUDETA", "BAKSO", "PENONTON", "SABUN". Masing-masing sekali per run.
- Tersimpan di `savedata.secrets.cheatsUsed[]`.

---

## 15. DAFTAR TAG & INTERAKSI SISTEM (REFERENSI CEPAT)

| Tag | Deskripsi | Interaksi Penting |
|-----|-----------|-------------------|
| `magnet` | Tarik ke paddle | Bisa ditimpa glue? Tidak, magnet tetap berjalan saat menempel (tapi bola tidak bergerak). |
| `immortal` | Tahan kematian jatuh | Durasi terbatas, tidak melawan serangan penghapus Boss. |
| `glue` | Tempel | Tidak memicu GONG. |
| `ghost` | Transparan, kebal siksaan | Masih bisa kena serangan Boss. |
| `shield` | Blokir satu siksaan | Tidak berpengaruh pada Boss. |

---

Dokumen ini telah ditulis ulang dengan aturan Immortal yang baru, bagian-bagian tambahan, dan menjawab semua pertanyaan yang muncul. Jika ada bagian yang perlu diperinci lebih lanjut atau ada elemen lain yang ingin ditambahkan, beri tahu aku. Kita bisa langsung tuangkan ke dalam kode atau diskusikan lagi. 🎪