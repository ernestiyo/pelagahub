import {
  Globe,
  MessageCircle,
  Camera,
  Users,
  TrendingUp,
  Clock,
  HeartHandshake,
  Coffee,
  type LucideIcon,
} from "lucide-react";

export interface FlipCardData {
  icon: LucideIcon;
  front: string;
  back: string;
}

export const flipCards: FlipCardData[] = [
  {
    icon: Globe,
    front: "Mengapa Digital?",
    back: "Karena pelanggan sekarang mencari produk melalui internet, bukan hanya dari mulut ke mulut.",
  },
  {
    icon: MessageCircle,
    front: "Mengapa WhatsApp?",
    back: "90% lebih mudah dihubungi pelanggan.",
  },
  {
    icon: Camera,
    front: "Mengapa Foto Produk Penting?",
    back: "Foto menarik meningkatkan kemungkinan pembelian.",
  },
];

export interface BenefitData {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const benefits: BenefitData[] = [
  {
    icon: Users,
    title: "Lebih Banyak Pelanggan",
    description: "Usaha lebih mudah ditemukan oleh warga maupun wisatawan.",
  },
  {
    icon: TrendingUp,
    title: "Potensi Penjualan Lebih Tinggi",
    description: "Promosi dapat menjangkau lebih banyak calon pembeli.",
  },
  {
    icon: Clock,
    title: "Hemat Waktu",
    description:
      "Pertanyaan pelanggan dapat dijawab lebih cepat menggunakan WhatsApp Business.",
  },
  {
    icon: HeartHandshake,
    title: "Membangun Kepercayaan",
    description:
      "Foto produk dan informasi usaha yang lengkap meningkatkan kepercayaan pelanggan.",
  },
];

export interface BeforeAfterRow {
  before: string;
  after: string;
}

export const beforeAfterRows: BeforeAfterRow[] = [
  {
    before: "Menunggu pelanggan datang",
    after: "Pelanggan dapat menemukan usaha melalui Google",
  },
  {
    before: "Promosi dari mulut ke mulut",
    after: "Promosi melalui WhatsApp & Instagram",
  },
  { before: "Pembayaran tunai", after: "Pembayaran tunai + QRIS" },
  { before: "Foto seadanya", after: "Foto produk yang lebih menarik" },
  {
    before: "Sulit dikenal wisatawan",
    after: "Lebih mudah ditemukan wisatawan",
  },
];

export interface StoryStep {
  label: string;
  text: string;
  image: string | null;
}

export interface StoryData {
  icon: LucideIcon;
  title: string;
  steps: StoryStep[];
}

export const successStories: StoryData[] = [
  {
    icon: Coffee,
    title: "Coffee Shop",
    steps: [
      {
        label: "Before",
        text: "Mengandalkan pelanggan sekitar.",
        image: "/hero/kiadan_coffee.jpg",
      },
      {
        label: "After",
        text: "Menggunakan Google Maps dan Instagram.",
        image: "/hero/kiadan_coffee.jpg",
      },
      {
        label: "Result",
        text: "Lebih mudah ditemukan wisatawan.",
        image: "/hero/kiadan_coffee.jpg",
      },
    ],
  },
];

export interface MythFactPair {
  myth: string;
  fact: string;
}

export const mythFactPairs: MythFactPair[] = [
  {
    myth: "Digital itu mahal.",
    fact: "Banyak platform dapat digunakan secara gratis.",
  },
  {
    myth: "Saya sudah terlalu tua.",
    fact: "Teknologi dasar seperti WhatsApp Business mudah dipelajari oleh siapa saja.",
  },
  {
    myth: "Harus punya laptop.",
    fact: "Sebagian besar fitur dapat digunakan langsung dari smartphone.",
  },
];

export const selfCheckItems: string[] = [
  "Saya memiliki WhatsApp",
  "Saya memiliki foto produk",
  "Pelanggan dapat menghubungi saya",
  "Saya menerima pembayaran digital",
  "Saya mempunyai media sosial",
];

export interface ScoreBand {
  min: number;
  max: number;
  label: string;
}

export const selfCheckBands: ScoreBand[] = [
  { min: 0, max: 2, label: "Masih banyak peluang berkembang." },
  { min: 3, max: 4, label: "Usaha Anda sudah mulai digital." },
  { min: 5, max: 5, label: "Luar biasa!" },
];

export const challengeItems: string[] = [
  "Simpan nomor usaha di WhatsApp Business",
  "Ambil foto produk terbaik",
  "Buat akun Instagram",
  "Cari lokasi usaha di Google Maps",
];

export const funFacts: string[] = [
  "Wisatawan sering mencari tempat makan melalui Google Maps sebelum datang.",
];
