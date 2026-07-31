import { useEffect, useRef } from "react";

/** Thin gradient bar at the top of the page tracking scroll progress. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;

    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.style.transform = `scaleX(${p})`;
      el.style.opacity = p > 0.005 ? "1" : "0";
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]" aria-hidden>
      <div
        ref={ref}
        className="h-full w-full origin-left scale-x-0 opacity-0 transition-opacity duration-300 will-change-transform"
        style={{
          background:
            "linear-gradient(90deg, color-mix(in oklab, var(--color-primary) 90%, transparent), var(--color-glow), color-mix(in oklab, var(--color-accent) 90%, transparent))",
          boxShadow: "0 0 14px color-mix(in oklab, var(--color-glow) 70%, transparent)",
        }}
      />
    </div>
  );
}
