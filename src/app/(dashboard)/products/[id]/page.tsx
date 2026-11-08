import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { Card } from "@/components/card";
import { Checkbox } from "@/components/checkbox";
import { CategoryFields } from "@/components/category-fields";
import { ImageUploadField } from "@/components/image-upload-field";
import { getCategories } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";
import { updateProduct } from "./actions";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-1.5 text-sm font-medium text-ink-soft">{children}</p>;
}

function TextInput({ name, type = "text", defaultValue, placeholder, step }: {
  name: string; type?: string; defaultValue?: string | number; placeholder?: string; step?: string;
}) {
  return <input type={type} name={name} step={step} defaultValue={defaultValue} placeholder={placeholder}
    className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-brand/25" />;
}

function Select({ name, defaultValue, children }: { name: string; defaultValue: string; children: React.ReactNode }) {
  return <select name={name} defaultValue={defaultValue} className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-ink">{children}</select>;
}

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const [{ data: product, error }, categories] = await Promise.all([
    supabase.from("products").select("*, product_images(*)").eq("id", id).maybeSingle(),
    getCategories(),
  ]);
  if (error) throw error;
  if (!product) notFound();

  const images = [...(product.product_images ?? [])].sort((a, b) => a.position - b.position);
  const save = updateProduct.bind(null, id);

  return <div className="flex flex-col gap-6">
    <div>
      <div className="flex items-center gap-1.5 text-sm text-ink-soft"><Link href="/products" className="hover:underline">Products</Link><ChevronRight className="h-3.5 w-3.5" /><span>Edit product</span></div>
      <h1 className="mt-1 text-[26px] font-semibold tracking-tight text-ink">Edit product</h1>
      <p className="mt-1 text-sm text-ink-soft">Update details and photos for {product.name}.</p>
    </div>

    <form action={save} encType="multipart/form-data" className="grid grid-cols-3 gap-6">
      <div className="col-span-2 flex flex-col gap-6">
        <Card>
          <h2 className="text-base font-semibold text-ink">Basic information</h2>
          <div className="mt-4 flex flex-col gap-4">
            <div><FieldLabel>Product name</FieldLabel><TextInput name="name" defaultValue={product.name} /></div>
            <div><FieldLabel>Description</FieldLabel><textarea name="description" rows={3} defaultValue={product.description ?? ""} className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-ink" /></div>
            <div className="grid grid-cols-3 gap-4">
              <CategoryFields categories={categories} defaultCategoryId={product.category_id} />
              <div><FieldLabel>Brand</FieldLabel><TextInput name="brand" defaultValue={product.brand ?? ""} /></div>
            </div>
          </div>
        </Card>
        <Card>
          <h2 className="text-base font-semibold text-ink">Images</h2>
          <p className="mt-1 text-sm text-ink-soft">Remove existing photos or add new ones. The first remaining image becomes the cover.</p>
          <ImageUploadField initialImages={images} />
        </Card>
      </div>

      <div className="flex flex-col gap-6">
        <Card>
          <h2 className="text-base font-semibold text-ink">Status</h2>
          <div className="mt-4"><FieldLabel>Visibility in the app</FieldLabel><Select name="status" defaultValue={product.status}><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></Select></div>
          <Checkbox name="show_on_home" label="Show on the home screen" defaultChecked={product.show_on_home} className="mt-4" />
          <button type="submit" className="mt-5 w-full rounded-xl bg-brand py-2.5 text-sm font-medium text-white hover:bg-brand-deep">Save changes</button>
          <Link href="/products" className="mt-3 block text-center text-sm text-ink-soft hover:underline">Cancel</Link>
        </Card>
        <Card>
          <h2 className="text-base font-semibold text-ink">Pricing</h2>
          <div className="mt-4 flex flex-col gap-4">
            <div><FieldLabel>Price (₦)</FieldLabel><TextInput name="price" type="number" step="0.01" defaultValue={(product.price_kobo / 100).toFixed(2)} /></div>
            <div><FieldLabel>Sale price (₦), optional</FieldLabel><TextInput name="sale_price" type="number" step="0.01" defaultValue={product.sale_price_kobo == null ? "" : (product.sale_price_kobo / 100).toFixed(2)} /></div>
          </div>
        </Card>
        <Card className="border-brand/25 bg-brand-wash/60">
          <div className="flex items-center justify-between"><h2 className="text-base font-semibold text-ink">Pay with TracPay</h2><Checkbox name="installment_enabled" defaultChecked={product.installment_enabled} /></div>
          <div className="mt-4 flex flex-col gap-2.5">
            <Checkbox name="installment_months" value="3" label="3 months" defaultChecked={product.installment_months.includes(3)} />
            <Checkbox name="installment_months" value="6" label="6 months" defaultChecked={product.installment_months.includes(6)} />
            <Checkbox name="installment_months" value="12" label="12 months" defaultChecked={product.installment_months.includes(12)} />
          </div>
          <div className="mt-4"><FieldLabel>Minimum deposit (%)</FieldLabel><TextInput name="min_deposit_percent" type="number" defaultValue={product.min_deposit_percent ?? ""} /></div>
        </Card>
        <Card>
          <h2 className="text-base font-semibold text-ink">Inventory</h2>
          <div className="mt-4 flex flex-col gap-4">
            <div><FieldLabel>Base SKU</FieldLabel><TextInput name="sku" defaultValue={product.sku ?? ""} /></div>
            <div><FieldLabel>Stock</FieldLabel><TextInput name="stock" type="number" defaultValue={product.stock} /></div>
            <div><FieldLabel>Alert me when stock is below</FieldLabel><TextInput name="low_stock_threshold" type="number" defaultValue={product.low_stock_threshold} /></div>
          </div>
        </Card>
      </div>
    </form>
  </div>;
}
