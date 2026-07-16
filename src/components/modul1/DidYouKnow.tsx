"use client";

import { useEffect, useState } from "react";
import { Lightbulb } from "lucide-react";

export function DidYouKnow({ facts }: { facts: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (facts.length <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % facts.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [facts.length]);

  if (facts.length === 0) return null;

  return (
    <div className="flex items-start gap-3 rounded-2xl bg-gradient-to-br from-accent-50 to-accent-100 p-4">
      <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-white shadow-sm">
        <Lightbulb className="h-5 w-5 text-accent-600" strokeWidth={1.75} />
      </span>
      <div>
        <p className="text-sm font-bold text-accent-800">Tahukah Anda?</p>
        <p className="mt-0.5 text-sm text-slate-700">{facts[index]}</p>
      </div>
    </div>
  );
}
