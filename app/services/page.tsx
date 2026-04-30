"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Check, ArrowUpRight } from "lucide-react";

const SERVICES = [
  {
    id: "portrait",
    title: "Portrait",
    subtitle: "Sessions",
    tagline: "Intimate. Intentional. Timeless.",
    price: "From ₦150,000",
    duration: "2–3 hours",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=85",
    features: [
      "Personal or professional portrait",
      "Studio or location of choice",
      "Pre-session style consultation",
      "40+ edited high-res images",
      "Private online gallery",
      "Print release included",
    ],
  },
  {
    id: "editorial",
    title: "Editorial",
    subtitle: "& Fashion",
    tagline: "Narrative-driven. Magazine-ready.",
    price: "From ₦350,000",
    duration: "Half or full day",
    img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=85",
    features: [
      "Concept development & moodboard",
      "Creative direction support",
      "Team coordination (MUA, stylist)",
      "100+ edited selects",
      "Hi-res files for publication",
      "BTS behind-the-scenes content",
    ],
  },
  {
    id: "brand",
    title: "Brand",
    subtitle: "& Commercial",
    tagline: "Visual identity that converts.",
    price: "Custom Pricing",
    duration: "Project-based",
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=85",
    features: [
      "Brand strategy alignment session",
      "Product & lifestyle photography",
      "Multi-day shoots available",
      "Full commercial license",
      "Social media content package",
      "Dedicated project manager",
    ],
  },
  {
    id: "wedding",
    title: "Wedding",
    subtitle: "& Events",
    tagline: "Every moment, preserved.",
    price: "From ₦500,000",
    duration: "Full day",
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=85",
    features: [
      "Pre-wedding consultation",
      "Engagement shoot included",
      "Full-day wedding coverage",
      "300+ edited images",
      "Cinematic highlight reel",
      "Premium photo album option",
    ],
  },
];

function useReveal() {
  const refs = useRef<HTMLElement[]>([]);
  useEffect(() => {
    const o = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.06 }
    );
    refs.current.forEach((el) => el && o.observe(el));
    return () => o.disconnect();
  }, []);
  return (el: HTMLElement | null) => { if (el && !refs.current.includes(el)) refs.current.push(el); };
}

export default function ServicesPage() {
  const addRef = useReveal();
  const [active, setActive] = useState(0);

  const service = SERVICES[active];

  return (
    <div className="min-h-screen">

      {/* ── HEADER ── */}
      <section className="pt-36 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] tracking-[0.4em] uppercase mb-5" style={{ color: "var(--gold)" }}>What We Offer</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <h1
              className="font-display font-light leading-none"
              style={{ fontSize: "clamp(3rem, 9vw, 7.5rem)", color: "var(--fg)", lineHeight: 0.9 }}
            >
              Services &<br /><em style={{ color: "var(--gold)" }}>Pricing</em>
            </h1>
            <p className="max-w-sm text-base leading-relaxed lg:mb-2" style={{ color: "var(--fg-muted)" }}>
              Every package is a foundation. We tailor each engagement to your
              story, budget, and vision.
            </p>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE SERVICE VIEWER ── */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Tab bar */}
          <div className="flex gap-0 border-b mb-0" style={{ borderColor: "var(--border)" }}>
            {SERVICES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActive(i)}
                className="relative px-6 py-4 text-[10px] tracking-[0.3em] uppercase transition-colors duration-300 flex-1 sm:flex-none"
                style={{ color: i === active ? "var(--gold)" : "var(--fg-muted)" }}
              >
                {s.title}
                {i === active && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-px"
                    style={{ backgroundColor: "var(--gold)" }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Service panel */}
          <div
            key={active}
            className="grid grid-cols-1 lg:grid-cols-2 border-x border-b"
            style={{ borderColor: "var(--border)", animation: "fadeIn 0.4s ease" }}
          >
            {/* Left — image */}
            <div className="relative overflow-hidden" style={{ minHeight: "480px" }}>
              <img
                src={service.img}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
              />
              {/* Price badge */}
              <div
                className="absolute bottom-6 left-6 px-5 py-3"
                style={{ backgroundColor: "var(--gold)" }}
              >
                <p className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "#0A0A0A", opacity: 0.6 }}>Starting from</p>
                <p className="font-display text-xl font-light" style={{ color: "#0A0A0A" }}>{service.price}</p>
              </div>
            </div>

            {/* Right — details */}
            <div className="p-10 lg:p-14 flex flex-col justify-between" style={{ backgroundColor: "var(--bg-secondary)" }}>
              <div>
                <p className="text-[10px] tracking-[0.35em] uppercase mb-4" style={{ color: "var(--fg-muted)" }}>
                  {service.duration}
                </p>
                <h2
                  className="font-display font-light leading-tight mb-3"
                  style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--fg)" }}
                >
                  {service.title}<br />
                  <em style={{ color: "var(--gold)" }}>{service.subtitle}</em>
                </h2>
                <p className="text-sm italic mb-10" style={{ color: "var(--fg-muted)" }}>
                  {service.tagline}
                </p>

                {/* Features */}
                <div className="flex flex-col gap-4 mb-10">
                  {service.features.map((f, i) => (
                    <div key={f} className="flex items-start gap-4">
                      <div
                        className="w-5 h-5 border flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ borderColor: "var(--gold)" }}
                      >
                        <Check size={10} style={{ color: "var(--gold)" }} />
                      </div>
                      <span className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/contact"
                className="group inline-flex items-center justify-between px-7 py-4 border transition-all duration-300 hover:bg-gold"
                style={{ borderColor: "var(--gold)", color: "var(--gold)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "var(--gold)";
                  (e.currentTarget as HTMLElement).style.color = "#0A0A0A";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "var(--gold)";
                }}
              >
                <span className="text-xs tracking-[0.25em] uppercase">Book This Service</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

          {/* Service dots */}
          <div className="flex justify-center gap-2 mt-6">
            {SERVICES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="transition-all duration-300"
                style={{
                  width: i === active ? "28px" : "6px",
                  height: "3px",
                  borderRadius: "2px",
                  backgroundColor: i === active ? "var(--gold)" : "var(--border)",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── ALL SERVICES LIST — scannable ── */}
      <section className="py-20 px-6 border-t" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] tracking-[0.35em] uppercase mb-12" style={{ color: "var(--gold)" }}>At a Glance</p>
          <div className="grid grid-cols-1 divide-y" style={{ borderColor: "var(--border)" }}>
            {SERVICES.map((s, i) => (
              <div
                key={s.id}
                className="py-7 grid grid-cols-12 gap-4 items-center cursor-pointer group"
                ref={addRef as any}
                style={{ transitionDelay: `${i * 0.07}s` }}
                onClick={() => { setActive(i); window.scrollTo({ top: 300, behavior: "smooth" }); }}
              >
                <span className="col-span-1 font-display font-light text-2xl" style={{ color: "var(--border)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  className="col-span-4 font-display font-light text-2xl transition-colors duration-300"
                  style={{ color: "var(--fg)" }}
                >
                  {s.title} {s.subtitle}
                </h3>
                <p className="col-span-3 text-xs hidden md:block" style={{ color: "var(--fg-muted)" }}>
                  {s.duration}
                </p>
                <p className="col-span-3 font-display font-light text-xl" style={{ color: "var(--fg)" }}>
                  {s.price}
                </p>
                <ArrowUpRight
                  size={16}
                  className="col-span-1 transition-colors duration-300 group-hover:text-gold"
                  style={{ color: "var(--fg-muted)" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CUSTOM CTA ── */}
      <section
        className="py-24 px-6 text-center"
        style={{ backgroundColor: "var(--bg-secondary)" }}
      >
        <div className="max-w-2xl mx-auto" ref={addRef as any}>
          <p className="text-[10px] tracking-[0.4em] uppercase mb-5" style={{ color: "var(--gold)" }}>Not Sure?</p>
          <h3
            className="font-display font-light leading-tight mb-6"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--fg)" }}
          >
            Let's build something <em style={{ color: "var(--gold)" }}>custom</em>
          </h3>
          <p className="text-sm leading-relaxed max-w-lg mx-auto mb-10" style={{ color: "var(--fg-muted)" }}>
            Have a vision that doesn't fit a package? Good. The best work often doesn't.
            Tell us what you're thinking.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 px-10 py-4 text-xs tracking-[0.25em] uppercase transition-all duration-300"
            style={{ backgroundColor: "var(--gold)", color: "#0A0A0A" }}
          >
            Start a Conversation
            <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}
