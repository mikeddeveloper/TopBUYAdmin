import Link from "next/link";
import { ChevronRight, ChevronDown } from "lucide-react";
import { Card } from "@/components/card";
import { Checkbox } from "@/components/checkbox";
import { CategoryFields } from "@/components/category-fields";
import { ImageUploadField } from "@/components/image-upload-field";
import { getCategories } from "@/lib/supabase/queries";
import { createProduct } from "./actions";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-1.5 text-sm font-medium text-ink-soft">{children}</p>;
}

function TextInput({
  name,
  type = "text",
  defaultValue,
  placeholder,
  step,
}: {
  name: string;
  type?: string;
  defaultValue?: string;
  placeholder?: string;
  step?: string;
}) {
  return (
    <input
      type={type}
      name={name}
      step={step}
      defaultValue={defaultValue}
      placeholder={placeholder}
      className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-brand/25"
    />
  );
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

export default async function AddProductPage() {
  const categories = await getCategories();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-1.5 text-sm text-ink-soft">
            <Link href="/products" className="hover:underline">
              Products
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span>Add product</span>
          </div>
          <h1 className="mt-1 text-[26px] font-semibold tracking-tight text-ink">
            Add product
          </h1>
        </div>
      </div>

      {categories.length === 0 ? (
        <Card className="flex flex-col items-center gap-3 py-16 text-center">
          <p className="text-base font-semibold text-ink">Add a category first</p>
          <p className="max-w-sm text-sm text-ink-soft">
            Products need a category to belong to.
          </p>
          <Link
            href="/categories"
            className="mt-1 rounded-xl bg-brand px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-deep"
          >
            Go to Categories
          </Link>
        </Card>
      ) : (
        <form action={createProduct} className="grid grid-cols-3 gap-6">
          <div className="col-span-2 flex flex-col gap-6">
            <Card>
              <h2 className="text-base font-semibold text-ink">Basic information</h2>
              <div className="mt-4 flex flex-col gap-4">
                <div>
                  <FieldLabel>Product name</FieldLabel>
                  <TextInput name="name" placeholder="e.g. Leather handbag" />
                </div>
                <div>
                  <FieldLabel>Description</FieldLabel>
                  <textarea
                    name="description"
                    rows={3}
                    placeholder="What makes this product worth buying?"
                    className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-brand/25"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <CategoryFields categories={categories} />
                  <div>
                    <FieldLabel>Brand</FieldLabel>
                    <TextInput name="brand" placeholder="House brand" />
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <h2 className="text-base font-semibold text-ink">Images</h2>
              <p className="mt-1 text-sm text-ink-soft">
                The first image is the cover. JPG or PNG, as many as you need.
              </p>
              <ImageUploadField />
            </Card>

            <Card>
              <h2 className="text-base font-semibold text-ink">Variants</h2>
              <p className="mt-1 text-sm text-ink-soft">
                Sizes, colors, storage — coming soon. For now, set a single price and
                stock count for this product below.
              </p>
            </Card>
          </div>

          <div className="flex flex-col gap-6">
            <Card>
              <h2 className="text-base font-semibold text-ink">Status</h2>
              <div className="mt-4">
                <FieldLabel>Visibility in the app</FieldLabel>
                <SelectShell>
                  <select name="status" defaultValue="draft" className={selectClass}>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </SelectShell>
              </div>
              <Checkbox name="show_on_home" label="Show on the home screen" className="mt-4" />

              <div className="mt-5 flex items-center gap-3 border-t border-border-soft pt-5">
                <button
                  type="submit"
                  name="intent"
                  value="draft"
                  className="flex-1 rounded-xl border border-border bg-surface py-2.5 text-sm font-medium text-ink-soft hover:bg-ink/3"
                >
                  Save as draft
                </button>
                <button
                  type="submit"
                  name="intent"
                  value="publish"
                  className="flex-1 rounded-xl bg-brand py-2.5 text-sm font-medium text-white hover:bg-brand-deep"
                >
                  Publish
                </button>
              </div>
            </Card>

            <Card>
              <h2 className="text-base font-semibold text-ink">Pricing</h2>
              <div className="mt-4 flex flex-col gap-4">
                <div>
                  <FieldLabel>Price (₦)</FieldLabel>
                  <TextInput name="price" type="number" step="0.01" placeholder="64000" />
                </div>
                <div>
                  <FieldLabel>Sale price (₦), optional</FieldLabel>
                  <TextInput name="sale_price" type="number" step="0.01" placeholder="Leave empty for no sale" />
                </div>
                <p className="text-xs text-ink-faint">
                  Prices are saved in kobo on the server, so there are no rounding errors.
                </p>
              </div>
            </Card>

            <Card className="border-brand/25 bg-brand-wash/60">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-ink">Pay with TracPay</h2>
                <Checkbox name="installment_enabled" defaultChecked />
              </div>
              <p className="mt-1 text-sm text-ink-soft">
                Let customers pay a deposit now and the rest over time with TracPay.
              </p>

              <div className="mt-4 flex flex-col gap-2.5">
                <Checkbox name="installment_months" value="3" label="3 months" defaultChecked />
                <Checkbox name="installment_months" value="6" label="6 months" defaultChecked />
                <Checkbox name="installment_months" value="12" label="12 months" />
              </div>

              <div className="mt-4">
                <FieldLabel>Minimum deposit (%)</FieldLabel>
                <TextInput name="min_deposit_percent" type="number" defaultValue="30" />
              </div>
            </Card>

            <Card>
              <h2 className="text-base font-semibold text-ink">Inventory</h2>
              <div className="mt-4 flex flex-col gap-4">
                <div>
                  <FieldLabel>Base SKU</FieldLabel>
                  <TextInput name="sku" placeholder="Auto-generated if left blank" />
                  <p className="mt-1.5 text-xs text-ink-faint">
                    We&apos;ll generate one for you based on the category and product name —
                    only fill this in if you want a specific code.
                  </p>
                </div>
                <div>
                  <FieldLabel>Stock</FieldLabel>
                  <TextInput name="stock" type="number" placeholder="0" />
                </div>
                <div>
                  <FieldLabel>Alert me when stock is below</FieldLabel>
                  <TextInput name="low_stock_threshold" type="number" defaultValue="5" />
                </div>
              </div>
            </Card>
          </div>
        </form>
      )}
    </div>
  );
}
