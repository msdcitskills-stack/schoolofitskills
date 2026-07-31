import { useEffect, useRef } from "react";

type Props = {
  className?: string;
  /** spacing between dots in px */
  gap?: number;
  /** base dot radius in px */
  dotSize?: number;
  /** how fast the glow breathes */
  speed?: number;
};

/**
 * Canvas dotted field where every dot glows, brightest toward the centre
 * and softly breathing outward in waves. Colors come from the active theme
 * tokens so it adapts to every color scheme.
 */
export function DottedGlowBackground({
  className = "",
  gap = 22,
  dotSize = 1.6,
  speed = 1,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const styles = getComputedStyle(canvas);
    const glow = styles.getPropertyValue("--glow").trim() || "#ffcc33";
    const base = styles.getPropertyValue("--foreground").trim() || "#000";

    let width = 0;
    let height = 0;
    let raf = 0;
    let start = performance.now();
    let visible = true;
    let last = 0;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 2);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Fewer, cheaper dots and a lower frame budget on phones/tablets.
    const step = coarse ? gap * 1.4 : gap;
    const fps = coarse ? 30 : 60;
    const frameGap = 1000 / fps;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      if (now - last < frameGap) return;
      last = now;
      const t = ((now - start) / 1000) * speed;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const maxDist = Math.hypot(cx, cy) || 1;

      for (let y = step / 2; y < height; y += step) {
        for (let x = step / 2; x < width; x += step) {
          const dx = (x - cx) / maxDist;
          const dy = (y - cy) / maxDist;
          const d = Math.hypot(dx, dy);

          // centre-weighted falloff
          const centre = Math.max(0, 1 - d * 1.15);
          // outward breathing wave
          const wave = reduce ? 0.5 : 0.5 + 0.5 * Math.sin(t * 1.4 - d * 6);
          const intensity = centre * (0.35 + 0.65 * wave);

          if (intensity <= 0.01) {
            ctx.globalAlpha = 0.12;
            ctx.shadowBlur = 0;
            ctx.fillStyle = base;
            ctx.beginPath();
            ctx.arc(x, y, dotSize * 0.7, 0, Math.PI * 2);
            ctx.fill();
            continue;
          }

          ctx.globalAlpha = 0.18 + intensity * 0.82;
          ctx.fillStyle = glow;
          ctx.shadowColor = glow;
          ctx.shadowBlur = 4 + intensity * 12;
          ctx.beginPath();
          ctx.arc(x, y, dotSize * (0.75 + intensity * 0.75), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    };

    resize();
    start = performance.now();
    raf = requestAnimationFrame(draw);

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    // Stop painting when scrolled out of view or the tab is hidden.
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting && !document.hidden;
    });
    io.observe(canvas);
    const onVisibility = () => {
      visible = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [gap, dotSize, speed]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
