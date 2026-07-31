import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { CourseCard } from "@/components/course-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { DotBackground } from "@/components/dot-background";
import { courses, categoryMeta, type Course } from "@/data/courses";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "All Courses — School of IT Skills" },
      {
        name: "description",
        content:
          "Browse every course at School of IT Skills — professional programs, Tally certifications, internships and IT programs for school children.",
      },
      { property: "og:title", content: "All Courses — School of IT Skills" },
      {
        property: "og:description",
        content:
          "The complete catalogue of 30+ IT courses at Manipal Skill Development Centre.",
      },
    ],
  }),
  component: CoursesPage,
});

const filters: { key: Course["category"] | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "professional", label: "Professional" },
  { key: "tally", label: "Tally" },
  { key: "internship", label: "Internships" },
  { key: "school", label: "For Schools" },
];

function CoursesPage() {
  const [cat, setCat] = useState<Course["category"] | "all">("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return courses.filter((c) => {
      if (cat !== "all" && c.category !== cat) return false;
      if (!query) return true;
      return (
        c.title.toLowerCase().includes(query) ||
        c.summary.toLowerCase().includes(query) ||
        (c.tags ?? []).some((t) => t.toLowerCase().includes(query))
      );
    });
  }, [cat, q]);

  return (
    <div>
      <DotBackground>
        <Reveal as="section" className="mx-auto max-w-7xl px-6 pb-14 pt-6">
          <SectionHeading
            eyebrow="Course catalogue"
            title="Every course, one place."
            description="Filter by track or search by name, topic or technology."
          />
          <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setCat(f.key)}
                  className={`rounded-full border border-border px-4 py-2 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 ${
                    cat === f.key
                      ? "bg-secondary text-secondary-foreground shadow-md"
                      : "bg-card text-foreground/80 hover:bg-muted"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <label className="glass flex items-center gap-2 rounded-full px-4 py-2.5 md:w-80">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search courses, tools, tags…"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </label>
          </div>
        </Reveal>
      </DotBackground>

      <Reveal as="section" className="mx-auto max-w-7xl px-6 pb-16">
        {cat === "all"
          ? filters
              .filter((f) => f.key !== "all")
              .map((f) => {
                const items = filtered.filter((c) => c.category === f.key);
                if (!items.length) return null;
                return (
                  <div key={f.key} className="mb-16">
                    <div className="mb-6 flex items-baseline justify-between">
                      <h3 className="text-xl font-bold tracking-tight">
                        {categoryMeta[f.key as Course["category"]].label}
                      </h3>
                      <span className="text-sm text-muted-foreground">
                        {items.length} courses
                      </span>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {items.map((c, i) => (
                        <CourseCard key={c.slug} course={c} index={i} />
                      ))}
                    </div>
                  </div>
                );
              })
          : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((c, i) => (
                  <CourseCard key={c.slug} course={c} index={i} />
                ))}
              </div>
            )}
        {filtered.length === 0 && (
          <div className="py-24 text-center text-muted-foreground">
            No courses match your search.
          </div>
        )}
      </Reveal>
    </div>
  );
}
