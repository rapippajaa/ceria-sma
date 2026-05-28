import { Navbar } from "@/components/Navbar";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border/60 bg-secondary/40 py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} SPMB SMA. Sistem Pendaftaran Murid Baru.
      </footer>
    </div>
  );
}
