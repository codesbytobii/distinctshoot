"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const STATS = [
  { value: "5+", label: "Years" },
  { value: "200+", label: "Clients" },
  { value: "12", label: "Awards" },
  { value: "8", label: "Cities" },
];

const PROCESS_IMAGES = [
  "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&q=85",
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=85",
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&q=85",
];

function useReveal() {
  const refs = useRef<HTMLElement[]>([]);
  useEffect(() => {
    const o = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08 }
    );
    refs.current.forEach((el) => el && o.observe(el));
    return () => o.disconnect();
  }, []);
  return (el: HTMLElement | null) => { if (el && !refs.current.includes(el)) refs.current.push(el); };
}

export default function AboutPage() {
  const addRef = useReveal();

  return (
    <div className="min-h-screen">

      {/* ── HERO — full bleed with offset image ── */}
      <section className="relative min-h-[90vh] pt-24 flex items-end overflow-hidden">
        <div
          className="absolute right-0 top-0 bottom-0 w-full lg:w-3/5 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1492288991661-058aa541ff43?w=1200&q=85')" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, var(--bg) 35%, transparent 70%), linear-gradient(to top, rgba(6,6,6,0.5) 0%, transparent 40%)" }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-20 w-full">
          <p className="text-[10px] tracking-[0.4em] uppercase mb-6" style={{ color: "var(--gold)" }}>The Photographer</p>
          <h1
            className="font-display font-light leading-none mb-8"
            style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)", color: "var(--fg)", lineHeight: 0.9 }}
          >
            Built on<br /><em style={{ color: "var(--gold)" }}>instinct.</em>
          </h1>
          <p className="text-base leading-relaxed max-w-md" style={{ color: "var(--fg-muted)" }}>
            Lagos-born. Light-obsessed. Telling stories with a camera since before it made sense.
          </p>
        </div>
      </section>

      {/* ── STATS ROW ── */}
      <section className="border-y" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0" style={{ borderColor: "var(--border)" } as React.CSSProperties}>
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="px-8 py-12 text-center"
              ref={addRef as any}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <p className="font-display font-light" style={{ fontSize: "clamp(3rem, 8vw, 5rem)", color: "var(--gold)", lineHeight: 1 }}>
                {s.value}
              </p>
              <p className="text-[10px] tracking-[0.35em] uppercase mt-2" style={{ color: "var(--fg-muted)" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── STORY SECTION ── */}
      <section className="py-28 lg:py-40 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Sticky left label */}
          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-32" ref={addRef as any}>
              <div className="">
                <div className="w-px h-16 mb-6" style={{ backgroundColor: "var(--gold)" }} />
                <p className="text-[10px] tracking-[0.35em] uppercase" style={{ color: "var(--gold)" }}>The Story</p>
              </div>
            </div>
          </div>

          {/* Right: long-form copy */}
          <div className="lg:col-span-8 lg:col-start-5 flex flex-col gap-10">
            <div ref={addRef as any}>
              <div className="">
                <h2 className="font-display font-light leading-tight mb-6" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--fg)" }}>
                  I didn't set out to become a photographer. I set out to understand people.
                </h2>
                <p className="text-base leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                  Photography came later — a language that let me ask the questions I'd always been 
                  too polite to say out loud. What are you afraid of? What makes you feel most alive? 
                  Who are you when no one's watching?
                </p>
              </div>
            </div>

            <div ref={addRef as any}>
              <div className="" style={{ transitionDelay: "0.1s" }}>
                <p className="text-base leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                  I've been based in Lagos for most of my career — a city that teaches you patience, 
                  boldness, and an acute sensitivity to light. The kind of light that only exists here: 
                  harsh and golden and completely unforgiving. I learned to work with it, not against it.
                </p>
              </div>
            </div>

            {/* Image collage */}
            <div className="grid grid-cols-3 gap-3 my-6" ref={addRef as any}>
              {PROCESS_IMAGES.map((img, i) => (
                <div
                  key={i}
                  className="overflow-hidden "
                  style={{ transitionDelay: `${i * 0.08}s`, aspectRatio: i === 1 ? "3/4" : "1/1" }}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            <div ref={addRef as any}>
              <div className="" style={{ transitionDelay: "0.15s" }}>
                <p className="text-base leading-relaxed mb-8" style={{ color: "var(--fg-muted)" }}>
                  My work has appeared in editorial campaigns, fashion weeks, and private collections 
                  across West Africa and beyond. I shoot with intention, patience, and an obsessive 
                  attention to what light does to a face at the exact right moment.
                </p>
                <Link
                  href="/portfolio"
                  className="group inline-flex items-center gap-3 text-xs tracking-[0.25em] uppercase border-b pb-px transition-colors duration-300"
                  style={{ borderColor: "var(--gold)", color: "var(--gold)" }}
                >
                  See the Work <ArrowRight size={11} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES — HORIZONTAL SCROLL ── */}
      <section className="py-20 border-t" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-secondary)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[10px] tracking-[0.35em] uppercase mb-16 text-center" style={{ color: "var(--gold)" }}>What I Stand For</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ backgroundColor: "var(--border)" }}>
            {[
              { num: "I", title: "Craft over speed", desc: "I take the time to get it right. Rushed sessions produce average images. I don't do average." },
              { num: "II", title: "People first", desc: "The best portraits emerge from trust. I treat every subject with the dignity they deserve." },
              { num: "III", title: "Context matters", desc: "Culture, environment, narrative — these aren't afterthoughts. They're the whole point." },
              { num: "IV", title: "No shortcuts", desc: "Every image I deliver has earned its place. I edit ruthlessly so you only ever see the best." },
            ].map((v, i) => (
              <div
                key={v.num}
                className="px-8 py-12 flex flex-col gap-5 "
                ref={addRef as any}
                style={{ backgroundColor: "var(--bg-secondary)", transitionDelay: `${i * 0.08}s` }}
              >
                <p className="font-display font-light" style={{ fontSize: "2.5rem", color: "var(--border)", lineHeight: 1 }}>{v.num}</p>
                <p className="text-sm font-medium tracking-widest uppercase" style={{ color: "var(--fg)" }}>{v.title}</p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--fg-muted)" }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 px-6 text-center">
        <div className="max-w-xl mx-auto " ref={addRef as any}>
          <p className="font-display font-light italic mb-6" style={{ fontSize: "clamp(1.4rem, 4vw, 2.2rem)", color: "var(--fg)" }}>
            "The camera is an instrument that teaches people how to see without a camera."
          </p>
          <p className="text-xs tracking-widest mb-10" style={{ color: "var(--fg-muted)" }}>— Dorothea Lange</p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 px-8 py-4 text-xs tracking-[0.25em] uppercase transition-all duration-300"
            style={{ backgroundColor: "var(--gold)", color: "#0A0A0A" }}
          >
            Book a Session <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}
