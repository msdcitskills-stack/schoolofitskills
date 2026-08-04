import { Link } from "@tanstack/react-router";
import { Mail, Phone } from "lucide-react";
import soisLogo from "@/assets/sois-logo.png.asset.json";
import msdcLogo from "@/assets/msdc-logo.png.asset.json";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-surface pb-32 pt-16 text-surface-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img src={soisLogo.url} alt="" className="h-12 w-12 rounded-full" />
            <div>
              <div className="text-base font-bold tracking-tight">School of IT Skills</div>
              <div className="text-xs text-muted-foreground">
                Manipal Skill Development Centre
              </div>
            </div>
          </div>
          <p className="mt-4 max-w-md text-sm text-muted-foreground">
            Empowering future generations with cutting-edge IT education — from Power BI and
            Full Stack to AI/ML, Cyber Security and Tally certification.
          </p>
          <img
            src={msdcLogo.url}
            alt="Manipal Skill Development Centre"
            className="mt-6 h-12 w-auto opacity-90"
          />
        </div>
        <div>
          <div className="mb-3 eyebrow text-muted-foreground">
            Explore
          </div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/courses" className="hover:text-primary">All Courses</Link></li>
            <li><Link to="/tally" className="hover:text-primary">Tally</Link></li>
            <li><Link to="/internships" className="hover:text-primary">Internships</Link></li>
            <li><Link to="/school-programs" className="hover:text-primary">For Schools</Link></li>
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
          </ul>
        </div>
        <div>
          <div className="mb-3 eyebrow text-muted-foreground">
            Contact
          </div>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="mailto:msdc.itskills@gmail.com"
                className="inline-flex items-center gap-2 hover:text-primary"
              >
                <Mail className="h-3.5 w-3.5" /> msdc.itskills@gmail.com
              </a>
            </li>
            <li>
              <a
                href="tel:+919187974688"
                className="inline-flex items-center gap-2 hover:text-primary"
              >
                <Phone className="h-3.5 w-3.5" /> +91 91879 74688
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col items-start justify-between gap-2 border-t border-border/60 px-6 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
        <div>© {new Date().getFullYear()} School of IT Skills · Manipal Skill Development Centre</div>
        <div>Empowering future generations with cutting-edge IT education.</div>
      </div>
    </footer>
  );
}
