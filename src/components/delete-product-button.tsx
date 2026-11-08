"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, LoaderCircle, Trash2, X } from "lucide-react";
import { deleteProduct } from "@/app/(dashboard)/products/[id]/actions";

export function DeleteProductButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  function handleDelete() {
    setError(null);
    startTransition(async () => {
      const result = await deleteProduct(id);
      if (result.error) {
        setError(result.error);
        return;
      }
      setConfirmOpen(false);
      router.refresh();
    });
  }

  useEffect(() => {
    if (!confirmOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !pending) setConfirmOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [confirmOpen, pending]);

  return <div className="flex flex-col items-center gap-1">
    <button type="button" onClick={() => { setError(null); setConfirmOpen(true); }} aria-label={`Delete ${name}`} title={`Delete ${name}`}
      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-red/25 text-red hover:bg-red-wash disabled:opacity-50">
      <Trash2 className="h-4 w-4" />
    </button>
    {error && <span className="max-w-32 text-[10px] text-red">{error}</span>}
    {confirmOpen && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/45 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget && !pending) setConfirmOpen(false); }}>
      <section role="alertdialog" aria-modal="true" aria-labelledby={`delete-title-${id}`} aria-describedby={`delete-description-${id}`} className="w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-2xl">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-wash text-red"><AlertTriangle className="h-5 w-5" /></div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-4">
              <h2 id={`delete-title-${id}`} className="text-lg font-semibold text-ink">Delete product?</h2>
              <button type="button" onClick={() => setConfirmOpen(false)} disabled={pending} aria-label="Close dialog" className="rounded-lg p-1 text-ink-faint hover:bg-ink/5 disabled:opacity-50"><X className="h-4 w-4" /></button>
            </div>
            <p id={`delete-description-${id}`} className="mt-2 text-sm leading-relaxed text-ink-soft">
              <span className="font-medium text-ink">{name}</span> and its uploaded photos will be permanently deleted. This action can’t be undone.
            </p>
          </div>
        </div>
        {error && <p role="alert" className="mt-4 rounded-xl bg-red-wash px-3 py-2 text-sm text-red">{error}</p>}
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={() => setConfirmOpen(false)} disabled={pending} className="rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-ink-soft hover:bg-ink/3 disabled:opacity-50">Cancel</button>
          <button type="button" onClick={handleDelete} disabled={pending} className="inline-flex min-w-28 items-center justify-center gap-2 rounded-xl bg-red px-4 py-2.5 text-sm font-semibold text-white hover:bg-red/90 disabled:opacity-60">
            {pending ? <><LoaderCircle className="h-4 w-4 animate-spin" />Deleting</> : <><Trash2 className="h-4 w-4" />Delete product</>}
          </button>
        </div>
      </section>
    </div>}
  </div>;
}
