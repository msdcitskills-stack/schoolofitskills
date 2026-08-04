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

const LEVELS = 12;

/**
 * Canvas dotted field where every dot glows, brightest toward the centre
 * and softly breathing outward in waves. Colors come from the active theme
 * tokens so it adapts to every color scheme.
 *
 * Perf: glow sprites are pre-rendered once into an offscreen canvas, so each
 * frame is a cheap `drawImage` blit instead of thousands of blurred arcs.
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
    const ctx = canvas.getContext("2d", { alpha: true });
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
    const step = coarse ? gap * 1.5 : gap;
    const fps = coarse ? 24 : 40;
    const frameGap = 1000 / fps - 1;

    // ---- Pre-rendered sprites (one per intensity level + one dim dot) ----
    const maxR = dotSize * 1.5;
    const maxBlur = 16;
    const spriteSize = Math.ceil((maxR + maxBlur) * 2);
    const sprites: HTMLCanvasElement[] = [];

    const makeSprite = (paint: (c: CanvasRenderingContext2D, mid: number) => void) => {
      const s = document.createElement("canvas");
      s.width = s.height = Math.ceil(spriteSize * dpr);
      const sc = s.getContext("2d")!;
      sc.setTransform(dpr, 0, 0, dpr, 0, 0);
      paint(sc, spriteSize / 2);
      return s;
    };

    const dimSprite = makeSprite((sc, mid) => {
      sc.globalAlpha = 0.12;
      sc.fillStyle = base;
      sc.beginPath();
      sc.arc(mid, mid, dotSize * 0.7, 0, Math.PI * 2);
      sc.fill();
    });

    for (let i = 0; i < LEVELS; i++) {
      const intensity = i / (LEVELS - 1);
      sprites.push(
        makeSprite((sc, mid) => {
          sc.fillStyle = glow;
          sc.shadowColor = glow;
          sc.shadowBlur = 4 + intensity * 12;
          sc.beginPath();
          sc.arc(mid, mid, dotSize * (0.75 + intensity * 0.75), 0, Math.PI * 2);
          sc.fill();
        }),
      );
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      if (w === width && h === height) return;
      width = w;
      height = h;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      last = 0;
    };

    const half = spriteSize / 2;

    const paint = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      const maxDist = Math.hypot(cx, cy) || 1;

      for (let y = step / 2; y < height; y += step) {
        for (let x = step / 2; x < width; x += step) {
          const dx = (x - cx) / maxDist;
          const dy = (y - cy) / maxDist;
          const d = Math.hypot(dx, dy);

          const centre = 1 - d * 1.15;
          if (centre <= 0.01) {
            ctx.globalAlpha = 1;
            ctx.drawImage(dimSprite, x - half, y - half, spriteSize, spriteSize);
            continue;
          }
          const wave = reduce ? 0.5 : 0.5 + 0.5 * Math.sin(t * 1.4 - d * 6);
          const intensity = centre * (0.35 + 0.65 * wave);
          if (intensity <= 0.01) {
            ctx.globalAlpha = 1;
            ctx.drawImage(dimSprite, x - half, y - half, spriteSize, spriteSize);
            continue;
          }

          ctx.globalAlpha = 0.18 + intensity * 0.82;
          const sprite = sprites[Math.min(LEVELS - 1, (intensity * LEVELS) | 0)]!;
          ctx.drawImage(sprite, x - half, y - half, spriteSize, spriteSize);
        }
      }
      ctx.globalAlpha = 1;
    };

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      if (now - last < frameGap) return;
      last = now;
      paint(((now - start) / 1000) * speed);
    };

    resize();
    start = performance.now();

    if (reduce) {
      // Static field: paint once, never animate.
      paint(0);
    } else {
      raf = requestAnimationFrame(draw);
    }

    let resizeRaf = 0;
    const observer = new ResizeObserver(() => {
      if (resizeRaf) return;
      resizeRaf = requestAnimationFrame(() => {
        resizeRaf = 0;
        resize();
        if (reduce) paint(0);
      });
    });
    observer.observe(canvas);

    // Stop painting when scrolled out of view or the tab is hidden.
    const io = new IntersectionObserver(
      ([e]) => {
        visible = !!e?.isIntersecting && !document.hidden;
      },
      { rootMargin: "120px" },
    );
    io.observe(canvas);
    const onVisibility = () => {
      visible = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(resizeRaf);
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
