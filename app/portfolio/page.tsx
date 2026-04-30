"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { X, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

const CATEGORIES = ["All", "Portrait", "Editorial", "Brand", "Wedding"];

const WORKS = [
  { id: 1, title: "Quiet Strength", category: "Portrait", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1200&q=90", thumb: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80", year: "2024" },
  { id: 2, title: "Editorial No. 4", category: "Editorial", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=90", thumb: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80", year: "2024" },
  { id: 3, title: "Golden Hour", category: "Portrait", img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&q=90", thumb: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&q=80", year: "2024" },
  { id: 4, title: "Monochrome Series", category: "Editorial", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=90", thumb: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80", year: "2023" },
  { id: 5, title: "Brand Identity", category: "Brand", img: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=1200&q=90", thumb: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&q=80", year: "2023" },
  { id: 6, title: "Veil & Light", category: "Wedding", img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=90", thumb: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80", year: "2023" },
  { id: 7, title: "Silhouette Study", category: "Portrait", img: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=1200&q=90", thumb: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&q=80", year: "2023" },
  { id: 8, title: "Fashion Week Lagos", category: "Editorial", img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=90", thumb: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80", year: "2023" },
  { id: 9, title: "Ethereal", category: "Portrait", img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1200&q=90", thumb: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&q=80", year: "2022" },
  { id: 10, title: "The Ceremony", category: "Wedding", img: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200&q=90", thumb: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80", year: "2022" },
  { id: 11, title: "Studio Session", category: "Brand", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=90", thumb: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80", year: "2022" },
  { id: 12, title: "Dusk Portrait", category: "Portrait", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1200&q=90", thumb: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80", year: "2022" },
];

type Work = typeof WORKS[0];
type Direction = "next" | "prev";

function Lightbox({
  works,
  startIndex,
  onClose,
}: {
  works: Work[];
  startIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(startIndex);
  const [sliding, setSliding] = useState<Direction | null>(null);
  const touchStartX = useRef<number | null>(null);

  const current = works[index];
  const total = works.length;

  const go = useCallback(
    (dir: Direction) => {
      if (sliding) return;
      setSliding(dir);
      setTimeout(() => {
        setIndex((prev) =>
          dir === "next" ? (prev + 1) % total : (prev - 1 + total) % total
        );
        setSliding(null);
      }, 280);
    },
    [sliding, total]
  );

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go("next");
      if (e.key === "ArrowLeft") go("prev");
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [go, onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Touch swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) go(diff > 0 ? "next" : "prev");
    touchStartX.current = null;
  };

  return (
    <div
      className="lightbox-overlay"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-20 p-2 flex items-center gap-2 text-xs tracking-widest uppercase transition-colors duration-200"
        style={{ color: "rgba(240,234,216,0.5)" }}
      >
        Close <X size={14} />
      </button>

      {/* Counter */}
      <div
        className="absolute top-5 left-1/2 -translate-x-1/2 z-20 text-xs tracking-widest"
        style={{ color: "rgba(240,234,216,0.4)" }}
      >
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); go("prev"); }}
        className="absolute left-4 lg:left-8 z-20 p-3 border transition-all duration-300 hover:border-gold"
        style={{ borderColor: "rgba(240,234,216,0.15)", color: "rgba(240,234,216,0.6)" }}
        aria-label="Previous"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Main image */}
      <div
        className="relative z-10 flex flex-col items-center px-16 lg:px-24 max-w-5xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full flex items-center justify-center" style={{ maxHeight: "75vh" }}>
          <img
            key={current.id}
            src={current.img}
            alt={current.title}
            className={`lightbox-img object-contain max-h-[72vh] w-auto max-w-full ${
              sliding === "next" ? "sliding" : sliding === "prev" ? "sliding-back" : ""
            }`}
            style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.8)" }}
          />
        </div>

        {/* Caption */}
        <div className="flex items-center justify-between w-full mt-5 px-1">
          <div>
            <p className="font-display text-lg font-light" style={{ color: "var(--fg)" }}>
              {current.title}
            </p>
            <p className="text-xs tracking-widest uppercase mt-1" style={{ color: "var(--gold)" }}>
              {current.category} · {current.year}
            </p>
          </div>
          <div className="flex gap-1 mt-2">
            {works.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  if (i !== index) {
                    setSliding("next");
                    setTimeout(() => { setIndex(i); setSliding(null); }, 280);
                  }
                }}
                className="transition-all duration-300"
                style={{
                  width: i === index ? "24px" : "6px",
                  height: "3px",
                  backgroundColor: i === index ? "var(--gold)" : "rgba(240,234,216,0.2)",
                  borderRadius: "2px",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); go("next"); }}
        className="absolute right-4 lg:right-8 z-20 p-3 border transition-all duration-300 hover:border-gold"
        style={{ borderColor: "rgba(240,234,216,0.15)", color: "rgba(240,234,216,0.6)" }}
        aria-label="Next"
      >
        <ChevronRight size={20} />
      </button>

      {/* Thumbnail strip */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-2 p-4 overflow-x-auto"
        onClick={(e) => e.stopPropagation()}
        style={{ background: "linear-gradient(to top, rgba(6,6,6,0.9) 0%, transparent 100%)" }}
      >
        {works.map((w, i) => (
          <button
            key={w.id}
            onClick={() => {
              if (i !== index) {
                setSliding("next");
                setTimeout(() => { setIndex(i); setSliding(null); }, 280);
              }
            }}
            className="flex-shrink-0 transition-all duration-300"
            style={{
              width: "48px",
              height: "48px",
              opacity: i === index ? 1 : 0.35,
              outline: i === index ? "1px solid var(--gold)" : "none",
              outlineOffset: "2px",
            }}
          >
            <img src={w.thumb} alt={w.title} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<{ works: Work[]; index: number } | null>(null);

  const filtered = active === "All" ? WORKS : WORKS.filter((w) => w.category === active);

  const openLightbox = (clickedWork: Work) => {
    // Carousel shows all images in same category (or all if "All" is active)
    const categoryWorks = active === "All"
      ? WORKS.filter((w) => w.category === clickedWork.category)
      : filtered;
    const idx = categoryWorks.findIndex((w) => w.id === clickedWork.id);
    setLightbox({ works: categoryWorks, index: idx });
  };

  return (
    <>
      {lightbox && (
        <Lightbox
          works={lightbox.works}
          startIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}

      <div className="min-h-screen pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--gold)", fontFamily: "'Cabinet Grotesk', sans-serif" }}>
              The Work
            </p>
            <h1
              className="font-display font-light"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "var(--fg)", fontVariationSettings: "'opsz' 72" }}
            >
              Portfolio
            </h1>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-12">
            {CATEGORIES.map((cat) => {
              const count = cat === "All" ? WORKS.length : WORKS.filter((w) => w.category === cat).length;
              const isActive = active === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className="text-xs tracking-widest uppercase px-5 py-2.5 border transition-all duration-300 flex items-center gap-2"
                  style={{
                    borderColor: isActive ? "var(--gold)" : "var(--border)",
                    color: isActive ? "var(--gold)" : "var(--fg-muted)",
                    backgroundColor: isActive ? "transparent" : "transparent",
                  }}
                >
                  {cat}
                  <span
                    className="font-mono text-[10px]"
                    style={{ color: isActive ? "var(--gold)" : "var(--fg-muted)", opacity: 0.6 }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Masonry grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 space-y-3">
            {filtered.map((work, i) => (
              <div
                key={work.id}
                className="group relative break-inside-avoid overflow-hidden cursor-pointer"
                onClick={() => openLightbox(work)}
              >
                <img
                  src={work.thumb}
                  alt={work.title}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                {/* Hover overlay */}
                <div
                  className="absolute inset-0 flex flex-col justify-between p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: "linear-gradient(to top, rgba(6,6,6,0.92) 0%, rgba(6,6,6,0.1) 60%, transparent 100%)" }}
                >
                  {/* Top-right icon */}
                  <div className="flex justify-end">
                    <div
                      className="w-8 h-8 flex items-center justify-center border"
                      style={{ borderColor: "rgba(201,168,76,0.5)", color: "var(--gold)" }}
                    >
                      <ArrowUpRight size={12} />
                    </div>
                  </div>
                  {/* Bottom info */}
                  <div>
                    <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "var(--gold)" }}>
                      {work.category} · {work.year}
                    </p>
                    <p
                      className="font-display text-lg font-light"
                      style={{ color: "#F0EAD8", fontVariationSettings: "'opsz' 24" }}
                    >
                      {work.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-24">
              <p className="text-sm tracking-widest uppercase" style={{ color: "var(--fg-muted)" }}>No works in this category yet.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
