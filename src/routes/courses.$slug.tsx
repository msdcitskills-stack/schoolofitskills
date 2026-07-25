import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  GraduationCap,
  IndianRupee,
  Sparkles,
  Users,
} from "lucide-react";
import { DotBackground } from "@/components/dot-background";
import { MagneticButton } from "@/components/magnetic-button";
import { CourseCard } from "@/components/course-card";
import { getCourse, courses, categoryMeta } from "@/data/courses";

export const Route = createFileRoute("/courses/$slug")({
  loader: ({ params }) => {
    const course = getCourse(params.slug);
    if (!course) throw notFound();
    return { course };
  },

  head: ({ loaderData }) => {
    const c = loaderData?.course;
    return {
      meta: c
        ? [
            { title: `${c.title} — School of IT Skills` },
            { name: "description", content: c.summary },
            { property: "og:title", content: c.title },
            { property: "og:description", content: c.summary },
          ]
        : [{ title: "Course — School of IT Skills" }],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="text-3xl font-bold">Course not found</h1>
      <Link to="/courses" className="mt-6 inline-block text-sm text-primary underline">
        Back to catalogue
      </Link>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="text-2xl font-bold">Couldn't load this course</h1>
      <button onClick={reset} className="mt-6 text-sm text-primary underline">
        Try again
      </button>
    </div>
  ),
  component: CoursePage,
});

function CoursePage() {
  const { course } = Route.useLoaderData() as { course: import("@/data/courses").Course };

  const related = courses
    .filter((c) => c.category === course.category && c.slug !== course.slug)
    .slice(0, 3);
  const cat = categoryMeta[course.category];

  return (
    <div>
      <DotBackground>
        <section className="mx-auto max-w-6xl px-6 pb-14 pt-6">
          <Link
            to="/courses"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All courses
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-widest text-secondary-foreground">
              {cat.label}
            </span>
            {course.level && (
              <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
                {course.level}
              </span>
            )}
            {(course.tags ?? []).map((t) => (
              <span
                key={t}
                className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>

          <h1 className="mt-4 max-w-4xl text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            {course.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-muted-foreground">{course.summary}</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            <Stat icon={Clock} label="Duration" value={course.duration} />
            <Stat icon={IndianRupee} label="Program Fee" value={course.fee} />
            <Stat icon={Users} label="Who can attend" value={course.audience} />
            <Stat
              icon={GraduationCap}
              label="Track"
              value={cat.label}
            />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="mailto:msdc.itskills@gmail.com?subject=Enrolment enquiry: {course.title}">
              <MagneticButton className="bg-primary text-primary-foreground">
                Enroll now <ArrowRight className="h-4 w-4" />
              </MagneticButton>
            </a>
            <a
              href="tel:+919187974688"
              className="story-link text-sm font-semibold"
            >
              Call +91 91879 74688
            </a>
          </div>
        </section>
      </DotBackground>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 pb-16 lg:grid-cols-[1.4fr_1fr]">
        <div className="corner-glow glow-ring rounded-3xl border border-border bg-card p-8">
          <div className="mb-6 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Learning outcomes
            </h2>
          </div>
          <h3 className="text-2xl font-bold tracking-tight">What you will master</h3>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {course.outcomes.map((o, i) => (
              <li
                key={i}
                className="group flex items-start gap-3 rounded-2xl border border-border/60 bg-background/60 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40"
              >
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:scale-110">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm">{o}</span>
              </li>
            ))}
          </ul>
        </div>

        <aside className="flex flex-col gap-6">
          {course.jobs && (
            <div className="corner-glow rounded-3xl border border-border bg-card p-6">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Job prospects
              </h3>
              <p className="mt-3 text-base font-semibold leading-relaxed">
                {course.jobs}
              </p>
            </div>
          )}
          <div className="notch bg-secondary p-6 text-secondary-foreground">
            <h3 className="text-xs font-semibold uppercase tracking-widest opacity-80">
              Included with every course
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                "Mentor-led classroom instruction",
                "Hands-on projects & capstone",
                "Assessments and mock tests",
                "Digital verifiable certificate",
                "Employability & soft skills",
              ].map((x) => (
                <li key={x} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-3.5 w-3.5 text-primary" /> {x}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-8">
          <div className="mb-6 flex items-baseline justify-between">
            <h3 className="text-xl font-bold tracking-tight">Related courses</h3>
            <Link to="/courses" className="story-link text-sm font-semibold">
              All courses →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((c, i) => (
              <CourseCard key={c.slug} course={c} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="glass rounded-2xl px-4 py-4 transition-transform hover:-translate-y-1">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <div className="mt-2 text-sm font-semibold leading-snug">{value}</div>
    </div>
  );
}
