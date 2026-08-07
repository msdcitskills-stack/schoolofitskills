import { useEffect, useRef } from "react";

/**
 * TracingBeam — a curvy glowing beam pinned to the left edge that traces the
 * page as you scroll. The lit length eases with scroll velocity, and a comet
 * head rides the curve.
 */
export function TracingBeam() {
  const pathRef = useRef<SVGPathElement>(null);
  const litRef = useRef<SVGPathElement>(null);
  const headRef = useRef<SVGCircleElement>(null);
  const haloRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const lit = litRef.current;
    const head = headRef.current;
    const halo = haloRef.current;
    if (!path || !lit || !head || !halo) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = path.getTotalLength();
    lit.style.strokeDasharray = `${total}`;
    lit.style.strokeDashoffset = `${total}`;

    let raf = 0;
    let current = 0;
    let target = 0;
    let last = 0;
    let velocity = 0;

    const readTarget = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      target = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      velocity = Math.min(0.14, Math.abs(target - last) * 3);
      last = target;
    };

    const frame = () => {
      raf = 0;
      current += (target - current) * (reduced ? 1 : 0.12);
      const p = Math.min(1, Math.max(0, current));
      // Beam length swells with scroll speed.
      const glowLen = 0.06 + velocity;
      const len = total * p;

      lit.style.strokeDashoffset = `${total - len}`;
      lit.style.opacity = p > 0.002 ? "1" : "0";

      const pt = path.getPointAtLength(len);
      head.setAttribute("cx", `${pt.x}`);
      head.setAttribute("cy", `${pt.y}`);
      halo.setAttribute("cx", `${pt.x}`);
      halo.setAttribute("cy", `${pt.y}`);
      halo.setAttribute("r", `${8 + glowLen * 90}`);
      head.style.opacity = p > 0.002 ? "1" : "0";
      halo.style.opacity = p > 0.002 ? `${0.28 + velocity * 3}` : "0";

      velocity *= 0.9;
      if (Math.abs(target - current) > 0.0004 || velocity > 0.001) {
        raf = requestAnimationFrame(frame);
      }
    };

    const kick = () => {
      readTarget();
      if (!raf) raf = requestAnimationFrame(frame);
    };

    kick();
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-2 top-0 z-40 hidden h-screen w-16 lg:block"
    >
      <svg
        viewBox="0 0 64 800"
        preserveAspectRatio="none"
        className="h-full w-full overflow-visible"
      >
        <defs>
          <linearGradient id="beam-lit" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0" />
            <stop offset="18%" stopColor="var(--color-primary)" stopOpacity="0.85" />
            <stop offset="55%" stopColor="var(--color-glow)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.95" />
          </linearGradient>
          <filter id="beam-blur" x="-200%" y="-50%" width="500%" height="200%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        {/* Track */}
        <path
          d="M40 0 L40 250 L16 290 L16 520 L44 560 L44 800"
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="1"
          strokeOpacity="0.55"
          vectorEffect="non-scaling-stroke"
        />

        {/* Lit beam — crisp line */}
        <path
          ref={pathRef}
          d="M40 0 L40 250 L16 290 L16 520 L44 560 L44 800"
          fill="none"
          stroke="none"
        />
        <path
          ref={litRef}
          d="M40 0 L40 250 L16 290 L16 520 L44 560 L44 800"
          fill="none"
          stroke="url(#beam-lit)"
          strokeWidth="1.6"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          className="opacity-0 transition-opacity duration-300"
        />


        <circle ref={haloRef} r="16" fill="var(--color-glow)" filter="url(#beam-blur)" className="opacity-0" />
        <circle ref={headRef} r="3" fill="var(--color-glow)" className="opacity-0 transition-opacity duration-300" />
      </svg>
    </div>
  );
}
