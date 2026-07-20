import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Globe,
  Sparkles,
  RefreshCw,
  Trophy,
  SearchCheck,
  CircleCheckBig,
  Target,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ModuleSection } from "@/components/modul1/ModuleSection";
import { ModuleHighlight } from "@/components/modul1/ModuleHighlight";
import { FlipCards } from "@/components/modul1/FlipCards";
import { BenefitCards } from "@/components/modul1/BenefitCards";
import { BeforeAfterComparison } from "@/components/modul1/BeforeAfterComparison";
import { SuccessStories } from "@/components/modul1/SuccessStories";
import { MythFactList } from "@/components/modul1/MythFactList";
import { SelfCheckChecklist } from "@/components/modul1/SelfCheckChecklist";
import { MiniChallenge } from "@/components/modul1/MiniChallenge";
import { DidYouKnow } from "@/components/modul1/DidYouKnow";
import { NextModulePreview } from "@/components/modul1/NextModulePreview";
import { getModuleByOrder, getModuleBySlug } from "@/lib/modules";
import {
  flipCards,
  benefits,
  beforeAfterRows,
  successStories,
  mythFactPairs,
  selfCheckItems,
  selfCheckBands,
  challengeItems,
  funFacts,
} from "@/lib/modul1-content";

export const metadata: Metadata = {
  title: "Mengenal Dunia Digital untuk Usaha Anda — PelagaHub",
  description:
    "Kenapa digitalisasi penting untuk usaha Anda, dan langkah pertama yang bisa langsung dicoba hari ini.",
};

export default async function Modul1Page() {
  const mod = await getModuleBySlug("mengenal-dunia-digital");
  if (!mod || mod.status !== "published") notFound();
  const next = await getModuleByOrder(mod.order + 1);

  const flipCardItems = flipCards.map((card) => ({
    front: card.front,
    back: card.back,
    icon: (
      <card.icon className="h-7 w-7 text-primary-100" strokeWidth={1.75} />
    ),
  }));

  const storyItems = successStories.map((story) => ({
    title: story.title,
    steps: story.steps,
    iconLarge: (
      <story.icon className="h-8 w-8 text-primary-400" strokeWidth={1.5} />
    ),
    iconSmall: (
      <story.icon className="h-4 w-4 text-primary-500" strokeWidth={2} />
    ),
  }));

  return (
    <main className="flex-1 bg-slate-50 py-12 sm:py-16">
      <Container className="mx-auto flex max-w-3xl flex-col gap-12 sm:gap-14">
        <div className="relative overflow-hidden rounded-3xl bg-primary-700 p-6 sm:p-8">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-10 -right-6 select-none font-mono text-[9rem] font-bold leading-none text-white/10 sm:text-[11rem]"
          >
            01
          </span>
          <div className="relative">
            <Link
              href="/modul"
              className="text-sm font-semibold text-primary-200 hover:text-white"
            >
              ← Semua Modul
            </Link>
            <p className="mt-5 text-xs font-bold uppercase tracking-wide text-primary-200">
              Modul {mod.order}
            </p>
            <h1 className="mt-2 max-w-md text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {mod.title}
            </h1>
            <p className="mt-3 max-w-sm text-lg text-primary-100">
              {mod.summary}
            </p>
          </div>
        </div>

        <ModuleSection
          icon={Globe}
          numeral="01"
          title="Kenapa Digitalisasi Penting?"
          description="Klik tiap kartu untuk lihat jawabannya."
        >
          <FlipCards cards={flipCardItems} />
        </ModuleSection>

        <ModuleSection icon={Sparkles} numeral="02" title="Manfaat untuk UMKM">
          <BenefitCards benefits={benefits} />
        </ModuleSection>

        <ModuleSection
          icon={RefreshCw}
          numeral="03"
          title="Sebelum vs Sesudah Digitalisasi"
        >
          <BeforeAfterComparison rows={beforeAfterRows} />
        </ModuleSection>

        <ModuleHighlight
          icon={Trophy}
          tone="primary"
          numeral="04"
          title="Cerita Sukses"
          description="Kisah nyata usaha di Desa Pelaga yang sudah mulai go digital."
        >
          <SuccessStories stories={storyItems} />
        </ModuleHighlight>

        <ModuleSection icon={SearchCheck} numeral="05" title="Mitos vs Fakta">
          <MythFactList pairs={mythFactPairs} />
        </ModuleSection>

        <ModuleHighlight
          icon={CircleCheckBig}
          tone="accent"
          numeral="06"
          title="Sudah Siap Go Digital?"
          description="Centang yang sudah Anda punya sekarang."
        >
          <SelfCheckChecklist items={selfCheckItems} bands={selfCheckBands} />
        </ModuleHighlight>

        <ModuleSection
          icon={Target}
          numeral="07"
          title="Mini Challenge"
          description="Lakukan satu langkah digital hari ini."
        >
          <MiniChallenge items={challengeItems} />
        </ModuleSection>

        <DidYouKnow facts={funFacts} />

        <NextModulePreview next={next ?? undefined} />
      </Container>
    </main>
  );
}
