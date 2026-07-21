import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock, Lightbulb, CircleCheckBig, X } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { MiniChallenge } from "@/components/modul1/MiniChallenge";
import { NextModulePreview } from "@/components/modul1/NextModulePreview";
import { SlideDeck, type SlideSection } from "@/components/modul/SlideDeck";
import {
  CUSTOM_MODULE_SLUGS,
  getModuleByOrder,
  getModuleBySlug,
  getPublishedModules,
  type ModuleLesson,
} from "@/lib/modules";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const modules = await getPublishedModules();
  return modules
    .filter((mod) => !CUSTOM_MODULE_SLUGS.includes(mod.slug))
    .map((mod) => ({ slug: mod.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const mod = await getModuleBySlug(slug);
  if (!mod) return {};

  return {
    title: `${mod.title} — PelagaHub`,
    description: mod.summary,
  };
}

export default async function ModuleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const mod = await getModuleBySlug(slug);

  if (!mod || mod.status !== "published") {
    notFound();
  }

  const next = await getModuleByOrder(mod.order + 1);
  const { content } = mod;

  const slides: SlideSection[] = [];

  if (content.openingStory.length > 0) {
    slides.push({
      id: "cerita-pembuka",
      label: "Cerita Pembuka",
      content: (
        <Section title="Cerita Pembuka">
          <StoryLines lines={content.openingStory} />
        </Section>
      ),
    });
  }

  if (content.benefits.length > 0) {
    slides.push({
      id: "mengapa-penting",
      label: "Mengapa Penting?",
      content: (
        <Section title="Mengapa Ini Penting?">
          <div className="grid gap-4 sm:grid-cols-2">
            {content.benefits.map((benefit, i) => (
              <div
                key={benefit.title}
                className={`rounded-2xl p-5 ${
                  i % 2 === 0
                    ? "bg-primary-50 text-primary-900"
                    : "bg-accent-50 text-accent-900"
                }`}
              >
                <p className="font-bold text-slate-900">{benefit.title}</p>
                <p className="mt-1 text-sm text-slate-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </Section>
      ),
    });
  }

  content.lessons.forEach((lesson, i) => {
    slides.push({
      id: `lesson-${i}`,
      label: lesson.title || `Lesson ${i + 1}`,
      content: (
        <LessonSection
          lesson={lesson}
          index={i}
          showNumber={content.lessons.length > 1}
        />
      ),
    });
  });

  if (content.miniChallenge.length > 0) {
    slides.push({
      id: "mini-challenge",
      label: "Mini Challenge",
      content: (
        <div className="relative overflow-hidden rounded-3xl bg-accent-500 p-6 sm:p-8">
          <div className="relative">
            <h2 className="text-xl font-bold text-accent-950">
              Mini Challenge
            </h2>
            <p className="mt-1 text-sm text-accent-950/70">
              Langsung coba sekarang, jangan ditunda.
            </p>
            <div className="mt-5 rounded-2xl bg-white p-5">
              <MiniChallenge items={content.miniChallenge} />
            </div>
          </div>
        </div>
      ),
    });
  }

  slides.push({
    id: "modul-berikutnya",
    label: "Modul Berikutnya",
    content: <NextModulePreview next={next ?? undefined} />,
  });

  const hasContent =
    content.openingStory.length > 0 ||
    content.benefits.length > 0 ||
    content.lessons.length > 0 ||
    content.miniChallenge.length > 0;

  return (
    <main className="flex-1 bg-slate-50 py-12 sm:py-16">
      <Container className="mx-auto flex max-w-4xl flex-col gap-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary-700 p-6 sm:p-8">
          {mod.coverImage && (
            <Image
              src={mod.coverImage}
              alt=""
              fill
              className="object-cover opacity-20"
              sizes="768px"
            />
          )}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-10 -right-6 select-none font-mono text-[9rem] font-bold leading-none text-white/10 sm:text-[11rem]"
          >
            {String(mod.order).padStart(2, "0")}
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
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {mod.title}
            </h1>
            <p className="mt-3 max-w-lg text-lg text-primary-100">
              {mod.summary}
            </p>

            {content.estimatedTime && (
              <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-100">
                <Clock className="h-4 w-4" strokeWidth={2} />
                Estimasi waktu: {content.estimatedTime}
              </p>
            )}

            {content.learningObjectives.length > 0 && (
              <ul className="mt-4 flex flex-col gap-1.5">
                {content.learningObjectives.map((goal) => (
                  <li
                    key={goal}
                    className="flex items-start gap-2 text-sm text-primary-50"
                  >
                    <CircleCheckBig
                      className="mt-0.5 h-4 w-4 flex-none text-accent-400"
                      strokeWidth={2}
                    />
                    {goal}
                  </li>
                ))}
              </ul>
            )}

            <LinkButton href="#belajar" variant="cta" className="mt-6">
              Mulai Belajar →
            </LinkButton>
          </div>
        </div>

        <div id="belajar">
          {hasContent ? (
            <SlideDeck sections={slides} />
          ) : (
            <div className="flex flex-col gap-8">
              <Card className="text-center text-slate-500">
                Konten modul ini sedang disiapkan. Silakan kembali lagi nanti.
              </Card>
              <NextModulePreview next={next ?? undefined} />
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      {children}
    </Card>
  );
}

function Paragraphs({ text }: { text: string }) {
  return (
    <div className="flex flex-col gap-3 text-slate-600">
      {text.split("\n\n").map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}

function StoryLines({
  lines,
}: {
  lines: { speaker: string; message: string }[];
}) {
  const speakers = Array.from(
    new Set(lines.map((l) => l.speaker.trim()).filter(Boolean))
  );

  return (
    <div className="flex flex-col gap-3">
      {lines.map((line, i) => {
        const speaker = line.speaker.trim();

        if (!speaker) {
          return (
            <p
              key={i}
              className="py-1 text-center text-sm italic text-slate-500"
            >
              {line.message}
            </p>
          );
        }

        const isFirstSpeaker = speakers.indexOf(speaker) === 0;

        return (
          <div
            key={i}
            className={`flex ${isFirstSpeaker ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                isFirstSpeaker
                  ? "rounded-bl-sm bg-slate-100 text-slate-800"
                  : "rounded-br-sm bg-primary-600 text-white"
              }`}
            >
              <p
                className={`mb-0.5 text-xs font-bold ${
                  isFirstSpeaker ? "text-slate-400" : "text-primary-100"
                }`}
              >
                {speaker}
              </p>
              {line.message}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function LessonSection({
  lesson,
  index,
  showNumber,
}: {
  lesson: ModuleLesson;
  index: number;
  showNumber: boolean;
}) {
  return (
    <Section
      title={
        showNumber
          ? `Lesson ${index + 1}${lesson.title ? `: ${lesson.title}` : ""}`
          : lesson.title || "Tutorial Langkah demi Langkah"
      }
    >
      {lesson.whatIsIt.trim() && (
        <div>
          <Paragraphs text={lesson.whatIsIt} />
          {lesson.analogy && (
            <p className="mt-3 rounded-xl border-l-4 border-accent-400 bg-accent-50 px-4 py-3 text-sm font-medium italic text-accent-900">
              {lesson.analogy}
            </p>
          )}
        </div>
      )}

      {lesson.steps.length > 0 && (
        <ol className="flex flex-col gap-5">
          {lesson.steps.map((step, i) => (
            <li key={i} className="flex gap-4">
              <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white">
                {i + 1}
              </span>
              <div className="flex-1">
                <p className="text-slate-800">{step.instruction}</p>
                {step.tip && (
                  <p className="mt-1 text-sm text-slate-500">
                    💡 {step.tip}
                  </p>
                )}
                {step.image && (
                  <div className="relative mt-3 aspect-video w-full max-w-sm overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                    <Image
                      src={step.image}
                      alt={step.instruction}
                      fill
                      sizes="384px"
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      )}

      {lesson.example.trim() && (
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
            Contoh Nyata
          </p>
          <p className="mt-1.5 text-sm text-slate-700">{lesson.example}</p>
        </div>
      )}

      {lesson.tip.trim() && (
        <div className="flex items-start gap-3 rounded-xl bg-accent-50 p-4">
          <Lightbulb
            className="mt-0.5 h-5 w-5 flex-none text-accent-600"
            strokeWidth={1.75}
          />
          <p className="text-sm text-accent-900">{lesson.tip}</p>
        </div>
      )}

      {lesson.mistakes.length > 0 && (
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
            Kesalahan yang Sering Terjadi
          </p>
          <ul className="mt-2 flex flex-col gap-3">
            {lesson.mistakes.map((item) => (
              <li
                key={item.mistake}
                className="rounded-xl border border-slate-200 p-4"
              >
                <p className="flex items-start gap-2 font-bold text-slate-900">
                  <X
                    className="mt-0.5 h-4 w-4 flex-none text-red-500"
                    strokeWidth={2.5}
                  />
                  {item.mistake}
                </p>
                {item.consequence && (
                  <p className="mt-1.5 pl-6 text-sm text-slate-600">
                    Akibatnya: {item.consequence}
                  </p>
                )}
                {item.fix && (
                  <p className="mt-1 flex items-start gap-2 pl-6 text-sm font-medium text-primary-700">
                    <CircleCheckBig
                      className="mt-0.5 h-4 w-4 flex-none text-primary-600"
                      strokeWidth={2}
                    />
                    {item.fix}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  );
}
