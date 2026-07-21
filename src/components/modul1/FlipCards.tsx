"use client";

import { useState, type ReactNode } from "react";

export interface FlipCardItem {
  icon: ReactNode;
  front: string;
  back: string;
}

export function FlipCards({ cards }: { cards: FlipCardItem[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {cards.map((card) => (
        <FlipCardButton key={card.front} card={card} />
      ))}
    </div>
  );
}

function FlipCardButton({ card }: { card: FlipCardItem }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      aria-pressed={flipped}
      className="h-44 w-full rounded-2xl text-left [perspective:1000px] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400"
    >
      <div
        className={`relative h-full w-full rounded-2xl transition-transform duration-500 [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 p-4 text-center shadow-md [backface-visibility:hidden]">
          {card.icon}
          <p className="font-bold text-white">{card.front}</p>
        </div>
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-primary-50 p-4 text-center ring-1 ring-inset ring-primary-100 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <p className="text-sm text-slate-700">{card.back}</p>
        </div>
      </div>
    </button>
  );
}
