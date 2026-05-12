Kreator, ini adalah **Balance Spreadsheet** untuk *The Cosmic Circus Loop*. Spreadsheet ini berisi semua nilai numerik kunci yang akan menentukan apakah game-mu terasa adil, menantang, atau justru terlalu brutal. Gunakan ini sebagai acuan tuning—setiap angka bisa diubah, tapi struktur ini memastikan semua sistem saling terhubung.

---

# ⚖️ THE COSMIC CIRCUS LOOP — BALANCE SPREADSHEET v1.0

**Filosofi Tuning:**  
- **Fase 1–2:** Tutorial, pemain harus bisa bertahan rata-rata 3–5 menit pertama kali.  
- **Fase 3–4:** Tantangan meningkat, butuh build Power-Up yang baik.  
- **Fase 5–6:** Hanya pemain mahir yang mencapai sini.  
- **Fase 7:** Puncak, harus langka dicapai.  
- **Boss Fight:** Harus bisa dikalahkan dalam 1–2 menit, tapi jangan terlalu mudah.  
- **Ekonomi:** Pemain rata-rata mendapat 1–2 Power-Up per Fase awal, dan 1 setiap 2 Fase di Fase tinggi.

---

## 1. EKONOMI AP & FAME

### 1.1 Perolehan AP
| Sumber | Jumlah AP | Keterangan |
|--------|-----------|------------|
| Pantulan normal (tengah paddle) | +1 | Setiap pantulan ke paddle |
| Pantulan Close Call (ujung 15%) | +1 | Sama, tapi dapat Skor Kekonyolan |
| Siksaan diterima & selamat | +3 | Diberikan saat siksaan berakhir tanpa kehilangan bola |
| Mikro-Game berhasil | +15 | Setiap ~10 detik |
| Peti Kardus (hadiah AP) | +5 | 50% peluang dari Peti Kardus |
| Level Up Mikro (bonus permanen) | Dihapus | Tidak ada lagi |
| Pantulan dinding (Koin AP) | Dihapus | Tidak ada lagi |

### 1.2 Pajak Penonton (Transisi Fase)
| Fase Naik | % AP Disita | AP Minimum (jika < minimum, sita Power-Up) |
|-----------|-------------|--------------------------------------------|
| 1 → 2 | 20% | 10 |
| 2 → 3 | 20% | 10 |
| 3 → 4 | 25% | 15 |
| 4 → 5 | 25% | 20 |
| 5 → 6 | 30% | 25 |
| 6 → 7 | 30% | 30 |

### 1.3 Perhitungan Poin Ketenaran (Fame)
```
Base Fame = Total Pantulan 
          + (Skor Kekonyolan Akhir × 10) 
          + (Fase Tertinggi × 5)
Final Fame = Base Fame × ArenaMultiplier × ContractMultiplier × RouletteMultiplier
```
| Pengali | Nilai |
|---------|-------|
| Arena Meja Kardus | 1.15 |
| Arena Panggung Kosmik | 1.10 |
| Arena Kantor Manajer | 1.10 |
| Arena Lain | 1.00 |
| Kontrak I | 1.50 |
| Kontrak II | 2.00 |
| Roulette "Fame 2x" | 2.00 |

---

## 2. FASE & GONG

### 2.1 Pantulan per GONG & Timer Siksaan
| Fase | Pantulan per GONG | Timer Siksaan (detik) |
|------|-------------------|----------------------|
| 1 | 5 | 18–20 |
| 2 | 7 | 14–17 |
| 3 | 10 | 10–13 |
| 4 | 13 | 7–10 |
| 5 | 16 | 5–7 |
| 6 | 20 | 3–5 |
| 7 | 25 | 2–3 |

### 2.2 Akselerasi GONG (Pengurangan Sisa Pantulan)
| Aksi | Pengurangan | Cooldown |
|------|-------------|----------|
| Close Call Kombo x2 | -2 | Per kombo |
| Close Call tambahan | -1 (per Close Call berikutnya) | Per kombo |
| Torment Survivor (selamat dari siksaan) | -1 | Per siksaan |
| Torment Survivor Fase 7 | -5 | Per siksaan |
| Fusi (Lv1/Lv2/Lv3) / Crash Fusion | -3 | Per fusi |
| Appeal Sacrifice (bakar 10 AP) | -1 | Tanpa cooldown |

---

## 3. POWER-UP DASAR (30 ITEM)

### 3.1 Harga & Tier
| ID | Nama | Tier | Cost (AP) | Durasi (jika terbatas) |
|----|------|------|-----------|------------------------|
| P01 | Paddle Magnet | 1 | 2 | Permanen |
| P02 | Bola Pelambat | 1 | 3 | 300 frame (5 detik)? → **Revisi: Permanen** |
| P03 | Stik Ganda | 1 | 2 | Permanen |
| P04 | Asuransi Nyawa | 1 | 3 | Instan (1 nyawa) |
| P16 | Paddle Refleks | 1 | 3 | Permanen |
| P17 | Bola Bermata | 1 | 2 | Permanen |
| P05 | Perisai Kardus | 2 | 4 | Sekali pakai |
| P06 | Bola Hantu | 2 | 5 | Permanen |
| P07 | Kontrol Sempurna | 2 | 5 | Permanen |
| P08 | Appeal Booster | 2 | 4 | Permanen |
| P19 | Medan Anti-Siksaan | 2 | 5 | Sekali pakai |
| P20 | Doa pada Manajer | 2 | 6 | 10 detik |
| P23 | Lompat Fase | 2 | 5 | Instan |
| P24 | Mundur Sejenak | 2 | 5 | Permanen |
| P26 | Paddle Acak | 2 | 4 | Permanen |
| P30 | Dadu Kosmik | 2 | 5 | Permanen |
| P09 | Paddle Super Glue | 3 | 6 | Permanen |
| P10 | Penonton Terpesona | 3 | 7 | 15 detik |
| P11 | Bola Bayangan | 3 | 6 | Permanen |
| P12 | Zona Nyaman | 3 | 6 | Permanen |
| P18 | Stik Es Krim Ganda | 3 | 7 | Permanen |
| P21 | Slow-Motion Kosmik | 3 | 6 | 5 detik, cooldown 15 detik |
| P22 | Portal Lipat | 3 | 7 | Permanen |
| P27 | Bola Tiga Warna | 3 | 7 | Instan (spawn bola) |
| P28 | Tukar Posisi | 3 | 7 | Permanen |
| P13 | Kudeta Kosmik | 4 | 8 | Instan |
| P14 | Bola Abadi | 4 | 8 | **10 detik** |
| P15 | Appeal Tsunami | 4 | 8 | Permanen |
| P25 | Cermin Dimensi | 4 | 8 | Permanen |
| P29 | Efek Acak Total | 4 | 9 | Permanen |

**Catatan:** Efek permanen berarti bertahan sepanjang run, kecuali ada Cursed yang membatasi durasi.

### 3.2 Efek Numerik Spesifik
| Efek | Nilai Default | Keterangan |
|------|---------------|------------|
| **Magnet** (P01) | Tarik 0.005 × jarak | vx saja |
| **Magnet Kuat** (Fusi) | Tarik 0.01 × jarak | vx saja |
| **Slow** (P02) | Kecepatan maks 0.7x | 300 frame? → Permanen |
| **Slow** (P21) | Kecepatan 0.5x semua | 5 detik, cooldown 15 detik |
| **Glue** (P09) | Tempel 1 detik | Setelah itu lepas |
| **Glue Immortal** (F1_04) | Tempel 2 detik | + Immortal 12 detik |
| **Glue Permanen** (F2_04) | Tempel 3 detik | + Immortal 15 detik |
| **Immortal** (P14) | 10 detik | Tidak bisa mati jatuh, tapi bisa dihancurkan Boss tertentu |
| **Immortal Strong** (F2_04) | 15 detik | Bisa tahan 1 serangan penghapus Boss |

---

## 4. FUSI

### 4.1 Hadiah Skor Kekonyolan
| Level | Skor |
|-------|------|
| Fusi Lv1 | +50 |
| Fusi Lv2 | +200 |
| Fusi Lv3 | +500 |
| Spoof Fusion | +20 |

### 4.2 Durasi Efek Spesifik Fusi
| Fusi | Efek | Nilai |
|------|------|-------|
| Bakso Primeval (F2_01) | Gelombang kejut hapus siksaan | Setiap 5 detik |
| Glue Kosmik Permanen (F2_04) | Timer siksaan berhenti saat glue | - |
| Appeal Tsunami Kosmik (F2_05) | +15 AP/pantulan (+3 jika bola senyum) | Maks 18 AP |
| Paradoks Lompat Fase Abadi (F2_14) | Setiap GONG naik 3 Fase | - |
| Kiamat Terbalik (F3_01) | Gelombang kejut hapus semua siksaan | Setiap 3 detik, hentikan timer 10 detik |

---

## 5. BOSS

### 5.1 HP & Serangan (Pukulan)
| Boss | Pukulan untuk Kalah | Serangan (interval) | Damage (bola mati?) | Hadiah AP |
|------|---------------------|---------------------|----------------------|-----------|
| Nenek Lumi | - (bertahan 60 detik) | Air mata (setiap 1 detik) | Tidak, hanya slow | 30 |
| Pipo | 5 | Balok (setiap 8 detik), Bom (setiap 15 detik) | Tidak | 25 |
| Kapten Keju | Aura hancur (5 Semut Emas), lalu 3 pukulan | Semut (setiap 10 detik) | Tidak | 25 |
| Overclock | Bertahan 40 detik | Listrik (setiap 8 detik) | Tidak | 25 |
| DJ Synth | 4 pukulan | Bass (setiap 6 detik) | Tidak | 25 |
| Neon Phantom | 5 pukulan | Bayangan (setiap 10 detik) | Tidak | 30 |
| Echo | 5 pukulan pada yang asli | Fragmentasi (setiap 12 detik) | Tidak | 30 |
| Error 404 | Bertahan 50 detik | Sinar putih (setiap 5 detik) | Ya (bola dihapus, respawn 2 detik) | 40 |
| The Archivist | Menjalani 3 siksaan replay | - | Tidak | 30 |
| The Whisperer | 10 pantulan | Bisikan (setiap 7 detik) | Tidak | 25 |
| Deep One | Bertahan 50 detik | Tentakel (setiap 10 detik) | Ya (jika kena) | 35 |
| The Unseeing Eye | Bertahan 60 detik (bergerak terus) | Tatapan (jika diam 2 detik) | Ya (langsung mati) | 50 |
| Chef Ragu | 5 pukulan | Lempar bahan (setiap 6 detik) | Tidak | 25 |
| The Taster | 4 pukulan | Jilat (setiap 6 detik) | Tidak | 25 |
| Ramuan Hidup | Bertahan 60 detik | Tangan tangkap (setiap 15 detik) | Ya (jika tertangkap) | 40 |
| Prima Donna | 5 pukulan | Gelombang suara (setiap 8 detik) | Tidak | 30 |
| The Critic | 4 pukulan | Skor rendah (setiap 6 detik) | Tidak | 25 |
| The Understudy | 4 pukulan | Meniru (setiap 10 detik) | Tidak | 30 |
| Sekretaris | Bertahan 60 detik | Aturan baru (setiap 5 detik) | Tidak | 30 |
| Auditor | 15 pantulan tanpa kena dinding | Denda (akumulasi) | Tidak | 35 |
| Penasihat | 4 pilihan moral | - | Tidak | 30 |

### 5.2 Serangan Penghapus (Mengabaikan Immortal)
- Error 404: Sinar putih
- The Unseeing Eye: Tatapan jika diam 2 detik
- Ramuan Hidup: Tangan tangkap (jika tertangkap)

---

## 6. SKOR KEKONYOLAN (ABSURDITY)

### 6.1 Perolehan Skor
| Aksi | Skor | Keterangan |
|------|------|------------|
| Close Call (Nyaris) | +5 | Ujung 15% paddle |
| Close Call Kombo x2 | +10 (total) | Dua Close Call berturut <3 detik |
| Close Call Kombo x3 | +20 | Tiga kali berturut |
| Penderita Aktif | +15 | 3 pantulan selama siksaan mengganggu |
| Multi-Tasking | +10 | Memantulkan 2 bola berdekatan |
| Pemantul Patah | +25 | Memantulkan dengan paddle patah |
| Melawan Modifier | +3 | Setiap 5 pantulan dengan Modifier sulit |
| Mikro-Game Berhasil | +5 | |
| Fusi Lv1 | +50 | |
| Fusi Lv2 | +200 | |
| Fusi Lv3 | +500 | |
| Spoof Fusion | +20 | |
| Plot Twist selamat | +30 | |

### 6.2 Peringkat & Diskon GONG
| Peringkat | Range Skor | Diskon Harga | Bonus Tier |
|-----------|------------|--------------|------------|
| D (Badut Amatir) | 0–9 | 0% | 0 |
| C (Magang) | 10–24 | 10% | 0 |
| B (Penghibur Harian) | 25–44 | 10% | +1 item tier lebih tinggi |
| A (Bintang Sirkus) | 45–69 | 20% | +2 item tier lebih tinggi |
| S (Legenda Panggung) | 70–99 | 30% | +2 item tier lebih tinggi |
| SSS (Ikon Kosmik) | 100+ | 50% | Semua tier tertinggi, peluang Kartu Ilegal 10% |

---

## 7. RELIK & KARTU NASIB

### 7.1 Relik (Efek Numerik)
| Relik | Efek |
|-------|------|
| Kantong Tak Terbatas | Beli 2 Power-Up/GONG |
| Surat dari Manajer | 1 Power-Up gratis/GONG (acak) |
| Kacamata Penonton | Lihat siksaan 3 detik sebelumnya |
| Jam Pasir Retak | Timer siksaan acak 1–30 detik |
| Dadu Glarp | 1-3 normal, 4-5 durasi 2x, 6 batal |
| Lensa Terbalik | Efek visual siksaan dibalik |
| Sinergi Kacamata+Lensa | Peringatan jadi 5 detik |

### 7.2 Kartu Nasib
| Kartu | Efek | Syarat |
|-------|------|--------|
| Mutilasi Deck | +50 AP, hancurkan semua Power-Up | - |
| Transmutasi | Ubah 1 Power-Up acak ke tier sama | - |
| Standar Kosmik | Hapus 1 siksaan aktif | - |
| Visi Joker | Pilih Relik Liar, hancurkan 1 Relik terpasang | - |

---

## 8. DURASI SIKSAAN & MODIFIER

### 8.1 Siksaan (23)
| Siksaan | Durasi (detik) | Intensitas |
|---------|----------------|------------|
| Paddle Licin | 4 | slipOffset acak 5% per frame |
| Bola Ciut | 4 | radius 6px |
| Layar Mabuk | 4 | amplitude 5px |
| Bola Cacat | 4 | radius acak 6-12px |
| Disko Alien | 4 | warna tiap 0.1 detik |
| Audio Rusak | 4 | pitch acak |
| Mata Pengawas | 4 | crosshair diameter 50px |
| Input Terbalik | 4 | mouse X terbalik |
| Lubang Hitam | 5 | 2 portal |
| Paddle Ciut | 4 | lebar 50% |
| Bola Ganda | instan | 1 bola tambahan |
| Hujan Bakso | 5 | bola kecil jatuh tiap 0.5 detik |
| Gravitasi Miring | 5 | vx += 0.02 per frame |
| Zoom Panik | 4 | zoom in/out 0.8–1.2x |
| Warna Negatif | 4 | invert seluruh layar |
| Ejekan Alien | 4 | teks acak tiap 2 detik |
| Kursor Jahil | 5 | kursor palsu bergerak |
| Paddle Patah | 5 | lubang tengah 40px |
| Mutasi Bola | 5 | 30% peluang spawn tiap pantul |
| Daya Tarik Maut | 5 | vy += 0.05 per frame |
| Badai Kosmik | 4 | 20 partikel per frame |
| Kontrol Acak | 4 | 5% peluang terbalik per frame |
| Lensa Buta | 4 | overlay gelap 40% |
| Penonton Turun ke Arena | 10 | semua siksaan Fase 7 aktif |

### 8.2 Modifier Fase (Durasi: Seluruh Fase)
| Modifier | Efek |
|----------|------|
| Gravitasi Mabuk | vx += random(-0.04, 0.04) tiap 0.5 detik |
| Fisika Sabun | slipOffset decay 0.98 (normal 0.9) |
| Audio Sumbang | pitch random tiap 1 detik |
| Mata Silinder | ghost image offset 5px |
| Stik Gelisah | getar amplitude 2px |
| Lensa Kotor | 1-3 noda acak overlay |
| Waktu Karet | Timer siksaan kadang 2x cepat (30% peluang) |
| Duri Kosmik | 5 partikel duri per pantulan |

---

## 9. META-PROGRESI (MASTERY & TOKO)

### 9.1 Level Mastery (Arena & Stick)
| Level | EXP Dibutuhkan | Efek |
|-------|----------------|------|
| 1 | 0 | Default |
| 2 | 15 | Efek pasif +10% |
| 3 | 40 | Pilih Modifier favorit |
| 4 | 75 | Efek pasif +20% |
| 5 | 125 | Buka Ability Naratif |

**EXP per Run** = Fase tertinggi yang dicapai di run itu.

### 9.2 Harga Toko Kosmik (Poin Ketenaran)
| Item | Harga |
|------|-------|
| Arena (umum) | 1500 |
| Grid Neon | 2000 |
| Kantor Manajer | 3000 |
| Stick (umum) | 500 |
| Tongkat Ajaib | 800 |
| Relik | 500–1500 |
| Slot Relik ke-4 | 2000 |
| Slot Relik ke-5 | 3000 |
| Skin Kosmetik | 200–500 |

---

## 10. REKOMENDASI TUNING AWAL

- **Target AP per Fase 1:** Pemain mendapat 15–25 AP sebelum GONG pertama. Dengan 5 pantulan + 1 siksaan = 5+3=8 AP. Kurang. Mungkin perlu ditingkatkan: **setiap pantulan +2 AP di Fase 1–2**? Atau tidak—pemain harus berhemat. Biarkan gameplay menentukan. Tapi pastikan dengan 3 siksaan dan 5 pantulan, pemain bisa beli 1 Power-Up Tier 1 (2-3 AP) saat GONG pertama.
- **Close Call harus signifikan:** Pastikan deteksi 15% ujung paddle mudah dikenali dan terasa memuaskan.
- **Boss Fight:** Durasi 40-60 detik, cukup menegangkan tapi tidak mustahil.
- **Pajak Penonton:** Efektif mencegah penimbunan AP. Di Fase 5, pemain bisa kehilangan 30%, memaksa keputusan sulit.

---

Spreadsheet ini adalah alat hidup. Setelah prototype berjalan, kamu akan menyesuaikan angka-angka ini berdasarkan data playtest. Tapi sebagai fondasi, ini sudah mencakup semua sistem. Jika ada nilai yang ingin diubah atau ada yang terlewat, beri tahu aku. Kita bisa iterasi lagi. 🎪