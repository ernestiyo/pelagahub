import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import type { LearningModule } from "@/lib/modules";

export function NextModulePreview({ next }: { next?: LearningModule }) {
  if (!next) return null;

  const isReady = next.status === "published";

  return (
    <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5">
      <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-slate-100">
        <ArrowRight className="h-5 w-5 text-slate-500" strokeWidth={1.75} />
      </span>
      <div className="flex-1">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
          Modul Berikutnya
        </p>
        <p className="mt-1 text-lg font-bold text-slate-900">{next.title}</p>
        <p className="mt-1 text-sm text-slate-600">{next.summary}</p>
        {isReady ? (
          <LinkButton
            href={`/modul/${next.slug}`}
            variant="primary"
            className="mt-4"
          >
            Mulai Modul →
          </LinkButton>
        ) : (
          <span className="mt-4 inline-flex items-center rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-400">
            Segera Hadir
          </span>
        )}
      </div>
    </div>
  );
}
