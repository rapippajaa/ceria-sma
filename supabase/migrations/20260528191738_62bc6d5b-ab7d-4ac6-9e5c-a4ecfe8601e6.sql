
insert into storage.buckets (id, name, public)
values ('berkas-ppdb', 'berkas-ppdb', true)
on conflict (id) do nothing;

create policy "Public can view berkas-ppdb"
  on storage.objects for select
  using (bucket_id = 'berkas-ppdb');

create policy "Anyone can upload berkas-ppdb"
  on storage.objects for insert
  with check (bucket_id = 'berkas-ppdb');
