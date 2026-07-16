import Link from "next/link";
import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { getPublishedModules } from "@/lib/modules";

export const metadata: Metadata = {
  title: "Modul Belajar — PelagaHub",
  description:
    "Semua modul belajar digitalisasi usaha untuk pelaku UMKM Desa Pelaga.",
};

export default function ModulListPage() {
  const modules = getPublishedModules();

  return (
    <main className="flex-1 bg-slate-50 py-12 sm:py-16">
      <Container className="flex flex-col gap-10">
        <header className="flex flex-col gap-3">
          <p className="text-xs font-bold uppercase tracking-wide text-primary-600">
            Learning Center
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Modul Belajar
          </h1>
          <p className="max-w-2xl text-slate-600 sm:text-lg">
            Pilih modul di bawah ini dan mulai belajar langkah demi langkah,
            sesuai kecepatan Anda sendiri.
          </p>
        </header>

        {modules.length === 0 ? (
          <p className="text-slate-500">
            Belum ada modul yang tersedia. Silakan kembali lagi nanti.
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((mod) => (
              <Link key={mod.slug} href={`/modul/${mod.slug}`} className="group">
                <Card hover className="flex h-full flex-col gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-100 text-base font-bold text-primary-700">
                    {mod.order}
                  </div>
                  <div className="flex flex-1 flex-col gap-2">
                    <h2 className="text-lg font-bold text-slate-900 group-hover:text-primary-700">
                      {mod.title}
                    </h2>
                    <p className="text-sm text-slate-600">{mod.summary}</p>
                  </div>
                  <span className="text-sm font-semibold text-primary-600">
                    Mulai Modul →
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}
