import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, X } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import {
  CUSTOM_MODULE_SLUGS,
  getModuleBySlug,
  getPublishedModules,
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

  const hasContent =
    mod.content.whatIsIt.trim() ||
    mod.content.whyUseful.trim() ||
    mod.content.steps.length > 0 ||
    mod.content.tips.length > 0 ||
    mod.content.commonMistakes.length > 0 ||
    mod.content.usefulLinks.length > 0;

  return (
    <main className="flex-1 bg-slate-50 py-12 sm:py-16">
      <Container className="mx-auto flex max-w-3xl flex-col gap-8">
        <div>
          <Link
            href="/modul"
            className="text-sm font-semibold text-primary-600 hover:text-primary-700"
          >
            ← Semua Modul
          </Link>
          <p className="mt-5 text-xs font-bold uppercase tracking-wide text-primary-600">
            Modul {mod.order}
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {mod.title}
          </h1>
          <p className="mt-3 text-lg text-slate-600">{mod.summary}</p>
        </div>

        {mod.content.whatIsIt.trim() && (
          <Section title="Apa Itu?">
            <Paragraphs text={mod.content.whatIsIt} />
          </Section>
        )}

        {mod.content.whyUseful.trim() && (
          <Section title="Kenapa Berguna?">
            <Paragraphs text={mod.content.whyUseful} />
          </Section>
        )}

        {mod.content.steps.length > 0 && (
          <Section title="Cara Memulai">
            <ol className="flex flex-col gap-5">
              {mod.content.steps.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-bold text-slate-900">{step.title}</p>
                    <p className="mt-1 text-slate-600">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Section>
        )}

        {mod.content.tips.length > 0 && (
          <Section title="Tips">
            <ul className="flex flex-col gap-3">
              {mod.content.tips.map((tip) => (
                <li key={tip} className="flex gap-3 text-slate-700">
                  <Check
                    className="mt-0.5 h-4 w-4 flex-none text-accent-600"
                    strokeWidth={2.5}
                  />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {mod.content.commonMistakes.length > 0 && (
          <Section title="Kesalahan Umum">
            <ul className="flex flex-col gap-3">
              {mod.content.commonMistakes.map((mistake) => (
                <li key={mistake} className="flex gap-3 text-slate-700">
                  <X
                    className="mt-0.5 h-4 w-4 flex-none text-slate-400"
                    strokeWidth={2.5}
                  />
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {mod.content.usefulLinks.length > 0 && (
          <Section title="Link Berguna">
            <ul className="flex flex-col gap-2">
              {mod.content.usefulLinks.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-primary-600 underline underline-offset-2 hover:text-primary-700"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {!hasContent && (
          <Card className="text-center text-slate-500">
            Konten modul ini sedang disiapkan. Silakan kembali lagi nanti.
          </Card>
        )}
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
