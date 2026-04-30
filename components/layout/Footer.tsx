"use client";
import Link from "next/link";
import { Instagram, Mail, Phone } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ borderTop: "1px solid var(--border)", backgroundColor: "var(--bg-secondary)" }}>
      {/* 4-column grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Col 1 — Brand */}
        <div>
          <img src="/distinctLogo.png" alt="Distinct Shoot Logo" width={70} className="mb-5" />
          <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--fg-muted)" }}>
            Portrait & editorial photography.<br />Capturing stories with intention.<br />Based in Lagos, Nigeria.
          </p>
          <div className="flex gap-3">
            {[
              { href: "https://instagram.com/distinctshoot01", icon: Instagram, label: "Instagram" },
              { href: "mailto:distinctshoot01@gmail.com", icon: Mail, label: "Email" },
              { href: "tel:+2347048666024", icon: Phone, label: "Phone" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 border flex items-center justify-center transition-all duration-300"
                style={{ borderColor: "var(--border)", color: "var(--fg-muted)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)";
                  (e.currentTarget as HTMLElement).style.color = "var(--gold)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLElement).style.color = "var(--fg-muted)";
                }}
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* Col 2 — Navigate */}
        <div>
          <p className="text-[10px] tracking-[0.35em] uppercase mb-6" style={{ color: "var(--gold)" }}>Navigate</p>
          <div className="flex flex-col gap-4">
            {[
              { href: "/portfolio", label: "Portfolio" },
              { href: "/about", label: "About" },
              { href: "/services", label: "Services" },
              { href: "/blog", label: "Journal" },
              { href: "/contact", label: "Contact" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-xs tracking-widest uppercase transition-colors duration-300"
                style={{ color: "var(--fg-muted)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--gold)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--fg-muted)"; }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Col 3 — Services */}
        <div>
          <p className="text-[10px] tracking-[0.35em] uppercase mb-6" style={{ color: "var(--gold)" }}>Services</p>
          <div className="flex flex-col gap-4">
            {["Portrait Sessions", "Editorial & Fashion", "Brand & Commercial", "Wedding & Events"].map((s) => (
              <Link
                key={s}
                href="/services"
                className="text-xs tracking-widest uppercase transition-colors duration-300"
                style={{ color: "var(--fg-muted)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--gold)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--fg-muted)"; }}
              >
                {s}
              </Link>
            ))}
          </div>
        </div>

        {/* Col 4 — Contact */}
        <div>
          <p className="text-[10px] tracking-[0.35em] uppercase mb-6" style={{ color: "var(--gold)" }}>Get In Touch</p>
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-[10px] tracking-widest uppercase mb-1" style={{ color: "var(--fg-muted)" }}>Email</p>
              <a
                href="mailto:distinctshoot01@gmail.com"
                className="text-sm transition-colors duration-300"
                style={{ color: "var(--fg)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--gold)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--fg)"; }}
              >
                distinctshoot01@gmail.com
              </a>
            </div>
            <div>
              <p className="text-[10px] tracking-widest uppercase mb-1" style={{ color: "var(--fg-muted)" }}>Phone</p>
              <a
                href="tel:+2347048666024"
                className="text-sm transition-colors duration-300"
                style={{ color: "var(--fg)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--gold)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--fg)"; }}
              >
                +234 704 866 6024
              </a>
            </div>
            <div>
              <p className="text-[10px] tracking-widest uppercase mb-1" style={{ color: "var(--fg-muted)" }}>Location</p>
              <p className="text-sm" style={{ color: "var(--fg)" }}>Lagos, Nigeria.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-3"
        style={{ borderColor: "var(--border)" }}
      >
        <p className="text-[10px] tracking-[0.25em] uppercase" style={{ color: "var(--fg-muted)" }}>
          © {year} Distinct Shoot. All rights reserved.
        </p>
        <p className="text-[10px] tracking-[0.25em] uppercase italic font-display" style={{ color: "var(--fg-muted)" }}>
          Every frame tells truth.
        </p>
      </div>
    </footer>
  );
}