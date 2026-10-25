"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function createCategory(formData: FormData) {
  const supabase = await createClient();

  const name = String(formData.get("name") ?? "").trim();
  if (!name) {
    throw new Error("Category name is required");
  }

  const subcategories = String(formData.get("subcategories") ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  const { error } = await supabase.from("categories").insert({ name, subcategories });
  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/categories");
  revalidatePath("/products/new");
}
