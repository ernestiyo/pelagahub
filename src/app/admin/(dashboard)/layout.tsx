import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FormActionButton } from "@/components/admin/FormActionButton";
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
            className="rounded-lg text-base font-extrabold tracking-tight text-slate-900 transition-opacity duration-150 hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400"
          >
            Pelaga<span className="text-primary-600">Hub</span>{" "}
            <span className="font-medium text-slate-400">Admin</span>
          </Link>
          <div className="flex items-center gap-5">
            <Link
              href="/modul"
              className="rounded-lg text-sm font-semibold text-slate-500 transition-colors duration-150 hover:text-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400"
            >
              Lihat Situs
            </Link>
            <form action={logoutAction}>
              <FormActionButton
                pendingText="Keluar..."
                className="rounded-lg text-sm font-semibold text-primary-600 transition-colors duration-150 hover:text-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400"
              >
                Keluar
              </FormActionButton>
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
