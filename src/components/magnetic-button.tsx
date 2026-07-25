import { useRef, type ButtonHTMLAttributes, type ReactNode } from "react";

export function MagneticButton({
  children,
  className = "",
  strength = 22,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLButtonElement>(null);

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${(x / rect.width) * strength}px, ${(y / rect.height) * strength}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };

  return (
    <button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground shadow-lg transition-[transform,box-shadow] duration-300 will-change-transform hover:shadow-[0_20px_50px_-15px_color-mix(in_oklab,var(--color-glow)_70%,transparent)] ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
