"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { deleteProduct } from "@/app/(dashboard)/products/[id]/actions";

export function DeleteProductButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleDelete() {
    if (!window.confirm(`Delete “${name}”? This also removes its uploaded photos and cannot be undone.`)) return;
    setError(null);
    startTransition(async () => {
      const result = await deleteProduct(id);
      if (result.error) {
        setError(result.error);
        return;
      }
      router.refresh();
    });
  }

  return <div className="flex flex-col items-start gap-1">
    <button type="button" onClick={handleDelete} disabled={pending} aria-label={`Delete ${name}`}
      className="inline-flex items-center gap-1 rounded-lg border border-red/25 px-2.5 py-1.5 text-xs font-medium text-red hover:bg-red-wash disabled:opacity-50">
      <Trash2 className="h-3.5 w-3.5" />{pending ? "Deleting…" : "Delete"}
    </button>
    {error && <span className="max-w-32 text-[10px] text-red">{error}</span>}
  </div>;
}
