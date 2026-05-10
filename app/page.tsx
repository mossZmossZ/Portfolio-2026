"use client";

import { useEffect, useRef, useState } from "react";

const CONTACT_EMAIL = "nattavee.n@nattavee.com";
const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/mossnattavee/",
  github: "https://github.com/mossZmossZ",
  email: `mailto:${CONTACT_EMAIL}`
};

const navItems = [
  { id: "top", label: "Home" },
  { id: "work", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" }
];

const impactHighlights = [
  { title: "1+ Years", subtitle: "Production Infrastructure" },
  { title: "5 Certs", subtitle: "Kubernetes, Nutanix, Security" },
  { title: "Apr 2024", subtitle: "Career Started" }
];

const capabilities = [
  {
    title: "Platform Reliability",
    detail: "Nutanix and VMware clusters with structured change control and recovery readiness.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="5" rx="1" />
        <rect x="2" y="10" width="20" height="5" rx="1" />
        <rect x="2" y="17" width="20" height="5" rx="1" />
        <circle cx="18" cy="5.5" r="1" fill="currentColor" stroke="none" />
        <circle cx="18" cy="12.5" r="1" fill="currentColor" stroke="none" />
        <circle cx="18" cy="19.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    )
  },
  {
    title: "Cloud-Native Delivery",
    detail: "Kubernetes environments and GitOps pipelines for safer, repeatable releases.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      </svg>
    )
  },
  {
    title: "Observability & Security",
    detail: "Monitoring stacks and network security foundations for rapid incident response.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    )
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
    tag: "DevOps / GitOps",
    summary: "Built a K3s platform with Harbor and Argo CD for consistent deployment and release control.",
    stack: "K3s · Harbor · Argo CD · GitHub Actions",
    image: "/api/media/projects/elearning"
  },
  {
    title: "Network Monitoring Platform",
    year: "2024",
    tag: "Observability",
    summary: "Unified network and service telemetry into one monitoring workflow for faster troubleshooting.",
    stack: "Zabbix · Prometheus · Grafana · OpenSearch",
    image: "/api/media/projects/monitoring"
  },
  {
    title: "Homelab Infrastructure",
    year: "2024 – Present",
    tag: "Infrastructure",
    summary: "Operate a personal Proxmox and Kubernetes lab to validate architecture and automation patterns.",
    stack: "Proxmox · FortiGate · Kubernetes",
    image: "/api/media/projects/homelab"
  }
];

const experience = [
  {
    role: "Systems Engineer",
    company: "Zenith Comp Co., Ltd.",
    period: "Apr 2025 – Present",
    detail: "Manage virtualization and Kubernetes operations for production infrastructure stability."
  },
  {
    role: "Freelance DevOps Engineer",
    company: "E-learning Platform",
    period: "Jul 2025 – Sep 2025",
    detail: "Implemented CI/CD and GitOps workflows with private registry integration."
  },
  {
    role: "IT Support & Teaching Assistant",
    company: "KMUTNB",
    period: "Jul 2024 – Apr 2025",
    detail: "Maintained lab systems, software deployments, and academic network operations."
  },
  {
    role: "Network Engineer Intern",
    company: "AUSTON ICT Solution",
    period: "Apr 2024 – Jun 2024",
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
      { threshold: 0.12 }
    );

    const targets = root.querySelectorAll("[data-reveal]");
    targets.forEach((t) => observer.observe(t));

    return () => observer.disconnect();
  }, []);

  return ref;
}

export default function Home() {
  const rootRef = useReveal();
  const [activeSection, setActiveSection] = useState("top");
  const [isScrolled, setIsScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;

    const onScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 20);
      setShowTop(y > 500);

      const marker = window.innerHeight * 0.4;
      let current = sections[0].id;
      sections.forEach((s) => {
        if (s.getBoundingClientRect().top <= marker) current = s.id;
      });
      setActiveSection(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div ref={rootRef}>
      {/* ── NAV ── */}
      <header className={`site-header ${isScrolled ? "site-header--scrolled" : ""}`}>
        <div className="shell flex items-center justify-between">
          <a href="#top" className="brand">
            Nattavee<span>.</span>
          </a>
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`nav-btn ${activeSection === item.id ? "nav-btn--active" : ""}`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main>
        {/* ── HERO / ABOUT ── */}
        <section id="top" className="hero-section shell">
          {/* Big headline */}
          <div data-reveal className="hero-head">
            <p className="greeting">Hi I&apos;m Nattavee,</p>
            <h1 className="statement">
              a Systems Engineer passionate about building reliable infrastructure and cloud-native platforms.
            </h1>
          </div>

          {/* About 2-column grid */}
          <div className="about-grid">
            {/* LEFT */}
            <div className="left-panel">
              {/* Profile */}
              <div data-reveal className="profile-row">
                <img src="/api/media/profile" alt="Nattavee Narischat" className="avatar" />
                <div>
                  <p className="avatar-name">Moss Nattavee</p>
                  <p className="avatar-sub">Systems Engineer · Bangkok, Thailand</p>
                </div>
              </div>

              {/* Bio */}
              <div data-reveal>
                <p className="block-label">Biography</p>
                <p className="bio-text">
                  Managing production infrastructure for 1+ years with Kubernetes, Nutanix, and VMware.
                  Excited about DevOps, GitOps, and cloud-native reliability.
                  Progression from network intern to systems engineer since Apr 2024.
                </p>
              </div>

              {/* What I do */}
              <div data-reveal>
                <p className="block-label">What I Do</p>
                <div className="cap-list">
                  {capabilities.map((cap) => (
                    <div key={cap.title} className="cap-card">
                      <div className="cap-icon">{cap.icon}</div>
                      <div className="cap-body">
                        <p className="cap-title">{cap.title}</p>
                        <p className="cap-desc">{cap.detail}</p>
                      </div>
                      <span className="cap-arrow">→</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="right-panel">
              {/* Let's connect */}
              <div data-reveal>
                <p className="block-label">Let&apos;s Connect</p>
                <div className="social-row">
                  {/* LinkedIn */}
                  <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="LinkedIn">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                  {/* GitHub */}
                  <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="GitHub">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </a>
                  {/* Email */}
                  <a href={SOCIAL_LINKS.email} className="social-btn" aria-label="Email">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Impact stats */}
              <div data-reveal>
                <div className="stats-block">
                  {impactHighlights.map((item) => (
                    <div key={item.title} className="stat-card">
                      <p className="stat-val">{item.title}</p>
                      <p className="stat-sub">{item.subtitle}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div data-reveal className="skills-block">
                {skillGroups.map((group) => (
                  <div key={group.label}>
                    <p className="group-label">{group.label}</p>
                    <div className="chip-row">
                      {group.items.map((item) => (
                        <span key={item} className="chip">{item}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FEATURED PROJECTS ── */}
        <section id="work" className="section shell">
          <h2 data-reveal className="section-h">Featured Projects</h2>
          <div className="project-list">
            {projects.map((project) => (
              <article key={project.title} data-reveal className="project-row">
                <div className="project-preview">
                  <div className="browser-bar">
                    <span className="dot" />
                    <span className="dot" />
                    <span className="dot" />
                  </div>
                  <img src={project.image} alt={project.title} className="project-img" />
                </div>
                <div className="project-meta">
                  <span className="proj-tag">{project.tag}</span>
                  <h3 className="proj-title">{project.title}</h3>
                  <p className="proj-desc">{project.summary}</p>
                  <p className="proj-stack">{project.stack}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── CERTIFICATIONS ── */}
        <section className="section shell">
          <h2 data-reveal className="section-h">Certifications</h2>
          <div className="certs-grid">
            {certifications.map((cert) => (
              <article key={cert.title} data-reveal className="cert-card">
                <img src={cert.image} alt={cert.title} className="cert-img" />
                <p className="cert-name">{cert.title}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── EXPERIENCE ── */}
        <section id="experience" className="section shell">
          <h2 data-reveal className="section-h">Experience</h2>
          <div className="exp-list">
            {experience.map((item) => (
              <article key={item.role} data-reveal className="exp-card">
                <p className="exp-period">{item.period}</p>
                <h3 className="exp-role">{item.role}</h3>
                <p className="exp-company">{item.company}</p>
                <p className="exp-detail">{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="section shell">
          <div data-reveal className="contact-card">
            <p className="block-label">Contact</p>
            <h2 className="contact-title">
              Open to platform, DevOps, and infrastructure engineering opportunities.
            </h2>
            <div className="contact-actions">
              <a href={SOCIAL_LINKS.email} className="btn-primary">Email Me</a>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="btn-outline">LinkedIn</a>
              <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="btn-outline">GitHub</a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="shell">&copy; 2026 Nattavee Narischat</div>
      </footer>

      <button
        onClick={() => scrollTo("top")}
        className={`back-top ${showTop ? "back-top--visible" : ""}`}
        aria-label="Back to top"
      >
        ↑ Top
      </button>
    </div>
  );
}
