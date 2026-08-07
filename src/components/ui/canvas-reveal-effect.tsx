import { useEffect, useRef } from "react";

/**
 * Lightweight canvas dot-matrix reveal. Dots pop in with a staggered,
 * distance-based delay from the container centre — no WebGL required.
 * Colour is read from the active theme's --primary token.
 */
export function CanvasRevealEffect({
  gap = 12,
  dotSize = 1.6,
  speed = 1,
  className = "",
  opacities = [0.15, 0.25, 0.35, 0.5, 0.7, 1],
}: {
  gap?: number;
  dotSize?: number;
  speed?: number;
  className?: string;
  opacities?: number[];
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const styles = getComputedStyle(canvas);
    const color = styles.getPropertyValue("color").trim() || "#fff";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let w = 0;
    let h = 0;
    let dots: { x: number; y: number; delay: number; op: number }[] = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cx = w / 2;
      const cy = h / 2;
      const max = Math.hypot(cx, cy) || 1;
      dots = [];
      for (let x = gap / 2; x < w; x += gap) {
        for (let y = gap / 2; y < h; y += gap) {
          const d = Math.hypot(x - cx, y - cy) / max;
          dots.push({
            x,
            y,
            delay: d * 520 + Math.random() * 220,
            op: opacities[Math.floor(Math.random() * opacities.length)] ?? 0.5,
          });
        }
      }
    };

    build();
    const start = performance.now();

    const draw = (now: number) => {
      const t = (now - start) * speed;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = color;
      let done = true;
      for (const d of dots) {
        const p = reduce ? 1 : Math.min(1, Math.max(0, (t - d.delay) / 320));
        if (p < 1) done = false;
        if (p <= 0) continue;
        const eased = 1 - Math.pow(1 - p, 3);
        ctx.globalAlpha = d.op * eased;
        const s = dotSize * (0.6 + 0.4 * eased);
        ctx.fillRect(d.x - s / 2, d.y - s / 2, s, s);
      }
      ctx.globalAlpha = 1;
      if (!done) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const ro = new ResizeObserver(() => {
      build();
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [gap, dotSize, speed, opacities]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`h-full w-full text-primary ${className}`}
    />
  );
}
