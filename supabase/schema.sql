-- Top Buy admin — initial schema
-- Paste this whole file into Supabase Dashboard → SQL Editor → Run.

create extension if not exists "pgcrypto";

-- ──────────────────────────────────────────────
-- Categories
-- ──────────────────────────────────────────────
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  subcategories text[] not null default '{}',
  created_at timestamptz not null default now()
);

-- ──────────────────────────────────────────────
-- Products
-- Prices are stored in kobo (₦1 = 100 kobo) to avoid rounding errors.
-- ──────────────────────────────────────────────
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  sku text,
  description text,
  category_id uuid references categories(id) on delete set null,
  brand text,
  price_kobo bigint not null default 0,
  sale_price_kobo bigint,
  stock integer not null default 0,
  low_stock_threshold integer not null default 5,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  show_on_home boolean not null default false,
  installment_enabled boolean not null default false,
  installment_months integer[] not null default '{}',
  min_deposit_percent integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_category_id_idx on products(category_id);
create index if not exists products_status_idx on products(status);

-- ──────────────────────────────────────────────
-- Product images
-- `url` points to a file in the `product-images` Storage bucket.
-- ──────────────────────────────────────────────
create table if not exists product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  url text not null,
  position integer not null default 0,
  is_cover boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists product_images_product_id_idx on product_images(product_id);

-- ──────────────────────────────────────────────
-- Product variants (size / color / storage combinations)
-- ──────────────────────────────────────────────
create table if not exists product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  label text not null,
  sku text,
  price_kobo bigint not null default 0,
  stock integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists product_variants_product_id_idx on product_variants(product_id);

-- ──────────────────────────────────────────────
-- updated_at trigger for products
-- ──────────────────────────────────────────────
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists products_set_updated_at on products;
create trigger products_set_updated_at
  before update on products
  for each row execute function set_updated_at();

-- ──────────────────────────────────────────────
-- Row Level Security
--
-- NOTE: no admin auth is wired up yet, so these policies leave every
-- table fully open to the anon key just to unblock building the admin
-- UI against real data. Before this app is reachable by anyone other
-- than you, replace these with policies scoped to an authenticated
-- staff role (see src/app/login) and lock Storage uploads down too.
-- ──────────────────────────────────────────────
alter table categories enable row level security;
alter table products enable row level security;
alter table product_images enable row level security;
alter table product_variants enable row level security;

create policy "dev: allow all on categories" on categories for all using (true) with check (true);
create policy "dev: allow all on products" on products for all using (true) with check (true);
create policy "dev: allow all on product_images" on product_images for all using (true) with check (true);
create policy "dev: allow all on product_variants" on product_variants for all using (true) with check (true);

-- ──────────────────────────────────────────────
-- Seed data — matches the sample data already shown in the UI
-- ──────────────────────────────────────────────
insert into categories (name, subcategories) values
  ('Gadgets', array['Audio', 'Phones', 'Wearables', 'Laptops']),
  ('Fashion', array['Men', 'Women', 'Shoes', 'Kids']),
  ('Accessories', array['Bags', 'Cases', 'Belts', 'Jewelry'])
on conflict (name) do nothing;

-- ──────────────────────────────────────────────
-- Storage policies for the `product-images` bucket.
-- Create the bucket itself in Dashboard → Storage first (name it exactly
-- "product-images", mark it public), then run this.
-- Same caveat as above: wide open until real auth exists.
-- ──────────────────────────────────────────────
create policy "dev: public read product-images"
  on storage.objects for select
  using (bucket_id = 'product-images');

create policy "dev: anon upload product-images"
  on storage.objects for insert
  with check (bucket_id = 'product-images');

create policy "dev: anon update product-images"
  on storage.objects for update
  using (bucket_id = 'product-images');

create policy "dev: anon delete product-images"
  on storage.objects for delete
  using (bucket_id = 'product-images');
