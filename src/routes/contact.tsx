import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { DotBackground } from "@/components/dot-background";
import { MagneticButton } from "@/components/magnetic-button";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — School of IT Skills" },
      {
        name: "description",
        content:
          "Get in touch with School of IT Skills at Manipal Skill Development Centre — email, phone and social channels.",
      },
      { property: "og:title", content: "Contact — School of IT Skills" },
      {
        property: "og:description",
        content: "Talk to our counsellors about the right course for your goals.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div>
      <DotBackground>
        <Reveal as="section" className="mx-auto max-w-5xl page-x pb-16 pt-6">
          <SectionHeading
            eyebrow="Contact"
            title="Let's find the right course for you."
            description="Reach out and our counsellors will help you pick a program that matches your background and career goals."
          />
        </Reveal>
      </DotBackground>

      <Reveal as="section" className="mx-auto max-w-5xl page-x pb-20">
        <div className="grid gap-5 md:grid-cols-3">
          <ContactCard
            icon={Mail}
            label="Email"
            value="msdc.itskills@gmail.com"
            href="mailto:msdc.itskills@gmail.com"
          />
          <ContactCard
            icon={Phone}
            label="Phone"
            value="+91 91879 74688"
            href="tel:+919187974688"
          />
          <ContactCard
            icon={MapPin}
            label="Campus"
            value="Manipal Skill Development Centre, Manipal"
          />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            const body = `Name: ${data.get("name")}%0D%0APhone: ${data.get("phone")}%0D%0A%0D%0A${data.get("message")}`;
            window.location.href = `mailto:msdc.itskills@gmail.com?subject=Course enquiry from ${data.get("name")}&body=${body}`;
          }}
          className="corner-glow mt-10 rounded-3xl border border-border bg-card p-8"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Your name" name="name" required />
            <Field label="Phone" name="phone" type="tel" />
          </div>
          <div className="mt-5">
            <label className="mb-1.5 block eyebrow text-muted-foreground">
              Message
            </label>
            <textarea
              name="message"
              rows={5}
              required
              className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none transition-shadow focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-primary)_35%,transparent)]"
              placeholder="Tell us what you'd like to learn…"
            />
          </div>
          <div className="mt-6">
            <MagneticButton type="submit" className="bg-primary text-primary-foreground">
              Send enquiry
            </MagneticButton>
          </div>
        </form>
      </Reveal>
    </div>
  );
}

function ContactCard({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="glow-ring bulge glass flex h-full items-start gap-4 rounded-3xl p-6">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground">
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <div className="eyebrow text-muted-foreground">
          {label}
        </div>
        <div className="mt-1 truncate text-base font-semibold">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href}>{inner}</a> : inner;
}

function Field({
  label,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block eyebrow text-muted-foreground">
        {label}
      </span>
      <input
        {...rest}
        className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none transition-shadow focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-primary)_35%,transparent)]"
      />
    </label>
  );
}
