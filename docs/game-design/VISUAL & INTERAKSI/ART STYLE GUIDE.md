Berikut adalah **Art Style Guide** untuk *The Cosmic Circus Loop*. Dokumen ini adalah kompas visual yang akan menjawab pertanyaan, "Seperti apa sih sirkus ini?"

---

# 🎨 THE COSMIC CIRCUS LOOP — ART STYLE GUIDE v1.0

**Dokumen:** Panduan Visual  
**Keterkaitan:** GDD, Story Bible, Audio Bible  
**Target:** Artis, UI Designer, Animator

---

## DAFTAR ISI
1. [Identitas Visual Utama](#1-identitas-visual-utama)
2. [Palet Warna](#2-palet-warna)
3. [Tekstur & Material](#3-tekstur--material)
4. [Shape Language](#4-shape-language)
5. [Desain Arena (7 Tema)](#5-desain-arena-7-tema)
6. [Desain Karakter & Objek](#6-desain-karakter--objek)
7. [Efek Visual](#7-efek-visual)
8. [UI Style & Font](#8-ui-style--font)
9. [Referensi Visual](#9-referensi-visual)

---

## 1. IDENTITAS VISUAL UTAMA

### 1.1 Filosofi Visual
*The Cosmic Circus Loop* harus terlihat seperti **kolase seorang alien gila**: perpaduan antara benda-benda rumah tangga yang difoto dengan pencahayaan seadanya, lalu ditempelkan ke latar belakang digital yang penuh efek glitch dan neon. Ini adalah estetika *"Cut-Out Mixed Media"*—kerajinan tangan anak kecil yang ditempel di kulkas, tapi kulkasnya adalah portal antar dimensi.

### 1.2 Prinsip Utama
1. **Kontras Murahan vs Megah:** Objek sehari-hari (stik es krim, bakso) harus terlihat sangat biasa, tapi efek yang menyertainya (glitch, neon, partikel) harus terlihat "kosmik".
2. **Ketidaksempurnaan adalah Fitur:** Foto asli tidak boleh diedit menjadi sempurna. Biarkan noise, bayangan tidak rata, dan ketajaman yang kurang sebagai nilai estetika.
3. **Konsistensi Material:** Semua objek fisik harus terlihat seperti berasal dari dunia nyata (Bumi), sementara semua elemen digital harus terlihat seperti berasal dari dimensi lain.
4. **Visual Responsif:** Setiap notifikasi, efek, dan transisi harus terasa "menyentak" dan "memuaskan" secara visual—seperti notifikasi di game mobile, tapi dengan estetika yang lebih kasar.

---

## 2. PALET WARNA

### 2.1 Palet Global
Warna-warna ini digunakan di seluruh game, terutama untuk UI dan efek netral.

| Nama Warna | Kode Hex | Deskripsi Penggunaan |
|------------|----------|-----------------------|
| **Void Black** | `#0A0A0C` | Latar belakang default, ruang hampa. |
| **Cardboard Brown** | `#C4A47A` | Warna dasar meja kardus. |
| **Neon Magenta** | `#FF00FF` | Aksen glitch, highlight notifikasi. |
| **Neon Cyan** | `#00FFFF` | Aksen glitch, garis neon di Grid. |
| **Gold** | `#FFD700` | Skor Kekonyolan peringkat S/SSS, partikel Fusi. |
| **Pure White** | `#FFFFFF` | Teks penting, mata Manajer, layar Fusi Sejati. |

### 2.2 Palet per Arena

| Arena | Palet Dominan | Suasana Visual |
|-------|---------------|-----------------|
| **Meja Kardus Kosong** | `#C4A47A`, `#3A3A3E`, `#0A0A0C` | Sepia gelap, penerangan bohlam tunggal. |
| **Piknik Chaos** | `#E63946` (merah), `#F1FAEE` (putih taplak), `#F4A261` (oranye keju) | Cerah, kontras tinggi, seperti piknik musim panas. |
| **Grid Neon Retrowave** | `#1A0033`, `#FF00FF`, `#00FFFF`, `#0A0A0C` | Gelap dengan garis neon, seperti malam di kota cyberpunk. |
| **Dimensi Retak** | `#0A0A0C`, `#FF00FF`, `#00FFFF`, `#FFFFFF` (glitch) | Monokrom dengan retakan neon, tidak stabil. |
| **Lembah Lovecraft** | `#0D1B2A`, `#1B2A47`, `#2E4A35` | Gelap, dingin, hijau lumut, atmosfer bawah laut. |
| **Kuali Ramuan** | `#2D1B4E`, `#F4A261`, `#E9C46A`, `#FFD700` | Hangat, ungu dan emas, seperti dapur sihir. |
| **Panggung Kosmik** | `#2C001E` (merah beludru), `#FFD700`, `#FFFFFF` | Megah, kontras tinggi, lighting teater. |
| **Kantor Manajer** | `#FFFFFF`, `#D3D3D3`, `#8B0000` (merah tua) | Steril, formal, monokrom dengan aksen merah. |

---

## 3. TEKSTUR & MATERIAL

### 3.1 Tekstur Utama
| Material | Deskripsi | Penggunaan |
|----------|-----------|------------|
| **Kardus** | Tekstur kardus coklat bergelombang dengan sedikit noise dan noda. Tidak boleh terlalu bersih. | Meja di semua arena (kecuali Grid Neon dan Kantor Manajer). |
| **Kayu (Stik Es Krim)** | Tekstur kayu ringan, serat terlihat, kadang ada bekas spidol. | Semua paddle. |
| **Neon** | Garis cahaya dengan efek blur (`box-shadow` atau `bloom`). Warna magenta dan cyan. | Grid Neon, retakan di Dimensi Retak, efek glitch. |
| **Retakan / Glitch** | Pola retakan tidak beraturan dengan offset RGB (seperti chromatic aberration). | Dimensi Retak, efek Crash Fusion, notifikasi error. |
| **Beludru Merah** | Tekstur kain mewah dengan lipatan. | Tirai di Panggung Kosmik. |
| **Logam / Remote** | Plastik mengkilap dengan tombol-tombol, sedikit kusam. | Remote TV Rusak, elemen UI. |
| **Es / Beku** | Kristal es transparan dengan refraksi. | Ikan Beku dari Nebula, efek Frost. |

### 3.2 Cara Membuat Tekstur
1. **Foto Asli (HP):** Ambil foto stik es krim, bakso, kardus, dan sendok dengan pencahayaan alami (dekat jendela). Jangan gunakan lighting studio.
2. **Crop & Alpha:** Hapus latar belakang (gunakan AI background removal atau manual dengan GIMP/Photopea). Simpan sebagai PNG dengan transparansi.
3. **Efek Digital:** Tambahkan efek glitch, neon, atau partikel menggunakan CSS/SVG/Shader, bukan di dalam foto. Pertahankan agar foto tetap terlihat "mentah".

---

## 4. SHAPE LANGUAGE

### 4.1 Bentuk Dasar
| Objek | Bentuk | Filosofi |
|-------|--------|----------|
| **Paddle (Stik Es Krim)** | Persegi panjang dengan ujung membulat. | Sederhana, jujur, "apa adanya". |
| **Bola (Bakso)** | Lingkaran tidak sempurna. | Organik, lucu, tidak mengancam. |
| **Alien** | Siluet membulat, mata besar, tanpa sudut tajam (kecuali Boss tertentu). | Ramah, menggemaskan, atau aneh—tidak pernah menakutkan secara realistis. |
| **UI (Tombol, Bar)** | Persegi panjang dengan sudut sedikit membulat (4px radius) atau bentuk tidak beraturan seperti kertas disobek. | "Ini formulir birokrasi alien." |
| **Efek (Partikel, Glitch)** | Garis-garis tajam, segitiga, dan bentuk acak. | Kontras dengan kebulatan objek fisik—menandakan "digital" vs "analog". |

### 4.2 Aturan Siluet
- Semua karakter dan objek harus dapat dikenali hanya dari siluetnya.
- Hindari detail yang terlalu kecil yang akan hilang saat di-scale ke ukuran game (terutama di paddle).

---

## 5. DESAIN ARENA (7 TEMA)

### 5.1 Meja Kardus Kosong
- **Latar Belakang:** Hitam pekat (`#0A0A0C`), satu bohlam gantung dengan cahaya kuning redup yang berayun sangat pelan.
- **Meja:** Tekstur kardus dengan sedikit noise, beberapa coretan krayon atau bekas lakban.
- **Partikel:** Debu halus melayang, kadang berkilau tertangkap cahaya.

### 5.2 Piknik Chaos
- **Latar Belakang:** Putih terang (seperti siang hari yang terlalu terang), tanpa langit.
- **Meja:** Taplak piknik kotak-kotak merah-putih yang sedikit kusut, noda saus di sana-sini.
- **Elemen Tambahan:** Piring kertas, semut alien kecil berjalan di latar, remah-remah biskuit.

### 5.3 Grid Neon Retrowave
- **Latar Belakang:** Gradien ungu tua ke hitam (`#1A0033` ke `#0A0A0C`). Grid perspektif bergaris magenta dan cyan yang terus bergerak ke bawah (animasi).
- **Meja:** Tidak ada meja fisik—hanya grid digital.
- **Efek:** Bintang-bintang neon di kejauhan. "Matahari" neon (lingkaran besar bergradien) yang tenggelam di horizon.

### 5.4 Dimensi Retak
- **Latar Belakang:** Hitam dengan retakan pixel magenta-cyan yang berdenyut (animasi).
- **Meja:** Sama seperti Meja Kardus tapi dengan tekstur yang "pecah" dan glitch (bagian-bagian yang hilang diganti noise statis).
- **Efek:** Layar kadang bergeser sendiri (efek screen shake intens). Teks error fiktif sesekali muncul di latar.

### 5.5 Lembah Lovecraft
- **Latar Belakang:** Gradien gelap dari hijau lumut (`#2E4A35`) ke hitam. Di kejauhan, tentakel raksasa bergerak sangat lambat (hampir tidak terlihat).
- **Meja:** Batu altar kuno dengan lumut, bukannya kardus.
- **Efek:** Kabut tipis di bagian bawah. Terkadang muncul mata yang menatap dari kegelapan.

### 5.6 Kuali Ramuan
- **Latar Belakang:** Dinding batu kuno dengan rak-rak penuh botol aneh.
- **Meja:** Kuali raksasa berisi cairan pelangi yang mendidih. Uap warna-warni mengepul.
- **Efek:** Gelembung naik. Warna cairan berubah sesuai Fase (biru, hijau, oranye, merah).

### 5.7 Panggung Kosmik
- **Latar Belakang:** Tirai beludru merah raksasa dengan lipatan-lipatan megah.
- **Meja:** Panggung kayu mengkilap, lampu sorot dari atas mengikuti bola.
- **Efek:** Sorot lampu berwarna emas dan ungu. Di kejauhan, siluet penonton (ribuan bayangan).

### 5.8 Kantor Manajer
- **Latar Belakang:** Putih bersih (`#FFFFFF`), dinding penuh dengan arsip dan memo.
- **Meja:** Meja kantor minimalis (putih/metal), sangat rapi.
- **Efek:** Detak jam besar di latar. Tidak ada partikel.

---

## 6. DESAIN KARAKTER & OBJEK

### 6.1 Paddle (Stick)
- **Dasar:** Persegi panjang 120x30px (skala bisa berubah karena efek), warna kayu.
- **Glarp (Sebelum Setia):** Stik es krim dengan coretan spidol "GLARP". Terkadang muncul ekspresi marah (mata dan mulut sederhana di atas stik).
- **Glarp (Setia):** Sama, tapi coretan spidol tetap, retakan emas di sisi kiri, ekspresi tenang.
- **Sendok Bengkok Legendaris:** Sendok perak dengan ukiran alien kuno. Sedikit bengkok di ujungnya.
- **Remote TV Rusak:** Remote TV jadul (hitam/abu-abu) dengan tombol-tombol warna-warni. Tombolnya kadang berkedip.
- **Ikan Beku:** Ikan (seperti nila) yang membeku dengan kristal es di sekelilingnya. Warna biru pucat transparan.
- **Tongkat Ajaib Manajer:** Tongkat kayu gelap dengan ornamen emas dan permata ungu menyala.

### 6.2 Bola (Bakso)
- **Dasar:** Lingkaran diameter 24px, warna coklat daging (`#8B5A2B`), tekstur sedikit berbintik.
- **Varian:**
  - **Bola Hantu:** Transparan (alpha 60%), warna ungu.
  - **Bola Magnetik:** Dikelilingi aura cyan.
  - **Bola Beku:** Dikelilingi kristal es.
  - **Bola Bermata:** Ada mata kartun yang berkedip.
  - **Bola Keju (Piknik):** Warna kuning dengan lubang-lubang.

### 6.3 Alien & Boss
- **Blip & Blop:** Dua lingkaran kecil (diameter ~30px). Blip kuning, Blop ungu. Mata besar. Mikrofon di atas kepala.
- **Pipo:** Action figure dari balok-balok kayu warna-warni yang disusun tinggi.
- **Nenek Lumi:** Lentera kertas silinder, bercahaya kuning redup, ada "mata" di dalamnya.
- **Kapten Keju:** Keju Swiss berlubang besar dengan kaki-kaki kecil. Berwarna hijau kebiruan (jamuran).
- **Overclock:** Robot humanoid dari Logam, dengan garis-garis neon cyan.
- **The Archivist:** Humanoid berjubah dengan topeng penuh kertas bertuliskan.
- **Manajer:** Siluet tinggi dengan satu mata bercahaya. Tidak pernah terlihat detailnya.

### 6.4 UI Elements
- **Tombol:** Persegi panjang dengan border hitam tebal (2px), warna isi krem (`#F5DEB3`) seperti kertas. Saat hover, border berwarna emas.
- **Mood Bar:** Bar horizontal dengan gradien dari merah (kiri) ke hijau (kanan). Label "PENONTON" di sampingnya.
- **Absurdity Meter:** Bar vertikal di kiri layar, dengan segmen-segmen bertuliskan D, C, B, A, S, SSS. Warna segmen berubah sesuai peringkat.
- **Notifikasi:** Teks besar di tengah layar, muncul dengan animasi scale up dan fade out.

---

## 7. EFEK VISUAL

### 7.1 Glitch
- **Offset RGB:** Geser channel Red dan Blue beberapa pixel ke kiri/kanan.
- **Korupsi Blok:** Kotak-kotak warna acak muncul di beberapa bagian layar.
- **Penggunaan:** Dimensi Retak, Crash Fusion, Error 404, saat Skor Kekonyolan naik peringkat ke S/SSS.

### 7.2 Partikel
- **Debu:** Titik-titik kecil putih/krem melayang pelan. (Default, Meja Kardus)
- **Confetti:** Potongan kertas warna-warni berjatuhan. (Fusi, Boss Kalah, Peringkat SSS)
- **Semut:** Titik-titik hitam kecil berjalan dalam barisan. (Piknik Chaos)
- **Gelembung:** Lingkaran transparan dengan highlight putih. (Kuali Ramuan)
- **Duri:** Segitiga kecil berwarna ungu. (Modifier Duri Kosmik)
- **Salju:** Titik putih kebiruan jatuh perlahan. (Ikan Beku)

### 7.3 Lighting & Bloom
- **Neon Glow:** Gunakan efek `bloom` (gaussian blur + additive blending) pada semua garis neon.
- **Sorot Lampu:** Polygon semi-transparan kuning/putih yang memancar dari atas. (Panggung Kosmik)
- **Bohlam:** Lingkaran kuning dengan blur, berayun.

---

## 8. UI STYLE & FONT

### 8.1 Font
- **Judul & Teks Besar (GONG, Boss, Notif):** **"Bebas Neue"** atau **"Impact"** — Tebal, kapital, dengan sedikit modifikasi (glitch, garis luar).
- **Teks UI (Menu, Deskripsi):** **"Courier Prime"** atau **"Special Elite"** — Monospace, terasa seperti diketik di mesin tik alien.
- **Dialog Karakter (Glarp, Boss):** **"Patrick Hand"** atau **"Indie Flower"** — Seperti tulisan tangan.

### 8.2 Layout HUD
- **Kiri Atas:** Skor Kekonyolan (ikon + teks), AP (ikon koin + teks).
- **Kanan Atas:** Poin Ketenaran (ikon bintang + teks).
- **Bawah Tengah:** Mood Bar (panjang 200px).
- **Kanan Bawah:** Timer Siksaan (lingkaran dengan countdown numerik di tengah).
- **Tengah Layar:** Notifikasi sementara.

### 8.3 Warna UI
- **Teks Normal:** Putih (`#FFFFFF`) dengan shadow hitam untuk keterbacaan.
- **Teks Peringatan:** Kuning (`#FFD700`) atau Merah (`#FF0000`).
- **Teks Skor:** Emas (`#FFD700`) saat peringkat tinggi.
- **Background UI:** Semi-transparan hitam (`rgba(0,0,0,0.6)`) dengan border kardus.

---

## 9. REFERENSI VISUAL

### 9.1 Game
- **WarioWare (seri):** Gaya animasi konyol, transisi cepat, dan karakter absurd.
- **The Stanley Parable (Ultra Deluxe):** Kontras antara realisme (kantor) dan surealisme (The Memory Zone).
- **KATAMARI Damacy:** Palet warna berani, bentuk sederhana, dan rasa "mainan".
- **Don't Starve:** Tekstur kertas dan coretan, karakter dengan siluet kuat.
- **Cuphead:** Estetika "found object" dan tekstur kuno (tapi kita lebih kotor).

### 9.2 Film & TV
- **The Muppet Show:** Teater, karakter aneh, dan estetika "buatan tangan" yang hangat.
- **Serial Wes Anderson:** Palet warna pastel simetris, tapi kita pakai palet neon/gelap.
- **Acara Gameshow 80-an:** Pencahayaan berlebihan, set murahan, dan grafik stasiun TV.

### 9.3 Seni & Fotografi
- **Kolase Terry Gilliam (Monty Python):** Potongan kertas, foto aneh, dan animasi cut-out.
- **Fotografi Produk "Murahan":** Foto dengan pencahayaan flat, background kardus, dan fokus yang sedikit meleset.

---

**Art Style Guide ini adalah palet dan kanvas dari The Cosmic Circus Loop.** Dengan panduan ini, setiap pixel akan berbicara dengan bahasa yang sama: absurd, megah, dan sepenuh hati. 🎪