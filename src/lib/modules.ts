import { prisma } from "@/lib/prisma";
import type { Module as ModuleRow } from "@prisma/client";

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
  coverImage: string | null;
  content: ModuleContent;
}

// Modul dengan halaman detail custom (bukan lewat template generik 6-bagian
// di /modul/[slug]) — punya route statis sendiri yang override [slug].
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
      whatIsIt: row.whatIsIt,
      whyUseful: row.whyUseful,
      steps: (row.steps as unknown as ModuleStep[]) ?? [],
      tips: (row.tips as unknown as string[]) ?? [],
      commonMistakes: (row.commonMistakes as unknown as string[]) ?? [],
      usefulLinks: (row.usefulLinks as unknown as ModuleLink[]) ?? [],
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
