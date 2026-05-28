import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Mail, Lock } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — SPMB SMA" },
      { name: "description", content: "Masuk ke akun pendaftaran SPMB SMA Anda." },
    ],
  }),
  component: Login,
});

function Login() {
  return (
    <SiteLayout>
      <div className="mx-auto flex max-w-md flex-col px-4 py-20">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-elegant)]">
          <h1 className="text-2xl font-bold text-foreground">Masuk ke Akun</h1>
          <p className="mt-1 text-sm text-muted-foreground">Pantau status pendaftaran Anda.</p>

          <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  required
                  className="w-full rounded-md border border-input bg-background py-2 pl-10 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="nama@email.com"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="password"
                  required
                  className="w-full rounded-md border border-input bg-background py-2 pl-10 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-[var(--gradient-primary)] py-2.5 font-semibold text-primary-foreground shadow-[var(--shadow-elegant)] transition-transform hover:scale-[1.01]"
            >
              Masuk
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Belum punya akun? <a href="/pendaftaran" className="font-medium text-primary hover:underline">Daftar di sini</a>
          </p>
        </div>
      </div>
    </SiteLayout>
  );
}
