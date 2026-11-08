"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Category } from "@/lib/supabase/types";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-1.5 text-sm font-medium text-ink-soft">{children}</p>;
}

function SelectShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-ink-faint" />
    </div>
  );
}

const selectClass =
  "w-full appearance-none rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/25";

export function CategoryFields({
  categories,
  defaultCategoryId,
  defaultSubcategory,
}: {
  categories: Category[];
  defaultCategoryId?: string | null;
  defaultSubcategory?: string | null;
}) {
  const [categoryId, setCategoryId] = useState(defaultCategoryId ?? categories[0]?.id ?? "");
  const selected = categories.find((category) => category.id === categoryId);
  const subcategories = selected?.subcategories ?? [];
  const subcategoryValue = subcategories.includes(defaultSubcategory ?? "")
    ? defaultSubcategory!
    : subcategories[0] ?? "";

  return (
    <>
      <div>
        <FieldLabel>Category</FieldLabel>
        <SelectShell>
          <select
            name="category_id"
            value={categoryId}
            onChange={(event) => setCategoryId(event.target.value)}
            className={selectClass}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </SelectShell>
      </div>
      <div>
        <FieldLabel>Sub-category</FieldLabel>
        <SelectShell>
          <select name="subcategory" defaultValue={subcategoryValue} className={selectClass}>
            {subcategories.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </SelectShell>
      </div>
    </>
  );
}
