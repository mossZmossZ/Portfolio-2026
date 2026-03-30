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
  { id: "work", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" }
];

const impactHighlights = [
  {
    title: "1+ Years",
    subtitle: "Production Infrastructure",
    detail: "Enterprise virtualization and cloud-native operations in live environments."
  },
  {
    title: "5 Certifications",
    subtitle: "Kubernetes, Nutanix, Security",
    detail: "Validated skills across platform engineering and cybersecurity fundamentals."
  },
  {
    title: "Since Apr 2024",
    subtitle: "Professional Timeline",
    detail: "Progression from network engineer intern to systems engineer."
  }
];

const capabilities = [
  {
    title: "Platform Reliability",
    detail: "Operate Nutanix and VMware clusters with structured changes, upgrade planning, and recovery readiness."
  },
  {
    title: "Cloud-Native Delivery",
    detail: "Build Kubernetes environments and GitOps delivery pipelines for safer, repeatable releases."
  },
  {
    title: "Observability and Security",
    detail: "Implement monitoring and network security foundations for faster incident detection and response."
  }
];

const skillGroups = [
  { label: "Platform", items: ["Kubernetes", "Nutanix", "VMware", "Docker", "Helm"] },
  { label: "Delivery", items: ["Argo CD", "GitHub Actions", "Ansible", "Python", "Bash"] },
  { label: "Observability & Network", items: ["Prometheus", "Grafana", "OpenSearch", "FortiGate", "Cisco", "Cloudflare"] }
];

const projects = [
  {
    title: "E-learning Platform Infrastructure",
    year: "2025",
    summary: "Built a K3s platform with Harbor and Argo CD for consistent deployment and release control.",
    stack: "K3s, Harbor, Argo CD, GitHub Actions",
    image: "/api/media/projects/elearning"
  },
  {
    title: "Network Monitoring Platform",
    year: "2024",
    summary: "Unified network and service telemetry into one monitoring workflow for faster troubleshooting.",
    stack: "Zabbix, Prometheus, Grafana, OpenSearch",
    image: "/api/media/projects/monitoring"
  },
  {
    title: "Homelab Infrastructure",
    year: "2024-Present",
    summary: "Operate a personal Proxmox and Kubernetes lab to validate architecture and automation patterns.",
    stack: "Proxmox, FortiGate, Kubernetes",
    image: "/api/media/projects/homelab"
  }
];

const experience = [
  {
    role: "Systems Engineer",
    company: "Zenith Comp Co., Ltd.",
    period: "Apr 2025 - Present",
    detail: "Manage virtualization and Kubernetes operations for production infrastructure stability."
  },
  {
    role: "Freelance DevOps Engineer",
    company: "E-learning Platform",
    period: "Jul 2025 - Sep 2025",
    detail: "Implemented CI/CD and GitOps workflows with private registry integration."
  },
  {
    role: "IT Support and Teaching Assistant",
    company: "KMUTNB",
    period: "Jul 2024 - Apr 2025",
    detail: "Maintained lab systems, software deployments, and academic network operations."
  },
  {
    role: "Network Engineer Intern",
    company: "AUSTON ICT Solution",
    period: "Apr 2024 - Jun 2024",
    detail: "Supported firewall migration and Cisco network configuration tasks."
  }
];

const certifications = [
  { title: "KCNA", image: "/api/media/certifications/kcna" },
  { title: "NCP Cloud Native 6", image: "/api/media/certifications/ncp-cn6" },
  { title: "NCP Multicloud Infrastructure 6", image: "/api/media/certifications/ncp-mci6" },
  { title: "ISC2 CC", image: "/api/media/certifications/cc-isc2" },
  { title: "Fortinet FCA", image: "/api/media/certifications/fortinet-fca" }
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
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
      document.documentElement.style.setProperty("--hero-shift", `${progress * 18}px`);
      document.documentElement.style.setProperty("--hero-scale", `${1 + progress * 0.03}`);

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
          <button onClick={() => scrollToSection("contact")} className="primary-cta">Contact</button>
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
                  Building reliable infrastructure across virtualization, Kubernetes, and secure operations.
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
            <h2 data-reveal className="section-title">Focused technical depth with production discipline.</h2>
          </div>
          <div className="space-y-6 border-t border-white/15 pt-5">
            {capabilities.map((item) => (
              <article key={item.title} data-reveal>
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-base text-slate-300">{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="work" className="section shell">
          <p data-reveal className="section-label">Projects</p>
          <h2 data-reveal className="section-title max-w-3xl">Selected implementations.</h2>
          <div className="project-list">
            {projects.map((project, index) => (
              <article key={project.title} data-reveal className="project-row">
                <div className="project-meta">
                  <p className="project-year">{project.year}</p>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-summary">{project.summary}</p>
                  <p className="project-stack">{project.stack}</p>
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
            <h2 data-reveal className="section-title">Career progression in infrastructure engineering.</h2>
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

        <section className="section shell section-split">
          <div>
            <p data-reveal className="section-label">Stack and Credentials</p>
            <h2 data-reveal className="section-title">Tools and certifications at a glance.</h2>
            <div className="mt-8 space-y-8">
              {skillGroups.map((group) => (
                <article key={group.label} data-reveal>
                  <p className="micro-title">{group.label}</p>
                  <div className="chip-cloud mt-3">
                    {group.items.map((item) => (
                      <span key={item} className="chip-item">{item}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div>
            <div className="cert-grid">
              {certifications.map((cert) => (
                <article key={cert.title} data-reveal className="cert-item">
                  <img src={cert.image} alt={cert.title} className="cert-image" />
                  <p className="cert-title">{cert.title}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section shell">
          <div data-reveal className="contact-band">
            <p className="section-label">Contact</p>
            <h2 className="section-title max-w-2xl">Open to platform, DevOps, and infrastructure engineering opportunities.</h2>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href={SOCIAL_LINKS.email} className="primary-cta">Email</a>
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