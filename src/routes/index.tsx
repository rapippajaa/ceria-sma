import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { GraduationCap, BookOpen, Users, ShieldCheck, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SPMB SMA — Sistem Pendaftaran Murid Baru" },
      { name: "description", content: "Daftar online sebagai murid baru SMA dengan mudah, cepat, dan aman melalui SPMB." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-hero)] opacity-95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_oklch(1_0_0/0.15),_transparent_60%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 text-primary-foreground md:py-32">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
              <GraduationCap className="h-4 w-4" /> Tahun Ajaran 2026/2027
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight text-[oklch(0.06_0.02_250)] md:text-6xl">
              Bergabunglah Bersama Calon Pemimpin Masa Depan
            </h1>
            <p className="mt-4 text-lg text-[oklch(0.06_0.02_250)] md:text-xl">
              Sistem Pendaftaran Murid Baru (SPMB) online untuk SMA. Cepat, transparan, dan dapat diakses kapan saja.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/pendaftaran"
                className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 font-semibold text-primary shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.03]"
              >
                Daftar Sekarang <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/informasi"
                className="inline-flex items-center rounded-md border border-white/40 px-6 py-3 font-medium text-[oklch(0.06_0.02_250)] transition-colors hover:bg-white/10"
              >
                Lihat Informasi
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: BookOpen, title: "Kurikulum Unggul", desc: "Program pembelajaran berbasis kompetensi dan karakter." },
            { icon: Users, title: "Lingkungan Inklusif", desc: "Komunitas siswa yang suportif dan inspiratif." },
            { icon: ShieldCheck, title: "Pendaftaran Aman", desc: "Data Anda terlindungi dengan sistem terenkripsi." },
          ].map((f) => (
            <div key={f.title} className="rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-[var(--shadow-elegant)]">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-secondary text-primary">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="rounded-2xl bg-[var(--gradient-primary)] p-10 text-center text-primary-foreground shadow-[var(--shadow-elegant)]">
          <h2 className="text-3xl font-bold text-[oklch(0.06_0.02_250)]">Siap Memulai Perjalananmu?</h2>
          <p className="mt-2 text-[oklch(0.06_0.02_250)]">Pendaftaran dibuka sampai 31 Juli 2026.</p>
          <Link
            to="/pendaftaran"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 font-semibold text-primary transition-transform hover:scale-[1.03]"
          >
            Daftar Sekarang <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
