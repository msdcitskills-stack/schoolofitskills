const stack = [
  { name: "Python", icon: "🐍" },
  { name: "JavaScript", icon: "𝗝𝗦" },
  { name: "React", icon: "⚛" },
  { name: "Django", icon: "◆" },
  { name: "Node.js", icon: "⬢" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "SQL", icon: "𝓢" },
  { name: "Power BI", icon: "📊" },
  { name: "Excel VBA", icon: "𝑿" },
  { name: "Tally Prime", icon: "T" },
  { name: "ChatGPT", icon: "✦" },
  { name: "TensorFlow", icon: "𝓣" },
  { name: "Scikit-learn", icon: "◐" },
  { name: "pandas", icon: "🐼" },
  { name: "R", icon: "𝐑" },
  { name: "Bootstrap", icon: "B" },
  { name: "HTML5", icon: "5" },
  { name: "CSS", icon: "≡" },
  { name: "Git", icon: "⎇" },
  { name: "Cyber Sec", icon: "🛡" },
];

export function TechMarquee() {
  const items = [...stack, ...stack];
  return (
    <div
      className="group/marquee relative overflow-hidden py-6"
      style={{
        maskImage:
          "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div
        className="flex w-max animate-marquee gap-4 group-hover/marquee:[animation-play-state:paused]"
      >
        {items.map((s, i) => (
          <div
            key={i}
            className="group/chip glass flex shrink-0 items-center gap-3 rounded-lg border border-dashed border-border/80 px-5 py-3 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[0_10px_30px_-10px_color-mix(in_oklab,var(--color-glow)_80%,transparent)]"
            style={{ borderStyle: "dotted" }}
          >
            <span
              className="grid h-8 w-8 place-items-center rounded-md bg-secondary text-sm font-bold text-secondary-foreground transition-transform duration-300 group-hover/chip:rotate-12 group-hover/chip:scale-110"
              aria-hidden
            >
              {s.icon}
            </span>
            <span className="text-sm font-semibold tracking-tight transition-colors duration-300 group-hover/chip:text-primary">
              {s.name}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-primary opacity-0 transition-opacity duration-300 group-hover/chip:opacity-100" />
          </div>
        ))}
      </div>
    </div>
  );
}
