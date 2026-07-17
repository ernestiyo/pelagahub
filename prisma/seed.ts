import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const modules = [
  {
    slug: "mengenal-dunia-digital",
    order: 1,
    title: "Mengenal Dunia Digital untuk Usaha Anda",
    summary:
      "Kenapa digitalisasi penting untuk usaha Anda, dan langkah pertama yang bisa langsung dicoba hari ini.",
    status: "published",
    // Konten modul ini unik/interaktif, dikelola langsung di
    // src/app/modul/mengenal-dunia-digital/page.tsx dan src/lib/modul1-content.ts,
    // bukan lewat kolom ModuleContent generik di bawah.
  },
  {
    slug: "whatsapp-business",
    order: 2,
    title: "WhatsApp Business",
    summary:
      "Instalasi, profil bisnis, katalog produk, balasan cepat, dan pesan sambutan otomatis.",
    status: "draft",
  },
  {
    slug: "google-business-profile",
    order: 3,
    title: "Google Business Profile",
    summary:
      "Pendaftaran, tampil di Google Maps, foto, ulasan, dan update informasi toko.",
    status: "draft",
  },
  {
    slug: "instagram-business",
    order: 4,
    title: "Instagram Business",
    summary: "Setup profil, bio, highlight, jadwal posting, dan reels.",
    status: "draft",
  },
  {
    slug: "google-forms",
    order: 5,
    title: "Google Forms",
    summary: "Menerima pesanan dan masukan pelanggan lewat formulir online.",
    status: "draft",
  },
  {
    slug: "qris",
    order: 6,
    title: "QRIS",
    summary: "Apa itu QRIS, manfaatnya, cara daftar, dan cara pelanggan membayar.",
    status: "draft",
  },
  {
    slug: "ai-untuk-umkm",
    order: 7,
    title: "AI untuk UMKM",
    summary:
      "Apa yang bisa dibantu AI: menulis caption, deskripsi produk, dan ide promosi.",
    status: "draft",
  },
];

async function main() {
  for (const mod of modules) {
    await prisma.module.upsert({
      where: { slug: mod.slug },
      update: {
        order: mod.order,
        title: mod.title,
        summary: mod.summary,
        status: mod.status,
      },
      create: mod,
    });
  }
  console.log(`Seeded ${modules.length} modules.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
