import type { BenefitData } from "@/lib/modul1-content";

const palette = [
  "bg-primary-50 text-primary-600",
  "bg-accent-50 text-accent-700",
  "bg-primary-100 text-primary-700",
  "bg-accent-100 text-accent-800",
];

export function BenefitCards({ benefits }: { benefits: BenefitData[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {benefits.map((benefit, i) => {
        const Icon = benefit.icon;
        return (
          <div
            key={benefit.title}
            className={`rounded-2xl p-5 ${palette[i % palette.length]}`}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
              <Icon className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <p className="mt-3 font-bold text-slate-900">{benefit.title}</p>
            <p className="mt-1 text-sm text-slate-600">
              {benefit.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
