"use client";

import { useEffect, useRef, useState } from "react";

// Contact Information
const CONTACT_EMAIL = "nattavee123vee@gmail.com";
const SOCIAL_LINKS = {
  linkedin: "https://linkedin.com/in/mossnattavee",
  portfolio: "https://portfolio.nattavee.com",
};

const navItems = [
  { id: "top", label: "Overview" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" }
];

// Calculated from 04/2024 (Intern) to Present
const stats = [
  { label: "Experience", value: "1+ Years", detail: "System Engineer & DevOps" },
  { label: "Certifications", value: "5+", detail: "Nutanix, Kubernetes, Security" },
  { label: "Focus", value: "Infra", detail: "Virtualization & Cloud Native" }
];

// Derived from Systems Engineer responsibilities
const valueCards = [
  {
    title: "Infrastructure Stability",
    detail: "Manage high-availability Nutanix and VMware clusters for mission-critical workloads."
  },
  {
    title: "Cloud-Native Delivery",
    detail: "Implement Kubernetes platforms and GitOps workflows for scalable application deployment."
  },
  {
    title: "Observability",
    detail: "Develop monitoring pipelines (Prometheus/Grafana) to reduce MTTR and ensure system health."
  }
];

// Exact technical skills from resume
const skills = [
  "Kubernetes",
  "Nutanix (NKP)",
  "VMware (ESXi/vCenter)",
  "Docker",
  "Argo CD",
  "GitHub Actions",
  "Helm",
  "Prometheus / Grafana",
  "Zabbix",
  "OpenSearch",
  "Linux / Ubuntu",
  "Ansible / Kubespray",
  "FortiGate Firewall",
  "Cisco Switching",
  "Cloudflare",
  "Python / Bash"
];

// Mapped from Projects and Freelance work
const projects = [
  {
    title: "Freelance E-learning Platform",
    description:
      "Designed a K3s-based cluster with Harbor registry, Argo CD GitOps workflows, and GitHub Actions pipelines for a modern learning platform."
  },
  {
    title: "Network Monitoring Capstone",
    description:
      "Implemented a centralized monitoring system using Zabbix, Prometheus, Grafana, and OpenSearch for comprehensive network alerting."
  },
  {
    title: "Personal Homelab Infrastructure",
    description:
      "Operates a self-hosted Proxmox cluster with network segmentation (FortiGate) and a personal Kubernetes portfolio site."
  },
  {
    title: "Lab Network Infrastructure",
    description:
      "Designed network infrastructure for university labs, including FortiGate firewalls, Cisco switches, and virtualization environments."
  }
];

// Career Timeline
const experience = [
  {
    role: "Systems Engineer",
    company: "Zenith Comp Co., Ltd.",
    period: "04/2025 – Present",
    detail: "Manage Nutanix/VMware clusters, implement Kubernetes platforms, and improve configuration management for system stability."
  },
  {
    role: "Freelance DevOps",
    company: "E-learning Platform",
    period: "07/2025 – 09/2025",
    detail: "Implemented K3s clusters, private registries (Harbor), and CI/CD pipelines using GitHub Actions and Argo CD."
  },
  {
    role: "IT Support & TA",
    company: "KMUTNB",
    period: "07/2024 – 04/2025",
    detail: "Maintained lab systems, deployed engineering software (ANSYS, CATIA), and designed network infrastructure for student labs."
  },
  {
    role: "Network Engineer Intern",
    company: "AUSTON ICT Solution",
    period: "04/2024 – 06/2024",
    detail: "Executed firewall migrations (FortiGate), configured Cisco infrastructure, and optimized security policies."
  }
];

const certifications = [
  "Kubernetes and Cloud Native Associate (KCNA)",
  "Nutanix Certified Professional - Cloud Native 6",
  "Nutanix Certified Professional - Multicloud Infrastructure 6",
  "Certified in Cybersecurity (CC) - ISC2",
  "Fortinet Certified Associate in Cybersecurity"
];

// Grouped Skills
const toolchain = [
  "Kubernetes & Docker",
  "Nutanix & VMware",
  "GitOps (Argo CD)",
  "CI/CD (GitHub Actions)",
  "Observability (Grafana)",
  "Network Security",
  "Cloudflare",
  "Infrastructure as Code"
];

const education = {
  degree: "Bachelor of Engineering in Computer Engineering",
  school: "King Mongkut's University of Technology North Bangkok",
  gpa: "GPA: 3.26",
  year: "Graduated: 04/2025"
};

// ------------------------------------
// Custom hook: IntersectionObserver
// Adds "visible" class when element enters viewport
// ------------------------------------
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 }
    );

    // Observe the element itself and all children with reveal classes
    const targets = [el, ...Array.from(el.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale"))];
    targets.forEach((t) => observer.observe(t));

    return () => observer.disconnect();
  }, []);

  return ref;
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("top");
  const [showTop, setShowTop] = useState(false);

  // Section refs for reveal animations
  const heroRef = useReveal();
  const aboutRef = useReveal();
  const skillsRef = useReveal();
  const projectsRef = useReveal();
  const experienceRef = useReveal();
  const contactRef = useReveal();

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

    if (sections.length === 0) return;

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const mid = window.innerHeight * 0.45;
        // Use last-match: the lowest section whose top is at/above midpoint
        // This correctly highlights deeply nested sections like "experience"
        let current: HTMLElement | null = null;
        for (const section of sections) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= mid) current = section;
        }
        if (current) setActiveSection(current.id);
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
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 bg-grid-fade grid-overlay opacity-30" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[6%] top-[20%] h-40 w-40 rounded-full border border-ink-400/40 bg-ink-500/10 blur-[1px]" />
        <div className="absolute right-[8%] top-[12%] h-64 w-64 rounded-full border border-sky-300/30 bg-sky-400/10 blur-[2px]" />
        <div className="scanline absolute left-0 top-0 h-[35%] w-full opacity-50" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/15 bg-[#0f2854]/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-3 text-sm font-semibold tracking-[0.2em] text-slate-200">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-lg text-ink-200">
              NN
            </span>
            <span className="hidden sm:inline">SYSTEMS ENGINEER</span>
          </a>
          <nav className="hidden items-center gap-6 text-xs uppercase tracking-[0.25em] text-slate-400 md:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`transition-colors hover:text-white ${activeSection === item.id ? "text-white" : "text-slate-400"
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

        {/* ── HERO SECTION ── */}
        <section id="top" className="pb-20 pt-20 sm:pt-28">
          <div ref={heroRef} className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              {/* Avatar + title */}
              <div className="reveal flex items-center gap-5">
                <div className="relative h-20 w-20 rounded-3xl bg-gradient-to-br from-ink-200 via-ink-300 to-ink-400 p-[2px]">
                  <div className="flex h-full w-full items-center justify-center rounded-3xl bg-[#0f2854] text-2xl font-semibold text-white">
                    NN
                  </div>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-ink-200">Systems Engineer · DevOps</p>
                  <p className="mt-1 text-sm text-slate-200/80">Bangkok, Thailand · Open for collaborations</p>
                </div>
              </div>

              {/* Headline */}
              <h1 className="reveal delay-100 mt-8 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                Hi, I&apos;m <span className="text-ink-200">Nattavee Narischat</span>. I build resilient infrastructure for modern applications.
              </h1>

              {/* Sub-headline */}
              <p className="reveal delay-200 mt-6 max-w-xl text-lg text-slate-100/85">
                Systems Engineer specializing in Nutanix, VMware, and Kubernetes. I bridge the gap between traditional infrastructure and cloud-native platforms with a focus on stability and automation.
              </p>

              {/* CTAs */}
              <div className="reveal delay-300 mt-8 flex flex-wrap gap-4">
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

              {/* Stats */}
              <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3">
                {stats.map((item, i) => (
                  <div
                    key={item.label}
                    className={`reveal delay-${(i + 3) * 100} rounded-2xl border border-white/15 bg-white/10 p-4`}
                  >
                    <p className="text-xs uppercase tracking-[0.2em] text-ink-100">{item.label}</p>
                    <p className="mt-3 text-2xl font-semibold text-white">{item.value}</p>
                    <p className="mt-2 text-xs text-ink-100/80">{item.detail}</p>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div className="reveal delay-500 mt-8 flex flex-wrap gap-4 text-xs uppercase tracking-[0.3em] text-ink-100">
                <a
                  href={SOCIAL_LINKS.portfolio}
                  target="_blank"
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-white/90 transition hover:border-white/50 hover:bg-white/20"
                >
                  Portfolio
                </a>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-white/90 transition hover:border-white/50 hover:bg-white/20"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Value cards — lg:pt-28 aligns the box top with the h1 name */}
            <div className="reveal-right space-y-6 lg:pt-28">
              <div className="rounded-3xl border border-white/15 bg-white/10 p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-ink-100">Value I Bring</p>
                <div className="mt-6 grid gap-4">
                  {valueCards.map((item, i) => (
                    <div
                      key={item.title}
                      className={`reveal delay-${(i + 2) * 100} rounded-2xl border border-white/10 bg-[#0f2854]/70 p-4`}
                    >
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                      <p className="mt-2 text-sm text-slate-100/85">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
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

        {/* ── ABOUT SECTION ── */}
        <section id="about" className="py-20">
          <div ref={aboutRef} className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            {/* Profile card — slides in from left */}
            <div className="reveal-left rounded-3xl border border-white/15 bg-white/10 p-8">
              <div className="flex items-center gap-6">
                <div className="float-slow relative h-28 w-28 rounded-3xl bg-gradient-to-br from-ink-200 via-ink-300 to-ink-400 p-[2px]">
                  <div className="flex h-full w-full items-center justify-center rounded-3xl bg-[#0f2854] text-4xl font-semibold text-white">
                    NN
                  </div>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-ink-100">Systems Engineer</p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">Nattavee Narischat</h3>
                  <p className="mt-1 text-sm text-slate-100/85">Cloud-Native · Infrastructure · Security</p>
                </div>
              </div>
              <div className="mt-6 space-y-4 text-sm text-slate-100/85">
                <p>
                  I help organizations maintain robust IT infrastructure while navigating the transition to containerized environments.
                </p>
                <p>
                  My expertise lies in managing lifecycle management for Nutanix and VMware clusters, while simultaneously architecting Kubernetes solutions for cloud-native workloads.
                </p>
              </div>
              <div className="mt-6 grid gap-4 text-xs uppercase tracking-[0.2em] text-ink-100 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                  <p className="text-white">Education</p>
                  <p className="mt-2 capitalize">{education.school}</p>
                  <p className="mt-1 text-slate-400">{education.degree}</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                  <p className="text-white">Focus</p>
                  <p className="mt-2">Platform Engineering</p>
                </div>
              </div>
            </div>

            {/* About text — slides in from right */}
            <div className="reveal-right">
              <p className="text-xs uppercase tracking-[0.4em] text-ink-200">About</p>
              <h2 className="mt-6 text-3xl font-semibold text-white sm:text-4xl">
                Turning complex requirements into stable, observable systems.
              </h2>
              <p className="reveal delay-100 mt-6 text-lg text-slate-100/85">
                My work centers on two pillars: Reliability and Modernization. I maintain traditional virtualization platforms that businesses rely on, while building the GitOps and Kubernetes foundations for the future.
              </p>
              <p className="reveal delay-200 mt-4 text-lg text-slate-100/85">
                From configuring FortiGate firewalls to deploying Argo CD pipelines, I ensure infrastructure is not just operational, but secure and efficient.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="reveal delay-300 rounded-3xl border border-white/15 bg-white/10 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-ink-100">Now</p>
                  <p className="mt-3 text-sm text-slate-100/85">Systems Engineer at Zenith Comp Co., Ltd.</p>
                </div>
                <div className="reveal delay-400 rounded-3xl border border-white/15 bg-white/10 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-ink-100">Previously</p>
                  <p className="mt-3 text-sm text-slate-100/85">Network Engineer Intern & IT Support roles.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SKILLS SECTION ── */}
        <section id="skills" className="py-20">
          <div ref={skillsRef}>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="reveal">
                <p className="text-xs uppercase tracking-[0.4em] text-ink-200">Skills</p>
                <h2 className="mt-6 text-3xl font-semibold text-white sm:text-4xl">
                  Technical Expertise & Toolchain
                </h2>
              </div>
              <p className="reveal delay-100 max-w-xl text-sm text-slate-300">
                A comprehensive toolkit covering Cloud-Native Platforms, Virtualization, CI/CD, and Observability solutions.
              </p>
            </div>

            {/* Skill pills with staggered reveal */}
            <div className="mt-10 flex flex-wrap gap-3">
              {skills.map((skill, i) => (
                <span
                  key={skill}
                  className="reveal rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-slate-100/85"
                  style={{ transitionDelay: `${Math.min(i * 40, 600)}ms` }}
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Toolchain cards */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {toolchain.map((tool, i) => (
                <div
                  key={tool}
                  className="reveal rounded-2xl border border-white/15 bg-white/10 p-4"
                  style={{ transitionDelay: `${200 + i * 60}ms` }}
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-ink-100">Focus Area</p>
                  <p className="mt-2 text-sm text-white">{tool}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROJECTS SECTION ── */}
        <section id="projects" className="py-20">
          <div ref={projectsRef}>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="reveal">
                <p className="text-xs uppercase tracking-[0.4em] text-ink-200">Projects</p>
                <h2 className="mt-6 text-3xl font-semibold text-white sm:text-4xl">Featured Implementations</h2>
              </div>
              <p className="reveal delay-100 max-w-xl text-sm text-slate-300">
                Real-world application of infrastructure code, networking, and security principles.
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              {/* Featured Project */}
              <div className="reveal-left rounded-3xl border border-white/15 bg-gradient-to-br from-ink-400/30 via-[#0f2854]/80 to-[#0f2854] p-8">
                <p className="text-xs uppercase tracking-[0.3em] text-ink-200">Featured Project</p>
                <h3 className="mt-4 text-2xl font-semibold text-white">E-learning Platform Infrastructure</h3>
                <p className="mt-4 text-sm text-slate-100/85">
                  Designed and implemented a complete private cloud solution using K3s. Deployed Harbor for container registry management and established GitOps workflows via Argo CD to streamline application delivery.
                </p>
                <div className="mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-[0.2em] text-slate-300">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">K3s Kubernetes</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Argo CD</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Harbor</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">GitHub Actions</span>
                </div>
              </div>

              {/* Side projects */}
              <div className="grid gap-6">
                <div className="reveal-right rounded-3xl border border-white/15 bg-white/10 p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-ink-100">Homelab Thailand</p>
                  <div className="mt-4 space-y-3 text-sm text-slate-100/85">
                    <p>Co-Founder of a technical community.</p>
                    <p>Focused on self-hosting, networking, and infrastructure.</p>
                    <p>Personal Proxmox & FortiGate environment.</p>
                  </div>
                </div>
                <div className="reveal-right delay-150 rounded-3xl border border-white/15 bg-white/10 p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-ink-100">Capstone</p>
                  <div className="mt-4 space-y-3 text-sm text-slate-100/85">
                    <p>Centralized network monitoring system.</p>
                    <p>Tech: Zabbix, Prometheus, Grafana, OpenSearch.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Project grid */}
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {projects.map((project, i) => (
                <div
                  key={project.title}
                  className="reveal rounded-3xl border border-white/15 bg-white/10 p-6 transition hover:border-white/30 hover:bg-white/15"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                  <p className="mt-3 text-sm text-slate-100/85">{project.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── EXPERIENCE SECTION ── */}
        <section id="experience" className="py-20">
          <div ref={experienceRef} className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="reveal text-xs uppercase tracking-[0.4em] text-ink-200">Experience</p>
              <h3 className="reveal delay-100 mt-4 text-2xl font-semibold text-white">Professional Timeline.</h3>
              <div className="mt-6 space-y-4">
                {experience.map((item, i) => (
                  <div
                    key={item.role}
                    className="reveal rounded-3xl border border-white/15 bg-white/10 p-5"
                    style={{ transitionDelay: `${150 + i * 100}ms` }}
                  >
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

            {/* Certifications */}
            <div>
              <p className="reveal text-xs uppercase tracking-[0.4em] text-ink-200">Certifications</p>
              <h3 className="reveal delay-100 mt-4 text-2xl font-semibold text-white">Credentials.</h3>
              <div className="mt-6 grid gap-4">
                {certifications.map((cert, i) => (
                  <div
                    key={cert}
                    className="reveal rounded-2xl border border-white/15 bg-white/10 p-4 text-sm text-slate-100/85"
                    style={{ transitionDelay: `${150 + i * 80}ms` }}
                  >
                    {cert}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTACT SECTION ── */}
        <section id="contact" className="py-20">
          <div ref={contactRef}>
            <div className="reveal-scale rounded-3xl border border-white/15 bg-white/10 p-10 text-center">
              <p className="text-xs uppercase tracking-[0.4em] text-ink-200">Contact</p>
              <h2 className="reveal delay-100 mt-6 text-3xl font-semibold text-white sm:text-4xl">
                Let&apos;s discuss your infrastructure goals.
              </h2>
              <p className="reveal delay-200 mt-4 text-lg text-slate-100/85">
                Available for Systems Engineering and DevOps opportunities.
              </p>
              <div className="reveal delay-300 mt-8 flex flex-wrap items-center justify-center gap-4">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="rounded-full bg-ink-400 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-900 shadow-glow transition hover:bg-ink-200"
                >
                  {CONTACT_EMAIL}
                </a>
                <button
                  onClick={() => scrollToSection("top")}
                  className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:border-white/60 hover:bg-white/15"
                >
                  Back To Top
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/15 py-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 text-xs uppercase tracking-[0.3em] text-ink-100">
          <span>© 2026 Nattavee Narischat</span>
          <span>Built with Next.js + Tailwind CSS</span>
        </div>
      </footer>

      {/* Side Navigation */}
      <aside className="hidden lg:flex fixed top-1/2 right-6 -translate-y-1/2 flex-col gap-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className="group flex items-center gap-3"
            aria-label={`Go to ${item.label}`}
          >
            <span
              className={`h-3 w-3 rounded-full border transition ${activeSection === item.id
                ? "border-ink-300 bg-ink-400"
                : "border-white/30 bg-transparent"
                }`}
            />
            <span
              className={`text-[10px] uppercase tracking-[0.3em] transition ${activeSection === item.id ? "text-ink-200" : "text-slate-500"
                }`}
            >
              {item.label}
            </span>
          </button>
        ))}
      </aside>

      <button
        onClick={() => scrollToSection("top")}
        className={`fixed bottom-6 right-6 z-50 rounded-full border border-white/30 bg-[#0f2854]/85 px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow-soft transition hover:border-white/60 hover:bg-[#1c4d8d]/80 lg:bottom-10 lg:right-10 ${showTop ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        aria-label="Scroll to top"
      >
        Top
      </button>
    </div >
  );
}