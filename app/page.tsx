"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowDown } from "lucide-react";

const HERO_SLIDES = [
  { img: "/images/hero-1.jpg", label: "Portrait" },
  { img: "/images/hero-2.jpg", label: "Editorial" },
  { img: "/images/hero-3.jpg", label: "Fashion" },
  { img: "/images/hero-4.jpg", label: "Wedding" },
  { img: "/images/hero-5.jpg", label: "Wedding" },
];

const EFFECTS = [
  { enter: "slideEnterZoomIn", exit: "slideExitZoomOut" },
  { enter: "slideEnterLeft", exit: "slideExitRight" },
  { enter: "slideEnterZoomOut", exit: "slideExitZoomIn" },
  { enter: "slideEnterRight", exit: "slideExitLeft" },
];

const FEATURED_WORKS = [
  { id: 1, title: "Serene", category: "Portrait", img: "/images/1.jpg" },
  { id: 2, title: "Editorial No. 4", category: "Editorial", img: "/images/6.jpg" },
  { id: 3, title: "The Golden Hour", category: "Portrait", img: "/images/27.jpg" },
];

const TESTIMONIALS = [
  {
    quote: "Working with Distinct Shoot completely changed how I see myself. I didn't expect to feel so at ease in front of a camera — and the results were beyond anything I imagined.",
    name: "Adaeze Nwosu",
    role: "Creative Director, Lagos",
    img: "/images/tobi.jpg",
  },
  {
    quote: "Our brand campaign came out looking like a full editorial spread. Every shot was intentional, cinematic, and on-brand. Clients keep asking who shot it.",
    name: "Tunde Adesanya",
    role: "Founder, Kòfí Studios",
    img: "/images/tobi.jpg",
  },
  {
    quote: "I've worked with many photographers. None of them have understood light the way Distinct Shoot does. My wedding photos feel like stills from a film I want to live in forever.",
    name: "Chisom Okafor",
    role: "Architect & Bride, Abuja",
    img: "/images/4.jpg",
  },
];

function useReveal() {
  const observer = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08 }
    );
    return () => observer.current?.disconnect();
  }, []);
  return (el: HTMLElement | null) => {
    if (el && observer.current) observer.current.observe(el);
  };
}

export default function HomePage() {
  const addRef = useReveal();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [effect, setEffect] = useState(EFFECTS[0]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  // Preload next images
  useEffect(() => {
    const preloadNextImages = () => {
      const nextIndex = (current + 1) % HERO_SLIDES.length;
      const nextNextIndex = (current + 2) % HERO_SLIDES.length;
      const imagesToPreload = [HERO_SLIDES[nextIndex].img, HERO_SLIDES[nextNextIndex].img];
      
      imagesToPreload.forEach(src => {
        if (!loadedImages.has(src)) {
          const img = new window.Image();
          img.src = src;
          img.onload = () => {
            setLoadedImages(prev => new Set(prev).add(src));
          };
        }
      });
    };
    
    preloadNextImages();
  }, [current, loadedImages]);

  const goTo = useCallback((index: number) => {
    if (transitioning) return;
    const availableEffects = EFFECTS.filter((e) => e.enter !== effect.enter);
    const nextEffect = availableEffects.length > 0 
      ? availableEffects[Math.floor(Math.random() * availableEffects.length)]
      : EFFECTS[0];
    setEffect(nextEffect);
    setTransitioning(true);
    setPrev(current);
    setCurrent(index);
    setTimeout(() => { setPrev(null); setTransitioning(false); }, 800);
  }, [current, transitioning, effect]);

  const next = useCallback(() => {
    goTo((current + 1) % HERO_SLIDES.length);
  }, [current, goTo]);

  useEffect(() => {
    timerRef.current = setInterval(next, 3000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [next]);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 3000);
  };

  const handleDotClick = (i: number) => {
    if (i === current) return;
    goTo(i);
    resetTimer();
  };

  return (
    <>
      <style>{`
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

        @keyframes slideEnterZoomIn  { from { opacity:0; transform:scale(1.12); } to { opacity:1; transform:scale(1); } }
        @keyframes slideExitZoomOut  { from { opacity:1; transform:scale(1); } to { opacity:0; transform:scale(0.93); } }

        @keyframes slideEnterZoomOut { from { opacity:0; transform:scale(0.93); } to { opacity:1; transform:scale(1); } }
        @keyframes slideExitZoomIn   { from { opacity:1; transform:scale(1); } to { opacity:0; transform:scale(1.08); } }

        @keyframes slideEnterLeft    { from { opacity:0; transform:translateX(4%) scale(1.04); } to { opacity:1; transform:translateX(0) scale(1); } }
        @keyframes slideExitRight    { from { opacity:1; transform:translateX(0) scale(1); } to { opacity:0; transform:translateX(-3%) scale(0.98); } }

        @keyframes slideEnterRight   { from { opacity:0; transform:translateX(-4%) scale(1.04); } to { opacity:1; transform:translateX(0) scale(1); } }
        @keyframes slideExitLeft     { from { opacity:1; transform:translateX(0) scale(1); } to { opacity:0; transform:translateX(3%) scale(0.98); } }

        @keyframes textIn {
          0%   { opacity:0; transform:translateY(16px); }
          100% { opacity:1; transform:translateY(0); }
        }
        .hero-text-animate { animation: textIn 0.9s cubic-bezier(0.76,0,0.24,1) 0.3s both; }

        @keyframes progress { 0%{width:0%} 100%{width:100%} }
        .slide-progress { animation: progress 3s linear forwards; }
      `}</style>

      {/* ── HERO CAROUSEL ── */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        {/* Render ALL slides, but control visibility with CSS */}
        {HERO_SLIDES.map((slide, i) => {
          const isActive = i === current;
          const isExiting = i === prev;
          const anim = isActive ? effect.enter : (isExiting ? effect.exit : '');
          
          // Only render slides that are active or exiting, but keep them in DOM
          if (!isActive && !isExiting) return null;
          
          return (
            <div
              key={`${slide.img}-${i}`}
              style={{
                position: "absolute",
                inset: 0,
                zIndex: isActive ? 2 : 1,
                animation: anim ? `${anim} 0.8s cubic-bezier(0.76,0,0.24,1) forwards` : 'none',
              }}
            >
              <Image
                src={slide.img}
                alt={`Hero ${slide.label}`}
                fill
                priority={isActive}
                quality={85}
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: "center" }}
              />
            </div>
          );
        })}

        {/* Overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{ background: "linear-gradient(to top, rgba(6,6,6,0.92) 0%, rgba(6,6,6,0.3) 55%, rgba(6,6,6,0.15) 100%)" }}
        />

        {/* Side label */}
        <div
          className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 z-20"
          style={{ writingMode: "vertical-rl", color: "rgba(240,234,216,0.3)" }}
        >
          <span className="text-[10px] tracking-[0.3em] uppercase">Lagos, Nigeria</span>
          <div className="w-px h-16" style={{ backgroundColor: "rgba(201,168,76,0.4)" }} />
          <span className="text-[10px] tracking-[0.3em] uppercase">Est. 2019</span>
        </div>

        {/* Ghost slide number */}
        <div className="absolute top-24 right-8 z-20 hidden lg:block">
          <p className="font-display font-light" style={{ fontSize: "3rem", color: "rgba(240,234,216,0.12)", lineHeight: 1 }}>
            {String(current + 1).padStart(2, "0")}
          </p>
        </div>

        {/* Hero content */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-12 pb-16 lg:pb-24">
          <div key={current} className="hero-text-animate">
            <p className="text-[10px] tracking-[0.45em] uppercase mb-6" style={{ color: "var(--gold)" }}>
              Portrait & Editorial Photography
            </p>
            <h1
              className="font-display font-light leading-none mb-8"
              style={{ fontSize: "clamp(4rem, 13vw, 10rem)", color: "#F0EAD8", lineHeight: 0.88 }}
            >
              Every frame<br />
              <em style={{ color: "var(--gold)", fontStyle: "italic" }}>tells truth.</em>
            </h1>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-10">
              <Link
                href="/portfolio"
                className="group inline-flex items-center gap-3 px-8 py-4 text-xs tracking-[0.2em] uppercase transition-all duration-300"
                style={{ backgroundColor: "var(--gold)", color: "#0A0A0A" }}
              >
                View Portfolio
                <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 text-xs tracking-[0.2em] uppercase border transition-all duration-300"
                style={{ borderColor: "rgba(240,234,216,0.4)", color: "rgba(240,234,216,0.7)" }}
              >
                Book a Session
              </Link>
            </div>
          </div>
        </div>

        {/* Dots + progress */}
        <div className="absolute bottom-8 left-6 lg:left-12 z-20 flex items-center gap-6">
          <div className="flex items-center gap-2">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => handleDotClick(i)}
                className="relative overflow-hidden transition-all duration-300"
                style={{
                  width: i === current ? "40px" : "8px",
                  height: "2px",
                  backgroundColor: i === current ? "transparent" : "rgba(240,234,216,0.25)",
                }}
              >
                {i === current && (
                  <span
                    key={current}
                    className="absolute inset-y-0 left-0 slide-progress"
                    style={{ backgroundColor: "var(--gold)" }}
                  />
                )}
              </button>
            ))}
          </div>
          <p className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "rgba(240,234,216,0.35)" }}>
            {HERO_SLIDES[current].label}
          </p>
        </div>

        {/* Scroll nudge */}
        <button
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
          className="absolute bottom-8 right-8 z-20 flex flex-col items-center gap-2 cursor-pointer"
          style={{ color: "rgba(240,234,216,0.35)", background: "none", border: "none" }}
          aria-label="Scroll down"
        >
          <ArrowDown size={14} className="animate-bounce" />
        </button>
      </section>

      {/* ── MARQUEE STRIP ── */}
      <div className="py-4 overflow-hidden border-y" style={{ backgroundColor: "var(--gold)", borderColor: "var(--gold)" }}>
        <div className="flex gap-12 whitespace-nowrap" style={{ animation: "marquee 18s linear infinite" }}>
          {Array(6).fill(null).map((_, i) => (
            <span key={i} className="text-[11px] tracking-[0.3em] uppercase font-light flex items-center gap-12" style={{ color: "#0A0A0A" }}>
              · Portrait · Events · Wedding · Fashion ·
            </span>
          ))}
        </div>
      </div>

      {/* ── INTRO ── */}
      <section className="py-28 lg:py-40 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-end">
          <div className="lg:col-span-5 relative aspect-[4/3]" ref={addRef as any}>
            <Image
              src="/images/intro2.JPG"
              alt="Distinct Shoot"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority
              quality={85}
            />
          </div>
          <div className="lg:col-span-6 lg:col-start-7" ref={addRef as any}>
            <div style={{ transitionDelay: "0.15s" }}>
              <h2
                className="font-display font-light leading-tight mb-8"
                style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--fg)" }}
              >
                Photography is not taken —<br />it is <em style={{ color: "var(--gold)" }}>made.</em>
              </h2>
              <p className="text-base leading-relaxed mb-5" style={{ color: "var(--fg-muted)" }}>
                At Distinct Shoot, we believe every portrait holds a universe. Our approach is unhurried,
                intentional, and deeply collaborative — because the best images happen when you feel
                seen, not just photographed.
              </p>
              <p className="text-base leading-relaxed mb-10" style={{ color: "var(--fg-muted)" }}>
                Based in Lagos. Available worldwide.
              </p>
              <Link
                href="/about"
                className="group inline-flex items-center gap-3 px-8 py-4 text-xs tracking-[0.2em] uppercase transition-all duration-300"
                style={{ backgroundColor: "var(--gold)", color: "#0A0A0A" }}
              >
                Our Story
                <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED WORK ── */}
      <section className="pb-28 lg:pb-40 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-14" ref={addRef as any}>
            <div>
              <p className="text-[10px] tracking-[0.35em] uppercase mb-3" style={{ color: "var(--gold)" }}>Selected Work</p>
              <h2 className="font-display font-light" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--fg)" }}>
                Featured Shoots
              </h2>
            </div>
            <Link
              href="/portfolio"
              className="hidden sm:flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase transition-colors duration-300"
              style={{ color: "var(--fg-muted)" }}
            >
              View All <ArrowRight size={11} />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
            <div className="lg:col-span-7 group relative overflow-hidden cursor-pointer" ref={addRef as any}>
              <Link href="/portfolio">
                <div className="aspect-[4/3] lg:aspect-auto lg:h-[560px] relative overflow-hidden">
                  <Image
                    src={FEATURED_WORKS[0].img}
                    alt={FEATURED_WORKS[0].title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    quality={85}
                  />
                </div>
                <div className="absolute inset-0 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(to top, rgba(6,6,6,0.9) 0%, transparent 55%)" }}>
                  <p className="text-[10px] tracking-[0.3em] uppercase mb-1" style={{ color: "var(--gold)" }}>{FEATURED_WORKS[0].category}</p>
                  <p className="font-display text-2xl font-light" style={{ color: "#F0EAD8" }}>{FEATURED_WORKS[0].title}</p>
                </div>
              </Link>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-3">
              {FEATURED_WORKS.slice(1).map((work, i) => (
                <div key={work.id} className="group relative overflow-hidden cursor-pointer flex-1" ref={addRef as any} style={{ transitionDelay: `${(i + 1) * 0.1}s` }}>
                  <Link href="/portfolio">
                    <div className="aspect-[4/3] lg:aspect-auto lg:h-[274px] relative overflow-hidden">
                      <Image
                        src={work.img}
                        alt={work.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        quality={85}
                      />
                    </div>
                    <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(to top, rgba(6,6,6,0.9) 0%, transparent 55%)" }}>
                      <p className="text-[10px] tracking-[0.3em] uppercase mb-1" style={{ color: "var(--gold)" }}>{work.category}</p>
                      <p className="font-display text-xl font-light" style={{ color: "#F0EAD8" }}>{work.title}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS STRIP ── */}
      <section className="py-20 px-6 border-y" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] tracking-[0.35em] uppercase text-center mb-14" style={{ color: "var(--gold)" }}>How It Works</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 divide-y sm:divide-y-0 sm:divide-x" style={{ borderColor: "var(--border)" } as React.CSSProperties}>
            {[
              { num: "01", title: "Reach Out", desc: "Tell us about your vision, occasion, and what you're hoping to feel in the final images." },
              { num: "02", title: "Consultation", desc: "We align on concept, location, wardrobe, and timing — so nothing is left to chance." },
              { num: "03", title: "The Shoot", desc: "We create together. Unhurried, collaborative, and focused entirely on your story." },
              { num: "04", title: "Delivery", desc: "Your gallery arrives within 2 weeks — retouched, gallery-ready, and undeniably yours." },
            ].map((step, i) => (
              <div key={step.num} className="px-8 py-10 text-center" ref={addRef as any} style={{ transitionDelay: `${i * 0.08}s` }}>
                <p className="font-display font-light mb-4" style={{ fontSize: "3rem", color: "var(--border)", lineHeight: 1 }}>{step.num}</p>
                <p className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: "var(--fg)" }}>{step.title}</p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--fg-muted)" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-28 lg:py-40 px-6" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-[10px] tracking-[0.35em] uppercase text-center mb-16" style={{ color: "var(--gold)" }}>Client Stories</p>
          <div className="text-center mb-12" ref={addRef as any}>
            <p
              key={activeTestimonial}
              className="font-display font-light italic leading-snug mb-10"
              style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.2rem)", color: "var(--fg)", maxWidth: "820px", margin: "0 auto 2.5rem", animation: "textIn 0.6s ease both" }}
            >
              "{TESTIMONIALS[activeTestimonial].quote}"
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-10 h-10 rounded-full overflow-hidden border relative" style={{ borderColor: "var(--gold)" }}>
                <Image
                  src={TESTIMONIALS[activeTestimonial].img}
                  alt={TESTIMONIALS[activeTestimonial].name}
                  fill
                  className="object-cover"
                  sizes="40px"
                  loading="lazy"
                />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium" style={{ color: "var(--fg)" }}>{TESTIMONIALS[activeTestimonial].name}</p>
                <p className="text-xs" style={{ color: "var(--fg-muted)" }}>{TESTIMONIALS[activeTestimonial].role}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setActiveTestimonial(i)} className="transition-all duration-300"
                style={{ width: i === activeTestimonial ? "32px" : "8px", height: "3px", borderRadius: "2px", backgroundColor: i === activeTestimonial ? "var(--gold)" : "var(--border)" }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-36 lg:py-52 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/cta-bg.jpg"
            alt="Background"
            fill
            className="object-cover"
            quality={70}
            priority={false}
            loading="lazy"
          />
          <div className="absolute inset-0" style={{ background: "rgba(6,6,6,0.82)" }} />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center" ref={addRef as any}>
          <p className="text-[10px] tracking-[0.4em] uppercase mb-6" style={{ color: "var(--gold)" }}>Ready When You Are</p>
          <h2 className="font-display font-light leading-tight mb-8" style={{ fontSize: "clamp(2.2rem, 6vw, 5rem)", color: "#F0EAD8" }}>
            Let's create something <em style={{ color: "var(--gold)" }}>timeless</em>
          </h2>
          <p className="text-base leading-relaxed mb-12" style={{ color: "rgba(240,234,216,0.65)" }}>
            Whether it's a portrait, editorial campaign, or brand shoot — every great image starts with a conversation.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 px-10 py-5 text-xs tracking-[0.25em] uppercase transition-all duration-300"
            style={{ backgroundColor: "var(--gold)", color: "#0A0A0A" }}
          >
            Start a Conversation
            <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </>
  );
}