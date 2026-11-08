"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function value(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function updateProduct(id: string, formData: FormData) {
  const supabase = await createClient();
  const name = value(formData, "name");
  if (!name) throw new Error("Product name is required");

  const price = Number(formData.get("price") ?? 0);
  const salePriceRaw = value(formData, "sale_price");
  const installmentEnabled = formData.get("installment_enabled") === "on";
  const installmentMonths = formData.getAll("installment_months").map(Number).filter(Number.isFinite);
  const depositRaw = value(formData, "min_deposit_percent");

  const { error: updateError } = await supabase.from("products").update({
    name,
    description: value(formData, "description") || null,
    category_id: value(formData, "category_id") || null,
    brand: value(formData, "brand") || null,
    sku: value(formData, "sku") || null,
    price_kobo: Math.round(price * 100),
    sale_price_kobo: salePriceRaw ? Math.round(Number(salePriceRaw) * 100) : null,
    stock: Number(formData.get("stock") ?? 0),
    low_stock_threshold: Number(formData.get("low_stock_threshold") ?? 5),
    status: value(formData, "status") || "draft",
    show_on_home: formData.get("show_on_home") === "on",
    installment_enabled: installmentEnabled,
    installment_months: installmentEnabled ? installmentMonths : [],
    min_deposit_percent: depositRaw ? Number(depositRaw) : null,
  }).eq("id", id);

  if (updateError) throw new Error(updateError.message);

  const { data: currentImages, error: imagesError } = await supabase
    .from("product_images").select("id, url, position").eq("product_id", id);
  if (imagesError) throw new Error(imagesError.message);

  const keepIds = new Set(formData.getAll("keep_image_ids").map(String));
  const removed = (currentImages ?? []).filter((image) => !keepIds.has(image.id));
  if (removed.length) {
    const { error } = await supabase.from("product_images").delete().in("id", removed.map((image) => image.id));
    if (error) throw new Error(error.message);
    const storagePaths = removed.map((image) => image.url.split("/product-images/")[1]).filter(Boolean);
    if (storagePaths.length) await supabase.storage.from("product-images").remove(storagePaths);
  }

  const { data: remaining, error: remainingError } = await supabase
    .from("product_images").select("id, position").eq("product_id", id).order("position");
  if (remainingError) throw new Error(remainingError.message);
  const nextPosition = remaining?.length ?? 0;

  const newFiles = formData.getAll("images").filter((entry): entry is File => entry instanceof File && entry.size > 0);
  const added = [] as { url: string; position: number }[];
  for (let i = 0; i < newFiles.length; i++) {
    const file = newFiles[i];
    const extension = file.name.split(".").pop()?.replace(/[^a-zA-Z0-9]/g, "") || "jpg";
    const path = `${id}/${crypto.randomUUID()}.${extension}`;
    const { error } = await supabase.storage.from("product-images").upload(path, file, { contentType: file.type });
    if (error) throw new Error(`Image upload failed: ${error.message}`);
    added.push({ url: supabase.storage.from("product-images").getPublicUrl(path).data.publicUrl, position: nextPosition + i });
  }

  const firstAddedImagePath = added[0]?.url.split("/product-images/")[1];

  if (added.length) {
    const { error } = await supabase.from("product_images").insert(added.map((image) => ({
      product_id: id,
      url: image.url,
      position: image.position,
      is_cover: image.position === 0,
    })));
    if (error) {
      if (firstAddedImagePath) {
        await supabase.storage.from("product-images").remove(added.map((image) => image.url.split("/product-images/")[1]).filter(Boolean));
      }
      throw new Error(error.message);
    }
  }

  const { data: ordered, error: orderedError } = await supabase
    .from("product_images").select("id").eq("product_id", id).order("position");
  if (orderedError) throw new Error(orderedError.message);
  for (let index = 0; index < (ordered ?? []).length; index++) {
    const { error } = await supabase.from("product_images").update({ position: index, is_cover: index === 0 }).eq("id", ordered![index].id);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/products");
  revalidatePath(`/products/${id}`);
  revalidatePath("/");
  redirect("/products");
}
