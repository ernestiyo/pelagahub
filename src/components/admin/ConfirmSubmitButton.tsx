"use client";

import { useEffect, useRef, useState, type ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

const confirmingClassName =
  "rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 transition-colors duration-150 hover:bg-red-100 active:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 disabled:pointer-events-none disabled:opacity-60";

export function ConfirmSubmitButton({
  confirmText,
  className = "",
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { confirmText: string }) {
  const [confirming, setConfirming] = useState(false);
  const { pending } = useFormStatus();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <button
      type="submit"
      disabled={pending}
      aria-label={confirming ? confirmText : undefined}
      onClick={(e) => {
        if (confirming) return;
        e.preventDefault();
        setConfirming(true);
        timeoutRef.current = setTimeout(() => setConfirming(false), 3000);
      }}
      className={
        confirming
          ? confirmingClassName
          : `${className} disabled:pointer-events-none disabled:opacity-60`
      }
      {...props}
    >
      {pending ? "Menghapus..." : confirming ? "Yakin? Klik lagi" : children}
    </button>
  );
}
