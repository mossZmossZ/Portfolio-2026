"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CONTACT_EMAIL = "nattavee.n@nattavee.com";
const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/mossnattavee/",
  github:   "https://github.com/mossZmossZ",
  email:    `mailto:${CONTACT_EMAIL}`
};

const impactHighlights = [
  { title: "1+ yrs",   subtitle: "Production Infrastructure" },
  { title: "6",        subtitle: "Certifications — K8s, Nutanix, Security" },
  { title: "Apr '24",  subtitle: "Career Started" }
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
  { label: "Platform",                items: ["Kubernetes", "Nutanix", "VMware", "Docker", "Helm"] },
  { label: "Delivery",                items: ["Argo CD", "GitHub Actions", "Ansible", "Python", "Bash"] },
  { label: "Observability & Network", items: ["Prometheus", "Grafana", "OpenSearch", "FortiGate", "Cisco", "Cloudflare"] }
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
  { title: "CKAD",                            image: "/api/media/certifications/ckad" },
  { title: "KCNA",                            image: "/api/media/certifications/kcna" },
  { title: "NCP Cloud Native 6",              image: "/api/media/certifications/ncp-cn6" },
  { title: "NCP Multicloud Infrastructure 6", image: "/api/media/certifications/ncp-mci6" },
  { title: "ISC2 CC",                         image: "/api/media/certifications/cc-isc2" },
  { title: "Fortinet FCA",                    image: "/api/media/certifications/fortinet-fca" }
];

/* ── Types ─────────────────────────────────────── */
type CertItem       = typeof certifications[number];
type ProjectItem    = typeof projects[number];
type ExperienceItem = typeof experience[number];
type ModalData      =
  | { type: "cert";       data: CertItem }
  | { type: "project";    data: ProjectItem }
  | { type: "experience"; data: ExperienceItem };

type Topic = "projects" | "experience" | "certifications" | "contact";
type Kind  = "intro" | Topic | "fallback";
type Turn =
  | { id: string; role: "user"; text: string }
  | { id: string; role: "assistant"; kind: Kind };

const topicChips: { id: Topic; label: string; question: string }[] = [
  { id: "projects",       label: "Show me your projects",        question: "Show me your projects" },
  { id: "experience",     label: "What's your work experience?", question: "What's your work experience?" },
  { id: "certifications", label: "Any certifications?",          question: "Any certifications?" },
  { id: "contact",        label: "How can I reach you?",         question: "How can I reach you?" }
];

const leadText: Record<Kind, string> = {
  intro: "Hi, I'm Moss Nattavee — a Systems Engineer based in Bangkok, Thailand. I've spent 1+ years managing production infrastructure with Kubernetes, Nutanix, and VMware, and I'm especially into DevOps, GitOps, and cloud-native reliability. I started as a network intern in April 2024 and have been climbing the infrastructure stack ever since.",
  projects: "Here are a few things I've shipped recently:",
  experience: "Here's where I've worked and what I did along the way:",
  certifications: "I've picked up a few certifications along the way:",
  contact: "I'm open to platform, DevOps, and infrastructure engineering opportunities — here's how to reach me:",
  fallback: "I don't have a runbook for that one yet — but these commands always exit 0:"
};

const commandFor: Record<Kind, { cmd: string; result: string }> = {
  intro:          { cmd: "whoami --verbose",                 result: "identity resolved" },
  projects:       { cmd: "kubectl get projects -o wide",     result: "3 resources found" },
  experience:     { cmd: "journalctl -u career --since 2024", result: "5 entries" },
  certifications: { cmd: "ls ~/certs | verify --issuer all", result: "6/6 verified" },
  contact:        { cmd: "ping moss --channels all",         result: "3 channels open" },
  fallback:       { cmd: "grep -ri \"$QUERY\" ./runbooks",   result: "no exact match" }
};

function matchTopic(query: string): Topic | "intro" | null {
  const s = query.toLowerCase();
  if (/cert|ckad|kcna|isc2|fortinet|exam|badge/.test(s)) return "certifications";
  if (/project|built|build|ship|homelab|monitor|gitops|deploy/.test(s)) return "projects";
  if (/experience|work|job|career|company|role|history|resume|cv/.test(s)) return "experience";
  if (/contact|email|reach|hire|hiring|linkedin|github|connect|talk/.test(s)) return "contact";
  if (/\b(who|about|yourself|intro|skills?|stack|moss|nattavee)\b/.test(s)) return "intro";
  return null;
}

function projectPath(project: ProjectItem) {
  return `~/projects/${project.image.split("/").pop()}`;
}

/* ── Icons ───────────────────────────────────────── */
function ExpandIcon() {
  return (
    <span className="expand-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
      </svg>
    </span>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6"  y2="18" />
      <line x1="6"  y1="6" x2="18" y2="18" />
    </svg>
  );
}

/* ── Modal ───────────────────────────────────────── */
function Modal({ item, onClose }: { item: ModalData; onClose: () => void }) {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => { boxRef.current?.focus(); }, []);

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.type === "experience" ? item.data.role : item.data.title}
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
            <div className="modal-path-bar" aria-hidden="true">~/certs/{item.data.title.toLowerCase().replace(/\s+/g, "-")}</div>
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
            <div className="modal-path-bar" aria-hidden="true">{projectPath(item.data)}</div>
            <div className="modal-img-wrap">
              <img src={item.data.image} alt={item.data.title} className="modal-img" />
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

/* ── Tool call: the assistant "runs" a command ───── */
function ToolCall({ cmd, result, onDone }: { cmd: string; result: string; onDone: () => void }) {
  const [typed, setTyped] = useState("");
  const [state, setState] = useState<"typing" | "running" | "done">("typing");

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setTyped(cmd);
      setState("done");
      onDone();
      return;
    }
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const id = setInterval(() => {
      i += 1;
      setTyped(cmd.slice(0, i));
      if (i >= cmd.length) {
        clearInterval(id);
        setState("running");
        timer = setTimeout(() => { setState("done"); onDone(); }, 750);
      }
    }, 22);
    return () => { clearInterval(id); clearTimeout(timer); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="tool-call" data-state={state}>
      <span className="tool-prompt" aria-hidden="true">$</span>
      <code className="tool-cmd">{typed}</code>
      {state === "running" && <span className="tool-spinner" role="status" aria-label="Running" />}
      {state === "done" && <span className="tool-result">✓ {result}</span>}
    </div>
  );
}

/* ── Streaming text ──────────────────────────────── */
function StreamText({ text, onDone }: { text: string; onDone: () => void }) {
  const [output, setOutput] = useState("");
  const [streaming, setStreaming] = useState(true);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setOutput(text);
      setStreaming(false);
      onDone();
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 2;
      setOutput(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        setStreaming(false);
        onDone();
      }
    }, 16);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {output}
      {streaming && <span className="stream-cursor" aria-hidden="true" />}
    </>
  );
}

/* ── Intro reply content ─────────────────────────── */
function IntroExtra() {
  return (
    <div className="msg-extra">
      <div className="stats-block">
        {impactHighlights.map((item) => (
          <div key={item.subtitle} className="stat-card">
            <p className="stat-val">{item.title}</p>
            <p className="stat-sub">{item.subtitle}</p>
          </div>
        ))}
      </div>

      <div>
        <p className="block-label">What I Do</p>
        <div className="cap-list">
          {capabilities.map((cap) => (
            <div key={cap.title} className="cap-card">
              <div className="cap-icon">{cap.icon}</div>
              <div className="cap-body">
                <p className="cap-title">{cap.title}</p>
                <p className="cap-desc">{cap.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="skills-block">
        {skillGroups.map((group) => (
          <div key={group.label}>
            <p className="group-label">{group.label}</p>
            <div className="chip-row">
              {group.items.map((item) => <span key={item} className="chip">{item}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Projects reply content ──────────────────────── */
function ProjectsExtra({ onOpen }: { onOpen: (data: ModalData) => void }) {
  return (
    <div className="msg-extra">
      <div className="project-list">
        {projects.map((project) => (
          <article
            key={project.title}
            className="project-row"
            onClick={() => onOpen({ type: "project", data: project })}
            role="button"
            tabIndex={0}
            aria-label={`View details for ${project.title}`}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onOpen({ type: "project", data: project }); }}
          >
            <div className="project-preview">
              <div className="path-bar">
                <span className="path-text">{projectPath(project)}</span>
                <span className="proj-tag">{project.tag}</span>
              </div>
              <img src={project.image} alt={project.title} className="project-img" width={640} height={170} />
            </div>
            <div className="project-meta">
              <h3 className="proj-title">{project.title}</h3>
              <p className="proj-desc">{project.summary}</p>
              <p className="proj-stack">{project.stack}</p>
              <p className="view-hint">Open details ↗</p>
            </div>
            <ExpandIcon />
          </article>
        ))}
      </div>
    </div>
  );
}

/* ── Experience reply content ────────────────────── */
function ExperienceExtra({ onOpen }: { onOpen: (data: ModalData) => void }) {
  return (
    <div className="msg-extra">
      <div className="exp-list">
        {experience.map((item) => (
          <article
            key={item.role}
            className="exp-card"
            onClick={() => onOpen({ type: "experience", data: item })}
            role="button"
            tabIndex={0}
            aria-label={`View details for ${item.role}`}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onOpen({ type: "experience", data: item }); }}
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
            <p className="exp-view-hint">Open full log →</p>
          </article>
        ))}
      </div>
    </div>
  );
}

/* ── Certifications reply content ────────────────── */
function CertificationsExtra({ onOpen }: { onOpen: (data: ModalData) => void }) {
  return (
    <div className="msg-extra">
      <div className="certs-grid">
        {certifications.map((cert) => (
          <article
            key={cert.title}
            className="cert-card"
            onClick={() => onOpen({ type: "cert", data: cert })}
            role="button"
            tabIndex={0}
            aria-label={`View ${cert.title} certification`}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onOpen({ type: "cert", data: cert }); }}
          >
            <div className="cert-img-wrap">
              <img src={cert.image} alt={cert.title} className="cert-img" width={200} height={100} />
              <ExpandIcon />
            </div>
            <p className="cert-name">{cert.title}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

/* ── Contact reply content ───────────────────────── */
function ContactExtra() {
  return (
    <div className="msg-extra">
      <div className="contact-actions">
        <a href={SOCIAL_LINKS.email} className="btn-primary">Email me</a>
        <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="btn-outline">LinkedIn</a>
        <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="btn-outline">GitHub</a>
      </div>
    </div>
  );
}

/* ── Fallback reply content ──────────────────────── */
function FallbackExtra({ onAsk }: { onAsk: (topic: Topic) => void }) {
  return (
    <div className="msg-extra">
      <div className="fallback-chips">
        {topicChips.map((chip) => (
          <button key={chip.id} type="button" className="prompt-chip" onClick={() => onAsk(chip.id)}>
            <span className="chip-caret" aria-hidden="true">❯</span> {chip.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── User message bubble ─────────────────────────── */
function UserMessage({ text }: { text: string }) {
  return (
    <div className="msg-row msg-row--user">
      <div className="msg-bubble msg-bubble--user">{text}</div>
    </div>
  );
}

/* ── Assistant message ───────────────────────────── */
function AssistantMessage({
  turn,
  onDone,
  onOpenModal,
  onAsk
}: {
  turn: Extract<Turn, { role: "assistant" }>;
  onDone: (id: string) => void;
  onOpenModal: (data: ModalData) => void;
  onAsk: (topic: Topic) => void;
}) {
  const [phase, setPhase] = useState<"tool" | "stream" | "done">("tool");
  const command = commandFor[turn.kind];

  return (
    <div className="msg-row msg-row--assistant">
      <img src="/api/media/profile" alt="Nattavee Narischat" width={36} height={36} className="msg-avatar" />
      <div className="msg-col">
        <p className="msg-meta">moss · bangkok</p>
        <div className="msg-bubble msg-bubble--assistant">
          <ToolCall
            cmd={command.cmd}
            result={command.result}
            onDone={() => setPhase((p) => (p === "tool" ? "stream" : p))}
          />
          {phase !== "tool" && (
            <p className="msg-text">
              <StreamText text={leadText[turn.kind]} onDone={() => { setPhase("done"); onDone(turn.id); }} />
            </p>
          )}
          {phase === "done" && turn.kind === "intro" && <IntroExtra />}
          {phase === "done" && turn.kind === "projects" && <ProjectsExtra onOpen={onOpenModal} />}
          {phase === "done" && turn.kind === "experience" && <ExperienceExtra onOpen={onOpenModal} />}
          {phase === "done" && turn.kind === "certifications" && <CertificationsExtra onOpen={onOpenModal} />}
          {phase === "done" && turn.kind === "contact" && <ContactExtra />}
          {phase === "done" && turn.kind === "fallback" && <FallbackExtra onAsk={onAsk} />}
        </div>
      </div>
    </div>
  );
}

/* ── Live Bangkok clock ──────────────────────────── */
function StatusClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Bangkok",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="status-cluster">
      <span className="status-dot" aria-hidden="true" />
      <span className="status-label">online</span>
      {time && <span className="status-time">BKK {time}</span>}
    </span>
  );
}

/* ── Page ────────────────────────────────────────── */
export default function Home() {
  const [turns, setTurns] = useState<Turn[]>([
    { id: "u-intro", role: "user", text: "Who is Nattavee?" },
    { id: "a-intro", role: "assistant", kind: "intro" }
  ]);
  const [askedTopics, setAskedTopics] = useState<Topic[]>([]);
  const [activeStream, setActiveStream] = useState<string | null>("a-intro");
  const [modal, setModal] = useState<ModalData | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [draft, setDraft] = useState("");

  const threadEndRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  const turnCounter = useRef(0);

  const openModal  = useCallback((data: ModalData) => setModal(data), []);
  const closeModal = useCallback(() => setModal(null), []);

  useEffect(() => {
    document.body.style.overflow = modal ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modal]);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setShowTop(window.scrollY > 500);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    threadEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [turns.length]);

  const handleStreamDone = useCallback((turnId: string) => {
    setActiveStream((cur) => (cur === turnId ? null : cur));
  }, []);

  const pushTurns = (question: string, kind: Kind) => {
    const n = turnCounter.current++;
    const aid = `a-${kind}-${n}`;
    setTurns((prev) => [
      ...prev,
      { id: `u-${kind}-${n}`, role: "user", text: question },
      { id: aid, role: "assistant", kind }
    ]);
    setActiveStream(aid);
  };

  const askTopic = (topic: Topic) => {
    if (activeStream) return;
    const chip = topicChips.find((c) => c.id === topic)!;
    pushTurns(chip.question, topic);
    setAskedTopics((prev) => (prev.includes(topic) ? prev : [...prev, topic]));
  };

  const submitDraft = (e: React.FormEvent) => {
    e.preventDefault();
    const question = draft.trim();
    if (!question || activeStream) return;
    setDraft("");
    const matched = matchTopic(question);
    if (matched === null) {
      pushTurns(question, "fallback");
      return;
    }
    if (matched !== "intro") {
      setAskedTopics((prev) => (prev.includes(matched) ? prev : [...prev, matched]));
    }
    pushTurns(question, matched);
  };

  const remainingChips = topicChips.filter((c) => !askedTopics.includes(c.id));
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div>
      <header className={`chat-header ${isScrolled ? "chat-header--scrolled" : ""}`}>
        <div className="shell header-inner">
          <a href="#top" className="brand">
            <span>nattavee<span className="brand-dot">.</span>n</span>
            <span className="brand-badge">sys-console</span>
          </a>
          <div className="header-right">
            <StatusClock />
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
        </div>
      </header>

      <main id="top" className="chat-shell shell">
        <div className="chat-thread" aria-live="polite">
          {turns.map((turn) =>
            turn.role === "user"
              ? <UserMessage key={turn.id} text={turn.text} />
              : <AssistantMessage key={turn.id} turn={turn} onDone={handleStreamDone} onOpenModal={openModal} onAsk={askTopic} />
          )}
          <div ref={threadEndRef} className="thread-end" />
        </div>
      </main>

      <div className="dock">
        <div className="shell dock-inner">
          {activeStream === null && remainingChips.length > 0 && (
            <div className="prompt-chips" role="group" aria-label="Suggested questions">
              {remainingChips.map((chip) => (
                <button
                  key={chip.id}
                  type="button"
                  className="prompt-chip"
                  onClick={() => askTopic(chip.id)}
                >
                  <span className="chip-caret" aria-hidden="true">❯</span> {chip.label}
                </button>
              ))}
            </div>
          )}

          <form className="input-bar" onSubmit={submitDraft}>
            <span className="input-caret" aria-hidden="true">❯</span>
            <input
              type="text"
              className="input-field"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder='Ask about my work — try "projects" or "certs"'
              aria-label="Ask a question"
              maxLength={120}
            />
            <button type="submit" className="input-send" disabled={activeStream !== null || !draft.trim()}>
              Ask
            </button>
          </form>

          <p className="dock-footer">© 2026 Nattavee Narischat · Bangkok, TH</p>
        </div>
      </div>

      <button
        onClick={() => scrollTo("top")}
        className={`back-top ${showTop ? "back-top--visible" : ""}`}
        aria-label="Back to top"
      >
        ↑ Top
      </button>

      {modal && <Modal item={modal} onClose={closeModal} />}
    </div>
  );
}
