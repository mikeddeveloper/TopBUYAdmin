import { Cpu, Shirt, ShoppingBag, Layers, type LucideIcon } from "lucide-react";
import { meshes } from "@/components/product-art";
import { AddCategoryForm } from "@/components/add-category-form";
import { getCategories } from "@/lib/supabase/queries";

const categoryIcons: Record<string, LucideIcon> = {
  Gadgets: Cpu,
  Fashion: Shirt,
  Accessories: ShoppingBag,
};

const highlight = "radial-gradient(120% 120% at 15% 10%, rgba(255,255,255,0.22), transparent 55%)";

export default async function CategoriesPage() {
  const categories = await getCategories();
  const subcategoryCount = categories.reduce((sum, c) => sum + c.subcategories.length, 0);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-[26px] font-semibold tracking-tight text-ink">
            Categories
          </h1>
          <p className="mt-1 text-sm text-ink-soft">
            {categories.length} top-level categories · {subcategoryCount} sub-categories
          </p>
        </div>
        <AddCategoryForm />
      </div>

      {categories.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-surface py-20 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-wash text-brand-deep">
            <Layers className="h-6 w-6" strokeWidth={1.75} />
          </div>
          <p className="text-base font-semibold text-ink">No categories yet</p>
          <p className="max-w-sm text-sm text-ink-soft">
            Add your first category to start organizing products.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = categoryIcons[category.name] ?? Layers;
            return (
              <div
                key={category.id}
                className="bg-grain card-lift relative flex h-56 flex-col justify-end overflow-hidden rounded-2xl shadow-[0_2px_8px_-2px_rgba(14,16,19,0.25)]"
                style={{ backgroundImage: `${highlight}, ${meshes[index % meshes.length]}` }}
              >
                <Icon
                  className="pointer-events-none absolute -top-3 -right-3 text-white/10"
                  width={88}
                  height={88}
                  strokeWidth={1}
                />
                <div className="absolute top-4 left-4 flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 text-white ring-1 ring-white/20 backdrop-blur-sm">
                  <Icon className="h-4.5 w-4.5" strokeWidth={1.75} />
                </div>

                <div className="relative bg-linear-to-t from-black/80 via-black/20 to-transparent px-5 pt-10 pb-4">
                  <h2 className="text-lg font-semibold text-white">{category.name}</h2>
                  <p className="font-figure mt-0.5 text-sm text-white/70">
                    {category.subcategories.length} subcategories
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {category.subcategories.map((sub) => (
                      <span
                        key={sub}
                        className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-xs font-medium text-white/90 backdrop-blur-sm"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
