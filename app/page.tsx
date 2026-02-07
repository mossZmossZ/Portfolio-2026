"use client";

import { useEffect, useState } from "react";

const navItems = [
  { id: "top", label: "Overview" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" }
];

const stats = [
  { label: "Experience", value: "8+ yrs", detail: "Platform & DevOps" },
  { label: "Projects", value: "35+", detail: "Production systems" },
  { label: "Focus", value: "Reliability", detail: "SLO-driven" }
];

const valueCards = [
  {
    title: "Execution Clarity",
    detail: "Translate complex systems into clear, calm execution plans."
  },
  {
    title: "Secure Delivery",
    detail: "Keep teams shipping with secure-by-default pipelines."
  },
  {
    title: "Trust at Scale",
    detail: "Build platforms people trust to run their business."
  }
];

const skills = [
  "Linux / Ubuntu",
  "Kubernetes",
  "Docker",
  "Terraform",
  "GitHub Actions",
  "Helm",
  "Nginx / Envoy",
  "Prometheus / Grafana",
  "OpenTelemetry",
  "PostgreSQL",
  "Redis",
  "Vault",
  "AWS",
  "GCP",
  "Ansible",
  "Python / Bash"
];

const projects = [
  {
    title: "Multi-Region Platform",
    description:
      "Standardized a Kubernetes platform across 3 regions with automated canary releases and policy gates."
  },
  {
    title: "Zero-Trust Network",
    description:
      "Delivered OIDC-based access, service mesh auth, and network segmentation for compliance readiness."
  },
  {
    title: "Observability Upgrade",
    description:
      "Unified logs, metrics, and traces with OpenTelemetry, reducing MTTR and alert fatigue."
  },
  {
    title: "CI/CD Modernization",
    description:
      "Built a GitOps delivery flow with automated rollback and reliability checks."
  }
];

const experience = [
  {
    role: "Senior DevOps Engineer",
    company: "CloudScale Labs",
    period: "2022 – Present",
    detail: "Lead platform reliability and delivery automation for SaaS products."
  },
  {
    role: "Site Reliability Engineer",
    company: "Fintech Nova",
    period: "2019 – 2022",
    detail: "Built incident response playbooks and observability systems for payment APIs."
  },
  {
    role: "Systems Engineer",
    company: "InfraWorks",
    period: "2016 – 2019",
    detail: "Modernized legacy infrastructure with IaC and container platforms."
  }
];

const certifications = [
  "AWS Certified Solutions Architect",
  "Certified Kubernetes Administrator (CKA)",
  "HashiCorp Terraform Associate",
  "Google Professional Cloud Architect"
];
const toolchain = [
  "Kubernetes",
  "Docker",
  "Terraform",
  "GitOps",
  "Observability",
  "Zero Trust",
  "Cloud Networking",
  "SRE Practices"
];

export default function Home() {
  const [activeSection, setActiveSection] = useState("top");
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 600);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) {
      return;
    }

    let ticking = false;
    const handleScroll = () => {
      if (ticking) {
        return;
      }
      ticking = true;
      window.requestAnimationFrame(() => {
        const mid = window.innerHeight * 0.45;
        const current = sections.find((section) => {
          const rect = section.getBoundingClientRect();
          return rect.top <= mid && rect.bottom >= mid;
        });
        if (current) {
          setActiveSection(current.id);
        }
        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 bg-grid-fade grid-overlay opacity-30" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[6%] top-[20%] h-40 w-40 rounded-full border border-ink-400/40 bg-ink-500/10 blur-[1px]" />
        <div className="absolute right-[8%] top-[12%] h-64 w-64 rounded-full border border-sky-300/30 bg-sky-400/10 blur-[2px]" />
        <div className="scanline absolute left-0 top-0 h-[35%] w-full opacity-50" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/15 bg-[#0f2854]/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-3 text-sm font-semibold tracking-[0.2em] text-slate-200">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-lg text-ink-200">
              SE
            </span>
            <span className="hidden sm:inline">SYSTEMS ENGINEER</span>
          </a>
          <nav className="hidden items-center gap-6 text-xs uppercase tracking-[0.25em] text-slate-400 md:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`transition-colors hover:text-white ${
                  activeSection === item.id ? "text-white" : "text-slate-400"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollToSection("contact")}
              className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:border-white/60 hover:bg-white/20"
            >
              Contact
            </button>
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-6xl px-6">
        <section id="top" className="snap-start pb-20 pt-20 sm:pt-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="flex items-center gap-5">
                <div className="relative h-20 w-20 rounded-3xl bg-gradient-to-br from-ink-200 via-ink-300 to-ink-400 p-[2px]">
                  <div className="flex h-full w-full items-center justify-center rounded-3xl bg-[#0f2854] text-2xl font-semibold text-white">
                    YN
                  </div>
                </div>
                <div>
                <p className="text-xs uppercase tracking-[0.35em] text-ink-200">DevOps · SRE · Systems Engineer</p>
                  <p className="mt-1 text-sm text-slate-200/80">Based Remote · Open for collaborations</p>
                </div>
              </div>

              <h1 className="mt-8 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                Hi, I'm <span className="text-ink-200">Your Name</span>. I build resilient platforms for teams that run at scale.
              </h1>
              <p className="mt-6 max-w-xl text-lg text-slate-100/85">
                DevOps, SRE, and systems engineering focused on high-availability, incident readiness, and production-grade
                delivery pipelines. Calm operations, strong guarantees.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => scrollToSection("projects")}
                  className="rounded-full bg-ink-400 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-900 shadow-glow transition hover:bg-ink-200"
                >
                  View Projects
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:border-white/60 hover:bg-white/15"
                >
                  Contact
                </button>
              </div>
              <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3">
                {stats.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/15 bg-white/10 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-ink-100">{item.label}</p>
                    <p className="mt-3 text-2xl font-semibold text-white">{item.value}</p>
                    <p className="mt-2 text-xs text-ink-100/80">{item.detail}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-4 text-xs uppercase tracking-[0.3em] text-ink-100">
                <a
                  href="https://github.com/yourhandle"
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-white/90 transition hover:border-white/50 hover:bg-white/20"
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/yourhandle"
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-white/90 transition hover:border-white/50 hover:bg-white/20"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-white/15 bg-white/10 p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-ink-100">Value I Bring</p>
                <div className="mt-5 grid gap-4">
                  {valueCards.map((item) => (
                    <div key={item.title} className="rounded-2xl border border-white/10 bg-[#0f2854]/70 p-4">
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                      <p className="mt-2 text-sm text-slate-100/85">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-slate-400">
            <span className="h-px flex-1 bg-white/10" />
            <button
              onClick={() => scrollToSection("about")}
              className="flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-white/90 transition hover:border-white/60 hover:text-white"
            >
              Scroll Down
              <span className="text-base">↓</span>
            </button>
            <span className="h-px flex-1 bg-white/10" />
          </div>
        </section>

        <section id="about" className="snap-start py-20">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-3xl border border-white/15 bg-white/10 p-8">
              <div className="flex items-center gap-6">
                <div className="float-slow relative h-28 w-28 rounded-3xl bg-gradient-to-br from-ink-200 via-ink-300 to-ink-400 p-[2px]">
                  <div className="flex h-full w-full items-center justify-center rounded-3xl bg-[#0f2854] text-4xl font-semibold text-white">
                    YN
                  </div>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-ink-100">Systems Engineer</p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">Your Name</h3>
                  <p className="mt-1 text-sm text-slate-100/85">DevOps · Platform · Reliability</p>
                </div>
              </div>
              <div className="mt-6 space-y-4 text-sm text-slate-100/85">
                <p>
                  I help teams ship with confidence by building infrastructure that is secure, observable, and easy to evolve.
                </p>
                <p>
                  My focus is on high-availability systems, automation-first operations, and clear reliability metrics.
                </p>
              </div>
              <div className="mt-6 grid gap-4 text-xs uppercase tracking-[0.2em] text-ink-100 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                  <p className="text-white">Location</p>
                  <p className="mt-2">Remote / Global</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                  <p className="text-white">Focus</p>
                  <p className="mt-2">Cloud Infrastructure</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-ink-200">About</p>
              <h2 className="mt-6 text-3xl font-semibold text-white sm:text-4xl">
                I build platforms that feel invisible because they just work.
              </h2>
              <p className="mt-6 text-lg text-slate-100/85">
                My work centers on reliability, automation, and a product-first approach to infrastructure. I help teams
                deliver safely at speed, using secure-by-default patterns and continuous verification.
              </p>
              <p className="mt-4 text-lg text-slate-100/85">
                From blueprinting cloud foundations to tuning observability pipelines, I turn complexity into clean
                operational systems that teams trust.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/15 bg-white/10 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-ink-100">Now</p>
                  <p className="mt-3 text-sm text-slate-100/85">Leading platform reliability for fintech & SaaS teams.</p>
                </div>
                <div className="rounded-3xl border border-white/15 bg-white/10 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-ink-100">Previously</p>
                  <p className="mt-3 text-sm text-slate-100/85">Cloud migrations, IaC modernization, and observability upgrades.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="snap-start py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-ink-200">Skills</p>
              <h2 className="mt-6 text-3xl font-semibold text-white sm:text-4xl">
                DevOps, SRE, and systems engineering toolkit.
              </h2>
            </div>
            <p className="max-w-xl text-sm text-slate-300">
              A focused toolchain for reliability engineering, automation, and secure cloud delivery.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-slate-100/85"
              >
                {skill}
              </span>
            ))}
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {toolchain.map((tool) => (
              <div key={tool} className="rounded-2xl border border-white/15 bg-white/10 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-ink-100">Focus Area</p>
                <p className="mt-2 text-sm text-white">{tool}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="snap-start py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-ink-200">Projects</p>
              <h2 className="mt-6 text-3xl font-semibold text-white sm:text-4xl">Flagship work and outcomes.</h2>
            </div>
            <p className="max-w-xl text-sm text-slate-300">
              A snapshot of real infrastructure work that improved performance, reliability, and developer experience.
            </p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-white/15 bg-gradient-to-br from-ink-400/30 via-[#0f2854]/80 to-[#0f2854] p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-ink-200">Featured Project</p>
              <h3 className="mt-4 text-2xl font-semibold text-white">Zero-Downtime Platform Migration</h3>
              <p className="mt-4 text-sm text-slate-100/85">
                Led the migration of 120+ services to a multi-region Kubernetes platform with GitOps delivery, policy
                guardrails, and automated rollback. Reduced release risk while improving deployment velocity by 3x.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-[0.2em] text-slate-300">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Kubernetes</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Terraform</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">GitOps</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">SRE</span>
              </div>
            </div>
            <div className="grid gap-6">
              <div className="rounded-3xl border border-white/15 bg-white/10 p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-ink-100">Impact</p>
                <div className="mt-4 space-y-3 text-sm text-slate-100/85">
                  <p>99.99% availability on core services.</p>
                  <p>3x faster release cadence with automated checks.</p>
                  <p>Incident response reduced from 45m to 12m.</p>
                </div>
              </div>
              <div className="rounded-3xl border border-white/15 bg-white/10 p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-ink-100">Highlights</p>
                <div className="mt-4 space-y-3 text-sm text-slate-100/85">
                  <p>Zero-downtime migration strategy.</p>
                  <p>Compliance-ready audit trails.</p>
                  <p>Unified observability across 4 regions.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <div
                key={project.title}
                className="rounded-3xl border border-white/15 bg-white/10 p-6 transition hover:border-white/30 hover:bg-white/15"
              >
                <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                <p className="mt-3 text-sm text-slate-100/85">{project.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-ink-200">Experience</p>
              <h3 className="mt-4 text-2xl font-semibold text-white">Career timeline.</h3>
              <div className="mt-6 space-y-4">
                {experience.map((item) => (
                  <div key={item.role} className="rounded-3xl border border-white/15 bg-white/10 p-5">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <h4 className="text-base font-semibold text-white">{item.role}</h4>
                        <p className="mt-1 text-sm text-slate-100/85">{item.company}</p>
                      </div>
                      <span className="text-xs uppercase tracking-[0.3em] text-ink-100">{item.period}</span>
                    </div>
                    <p className="mt-3 text-sm text-slate-100/85">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-ink-200">Certifications</p>
              <h3 className="mt-4 text-2xl font-semibold text-white">Industry credentials.</h3>
              <div className="mt-6 grid gap-4">
                {certifications.map((cert) => (
                  <div key={cert} className="rounded-2xl border border-white/15 bg-white/10 p-4 text-sm text-slate-100/85">
                    {cert}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="snap-start py-20">
          <div className="rounded-3xl border border-white/15 bg-white/10 p-10 text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-ink-200">Contact</p>
            <h2 className="mt-6 text-3xl font-semibold text-white sm:text-4xl">
              Let’s build a platform your team is proud to run.
            </h2>
            <p className="mt-4 text-lg text-slate-100/85">
              Share your infrastructure goals and I will map the fastest path to reliable, secure delivery.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="mailto:hello@yourdomain.com"
                className="rounded-full bg-ink-400 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-900 shadow-glow transition hover:bg-ink-200"
              >
                hello@yourdomain.com
              </a>
              <button
                onClick={() => scrollToSection("top")}
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:border-white/60 hover:bg-white/15"
              >
                Back To Top
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/15 py-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 text-xs uppercase tracking-[0.3em] text-ink-100">
          <span>© 2026 Systems Engineer Portfolio</span>
          <span>Built with Next.js + Tailwind CSS</span>
        </div>
      </footer>

      <aside className="hidden lg:flex fixed top-1/2 right-6 -translate-y-1/2 flex-col gap-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className="group flex items-center gap-3"
            aria-label={`Go to ${item.label}`}
          >
            <span
              className={`h-3 w-3 rounded-full border transition ${
                activeSection === item.id
                  ? "border-ink-300 bg-ink-400"
                  : "border-white/30 bg-transparent"
              }`}
            />
            <span
              className={`text-[10px] uppercase tracking-[0.3em] transition ${
                activeSection === item.id ? "text-ink-200" : "text-slate-500"
              }`}
            >
              {item.label}
            </span>
          </button>
        ))}
      </aside>

      <button
        onClick={() => scrollToSection("top")}
        className={`fixed bottom-6 right-6 z-50 rounded-full border border-white/30 bg-[#0f2854]/85 px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow-soft transition hover:border-white/60 hover:bg-[#1c4d8d]/80 lg:bottom-10 lg:right-10 ${
          showTop ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-label="Scroll to top"
      >
        Top
      </button>
    </div>
  );
}
