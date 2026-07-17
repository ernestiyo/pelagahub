import Link from "next/link";
import { ModuleForm } from "@/components/admin/ModuleForm";
import { getAllModules } from "@/lib/modules";
import { createModuleAction } from "@/lib/actions/modules";

export default async function NewModulePage() {
  const modules = await getAllModules();
  const defaultOrder =
    modules.reduce((max, mod) => Math.max(max, mod.order), 0) + 1;

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
          Tambah Modul Baru
        </h1>
      </div>

      <ModuleForm action={createModuleAction} defaultOrder={defaultOrder} />
    </div>
  );
}
