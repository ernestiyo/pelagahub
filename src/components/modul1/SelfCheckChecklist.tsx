"use client";

import { useState } from "react";
import type { ScoreBand } from "@/lib/modul1-content";

export function SelfCheckChecklist({
  items,
  bands,
}: {
  items: string[];
  bands: ScoreBand[];
}) {
  const [checked, setChecked] = useState<boolean[]>(() => items.map(() => false));
  const score = checked.filter(Boolean).length;
  const band = bands.find((b) => score >= b.min && score <= b.max);
  const percent = (score / items.length) * 100;

  return (
    <div>
      <div className="flex flex-col gap-2">
        {items.map((item, i) => (
          <label
            key={item}
            className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm transition-colors ${
              checked[i]
                ? "border-primary-200 bg-primary-50 text-primary-800"
                : "border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            <input
              type="checkbox"
              checked={checked[i]}
              onChange={() =>
                setChecked((prev) => prev.map((c, idx) => (idx === i ? !c : c)))
              }
              className="h-4 w-4 accent-primary-600"
            />
            {item}
          </label>
        ))}
      </div>

      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-primary-600 transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>

      {band && (
        <p className="mt-3 rounded-xl bg-primary-50 p-3 text-sm font-semibold text-primary-700">
          Skor Anda: {score}/{items.length} — {band.label}
        </p>
      )}
    </div>
  );
}
