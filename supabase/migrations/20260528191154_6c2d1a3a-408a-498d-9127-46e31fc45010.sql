
CREATE SEQUENCE IF NOT EXISTS public.pendaftaran_seq START 1;

CREATE TABLE public.pendaftaran (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nomor_pendaftaran text UNIQUE NOT NULL DEFAULT ('SMPB2025' || lpad(nextval('public.pendaftaran_seq')::text, 4, '0')),
  nama text NOT NULL,
  nisn text NOT NULL,
  tempat_lahir text,
  tgl_lahir date,
  jenis_kelamin text,
  alamat text,
  nama_ayah text,
  nama_ibu text,
  pekerjaan_ayah text,
  pekerjaan_ibu text,
  no_hp text,
  ijazah text,
  akta text,
  kk text,
  foto text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER SEQUENCE public.pendaftaran_seq OWNED BY public.pendaftaran.nomor_pendaftaran;

GRANT SELECT, INSERT ON public.pendaftaran TO anon, authenticated;
GRANT USAGE ON SEQUENCE public.pendaftaran_seq TO anon, authenticated;
GRANT ALL ON public.pendaftaran TO service_role;
GRANT ALL ON SEQUENCE public.pendaftaran_seq TO service_role;

ALTER TABLE public.pendaftaran ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit registration"
  ON public.pendaftaran FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
