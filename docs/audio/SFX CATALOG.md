Berikut adalah **SFX Catalog** lengkap untuk *The Cosmic Circus Loop*. Dokumen ini berisi setiap dentuman, ketukan, bisikan, dan bunyi absurd yang akan menghidupkan sirkus gilamu.

---

# 🔊 THE COSMIC CIRCUS LOOP — SFX CATALOG v1.0

**Dokumen:** Daftar Lengkap Sound Effects  
**Keterkaitan:** Audio Bible, GDD, Dialogue Script  
**Target:** Sound Designer, Komposer, Developer

---

## DAFTAR ISI
1. [Pantulan Bola](#1-pantulan-bola)
2. [GONG & Transisi](#2-gong--transisi)
3. [Siksaan (Torments)](#3-siksaan-torments)
4. [Mikro-Twist](#4-mikro-twist)
5. [Plot Twist](#5-plot-twist)
6. [Boss (21 Mini Boss + Final)](#6-boss-21-mini-boss--final)
7. [Power-Up & Fusi](#7-power-up--fusi)
8. [UI & Notifikasi](#8-ui--notifikasi)
9. [Lingkungan & Ambience](#9-lingkungan--ambience)
10. [Kematian & Akhir Run](#10-kematian--akhir-run)
11. [Stick & Kepribadian](#11-stick--kepribadian)

---

## 1. PANTULAN BOLA

| ID | Nama | Deskripsi | Vibe | Jumlah Variasi | Prioritas |
|----|------|-----------|------|----------------|-----------|
| SFX_BALL_NORMAL | Pantulan Normal | Ketukan kayu ringan seperti stik es krim memukul bakso. Ada resonansi pendek "tuk" yang hangat. | Kayu, akrab, memuaskan. | 4 | KRITIS |
| SFX_BALL_GLUE | Pantulan Glue | Seperti "tuk" normal tapi dengan tarikan lengket. Ada suara "tchhh" seperti velcro atau slime yang diregangkan. | Lengket, sedikit menjijikkan, lucu. | 2 | KRITIS |
| SFX_BALL_MAGNET | Pantulan Magnet | Dengung listrik pendek "bzzzt" diikuti "tuk" yang lebih dalam. Ada kilatan energi. | Teknologi murahan, mainan magnet. | 2 | KRITIS |
| SFX_BALL_CLOSE | Pantulan Nyaris | "Tuk" yang lebih tipis, nyaris seperti "tik", diikuti oleh glissando naik pendek sebagai penekanan. | Ketegangan, lega, dramatis. | 1 | TINGGI |
| SFX_BALL_FROST | Pantulan Beku | Seperti "tuk" normal, tapi dingin. Ada suara es retak halus. | Dingin, rapuh. | 2 | SEDANG |
| SFX_BALL_PORTAL | Pantulan Portal | Bola masuk portal: suara "whoosh" lembut. Bola keluar: suara yang sama, dibalik. | Misterius, dimensi lain. | 1 | SEDANG |
| SFX_BALL_DEAD | Bola Mati | Suara "bloop" seperti benda jatuh ke air, atau "pssshh" seperti udara keluar. Juga bisa suara kardus remuk. | Gagal, lucu, tidak menyakitkan. | 3 | KRITIS |
| SFX_BALL_SPAWN | Bola Muncul | Suara "pop" kecil, seperti gelembung meletus atau bakso dijatuhkan ke meja. | Ringan, bersih. | 1 | RENDAH |

---

## 2. GONG & TRANSISI

| ID | Nama | Deskripsi | Vibe | Jumlah Variasi | Prioritas |
|----|------|-----------|------|----------------|-----------|
| SFX_GONG_PHASE | GONG Transisi Fase | Dentuman logam tebal dan berat. Bukan gong tradisional—lebih seperti campuran gong, resonansi kardus, dan dengung kosmik. Ada "hum" panjang setelahnya. | Sakral, mengancam, penting. | 2 (satu lebih rendah, satu lebih tinggi) | KRITIS |
| SFX_GONG_FUSION | GONG Fusi | Seperti GONG Phase, tapi ditambah shimmer (nada tinggi berkilau). Untuk Fusi Lv1 dan Lv2. | Ajaib, mendebarkan, kejutan menyenangkan. | 1 | KRITIS |
| SFX_GONG_BOSS | GONG Boss | Paling berat. Sub-bass yang menggetarkan, dentuman yang terasa di dada. Ada hentakan pertama, lalu gema panjang. | Epik, pertempuran dimulai. | 1 | KRITIS |
| SFX_GONG_SKIP | GONG Skip | Versi mini dari GONG. Pendek, seperti "tung!" kecil, lalu segera hilang. Menandakan pemain memilih Skip Shop. | Cepat, agresif, tidak sabar. | 1 | SEDANG |
| SFX_GONG_ILLEGAL | GONG Kartu Ilegal | GONG yang dipitch-shift naik perlahan, diikuti oleh bisikan "ilegal..." | Misterius, langka, berbahaya. | 1 | TINGGI |

---

## 3. SIKSAAN (TORMENTS)

| ID | Nama Siksaan | Deskripsi SFX | Vibe | Prioritas |
|----|--------------|---------------|------|-----------|
| SFX_TOR_LICIN | Paddle Licin | Suara gesekan di atas es atau lantai licin. "Ssssshhhhh" pendek yang muncul tiap kali paddle mencoba bergerak. | Frustrasi ringan, licin, tidak nyaman. | TINGGI |
| SFX_TOR_KECIL | Bola Ciut | Pitch shift naik pada pantulan. Bola kecil menghasilkan "tik" yang lebih tinggi. | Imut, aneh, menggemaskan. | SEDANG |
| SFX_TOR_GOYANG | Layar Mabuk | Suara "wobble" atau tape warble. Seperti rekaman kaset yang rusak. | Pusing, tidak stabil. | SEDANG |
| SFX_TOR_BENTUK | Bola Cacat | Dua suara pantulan berbeda dimainkan bersamaan, sedikit out-of-sync. | Janggal, rusak. | RENDAH |
| SFX_TOR_DISKO | Disko Alien | Musik disko pendek (loop 2 detik) dengan filter high-pass. Seperti mendengar disko dari ruangan sebelah. | Konyol, energetik, aneh. | TINGGI |
| SFX_TOR_SUARA | Audio Rusak | Semua SFX lain di-pitch acak, bitcrushed, atau diganti suara synthesizer (sawtooth). | Chaos total, frustrasi, lucu. | TINGGI |
| SFX_TOR_LENSA | Mata Pengawas | Suara shutter kamera "clik!" dan suara lensa yang fokus "bzzz". | Diawasi, paranoid. | SEDANG |
| SFX_TOR_INVERT | Input Terbalik | Suara "error" pendek + suara panik (seperti "wup!"). | Bingung, panik. | TINGGI |
| SFX_TOR_LUBANG | Lubang Hitam | Suara hisap (whoosh) rendah saat bola mendekati lubang. | Misterius, sedikit menakutkan. | SEDANG |
| SFX_TOR_PAD_KECIL | Paddle Ciut | Suara kayu yang "ciut" seperti ditekan. | Lemah, rentan. | RENDAH |
| SFX_TOR_BOLA_DUA | Bola Ganda | Suara "poof!" kecil saat bola kedua muncul. | Kejutan, "oh tidak!". | SEDANG |
| SFX_TOR_HUJAN | Hujan Bakso | Suara tetesan hujan, tapi lebih padat dan sedikit "daging". "Pluk-pluk-pluk-pluk". | Kacau, lucu, absurd. | TINGGI |
| SFX_TOR_GRAV | Gravitasi Miring | Suara "whoosh" konstan dari satu sisi. Seperti angin yang bertiup dari kiri atau kanan. | Tidak seimbang, dunia miring. | SEDANG |
| SFX_TOR_ZOOM | Zoom Panik | Suara "wup-wup-wup!" saat zoom in/out. Bisa juga suara kamera yang bergerak cepat. | Panik, membingungkan. | TINGGI |
| SFX_TOR_NEGATIF | Warna Negatif | Static noise pendek, lalu semua suara sedikit terdistorsi. | Aneh, "ada yang salah". | RENDAH |
| SFX_TOR_EJEKAN | Ejekan Alien | Suara ketawa sintetis (seperti tawa terbalik), suara bebek, atau suara "womp womp". | Mengejek, lucu, memalukan. | TINGGI |
| SFX_TOR_KURSOR | Kursor Jahil | Suara klik mouse, tapi dengan delay acak. Click... (jeda) ...click! | Membingungkan, "siapa yang ngelik?". | SEDANG |
| SFX_TOR_PATAH | Paddle Patah | Suara kayu patah yang jelas: "KRAK!" | Brutal, final, "aduh!". | TINGGI |
| SFX_TOR_BELAH | Mutasi Bola | Setiap kali bola membelah: "pop!" + suara lendir "slurp". | Menjijikkan, kacau. | SEDANG |
| SFX_TOR_BERAT | Daya Tarik Maut | Suara "whoom" berat, seperti gravitasi yang menarik. Sub-bass. | Berat, tertarik ke bawah. | SEDANG |
| SFX_TOR_PARTIKEL | Badai Kosmik | Angin kencang + suara partikel berisik (seperti pasir atau debu). | Kacau, penuh, membutakan. | TINGGI |
| SFX_TOR_ACAK | Kontrol Acak | Suara "static" pendek setiap kali kontrol diacak. | Frustrasi, tidak bisa diandalkan. | SEDANG |
| SFX_TOR_BUTA | Lensa Buta | Suara "whoosh" gelap saat overlay gelap muncul. | Menutupi, misterius. | SEDANG |
| SFX_TOR_ARENA | Penonton Turun ke Arena | Megamix semua suara: histeria penonton, dentuman, suara bebek, alarm. | Kiamat, klimaks, histeria. | KRITIS |
| SFX_TOR_WARNING | Peringatan Siksaan | Suara "deng-deng!": dua ketukan pendek. Atau suara alarm kecil. | Antisipasi, "siap-siap!". | TINGGI |

---

## 4. MIKRO-TWIST

| ID | Nama Mikro-Twist | Deskripsi SFX | Vibe | Prioritas |
|----|------------------|---------------|------|-----------|
| SFX_MT_SHAKE | Paddle Gemetar | Suara getaran kayu halus: "grrrrr" pendek. | Gelisah, tidak stabil. | SEDANG |
| SFX_MT_COLOR | Bola Berubah Warna | Suara "blip" kecil dengan nada naik. | Ringan, ajaib. | RENDAH |
| SFX_MT_TILT | Layar Miring | Suara "whoosh" miring. Seperti gravitasi sedikit berubah. | Pusing, dunia bergeser. | SEDANG |
| SFX_MT_KWEK | Suara Bebek | "KWEK!"—suara bebek mainan yang jelas. | Lucu, absurd, kaget. | TINGGI |
| SFX_MT_ZOOM | Zoom Kecil | Suara "zoom" pendek, seperti kamera. | Dekat, personal. | RENDAH |
| SFX_MT_DUST | Partikel Debu | Suara "puff" kecil, seperti debu yang beterbangan. | Bersih, ringan. | RENDAH |

---

## 5. PLOT TWIST

| ID | Nama Plot Twist | Deskripsi SFX | Vibe | Prioritas |
|----|-----------------|---------------|------|-----------|
| SFX_TW_MOUSE | Mouse Ping Pong | Suara klik mouse keras. Kemudian suara paddle diganti suara "swoosh" mouse. | Digital, aneh, "apa yang terjadi?". | TINGGI |
| SFX_TW_ALIEN | Revolusi Penonton | Suara langkah kaki alien kecil (plak-plak-plak). Teriakan kecil. | Ramai, kacau, invasi mini. | TINGGI |
| SFX_TW_REVERSE | Hari Kebalikan | Semua suara diputar mundur selama 0.5 detik, lalu kembali normal. | Membingungkan, dunia terbalik. | SEDANG |
| SFX_TW_SWAP | Jiwa Tertukar | Suara "swap!" dengan efek flanger. Paddle sekarang bersuara bola, bola bersuara paddle. | Chaos total, lucu. | TINGGI |

---

## 6. BOSS (21 MINI BOSS + FINAL)

### 6.1 Boss Umum
| ID | Nama | Deskripsi | Prioritas |
|----|------|-----------|-----------|
| SFX_BOSS_APPEAR | Boss Muncul | Sting pendek yang sesuai dengan tema Arena. Ada gema. | KRITIS |
| SFX_BOSS_DEFEAT | Boss Kalah | Suara ledakan kecil atau "puff" besar + suara kemenangan pendek. | KRITIS |
| SFX_BOSS_HIT | Boss Terkena | Suara "thud" yang lebih berat dari pantulan normal. Boss "kesakitan". | TINGGI |
| SFX_BOSS_ATTACK | Boss Menyerang (Generic) | Suara "whoosh" besar atau dentuman. | TINGGI |

### 6.2 Boss Spesifik
| Boss | SFX Serangan Unik | Deskripsi |
|------|-------------------|-----------|
| Nenek Lumi | SFX_BOSS_LUMI_TEAR | Tetesan air besar: "pluk!" dengan reverb. |
| Pipo | SFX_BOSS_PIPO_BLOCK | Balok jatuh: "tuk-tuk!" kayu. |
| Kapten Keju | SFX_BOSS_KEJU_ANT | Suara semut berbaris: "krik-krik-krik" kecil. |
| Overclock | SFX_BOSS_OVER_OVERDRIVE | Mesin meraung: "vrooom!" dengan pitch naik. |
| DJ Synth | SFX_BOSS_DJ_BASS | Bass drop: "wub-wub-wub!" |
| Neon Phantom | SFX_BOSS_PHANTOM_GLITCH | Suara glitch saat phantom berpindah. |
| Echo | SFX_BOSS_ECHO_FRAGMENT | Suara pecahan kaca/kristal: "kling!" berlapis. |
| Error 404 | SFX_BOSS_404_BEAM | Sinar laser: "pssshhhh" dengan noise digital. |
| The Archivist | SFX_BOSS_ARCHIVE_PAGE | Suara halaman buku dibalik: "shhh-whp". |
| The Whisperer | SFX_BOSS_WHISPERER | Bisikan multi-layer: "ssshhhh... ssshhhh..." |
| Deep One | SFX_BOSS_DEEP_TENTACLE | Tentakel basah: "slurp-slap!" |
| The Unseeing Eye | SFX_BOSS_EYE_GAZE | Suara denyut mata: "wub... wub... wub..." |
| Chef Ragu | SFX_BOSS_CHEF_THROW | Suara bahan makanan dilempar: "splat!" |
| The Taster | SFX_BOSS_TASTER_LICK | Suara lidah menjilat: "slurp!" |
| Ramuan Hidup | SFX_BOSS_OOZE_BUBBLE | Gelembung besar meletus: "blub... POP!" |
| Prima Donna | SFX_BOSS_DIVA_ARIA | Suara opera pendek yang pecah: nada tinggi lalu "krak!" |
| The Critic | SFX_BOSS_CRITIC_SCORE | Suara cap: "STAMP!" dengan efek gema. |
| The Understudy | SFX_BOSS_UNDER_MIMIC | Suara peniruan: versi sedikit lebih rendah dari SFX asli. |
| Sekretaris | SFX_BOSS_SEC_MEMO | Suara stempel: "cap!" dan kertas disobek. |
| Auditor | SFX_BOSS_AUDIT_FINE | Suara mesin hitung: "cha-ching!" terbalik—"gnihc-ahc!". |
| Penasihat | SFX_BOSS_ADVISOR_CHOICE | Suara lonceng kecil: "ding!" untuk pilihan. |
| Manajer (Final) | SFX_BOSS_MANAGER_ALL | **Semua suara Boss diputar acak.** Menandakan ia menguasai semua. | KRITIS |

---

## 7. POWER-UP & FUSI

| ID | Nama | Deskripsi | Vibe | Prioritas |
|----|------|-----------|------|-----------|
| SFX_SHOP_BUY | Beli Power-Up | Suara koin, tapi lebih "kardus" atau "mainan". Bisa juga suara "cha-ching!" yang sedikit pecah. | Transaksi, memuaskan. | KRITIS |
| SFX_SHOP_SELL | Jual/Ganti Power-Up | Suara barang dijatuhkan ke kotak: "thud" kecil. | Melepas, sedikit enggan. | SEDANG |
| SFX_SHOP_OPEN | Shop Muncul | Suara tirai dibuka: "whoosh" atau suara register mesin kasir. | Kesempatan, "waktunya belanja!". | TINGGI |
| SFX_FUSION_LV1 | Fusi Level 1 | Sting emas: nada naik yang bersih, dengan shimmer. | Ajaib, penemuan, "HADIAH!". | KRITIS |
| SFX_FUSION_LV2 | Fusi Level 2 | Sting pelangi: chord mayor dengan reverb besar, lebih megah dari Lv1. | Legendaris, langka, euforia. | KRITIS |
| SFX_FUSION_LV3 | Fusi Level 3 | Sting chaos: orkestra pendek yang disonan, diikuti dengung bass panjang. | Terlarang, dahsyat, "apa yang telah kulakukan?!". | KRITIS |
| SFX_FUSION_SPOOF | Spoof Fusion | Suara "womp-womp" atau "fail" lucu. | Gagal, tapi lucu. | TINGGI |
| SFX_FUSION_CRASH | Crash Fusion | Suara benturan: "BRAK!" + efek glitch. | Tidak terduga, chaos liar. | TINGGI |
| SFX_POWERUP_ACTIVATE | Power-Up Diaktifkan | Suara "bling!" kecil saat efek mulai. | Informasi, "aktif!". | SEDANG |
| SFX_CURSED_REVEAL | Curse Terungkap | Suara "dun-dun-duuuun" (nada turun). | "Ups...". | TINGGI |

---

## 8. UI & NOTIFIKASI

| ID | Nama | Deskripsi | Vibe | Prioritas |
|----|------|-----------|------|-----------|
| SFX_UI_HOVER | Kursor Melintas | Suara "tik" kecil, seperti ketukan pada kayu. | Responsif, ringan. | RENDAH |
| SFX_UI_CLICK | Klik Tombol | Suara "klik" atau "tek". Juga suara tombol remote. | Konfirmasi, "aku memilih ini". | TINGGI |
| SFX_UI_CLOSE_CALL | Notif "NYARIS!" | Sting pendek naik, pitch tinggi. Ada ketegangan dan lega. | Bangga, "hampir saja!". | KRITIS |
| SFX_UI_COMBO | Notif Kombo | "NYARIS!" yang lebih keras, dengan lapisan suara tambahan tiap kombo. | "Aku jago!". | TINGGI |
| SFX_UI_MOOD_LOW | Mood Penonton Rendah | Suara "boo" atau geraman rendah. | Kecewa, marah. | TINGGI |
| SFX_UI_MOOD_HIGH | Mood Penonton Tinggi | Suara sorakan atau tepuk tangan. | Puas, terhibur. | TINGGI |
| SFX_UI_TIMER_WARN | Timer Siksaan Hampir Habis | Suara detak jantung: "dup-dup-dup" semakin cepat. | Antisipasi, panik. | TINGGI |
| SFX_UI_LEVELUP | Level Up (Mikro) | Suara "ding!" kecil dengan nada naik. | Progresi, "semakin kuat!". | SEDANG |
| SFX_UI_CONTRACT | Kontrak Ditandatangani | Suara pena di atas kertas: "scratch!" + suara stempel. | Kesepakatan, risiko. | SEDANG |
| SFX_UI_FAME | Poin Ketenaran | Suara "cha-ching!" yang bersih dan memuaskan. | Kaya, dihargai. | TINGGI |
| SFX_UI_RANKUP | Peringkat Naik (D→C, dll.) | Sting pendek yang semakin megah sesuai peringkat. | Prestasi, "aku naik level!". | TINGGI |
| SFX_UI_MASTERY | Mastery Level Up | Suara orkestra kecil: "da-da-da-daaa!" | Pencapaian permanen. | TINGGI |

---

## 9. LINGKUNGAN & AMBIENCE

| ID | Arena | Deskripsi Ambience | Prioritas |
|----|-------|--------------------|-----------|
| SFX_AMB_DEFAULT | Meja Kardus Kosong | Dengung lampu neon, ketukan logam jauh, reverb besar. Sepi. | TINGGI |
| SFX_AMB_PIKNIK | Piknik Chaos | Suara semut berbaris (krik-krik), angin sepoi, dan sesekali suara tawa alien jauh. | TINGGI |
| SFX_AMB_NEON | Grid Neon Retrowave | Suara mesin, dengung listrik, dan ketukan bass synth jauh. | TINGGI |
| SFX_AMB_RETAK | Dimensi Retak | Noise statis, glitch, dan suara seperti data yang rusak. | TINGGI |
| SFX_AMB_LOVECRAFT | Lembah Lovecraft | Bisikan pelan, suara air menetes, dan dengung organ rendah. | TINGGI |
| SFX_AMB_KUALI | Kuali Ramuan | Gelembung, suara api kecil, dan denting sendok. | TINGGI |
| SFX_AMB_PANGGUNG | Panggung Kosmik | Suara penonton besar (jauh), kadang tepuk tangan. Hening yang megah. | TINGGI |
| SFX_AMB_KANTOR | Kantor Manajer | Suara jam besar, ketukan mesin tik, dan dengung rendah. | TINGGI |

---

## 10. KEMATIAN & AKHIR RUN

| ID | Nama | Deskripsi | Vibe | Prioritas |
|----|------|-----------|------|-----------|
| SFX_DEATH_BALL | Bola Mati (sebelum respawn) | Lihat SFX_BALL_DEAD. | - | - |
| SFX_DEATH_RESPAWN | Respawn (Nyawa) | Suara "whoosh" ke atas, bola muncul kembali. | Harapan, "aku masih hidup!". | TINGGI |
| SFX_DEATH_OFFER | Tawaran Manajer Muncul | Suara pintu berat terbuka: "kreeeeek...". | Penting, keputusan besar. | TINGGI |
| SFX_DEATH_ACCEPT | Tawaran Diterima | Suara kontrak disobek, atau suara benda diambil. | Pengorbanan, "aku terima.". | SEDANG |
| SFX_DEATH_REFUSE | Tawaran Ditolak | Suara pintu tertutup: "BAM!". | Final, "tidak!". | SEDANG |
| SFX_ROULETTE_SPIN | Roulette Berputar | Suara roda berputar: "tick-tick-tick-tick..." semakin cepat. | Antisipasi nasib. | KRITIS |
| SFX_ROULETTE_RESULT | Roulette Berhenti | Suara "ting!" atau "buzz!" tergantung hasil. | Nasib ditentukan. | KRITIS |
| SFX_REPORT | Laporan Penonton | Suara kertas atau layar muncul. Bisa juga suara applause jika Fame besar. | Akhir, refleksi. | TINGGI |

---

## 11. STICK & KEPRIBADIAN

| ID | Stick | Deskripsi SFX Khas | Prioritas |
|----|-------|--------------------|-----------|
| SFX_STICK_DEFAULT | Stik Es Krim Polos | Tidak ada suara khusus. Hanya pantulan normal. | RENDAH |
| SFX_STICK_GLARP_REBEL | Glarp Membangkang | Suara "ngik!" atau "wrrry!" kecil saat paddle bergerak sendiri. | TINGGI |
| SFX_STICK_GLARP_LOYAL | Glarp Berbisik | Tidak ada SFX—hanya dialog. | TINGGI |
| SFX_STICK_SENDOK | Sendok Bengkok | Pantulan menghasilkan "ding!" halus seperti sendok mengenai gelas. | SEDANG |
| SFX_STICK_REMOTE | Remote TV | Saat ganti bentuk: suara klik remote + suara statis pendek. | TINGGI |
| SFX_STICK_IKAN | Ikan Beku | Pantulan menghasilkan suara es retak: "kriuk". | SEDANG |
| SFX_STICK_TONGKAT | Tongkat Manajer | Pantulan menghasilkan suara "whoom" kecil (berwibawa). | SEDANG |

---

**Katalog ini berisi setiap bunyi yang akan menghidupkan The Cosmic Circus Loop.** Dengan ini, sound designer memiliki peta lengkap untuk menciptakan dunia sonik yang absurd, megah, dan tak terlupakan. 🎪