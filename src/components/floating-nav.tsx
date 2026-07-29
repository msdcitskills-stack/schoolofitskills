import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Palette } from "lucide-react";
import { themes, useTheme } from "./theme-provider";
import soisLogo from "@/assets/sois-logo.png.asset.json";

const links = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  { to: "/tally", label: "Tally" },
  { to: "/internships", label: "Internships" },
  { to: "/school-programs", label: "For Schools" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function FloatingNav() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [openTheme, setOpenTheme] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <div
      className={`fixed top-4 left-1/2 z-50 -translate-x-1/2 transition-all duration-500 ${
        scrolled ? "top-3 scale-[0.98]" : "top-6"
      }`}
    >
      <nav
        className="glass flex items-center gap-1 rounded-full px-2 py-2 shadow-[0_10px_40px_-20px_color-mix(in_oklab,var(--color-foreground)_50%,transparent)]"
        onMouseLeave={() => setHovered(null)}
      >
        <Link
          to="/"
          className="flex items-center gap-2 pl-2 pr-3"
          aria-label="School of IT Skills"
        >
          <img src={soisLogo.url} alt="" className="h-8 w-8 rounded-full" />
          <span className="hidden text-sm font-bold tracking-tight sm:inline">
            School of IT Skills
          </span>
        </Link>
        <div className="mx-1 hidden h-6 w-px bg-border md:block" />
        <ul className="hidden items-center md:flex">
          {links.map((l) => {
            const active =
              pathname === l.to || (l.to !== "/" && pathname.startsWith(l.to));
            return (
              <li key={l.to} className="relative">
                <Link
                  to={l.to}
                  onMouseEnter={() => setHovered(l.to)}
                  className={`relative z-10 block rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    active || hovered === l.to
                      ? "text-secondary-foreground"
                      : "text-foreground/80 hover:text-foreground"
                  }`}
                >
                  {hovered === l.to && (
                    <span
                      className="absolute inset-0 -z-10 rounded-full bg-secondary animate-in fade-in zoom-in-95 duration-200"
                      aria-hidden
                    />
                  )}
                  {active && (
                    <span
                      className="absolute inset-0 -z-10 rounded-full bg-secondary"
                      aria-hidden
                    />
                  )}
                  <span>{l.label}</span>
                </Link>

              </li>
            );
          })}
        </ul>
        <div className="relative ml-1">
          <button
            onClick={() => setOpenTheme((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-transform hover:scale-110"
            aria-label="Change theme"
          >
            <Palette className="h-4 w-4" />
          </button>
          {openTheme && (
            <div className="glass absolute right-0 top-12 flex w-56 flex-col gap-1 rounded-2xl p-2 shadow-xl animate-in fade-in slide-in-from-top-2">
              {themes.map((t) => (
                <button
                  key={t.key}
                  onClick={() => {
                    setTheme(t.key);
                    setOpenTheme(false);
                  }}
                  className={`flex items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition-colors hover:bg-muted ${
                    theme === t.key ? "bg-muted" : ""
                  }`}
                >
                  <span className="font-medium">{t.label}</span>
                  <span className="flex gap-1">
                    {t.swatch.map((c) => (
                      <span
                        key={c}
                        className="h-4 w-4 rounded-full border border-border/60"
                        style={{ background: c }}
                      />
                    ))}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
