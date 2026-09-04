import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <div className="eyebrow mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-muted-foreground">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary animate-glow-pulse" />
          {eyebrow}
        </div>
      )}
      <h2 className="text-balance text-4xl">{title}</h2>
      {description && (
        <p className="measure mt-4 text-balance text-lg text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
