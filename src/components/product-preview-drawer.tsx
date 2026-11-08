"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { formatNaira } from "@/lib/utils";
import type { Category } from "@/lib/supabase/types";

type PreviewValues = {
  name: string;
  description: string;
  brand: string;
  categoryId: string;
  price: string;
  salePrice: string;
  stock: string;
  status: string;
  images: File[];
};

export function ProductPreviewDrawer({ categories }: { categories: Category[] }) {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<PreviewValues>({
    name: "", description: "", brand: "", categoryId: categories[0]?.id ?? "",
    price: "", salePrice: "", stock: "", status: "draft", images: [],
  });

  useEffect(() => {
    const form = document.querySelector<HTMLFormElement>("[data-product-form]");
    if (!form) return;

    const update = () => {
      const data = new FormData(form);
      const files = data.getAll("images").filter((entry): entry is File => entry instanceof File && entry.size > 0);
      setValues({
        name: String(data.get("name") ?? ""),
        description: String(data.get("description") ?? ""),
        brand: String(data.get("brand") ?? ""),
        categoryId: String(data.get("category_id") ?? ""),
        price: String(data.get("price") ?? ""),
        salePrice: String(data.get("sale_price") ?? ""),
        stock: String(data.get("stock") ?? ""),
        status: String(data.get("status") ?? "draft"),
        images: files,
      });
    };

    form.addEventListener("input", update);
    form.addEventListener("change", update);
    update();
    return () => {
      form.removeEventListener("input", update);
      form.removeEventListener("change", update);
    };
  }, []);

  const category = categories.find((item) => item.id === values.categoryId);
  const imageUrl = values.images[0] ? URL.createObjectURL(values.images[0]) : null;
  const price = Number(values.price);
  const salePrice = Number(values.salePrice);

  return <>
    <button type="button" onClick={() => setOpen(true)} className="w-full rounded-xl border border-border bg-surface py-2.5 text-sm font-medium text-ink hover:bg-ink/3">
      Preview in app
    </button>

    {open && <div className="fixed inset-0 z-50 flex justify-end bg-ink/40" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
      <aside role="dialog" aria-modal="true" aria-label="Product app preview" className="flex h-full w-full max-w-md flex-col bg-canvas shadow-2xl">
        <header className="flex items-center justify-between border-b border-border bg-surface px-5 py-4">
          <div><p className="text-sm font-semibold text-ink">App preview</p><p className="text-xs text-ink-soft">Live preview of the product page</p></div>
          <button type="button" aria-label="Close preview" onClick={() => setOpen(false)} className="rounded-lg p-2 text-ink-soft hover:bg-ink/5"><X className="h-5 w-5" /></button>
        </header>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-[330px] overflow-hidden rounded-[30px] border-[7px] border-sidebar bg-white shadow-xl">
            <div className="flex items-center justify-between bg-white px-4 py-3"><span className="text-sm font-bold tracking-wide text-brand">TOPBUY</span><span className="text-xs text-ink-soft">♡　Bag</span></div>
            <div className="aspect-square bg-canvas">
              {imageUrl ? <img src={imageUrl} alt={values.name || "Product preview"} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-sm text-ink-faint">Product photo preview</div>}
            </div>
            <div className="space-y-3 p-4">
              <p className="text-xs text-ink-soft">{category?.name || "Category"}{values.brand ? ` · ${values.brand}` : ""}</p>
              <h2 className="text-lg font-semibold leading-snug text-ink">{values.name || "Product name"}</h2>
              <div className="flex items-baseline gap-2">
                {salePrice > 0 ? <><span className="text-lg font-bold text-ink">{formatNaira(salePrice)}</span><span className="text-sm text-ink-faint line-through">{formatNaira(price || 0)}</span></> : <span className="text-lg font-bold text-ink">{price > 0 ? formatNaira(price) : "Price"}</span>}
              </div>
              <p className="text-sm leading-relaxed text-ink-soft">{values.description || "Product description will appear here."}</p>
              <p className="text-xs text-ink-soft">{Number(values.stock) > 0 ? "In stock" : "Stock availability will appear here"}</p>
              <button type="button" disabled={values.status !== "published"} className="w-full rounded-xl bg-brand py-3 text-sm font-semibold text-white disabled:opacity-50">
                {values.status === "published" ? "Add to bag" : "Preview only · not published"}
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>}
  </>;
}
