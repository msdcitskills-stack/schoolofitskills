import { useRef, useState } from "react";

/**
 * Institutional brand lockup for the footer.
 *
 * Typography does the work: one unified wordmark with a restrained internal
 * hierarchy (SCHOOL / of / IT SKILLS), an institutional signature line beneath,
 * and a single slow light sweep on hover.
 */
export function FooterWordmark() {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);

  return (
    <section
      aria-label="School of IT Skills — Manipal Skill Development Centre"
      className="relative isolate overflow-hidden"
    >
      {/* ambient institutional lighting — barely visible, calm */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 118%, color-mix(in oklab, var(--color-primary) 9%, transparent) 0%, transparent 62%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, color-mix(in oklab, var(--color-border) 90%, transparent) 18%, color-mix(in oklab, var(--color-foreground) 14%, transparent) 50%, color-mix(in oklab, var(--color-border) 90%, transparent) 82%, transparent)",
        }}
      />

      <div
        ref={ref}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="mx-auto w-full max-w-7xl page-x pb-[clamp(1rem,1.6vw,1.75rem)] pt-[clamp(2.25rem,5vw,4.5rem)]"
      >
      <div className="moving-border relative mx-auto flex w-full flex-col items-center rounded-[clamp(1.25rem,2.5vw,2rem)] px-[clamp(1rem,3vw,3rem)] pb-[clamp(1.5rem,2.4vw,2.25rem)] pt-[clamp(2rem,4.5vw,3.5rem)]">
        {/* ── Wordmark ───────────────────────────────────────────────── */}
        <h2 className="relative select-none text-center font-display font-semibold text-foreground/85">

          {/* soft tonal bloom behind the mark */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[150%] w-[125%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] opacity-50 blur-3xl"
            style={{
              background:
                "radial-gradient(60% 60% at 50% 50%, color-mix(in oklab, var(--color-primary) 12%, transparent), transparent 78%)",
            }}
          />

          {/* one intentional lockup: two lines on small screens, one on lg+ */}
          <span
            className="flex flex-col items-center leading-[0.92] sm:flex-row sm:flex-wrap sm:justify-center"
            style={{ gap: "clamp(0.35rem, 2.4vw, 2.9rem)" }}
          >
            <span
              className="text-live block text-[clamp(2.35rem,13vw,4.25rem)] tracking-[-0.035em] transition-opacity duration-[650ms] ease-out lg:text-[clamp(3.5rem,7.4vw,6.5rem)]"
              style={{ opacity: hover ? 1 : 0.94 }}
            >
              SCHOOL
            </span>
            <span
              className="hidden font-normal text-[clamp(2.35rem,13vw,4.25rem)] tracking-[-0.01em] text-foreground/45 transition-[opacity,color] duration-[650ms] ease-out sm:inline-block lg:text-[clamp(3.5rem,7.4vw,6.5rem)]"
              style={{ opacity: hover ? 0.75 : 0.5 }}
            >
              of
            </span>
            <span
              className="text-live block text-[clamp(2.35rem,13vw,4.25rem)] tracking-[-0.035em] transition-opacity duration-[650ms] ease-out lg:text-[clamp(3.5rem,7.4vw,6.5rem)]"
              style={{ opacity: hover ? 1 : 0.94 }}
            >
              <span className="sm:hidden font-normal text-foreground/45">of </span>
              IT SKILLS
            </span>
          </span>

          {/* slow light sweep — masked to the wordmark's own box */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden motion-reduce:hidden"
          >
            <span
              className="absolute inset-y-0 w-1/3 transition-transform duration-[800ms] ease-out"
              style={{
                transform: `translateX(${hover ? "340%" : "-140%"})`,
                background:
                  "linear-gradient(100deg, transparent, color-mix(in oklab, var(--color-primary) 22%, transparent), transparent)",
                filter: "blur(18px)",
              }}
            />
          </span>
        </h2>

        {/* ── Institutional signature ────────────────────────────────── */}
        <div className="mt-[clamp(1.75rem,3.2vw,3rem)] flex w-full max-w-xl items-center justify-center gap-[clamp(0.75rem,2vw,1.5rem)]">
          <span
            aria-hidden
            className="h-px flex-1 max-w-[6rem]"
            style={{
              background:
                "linear-gradient(90deg, transparent, color-mix(in oklab, var(--color-foreground) 20%, transparent))",
            }}
          />
          <p
            className="text-center font-mono text-[clamp(0.58rem,1.6vw,0.72rem)] font-medium uppercase leading-[1.5] tracking-[0.32em] text-muted-foreground/75 transition-colors duration-[650ms] ease-out"
            style={{ color: hover ? "var(--color-muted-foreground)" : undefined }}
          >
            Manipal Skill
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> </span>
            Development Centre
          </p>
          <span
            aria-hidden
            className="h-px flex-1 max-w-[6rem]"
            style={{
              background:
                "linear-gradient(90deg, color-mix(in oklab, var(--color-foreground) 20%, transparent), transparent)",
            }}
          />
        </div>
      </div>
      </div>

    </section>
  );
}
