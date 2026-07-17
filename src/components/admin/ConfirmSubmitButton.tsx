"use client";

import type { ButtonHTMLAttributes } from "react";

export function ConfirmSubmitButton({
  confirmText,
  className = "",
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { confirmText: string }) {
  return (
    <button
      type="submit"
      className={className}
      onClick={(e) => {
        if (!confirm(confirmText)) {
          e.preventDefault();
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
}
