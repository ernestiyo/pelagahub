"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { CUSTOM_MODULE_SLUGS } from "@/lib/modules";

export interface ModuleFormState {
  error?: string;
}

function parseJsonArray(raw: FormDataEntryValue | null): Prisma.InputJsonValue {
  if (typeof raw !== "string") return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function readModuleFormData(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const summary = String(formData.get("summary") ?? "").trim();
  const order = Number(formData.get("order") ?? 0) || 0;
  const status = formData.get("status") === "published" ? "published" : "draft";
  const coverImage = String(formData.get("coverImage") ?? "").trim() || null;
  const whatIsIt = String(formData.get("whatIsIt") ?? "").trim();
  const whyUseful = String(formData.get("whyUseful") ?? "").trim();

  return {
    title,
    slug,
    summary,
    order,
    status,
    coverImage,
    whatIsIt,
    whyUseful,
    steps: parseJsonArray(formData.get("steps")),
    tips: parseJsonArray(formData.get("tips")),
    commonMistakes: parseJsonArray(formData.get("commonMistakes")),
    usefulLinks: parseJsonArray(formData.get("usefulLinks")),
  };
}

export async function createModuleAction(
  _prevState: ModuleFormState,
  formData: FormData
): Promise<ModuleFormState> {
  const data = readModuleFormData(formData);

  if (!data.title || !data.slug) {
    return { error: "Judul dan slug wajib diisi." };
  }

  const existing = await prisma.module.findUnique({
    where: { slug: data.slug },
  });
  if (existing) {
    return { error: "Slug sudah dipakai modul lain. Gunakan slug yang berbeda." };
  }

  await prisma.module.create({ data });
  revalidatePath("/admin");
  revalidatePath("/modul", "layout");
  redirect("/admin");
}

export async function updateModuleAction(
  originalSlug: string,
  _prevState: ModuleFormState,
  formData: FormData
): Promise<ModuleFormState> {
  const data = readModuleFormData(formData);

  if (!data.title || !data.slug) {
    return { error: "Judul dan slug wajib diisi." };
  }

  if (data.slug !== originalSlug) {
    const existing = await prisma.module.findUnique({
      where: { slug: data.slug },
    });
    if (existing) {
      return { error: "Slug sudah dipakai modul lain. Gunakan slug yang berbeda." };
    }
  }

  await prisma.module.update({ where: { slug: originalSlug }, data });
  revalidatePath("/admin");
  revalidatePath("/modul", "layout");
  redirect("/admin");
}

export async function deleteModuleAction(slug: string) {
  if (CUSTOM_MODULE_SLUGS.includes(slug)) {
    throw new Error(
      "Modul ini punya halaman khusus di kode dan tidak bisa dihapus dari sini."
    );
  }

  await prisma.module.delete({ where: { slug } });
  revalidatePath("/admin");
  revalidatePath("/modul", "layout");
}

export async function toggleModuleStatusAction(
  slug: string,
  currentStatus: string
) {
  const nextStatus = currentStatus === "published" ? "draft" : "published";
  await prisma.module.update({ where: { slug }, data: { status: nextStatus } });
  revalidatePath("/admin");
  revalidatePath("/modul", "layout");
}
