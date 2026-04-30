"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className="fixed bottom-8 right-8 z-50 w-11 h-11 border flex items-center justify-center transition-all duration-300"
      style={{
        borderColor: "var(--gold)",
        backgroundColor: "var(--bg)",
        color: "var(--gold)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "all" : "none",
        transform: visible ? "translateY(0)" : "translateY(12px)",
      }}
    >
      <ArrowUp size={14} />
    </button>
  );
}