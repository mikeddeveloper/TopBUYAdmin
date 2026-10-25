-- Run this AFTER creating your first staff user (Authentication -> Users
-- -> Add user) and AFTER confirming login works end to end.
--
-- It replaces the wide-open "anyone with the anon key" policies from
-- schema.sql with ones that require a signed-in session, so the admin
-- data is actually protected now that a real login screen exists.

drop policy if exists "dev: allow all on categories" on categories;
drop policy if exists "dev: allow all on products" on products;
drop policy if exists "dev: allow all on product_images" on product_images;
drop policy if exists "dev: allow all on product_variants" on product_variants;

create policy "staff: read/write categories" on categories
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "staff: read/write products" on products
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "staff: read/write product_images" on product_images
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "staff: read/write product_variants" on product_variants
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Storage: keep public read (so product photos still display without a
-- login, same as any normal storefront), but require a session to
-- upload, replace, or delete files.
drop policy if exists "dev: anon upload product-images" on storage.objects;
drop policy if exists "dev: anon update product-images" on storage.objects;
drop policy if exists "dev: anon delete product-images" on storage.objects;

create policy "staff: upload product-images" on storage.objects
  for insert with check (bucket_id = 'product-images' and auth.role() = 'authenticated');

create policy "staff: update product-images" on storage.objects
  for update using (bucket_id = 'product-images' and auth.role() = 'authenticated');

create policy "staff: delete product-images" on storage.objects
  for delete using (bucket_id = 'product-images' and auth.role() = 'authenticated');
