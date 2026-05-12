# Cosmic Circus Loop Audio Manifest

Struktur ini mengikuti `Music & SFX Rule.md` untuk versi browser:

- `music/`: trek loop musik per arena/horizon/entropi.
- `sfx/`: one-shot gameplay, UI, power-up, fusi, GONG, dan kartu.
- `ambience/`: ambience loop per arena.

Implementasi di `index.html` memakai bus logis:

- `critical`: P1, tanpa voice limit untuk pantulan, GONG, timer, fusi.
- `feedback`: P2, voice limit 8 dan UI cooldown 50 ms.
- `entertainment`: P4, voice limit 6.
- `ambience`: P5, voice limit 4.

Catatan teknis:

- Browser build memakai MP3/WAV yang sudah tersedia. OGG/WAV 48 kHz 24-bit tetap menjadi target produksi akhir.
- Mix browser dibuat konservatif agar tidak melelahkan: musik rendah, ambience sangat pelan, SFX pendek dipotong otomatis dengan fade release.
- Variasi mikro dibuat melalui kombinasi variasi file yang tersedia, pitch random +/-2 semitone, random panning mikro, cooldown anti-spam, dan random tanpa ulangan.
- Musik adaptif memakai horizon yang tersedia dan crossfade bertahap. Saat aset horizon/entropi lengkap tersedia, cukup tambahkan file ke `MUSIC_LIBRARY` di `index.html`.
