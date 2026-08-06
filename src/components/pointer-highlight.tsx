import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * Highlights a piece of text with an animated thin border box that draws
 * itself when the element scrolls into view, plus a small cursor/pointer
 * that flies into the bottom-right corner.
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
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>

      {/* thin drawn border */}
      <motion.span
        aria-hidden
        initial={{ opacity: 0, scale: 0.96 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute -inset-x-1.5 -inset-y-1 rounded-[3px] border border-primary/70"
        style={{ transformOrigin: "left center" }}
      />

      {/* soft glow inside the box */}
      <motion.span
        aria-hidden
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="pointer-events-none absolute -inset-x-1.5 -inset-y-1 rounded-[3px] bg-primary/8"
      />

      {/* pointer / cursor */}
      <motion.span
        aria-hidden
        initial={{ opacity: 0, x: -8, y: -8, scale: 0.6 }}
        animate={inView ? { opacity: 1, x: 0, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.45, delay: 0.35, ease: [0.34, 1.4, 0.64, 1] }}
        className="pointer-events-none absolute -bottom-4 -right-5 text-primary"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="drop-shadow-[0_2px_6px_color-mix(in_oklab,var(--color-glow)_70%,transparent)]"
        >
          <path d="M5.5 3.2 19 11.4l-6.1.7-2.6 5.6z" />
        </svg>
      </motion.span>
    </span>
  );
}
