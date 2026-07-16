import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export function ModuleSection({
  icon: Icon,
  numeral,
  title,
  description,
  children,
}: {
  icon: LucideIcon;
  numeral: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <Icon className="h-5 w-5 text-primary-600" strokeWidth={1.75} />
          <h2 className="text-xl font-bold text-slate-900">{title}</h2>
        </div>
        <span
          aria-hidden="true"
          className="hidden select-none font-mono text-4xl font-bold text-slate-200 sm:block"
        >
          {numeral}
        </span>
      </div>
      {description && (
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      )}
      <div className="mt-5">{children}</div>
    </section>
  );
}
