"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/Button";
import type {
  BenefitCard,
  LearningModule,
  ModuleLesson,
  ModuleMistake,
  ModuleStep,
  StoryLine,
} from "@/lib/modules";
import type { ModuleFormState } from "@/lib/actions/modules";

type Action = (
  prevState: ModuleFormState,
  formData: FormData
) => Promise<ModuleFormState>;

const inputClass =
  "w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100";
const labelClass = "text-sm font-semibold text-slate-700";
const removeButtonClass =
  "flex-none rounded-lg px-2 py-1 text-sm font-semibold text-slate-400 hover:bg-slate-100 hover:text-red-600";
const addButtonClass =
  "self-start rounded-lg px-3 py-2 text-sm font-semibold text-primary-600 hover:bg-primary-50";
const itemBoxClass = "flex flex-col gap-2 rounded-xl border border-slate-200 p-3";

export function ModuleForm({
  action,
  initialModule,
  defaultOrder,
  isCustom = false,
}: {
  action: Action;
  initialModule?: LearningModule;
  defaultOrder?: number;
  isCustom?: boolean;
}) {
  const [state, formAction, pending] = useActionState(action, {});

  const [learningObjectives, setLearningObjectives] = useState<string[]>(
    initialModule?.content.learningObjectives ?? []
  );
  const [openingStory, setOpeningStory] = useState<StoryLine[]>(
    initialModule?.content.openingStory ?? []
  );
  const [benefits, setBenefits] = useState<BenefitCard[]>(
    initialModule?.content.benefits ?? []
  );
  const [lessons, setLessons] = useState<ModuleLesson[]>(
    initialModule?.content.lessons ?? []
  );
  const [commonMistakes, setCommonMistakes] = useState<ModuleMistake[]>(
    initialModule?.content.commonMistakes ?? []
  );
  const [miniChallenge, setMiniChallenge] = useState<string[]>(
    initialModule?.content.miniChallenge ?? []
  );

  return (
    <form action={formAction} className="flex flex-col gap-8">
      {isCustom && (
        <p className="rounded-xl bg-accent-50 px-4 py-3 text-sm text-accent-900">
          Modul ini punya halaman khusus di kode (bukan lewat template
          generik). Judul, ringkasan, urutan, dan status tetap dipakai —
          tapi field &quot;Konten&quot; di bawah tidak ditampilkan di
          halaman publik.
        </p>
      )}

      {state.error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {state.error}
        </p>
      )}

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-bold text-slate-900">Informasi Dasar</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Judul Modul" htmlFor="title">
            <input
              id="title"
              name="title"
              type="text"
              required
              defaultValue={initialModule?.title}
              className={inputClass}
            />
          </Field>

          <Field
            label="Slug (dipakai di URL)"
            htmlFor="slug"
            hint="Contoh: whatsapp-business"
          >
            <input
              id="slug"
              name="slug"
              type="text"
              required
              pattern="[a-z0-9]+(-[a-z0-9]+)*"
              defaultValue={initialModule?.slug}
              className={inputClass}
            />
          </Field>

          <Field label="Urutan" htmlFor="order">
            <input
              id="order"
              name="order"
              type="number"
              min={1}
              required
              defaultValue={initialModule?.order ?? defaultOrder}
              className={inputClass}
            />
          </Field>

          <Field label="Status" htmlFor="status">
            <select
              id="status"
              name="status"
              defaultValue={initialModule?.status ?? "draft"}
              className={inputClass}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </Field>
        </div>

        <Field
          label="Ringkasan Singkat"
          htmlFor="summary"
          hint="Dipakai di kartu daftar modul dan sebagai subjudul di hero."
        >
          <textarea
            id="summary"
            name="summary"
            rows={2}
            required
            defaultValue={initialModule?.summary}
            className={inputClass}
          />
        </Field>

        <Field
          label="Gambar Cover (URL)"
          htmlFor="coverImage"
          hint="Opsional. Dipakai untuk kartu daftar modul dan background hero. Tempel link gambar, contoh dari Google Drive/Imgur."
        >
          <input
            id="coverImage"
            name="coverImage"
            type="text"
            defaultValue={initialModule?.coverImage ?? ""}
            className={inputClass}
          />
        </Field>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Hero</h2>
          <p className="text-sm text-slate-500">
            Muncul di bagian paling atas halaman modul.
          </p>
        </div>

        <Field
          label="Estimasi Waktu"
          htmlFor="estimatedTime"
          hint="Contoh: 10–15 menit"
        >
          <input
            id="estimatedTime"
            name="estimatedTime"
            type="text"
            defaultValue={initialModule?.content.estimatedTime}
            className={inputClass}
          />
        </Field>

        <TextListEditor
          label="Setelah mempelajari modul ini, pembaca akan dapat..."
          items={learningObjectives}
          onChange={setLearningObjectives}
          addLabel="+ Tambah Poin"
          placeholder="Contoh: Membuat profil usaha"
        />
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Opening Story</h2>
          <p className="text-sm text-slate-500">
            Ceritakan situasi nyata yang sering dialami UMKM, lalu tunjukkan
            solusinya. Bisa berupa percakapan (isi &quot;Tokoh&quot;, mis.
            Pelanggan/Pemilik) atau narasi biasa (kosongkan &quot;Tokoh&quot;).
          </p>
        </div>
        <StoryEditor lines={openingStory} onChange={setOpeningStory} />
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Mengapa Ini Penting?
          </h2>
          <p className="text-sm text-slate-500">3–5 kartu manfaat singkat.</p>
        </div>
        <BenefitsEditor benefits={benefits} onChange={setBenefits} />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-bold text-slate-900">Apa Itu?</h2>

        <Field
          label="Penjelasan Sederhana"
          htmlFor="whatIsIt"
          hint="Gunakan bahasa sehari-hari, hindari istilah teknis tanpa penjelasan."
        >
          <textarea
            id="whatIsIt"
            name="whatIsIt"
            rows={3}
            defaultValue={initialModule?.content.whatIsIt}
            className={inputClass}
          />
        </Field>

        <Field
          label="Analogi (opsional)"
          htmlFor="analogy"
          hint='Contoh: "Bagaikan papan nama digital yang dapat dilihat semua orang."'
        >
          <input
            id="analogy"
            name="analogy"
            type="text"
            defaultValue={initialModule?.content.analogy}
            className={inputClass}
          />
        </Field>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Tutorial (Lessons)
          </h2>
          <p className="text-sm text-slate-500">
            Kelompokkan langkah-langkah jadi beberapa lesson (mis. &quot;Instalasi&quot;,
            &quot;Katalog Produk&quot;). Untuk modul sederhana, cukup buat satu lesson.
          </p>
        </div>
        <LessonListEditor lessons={lessons} onChange={setLessons} />
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Kesalahan yang Sering Terjadi
          </h2>
          <p className="text-sm text-slate-500">
            Format: Kesalahan → Akibatnya → Cara memperbaiki.
          </p>
        </div>
        <MistakeListEditor
          mistakes={commonMistakes}
          onChange={setCommonMistakes}
        />
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Mini Challenge</h2>
          <p className="text-sm text-slate-500">
            Checklist agar pembaca langsung mempraktikkan materi.
          </p>
        </div>
        <TextListEditor
          label="Daftar yang harus dicoba"
          items={miniChallenge}
          onChange={setMiniChallenge}
          addLabel="+ Tambah Item"
          placeholder="Contoh: Upload satu foto produk"
        />
      </section>

      {/* dynamic list state serialized for the server action */}
      <input
        type="hidden"
        name="learningObjectives"
        value={JSON.stringify(learningObjectives)}
      />
      <input
        type="hidden"
        name="openingStory"
        value={JSON.stringify(openingStory)}
      />
      <input type="hidden" name="benefits" value={JSON.stringify(benefits)} />
      <input type="hidden" name="lessons" value={JSON.stringify(lessons)} />
      <input
        type="hidden"
        name="commonMistakes"
        value={JSON.stringify(commonMistakes)}
      />
      <input
        type="hidden"
        name="miniChallenge"
        value={JSON.stringify(miniChallenge)}
      />

      <Button type="submit" variant="cta" size="lg" disabled={pending}>
        {pending ? "Menyimpan..." : "Simpan Modul"}
      </Button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className={labelClass}>
        {label}
      </label>
      {children}
      {hint && <p className="text-xs text-slate-400">{hint}</p>}
    </div>
  );
}

function TextListEditor({
  label,
  items,
  onChange,
  addLabel,
  placeholder,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  addLabel: string;
  placeholder: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className={labelClass}>{label}</p>
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            type="text"
            placeholder={placeholder}
            value={item}
            onChange={(e) =>
              onChange(items.map((it, idx) => (idx === i ? e.target.value : it)))
            }
            className={inputClass}
          />
          <button
            type="button"
            onClick={() => onChange(items.filter((_, idx) => idx !== i))}
            className={removeButtonClass}
          >
            Hapus
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, ""])}
        className={addButtonClass}
      >
        {addLabel}
      </button>
    </div>
  );
}

function StoryEditor({
  lines,
  onChange,
}: {
  lines: StoryLine[];
  onChange: (lines: StoryLine[]) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      {lines.map((line, i) => (
        <div key={i} className={itemBoxClass}>
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-slate-400">
              Baris {i + 1}
            </span>
            <button
              type="button"
              onClick={() => onChange(lines.filter((_, idx) => idx !== i))}
              className={removeButtonClass}
            >
              Hapus
            </button>
          </div>
          <input
            type="text"
            placeholder="Tokoh (kosongkan untuk narasi), contoh: Pelanggan"
            value={line.speaker}
            onChange={(e) =>
              onChange(
                lines.map((l, idx) =>
                  idx === i ? { ...l, speaker: e.target.value } : l
                )
              )
            }
            className={inputClass}
          />
          <textarea
            placeholder="Isi percakapan atau narasi"
            rows={2}
            value={line.message}
            onChange={(e) =>
              onChange(
                lines.map((l, idx) =>
                  idx === i ? { ...l, message: e.target.value } : l
                )
              )
            }
            className={inputClass}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          onChange([...lines, { speaker: "", message: "" }])
        }
        className={addButtonClass}
      >
        + Tambah Baris
      </button>
    </div>
  );
}

function BenefitsEditor({
  benefits,
  onChange,
}: {
  benefits: BenefitCard[];
  onChange: (benefits: BenefitCard[]) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      {benefits.map((benefit, i) => (
        <div key={i} className={itemBoxClass}>
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-slate-400">
              Manfaat {i + 1}
            </span>
            <button
              type="button"
              onClick={() => onChange(benefits.filter((_, idx) => idx !== i))}
              className={removeButtonClass}
            >
              Hapus
            </button>
          </div>
          <input
            type="text"
            placeholder="Judul singkat, contoh: Toko Lebih Profesional"
            value={benefit.title}
            onChange={(e) =>
              onChange(
                benefits.map((b, idx) =>
                  idx === i ? { ...b, title: e.target.value } : b
                )
              )
            }
            className={inputClass}
          />
          <textarea
            placeholder="Penjelasan singkat manfaat ini"
            rows={2}
            value={benefit.description}
            onChange={(e) =>
              onChange(
                benefits.map((b, idx) =>
                  idx === i ? { ...b, description: e.target.value } : b
                )
              )
            }
            className={inputClass}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...benefits, { title: "", description: "" }])}
        className={addButtonClass}
      >
        + Tambah Manfaat
      </button>
    </div>
  );
}

function MistakeListEditor({
  mistakes,
  onChange,
}: {
  mistakes: ModuleMistake[];
  onChange: (mistakes: ModuleMistake[]) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      {mistakes.map((mistake, i) => (
        <div key={i} className={itemBoxClass}>
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-slate-400">
              Kesalahan {i + 1}
            </span>
            <button
              type="button"
              onClick={() => onChange(mistakes.filter((_, idx) => idx !== i))}
              className={removeButtonClass}
            >
              Hapus
            </button>
          </div>
          <input
            type="text"
            placeholder="Kesalahan, contoh: Foto buram"
            value={mistake.mistake}
            onChange={(e) =>
              onChange(
                mistakes.map((m, idx) =>
                  idx === i ? { ...m, mistake: e.target.value } : m
                )
              )
            }
            className={inputClass}
          />
          <input
            type="text"
            placeholder="Akibatnya, contoh: Produk terlihat kurang menarik"
            value={mistake.consequence}
            onChange={(e) =>
              onChange(
                mistakes.map((m, idx) =>
                  idx === i ? { ...m, consequence: e.target.value } : m
                )
              )
            }
            className={inputClass}
          />
          <input
            type="text"
            placeholder="Cara memperbaiki, contoh: Gunakan cahaya alami"
            value={mistake.fix}
            onChange={(e) =>
              onChange(
                mistakes.map((m, idx) =>
                  idx === i ? { ...m, fix: e.target.value } : m
                )
              )
            }
            className={inputClass}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          onChange([...mistakes, { mistake: "", consequence: "", fix: "" }])
        }
        className={addButtonClass}
      >
        + Tambah Kesalahan
      </button>
    </div>
  );
}

function LessonListEditor({
  lessons,
  onChange,
}: {
  lessons: ModuleLesson[];
  onChange: (lessons: ModuleLesson[]) => void;
}) {
  function updateLesson(i: number, patch: Partial<ModuleLesson>) {
    onChange(
      lessons.map((lesson, idx) =>
        idx === i ? { ...lesson, ...patch } : lesson
      )
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {lessons.map((lesson, i) => (
        <div
          key={i}
          className="flex flex-col gap-3 rounded-xl border border-slate-200 p-4"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-bold text-slate-500">
              Lesson {i + 1}
            </span>
            <button
              type="button"
              onClick={() => onChange(lessons.filter((_, idx) => idx !== i))}
              className={removeButtonClass}
            >
              Hapus Lesson
            </button>
          </div>

          <input
            type="text"
            placeholder="Judul lesson, contoh: Instalasi"
            value={lesson.title}
            onChange={(e) => updateLesson(i, { title: e.target.value })}
            className={inputClass}
          />
          <textarea
            placeholder="Intro/pengantar singkat lesson ini (opsional)"
            rows={2}
            value={lesson.intro}
            onChange={(e) => updateLesson(i, { intro: e.target.value })}
            className={inputClass}
          />

          <StepListEditor
            steps={lesson.steps}
            onChange={(steps) => updateLesson(i, { steps })}
          />

          <textarea
            placeholder="Contoh Nyata (opsional) — sesuatu yang bisa langsung ditiru"
            rows={2}
            value={lesson.example}
            onChange={(e) => updateLesson(i, { example: e.target.value })}
            className={inputClass}
          />
          <textarea
            placeholder="💡 Tips singkat untuk lesson ini (maks. 2 kalimat, opsional)"
            rows={2}
            value={lesson.tip}
            onChange={(e) => updateLesson(i, { tip: e.target.value })}
            className={inputClass}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          onChange([
            ...lessons,
            { title: "", intro: "", steps: [], example: "", tip: "" },
          ])
        }
        className={addButtonClass}
      >
        + Tambah Lesson
      </button>
    </div>
  );
}

function StepListEditor({
  steps,
  onChange,
}: {
  steps: ModuleStep[];
  onChange: (steps: ModuleStep[]) => void;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl bg-slate-50 p-3">
      <p className={labelClass}>Langkah-langkah</p>
      {steps.map((step, i) => (
        <div key={i} className={itemBoxClass}>
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-slate-400">
              Langkah {i + 1}
            </span>
            <button
              type="button"
              onClick={() => onChange(steps.filter((_, idx) => idx !== i))}
              className={removeButtonClass}
            >
              Hapus
            </button>
          </div>
          <textarea
            placeholder="Instruksi langkah ini"
            rows={2}
            value={step.instruction}
            onChange={(e) =>
              onChange(
                steps.map((s, idx) =>
                  idx === i ? { ...s, instruction: e.target.value } : s
                )
              )
            }
            className={inputClass}
          />
          <input
            type="text"
            placeholder="Tips untuk langkah ini (opsional)"
            value={step.tip}
            onChange={(e) =>
              onChange(
                steps.map((s, idx) =>
                  idx === i ? { ...s, tip: e.target.value } : s
                )
              )
            }
            className={inputClass}
          />
          <input
            type="text"
            placeholder="URL gambar/screenshot (opsional)"
            value={step.image ?? ""}
            onChange={(e) =>
              onChange(
                steps.map((s, idx) =>
                  idx === i ? { ...s, image: e.target.value || null } : s
                )
              )
            }
            className={inputClass}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          onChange([...steps, { instruction: "", tip: "", image: null }])
        }
        className={addButtonClass}
      >
        + Tambah Langkah
      </button>
    </div>
  );
}
