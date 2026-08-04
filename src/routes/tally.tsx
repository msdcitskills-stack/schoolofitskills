import { createFileRoute } from "@tanstack/react-router";
import { CourseCard } from "@/components/course-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { DotBackground } from "@/components/dot-background";
import { coursesByCategory, categoryMeta } from "@/data/courses";

export const Route = createFileRoute("/tally")({
  head: () => ({
    meta: [
      { title: "Tally Suite — School of IT Skills" },
      {
        name: "description",
        content:
          "Officially certified Tally Prime learning paths — Level 1, 2, 3, GST and the Comprehensive certification at School of IT Skills, Manipal.",
      },
      { property: "og:title", content: "Tally Suite — School of IT Skills" },
      {
        property: "og:description",
        content:
          "Tally-Company certified programs from beginner to expert, taught at Manipal Skill Development Centre.",
      },
    ],
  }),
  component: TallyPage,
});

const benefits = [
  "Candidate Portal Access",
  "Digital content: books & videos",
  "Chapter-wise & final mock tests",
  "Job Portal Access",
  "Final Computer Based Test (CBT)",
  "Digital, verifiable Tally certificate",
  "Certificate directly from Tally Company",
  "Globally recognised credential",
  "Syllabus highlights on certificate back",
  "Grading (A+, A, B, C)",
  "Soft skills training for employability",
];

function TallyPage() {
  const items = coursesByCategory("tally");
  return (
    <div>
      <DotBackground>
        <Reveal as="section" className="mx-auto max-w-7xl page-x pb-14 pt-6">
          <SectionHeading
            eyebrow="Tally certifications"
            title={categoryMeta.tally.label}
            description="Build a career in Accounts, Finance, Taxation and Banking — or run your own business — with a globally-recognised Tally credential."
          />
        </Reveal>
      </DotBackground>

      <Reveal as="section" className="mx-auto max-w-7xl page-x pb-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((c, i) => (
            <CourseCard key={c.slug} course={c} index={i} />
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="mx-auto max-w-7xl page-x pb-16">
        <div className="corner-glow glow-ring notch relative overflow-hidden rounded-[2rem] bg-secondary p-10 text-secondary-foreground md:p-14">
          <h3 className="max-w-2xl text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Everything you get, from your first class to your certificate.
          </h3>
          <ul className="mt-8 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
            {benefits.map((b) => (
              <li
                key={b}
                className="flex items-center gap-2 rounded-full border border-secondary-foreground/20 bg-secondary-foreground/5 px-4 py-2 text-sm"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  );
}
