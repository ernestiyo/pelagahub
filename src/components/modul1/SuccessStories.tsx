"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import type { StoryStep } from "@/lib/modul1-content";

export interface StoryItem {
  title: string;
  steps: StoryStep[];
  iconLarge: ReactNode;
  iconSmall: ReactNode;
}

export function SuccessStories({ stories }: { stories: StoryItem[] }) {
  const story = stories[0];
  const [index, setIndex] = useState(0);
  const total = story.steps.length;
  const step = story.steps[index];

  return (
    <div>
      <p className="flex items-center gap-2 font-bold text-slate-900">
        {story.iconSmall}
        {story.title}
      </p>

      <div className="relative mx-auto mt-4 aspect-[10/7] w-full">
        {story.steps.map((s, i) => {
          const diff = (i - index + total) % total;
          const isFront = diff === 0;
          const isRight = diff === 1;

          const position = isFront
            ? "z-30 translate-x-0 rotate-0 scale-100 opacity-100"
            : isRight
              ? "z-10 translate-x-[58%] rotate-6 scale-75 opacity-60"
              : "z-10 -translate-x-[58%] -rotate-6 scale-75 opacity-60";

          return (
            <button
              key={s.label}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Lihat tahap ${s.label}`}
              aria-current={isFront}
              className={`absolute inset-0 m-auto aspect-square w-[min(58%,33rem)] overflow-hidden rounded-2xl border border-slate-200 bg-primary-100 shadow-md transition-all duration-500 ease-out ${position}`}
            >
              {s.image ? (
                <Image
                  src={s.image}
                  alt={`${story.title} — ${s.label}`}
                  fill
                  sizes="(max-width: 640px) 60vw, 528px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-primary-100 to-primary-50">
                  {story.iconLarge}
                  <span className="text-xs font-semibold text-primary-400">
                    Foto segera hadir
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="mx-auto mt-4 max-w-xs text-center text-sm">
        <span className="font-semibold text-primary-600">{step.label}:</span>{" "}
        <span className="text-slate-600">{step.text}</span>
      </div>

      <div className="mt-3 flex items-center justify-center gap-2">
        {story.steps.map((s, i) => (
          <button
            key={s.label}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Lihat tahap ${s.label}`}
            aria-current={i === index}
            className={`h-2 w-2 rounded-full transition-colors ${
              i === index ? "bg-primary-600" : "bg-slate-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
