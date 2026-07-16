"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import type { StoryStep } from "@/lib/modul1-content";

export interface StoryItem {
  title: string;
  image: string | null;
  steps: StoryStep[];
  iconLarge: ReactNode;
  iconSmall: ReactNode;
}

export function SuccessStories({ stories }: { stories: StoryItem[] }) {
  const [index, setIndex] = useState(0);
  const story = stories[index];

  return (
    <div>
      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <div className="relative h-40 w-full bg-primary-100">
          {story.image ? (
            <Image
              src={story.image}
              alt={story.title}
              fill
              sizes="(max-width: 640px) 100vw, 640px"
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
        </div>
        <div className="p-5">
          <p className="flex items-center gap-2 font-bold text-slate-900">
            {story.iconSmall}
            {story.title}
          </p>
          <ol className="mt-3 flex flex-col gap-2">
            {story.steps.map((step) => (
              <li key={step.label} className="flex gap-2 text-sm">
                <span className="w-16 flex-none font-semibold text-primary-600">
                  {step.label}
                </span>
                <span className="text-slate-600">{step.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-center gap-2">
        {stories.map((s, i) => (
          <button
            key={s.title}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Lihat cerita ${s.title}`}
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
