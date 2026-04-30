"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";

const links = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Journal" },
  // { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handler = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 40);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollY / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <div
        className="fixed top-0 left-0 z-[60] h-px transition-all duration-100"
        style={{ width: `${scrollProgress}%`, backgroundColor: "var(--gold)" }}
      />

      <nav
        style={{
          backgroundColor: scrolled ? "var(--nav-bg)" : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(1.4)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="font-display font-light tracking-tight"
            style={{ fontSize: "1.2rem", color: "var(--fg)", letterSpacing: "0.05em" }}
          >
            {/* Distinct<em style={{ color: "var(--gold)", fontStyle: "italic" }}> Shoot</em> */}
            <img src="/distinctLogo.png" alt="distinctshoot01 Logo" width={70}  />
          </Link>

          {/* Right: nav links → Book Now → theme toggle → hamburger */}
          <div className="flex items-center gap-2 lg:gap-8">
            <div className="hidden lg:flex items-center gap-10">
              {links.map((l) => {
                const isActive = pathname === l.href;
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="relative text-[10px] tracking-[0.3em] uppercase transition-colors duration-300"
                    style={{ color: isActive ? "var(--gold)" : "var(--fg-muted)" }}
                  >
                    {l.label}
                    <span
                      className="absolute -bottom-1 left-0 h-px transition-all duration-300"
                      style={{ width: isActive ? "100%" : "0%", backgroundColor: "var(--gold)" }}
                    />
                  </Link>
                );
              })}
            </div>

            <Link
              href="/contact"
              className="hidden lg:flex items-center gap-2 px-5 py-2.5 text-[10px] tracking-[0.25em] uppercase"
              style={{ backgroundColor: "var(--gold)", color: "#0A0A0A" }}
            >
              Book Now
            </Link>

            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 transition-colors duration-300"
                style={{ color: "var(--fg-muted)" }}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
              </button>
            )}

            <button
              className="lg:hidden p-2"
              style={{ color: "var(--fg)" }}
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      <div
        className="fixed inset-0 z-40 flex flex-col lg:hidden transition-all duration-500"
        style={{
          backgroundColor: "var(--bg)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "all" : "none",
          transform: open ? "translateY(0)" : "translateY(-12px)",
        }}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b" style={{ borderColor: "var(--border)" }}>
          <span className="font-display font-light" style={{ fontSize: "1.2rem", color: "var(--fg)" }}>
            Distinct<em style={{ color: "var(--gold)", fontStyle: "italic" }}> Shoot</em>
          </span>
          <button onClick={() => setOpen(false)} style={{ color: "var(--fg)" }}>
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col justify-center flex-1 px-8 gap-8">
          {links.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-display font-light transition-colors duration-300"
              style={{
                fontSize: "clamp(2.5rem, 10vw, 4rem)",
                color: pathname === l.href ? "var(--gold)" : "var(--fg)",
                lineHeight: 1,
                transitionDelay: open ? `${i * 0.06}s` : "0s",
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="px-8 pb-12 border-t pt-8" style={{ borderColor: "var(--border)" }}>
          <p className="text-[10px] tracking-[0.35em] uppercase mb-2" style={{ color: "var(--fg-muted)" }}>
            Ready to shoot?
          </p>
          <a href="mailto:hello@distinctshoot01.com" className="text-sm" style={{ color: "var(--gold)" }}>
            hello@distinctshoot01.com
          </a>
        </div>
      </div>
    </>
  );
}