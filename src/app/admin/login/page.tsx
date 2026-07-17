"use client";

import { useActionState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { loginAction, type LoginFormState } from "./actions";

const initialState: LoginFormState = {};

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <main className="flex min-h-dvh items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <Image
          src="/logo/logopelagahub.png"
          alt="PelagaHub"
          width={601}
          height={210}
          className="h-8 w-auto"
        />
        <h1 className="mt-6 text-xl font-bold text-slate-900">Masuk ke Admin</h1>
        <p className="mt-1 text-sm text-slate-500">
          Khusus tim pengelola PelagaHub.
        </p>

        <form action={formAction} className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="username" className="text-sm font-semibold text-slate-700">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-semibold text-slate-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
            />
          </div>

          {state.error && (
            <p className="rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
              {state.error}
            </p>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={pending}
            className="mt-2 w-full"
          >
            {pending ? "Memproses..." : "Masuk"}
          </Button>
        </form>
      </div>
    </main>
  );
}
