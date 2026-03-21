-- 1. Erstelle den Bucket 'company-images'
-- Hinweis: Dies muss evtl. manuell im Dashboard gemacht werden, falls SQL-Zugriff eingeschränkt ist.
insert into storage.buckets (id, name, public) 
values ('company-images', 'company-images', true)
on conflict (id) do nothing;

-- 2. Erlaube öffentlichen Lesezugriff auf alle Dateien
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'company-images' );

-- 3. Erlaube anonymen Upload (Nur für Demo-Zwecke! In Phase 4 ändern wir das auf Auth-Only)
create policy "Public Upload"
on storage.objects for insert
with check ( bucket_id = 'company-images' );

-- 4. Erlaube anonymes Löschen/Update (Nur für Demo!)
create policy "Public Update"
on storage.objects for update
using ( bucket_id = 'company-images' );

create policy "Public Delete"
on storage.objects for delete
using ( bucket_id = 'company-images' );
