import { prisma } from "@/lib/prisma";
import type { Module as ModuleRow } from "@prisma/client";

export type ModuleStatus = "draft" | "published";

export interface ModuleStep {
  instruction: string;
  tip: string;
  image: string | null;
}

export interface ModuleMistake {
  mistake: string;
  consequence: string;
  fix: string;
}

// Tiap lesson membawa strukturnya sendiri (Apa Itu?, Tutorial, Contoh
// Nyata, Tips, Kesalahan yang Sering Terjadi) sesuai Module Guidelines —
// bukan section terpisah di level modul.
export interface ModuleLesson {
  title: string;
  whatIsIt: string;
  analogy: string;
  steps: ModuleStep[];
  example: string;
  tip: string;
  mistakes: ModuleMistake[];
}

export interface StoryLine {
  speaker: string;
  message: string;
}

export interface BenefitCard {
  title: string;
  description: string;
}

export interface ModuleContent {
  estimatedTime: string;
  learningObjectives: string[];
  openingStory: StoryLine[];
  benefits: BenefitCard[];
  lessons: ModuleLesson[];
  miniChallenge: string[];
}

export interface LearningModule {
  slug: string;
  order: number;
  title: string;
  summary: string;
  status: ModuleStatus;
  coverImage: string | null;
  content: ModuleContent;
}

// Modul dengan halaman detail custom (bukan lewat template generik di
// /modul/[slug]) — punya route statis sendiri yang override [slug].
export const CUSTOM_MODULE_SLUGS = ["mengenal-dunia-digital"];

function toLearningModule(row: ModuleRow): LearningModule {
  return {
    slug: row.slug,
    order: row.order,
    title: row.title,
    summary: row.summary,
    status: row.status === "published" ? "published" : "draft",
    coverImage: row.coverImage,
    content: {
      estimatedTime: row.estimatedTime,
      learningObjectives:
        (row.learningObjectives as unknown as string[]) ?? [],
      openingStory: (row.openingStory as unknown as StoryLine[]) ?? [],
      benefits: (row.benefits as unknown as BenefitCard[]) ?? [],
      lessons: (row.lessons as unknown as ModuleLesson[]) ?? [],
      miniChallenge: (row.miniChallenge as unknown as string[]) ?? [],
    },
  };
}

export async function getAllModules(): Promise<LearningModule[]> {
  const rows = await prisma.module.findMany({ orderBy: { order: "asc" } });
  return rows.map(toLearningModule);
}

export async function getPublishedModules(): Promise<LearningModule[]> {
  const rows = await prisma.module.findMany({
    where: { status: "published" },
    orderBy: { order: "asc" },
  });
  return rows.map(toLearningModule);
}

export async function getModuleBySlug(
  slug: string
): Promise<LearningModule | null> {
  const row = await prisma.module.findUnique({ where: { slug } });
  return row ? toLearningModule(row) : null;
}

export async function getModuleByOrder(
  order: number
): Promise<LearningModule | null> {
  const row = await prisma.module.findFirst({ where: { order } });
  return row ? toLearningModule(row) : null;
}
