"use client";

import { useState, useTransition } from "react";
import { Plus, X } from "lucide-react";
import { createCategory } from "@/app/(dashboard)/categories/actions";

export function AddCategoryForm() {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-deep"
      >
        <Plus className="h-4 w-4" />
        Add category
      </button>
    );
  }

  return (
    <div className="w-full rounded-2xl border border-border bg-surface p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-ink">New category</h2>
        <button onClick={() => setOpen(false)} className="text-ink-faint hover:text-ink">
          <X className="h-4 w-4" />
        </button>
      </div>
      <form
        action={(formData) => {
          startTransition(async () => {
            await createCategory(formData);
            setOpen(false);
          });
        }}
        className="mt-4 flex items-end gap-4"
      >
        <div className="flex-1">
          <label className="mb-1.5 block text-sm font-medium text-ink-soft">Name</label>
          <input
            name="name"
            required
            placeholder="e.g. Home & Living"
            className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-brand/25"
          />
        </div>
        <div className="flex-1">
          <label className="mb-1.5 block text-sm font-medium text-ink-soft">
            Subcategories (comma separated)
          </label>
          <input
            name="subcategories"
            placeholder="Kitchen, Furniture, Decor"
            className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-brand/25"
          />
        </div>
        <button
          type="submit"
          disabled={pending}
          className="rounded-xl bg-brand px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-deep disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save"}
        </button>
      </form>
    </div>
  );
}
