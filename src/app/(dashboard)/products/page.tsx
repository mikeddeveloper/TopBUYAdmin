import Link from "next/link";
import { Upload, Plus, Search, ChevronDown, Package } from "lucide-react";
import { Card } from "@/components/card";
import { StatusBadge } from "@/components/status-badge";
import { ProductArt } from "@/components/product-art";
import { Checkbox } from "@/components/checkbox";
import { getCategories, getProducts } from "@/lib/supabase/queries";
import { formatNaira } from "@/lib/utils";
import { productIcon } from "@/lib/product-icon";
import type { ProductStatus } from "@/lib/supabase/types";
import { DeleteProductButton } from "@/components/delete-product-button";

const statusLabel: Record<ProductStatus, string> = {
  draft: "Draft",
  published: "Published",
  archived: "Archived",
};

function FilterSelect({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mb-1.5 text-sm font-medium text-ink-soft">{label}</p>
      <button className="flex w-44 items-center justify-between rounded-xl border border-border bg-surface px-3 py-2.5 text-sm text-ink">
        {value}
        <ChevronDown className="h-4 w-4 text-ink-faint" />
      </button>
    </div>
  );
}

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  const categoryTabs = [
    { label: "All", count: products.length },
    ...categories.map((category) => ({
      label: category.name,
      count: products.filter((p) => p.category_id === category.id).length,
    })),
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-[26px] font-semibold tracking-tight text-ink">
            Products
          </h1>
          <p className="mt-1 text-sm text-ink-soft">{products.length} products</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium text-ink-soft hover:bg-ink/3">
            <Upload className="h-4 w-4" />
            Import CSV
          </button>
          <Link
            href="/products/new"
            className="flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-deep"
          >
            <Plus className="h-4 w-4" />
            Add product
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {categoryTabs.map((tab, index) => (
          <button
            key={tab.label}
            className={
              index === 0
                ? "flex items-center gap-1.5 rounded-xl bg-ink px-4 py-2 text-sm font-medium text-white"
                : "flex items-center gap-1.5 rounded-xl border border-border bg-surface px-4 py-2 text-sm font-medium text-ink-soft hover:bg-ink/3"
            }
          >
            {tab.label}
            <span className={index === 0 ? "text-xs text-white/50" : "text-xs text-ink-faint"}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      <Card className="p-5">
        <div className="flex items-end gap-4">
          <div className="relative flex-1">
            <p className="mb-1.5 text-sm font-medium text-ink-soft">&nbsp;</p>
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-ink-faint" />
            <input
              type="text"
              placeholder="Search by name or SKU"
              className="w-full rounded-xl border border-border bg-surface py-2.5 pl-9 pr-3 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-brand/25"
            />
          </div>
          <FilterSelect label="Status" value="All statuses" />
          <FilterSelect label="Stock" value="Any stock" />
          <FilterSelect label="TracPay" value="Any" />
        </div>
      </Card>

      {products.length === 0 ? (
        <Card className="flex flex-col items-center justify-center gap-3 py-20 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-wash text-brand-deep">
            <Package className="h-6 w-6" strokeWidth={1.75} />
          </div>
          <p className="text-base font-semibold text-ink">No products yet</p>
          <p className="max-w-sm text-sm text-ink-soft">
            Add your first product — with real photos — to get started.
          </p>
          <Link
            href="/products/new"
            className="mt-2 flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-deep"
          >
            <Plus className="h-4 w-4" />
            Add product
          </Link>
        </Card>
      ) : (
        <Card className="p-0">
          <table className="w-full table-fixed border-collapse text-sm">
            <colgroup>
              <col className="w-12" />
              <col className="w-[26%]" />
              <col className="w-[16%]" />
              <col className="w-[12%]" />
              <col className="w-[12%]" />
              <col className="w-[14%]" />
              <col className="w-[11%]" />
              <col className="w-[9%]" />
            </colgroup>
            <thead>
              <tr className="border-b border-border-soft text-left text-xs font-medium text-ink-faint">
                <th className="py-4 pl-6">
                  <Checkbox />
                </th>
                <th className="px-4 py-4 font-medium">Product</th>
                <th className="px-4 py-4 font-medium">Category</th>
                <th className="px-4 py-4 text-right font-medium">Price</th>
                <th className="px-4 py-4 font-medium">Stock</th>
                <th className="px-4 py-4 font-medium">TracPay</th>
                <th className="px-4 py-4 font-medium">Status</th>
                <th className="py-4 pr-6 pl-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-soft">
              {products.map((product, index) => {
                const cover =
                  product.product_images.find((img) => img.is_cover) ?? product.product_images[0];
                const stockUrgent = product.stock === 0 || product.stock <= product.low_stock_threshold;
                const stockLabel =
                  product.stock === 0 ? "Sold out" : `${product.stock} in stock`;
                const installmentsLabel = product.installment_enabled
                  ? `Up to ${Math.max(...product.installment_months, 0)} months`
                  : "Not eligible";

                return (
                  <tr key={product.id} className="transition-colors hover:bg-ink/3">
                    <td className="py-4 pl-6">
                      <Checkbox />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        {cover ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={cover.url}
                            alt={product.name}
                            className="h-10 w-10 shrink-0 rounded-[10px] object-cover ring-1 ring-ink/8"
                          />
                        ) : (
                          <ProductArt icon={productIcon(product.name)} index={index} size="sm" />
                        )}
                        <div className="min-w-0">
                          <p className="truncate font-medium text-ink">{product.name}</p>
                          <p className="truncate text-xs text-ink-soft">{product.sku ?? "No SKU"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="truncate px-4 py-4 text-ink-soft">
                      {product.category?.name ?? "Uncategorized"}
                    </td>
                    <td className="font-figure px-4 py-4 text-right font-medium text-ink">
                      {formatNaira(product.price_kobo / 100)}
                    </td>
                    <td className={stockUrgent ? "px-4 py-4 font-medium text-red" : "px-4 py-4 text-ink-soft"}>
                      {stockLabel}
                    </td>
                    <td className="truncate px-4 py-4 text-ink-soft">{installmentsLabel}</td>
                    <td className="px-4 py-4">
                      <StatusBadge status={statusLabel[product.status]} />
                    </td>
                    <td className="py-4 pr-6 pl-4">
                      <div className="flex items-center gap-1.5">
                        <Link href={`/products/${product.id}`} className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-ink-soft hover:bg-ink/5">
                          Edit
                        </Link>
                        <DeleteProductButton id={product.id} name={product.name} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
