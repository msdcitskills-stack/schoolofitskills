import { createFileRoute } from "@tanstack/react-router";
import { CourseCard } from "@/components/course-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { DotBackground } from "@/components/dot-background";
import { coursesByCategory, categoryMeta } from "@/data/courses";

export const Route = createFileRoute("/internships")({
  head: () => ({
    meta: [
      { title: "Internship Programs — School of IT Skills" },
      {
        name: "description",
        content:
          "Mentor-led internships in Full Stack, Cyber/IoT Security, AI/ML and Tally at School of IT Skills, Manipal.",
      },
      { property: "og:title", content: "Internship Programs — School of IT Skills" },
      {
        property: "og:description",
        content: "Ship real projects with 4–12 week mentor-led internships.",
      },
    ],
  }),
  component: () => {
    const items = coursesByCategory("internship");
    return (
      <div>
        <DotBackground>
          <Reveal as="section" className="mx-auto max-w-7xl page-x pb-14 pt-6">
            <SectionHeading
              eyebrow="Internships"
              title={categoryMeta.internship.label}
              description="Short, intense, project-driven programs designed to make you industry-ready."
            />
          </Reveal>
        </DotBackground>
        <Reveal as="section" className="mx-auto max-w-7xl page-x pb-16">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((c, i) => (
              <CourseCard key={c.slug} course={c} index={i} />
            ))}
          </div>
        </Reveal>
      </div>
    );
  },
});
