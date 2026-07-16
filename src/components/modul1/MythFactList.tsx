"use client";

import { useState } from "react";
import { CircleCheck, CircleX } from "lucide-react";
import type { MythFactPair } from "@/lib/modul1-content";

export function MythFactList({ pairs }: { pairs: MythFactPair[] }) {
  return (
    <div className="flex flex-col gap-3">
      {pairs.map((pair) => (
        <MythFactItem key={pair.myth} pair={pair} />
      ))}
    </div>
  );
}

function MythFactItem({ pair }: { pair: MythFactPair }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setRevealed((r) => !r)}
      aria-pressed={revealed}
      className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition-colors ${
        revealed
          ? "border-primary-200 bg-primary-50"
          : "border-slate-200 hover:border-primary-300"
      }`}
    >
      {revealed ? (
        <CircleCheck className="mt-0.5 h-5 w-5 flex-none text-primary-600" strokeWidth={2} />
      ) : (
        <CircleX className="mt-0.5 h-5 w-5 flex-none text-slate-400" strokeWidth={2} />
      )}
      <div>
        {!revealed ? (
          <p className="font-semibold text-slate-700">Mitos: {pair.myth}</p>
        ) : (
          <p className="font-semibold text-primary-700">Fakta: {pair.fact}</p>
        )}
        <p className="mt-1 text-xs text-slate-400">
          {revealed ? "Klik untuk sembunyikan" : "Klik untuk lihat faktanya"}
        </p>
      </div>
    </button>
  );
}
