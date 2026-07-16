"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const SLIDES = [
  { src: "/hero/bridge_scenery.jpg", alt: "Suasana Desa Pelaga" },
  { src: "/hero/marigold_scenery.jpg", alt: "Kebun bunga marigold di Desa Pelaga" },
  { src: "/hero/kiadan_coffee.jpg", alt: "Dokumentasi UMKM kopi di Desa Pelaga" },
  { 
    src: "/hero/marigold_on_hand.jpeg",
    alt: "Pelaku UMKM Desa Pelaga dengan hasil panen bunga marigold",
  },
];

const SLIDE_DURATION_MS = 6000;

export function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [motionOK, setMotionOK] = useState(true);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setMotionOK(!reduceMotion);
    if (reduceMotion) return;

    const cycle = setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length);
    }, SLIDE_DURATION_MS);
    return () => clearInterval(cycle);
  }, []);

  useEffect(() => {
    if (!motionOK) return;

    let ticking = false;
    const update = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translate3d(0, ${window.scrollY * 0.35}px, 0)`;
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [motionOK]);

  return (
    <section className="relative isolate flex min-h-dvh items-center overflow-hidden bg-slate-900">
      {/* Moving background — cross-fading, slowly zooming photos */}
      <div
        ref={bgRef}
        className="absolute -inset-y-20 inset-x-0 will-change-transform"
      >
        {SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className={`object-cover ${
                motionOK && i === active ? "animate-hero-zoom" : ""
              }`}
            />
          </div>
        ))}
      </div>

      {/* Scrim for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/45 to-slate-950/35" />
      <div className="absolute inset-x-0 top-0 z-[5] h-40 bg-gradient-to-b from-slate-950/55 to-transparent" />

      {/* Content — centered */}
      <Container className="relative z-10 flex flex-col items-center py-20 text-center sm:py-28">
        <Image
          src="/logo/logopelagahub.png"
          alt="PelagaHub"
          width={601}
          height={210}
          priority
          className="mb-8 h-9 w-auto brightness-0 invert drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] sm:h-10"
        />
        <p className="mb-6 inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
          Learning Center Desa Pelaga
        </p>
        <h1 className="max-w-4xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
          <span className="block text-balance leading-[1.15]">
            Usaha Anda Sudah Bagus.
          </span>
          <span className="mt-2 block text-balance leading-[1.15] sm:mt-3">
            Sekarang Saatnya Lebih Banyak Orang Menemukannya.
          </span>
        </h1>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-slate-200 sm:mt-7 sm:text-lg">
          Pelajari cara sederhana memanfaatkan teknologi untuk mengembangkan
          usaha Anda.
        </p>
        <LinkButton
          href="/modul"
          variant="cta"
          size="lg"
          className="mt-9 sm:mt-10"
        >
          Mulai Belajar →
        </LinkButton>
      </Container>
    </section>
  );
}
