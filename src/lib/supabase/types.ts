export type ProductStatus = "draft" | "published" | "archived";

export type Category = {
  id: string;
  name: string;
  subcategories: string[];
  created_at: string;
};

export type Product = {
  id: string;
  name: string;
  sku: string | null;
  description: string | null;
  category_id: string | null;
  brand: string | null;
  price_kobo: number;
  sale_price_kobo: number | null;
  stock: number;
  low_stock_threshold: number;
  status: ProductStatus;
  show_on_home: boolean;
  installment_enabled: boolean;
  installment_months: number[];
  min_deposit_percent: number | null;
  created_at: string;
  updated_at: string;
};

export type ProductImage = {
  id: string;
  product_id: string;
  url: string;
  position: number;
  is_cover: boolean;
  created_at: string;
};

export type ProductWithRelations = Product & {
  category: Pick<Category, "id" | "name"> | null;
  product_images: ProductImage[];
};
