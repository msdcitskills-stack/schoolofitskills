import { useRef, useState } from "react";
import { Github, Linkedin, Facebook, Instagram, Twitter } from "lucide-react";

const socials = [
  {
    href: "https://github.com/msdcitskills-stack",
    label: "GitHub",
    icon: Github,
  },
  {
    href: "https://www.linkedin.com/company/school-of-it-skills/",
    label: "LinkedIn",
    icon: Linkedin,
  },
  {
    href: "https://www.facebook.com/people/School-of-It-Skills-MSDC/61591697824330/",
    label: "Facebook",
    icon: Facebook,
  },
  {
    href: "https://www.instagram.com/msdc_school_of_itskills",
    label: "Instagram",
    icon: Instagram,
  },
  {
    href: "https://medium.com/@msdc.itskills",
    label: "Medium",
    icon: MediumIcon,
  },
  {
    href: "https://www.reddit.com/user/Spiritual_Object3732/",
    label: "Reddit",
    icon: RedditIcon,
  },
  {
    href: "https://x.com/SchoolofITSkill",
    label: "X (Twitter)",
    icon: Twitter,
  },
];

function MediumIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.54 12a6.8 6.8 0 1 1-13.6 0 6.8 6.8 0 0 1 13.6 0Zm7.46 0c0 3.54-.86 6.4-1.92 6.4-1.06 0-1.92-2.86-1.92-6.4s.86-6.4 1.92-6.4 1.92 2.86 1.92 6.4Zm3 0c0 3.17-.3 5.74-.68 5.74-.37 0-.68-2.57-.68-5.74 0-3.17.3-5.74.68-5.74.38 0 .68 2.57.68 5.74Z" />
    </svg>
  );
}
function RedditIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 12.1a2.1 2.1 0 0 0-3.55-1.53c-1.4-.94-3.3-1.54-5.4-1.62l1.1-3.4 2.94.66a1.5 1.5 0 1 0 .17-.98l-3.35-.75a.5.5 0 0 0-.58.34l-1.28 3.94c-2.1.08-4 .68-5.4 1.61A2.1 2.1 0 1 0 3.4 14.3a3.9 3.9 0 0 0-.05.63c0 3.1 3.87 5.6 8.65 5.6s8.65-2.5 8.65-5.6c0-.21-.02-.42-.05-.63A2.1 2.1 0 0 0 22 12.1ZM8.5 13.5a1.2 1.2 0 1 1 2.4 0 1.2 1.2 0 0 1-2.4 0Zm7.3 3.4c-.98.98-2.86 1.05-3.8 1.05s-2.83-.07-3.81-1.05a.4.4 0 0 1 .57-.57c.62.62 1.95.85 3.24.85s2.62-.23 3.24-.85a.4.4 0 0 1 .56.57Zm-.6-2.2a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Z" />
    </svg>
  );
}

export function FloatingDock() {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <div className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2 sm:bottom-auto sm:left-auto sm:right-5 sm:top-1/2 sm:-translate-x-0 sm:-translate-y-1/2">
      <div
        className="glass flex flex-row items-center gap-2 rounded-full px-4 py-3 sm:flex-col sm:px-3 sm:py-4 shadow-[0_20px_60px_-25px_color-mix(in_oklab,var(--color-foreground)_60%,transparent)]"
        onMouseLeave={() => setHovered(null)}
      >
        {socials.map((s, i) => {
          const Icon = s.icon;
          const active = hovered === i;
          const near = hovered !== null && Math.abs(hovered - i) === 1;
          const size = active ? "h-13 w-13" : near ? "h-11 w-11" : "h-10 w-10";
          return (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={s.label}
              onMouseEnter={() => setHovered(i)}
              className={`group relative flex ${size} items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-all duration-300 hover:bg-primary hover:text-primary-foreground`}
            >
              <Icon className="h-4 w-4" />
              <span
                className={`pointer-events-none absolute bottom-[calc(100%+0.6rem)] left-1/2 -translate-x-1/2 sm:bottom-auto sm:left-auto sm:translate-x-0 sm:right-[calc(100%+0.75rem)] whitespace-nowrap rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground shadow-md transition-all duration-200 ${
                  active ? "opacity-100 translate-x-0" : "opacity-0 translate-x-1"
                }`}
              >
                {s.label}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

