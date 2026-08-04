import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const offsets: Record<Direction, string> = {
  up: "translate3d(0,28px,0)",
  down: "translate3d(0,-28px,0)",
  left: "translate3d(28px,0,0)",
  right: "translate3d(-28px,0,0)",
  none: "translate3d(0,0,0)",
};

/** One shared observer for every reveal on the page — far cheaper than one each. */
type Cb = (inView: boolean) => void;
let sharedIO: IntersectionObserver | null = null;
const callbacks = new WeakMap<Element, Cb>();

function observe(el: Element, cb: Cb) {
  if (typeof IntersectionObserver === "undefined") {
    cb(true);
    return () => {};
  }
  if (!sharedIO) {
    sharedIO = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            callbacks.get(entry.target)?.(true);
            sharedIO?.unobserve(entry.target);
            callbacks.delete(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
  }
  callbacks.set(el, cb);
  sharedIO.observe(el);
  return () => {
    sharedIO?.unobserve(el);
    callbacks.delete(el);
  };
}

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return observe(el, () => setInView(true));
  }, []);

  return { ref, inView };
}

/** True on phones/tablets, where blur filters and long transitions get expensive. */
function useLite() {
  const [lite, setLite] = useState(false);
  useEffect(() => {
    setLite(
      window.matchMedia("(pointer: coarse)").matches ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);
  return lite;
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
  const lite = useLite();
  const useBlur = blur && !lite;
  const d = lite ? Math.min(duration, 450) : duration;

  return (
    <Tag
      ref={ref}
      className={`motion-reduce:!opacity-100 motion-reduce:!blur-0 motion-reduce:!transform-none ${className}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translate3d(0,0,0)" : offsets[direction],
        filter: useBlur ? (inView ? "blur(0px)" : "blur(6px)") : undefined,
        transition: `opacity ${d}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform ${d}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms${useBlur ? `, filter ${d}ms ease ${delay}ms` : ""}`,
        willChange: inView ? undefined : "transform, opacity",
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
  const lite = useLite();
  const items = Array.isArray(children) ? children : [children];
  const d = lite ? Math.min(duration, 430) : duration;
  const s = lite ? Math.min(step, 45) : step;

  return (
    <div ref={ref} className={className}>
      {items.map((child, i) => (
        <div
          key={i}
          className="motion-reduce:!opacity-100 motion-reduce:!transform-none"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translate3d(0,0,0)" : offsets[direction],
            transition: `opacity ${d}ms cubic-bezier(0.22,1,0.36,1) ${Math.min(i, 10) * s}ms, transform ${d}ms cubic-bezier(0.22,1,0.36,1) ${Math.min(i, 10) * s}ms`,
            height: "100%",
            willChange: inView ? undefined : "transform, opacity",
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
    let lastY = Number.NaN;

    const io = new IntersectionObserver(([e]) => {
      visible = !!e?.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(update);
    });
    io.observe(el);

    function update() {
      raf = 0;
      if (!visible) return;
      const rect = el!.getBoundingClientRect();
      const progress = (rect.top + rect.height / 2) / window.innerHeight - 0.5;
      const y = Math.round(-progress * strength * 100) / 100;
      if (y === lastY) return;
      lastY = y;
      el!.style.transform = `translate3d(0, ${y}px, 0)`;
    }

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
