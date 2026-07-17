import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { logoutAction } from "../login/actions";

export default function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <Container className="flex items-center justify-between py-4">
          <Link
            href="/admin"
            className="text-base font-extrabold tracking-tight text-slate-900"
          >
            Pelaga<span className="text-primary-600">Hub</span>{" "}
            <span className="font-medium text-slate-400">Admin</span>
          </Link>
          <div className="flex items-center gap-5">
            <Link
              href="/modul"
              className="text-sm font-semibold text-slate-500 hover:text-slate-700"
            >
              Lihat Situs
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="text-sm font-semibold text-primary-600 hover:text-primary-700"
              >
                Keluar
              </button>
            </form>
          </div>
        </Container>
      </header>

      <main className="flex-1 py-10">
        <Container>{children}</Container>
      </main>
    </div>
  );
}
