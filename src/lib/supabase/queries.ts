import { createClient } from "@/lib/supabase/server";
import type { Category, ProductWithRelations } from "@/lib/supabase/types";

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error) throw error;
  return data ?? [];
}

export async function getProducts(): Promise<ProductWithRelations[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, category:categories(id, name), product_images(*)")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as unknown as ProductWithRelations[];
}
