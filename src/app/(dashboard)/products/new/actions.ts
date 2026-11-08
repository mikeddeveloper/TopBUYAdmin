"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function letters(value: string, length: number) {
  const clean = value.replace(/[^a-zA-Z]/g, "").toUpperCase();
  return (clean || "GEN").slice(0, length).padEnd(length, "X");
}

async function generateSku(
  supabase: Awaited<ReturnType<typeof createClient>>,
  productName: string,
  categoryId: string | null
) {
  let categoryPrefix = "GN";
  if (categoryId) {
    const { data: category } = await supabase
      .from("categories")
      .select("name")
      .eq("id", categoryId)
      .single();
    if (category?.name) categoryPrefix = letters(category.name, 2);
  }

  const namePrefix = letters(productName, 3);

  const { count } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true })
    .eq("category_id", categoryId);

  const sequence = String((count ?? 0) + 1).padStart(3, "0");

  return `${categoryPrefix}-${namePrefix}-${sequence}`;
}

export async function createProduct(formData: FormData) {
  const supabase = await createClient();

  const name = String(formData.get("name") ?? "").trim();
  if (!name) {
    throw new Error("Product name is required");
  }

  const categoryId = String(formData.get("category_id") ?? "") || null;
  const skuInput = String(formData.get("sku") ?? "").trim();
  const sku = skuInput || (await generateSku(supabase, name, categoryId));

  const priceNaira = Number(formData.get("price") ?? 0);
  const salePriceRaw = formData.get("sale_price");
  const salePriceNaira = salePriceRaw ? Number(salePriceRaw) : null;

  const installmentEnabled = formData.get("installment_enabled") === "on";
  const installmentMonths = formData
    .getAll("installment_months")
    .map((value) => Number(value))
    .filter((value) => !Number.isNaN(value));
  const minDepositRaw = formData.get("min_deposit_percent");

  const intent = formData.get("intent");
  let status = String(formData.get("status") ?? "draft");
  if (intent === "draft") status = "draft";
  if (intent === "publish") status = "published";

  const { data: product, error: insertError } = await supabase
    .from("products")
    .insert({
      name,
      description: String(formData.get("description") ?? "") || null,
      category_id: categoryId,
      brand: String(formData.get("brand") ?? "") || null,
      sku,
      price_kobo: Math.round(priceNaira * 100),
      sale_price_kobo: salePriceNaira ? Math.round(salePriceNaira * 100) : null,
      stock: Number(formData.get("stock") ?? 0),
      low_stock_threshold: Number(formData.get("low_stock_threshold") ?? 5),
      status,
      show_on_home: formData.get("show_on_home") === "on",
      installment_enabled: installmentEnabled,
      installment_months: installmentEnabled ? installmentMonths : [],
      min_deposit_percent: minDepositRaw ? Number(minDepositRaw) : null,
    })
    .select()
    .single();

  if (insertError || !product) {
    throw new Error(insertError?.message ?? "Could not create product");
  }

  const images = formData
    .getAll("images")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);

  for (let i = 0; i < images.length; i++) {
    const file = images[i];
    const extension = file.name.split(".").pop() ?? "jpg";
    const path = `${product.id}/${crypto.randomUUID()}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(path, file, { contentType: file.type });

    if (uploadError) {
      throw new Error(`Product was created, but image upload failed: ${uploadError.message}`);
    }

    const { data: publicUrlData } = supabase.storage.from("product-images").getPublicUrl(path);

    const { error: imageRecordError } = await supabase.from("product_images").insert({
      product_id: product.id,
      url: publicUrlData.publicUrl,
      position: i,
      is_cover: i === 0,
    });
    if (imageRecordError) {
      throw new Error(`Product was created, but saving its image failed: ${imageRecordError.message}`);
    }
  }

  revalidatePath("/products");
  revalidatePath("/");
  redirect("/products");
}
