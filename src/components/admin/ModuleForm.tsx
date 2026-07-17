"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/Button";
import type {
  LearningModule,
  ModuleLink,
  ModuleStep,
} from "@/lib/modules";
import type { ModuleFormState } from "@/lib/actions/modules";

type Action = (
  prevState: ModuleFormState,
  formData: FormData
) => Promise<ModuleFormState>;

const inputClass =
  "w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100";
const labelClass = "text-sm font-semibold text-slate-700";

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

  const [steps, setSteps] = useState<ModuleStep[]>(
    initialModule?.content.steps ?? []
  );
  const [tips, setTips] = useState<string[]>(initialModule?.content.tips ?? []);
  const [commonMistakes, setCommonMistakes] = useState<string[]>(
    initialModule?.content.commonMistakes ?? []
  );
  const [usefulLinks, setUsefulLinks] = useState<ModuleLink[]>(
    initialModule?.content.usefulLinks ?? []
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

        <Field label="Ringkasan Singkat" htmlFor="summary">
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
          hint="Opsional. Tempel link gambar, contoh dari Google Drive/Imgur."
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
        <h2 className="text-lg font-bold text-slate-900">Konten</h2>

        <Field label="Apa Itu?" htmlFor="whatIsIt">
          <textarea
            id="whatIsIt"
            name="whatIsIt"
            rows={4}
            defaultValue={initialModule?.content.whatIsIt}
            className={inputClass}
          />
        </Field>

        <Field label="Kenapa Berguna?" htmlFor="whyUseful">
          <textarea
            id="whyUseful"
            name="whyUseful"
            rows={4}
            defaultValue={initialModule?.content.whyUseful}
            className={inputClass}
          />
        </Field>

        <StepListEditor steps={steps} onChange={setSteps} />
        <TextListEditor
          label="Tips"
          items={tips}
          onChange={setTips}
          addLabel="+ Tambah Tips"
          placeholder="Tulis satu tips..."
        />
        <TextListEditor
          label="Kesalahan Umum"
          items={commonMistakes}
          onChange={setCommonMistakes}
          addLabel="+ Tambah Kesalahan"
          placeholder="Tulis satu kesalahan umum..."
        />
        <LinkListEditor links={usefulLinks} onChange={setUsefulLinks} />
      </section>

      {/* dynamic list state serialized for the server action */}
      <input type="hidden" name="steps" value={JSON.stringify(steps)} />
      <input type="hidden" name="tips" value={JSON.stringify(tips)} />
      <input
        type="hidden"
        name="commonMistakes"
        value={JSON.stringify(commonMistakes)}
      />
      <input
        type="hidden"
        name="usefulLinks"
        value={JSON.stringify(usefulLinks)}
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

function StepListEditor({
  steps,
  onChange,
}: {
  steps: ModuleStep[];
  onChange: (steps: ModuleStep[]) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className={labelClass}>Cara Memulai (langkah demi langkah)</p>
      {steps.map((step, i) => (
        <div
          key={i}
          className="flex flex-col gap-2 rounded-xl border border-slate-200 p-3"
        >
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Judul langkah"
              value={step.title}
              onChange={(e) =>
                onChange(
                  steps.map((s, idx) =>
                    idx === i ? { ...s, title: e.target.value } : s
                  )
                )
              }
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => onChange(steps.filter((_, idx) => idx !== i))}
              className="flex-none rounded-lg px-2 py-2 text-sm font-semibold text-slate-400 hover:bg-slate-100 hover:text-red-600"
            >
              Hapus
            </button>
          </div>
          <textarea
            placeholder="Penjelasan langkah ini"
            rows={2}
            value={step.description}
            onChange={(e) =>
              onChange(
                steps.map((s, idx) =>
                  idx === i ? { ...s, description: e.target.value } : s
                )
              )
            }
            className={inputClass}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...steps, { title: "", description: "" }])}
        className="self-start rounded-lg px-3 py-2 text-sm font-semibold text-primary-600 hover:bg-primary-50"
      >
        + Tambah Langkah
      </button>
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
            className="flex-none rounded-lg px-2 py-2 text-sm font-semibold text-slate-400 hover:bg-slate-100 hover:text-red-600"
          >
            Hapus
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, ""])}
        className="self-start rounded-lg px-3 py-2 text-sm font-semibold text-primary-600 hover:bg-primary-50"
      >
        {addLabel}
      </button>
    </div>
  );
}

function LinkListEditor({
  links,
  onChange,
}: {
  links: ModuleLink[];
  onChange: (links: ModuleLink[]) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className={labelClass}>Link Berguna (opsional)</p>
      {links.map((link, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Judul link"
            value={link.label}
            onChange={(e) =>
              onChange(
                links.map((l, idx) =>
                  idx === i ? { ...l, label: e.target.value } : l
                )
              )
            }
            className={inputClass}
          />
          <input
            type="text"
            placeholder="https://..."
            value={link.url}
            onChange={(e) =>
              onChange(
                links.map((l, idx) =>
                  idx === i ? { ...l, url: e.target.value } : l
                )
              )
            }
            className={inputClass}
          />
          <button
            type="button"
            onClick={() => onChange(links.filter((_, idx) => idx !== i))}
            className="flex-none rounded-lg px-2 py-2 text-sm font-semibold text-slate-400 hover:bg-slate-100 hover:text-red-600"
          >
            Hapus
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...links, { label: "", url: "" }])}
        className="self-start rounded-lg px-3 py-2 text-sm font-semibold text-primary-600 hover:bg-primary-50"
      >
        + Tambah Link
      </button>
    </div>
  );
}
