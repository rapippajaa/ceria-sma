import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useState } from "react";
import { Check, ChevronLeft, ChevronRight, User, Users, Upload, ClipboardCheck, CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/pendaftaran")({
  head: () => ({
    meta: [
      { title: "Pendaftaran — SPMB SMA" },
      { name: "description", content: "Form pendaftaran murid baru SMA dalam 4 langkah mudah." },
    ],
  }),
  component: Pendaftaran,
});

const steps = [
  { id: 1, label: "Data Pribadi", icon: User },
  { id: 2, label: "Data Orang Tua", icon: Users },
  { id: 3, label: "Upload Berkas", icon: Upload },
  { id: 4, label: "Konfirmasi", icon: ClipboardCheck },
];

type FormData = {
  nama: string;
  nisn: string;
  tempatLahir: string;
  tglLahir: string;
  jk: string;
  alamat: string;
  namaAyah: string;
  namaIbu: string;
  pekerjaanAyah: string;
  pekerjaanIbu: string;
  noHp: string;
  ijazah: string;
  akta: string;
  kk: string;
  foto: string;
};

const initial: FormData = {
  nama: "", nisn: "", tempatLahir: "", tglLahir: "", jk: "", alamat: "",
  namaAyah: "", namaIbu: "", pekerjaanAyah: "", pekerjaanIbu: "", noHp: "",
  ijazah: "", akta: "", kk: "", foto: "",
};

function Pendaftaran() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(initial);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nomor, setNomor] = useState<string | null>(null);

  const update = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setData((d) => ({ ...d, [k]: e.target.value }));

  const progress = (step / steps.length) * 100;

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    const { data: row, error: err } = await supabase
      .from("pendaftaran")
      .insert({
        nama: data.nama,
        nisn: data.nisn,
        tempat_lahir: data.tempatLahir || null,
        tgl_lahir: data.tglLahir || null,
        jenis_kelamin: data.jk || null,
        alamat: data.alamat || null,
        nama_ayah: data.namaAyah || null,
        nama_ibu: data.namaIbu || null,
        pekerjaan_ayah: data.pekerjaanAyah || null,
        pekerjaan_ibu: data.pekerjaanIbu || null,
        no_hp: data.noHp || null,
        ijazah: data.ijazah || null,
        akta: data.akta || null,
        kk: data.kk || null,
        foto: data.foto || null,
      })
      .select("nomor_pendaftaran")
      .single();
    setSubmitting(false);
    if (err) {
      setError(err.message);
      return;
    }
    setNomor(row?.nomor_pendaftaran ?? null);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-xl px-4 py-24 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-glow)]">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Pendaftaran Berhasil!</h1>
          <p className="mt-3 text-muted-foreground">
            Terima kasih, <span className="font-semibold text-foreground">{data.nama || "Calon Murid"}</span>.
          </p>
          {nomor && (
            <div className="mt-6 inline-block rounded-lg border border-primary/30 bg-primary/5 px-6 py-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Nomor Pendaftaran</p>
              <p className="mt-1 text-2xl font-bold text-primary">{nomor}</p>
            </div>
          )}
          <p className="mt-6 text-sm text-muted-foreground">Simpan nomor pendaftaran Anda untuk memantau status seleksi.</p>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-bold text-foreground md:text-4xl">Form Pendaftaran</h1>
        <p className="mt-2 text-muted-foreground">Lengkapi {steps.length} langkah berikut untuk mendaftar.</p>

        {/* Stepper */}
        <div className="mt-8">
          <div className="flex items-center justify-between">
            {steps.map((s, i) => {
              const done = step > s.id;
              const active = step === s.id;
              const Icon = s.icon;
              return (
                <div key={s.id} className="flex flex-1 items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                        done
                          ? "border-primary bg-primary text-primary-foreground"
                          : active
                            ? "border-primary bg-background text-primary shadow-[var(--shadow-elegant)]"
                            : "border-border bg-background text-muted-foreground"
                      }`}
                    >
                      {done ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                    </div>
                    <span className={`mt-2 hidden text-xs font-medium md:block ${active || done ? "text-foreground" : "text-muted-foreground"}`}>
                      {s.label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`mx-2 h-0.5 flex-1 ${step > s.id ? "bg-primary" : "bg-border"}`} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Progress bar */}
          <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-[var(--gradient-primary)] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-right text-sm text-muted-foreground">
            Langkah {step} dari {steps.length} — {steps[step - 1].label}
          </p>
        </div>

        {/* Form card */}
        <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-elegant)] md:p-8">
          {step === 1 && (
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Nama Lengkap" value={data.nama} onChange={update("nama")} required />
              <Field label="NISN" value={data.nisn} onChange={update("nisn")} required />
              <Field label="Tempat Lahir" value={data.tempatLahir} onChange={update("tempatLahir")} />
              <Field label="Tanggal Lahir" type="date" value={data.tglLahir} onChange={update("tglLahir")} />
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Jenis Kelamin</label>
                <select value={data.jk} onChange={update("jk")} className={inputCls}>
                  <option value="">Pilih...</option>
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium text-foreground">Alamat</label>
                <textarea value={data.alamat} onChange={update("alamat")} rows={3} className={inputCls} />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Nama Ayah" value={data.namaAyah} onChange={update("namaAyah")} />
              <Field label="Nama Ibu" value={data.namaIbu} onChange={update("namaIbu")} />
              <Field label="Pekerjaan Ayah" value={data.pekerjaanAyah} onChange={update("pekerjaanAyah")} />
              <Field label="Pekerjaan Ibu" value={data.pekerjaanIbu} onChange={update("pekerjaanIbu")} />
              <Field label="No. HP Orang Tua" value={data.noHp} onChange={update("noHp")} />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Unggah berkas yang diminta. File akan tersimpan dengan aman.</p>
              <FileUpload
                label="Pas Foto 3x4"
                hint="Format JPG/PNG, maks. 2MB"
                accept="image/jpeg,image/png"
                maxMB={2}
                value={data.foto}
                onChange={(url) => setData((d) => ({ ...d, foto: url }))}
              />
              <FileUpload
                label="Scan Ijazah / SKHUN"
                hint="Format PDF/JPG, maks. 5MB"
                accept="application/pdf,image/jpeg"
                maxMB={5}
                value={data.ijazah}
                onChange={(url) => setData((d) => ({ ...d, ijazah: url }))}
              />
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Konfirmasi Data</h2>
              <p className="text-sm text-muted-foreground">Pastikan seluruh data berikut sudah benar.</p>
              <dl className="divide-y divide-border rounded-lg border border-border bg-secondary/30 text-sm">
                {[
                  ["Nama", data.nama], ["NISN", data.nisn],
                  ["Tempat, Tgl Lahir", `${data.tempatLahir}${data.tglLahir ? ", " + data.tglLahir : ""}`],
                  ["Jenis Kelamin", data.jk === "L" ? "Laki-laki" : data.jk === "P" ? "Perempuan" : ""],
                  ["Alamat", data.alamat], ["Nama Ayah", data.namaAyah], ["Nama Ibu", data.namaIbu],
                  ["No. HP", data.noHp],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 px-4 py-2.5">
                    <dt className="font-medium text-muted-foreground">{k}</dt>
                    <dd className="text-right text-foreground">{v || "—"}</dd>
                  </div>
                ))}
              </dl>
              <label className="flex items-start gap-2 text-sm text-foreground">
                <input type="checkbox" required className="mt-0.5" />
                <span>Saya menyatakan data yang diisi adalah benar dan dapat dipertanggungjawabkan.</span>
              </label>
            </div>
          )}

          {/* Nav buttons */}
          <div className="mt-8 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
              className="inline-flex items-center gap-1 rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" /> Kembali
            </button>
            {step < steps.length ? (
              <button
                type="button"
                onClick={() => setStep((s) => Math.min(steps.length, s + 1))}
                className="inline-flex items-center gap-1 rounded-md bg-[var(--gradient-primary)] px-5 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-elegant)] transition-transform hover:scale-[1.02]"
              >
                Lanjut <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="inline-flex items-center gap-1 rounded-md bg-[var(--gradient-primary)] px-5 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-elegant)] transition-transform hover:scale-[1.02] disabled:opacity-60"
              >
                {submitting ? (<><Loader2 className="h-4 w-4 animate-spin" /> Mengirim...</>) : (<>Kirim Pendaftaran <Check className="h-4 w-4" /></>)}
              </button>
            )}
          </div>
          {error && <p className="mt-4 text-sm text-destructive">Gagal mengirim: {error}</p>}
        </div>
      </div>
    </SiteLayout>
  );
}

const inputCls =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20";

function Field({
  label, value, onChange, type = "text", required,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-foreground">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <input type={type} value={value} onChange={onChange} className={inputCls} />
    </div>
  );
}

function FileUpload({
  label, hint, accept, maxMB, value, onChange,
}: {
  label: string;
  hint: string;
  accept: string;
  maxMB: number;
  value: string;
  onChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const allowed = accept.split(",").map((s) => s.trim());
  const isImage = value && /\.(png|jpe?g)$/i.test(value);
  const isPdf = value && /\.pdf$/i.test(value);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setErr(null);
    if (!allowed.includes(file.type)) {
      setErr(`Format tidak didukung. Hanya: ${allowed.join(", ")}`);
      return;
    }
    if (file.size > maxMB * 1024 * 1024) {
      setErr(`Ukuran melebihi ${maxMB}MB.`);
      return;
    }
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("berkas-ppdb").upload(path, file, {
      contentType: file.type,
      upsert: false,
    });
    if (error) {
      setErr(error.message);
      setUploading(false);
      return;
    }
    const { data: pub } = supabase.storage.from("berkas-ppdb").getPublicUrl(path);
    onChange(pub.publicUrl);
    setUploading(false);
  };

  return (
    <div className="rounded-lg border border-dashed border-border bg-secondary/30 p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="text-xs text-muted-foreground">{hint}</p>
          {value && !uploading && (
            <p className="mt-1 truncate text-xs text-primary">✓ Terunggah</p>
          )}
        </div>
        <label className={`shrink-0 cursor-pointer rounded-md border border-primary px-3 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground ${uploading ? "pointer-events-none opacity-60" : ""}`}>
          {uploading ? (
            <span className="inline-flex items-center gap-1.5"><Loader2 className="h-4 w-4 animate-spin" /> Mengunggah...</span>
          ) : value ? "Ganti File" : "Pilih File"}
          <input type="file" accept={accept} className="hidden" onChange={handleFile} disabled={uploading} />
        </label>
      </div>
      {err && <p className="mt-2 text-xs text-destructive">{err}</p>}
      {value && !uploading && (
        <div className="mt-3">
          {isImage && (
            <img src={value} alt={label} className="max-h-40 rounded-md border border-border object-contain" />
          )}
          {isPdf && (
            <a href={value} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-xs font-medium text-foreground hover:bg-secondary">
              📄 Lihat PDF
            </a>
          )}
          {!isImage && !isPdf && (
            <a href={value} target="_blank" rel="noreferrer" className="text-xs text-primary underline">Lihat file</a>
          )}
        </div>
      )}
    </div>
  );
}
