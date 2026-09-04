import { createFileRoute } from "@tanstack/react-router";
import { CourseCard } from "@/components/course-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { DotBackground } from "@/components/dot-background";
import { coursesByCategory, categoryMeta } from "@/data/courses";

export const Route = createFileRoute("/school-programs")({
  head: () => ({
    meta: [
      { title: "IT Programs for School Children — School of IT Skills" },
      {
        name: "description",
        content:
          "Short-term summer/winter IT courses for Class 6–12 — AI Creators Lab, AI Foundations, AI Research and Python coding labs.",
      },
      { property: "og:title", content: "IT Programs for School Children" },
      {
        property: "og:description",
        content: "Playful, powerful IT foundations for young learners at MSDC, Manipal.",
      },
    ],
  }),
  component: () => {
    const items = coursesByCategory("school");
    return (
      <div>
        <DotBackground>
          <Reveal as="section" className="mx-auto max-w-7xl page-x pb-14 pt-6">
            <SectionHeading
              eyebrow="Summer & Winter sessions"
              title={categoryMeta.school.label}
              description="Hands-on AI and Python programs designed for Class 6 to Class 12 — no boring lectures, just building."
            />
          </Reveal>
        </DotBackground>
        <Reveal as="section" className="mx-auto max-w-7xl page-x pb-16">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((c, i) => (
              <CourseCard key={c.slug} course={c} index={i} />
            ))}
          </div>
        </Reveal>
      </div>
    );
  },
});
