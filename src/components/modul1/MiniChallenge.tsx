"use client";

import { useState } from "react";

export function MiniChallenge({ items }: { items: string[] }) {
  const [checked, setChecked] = useState<boolean[]>(() => items.map(() => false));
  const done = checked.filter(Boolean).length;
  const percent = (done / items.length) * 100;

  return (
    <div>
      <div className="flex flex-col gap-2">
        {items.map((item, i) => (
          <label
            key={item}
            className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm transition-colors ${
              checked[i]
                ? "border-accent-200 bg-accent-50 text-accent-900"
                : "border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            <input
              type="checkbox"
              checked={checked[i]}
              onChange={() =>
                setChecked((prev) => prev.map((c, idx) => (idx === i ? !c : c)))
              }
              className="h-4 w-4 accent-accent-500"
            />
            {item}
          </label>
        ))}
      </div>

      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-accent-500 transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>

      <p className="mt-3 text-sm text-slate-500">
        {done}/{items.length} selesai hari ini.
      </p>
    </div>
  );
}
