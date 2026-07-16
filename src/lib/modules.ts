export type ModuleStatus = "draft" | "published";

export interface ModuleStep {
  title: string;
  description: string;
}

export interface ModuleLink {
  label: string;
  url: string;
}

export interface ModuleContent {
  whatIsIt: string;
  whyUseful: string;
  steps: ModuleStep[];
  tips: string[];
  commonMistakes: string[];
  usefulLinks: ModuleLink[];
}

export interface LearningModule {
  slug: string;
  order: number;
  title: string;
  summary: string;
  status: ModuleStatus;
  content: ModuleContent;
}

const emptyContent: ModuleContent = {
  whatIsIt: "",
  whyUseful: "",
  steps: [],
  tips: [],
  commonMistakes: [],
  usefulLinks: [],
};

// Modul dengan halaman detail custom (bukan lewat template generik 6-bagian
// di /modul/[slug]) — punya route statis sendiri yang override [slug].
export const CUSTOM_MODULE_SLUGS = ["mengenal-dunia-digital"];

// Data sementara untuk build & test template (Fase 3). Akan digantikan
// query database lewat Prisma di Fase 4, lalu diedit dari admin panel di Fase 5.
export const MODULES: LearningModule[] = [
  {
    slug: "mengenal-dunia-digital",
    order: 1,
    title: "Mengenal Dunia Digital untuk Usaha Anda",
    summary:
      "Kenapa digitalisasi penting untuk usaha Anda, dan langkah pertama yang bisa langsung dicoba hari ini.",
    status: "published",
    // Konten modul ini unik/interaktif, dikelola langsung di
    // src/app/modul/mengenal-dunia-digital/page.tsx dan src/lib/modul1-content.ts,
    // bukan lewat struktur ModuleContent generik.
    content: emptyContent,
  },
  {
    slug: "whatsapp-business",
    order: 2,
    title: "WhatsApp Business",
    summary:
      "Instalasi, profil bisnis, katalog produk, balasan cepat, dan pesan sambutan otomatis.",
    status: "draft",
    content: emptyContent,
  },
  {
    slug: "google-business-profile",
    order: 3,
    title: "Google Business Profile",
    summary: "Pendaftaran, tampil di Google Maps, foto, ulasan, dan update informasi toko.",
    status: "draft",
    content: emptyContent,
  },
  {
    slug: "instagram-business",
    order: 4,
    title: "Instagram Business",
    summary: "Setup profil, bio, highlight, jadwal posting, dan reels.",
    status: "draft",
    content: emptyContent,
  },
  {
    slug: "google-forms",
    order: 5,
    title: "Google Forms",
    summary: "Menerima pesanan dan masukan pelanggan lewat formulir online.",
    status: "draft",
    content: emptyContent,
  },
  {
    slug: "qris",
    order: 6,
    title: "QRIS",
    summary: "Apa itu QRIS, manfaatnya, cara daftar, dan cara pelanggan membayar.",
    status: "draft",
    content: emptyContent,
  },
  {
    slug: "ai-untuk-umkm",
    order: 7,
    title: "AI untuk UMKM",
    summary:
      "Apa yang bisa dibantu AI: menulis caption, deskripsi produk, dan ide promosi.",
    status: "draft",
    content: emptyContent,
  },
];

export function getPublishedModules(): LearningModule[] {
  return MODULES.filter((mod) => mod.status === "published").sort(
    (a, b) => a.order - b.order
  );
}

export function getModuleBySlug(slug: string): LearningModule | undefined {
  return MODULES.find((mod) => mod.slug === slug);
}
