import { Link } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";

const links = [
  { to: "/", label: "Beranda" },
  { to: "/informasi", label: "Informasi" },
  { to: "/pendaftaran", label: "Pendaftaran" },
  { to: "/login", label: "Login" },
] as const;

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-primary">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-elegant)]">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="text-lg">SPMB SMA</span>
        </Link>
        <nav className="hidden gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-md px-4 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-secondary hover:text-primary"
              activeProps={{ className: "rounded-md px-4 py-2 text-sm font-semibold bg-secondary text-primary" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/pendaftaran"
          className="hidden rounded-md bg-[var(--gradient-primary)] px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-elegant)] transition-transform hover:scale-[1.02] md:inline-flex"
        >
          Daftar Sekarang
        </Link>
      </div>
    </header>
  );
}
