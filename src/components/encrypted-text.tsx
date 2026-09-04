import { useCallback, useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!<>-_\\/[]{}—=+*^?#01";

/**
 * Encrypted / scramble text reveal.
 * Characters decode left-to-right; replays on hover.
 */
export function EncryptedText({
  text,
  className = "",
  speed = 28,
  revealDelay = 22,
  as: Tag = "span",
  scrambleClassName = "text-primary",
}: {
  text: string;
  className?: string;
  /** ms per animation frame step */
  speed?: number;
  /** ms of extra delay per character before it locks in */
  revealDelay?: number;
  as?: "span" | "h1" | "h2" | "p";
  scrambleClassName?: string;
}) {
  const [frame, setFrame] = useState(0);
  const [running, setRunning] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalFrames = Math.ceil((text.length * revealDelay) / speed) + 8;

  const run = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    setFrame(0);
    setRunning(true);
    let f = 0;
    timer.current = setInterval(() => {
      f += 1;
      setFrame(f);
      if (f >= totalFrames) {
        if (timer.current) clearInterval(timer.current);
        timer.current = null;
        setRunning(false);
      }
    }, speed);
  }, [speed, totalFrames]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer.current) clearInterval(timer.current);
    };
  }, [run]);

  const revealedCount = (frame * speed) / revealDelay;

  return (
    <Tag
      ref={ref as never}
      className={className}
      onMouseEnter={() => {
        if (!running) run();
      }}
      aria-label={text}
    >
      {text.split("").map((ch, i) => {
        if (ch === " ") return <span key={i}> </span>;
        const decoded = !running || i < revealedCount;
        if (decoded) {
          return (
            <span key={i} aria-hidden>
              {ch}
            </span>
          );
        }
        const glyph = GLYPHS[(i * 7 + frame * 13) % GLYPHS.length];
        return (
          <span key={i} aria-hidden className={`${scrambleClassName} opacity-70`}>
            {glyph}
          </span>
        );
      })}
    </Tag>
  );
}
