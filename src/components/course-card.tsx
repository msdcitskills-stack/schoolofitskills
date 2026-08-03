import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock, Users } from "lucide-react";
import type { Course } from "@/data/courses";

export function CourseCard({ course, index = 0 }: { course: Course; index?: number }) {
  return (
    <Link
      to="/courses/$slug"
      params={{ slug: course.slug }}
      target="_blank"
      rel="noopener"
      className="group corner-glow glare-card glow-ring bulge notch relative flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 text-card-foreground"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div className="relative z-10 flex items-start justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {(course.tags ?? []).slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-secondary text-secondary-foreground transition-transform duration-300 group-hover:rotate-45">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>

      <h3 className="relative z-10 text-balance text-lg font-bold leading-snug tracking-tight">
        {course.title}
      </h3>
      <p className="relative z-10 line-clamp-2 text-sm text-muted-foreground">
        {course.summary}
      </p>

      <div className="relative z-10 mt-auto grid grid-cols-2 gap-2 border-t border-border/60 pt-4 text-[11px] text-muted-foreground">
        <div className="flex flex-col">
          <Clock className="mb-1 h-3.5 w-3.5" />
          <span className="font-medium text-foreground">{course.duration}</span>
        </div>
        <div className="flex flex-col">
          <Users className="mb-1 h-3.5 w-3.5" />
          <span className="line-clamp-1 font-medium text-foreground">
            {course.audience.split("/")[0].trim()}
          </span>
        </div>
      </div>
    </Link>
  );
}
