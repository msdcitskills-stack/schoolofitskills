import { useEffect, useRef, type ButtonHTMLAttributes, type ReactNode } from "react";

export function MagneticButton({
  children,
  className = "",
  strength = 26,
  plate = true,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  strength?: number;
  /** Show the dashed offset plate behind the button */
  plate?: boolean;
}) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // spring state
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const vel = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const stiffness = 0.14;
    const damping = 0.72;

    const tick = () => {
      const p = pos.current;
      const v = vel.current;
      const t = target.current;

      v.x = (v.x + (t.x - p.x) * stiffness) * damping;
      v.y = (v.y + (t.y - p.y) * stiffness) * damping;
      p.x += v.x;
      p.y += v.y;

      if (btnRef.current) {
        btnRef.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
      }

      const settled =
        Math.abs(t.x - p.x) < 0.05 &&
        Math.abs(t.y - p.y) < 0.05 &&
        Math.abs(v.x) < 0.05 &&
        Math.abs(v.y) < 0.05;

      if (settled) {
        p.x = t.x;
        p.y = t.y;
        if (btnRef.current) {
          btnRef.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
        }
        raf.current = null;
        return;
      }
      raf.current = requestAnimationFrame(tick);
    };

    const start = () => {
      if (raf.current == null) raf.current = requestAnimationFrame(tick);
    };

    (wrapRef.current as HTMLSpanElement & { __start?: () => void }).__start = start;

    return () => {
      if (raf.current != null) cancelAnimationFrame(raf.current);
      raf.current = null;
    };
  }, []);

  const kick = () => {
    const el = wrapRef.current as (HTMLSpanElement & { __start?: () => void }) | null;
    el?.__start?.();
  };

  const onMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    target.current = {
      x: (x / rect.width) * strength,
      y: (y / rect.height) * strength * 1.4,
    };
    kick();
  };

  const onLeave = () => {
    target.current = { x: 0, y: 0 };
    kick();
  };

  return (
    <span
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative inline-flex isolate p-2"
    >
      {plate && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-2 -z-10 translate-x-2 translate-y-2 rounded-full border border-dashed border-border bg-muted/60"
        />
      )}
      <button
        ref={btnRef}
        className={`relative inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground shadow-lg transition-[box-shadow,filter] duration-300 will-change-transform hover:shadow-[0_20px_50px_-15px_color-mix(in_oklab,var(--color-glow)_70%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}
        {...rest}
      >
        {children}
      </button>
    </span>
  );
}
