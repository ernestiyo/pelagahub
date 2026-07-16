import { Check, X } from "lucide-react";
import type { BeforeAfterRow } from "@/lib/modul1-content";

export function BeforeAfterComparison({ rows }: { rows: BeforeAfterRow[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200">
      <div className="grid grid-cols-2 bg-slate-100 text-xs font-bold uppercase tracking-wide text-slate-500">
        <div className="px-4 py-2">Sebelum</div>
        <div className="px-4 py-2 text-primary-600">Sesudah</div>
      </div>
      {rows.map((row) => (
        <div
          key={row.before}
          className="grid grid-cols-2 border-t border-slate-200 text-sm"
        >
          <div className="flex items-start gap-2 bg-slate-50/60 px-4 py-3 text-slate-500">
            <X className="mt-0.5 h-4 w-4 flex-none text-slate-400" strokeWidth={2} />
            <span>{row.before}</span>
          </div>
          <div className="flex items-start gap-2 px-4 py-3 font-medium text-slate-800">
            <Check className="mt-0.5 h-4 w-4 flex-none text-primary-600" strokeWidth={2.5} />
            <span>{row.after}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
