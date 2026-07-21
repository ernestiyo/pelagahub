"use client";

import { useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export interface SlideSection {
  id: string;
  label: string;
  content: ReactNode;
}

export function SlideDeck({ sections }: { sections: SlideSection[] }) {
  const [active, setActive] = useState(0);

  if (sections.length === 0) return null;

  const current = sections[active];
  const isFirst = active === 0;
  const isLast = active === sections.length - 1;

  return (
    <div className="md:flex md:items-start md:gap-8">
      {/* Side tabs — desktop */}
      <nav
        aria-label="Bagian modul"
        className="hidden md:sticky md:top-8 md:block md:w-56 md:flex-none"
      >
        <ol className="flex flex-col gap-1">
          {sections.map((section, i) => (
            <li key={section.id}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-current={i === active}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors duration-150 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400 ${
                  i === active
                    ? "bg-primary-50 font-bold text-primary-700"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                }`}
              >
                <span
                  className={`flex h-6 w-6 flex-none items-center justify-center rounded-full text-xs font-bold ${
                    i === active
                      ? "bg-primary-600 text-white"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {i + 1}
                </span>
                <span className="min-w-0 flex-1 truncate">
                  {section.label}
                </span>
              </button>
            </li>
          ))}
        </ol>
      </nav>

      {/* Top tabs — mobile */}
      <nav
        aria-label="Bagian modul"
        className="sticky top-0 z-10 -mx-4 mb-6 overflow-x-auto bg-slate-50/95 px-4 py-3 backdrop-blur md:hidden"
      >
        <ol className="flex w-max gap-2">
          {sections.map((section, i) => (
            <li key={section.id}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-current={i === active}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors duration-150 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400 ${
                  i === active
                    ? "bg-primary-600 text-white"
                    : "border border-slate-200 bg-white text-slate-500 hover:bg-slate-100"
                }`}
              >
                <span>{i + 1}.</span>
                {section.label}
              </button>
            </li>
          ))}
        </ol>
      </nav>

      <div className="min-w-0 flex-1">
        <div key={current.id} className="animate-slide-fade flex flex-col gap-8">
          {current.content}
        </div>

        <div className="mt-8 flex items-center justify-between gap-4 border-t border-slate-200 pt-5">
          <button
            type="button"
            onClick={() => setActive((i) => Math.max(0, i - 1))}
            disabled={isFirst}
            className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition-colors duration-150 hover:bg-slate-100 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400 disabled:pointer-events-none disabled:opacity-0"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
            Sebelumnya
          </button>

          <p className="text-xs font-semibold text-slate-400">
            {active + 1} / {sections.length}
          </p>

          <button
            type="button"
            onClick={() => setActive((i) => Math.min(sections.length - 1, i + 1))}
            disabled={isLast}
            className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold text-primary-600 transition-colors duration-150 hover:bg-primary-50 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400 disabled:pointer-events-none disabled:opacity-0"
          >
            Lanjut
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}
