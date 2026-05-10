"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CONTACT_EMAIL = "nattavee.n@nattavee.com";
const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/mossnattavee/",
  github:   "https://github.com/mossZmossZ",
  email:    `mailto:${CONTACT_EMAIL}`
};

const navItems = [
  { id: "top",        label: "Home" },
  { id: "work",       label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact",    label: "Contact" }
];

const impactHighlights = [
  { title: "1+ Years", subtitle: "Production Infrastructure" },
  { title: "5 Certs",  subtitle: "Kubernetes, Nutanix, Security" },
  { title: "Apr 2024", subtitle: "Career Started" }
];

const capabilities = [
  {
    title: "Platform Reliability",
    detail: "Nutanix and VMware clusters with structured change control and recovery readiness.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3"  width="20" height="5" rx="1" />
        <rect x="2" y="10" width="20" height="5" rx="1" />
        <rect x="2" y="17" width="20" height="5" rx="1" />
        <circle cx="18" cy="5.5"  r="1" fill="currentColor" stroke="none" />
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
  { label: "Platform",               items: ["Kubernetes", "Nutanix", "VMware", "Docker", "Helm"] },
  { label: "Delivery",               items: ["Argo CD", "GitHub Actions", "Ansible", "Python", "Bash"] },
  { label: "Observability & Network",items: ["Prometheus", "Grafana", "OpenSearch", "FortiGate", "Cisco", "Cloudflare"] }
];

const projects = [
  {
    title:   "E-learning Platform Infrastructure",
    tag:     "DevOps / GitOps",
    summary: "Built a K3s platform with Harbor and Argo CD for consistent deployment and release control.",
    stack:   "K3s · Harbor · Argo CD · GitHub Actions",
    image:   "/api/media/projects/elearning"
  },
  {
    title:   "Network Monitoring Platform",
    tag:     "Observability",
    summary: "Unified network and service telemetry into one monitoring workflow for faster troubleshooting.",
    stack:   "Zabbix · Prometheus · Grafana · OpenSearch",
    image:   "/api/media/projects/monitoring"
  },
  {
    title:   "Homelab Infrastructure",
    tag:     "Infrastructure",
    summary: "Operate a personal Proxmox and Kubernetes lab to validate architecture and automation patterns.",
    stack:   "Proxmox · FortiGate · Kubernetes",
    image:   "/api/media/projects/homelab"
  }
];

const experience = [
  {
    role:     "Systems Engineer (DevOps & Platform Focus)",
    company:  "Zenith Comp Co., Ltd.",
    location: "Bangkok",
    period:   "Apr 2025 – Present",
    detail:   "Operate Nutanix Kubernetes Platform and enterprise HCI for production infrastructure.",
    bullets: [
      "Engineered and operated Nutanix Kubernetes Platform (NKP) for containerized deployments; authored a variable-driven air-gapped deployment runbook using Harbor as a private registry across multi-node clusters.",
      "Provided 24x7 technical support and incident response for enterprise infrastructure deployments; managed support cases end-to-end from triage through resolution, ensuring SLA compliance and customer satisfaction.",
      "Deployed and configured Nutanix HCI clusters from initial node imaging through cluster formation; implemented VMware vSAN with HA and DRS policies to ensure compute workload resilience across failure domains.",
      "Authored infrastructure runbooks and configuration management procedures, reducing operational toil and improving deployment consistency for cross-functional teams."
    ]
  },
  {
    role:     "DevOps Engineer",
    company:  "E-learning Platform (Freelance)",
    location: "Remote",
    period:   "Jul – Sep 2025",
    detail:   "Designed and deployed production K3s cluster with full GitOps CI/CD pipeline.",
    bullets: [
      "Designed and deployed a production K3s Kubernetes cluster from the ground up; implemented end-to-end GitOps with ArgoCD managing 5+ app deployments across dev/staging/prod environments.",
      "Configured GitHub Actions CI/CD pipelines with Harbor private registry, automating image builds and deployments on each commit — eliminating all manual release steps.",
      "Deployed NestJS, Next.js, and MinIO microservices with ingress controller, load balancer, and domain routing for secure external access."
    ]
  },
  {
    role:     "IT Support / Help Desk",
    company:  "ICIT Engineering, KMUTNB",
    location: "Bangkok",
    period:   "Jul 2024 – Apr 2025",
    detail:   "Administered Linux and VMware environments; supported 500+ students and faculty.",
    bullets: [
      "Administered Linux systems and VMware virtualization environments; delivered technical support to 500+ students and faculty across engineering labs."
    ]
  },
  {
    role:     "Teacher Assistant — Computer Networks Lab",
    company:  "KMUTNB",
    location: "Bangkok",
    period:   "Jul – Oct 2024",
    detail:   "Designed and deployed network lab infrastructure for academic coursework.",
    bullets: [
      "Designed and deployed network lab infrastructure (FortiGate, Cisco switches, WAPs) and provisioned academic services — EVE-NG, iPerf, CTF platform — on Linux VMs."
    ]
  },
  {
    role:     "Network Engineer Intern",
    company:  "AUSTON ICT Solution Co., Ltd.",
    location: "Bangkok",
    period:   "Apr – Jun 2024",
    detail:   "Executed firewall migrations and FortiGate upgrades for enterprise clients.",
    bullets: [
      "Executed firewall migrations, optimized security policies, and performed FortiGate firmware upgrades for enterprise clients."
    ]
  }
];

const certifications = [
  { title: "KCNA",                           image: "/api/media/certifications/kcna" },
  { title: "NCP Cloud Native 6",             image: "/api/media/certifications/ncp-cn6" },
  { title: "NCP Multicloud Infrastructure 6",image: "/api/media/certifications/ncp-mci6" },
  { title: "ISC2 CC",                        image: "/api/media/certifications/cc-isc2" },
  { title: "Fortinet FCA",                   image: "/api/media/certifications/fortinet-fca" }
];

/* ── Types ─────────────────────────────────────── */
type CertItem       = typeof certifications[number];
type ProjectItem    = typeof projects[number];
type ExperienceItem = typeof experience[number];
type ModalData      =
  | { type: "cert";       data: CertItem }
  | { type: "project";    data: ProjectItem }
  | { type: "experience"; data: ExperienceItem };

/* ── Hero word-by-word reveal ───────────────────── */
function SplitWords({ text, startDelay = 0 }: { text: string; startDelay?: number }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span key={i} className="word-wrap" aria-hidden="true">
          <span className="word-inner" style={{ animationDelay: `${startDelay + i * 0.058}s` }}>
            {word}
          </span>
        </span>
      ))}
    </>
  );
}

/* ── Expand icon ─────────────────────────────────── */
function ExpandIcon() {
  return (
    <span className="expand-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
      </svg>
    </span>
  );
}

/* ── Close icon ──────────────────────────────────── */
function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6"  y2="18" />
      <line x1="6"  y1="6" x2="18" y2="18" />
    </svg>
  );
}

/* ── Intersection reveal ────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("is-visible"); }),
      { threshold: 0.1 }
    );
    root.querySelectorAll("[data-reveal]").forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ── Modal ───────────────────────────────────────── */
function Modal({ item, onClose }: { item: ModalData; onClose: () => void }) {
  const boxRef = useRef<HTMLDivElement>(null);

  /* Escape key — closes modal */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  /* Focus trap */
  useEffect(() => { boxRef.current?.focus(); }, []);

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.data.title}
    >
      <div
        ref={boxRef}
        className="modal-box"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <CloseIcon />
        </button>

        {item.type === "cert" && (
          <>
            <div className="modal-img-wrap">
              <img src={item.data.image} alt={item.data.title} className="modal-img" />
            </div>
            <div className="modal-body">
              <span className="proj-tag">Certification</span>
              <h3 className="modal-title">{item.data.title}</h3>
            </div>
          </>
        )}

        {item.type === "project" && (
          <>
            <div className="modal-browser">
              <div className="browser-bar">
                <span className="dot" /><span className="dot" /><span className="dot" />
                <span className="modal-browser-label">{item.data.title.toLowerCase().replace(/\s+/g, "-")}</span>
              </div>
              <div className="modal-img-wrap">
                <img src={item.data.image} alt={item.data.title} className="modal-img" />
              </div>
            </div>
            <div className="modal-body">
              <span className="proj-tag">{item.data.tag}</span>
              <h3 className="modal-title">{item.data.title}</h3>
              <p className="modal-desc">{item.data.summary}</p>
              <p className="modal-stack">{item.data.stack}</p>
            </div>
          </>
        )}

        {item.type === "experience" && (
          <div className="modal-body modal-exp-body">
            <p className="modal-exp-meta">
              {item.data.period}
              <span className="modal-exp-dot" aria-hidden="true">·</span>
              {item.data.location}
            </p>
            <h3 className="modal-title">{item.data.role}</h3>
            <p className="modal-exp-company">{item.data.company}</p>
            <ul className="modal-bullets" aria-label="Responsibilities">
              {item.data.bullets.map((bullet, i) => (
                <li key={i} className="modal-bullet">{bullet}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Page ────────────────────────────────────────── */
export default function Home() {
  const rootRef     = useReveal();
  const glowRef     = useRef<HTMLDivElement>(null);
  const heroHeadRef = useRef<HTMLDivElement>(null);

  const [activeSection,  setActiveSection]  = useState("top");
  const [isScrolled,     setIsScrolled]     = useState(false);
  const [showTop,        setShowTop]        = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [modal,          setModal]          = useState<ModalData | null>(null);
  const [mobileNavOpen,  setMobileNavOpen]  = useState(false);

  const openModal  = useCallback((data: ModalData) => setModal(data), []);
  const closeModal = useCallback(() => setModal(null), []);

  /* Lock body scroll when modal or mobile nav is open */
  useEffect(() => {
    document.body.style.overflow = (modal || mobileNavOpen) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modal, mobileNavOpen]);

  /* Mouse-tracking ambient glow — hidden until first mousemove */
  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      el.style.left    = `${e.clientX}px`;
      el.style.top     = `${e.clientY}px`;
      el.style.opacity = "1";
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  /* Close mobile nav on Escape */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMobileNavOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  /* Scroll: section tracker + progress bar + hero parallax */
  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const onScroll = () => {
      const y     = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setIsScrolled(y > 20);
      setShowTop(y > 500);
      setScrollProgress(total > 0 ? (y / total) * 100 : 0);

      /* Skip parallax on coarse pointers (touch) — iOS rubber-banding makes it jitter */
      if (heroHeadRef.current && window.matchMedia("(pointer: fine)").matches)
        heroHeadRef.current.style.transform = `translateY(${y * 0.16}px)`;

      const marker = window.innerHeight * 0.4;
      let current  = sections[0]?.id ?? "top";
      sections.forEach((s) => { if (s.getBoundingClientRect().top <= marker) current = s.id; });
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
      {/* ── BACKGROUND LAYERS ── */}
      <div className="bg-orb bg-orb-1" aria-hidden="true" />
      <div className="bg-orb bg-orb-2" aria-hidden="true" />
      <div className="grain"           aria-hidden="true" />
      <div ref={glowRef} className="mouse-glow" aria-hidden="true" />
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />

      {/* ── NAV ── */}
      <header className={`site-header ${isScrolled ? "site-header--scrolled" : ""}`}>
        <div className="shell flex items-center justify-between">
          <a href="#top" className="brand">Nattavee<span>.</span></a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
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

          {/* Mobile hamburger */}
          <button
            className={`hamburger md:hidden ${mobileNavOpen ? "hamburger--open" : ""}`}
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            aria-label={mobileNavOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileNavOpen}
            aria-controls="mobile-nav"
          >
            <span className="ham-line" />
            <span className="ham-line" />
            <span className="ham-line" />
          </button>
        </div>
      </header>

      {/* ── MOBILE NAV DRAWER ── */}
      {mobileNavOpen && (
        <div
          className="mobile-nav-overlay"
          onClick={() => setMobileNavOpen(false)}
          aria-hidden="true"
        >
          <nav
            id="mobile-nav"
            className="mobile-nav"
            onClick={(e) => e.stopPropagation()}
            aria-label="Mobile navigation"
          >
            <p className="mobile-nav-brand">Nattavee<span>.</span></p>

            <div className="mobile-nav-links">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  className={`mobile-nav-btn ${activeSection === item.id ? "mobile-nav-btn--active" : ""}`}
                  onClick={() => { scrollTo(item.id); setMobileNavOpen(false); }}
                >
                  {item.label}
                  <span className="mobile-nav-arrow">→</span>
                </button>
              ))}
            </div>

            <div className="mobile-nav-footer">
              <a href={SOCIAL_LINKS.email} className="mobile-nav-cta">
                Get in Touch
              </a>
              <div className="mobile-nav-socials">
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer"
                   className="social-btn" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer"
                   className="social-btn" aria-label="GitHub">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}

      <main>
        {/* ── HERO ── */}
        <section id="top" className="hero-section shell">
          <div
            ref={heroHeadRef}
            className="hero-head"
            aria-label="Hi I'm Nattavee, a Systems Engineer passionate about building reliable infrastructure and cloud-native platforms."
          >
            <p className="greeting">
              <span className="greeting-line">Hi I&apos;m Nattavee,</span>
            </p>
            <h1 className="statement" aria-hidden="true">
              <SplitWords
                text="a Systems Engineer passionate about building reliable infrastructure and cloud-native platforms."
                startDelay={0.45}
              />
            </h1>
          </div>

          <div className="about-grid">
            {/* LEFT */}
            <div className="left-panel">
              <div data-reveal className="profile-row">
                <img src="/api/media/profile" alt="Nattavee Narischat" className="avatar" />
                <div>
                  <p className="avatar-name">Moss Nattavee</p>
                  <p className="avatar-sub">Systems Engineer · Bangkok, Thailand</p>
                </div>
              </div>

              <div data-reveal style={{ transitionDelay: "0.08s" }}>
                <p className="block-label">Biography</p>
                <p className="bio-text">
                  Managing production infrastructure for 1+ years with Kubernetes, Nutanix, and VMware.
                  Excited about DevOps, GitOps, and cloud-native reliability.
                  Progression from network intern to systems engineer since Apr 2024.
                </p>
              </div>

              <div data-reveal style={{ transitionDelay: "0.16s" }}>
                <p className="block-label">What I Do</p>
                <div className="cap-list">
                  {capabilities.map((cap, i) => (
                    <div key={cap.title} className="cap-card" style={{ transitionDelay: `${0.2 + i * 0.07}s` }}>
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
              <div data-reveal style={{ transitionDelay: "0.06s" }}>
                <p className="block-label">Let&apos;s Connect</p>
                <div className="social-row">
                  <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer"
                     className="social-btn" aria-label="LinkedIn">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                  <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer"
                     className="social-btn" aria-label="GitHub">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </a>
                  <a href={SOCIAL_LINKS.email} className="social-btn" aria-label="Email">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
                         strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </a>
                </div>
              </div>

              <div data-reveal style={{ transitionDelay: "0.14s" }}>
                <div className="stats-block">
                  {impactHighlights.map((item, i) => (
                    <div key={item.title} className="stat-card" style={{ transitionDelay: `${0.18 + i * 0.06}s` }}>
                      <p className="stat-val">{item.title}</p>
                      <p className="stat-sub">{item.subtitle}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div data-reveal style={{ transitionDelay: "0.22s" }} className="skills-block">
                {skillGroups.map((group, i) => (
                  <div key={group.label} style={{ transitionDelay: `${0.26 + i * 0.07}s` }}>
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

        {/* ── PROJECTS ── */}
        <section id="work" className="section shell">
          <h2 data-reveal className="section-h">Featured Projects</h2>
          <div className="project-list">
            {projects.map((project, i) => (
              <article
                key={project.title}
                data-reveal
                className="project-row project-row--clickable"
                style={{ transitionDelay: `${i * 0.12}s` }}
                onClick={() => openModal({ type: "project", data: project })}
                role="button"
                tabIndex={0}
                aria-label={`View details for ${project.title}`}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") openModal({ type: "project", data: project }); }}
              >
                <div className="project-preview">
                  <div className="browser-bar">
                    <span className="dot" /><span className="dot" /><span className="dot" />
                  </div>
                  <img src={project.image} alt={project.title} className="project-img" />
                </div>
                <div className="project-meta">
                  <span className="proj-tag">{project.tag}</span>
                  <h3 className="proj-title">{project.title}</h3>
                  <p className="proj-desc">{project.summary}</p>
                  <p className="proj-stack">{project.stack}</p>
                  <p className="view-hint">Click to view details ↗</p>
                </div>
                <ExpandIcon />
              </article>
            ))}
          </div>
        </section>

        {/* ── CERTIFICATIONS ── */}
        <section className="section shell">
          <h2 data-reveal className="section-h">Certifications</h2>
          <div className="certs-grid">
            {certifications.map((cert, i) => (
              <article
                key={cert.title}
                data-reveal
                className="cert-card"
                style={{ transitionDelay: `${i * 0.09}s` }}
                onClick={() => openModal({ type: "cert", data: cert })}
                role="button"
                tabIndex={0}
                aria-label={`View ${cert.title} certification`}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") openModal({ type: "cert", data: cert }); }}
              >
                <div className="cert-img-wrap">
                  <img src={cert.image} alt={cert.title} className="cert-img" />
                  <ExpandIcon />
                </div>
                <p className="cert-name">{cert.title}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── EXPERIENCE ── */}
        <section id="experience" className="section shell">
          <h2 data-reveal className="section-h">Experience</h2>
          <div className="exp-list">
            {experience.map((item, i) => (
              <article
                key={item.role}
                data-reveal
                className="exp-card exp-card--clickable"
                style={{ transitionDelay: `${i * 0.1}s` }}
                onClick={() => openModal({ type: "experience", data: item })}
                role="button"
                tabIndex={0}
                aria-label={`View details for ${item.role}`}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") openModal({ type: "experience", data: item }); }}
              >
                <div className="exp-card-header">
                  <div>
                    <p className="exp-period">{item.period} · {item.location}</p>
                    <h3 className="exp-role">{item.role}</h3>
                    <p className="exp-company">{item.company}</p>
                  </div>
                  <ExpandIcon />
                </div>
                <p className="exp-detail">{item.detail}</p>
                <p className="exp-view-hint">View full details →</p>
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
              <a href={SOCIAL_LINKS.email}    className="btn-primary">Email Me</a>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="btn-outline">LinkedIn</a>
              <a href={SOCIAL_LINKS.github}   target="_blank" rel="noopener noreferrer" className="btn-outline">GitHub</a>
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

      {/* ── MODAL ── */}
      {modal && <Modal item={modal} onClose={closeModal} />}
    </div>
  );
}
