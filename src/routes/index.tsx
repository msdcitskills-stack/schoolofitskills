import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, GraduationCap, Rocket, Sparkles, ShieldCheck, Award } from "lucide-react";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import soisLogo from "@/assets/sois-logo.png.asset.json";
import msdcLogo from "@/assets/msdc-logo.png.asset.json";
import { DotBackground } from "@/components/dot-background";
import { MagneticButton } from "@/components/magnetic-button";
import { EncryptedText } from "@/components/encrypted-text";
import { Reveal, RevealGroup, Parallax } from "@/components/reveal";

import { Card3D, Card3DItem } from "@/components/card-3d";
import { TechMarquee } from "@/components/tech-marquee";
import { CourseCard } from "@/components/course-card";
import { SectionHeading } from "@/components/section-heading";
import { PointerHighlight } from "@/components/pointer-highlight";
import { courses, categoryMeta, coursesByCategory } from "@/data/courses";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "School of IT Skills — Course Catalogue | MSDC Manipal" },
      {
        name: "description",
        content:
          "Explore 30+ industry-grade IT courses at School of IT Skills, Manipal — Power BI, Full Stack, AI/ML, Data Science, Cyber Security, Tally and programs for school children.",
      },
      { property: "og:title", content: "School of IT Skills — Course Catalogue" },
      {
        property: "og:description",
        content:
          "Empowering future generations with cutting-edge IT education at Manipal Skill Development Centre.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const [logoHovered, setLogoHovered] = useState(false);
  const featured = coursesByCategory("professional").slice(0, 6);
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <DotBackground className="relative overflow-hidden">
        <section className="mx-auto max-w-7xl page-x pb-[clamp(3rem,1.5rem+6vw,6rem)] pt-[clamp(1.5rem,0.5rem+3vw,4rem)]">
          <div className="grid items-center gap-[clamp(2rem,1rem+4vw,3.5rem)] lg:grid-cols-[1.15fr_1fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 eyebrow px-3 py-2 text-muted-foreground shadow-sm backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-glow-pulse" />
                MANIPAL SKILL DEVELOPMENT CENTRE
              </div>
              <h1 className="mt-5 text-balance text-7xl">
                Empowering future generations with{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">cutting-edge</span>
                  <span
                    className="absolute inset-x-0 bottom-1 -z-0 h-4 rounded-full bg-primary/60"
                    aria-hidden
                  />
                </span>{" "}
                IT education.
              </h1>

              <EncryptedText
                as="p"
                className="mt-6 block max-w-xl text-lg text-muted-foreground"
                text="A curated catalogue of 30+ certified programs — from Power BI, Full Stack and AI/ML, to Tally, Cyber Security and IT for school children."
                speed={22}
                revealDelay={10}
              />
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link to="/courses">
                  <MagneticButton className="bg-primary text-primary-foreground">
                    Browse all courses
                    <ArrowRight className="h-4 w-4" />
                  </MagneticButton>
                </Link>
                <Link
                  to="/contact"
                  className="story-link text-sm font-semibold text-foreground"
                >
                  Talk to us
                </Link>
              </div>

              <div className="mt-10 grid max-w-md grid-cols-3 gap-3 sm:gap-4">
                {[
                  { n: "30+", l: "Programs" },
                  { n: "10th+", l: "Learners" },
                  { n: "Manipal", l: "Campus" },
                ].map((s) => (
                  <div
                    key={s.l}
                    className="glass rounded-2xl px-3 py-4 text-center transition-transform hover:-translate-y-1"
                  >
                    <div className="whitespace-nowrap text-2xl font-semibold tracking-tight">{s.n}</div>
                    <div className="eyebrow text-muted-foreground">
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Parallax className="relative lg:-mt-72" strength={54}>
              <div
                onMouseEnter={() => setLogoHovered(true)}
                onMouseLeave={() => setLogoHovered(false)}
                className="glass corner-glow group relative overflow-hidden rounded-[2rem] p-8 shadow-2xl animate-float"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden
                  style={{
                    maskImage:
                      "radial-gradient(ellipse at center, black 40%, transparent 78%)",
                  }}
                >
                  {logoHovered && <CanvasRevealEffect gap={11} dotSize={1.5} />}
                </div>
                <img
                  src={soisLogo.url}
                  alt="School of IT Skills"
                  className="relative mx-auto h-64 w-64 rounded-full object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="relative mt-6 flex items-center justify-center gap-3 border-t border-border/60 pt-6">
                  <span className="eyebrow text-muted-foreground">
                    A School of
                  </span>
                  <img src={msdcLogo.url} alt="MSDC" className="h-8 w-auto" />
                </div>
              </div>
              <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[3rem] bg-primary/20 blur-3xl" />
            </Parallax>

          </div>
        </section>
      </DotBackground>

      {/* Tech marquee */}
      <Reveal as="section" className="mx-auto max-w-7xl page-x">
        <div className="mb-4 flex items-center justify-between">
          <div className="eyebrow text-muted-foreground">
            Tools & tech we teach
          </div>
          <div className="hidden text-xs text-muted-foreground sm:block">
            Hover to pause · Hover a chip for micro-interaction
          </div>
        </div>
        <TechMarquee />
      </Reveal>

      {/* Bento categories */}
      <Reveal as="section" className="mx-auto section-gap max-w-7xl page-x">
        <SectionHeading
          eyebrow="Catalogue"
          title={
            <>
              Four pathways,{" "}
              <PointerHighlight>one campus.</PointerHighlight>
            </>
          }
          description="Pick your track — every course ships with hands-on projects, mentor support and certification."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-6 md:grid-rows-2">
          <BentoCard
            to="/courses"
            className="md:col-span-3 md:row-span-2"
            gradient="grainient-1"
            icon={<Rocket className="h-5 w-5" />}
            title={categoryMeta.professional.label}
            desc={categoryMeta.professional.tagline}
            count={coursesByCategory("professional").length}
            large
          />
          <BentoCard
            to="/tally"
            className="md:col-span-3"
            gradient="grainient-2"
            icon={<Award className="h-5 w-5" />}
            title={categoryMeta.tally.label}
            desc={categoryMeta.tally.tagline}
            count={coursesByCategory("tally").length}
          />
          <BentoCard
            to="/internships"
            className="md:col-span-2"
            gradient="grainient-3"
            icon={<ShieldCheck className="h-5 w-5" />}
            title={categoryMeta.internship.label}
            desc={categoryMeta.internship.tagline}
            count={coursesByCategory("internship").length}
          />
          <BentoCard
            to="/school-programs"
            className="md:col-span-1"
            gradient="grainient-4"
            icon={<Sparkles className="h-5 w-5" />}
            title="Kids"
            desc={categoryMeta.school.tagline}
            count={coursesByCategory("school").length}
          />
        </div>

      </Reveal>

      {/* Featured courses */}
      <Reveal as="section" className="mx-auto section-gap max-w-7xl page-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Popular right now"
            title="Featured professional programs"
          />
          <Link
            to="/courses"
            className="story-link text-sm font-semibold"
          >
            View all {courses.length} courses →
          </Link>
        </div>
        <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" step={60}>
          {featured.map((c, i) => (
            <CourseCard key={c.slug} course={c} index={i} />
          ))}
        </RevealGroup>
      </Reveal>

      {/* Why us */}
      <Reveal as="section" className="mx-auto section-gap max-w-7xl page-x">
        <SectionHeading
          eyebrow="Why School of IT Skills"
          title="Learning built for outcomes, not just certificates."
          align="center"
        />
        <RevealGroup className="mt-12 grid gap-5 md:grid-cols-3" step={110}>
          {[
            {
              icon: GraduationCap,
              title: "Mentor-led, project-first",
              body:
                "Every course culminates in a real project reviewed by an industry mentor.",
            },
            {
              icon: Award,
              title: "Recognised certification",
              body:
                "Tally-Company certified, industry-endorsed programs with globally recognised outcomes.",
            },
            {
              icon: ShieldCheck,
              title: "From 10th class to CXO",
              body:
                "Curricula tuned for school children, graduates and working professionals alike.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="corner-glow glow-ring bulge glass relative rounded-3xl p-8"
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-primary-foreground">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-bold tracking-tight">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </RevealGroup>
      </Reveal>

      {/* All courses summary */}
      <Reveal as="section" className="mx-auto section-gap max-w-7xl page-x">
        <SectionHeading
          eyebrow="Everything in one place"
          title="All courses at a glance."
          description="30+ carefully-designed learning paths — click any card to view the full syllabus."
        />
        <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" step={35}>
          {courses.map((c, i) => (
            <CourseCard key={c.slug} course={c} index={i} />
          ))}
        </RevealGroup>
      </Reveal>

      {/* CTA */}
      <Reveal as="section" className="mx-auto section-gap max-w-7xl page-x">
        <div className="corner-glow glow-ring notch relative overflow-hidden rounded-[2rem] bg-secondary p-10 text-secondary-foreground md:p-16">
          <div
            className="absolute inset-0 opacity-30 dot-field"
            style={{ maskImage: "linear-gradient(180deg, black, transparent)" }}
            aria-hidden
          />
          <div className="relative grid gap-8 md:grid-cols-[1.5fr_1fr] md:items-center">
            <div>
              <h2 className="text-balance text-5xl">
                Ready to level up your IT career?
              </h2>
              <p className="mt-4 max-w-xl text-secondary-foreground/80">
                Talk to our counsellors — we'll help you pick the right course based on your
                background and career goals.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 md:justify-end">
              <Link to="/contact">
                <MagneticButton className="bg-primary text-primary-foreground">
                  Get in touch <ArrowRight className="h-4 w-4" />
                </MagneticButton>
              </Link>
              <Link
                to="/courses"
                className="story-link text-sm font-semibold text-secondary-foreground"
              >
                Browse the catalogue
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

function BentoCard({
  to,
  title,
  desc,
  icon,
  count,
  className = "",
  large = false,
  gradient = "grainient-1",
}: {
  to: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  count: number;
  className?: string;
  large?: boolean;
  gradient?: string;
}) {
  return (
    <Card3D className={className} intensity={large ? 8 : 12}>
      <Link
        to={to}
        className={`group corner-glow glare-card glow-ring relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-6 text-card-foreground shadow-sm transition-shadow duration-300 hover:shadow-2xl`}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(360px circle at var(--mx,50%) var(--my,50%), color-mix(in oklab, var(--primary) 18%, transparent), transparent 70%)",
          }}
          aria-hidden
        />
        <div
          className={`grainient ${gradient} pointer-events-none absolute inset-0`}
          aria-hidden
        />
        <Card3DItem z={50} className="relative z-10 flex items-center justify-between">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-secondary text-secondary-foreground transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
            {icon}
          </span>
          <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
            {count} courses
          </span>
        </Card3DItem>
        <Card3DItem z={30} className="relative z-10">
          <h3
            className={`mt-8 text-balance font-bold tracking-tight ${
              large ? "text-3xl md:text-4xl" : "text-xl"
            }`}
          >
            {title}
          </h3>
          <p className={`mt-2 text-sm text-muted-foreground ${large ? "max-w-md" : ""}`}>
            {desc}
          </p>
          <div className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary opacity-0 transition-all duration-300 group-hover:opacity-100">
            Explore
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </Card3DItem>
      </Link>
    </Card3D>
  );
}
