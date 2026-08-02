import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Reveal } from "@/components/reveal";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BadgeCheck,
  Briefcase,
  CalendarDays,
  Check,
  ChevronDown,
  Clock,
  GraduationCap,
  IndianRupee,
  ListChecks,
  Mail,
  Phone,
  Sparkles,
  Target,
  Users,
  Wrench,
} from "lucide-react";
import { DotBackground } from "@/components/dot-background";
import { MagneticButton } from "@/components/magnetic-button";
import { CourseCard } from "@/components/course-card";
import { getCourse, courses, categoryMeta, type Course } from "@/data/courses";
import { getCourseDetail } from "@/data/course-detail";

export const Route = createFileRoute("/courses/$slug")({
  loader: ({ params }) => {
    const course = getCourse(params.slug);
    if (!course) throw notFound();
    return { course };
  },

  head: ({ loaderData }) => {
    const c = loaderData?.course;
    if (!c) {
      return {
        meta: [
          { title: "Course not found — School of IT Skills" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const title = `${c.title} — ${c.duration}, ${c.fee} | School of IT Skills`;
    const desc = `${c.summary} ${c.duration} · Fee ${c.fee} · For ${c.audience}. Enroll at Manipal Skill Development Centre.`.slice(
      0,
      158,
    );
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: c.title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
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
  const { course } = Route.useLoaderData() as { course: Course };
  const detail = getCourseDetail(course);
  const cat = categoryMeta[course.category];

  const siblings = courses.filter((c) => c.category === course.category);
  const idx = siblings.findIndex((c) => c.slug === course.slug);
  const prev = idx > 0 ? siblings[idx - 1] : undefined;
  const next = idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1] : undefined;
  const related = siblings.filter((c) => c.slug !== course.slug).slice(0, 3);

  const mailto = `mailto:msdc.itskills@gmail.com?subject=${encodeURIComponent(
    `Enrolment enquiry: ${course.title}`,
  )}&body=${encodeURIComponent(
    `Hi School of IT Skills,\n\nI would like to enroll in "${course.title}" (${course.duration}, ${course.fee}).\n\nName:\nPhone:\nQualification:\n\nThank you.`,
  )}`;

  return (
    <div>
      {/* Hero */}
      <DotBackground>
        <Reveal as="section" className="mx-auto max-w-6xl px-6 pb-14 pt-6">
          <nav className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Link to="/courses" className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
              <ArrowLeft className="h-3.5 w-3.5" /> All courses
            </Link>
            <span aria-hidden>/</span>
            <span>{cat.label}</span>
            <span aria-hidden>/</span>
            <span className="text-foreground/80">{course.title}</span>
          </nav>

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
            <Stat icon={GraduationCap} label="Track" value={cat.label} />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href={mailto}>
              <MagneticButton className="bg-primary text-primary-foreground">
                Enroll now <ArrowRight className="h-4 w-4" />
              </MagneticButton>
            </a>
            <a href="tel:+919187974688" className="story-link text-sm font-semibold">
              Call +91 91879 74688
            </a>
          </div>
        </Reveal>
      </DotBackground>

      {/* Body + sticky sidebar */}
      <section className="mx-auto grid max-w-6xl gap-8 px-6 pb-16 lg:grid-cols-[1.55fr_1fr] lg:items-start">
        <div className="flex flex-col gap-8">
          {/* Outcomes */}
          <Reveal className="corner-glow glow-ring rounded-3xl border border-border bg-card p-8">
            <Eyebrow icon={Sparkles}>Learning outcomes</Eyebrow>
            <h2 className="text-2xl font-bold tracking-tight">What you will master</h2>
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
          </Reveal>

          {/* Curriculum */}
          <Reveal className="corner-glow rounded-3xl border border-border bg-card p-8">
            <Eyebrow icon={ListChecks}>Curriculum</Eyebrow>
            <h2 className="text-2xl font-bold tracking-tight">Module-by-module breakdown</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {detail.curriculum.length} modules · delivered over {course.duration}
            </p>
            <div className="mt-6 divide-y divide-border/70 overflow-hidden rounded-2xl border border-border/70">
              {detail.curriculum.map((m, i) => (
                <details key={m.title + i} className="group bg-background/50 open:bg-background/80" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-center gap-4 p-5 transition-colors hover:bg-muted/60">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-secondary text-xs font-bold text-secondary-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-semibold">{m.title}</span>
                      <span className="block text-xs text-muted-foreground">{m.hint}</span>
                    </span>
                    <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-180" />
                  </summary>
                  <ul className="space-y-2 px-5 pb-5 pl-[4.5rem] text-sm text-muted-foreground">
                    {m.items.map((it) => (
                      <li key={it} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          </Reveal>

          {/* Highlights bento */}
          <Reveal>
            <Eyebrow icon={Target}>Why this program</Eyebrow>
            <div className="grid gap-4 sm:grid-cols-2">
              {detail.highlights.map((h, i) => (
                <div
                  key={h}
                  className={`glare-card bulge corner-glow rounded-2xl border border-border bg-card p-5 text-sm ${
                    i === 0 ? "sm:col-span-2" : ""
                  }`}
                >
                  <BadgeCheck className="mb-3 h-4 w-4 text-primary" />
                  {h}
                </div>
              ))}
            </div>
          </Reveal>

          {/* Tools + prerequisites */}
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal className="corner-glow rounded-3xl border border-border bg-card p-6">
              <Eyebrow icon={Wrench}>Tools & tech</Eyebrow>
              <div className="flex flex-wrap gap-2">
                {detail.tools.map((t) => (
                  <span
                    key={t}
                    className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground/80 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-foreground"
                    style={{ borderStyle: "dotted" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal className="corner-glow rounded-3xl border border-border bg-card p-6">
              <Eyebrow icon={ListChecks}>Prerequisites</Eyebrow>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {detail.prerequisites.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Careers */}
          <Reveal className="notch overflow-hidden bg-secondary p-8 text-secondary-foreground">
            <Eyebrow icon={Briefcase}>Career outcomes</Eyebrow>
            <h2 className="text-2xl font-bold tracking-tight">Where this can take you</h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {detail.careerPaths.map((r) => (
                <span
                  key={r}
                  className="rounded-full border border-secondary-foreground/20 bg-secondary-foreground/5 px-4 py-2 text-sm transition-transform hover:-translate-y-0.5"
                >
                  <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-primary align-middle" />
                  {r}
                </span>
              ))}
            </div>
          </Reveal>

          {/* Certification */}
          <Reveal className="corner-glow glow-ring rounded-3xl border border-border bg-card p-8">
            <Eyebrow icon={Award}>Certification & support</Eyebrow>
            <ul className="grid gap-3 sm:grid-cols-2">
              {detail.certification.map((c) => (
                <li
                  key={c}
                  className="flex items-start gap-3 rounded-2xl border border-border/60 bg-background/60 p-4 text-sm"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* FAQ */}
          <Reveal className="corner-glow rounded-3xl border border-border bg-card p-8">
            <Eyebrow icon={Sparkles}>FAQ</Eyebrow>
            <h2 className="text-2xl font-bold tracking-tight">Questions, answered</h2>
            <div className="mt-6 space-y-3">
              {detail.faqs.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-2xl border border-border/70 bg-background/50 p-5 transition-colors hover:border-primary/40"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold">
                    {f.q}
                    <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Sidebar */}
        <aside className="flex flex-col gap-6 lg:sticky lg:top-24">
          <div className="glass corner-glow glow-ring rounded-3xl border border-border p-6">
            <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Program fee
            </div>
            <div className="mt-1 text-3xl font-bold tracking-tight">{course.fee}</div>
            <dl className="mt-5 space-y-3 text-sm">
              {detail.schedule.map((s) => (
                <div key={s.label} className="flex items-start justify-between gap-3 border-b border-border/60 pb-3">
                  <dt className="text-muted-foreground">{s.label}</dt>
                  <dd className="text-right font-medium">{s.value}</dd>
                </div>
              ))}
            </dl>
            <a href={mailto} className="mt-6 block">
              <MagneticButton className="w-full justify-center bg-primary text-primary-foreground">
                Enroll now <ArrowRight className="h-4 w-4" />
              </MagneticButton>
            </a>
            <div className="mt-4 space-y-2 text-sm">
              <a
                href="mailto:msdc.itskills@gmail.com"
                className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="h-3.5 w-3.5" /> msdc.itskills@gmail.com
              </a>
              <a
                href="tel:+919187974688"
                className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <Phone className="h-3.5 w-3.5" /> +91 91879 74688
              </a>
            </div>
          </div>

          {course.jobs && (
            <div className="corner-glow rounded-3xl border border-border bg-card p-6">
              <Eyebrow icon={Briefcase}>Job prospects</Eyebrow>
              <p className="text-base font-semibold leading-relaxed">{course.jobs}</p>
            </div>
          )}

          <div className="notch bg-secondary p-6 text-secondary-foreground">
            <Eyebrow icon={CalendarDays}>Included with every course</Eyebrow>
            <ul className="space-y-2 text-sm">
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

      {/* Prev / next */}
      {(prev || next) && (
        <Reveal as="section" className="mx-auto max-w-6xl px-6 pb-8">
          <div className="grid gap-4 sm:grid-cols-2">
            {prev ? (
              <Link
                to="/courses/$slug"
                params={{ slug: prev.slug }}
                className="corner-glow group rounded-2xl border border-border bg-card p-5 transition-transform hover:-translate-y-0.5"
              >
                <span className="text-xs text-muted-foreground">← Previous</span>
                <span className="mt-1 block text-sm font-semibold group-hover:text-primary">{prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                to="/courses/$slug"
                params={{ slug: next.slug }}
                className="corner-glow group rounded-2xl border border-border bg-card p-5 text-right transition-transform hover:-translate-y-0.5 sm:col-start-2"
              >
                <span className="text-xs text-muted-foreground">Next →</span>
                <span className="mt-1 block text-sm font-semibold group-hover:text-primary">{next.title}</span>
              </Link>
            )}
          </div>
        </Reveal>
      )}

      {related.length > 0 && (
        <Reveal as="section" className="mx-auto max-w-7xl px-6 pb-16">
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
        </Reveal>
      )}
    </div>
  );
}

function Eyebrow({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
      <Icon className="h-4 w-4 text-primary" />
      {children}
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
