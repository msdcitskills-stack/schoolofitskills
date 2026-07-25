import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/section-heading";
import { DotBackground } from "@/components/dot-background";
import soisLogo from "@/assets/sois-logo.png.asset.json";
import msdcLogo from "@/assets/msdc-logo.png.asset.json";
import { GraduationCap, Sparkles, Users, Award } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — School of IT Skills, MSDC Manipal" },
      {
        name: "description",
        content:
          "About School of IT Skills — a unit of Dr TMA Pai Foundation, empowering future generations with cutting-edge IT education at Manipal Skill Development Centre.",
      },
      { property: "og:title", content: "About School of IT Skills" },
      {
        property: "og:description",
        content:
          "Empowering future generations with cutting-edge IT education — a unit of Dr TMA Pai Foundation.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div>
      <DotBackground>
        <section className="mx-auto max-w-6xl px-6 pb-16 pt-6">
          <SectionHeading
            eyebrow="About us"
            title="Empowering future generations with cutting-edge IT education."
            description="School of IT Skills is a flagship program of Manipal Skill Development Centre — a unit of the Dr TMA Pai Foundation — delivering industry-grade IT training to learners from Class 6 to seasoned professionals."
          />
          <div className="mt-12 grid items-center gap-10 md:grid-cols-2">
            <div className="glass corner-glow rounded-3xl p-10 text-center">
              <img
                src={soisLogo.url}
                alt="School of IT Skills"
                className="mx-auto h-48 w-48 rounded-full"
              />
              <div className="mt-6 text-lg font-bold">School of IT Skills</div>
              <div className="text-sm text-muted-foreground">
                The learning brand.
              </div>
            </div>
            <div className="glass corner-glow rounded-3xl p-10 text-center">
              <img
                src={msdcLogo.url}
                alt="Manipal Skill Development Centre"
                className="mx-auto h-24 w-auto"
              />
              <div className="mt-8 text-lg font-bold">
                Manipal Skill Development Centre
              </div>
              <div className="text-sm text-muted-foreground">
                A Unit of Dr TMA Pai Foundation.
              </div>
            </div>
          </div>
        </section>
      </DotBackground>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: GraduationCap,
              n: "30+",
              l: "Curated programs across 4 tracks",
            },
            { icon: Users, n: "Class 6 → Pro", l: "Every level welcome" },
            { icon: Award, n: "Global", l: "Recognised Tally certification" },
            { icon: Sparkles, n: "Project-first", l: "Hands-on, mentor-led" },
          ].map((s) => (
            <div key={s.l} className="glow-ring bulge rounded-3xl border border-border bg-card p-6">
              <s.icon className="h-5 w-5 text-primary" />
              <div className="mt-4 text-2xl font-bold">{s.n}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
