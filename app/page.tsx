"use client";

import { useEffect, useRef, useState } from "react";

const CONTACT_EMAIL = "nattavee.n@nattavee.com";

const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/mossnattavee/",
  github: "https://github.com/mossZmossZ",
  email: `mailto:${CONTACT_EMAIL}`
};

const navItems = [
  { id: "top", label: "Overview" },
  { id: "capabilities", label: "Capabilities" },
  { id: "expertise", label: "Expertise" },
  { id: "work", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" }
];

const impactHighlights = [
  {
    title: "1+ Years",
    subtitle: "Production Infrastructure",
    detail: "Operating enterprise virtualization and cloud-native platforms in live environments."
  },
  {
    title: "5 Certifications",
    subtitle: "Kubernetes, Nutanix, Security",
    detail: "Validated depth across platform engineering, cloud-native systems, and cyber fundamentals."
  },
  {
    title: "Since April 2024",
    subtitle: "Professional Timeline",
    detail: "Progression from network engineering intern to systems engineer managing critical workloads."
  }
];

const capabilities = [
  {
    title: "Platform Reliability",
    detail:
      "Operate mission-critical Nutanix and VMware clusters with controlled upgrades, predictable change windows, and recovery readiness."
  },
  {
    title: "Cloud-Native Delivery",
    detail:
      "Design Kubernetes environments and GitOps delivery paths with Argo CD and GitHub Actions for repeatable, low-risk releases."
  },
  {
    title: "Observability and Security",
    detail:
      "Build monitoring and security foundations across Prometheus, Grafana, OpenSearch, FortiGate, and segmented network architecture."
  }
];

const operatingModel = [
  "Map reliability and compliance constraints before rollout.",
  "Design migration and deployment paths with rollback checkpoints.",
  "Automate CI/CD and runbooks to reduce manual operations.",
  "Instrument health, logs, and alerts for faster incident response."
];

const skillGroups = [
  {
    label: "Platform",
    items: ["Kubernetes", "Nutanix NKP", "VMware ESXi/vCenter", "Docker", "Helm"]
  },
  {
    label: "Delivery",
    items: ["Argo CD", "GitHub Actions", "Ansible", "Kubespray", "Python", "Bash"]
  },
  {
    label: "Observability & Network",
    items: ["Prometheus", "Grafana", "Zabbix", "OpenSearch", "FortiGate", "Cisco Switching", "Cloudflare"]
  }
];

const certifications = [
  {
    title: "Kubernetes and Cloud Native Associate (KCNA)",
    image: "/api/media/certifications/kcna"
  },
  {
    title: "Nutanix Certified Professional - Cloud Native 6",
    image: "/api/media/certifications/ncp-cn6"
  },
  {
    title: "Nutanix Certified Professional - Multicloud Infrastructure 6",
    image: "/api/media/certifications/ncp-mci6"
  },
  {
    title: "Certified in Cybersecurity (CC) - ISC2",
    image: "/api/media/certifications/cc-isc2"
  },
  {
    title: "Fortinet Certified Associate in Cybersecurity",
    image: "/api/media/certifications/fortinet-fca"
  }
];

const projects = [
  {
    title: "E-learning Platform Infrastructure",
    year: "2025",
    summary:
      "Delivered a production-ready K3s platform with Harbor, Argo CD promotion workflows, and CI pipelines for safer and faster deployment.",
    stack: "K3s, Harbor, Argo CD, GitHub Actions",
    outcomes: [
      "Introduced controlled release promotion from Git state.",
      "Improved deployment consistency and reduced manual operational steps.",
      "Built secure private image lifecycle management for application teams."
    ],
    image: "/api/media/projects/elearning"
  },
  {
    title: "Network Monitoring Capstone",
    year: "2024",
    summary:
      "Implemented centralized observability across network and services with metrics, dashboards, and log-driven investigation workflows.",
    stack: "Zabbix, Prometheus, Grafana, OpenSearch",
    outcomes: [
      "Unified operational visibility across multiple telemetry sources.",
      "Improved issue detection and troubleshooting speed.",
      "Created reusable monitoring baseline for future infrastructure growth."
    ],
    image: "/api/media/projects/monitoring"
  },
  {
    title: "Homelab and Community Platform",
    year: "2024-Present",
    summary:
      "Operate a personal Proxmox and Kubernetes platform and co-build Homelab Thailand to share practical infrastructure patterns.",
    stack: "Proxmox, FortiGate, Kubernetes",
    outcomes: [
      "Validated segmented network and self-hosted service architectures.",
      "Practiced production-style backup, restore, and service hardening.",
      "Contributed real-world playbooks to the homelab community."
    ],
    image: "/api/media/projects/homelab"
  }
];

const experience = [
  {
    role: "Systems Engineer",
    company: "Zenith Comp Co., Ltd.",
    period: "Apr 2025 - Present",
    detail:
      "Manage Nutanix and VMware operations, support Kubernetes implementations, and improve configuration consistency across production workloads."
  },
  {
    role: "Freelance DevOps Engineer",
    company: "E-learning Platform",
    period: "Jul 2025 - Sep 2025",
    detail:
      "Built Kubernetes deployment workflows, private registry operations, and CI/CD automation for controlled application delivery."
  },
  {
    role: "IT Support and Teaching Assistant",
    company: "King Mongkut's University of Technology North Bangkok",
    period: "Jul 2024 - Apr 2025",
    detail:
      "Maintained lab systems, deployed engineering software, and supported network infrastructure for academic operations."
  },
  {
    role: "Network Engineer Intern",
    company: "AUSTON ICT Solution",
    period: "Apr 2024 - Jun 2024",
    detail:
      "Supported FortiGate migration tasks, Cisco network implementation, and security policy tuning for customer environments."
  }
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    const targets = root.querySelectorAll("[data-reveal]");
    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, []);

  return ref;
}

export default function Home() {
  const contentRef = useReveal();
  const [activeSection, setActiveSection] = useState("top");
  const [showTop, setShowTop] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;

    const onScroll = () => {
      const y = window.scrollY;
      setShowTop(y > 500);
      setIsScrolled(y > 24);

      const progress = Math.min(y / 900, 1);
      document.documentElement.style.setProperty("--hero-shift", `${progress * 24}px`);
      document.documentElement.style.setProperty("--hero-scale", `${1 + progress * 0.05}`);

      const marker = window.innerHeight * 0.4;
      let current = sections[0].id;
      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= marker) current = section.id;
      });
      setActiveSection(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={contentRef} className="portfolio-root">
      <header className={`site-header ${isScrolled ? "site-header--scrolled" : ""}`}>
        <div className="shell flex items-center justify-between">
          <a href="#top" className="brand-mark">MOSS NATTAVEE</a>
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`nav-link ${activeSection === item.id ? "nav-link--active" : ""}`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <button onClick={() => scrollToSection("contact")} className="primary-cta">Let&apos;s Work</button>
        </div>
      </header>

      <main>
        <section id="top" className="hero">
          <img src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=2200&q=80" alt="Infrastructure background" className="hero-image" />
          <div className="hero-wash" />
          <div className="shell hero-content">
            <div className="hero-grid">
              <div>
                <p data-reveal className="hero-kicker">Systems Engineer and DevOps</p>
                <h1 data-reveal className="hero-title">Nattavee Narischat</h1>
                <p data-reveal className="hero-subtitle">
                  Building production-grade infrastructure across virtualization, Kubernetes, security, and observability with reliability-first execution.
                </p>
                <div data-reveal className="hero-actions">
                  <button onClick={() => scrollToSection("work")} className="primary-cta">View Projects</button>
                  <a href={SOCIAL_LINKS.email} className="ghost-cta">{CONTACT_EMAIL}</a>
                </div>
              </div>

              <div data-reveal className="profile-frame">
                <img src="/api/media/profile" alt="Nattavee profile" className="profile-image" />
                <div className="profile-meta">
                  <p className="profile-role">Systems Engineer</p>
                  <p className="profile-location">Bangkok, Thailand</p>
                  <div className="profile-links">
                    <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="shell impact-strip" aria-label="Impact highlights">
          {impactHighlights.map((item) => (
            <article key={item.title} data-reveal className="impact-item">
              <p className="impact-title">{item.title}</p>
              <p className="impact-subtitle">{item.subtitle}</p>
              <p className="impact-detail">{item.detail}</p>
            </article>
          ))}
        </section>

        <section id="capabilities" className="section shell section-split">
          <div>
            <p data-reveal className="section-label">Capabilities</p>
            <h2 data-reveal className="section-title">Infrastructure engineered for reliability, security, and delivery speed.</h2>
          </div>
          <div className="divide-y divide-white/15">
            {capabilities.map((item) => (
              <article key={item.title} data-reveal className="py-6 first:pt-0">
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 max-w-2xl text-base text-slate-300">{item.detail}</p>
              </article>
            ))}
            <article data-reveal className="py-6">
              <p className="micro-title">Execution Model</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                {operatingModel.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section id="expertise" className="section shell section-split">
          <div>
            <p data-reveal className="section-label">Expertise</p>
            <h2 data-reveal className="section-title">Technical breadth aligned to enterprise and cloud-native operations.</h2>
            <p data-reveal className="mt-5 max-w-xl text-base text-slate-300">
              Bachelor of Engineering in Computer Engineering, King Mongkut&apos;s University of Technology North Bangkok, graduated April 2025 with GPA 3.26.
            </p>
          </div>
          <div className="space-y-9">
            {skillGroups.map((group) => (
              <article key={group.label} data-reveal>
                <p className="micro-title">{group.label}</p>
                <div className="chip-cloud mt-4">
                  {group.items.map((item) => (
                    <span key={item} className="chip-item">{item}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section shell">
          <p data-reveal className="section-label">Certifications</p>
          <h2 data-reveal className="section-title max-w-3xl">Credential portfolio with dedicated image endpoints for each certificate.</h2>
          <div className="cert-grid mt-8">
            {certifications.map((cert) => (
              <article key={cert.title} data-reveal className="cert-item">
                <img src={cert.image} alt={cert.title} className="cert-image" />
                <p className="cert-title">{cert.title}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="work" className="section shell">
          <p data-reveal className="section-label">Projects</p>
          <h2 data-reveal className="section-title max-w-3xl">Projects with clear architecture and outcome narratives.</h2>
          <div className="project-list">
            {projects.map((project, index) => (
              <article key={project.title} data-reveal className="project-row">
                <div className="project-meta">
                  <p className="project-year">{project.year}</p>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-summary">{project.summary}</p>
                  <p className="project-stack">{project.stack}</p>
                  <ul className="mt-4 space-y-1 text-sm text-slate-300">
                    {project.outcomes.map((outcome) => (
                      <li key={outcome}>- {outcome}</li>
                    ))}
                  </ul>
                </div>
                <div className={`project-image-wrap ${index % 2 ? "project-image-wrap--offset" : ""}`}>
                  <img src={project.image} alt={project.title} className="project-image" />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="section shell section-split">
          <div>
            <p data-reveal className="section-label">Experience</p>
            <h2 data-reveal className="section-title">Career progression from network engineering to systems engineering leadership.</h2>
          </div>
          <ol className="experience-list">
            {experience.map((item) => (
              <li key={item.role} data-reveal className="experience-item">
                <p className="experience-period">{item.period}</p>
                <h3 className="experience-role">{item.role}</h3>
                <p className="experience-company">{item.company}</p>
                <p className="experience-detail">{item.detail}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="contact" className="section shell">
          <div data-reveal className="contact-band">
            <p className="section-label">Contact</p>
            <h2 className="section-title max-w-2xl">Open to platform engineering, SRE, and infrastructure automation opportunities.</h2>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href={SOCIAL_LINKS.email} className="primary-cta">Email Me</a>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="ghost-cta">LinkedIn</a>
              <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="ghost-cta">GitHub</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="shell border-t border-white/10 py-8 text-xs uppercase tracking-[0.24em] text-slate-500">
        (c) 2026 Nattavee Narischat
      </footer>

      <button onClick={() => scrollToSection("top")} className={`top-button ${showTop ? "top-button--visible" : ""}`}>
        Top
      </button>
    </div>
  );
}