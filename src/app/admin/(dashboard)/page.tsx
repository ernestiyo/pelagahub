import Link from "next/link";
import { LinkButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ConfirmSubmitButton } from "@/components/admin/ConfirmSubmitButton";
import { getAllModules, CUSTOM_MODULE_SLUGS } from "@/lib/modules";
import {
  deleteModuleAction,
  toggleModuleStatusAction,
} from "@/lib/actions/modules";

export default async function AdminDashboardPage() {
  const modules = await getAllModules();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
            Modul
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {modules.length} modul terdaftar — kelola isi Learning Center di
            sini.
          </p>
        </div>
        <LinkButton href="/admin/modul/baru" variant="cta">
          + Tambah Modul
        </LinkButton>
      </div>

      <div className="flex flex-col gap-3">
        {modules.map((mod) => {
          const isCustom = CUSTOM_MODULE_SLUGS.includes(mod.slug);
          const isPublished = mod.status === "published";

          return (
            <Card key={mod.slug} className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-primary-100 text-sm font-bold text-primary-700">
                  {mod.order}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-bold text-slate-900">{mod.title}</p>
                    <span
                      className={`inline-flex flex-none items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                        isPublished
                          ? "bg-primary-100 text-primary-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {isPublished ? "Published" : "Draft"}
                    </span>
                    {isCustom && (
                      <span className="inline-flex flex-none items-center rounded-full bg-accent-100 px-2 py-0.5 text-xs font-semibold text-accent-800">
                        Halaman Khusus
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 break-all text-sm text-slate-500">
                    /modul/{mod.slug}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3">
                <Link
                  href={`/admin/modul/${mod.slug}`}
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-primary-600 hover:bg-primary-50"
                >
                  Edit
                </Link>

                <form
                  action={toggleModuleStatusAction.bind(
                    null,
                    mod.slug,
                    mod.status
                  )}
                >
                  <button
                    type="submit"
                    className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    {isPublished ? "Unpublish" : "Publish"}
                  </button>
                </form>

                {!isCustom && (
                  <form action={deleteModuleAction.bind(null, mod.slug)}>
                    <ConfirmSubmitButton
                      confirmText={`Hapus modul "${mod.title}"? Tindakan ini tidak bisa dibatalkan.`}
                      className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-400 hover:bg-slate-100 hover:text-red-600"
                    >
                      Hapus
                    </ConfirmSubmitButton>
                  </form>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
