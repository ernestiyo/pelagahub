"use client";

import type { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

export function FormActionButton({
  children,
  pendingText = "Memproses...",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { pendingText?: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`${className} disabled:pointer-events-none disabled:opacity-60`}
      {...props}
    >
      {pending ? pendingText : children}
    </button>
  );
}
