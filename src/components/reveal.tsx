import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const offsets: Record<Direction, string> = {
  up: "translate3d(0,28px,0)",
  down: "translate3d(0,-28px,0)",
  left: "translate3d(28px,0,0)",
  right: "translate3d(-28px,0,0)",
  none: "translate3d(0,0,0)",
};

function useInView<T extends HTMLElement>(once = true, rootMargin = "0px 0px -12% 0px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once, rootMargin]);

  return { ref, inView };
}

/** Fades + slides its children into place the first time they scroll into view. */
export function Reveal({
  children,
  as: Tag = "div",
  className = "",
  direction = "up",
  delay = 0,
  duration = 700,
  blur = true,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  direction?: Direction;
  delay?: number;
  duration?: number;
  blur?: boolean;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      className={`motion-reduce:!opacity-100 motion-reduce:!blur-0 motion-reduce:!transform-none ${className}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translate3d(0,0,0)" : offsets[direction],
        filter: blur ? (inView ? "blur(0px)" : "blur(6px)") : undefined,
        transition: `opacity ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, filter ${duration}ms ease ${delay}ms`,
        willChange: inView ? "auto" : "transform, opacity",
      }}
    >
      {children}
    </Tag>
  );
}

/** Reveals direct children one after another as the group enters the viewport. */
export function RevealGroup({
  children,
  className = "",
  step = 70,
  direction = "up",
  duration = 650,
}: {
  children: ReactNode;
  className?: string;
  step?: number;
  direction?: Direction;
  duration?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const items = Array.isArray(children) ? children : [children];

  return (
    <div ref={ref} className={className}>
      {items.map((child, i) => (
        <div
          key={i}
          className="motion-reduce:!opacity-100 motion-reduce:!transform-none"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translate3d(0,0,0)" : offsets[direction],
            transition: `opacity ${duration}ms cubic-bezier(0.22,1,0.36,1) ${Math.min(i, 12) * step}ms, transform ${duration}ms cubic-bezier(0.22,1,0.36,1) ${Math.min(i, 12) * step}ms`,
            height: "100%",
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

/** Moves its children slightly against the scroll direction for depth. */
export function Parallax({
  children,
  className = "",
  strength = 40,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    let visible = true;

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);

    const update = () => {
      raf = 0;
      if (!visible) return;
      const rect = el.getBoundingClientRect();
      const progress = (rect.top + rect.height / 2) / window.innerHeight - 0.5;
      el.style.transform = `translate3d(0, ${(-progress * strength).toFixed(2)}px, 0)`;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [strength]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
