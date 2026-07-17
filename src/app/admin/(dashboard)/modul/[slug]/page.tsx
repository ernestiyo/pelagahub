import Link from "next/link";
import { notFound } from "next/navigation";
import { ModuleForm } from "@/components/admin/ModuleForm";
import { CUSTOM_MODULE_SLUGS, getModuleBySlug } from "@/lib/modules";
import { updateModuleAction } from "@/lib/actions/modules";

export default async function EditModulePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const mod = await getModuleBySlug(slug);
  if (!mod) notFound();

  const action = updateModuleAction.bind(null, mod.slug);

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <div>
        <Link
          href="/admin"
          className="text-sm font-semibold text-primary-600 hover:text-primary-700"
        >
          ← Semua Modul
        </Link>
        <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900">
          Edit Modul
        </h1>
      </div>

      <ModuleForm
        action={action}
        initialModule={mod}
        isCustom={CUSTOM_MODULE_SLUGS.includes(mod.slug)}
      />
    </div>
  );
}
