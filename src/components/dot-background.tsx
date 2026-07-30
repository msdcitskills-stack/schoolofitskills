import { type ReactNode } from "react";
import { ClientOnly } from "@tanstack/react-router";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";

export function DotBackground({
  children,
  className = "",
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative isolate ${className}`}>
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          maskImage: "radial-gradient(ellipse at center, black 45%, transparent 80%)",
        }}
      >
        <ClientOnly fallback={<div className="absolute inset-0 dot-field" />}>
          <DottedGlowBackground />
        </ClientOnly>
      </div>
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        aria-hidden
        style={{
          background:
            "radial-gradient(60% 45% at 50% 0%, color-mix(in oklab, var(--color-glow) 28%, transparent), transparent 70%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
