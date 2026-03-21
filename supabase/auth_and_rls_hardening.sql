-- 1. Bestehende (anonyme) Policies entfernen
drop policy if exists "Enable all for anyone" on public.companies;

-- 2. "Read-Only" für alle (auch nicht eingeloggt)
create policy "Public Read Access"
on public.companies for select
using ( true );

-- 3. Schreibzugriff NUR für eingeloggte Administratoren
create policy "Admin Insert Access"
on public.companies for insert
with check ( auth.role() = 'authenticated' );

create policy "Admin Update Access"
on public.companies for update
using ( auth.role() = 'authenticated' );

create policy "Admin Delete Access"
on public.companies for delete
using ( auth.role() = 'authenticated' );

-- 4. Storage Bucket ebenfalls absichern (Bilder-Upload nur für Admins)
drop policy if exists "Public Upload" on storage.objects;
drop policy if exists "Public Update" on storage.objects;
drop policy if exists "Public Delete" on storage.objects;

create policy "Admin Upload"
on storage.objects for insert
with check ( bucket_id = 'company-images' AND auth.role() = 'authenticated' );

create policy "Admin Update"
on storage.objects for update
using ( bucket_id = 'company-images' AND auth.role() = 'authenticated' );

create policy "Admin Delete"
on storage.objects for delete
using ( bucket_id = 'company-images' AND auth.role() = 'authenticated' );
