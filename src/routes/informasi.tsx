import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { CalendarDays, FileText, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/informasi")({
  head: () => ({
    meta: [
      { title: "Informasi Pendaftaran — SPMB SMA" },
      { name: "description", content: "Jadwal, persyaratan, dan alur pendaftaran murid baru SMA." },
    ],
  }),
  component: Informasi,
});

const jadwal = [
  { tgl: "1 Jun 2026", item: "Pembukaan Pendaftaran Online" },
  { tgl: "31 Jul 2026", item: "Penutupan Pendaftaran" },
  { tgl: "5 Ags 2026", item: "Pengumuman Hasil Seleksi" },
  { tgl: "10 Ags 2026", item: "Daftar Ulang" },
];

const syarat = [
  "Fotokopi Ijazah/SKL SMP",
  "Fotokopi Akta Kelahiran",
  "Fotokopi Kartu Keluarga",
  "Pas foto 3x4 (2 lembar)",
  "Surat Keterangan Sehat",
];

function Informasi() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-5xl px-4 py-16">
        <h1 className="text-4xl font-bold text-foreground">Informasi Pendaftaran</h1>
        <p className="mt-2 text-muted-foreground">Segala hal yang perlu Anda tahu sebelum mendaftar.</p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-2 text-primary">
              <CalendarDays className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Jadwal Penting</h2>
            </div>
            <ul className="space-y-3">
              {jadwal.map((j) => (
                <li key={j.item} className="flex justify-between border-b border-border/60 pb-2 text-sm last:border-0">
                  <span className="font-medium text-foreground">{j.item}</span>
                  <span className="text-muted-foreground">{j.tgl}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-2 text-primary">
              <FileText className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Persyaratan Berkas</h2>
            </div>
            <ul className="space-y-2">
              {syarat.map((s) => (
                <li key={s} className="flex items-start gap-2 text-sm text-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
