import { useEffect, useRef, useState } from "react";

/**
 * Highlights a piece of text with a thin border box that draws itself when the
 * element scrolls into view, plus a small pointer that flies into the corner.
 */
export function PointerHighlight({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>

      {/* soft glow inside the box */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-x-2 -inset-y-1 rounded-[3px] bg-primary/10 transition-opacity duration-700 delay-150"
        style={{ opacity: inView ? 1 : 0 }}
      />

      {/* thin drawn border */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-x-2 -inset-y-1 rounded-[3px] border border-primary/70 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "scaleX(1)" : "scaleX(0.9)",
          transformOrigin: "left center",
        }}
      />

      {/* pointer / cursor */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-4 -right-6 text-primary transition-all duration-500 delay-300 ease-[cubic-bezier(0.34,1.4,0.64,1)]"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translate(0,0) scale(1)" : "translate(-10px,-10px) scale(0.6)",
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="drop-shadow-[0_2px_6px_color-mix(in_oklab,var(--color-glow)_70%,transparent)]"
        >
          <path d="M5.5 3.2 19 11.4l-6.1.7-2.6 5.6z" />
        </svg>
      </span>
    </span>
  );
}
