import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

type Tone = "primary" | "accent";

export function ModuleHighlight({
  icon: Icon,
  tone,
  numeral,
  title,
  description,
  children,
}: {
  icon: LucideIcon;
  tone: Tone;
  numeral: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  const isAccent = tone === "accent";

  return (
    <section
      className={`relative overflow-hidden rounded-3xl p-6 sm:p-8 ${
        isAccent ? "bg-accent-500" : "bg-primary-700"
      }`}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -top-8 -right-4 select-none font-mono text-[8rem] font-bold leading-none sm:text-[10rem] ${
          isAccent ? "text-white/15" : "text-white/10"
        }`}
      >
        {numeral}
      </span>

      <div className="relative flex items-center gap-2.5">
        <Icon
          className={isAccent ? "h-5 w-5 text-accent-950" : "h-5 w-5 text-white"}
          strokeWidth={1.75}
        />
        <h2
          className={`text-xl font-bold ${isAccent ? "text-accent-950" : "text-white"}`}
        >
          {title}
        </h2>
      </div>
      {description && (
        <p
          className={`relative mt-1 max-w-md text-sm ${
            isAccent ? "text-accent-950/70" : "text-primary-100"
          }`}
        >
          {description}
        </p>
      )}

      <div className="relative mt-5 rounded-2xl bg-white p-5">{children}</div>
    </section>
  );
}
