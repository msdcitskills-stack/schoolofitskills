import { useRef, useState, createContext, useContext } from "react";

const Card3DContext = createContext(false);

/** Wraps children in a perspective container and tilts them toward the cursor. */
export function Card3D({
  children,
  className = "",
  intensity = 12,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) scale(1.02)`;
    el.style.setProperty("--mx", `${(x + 0.5) * 100}%`);
    el.style.setProperty("--my", `${(y + 0.5) * 100}%`);
  };

  const reset = () => {
    setHovered(false);
    if (ref.current) ref.current.style.transform = "rotateY(0deg) rotateX(0deg) scale(1)";
  };

  return (
    <div className={`[perspective:1200px] ${className}`}>
      <Card3DContext.Provider value={hovered}>
        <div
          ref={ref}
          onMouseEnter={() => setHovered(true)}
          onMouseMove={handleMove}
          onMouseLeave={reset}
          className="relative h-full w-full transition-transform duration-200 ease-out [transform-style:preserve-3d] will-change-transform"
        >
          {children}
        </div>
      </Card3DContext.Provider>
    </div>
  );
}

/** Lifts its children off the card surface on hover. */
export function Card3DItem({
  children,
  z = 40,
  className = "",
}: {
  children: React.ReactNode;
  z?: number;
  className?: string;
}) {
  const hovered = useContext(Card3DContext);
  return (
    <div
      className={`transition-transform duration-200 ease-out [transform-style:preserve-3d] ${className}`}
      style={{ transform: hovered ? `translateZ(${z}px)` : "translateZ(0px)" }}
    >
      {children}
    </div>
  );
}
