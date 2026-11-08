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

  return <div className="flex flex-col items-center gap-1">
    <button type="button" onClick={handleDelete} disabled={pending} aria-label={`Delete ${name}`} title={pending ? "Deleting…" : `Delete ${name}`}
      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-red/25 text-red hover:bg-red-wash disabled:opacity-50">
      <Trash2 className={`h-4 w-4 ${pending ? "animate-pulse" : ""}`} />
    </button>
    {error && <span className="max-w-32 text-[10px] text-red">{error}</span>}
  </div>;
}
