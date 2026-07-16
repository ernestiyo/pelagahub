# PelagaHub — Learning Center untuk Digitalisasi UMKM Desa Pelaga

## 1. Ringkasan Proyek

PelagaHub adalah website Learning Center untuk membantu pelaku UMKM di Desa Pelaga belajar
digitalisasi usaha mereka secara mandiri, disusun seperti online course sederhana.
Ini adalah bagian dari program KKN. Portal direktori UMKM (marketplace/listing bisnis)
**TIDAK** termasuk dalam scope — fokus 100% ke Learning Center.

- **Target user (publik):** Pelaku UMKM / pemilik usaha di Desa Pelaga yang ingin belajar
  memanfaatkan teknologi digital. Asumsikan sebagian besar tidak terlalu familiar dengan
  web/teknologi — UI harus sederhana, jelas, tidak membingungkan.
- **Target user (admin):** 1 admin (tim KKN) yang menambahkan/mengedit modul dari waktu ke waktu.
- **Deadline:** Sistem (bukan semua konten) harus siap akhir pekan ini, sebelum penarikan KKN.
  Konten Modul 2–7 akan menyusul bertahap selama ~3 minggu ke depan lewat admin panel.
- **Domain rencana:** PelagaHub.com (belum di-setup, developer yang urus).

## 2. Prinsip Kerja & Scope Discipline

- **Sistem/infrastruktur harus solid duluan, konten menyusul.** Jangan hardcode konten modul
  langsung ke kode — semua modul harus bisa ditambah/diedit via admin panel tanpa deploy ulang kode.
- **JANGAN tambah fitur di luar scope** tanpa dikonfirmasi dulu, meskipun "kelihatan berguna".
  Contoh yang secara eksplisit TIDAK termasuk di versi ini: user login/akun untuk end-user,
  tracking progress belajar per user, sertifikat, portal direktori UMKM, multi-admin/role-based
  auth, halaman "Tentang Tim" (boleh ditambah belakangan, bukan prioritas).
- Kerjakan bertahap per fase (lihat bagian 7), jangan generate semua sekaligus.

## 3. Struktur Halaman

### A. Landing Page / Hero Section
- Banner besar dengan **efek parallax** (background scroll lebih lambat dari foreground).
- Konten background: foto suasana Pelaga, foto pemilik UMKM & produk/toko, dokumentasi survei
  tim KKN. (Aset foto sudah ada, akan disediakan terpisah — siapkan folder/slot untuk ini.)
- Headline: "Usaha Anda Sudah Bagus. Sekarang Saatnya Lebih Banyak Orang Menemukannya."
- Subtitle: "Pelajari cara sederhana memanfaatkan teknologi untuk mengembangkan usaha Anda."
- CTA button besar: "Mulai Belajar →" → mengarah ke halaman daftar modul.

### B. Halaman Daftar Modul (Learning Center)
- Grid/list semua modul yang tersedia (published), tampil seperti daftar course.
- Tiap card modul: judul, ringkasan singkat, mungkin ikon/gambar cover.
- Modul yang belum ada kontennya TIDAK ditampilkan ke publik (draft/unpublished, hanya
  terlihat di admin).

### C. Halaman Detail Modul (template dinamis, dipakai untuk semua modul)
Setiap modul mengikuti struktur konten yang **sama persis**:
1. Apa itu (What is it?)
2. Kenapa berguna (Why is it useful?)
3. Cara memulai — step by step (How to get started)
4. Tips
5. Kesalahan umum (Common mistakes)
6. Link berguna (Useful links) — opsional, boleh kosong

Build template ini generic/data-driven, karena akan dipakai berulang untuk 7 modul (dan
kemungkinan modul baru di masa depan lewat admin panel).

### D. Admin Panel (proper CMS, tapi tetap simpel)
- Login dengan 1 akun admin sederhana (username + password, disimpan sebagai environment
  variable, session via cookie — TIDAK perlu OAuth/NextAuth/Clerk atau sejenisnya).
- CRUD modul: tambah modul baru, edit modul existing, hapus modul, publish/unpublish (draft
  vs live).
- Form input mengikuti struktur 6 bagian di atas (poin C).
- Kemampuan upload gambar untuk cover modul & gambar di dalam step-by-step (nice-to-have,
  boleh fase belakangan kalau waktu mepet — textarea + gambar via URL cukup untuk versi awal).

## 4. Daftar Modul & Status Konten

| # | Modul | Topik | Status Konten |
|---|-------|-------|----------------|
| 1 | (Judul modul 1 — TBA dari tim konten) | — | ✅ Siap |
| 2 | WhatsApp Business | Installation, Business profile, Catalog, Quick replies, Greeting messages | ⏳ Menyusul |
| 3 | Google Business Profile | Registration, Maps, Photos, Reviews, Updating information | ⏳ Menyusul |
| 4 | Instagram Business | Profile setup, Bio, Highlights, Posting schedule, Reels | ⏳ Menyusul |
| 5 | Google Forms | Collecting orders, Customer feedback | ⏳ Menyusul |
| 6 | QRIS | What QRIS is, Benefits, How to apply, How customers pay | ⏳ Menyusul |
| 7 | AI for UMKM | What AI can do, Writing captions, Creating product descriptions, Brainstorming promotional ideas | ⏳ Menyusul |

Untuk development awal, gunakan Modul 1 sebagai data nyata untuk build & test template.
Modul 2–7 di-seed sebagai draft/placeholder yang bisa diisi tim konten lewat admin panel
selama 3 minggu ke depan.

## 5. Design System

- **Nuansa:** Platform belajar modern & generik — **bukan** tema "desa/pedesaan"
  (tidak perlu warna hijau-alam/earthy). Harus terasa seperti produk edtech yang rapi,
  approachable, dan mudah dipercaya.
- **Font:** Plus Jakarta Sans untuk heading dan body (bisa dikombinasi dengan Inter untuk body
  text jika ingin kontras heading/body, tapi Plus Jakarta Sans di semuanya juga valid).
- **Warna (usulan, generate 2-3 palet lalu screenshot untuk dipilih):**
  - Primary: Indigo/blue-violet (kesan trust, edukasi, modern — contoh referensi: Coursera,
    Duolingo-style tapi lebih ke arah biru/indigo daripada hijau)
  - Accent/CTA: warna hangat (amber/orange) untuk tombol utama supaya kontras dan jelas actionable
  - Neutral: slate/gray untuk teks & background, putih/abu sangat muda untuk base background
- **Komponen:** rounded corners, spacing lega, card-based layout untuk daftar modul, jangan
  terlalu padat karena target user awam teknologi.
- Logo: belum ada. Untuk sementara pakai wordmark teks "PelagaHub" dengan styling font tebal;
  logo custom bisa menyusul, jangan blocking development.

## 6. Tech Stack

- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS
- **Database:** Postgres (kalau deploy ke Vercel/serverless) via Prisma ORM — atau SQLite lokal
  untuk development awal lalu migrasi. Turso/Neon cocok untuk free-tier hosting Postgres/SQLite.
- **Auth admin:** custom sederhana (password di env var + signed cookie session), tanpa provider
  auth pihak ketiga.
- **Deploy:** Vercel (gratis, cocok untuk Next.js, mudah connect custom domain PelagaHub.com nanti).
- **Image handling:** mulai dengan input URL gambar / upload sederhana ke storage (misal
  Vercel Blob atau Cloudinary free tier) — jangan overengineer di awal.

## 7. Rencana Fase Development

1. **Fase 1 — Setup & Design System:** scaffold Next.js + Tailwind, setup font, buat palet
   warna & komponen dasar (button, card, container). Review sebelum lanjut.
2. **Fase 2 — Landing Page:** hero section dengan parallax effect, headline, CTA. Gunakan
   placeholder image dulu jika aset belum di-drop ke folder assets.
3. **Fase 3 — Learning Center & Template Modul:** halaman daftar modul + halaman detail modul
   (template dinamis, data-driven dari struktur 6 bagian), test pakai konten Modul 1.
4. **Fase 4 — Database & Data Model:** setup Prisma schema untuk Module (title, summary, 6
   content fields, status: draft/published, cover image, timestamps).
5. **Fase 5 — Admin Panel:** halaman login, dashboard list modul, form create/edit modul,
   publish/unpublish, delete.
6. **Fase 6 — Polish & Deploy:** responsive check (banyak UMKM kemungkinan akses via HP),
   testing end-to-end, deploy ke Vercel, connect domain saat sudah siap.

## 8. Catatan Tambahan
- Prioritaskan mobile-responsive — banyak target user kemungkinan mengakses lewat HP.
- Bahasa antarmuka: Bahasa Indonesia.
- Karena timeline sangat ketat, minta Claude Code untuk selalu run/test kode setelah tiap
  fase, bukan hanya generate lalu lanjut ke fase berikutnya.