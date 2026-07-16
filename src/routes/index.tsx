import { createFileRoute } from "@tanstack/react-router";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowUp,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Compass,
  Bone,
  Dna,
  Mountain,
  Sparkles,
  ChevronRight,
  X,
  FlaskConical,
  Landmark,
  Pickaxe,
  ScrollText,
} from "lucide-react";
import { Nav } from "@/components/dino/Nav";
import { Particles } from "@/components/dino/Particles";
import { SkeletonSVG } from "@/components/dino/SkeletonSVG";
import heroDino from "@/assets/hero-dino-original-generated.webp";
import dinoSkull from "@/assets/dino-skull-original-generated.webp";
import dinoSilhouettes from "@/assets/dino-silhouettes-original-generated.webp";
import jarrarPortrait from "@/assets/jarrar-portrait.webp";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      {
        property: "og:image",
        content:
          "https://images.unsplash.com/photo-1519638399535-1b036603ac77?auto=format&fit=crop&w=1600&q=80",
      },
      {
        name: "twitter:image",
        content:
          "https://images.unsplash.com/photo-1519638399535-1b036603ac77?auto=format&fit=crop&w=1600&q=80",
      },
    ],
  }),
});

/* ------------------------------- Reusable UI ------------------------------ */

function SectionLabel({ index, code, title }: { index: string; code: string; title: string }) {
  return (
    <div className="mb-14 flex flex-col gap-4">
      <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-amber/80">
        <span className="h-px w-10 bg-amber/50" />
        <span>{index}</span>
        <span className="text-muted-foreground">·</span>
        <span className="text-muted-foreground">{code}</span>
      </div>
      <h2 className="max-w-3xl font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
        {title}
      </h2>
    </div>
  );
}

function Reveal({
  children,
  delay = 0,
  y = 24,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const MUSEUM_STOPS = [
  { id: "base-camp", label: "Base Camp", icon: Compass },
  { id: "evolution", label: "Museum Collection", icon: Landmark },
  { id: "dna", label: "DNA Laboratory", icon: FlaskConical },
  { id: "excavation", label: "Excavation Site", icon: Pickaxe },
  { id: "expedition", label: "Expedition Log", icon: ScrollText },
  { id: "fossil-record", label: "Fossil Record", icon: Bone },
  { id: "courses", label: "Research Laboratory", icon: FlaskConical },
  { id: "discovery", label: "Discovery Point", icon: MapPin },
];

function TerminalLoader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(8);

  useEffect(() => {
    const seen = sessionStorage.getItem("museum-archive-loaded");
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(false);
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timers = [
      window.setTimeout(() => setProgress(38), 380),
      window.setTimeout(() => setProgress(72), 900),
      window.setTimeout(() => setProgress(100), 1450),
      window.setTimeout(() => {
        sessionStorage.setItem("museum-archive-loaded", "true");
        document.body.style.overflow = previousOverflow;
        setVisible(false);
      }, 2050),
    ];
    return () => {
      timers.forEach(window.clearTimeout);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const message =
    progress < 45
      ? "Scanning excavation site..."
      : progress < 100
        ? "Recovering artifacts..."
        : "Museum archive ready.";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          className="fixed inset-0 z-[200] grid place-items-center bg-background px-6"
        >
          <div className="w-full max-w-xl rounded-2xl border border-primary/35 bg-card p-6 shadow-2xl sm:p-9">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary" /> Museum Terminal ·
              JHN
            </div>
            <div className="mt-8 font-mono text-sm text-foreground sm:text-base">{message}</div>
            <div className="mt-5 grid grid-cols-12 gap-1.5" aria-label={`${progress}% complete`}>
              {Array.from({ length: 12 }).map((_, index) => (
                <span
                  key={index}
                  className={`h-3 rounded-sm transition-colors duration-300 ${index < Math.ceil(progress / 8.34) ? "bg-primary shadow-[0_0_10px_color-mix(in_oklab,var(--primary)_50%,transparent)]" : "bg-muted"}`}
                />
              ))}
            </div>
            <div className="mt-3 text-right font-mono text-[10px] tracking-[0.24em] text-muted-foreground">
              {progress}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MuseumMap() {
  const [active, setActive] = useState(MUSEUM_STOPS[0].id);

  useEffect(() => {
    const update = () => {
      const marker = window.scrollY + window.innerHeight * 0.38;
      let current = MUSEUM_STOPS[0].id;
      MUSEUM_STOPS.forEach((stop) => {
        const section = document.getElementById(stop.id);
        if (section && section.offsetTop <= marker) current = stop.id;
      });
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <aside
      aria-label="Interactive museum map"
      className="fixed right-5 top-1/2 z-40 hidden w-48 -translate-y-1/2 rounded-2xl border border-border/80 bg-background/85 p-4 shadow-2xl backdrop-blur-xl 2xl:block"
    >
      <div className="mb-4 font-mono text-[9px] uppercase tracking-[0.28em] text-amber">
        Museum Map
      </div>
      <ol>
        {MUSEUM_STOPS.map((stop, index) => {
          const Icon = stop.icon;
          const selected = active === stop.id;
          return (
            <li key={stop.id} className="relative pb-4 last:pb-0">
              {index < MUSEUM_STOPS.length - 1 && (
                <span className="absolute left-[13px] top-7 h-[calc(100%-1.25rem)] w-px bg-border" />
              )}
              <a
                href={`#${stop.id}`}
                aria-current={selected ? "location" : undefined}
                className={`relative flex items-center gap-3 text-[11px] transition-colors ${selected ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                <span
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all ${selected ? "border-primary bg-primary text-primary-foreground shadow-[0_0_18px_color-mix(in_oklab,var(--primary)_55%,transparent)]" : "border-border bg-card"}`}
                >
                  <Icon size={13} />
                </span>
                <span>{stop.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}

function ExcavationDepth() {
  const [depth, setDepth] = useState(0);
  useEffect(() => {
    const update = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      setDepth(available > 0 ? Math.min(100, Math.round((window.scrollY / available) * 100)) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <div
      className="fixed bottom-4 left-4 z-40 hidden rounded-xl border border-border/80 bg-background/85 px-4 py-3 shadow-xl backdrop-blur-xl sm:block"
      aria-label={`Excavation depth ${depth}%`}
    >
      <div className="font-mono text-[8px] uppercase tracking-[0.25em] text-muted-foreground">
        Excavation Depth
      </div>
      <div className="mt-2 flex gap-1">
        {Array.from({ length: 10 }).map((_, index) => (
          <span
            key={index}
            className={`h-2 w-3 rounded-sm ${index < Math.ceil(depth / 10) ? "bg-amber" : "bg-muted"}`}
          />
        ))}
      </div>
    </div>
  );
}

/* --------------------------------- Data ---------------------------------- */

const SKILL_GROUPS = [
  { title: "Frontend", items: ["React", "HTML", "CSS", "Tailwind CSS"] },
  { title: "Backend", items: ["Node.js", "Express", "Socket.IO", "FastAPI"] },
  { title: "Databases", items: ["MongoDB", "MySQL"] },
  { title: "Automation", items: ["n8n", "Webhooks", "API Integrations"] },
  {
    title: "Machine Learning",
    items: ["Python", "Pandas", "NumPy", "Scikit-learn", "Deep Learning", "Model Evaluation"],
  },
  {
    title: "AI / Agents",
    items: ["LangGraph", "LangChain", "LLMs", "Prompt Engineering", "Agentic Systems", "RAG"],
  },
];

const EXPERIENCE = [
  {
    role: "Full Stack Intern",
    org: "nuSoft, Pakistan",
    date: "Summer 2025",
    bullets: [
      "Contributed to nuTalent, nuSoft's internal HR platform, implementing frontend features with Next.js and SCSS.",
      "Built an AI-powered Resume Analyzer that parses resumes, extracts structured data, and evaluates candidate skills with LLM-driven techniques.",
      "Worked in an agile team across code reviews, feature planning, and delivery during a 2-month engagement.",
    ],
  },
  {
    role: "IT Intern",
    org: "NLC (National Logistics Corporation), Pakistan",
    date: "Summer 2024",
    bullets: [
      "Assisted the IT department with network configuration and maintenance tasks across operational infrastructure.",
    ],
  },
];

const PROJECTS = [
  {
    tag: "A-001",
    title: "Memory Chatbot",
    desc: "LangGraph chatbot that remembers conversations across chats and uses PDF generation plus web search tools.",
    stack: ["LangGraph", "LLMs", "Memory", "PDF Tool", "Web Search"],
    details:
      "Memory Chatbot is a LangGraph-powered conversational assistant that remembers context across separate chats, allowing users to continue naturally over time instead of restarting from zero. The agent includes two tools: a PDF generation tool for creating documents from conversation output, and a web search tool for retrieving fresh information when the answer needs external context.",
  },
  {
    tag: "A-002",
    title: "Debate Agent",
    desc: "Autonomous multi-agent debate platform with research, critique, and AI judging.",
    stack: ["Python", "FastAPI", "LangGraph", "Groq LLM", "Tavily API"],
    details:
      "Debate Agent is an autonomous multi-agent debate platform where AI agents independently research, argue opposing perspectives, critique one another, and then pass the discussion to an AI judge. It includes iterative refinement loops, stateful LangGraph orchestration, live web search integration, and a FastAPI backend powering a real-time web interface.",
  },
  {
    tag: "A-003",
    title: "MailMind",
    desc: "Autonomous email agent that classifies inboxes and sends WhatsApp summaries.",
    stack: ["n8n", "APIs", "WhatsApp", "Automation"],
    details:
      "MailMind continuously monitors an inbox, classifies incoming emails by category, and delivers concise summaries to the business owner via WhatsApp, reducing email triage time.",
  },
  {
    tag: "A-004",
    title: "FlowMind",
    desc: "Agentic n8n workflow that routes natural-language inputs into Notion databases.",
    stack: ["n8n", "APIs", "Notion", "Agentic Workflow"],
    details:
      "FlowMind is an agentic automation workflow in n8n that interprets natural-language user inputs and routes structured data directly into Notion databases via API, eliminating manual data entry.",
  },
  {
    tag: "A-005",
    title: "Resume Analyzer",
    desc: "AI tool for parsing resumes, scoring candidate skills, and surfacing structured insights.",
    stack: ["React", "Node.js", "AI", "LLMs"],
    details:
      "Resume Analyzer was developed during my internship at nuSoft. It processes uploaded resumes, extracts key information, scores candidate skills against job criteria, and surfaces structured insights using AI-driven analysis.",
  },
];

const CERTS = [
  { id: "LAB-C01", status: "Completed", title: "AI Agents in LangGraph", org: "DeepLearning.AI" },
  { id: "LAB-C02", status: "In Progress", title: "Deep Learning Specialization", org: "Coursera" },
  {
    id: "LAB-C03",
    status: "In Progress",
    title: "Retrieval-Augmented Generation",
    org: "Coursera",
  },
];

/* ---------------------------------- Page ---------------------------------- */

function Index() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <TerminalLoader />
      <Nav />
      <MuseumMap />
      <ExcavationDepth />
      <Hero />
      <SilhouettePanorama />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Courses />
      <SilhouettePanorama overlap={false} />
      <Contact />

      <Footer />
    </div>
  );
}

/* --------------------------- Silhouette Panorama -------------------------- */

function SilhouettePanorama({ overlap = true }: { overlap?: boolean }) {
  return (
    <div
      className={`relative h-56 w-full overflow-hidden sm:h-72 md:h-80 ${overlap ? "-mt-24" : ""}`}
      aria-hidden="true"
    >
      <img
        src={dinoSilhouettes}
        alt=""
        width={1920}
        height={640}
        className="absolute inset-0 h-full w-full object-cover object-bottom opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/30 to-background" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}

/* ---------------------------------- Hero ---------------------------------- */

const HERO_TITLES = ["Jarrar Haider Nemati", "a LangGraph Builder", "an Agentic AI Developer"];

function HeroTypewriter() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(HERO_TITLES[0]);
      return;
    }

    const title = HERO_TITLES[titleIndex];
    const typed = !deleting && text === title;
    const erased = deleting && text === "";
    const delay = typed ? 1500 : erased ? 250 : deleting ? 42 : 78;

    const timer = window.setTimeout(() => {
      if (typed) setDeleting(true);
      else if (erased) {
        setDeleting(false);
        setTitleIndex((index) => (index + 1) % HERO_TITLES.length);
      } else {
        setText(title.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [deleting, text, titleIndex]);

  return (
    <span className="font-sans font-semibold not-italic tracking-[-0.045em] text-[#B7F0B4] [text-shadow:0_3px_18px_rgba(0,0,0,0.9)]">
      {text}
      <motion.span
        aria-hidden="true"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.85, repeat: Infinity }}
        className="ml-1 inline-block text-[#E0FFD8] not-italic [text-shadow:0_0_18px_rgba(183,240,180,0.75)]"
      >
        |
      </motion.span>
    </span>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const yBg2 = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yFg = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  return (
    <section
      id="base-camp"
      ref={ref}
      className="relative isolate min-h-[100svh] overflow-hidden pt-32 pb-40 sm:pt-40 sm:pb-56"
    >
      {/* Cinematic dino landscape */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 -z-20">
        <img
          src={heroDino}
          alt="Silhouette of a Tyrannosaurus rex on a mountain ridge at dusk with distant sauropods in the mist"
          width={1920}
          height={1088}
          className="h-full w-full object-cover object-[35%_center] md:object-center"
        />
      </motion.div>

      {/* Cinematic overlays */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--background) 55%, transparent) 0%, color-mix(in oklab, var(--background) 20%, transparent) 40%, color-mix(in oklab, var(--background) 70%, transparent) 80%, var(--background) 100%)",
        }}
      />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(1000px 500px at 50% 20%, color-mix(in oklab, var(--amber) 18%, transparent), transparent 60%)",
        }}
      />
      <div className="absolute inset-0 -z-10 fossil-grain opacity-40" />

      {/* Drifting fog */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-1/2 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, color-mix(in oklab, var(--foreground) 8%, transparent), transparent 60%)",
          animation: "fog-drift 22s ease-in-out infinite alternate",
          filter: "blur(20px)",
        }}
      />

      {/* Skeleton line-art overlay */}
      <motion.div
        style={{ y: yBg2 }}
        className="pointer-events-none absolute inset-x-0 bottom-20 -z-10 mx-auto max-w-[1400px] px-6 opacity-60"
      >
        <SkeletonSVG className="w-full text-amber/35 mix-blend-screen drop-shadow-[0_0_30px_color-mix(in_oklab,var(--amber)_25%,transparent)]" />
      </motion.div>

      <Particles count={60} />

      <Particles count={50} />

      <motion.div style={{ y: yFg, opacity }} className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_390px]">
          <div>
            {/* Coordinates */}
            <div className="mb-10 flex flex-wrap items-center gap-4 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
              <span className="flex items-center gap-2 text-amber">
                <Compass size={14} className="opacity-80" />
                Base Camp / 00
              </span>
              <span className="h-px flex-1 max-w-[240px] bg-border" />
              <span>N 33.6844° · E 73.0479°</span>
            </div>

            <p className="mb-8 max-w-2xl font-mono text-xs uppercase tracking-[0.28em] text-amber/90">
              Agentic AI · ML / DL · Full Stack Development
            </p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.15 }}
              className="mb-7 flex items-center gap-4 lg:hidden"
            >
              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-amber/70 bg-secondary shadow-[0_0_35px_color-mix(in_oklab,var(--amber)_28%,transparent)]">
                <img
                  src={jarrarPortrait}
                  alt="Jarrar Haider Nemati"
                  width={320}
                  height={320}
                  fetchPriority="high"
                  className="h-full w-full object-cover object-[50%_42%]"
                />
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-amber">
                Field Portrait
                <span className="mt-1 block text-muted-foreground">Specimen · JHN-01</span>
              </div>
            </motion.div>

            <h1 className="font-display text-[clamp(2.35rem,8vw,7.5rem)] leading-[0.95] tracking-tight">
              <span className="block">Hi, I'm</span>
              <span className="block h-[3em] overflow-hidden [contain:layout_paint] sm:h-[2em]">
                <HeroTypewriter />
              </span>
            </h1>

            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              I build production-ready MERN applications, LangGraph-powered agentic systems, ML/DL
              experiments, and n8n automations that connect LLMs, APIs, and real business workflows.
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-4">
              <a
                href="#excavation"
                className="group inline-flex items-center gap-2 rounded-full bg-amber px-6 py-3.5 text-sm font-semibold text-amber-foreground transition-all glow-amber hover:scale-[1.02]"
              >
                View My Work
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
              <a
                href="#discovery"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-6 py-3.5 text-sm font-semibold text-foreground backdrop-blur hover:border-amber/50 hover:text-amber transition-colors"
              >
                Hire Me
              </a>
            </div>

            <div className="mt-14 flex flex-wrap gap-3">
              {["MERN Stack", "LangGraph Agents", "n8n + APIs"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border bg-secondary/50 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <motion.figure
            initial={{ opacity: 0, x: 36, scale: 0.94 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto hidden w-full max-w-[320px] lg:block lg:max-w-none"
          >
            <div className="absolute -inset-4 rotate-3 rounded-[48%_48%_1rem_1rem] border border-amber/30 shadow-[0_0_70px_color-mix(in_oklab,var(--amber)_18%,transparent)]" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[48%_48%_1rem_1rem] border border-amber/60 bg-secondary shadow-2xl">
              <img
                src={jarrarPortrait}
                alt="Jarrar Haider Nemati"
                width={1400}
                height={788}
                fetchPriority="high"
                className="h-full w-full object-cover object-[50%_48%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-amber/5" />
              <figcaption className="absolute bottom-5 left-5 font-mono text-[10px] uppercase tracking-[0.28em] text-amber">
                Field Portrait / 01
              </figcaption>
            </div>
          </motion.figure>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        <span>Descend</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="h-8 w-px bg-gradient-to-b from-amber to-transparent"
        />
      </div>
    </section>
  );
}

/* ---------------------------------- About --------------------------------- */

function About() {
  return (
    <section id="evolution" className="relative border-t border-border/60 py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <SectionLabel
            index="01"
            code="EVOLUTION / About"
            title="MERN products, LangGraph agents, ML/DL, and n8n automations."
          />
        </Reveal>

        <div className="grid gap-16 lg:grid-cols-[1.3fr_1fr]">
          <Reveal delay={0.1}>
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>
                I specialise in MERN stack development, LangGraph-based agentic systems, workflow
                automation, and applied machine learning/deep learning. I build production-ready
                applications that integrate LLMs, n8n automations, real-time APIs, and structured
                backend systems.
              </p>
              <p>
                I am especially interested in autonomous agent workflows: systems that can reason,
                use tools, remember context, call APIs, and reduce manual work while still feeling
                simple for the people using them.
              </p>
              <div className="mt-10 rounded-2xl border border-amber/30 bg-gradient-to-br from-amber/[0.06] to-transparent p-6">
                <div className="flex items-center gap-2 text-amber font-mono text-[11px] uppercase tracking-[0.25em]">
                  <Sparkles size={14} /> Field Note · Operating Style
                </div>
                <p className="mt-3 text-foreground/90">
                  Start with the real business problem, use LangGraph or n8n where they fit, and
                  ship intelligent systems people can actually use.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <aside className="relative overflow-hidden rounded-3xl border border-amber/50 bg-gradient-to-br from-card via-secondary/95 to-background p-7 shadow-[0_30px_90px_color-mix(in_oklab,black_45%,transparent)] sm:p-9">
              <div className="pointer-events-none absolute -right-24 -top-20 h-72 w-72 rounded-full border border-amber/10 shadow-[0_0_0_28px_color-mix(in_oklab,var(--amber)_4%,transparent),0_0_0_60px_color-mix(in_oklab,var(--primary)_3%,transparent)]" />
              <Bone
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-8 -right-5 h-40 w-40 rotate-[-28deg] text-amber/[0.08]"
                strokeWidth={0.7}
              />

              <div className="relative flex items-start justify-between gap-6 border-b border-amber/30 pb-6">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-amber/75">
                    Permanent Exhibit
                  </div>
                  <h3 className="mt-2 font-display text-3xl text-foreground sm:text-4xl">
                    Museum Collection
                  </h3>
                </div>
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-amber/40 bg-amber/10 text-amber">
                  <Bone size={23} strokeWidth={1.4} />
                </div>
              </div>

              <dl className="relative mt-2 divide-y divide-border/70">
                {[
                  ["Specimen ID", "JHN-001"],
                  ["Scientific name", "Jarrar Haider Nemati"],
                  ["Classification", "Software Engineer"],
                  ["Status", "Still Evolving"],
                  ["Origin", "NUST"],
                  ["Current Expedition", "Building AI Agents"],
                  ["Favorite Dinosaur", "Spinosaurus"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="grid gap-1 py-4 sm:grid-cols-[0.85fr_1.15fr] sm:items-baseline sm:gap-5"
                  >
                    <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {label}
                    </dt>
                    <dd
                      className={`text-[15px] font-medium ${label === "Status" ? "text-primary" : label === "Specimen ID" ? "font-mono text-amber" : "text-foreground"}`}
                    >
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="relative mt-5 flex items-center gap-3 border-t border-amber/30 pt-5 font-mono text-[9px] uppercase tracking-[0.28em] text-amber/70">
                <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" />
                Active specimen · Handle with curiosity
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Skills --------------------------------- */

function Skills() {
  return (
    <section
      id="dna"
      className="relative isolate overflow-hidden border-t border-border/60 py-32 rock-layers"
    >
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 240 760"
        className="pointer-events-none absolute -right-10 top-10 -z-10 h-[900px] w-72 text-primary opacity-[0.12] sm:right-8 sm:w-96"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        animate={{ y: [0, -28, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M55 0c150 95 150 190 0 285s-150 190 0 285 150 190 0 285" />
        <path d="M185 0C35 95 35 190 185 285s150 190 0 285-150 190 0 285" />
        {Array.from({ length: 18 }).map((_, index) => {
          const y = index * 47;
          const inset = 24 + Math.abs(Math.sin(index * 0.7)) * 48;
          return (
            <path
              key={index}
              d={`M${inset} ${y}H${240 - inset}`}
              opacity={0.35 + (index % 4) * 0.13}
            />
          );
        })}
      </motion.svg>

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <SectionLabel
            index="02"
            code="DNA Archive / Skills"
            title="Core genome behind the builds."
          />
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.06}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-br from-card via-secondary/90 to-background p-6 shadow-[0_18px_50px_color-mix(in_oklab,black_24%,transparent)] transition-all hover:border-primary/60">
                <div className="absolute right-4 top-4 opacity-60 transition-transform duration-700 group-hover:rotate-180">
                  <Dna className="h-7 w-7 text-primary" strokeWidth={1.4} />
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary">
                  Genome Class · 0{i + 1}
                </div>
                <h3 className="mt-2 font-display text-2xl">{g.title}</h3>

                <svg
                  viewBox="0 0 200 30"
                  className="my-5 h-4 w-full text-primary/50"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M0 15 Q 25 0, 50 15 T 100 15 T 150 15 T 200 15" />
                  <path d="M0 15 Q 25 30, 50 15 T 100 15 T 150 15 T 200 15" />
                </svg>

                <ul className="space-y-2.5">
                  {g.items.map((it, itemIndex) => {
                    const sampleNumber =
                      SKILL_GROUPS.slice(0, i).reduce(
                        (total, group) => total + group.items.length,
                        0,
                      ) +
                      itemIndex +
                      1;
                    return (
                      <li
                        key={it}
                        className="relative overflow-hidden rounded-xl border border-primary/20 bg-background/55 px-3.5 py-3 transition-colors hover:border-amber/45 hover:bg-amber/[0.06]"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <div className="font-mono text-[8px] uppercase tracking-[0.22em] text-muted-foreground">
                              DNA Sample #{String(sampleNumber).padStart(2, "0")}
                            </div>
                            <div className="mt-1 text-sm font-semibold text-[#C9F6C5]">{it}</div>
                          </div>
                          <div className="flex gap-1" aria-hidden="true">
                            {[0, 1, 2, 3].map((bar) => (
                              <span
                                key={bar}
                                className={`h-5 w-1 rounded-full ${bar % 2 ? "bg-amber/65" : "bg-primary/70"}`}
                              />
                            ))}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Projects -------------------------------- */

function Projects() {
  const [selectedProject, setSelectedProject] = useState<(typeof PROJECTS)[number] | null>(null);

  useEffect(() => {
    if (!selectedProject) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setSelectedProject(null);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", close);
    };
  }, [selectedProject]);

  return (
    <section id="excavation" className="relative border-t border-border/60 py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionLabel
              index="03"
              code="Excavation Site / Selected Work"
              title="Built products with real workflows, not just static screens."
            />
            <a
              href="https://github.com/JarrarHaiderNemati"
              target="_blank"
              rel="noreferrer noopener"
              className="mb-14 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-amber/50 hover:text-amber"
            >
              <Github size={16} /> GitHub
              <ArrowUpRight size={14} />
            </a>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <ProjectCard project={p} onOpen={() => setSelectedProject(p)} />
            </Reveal>
          ))}
        </div>
      </div>
      {selectedProject && (
        <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
}

function ProjectCard({
  project,
  onOpen,
}: {
  project: (typeof PROJECTS)[number];
  onOpen: () => void;
}) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 240, damping: 20 }}
      role="button"
      tabIndex={0}
      aria-label={`Excavate details for ${project.title}`}
      onClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen();
        }
      }}
      className="group relative cursor-pointer overflow-hidden rounded-3xl border border-amber/30 bg-gradient-to-br from-card via-secondary/90 to-background p-7 shadow-[0_20px_60px_color-mix(in_oklab,black_25%,transparent)] transition-all hover:border-amber/70 hover:shadow-[0_25px_80px_color-mix(in_oklab,var(--amber)_18%,transparent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber sm:p-8"
    >
      {/* Dust that clears on hover */}
      <div className="pointer-events-none absolute inset-0 fossil-grain opacity-80 transition-opacity duration-700 group-hover:opacity-20" />
      {/* Amber glow */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(600px 200px at 20% 0%, color-mix(in oklab, var(--amber) 18%, transparent), transparent 60%)",
        }}
      />

      <div className="relative flex items-center justify-between border-b border-amber/25 pb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-amber/80">
        <span className="flex items-baseline gap-2">
          <span className="text-muted-foreground">Artifact No.</span>
          <strong className="text-xs tracking-[0.24em] text-amber">{project.tag}</strong>
        </span>
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <MapPin size={11} /> Dig Site
        </span>
      </div>

      <div className="relative mt-6 font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
        Discovery
      </div>
      <h3 className="relative mt-2 font-display text-3xl md:text-4xl">{project.title}</h3>

      <div className="relative mt-6 font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
        Description
      </div>
      <p className="relative mt-2 text-[15px] leading-relaxed text-foreground/80">{project.desc}</p>

      <div className="relative mt-6 font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
        Recovered Technologies
      </div>
      <div className="relative mt-3 flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <span
            key={s}
            className="rounded-full border border-primary/35 bg-primary/10 px-2.5 py-1 text-[11px] font-mono tracking-wide text-[#C9F6C5]"
          >
            {s}
          </span>
        ))}
      </div>

      <div className="relative mt-8 flex items-center justify-between">
        <span className="inline-flex whitespace-nowrap items-center gap-1.5 rounded-full bg-amber px-3 py-2 text-xs font-semibold text-amber-foreground shadow-lg transition-transform group-hover:scale-[1.03] sm:px-4 sm:text-sm">
          Excavate Details <ChevronRight size={14} />
        </span>
        {/* claw marks */}
        <svg
          viewBox="0 0 60 40"
          className="hidden h-8 w-14 text-amber/30 transition-colors group-hover:text-amber/70 sm:block"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        >
          <path d="M4 4 C 20 18, 30 26, 56 34" />
          <path d="M2 14 C 18 26, 30 32, 56 38" />
          <path d="M2 24 C 18 32, 32 36, 56 40" />
        </svg>
      </div>
    </motion.article>
  );
}

function ProjectDialog({
  project,
  onClose,
}: {
  project: (typeof PROJECTS)[number];
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-background/75 p-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onMouseDown={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 25 }}
        onMouseDown={(event) => event.stopPropagation()}
        className="relative my-auto w-full max-w-3xl overflow-hidden rounded-3xl border border-amber/60 bg-card shadow-[0_30px_100px_color-mix(in_oklab,black_65%,transparent)]"
      >
        <div className="border-b border-amber/25 bg-gradient-to-br from-amber/25 via-primary/10 to-card p-7 sm:p-9">
          <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-amber">
            Artifact No. {project.tag} · Excavation Record
          </div>
          <h3 id="project-dialog-title" className="mt-3 pr-12 font-display text-4xl sm:text-5xl">
            {project.title}
          </h3>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-amber/35 bg-background/70 text-foreground transition-colors hover:bg-amber hover:text-amber-foreground"
            aria-label="Close project details"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-7 sm:p-9">
          <p className="text-base leading-8 text-foreground/90 sm:text-lg">{project.details}</p>
          <div className="mt-7 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-primary/35 bg-primary/15 px-3 py-1.5 font-mono text-xs text-primary"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------- Experience ------------------------------- */

function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 78%", "end 32%"],
  });
  const shovelTop = useTransform(scrollYProgress, [0, 1], ["1%", "88%"]);

  return (
    <section
      ref={sectionRef}
      id="expedition"
      className="relative overflow-hidden border-t border-border/60 py-32"
    >
      <img
        src={dinoSkull}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={1200}
        height={1200}
        className="pointer-events-none absolute -right-24 top-16 h-[520px] w-[520px] object-contain opacity-[0.07] mix-blend-screen select-none"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <SectionLabel
            index="04"
            code="Expedition Log / Experience"
            title="Internship work across AI tooling, HR platforms, and IT infrastructure."
          />
        </Reveal>

        <div className="relative ml-1 pl-12 md:ml-4 md:pl-20">
          {/* Excavation trench revealed by scroll */}
          <svg
            aria-hidden="true"
            viewBox="0 0 90 900"
            preserveAspectRatio="none"
            className="pointer-events-none absolute bottom-0 left-0 top-0 h-full w-12 overflow-visible md:w-16"
          >
            <path
              d="M42 0C18 100 68 190 35 300S72 500 38 620 62 790 42 900"
              fill="none"
              stroke="color-mix(in oklab, var(--amber) 12%, transparent)"
              strokeWidth="18"
              strokeLinecap="round"
            />
            <motion.path
              d="M42 0C18 100 68 190 35 300S72 500 38 620 62 790 42 900"
              fill="none"
              stroke="color-mix(in oklab, var(--amber) 70%, transparent)"
              strokeWidth="3"
              strokeLinecap="round"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>

          {/* Archaeological shovel follows excavation depth */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute left-[-12px] z-20 w-16 -translate-y-1/2 drop-shadow-[0_8px_12px_rgba(0,0,0,0.65)] md:left-[-5px] md:w-20"
            style={{ top: shovelTop }}
          >
            <svg viewBox="0 0 90 210" className="h-auto w-full overflow-visible">
              <defs>
                <linearGradient id="shovelWood" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#5c321d" />
                  <stop offset="0.45" stopColor="#b06d35" />
                  <stop offset="1" stopColor="#402114" />
                </linearGradient>
                <linearGradient id="shovelSteel" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#f0e6d2" />
                  <stop offset="0.42" stopColor="#8f958f" />
                  <stop offset="0.75" stopColor="#d7c8a8" />
                  <stop offset="1" stopColor="#5c625e" />
                </linearGradient>
              </defs>
              <path
                d="M31 17C31 4 59 4 59 17v17H49V21c0-5-8-5-8 0v13H31V17Z"
                fill="url(#shovelSteel)"
                stroke="#332d25"
                strokeWidth="2"
              />
              <rect
                x="40"
                y="30"
                width="10"
                height="112"
                rx="5"
                fill="url(#shovelWood)"
                stroke="#3b2116"
                strokeWidth="2"
              />
              <path
                d="M34 133h22l5 15H29l5-15Z"
                fill="url(#shovelSteel)"
                stroke="#494b47"
                strokeWidth="2"
              />
              <path
                d="M29 145c2 28 8 47 16 57 8-10 14-29 16-57H29Z"
                fill="url(#shovelSteel)"
                stroke="#494b47"
                strokeWidth="2"
              />
              <path d="M35 151c4 4 16 4 20 0" fill="none" stroke="#f6e7c8" strokeOpacity=".6" />
            </svg>
          </motion.div>

          {EXPERIENCE.map((e, i) => (
            <ExperienceArtifact
              key={e.role}
              experience={e}
              index={i}
              progress={scrollYProgress}
              threshold={0.18 + i * 0.42}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceArtifact({
  experience,
  index,
  progress,
  threshold,
}: {
  experience: (typeof EXPERIENCE)[number];
  index: number;
  progress: MotionValue<number>;
  threshold: number;
}) {
  const [recovered, setRecovered] = useState(false);
  const triggered = useRef(false);
  const timer = useRef<number | undefined>(undefined);
  const opacity = useTransform(progress, [threshold - 0.08, threshold + 0.1], [0.12, 1]);
  const y = useTransform(progress, [threshold - 0.08, threshold + 0.12], [42, 0]);
  const scale = useTransform(progress, [threshold - 0.08, threshold + 0.12], [0.985, 1]);

  useMotionValueEvent(progress, "change", (latest) => {
    if (!triggered.current && latest >= threshold) {
      triggered.current = true;
      setRecovered(true);
      timer.current = window.setTimeout(() => setRecovered(false), 1450);
    }
  });

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <motion.article style={{ opacity, y, scale }} className="relative mb-16 last:mb-0">
      <div className="absolute -left-[43px] top-8 h-3.5 w-3.5 rounded-full border-2 border-amber bg-background shadow-[0_0_0_7px_color-mix(in_oklab,var(--amber)_16%,transparent)] md:-left-[67px]" />

      <AnimatePresence>
        {recovered && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute -top-9 left-3 z-20 rounded-full border border-amber/45 bg-background/90 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.24em] text-amber shadow-xl backdrop-blur"
          >
            Artifact Recovered
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {recovered && (
          <motion.div
            className="pointer-events-none absolute -left-5 top-4 z-10 h-24 w-32"
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
          >
            {Array.from({ length: 10 }).map((_, dustIndex) => (
              <motion.span
                key={dustIndex}
                className="absolute left-8 top-12 rounded-full bg-amber/45"
                style={{ width: 3 + (dustIndex % 3), height: 3 + (dustIndex % 3) }}
                variants={{
                  hidden: { opacity: 0, x: 0, y: 0, scale: 0.5 },
                  visible: {
                    opacity: [0, 0.75, 0],
                    x: (dustIndex - 4.5) * 10,
                    y: -18 - (dustIndex % 4) * 12,
                    scale: 1.4,
                    transition: { duration: 0.8 + (dustIndex % 3) * 0.14, ease: "easeOut" },
                  },
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="rounded-2xl border border-border bg-gradient-to-br from-card via-secondary/90 to-background p-6 shadow-[0_20px_60px_color-mix(in_oklab,black_25%,transparent)] transition-colors hover:border-amber/45 sm:p-7">
        <div className="flex flex-wrap items-baseline justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-amber/80">
          <span>Field Log ID · EXP-00{index + 1}</span>
          <span className="text-muted-foreground">{experience.date}</span>
        </div>
        <h3 className="mt-3 font-display text-2xl md:text-3xl">{experience.role}</h3>
        <div className="mt-1 text-sm text-muted-foreground">{experience.org}</div>
        <div className="mt-4 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-primary">
          <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_var(--primary)]" />{" "}
          Verified Field Record
        </div>
        <ul className="mt-5 space-y-3">
          {experience.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-3 text-[15px] text-foreground/85">
              <span className="mt-2 h-1 w-3 shrink-0 rounded-full bg-amber/70" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

/* -------------------------------- Education ------------------------------- */

function Education() {
  return (
    <section id="fossil-record" className="relative border-t border-border/60 py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <SectionLabel
            index="05"
            code="Fossil Record / Education"
            title="Software engineering foundation with a builder's mindset."
          />
        </Reveal>

        {/* Museum exhibit — skull specimen */}
        <Reveal>
          <div className="relative mb-10 overflow-hidden rounded-3xl border border-amber/25 bg-gradient-to-br from-secondary/70 to-background p-6 md:p-10">
            <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12">
              <div className="relative mx-auto aspect-square w-full max-w-xl overflow-hidden rounded-2xl border border-amber/20 bg-black/40">
                <img
                  src={dinoSkull}
                  alt="Fossilised Tyrannosaurus rex skull illustration"
                  width={1200}
                  height={1200}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-contain p-6"
                  style={{
                    filter:
                      "drop-shadow(0 20px 40px color-mix(in oklab, var(--amber) 30%, transparent))",
                  }}
                />
                <div className="absolute inset-0 fossil-grain opacity-20 pointer-events-none" />
                <div className="pointer-events-none absolute inset-0 flex items-end justify-between gap-3 p-4 font-mono text-[8px] uppercase tracking-[0.2em] text-amber/70 sm:text-[9px] sm:tracking-[0.3em]">
                  <span>Fossil ID · PAL-TRX-07</span>
                  <span>Cretaceous</span>
                </div>
              </div>
              <div className="min-w-0">
                <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-amber sm:tracking-[0.3em]">
                  Museum Exhibit · Origin Story
                </div>
                <h3 className="mt-3 max-w-2xl font-display text-3xl leading-tight text-balance md:text-4xl">
                  Excavated from lecture halls, sharpened in production.
                </h3>
                <p className="mt-4 text-muted-foreground">
                  Every builder has a fossil layer. Mine is a software engineering foundation from
                  NUST — data structures, algorithms, databases, and shipping real projects — that
                  keeps holding up under the weight of agentic AI systems.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="max-w-4xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-border bg-secondary/40 p-8">
              <Mountain
                className="absolute -right-6 -bottom-6 h-40 w-40 text-amber/10"
                strokeWidth={0.8}
              />
              <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-amber/80">
                Academic Specimen ID · EDU-001
              </div>
              <h3 className="mt-3 font-display text-3xl md:text-4xl">NUST</h3>
              <p className="mt-2 text-lg text-foreground/85">Bachelor's in Software Engineering</p>
              <div className="mt-1 text-sm text-muted-foreground">
                Expected graduation: 2027 · Islamabad, Pakistan
              </div>

              <div className="mt-5 flex items-center gap-3 border-y border-primary/20 py-3 font-mono text-[9px] uppercase tracking-[0.22em] text-primary">
                <FlaskConical size={14} /> Classification · Software Engineering Foundation
              </div>

              <div className="mt-8">
                <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                  Relevant coursework
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    "Data Structures",
                    "Algorithms",
                    "Web Development",
                    "Database Systems",
                    "Software Engineering",
                  ].map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- Courses & Certificates ---------------------------- */

function Courses() {
  return (
    <section
      id="courses"
      className="relative isolate overflow-hidden border-t border-border/60 py-32 rock-layers"
    >
      <FlaskConical
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-12 -z-10 h-96 w-96 text-primary/[0.07]"
        strokeWidth={0.6}
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <SectionLabel
            index="06"
            code="Research Laboratory / Courses"
            title="Focused learning in agents, deep learning, and RAG systems."
          />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CERTS.map((course, index) => (
            <Reveal key={course.title} delay={index * 0.08}>
              <article className="group relative h-full overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-card via-secondary/90 to-background p-7 shadow-[0_20px_60px_color-mix(in_oklab,black_25%,transparent)] transition-all hover:-translate-y-1 hover:border-primary/65">
                <div className="pointer-events-none absolute inset-0 fossil-grain opacity-25" />
                <div className="relative flex items-center justify-between gap-4 border-b border-primary/25 pb-4 font-mono text-[9px] uppercase tracking-[0.24em] text-primary">
                  <span>Sample ID · {course.id}</span>
                  <FlaskConical size={16} />
                </div>

                <div className="relative mt-6 font-mono text-[9px] uppercase tracking-[0.23em] text-muted-foreground">
                  Recovered Study
                </div>
                <h3 className="relative mt-2 font-display text-2xl leading-tight sm:text-3xl">
                  {course.title}
                </h3>

                <div className="relative mt-6 font-mono text-[9px] uppercase tracking-[0.23em] text-muted-foreground">
                  Research Institution
                </div>
                <p className="relative mt-2 text-sm font-medium text-foreground/85">{course.org}</p>

                <div className="relative mt-7 flex items-center justify-between gap-3 border-t border-border/70 pt-5">
                  <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                    Current Condition
                  </span>
                  <span
                    className={`rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] ${course.status === "Completed" ? "border-primary/50 bg-primary/15 text-[#C9F6C5]" : "border-amber/50 bg-amber/10 text-amber"}`}
                  >
                    {course.status}
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Contact -------------------------------- */

function Contact() {
  return (
    <section id="discovery" className="relative border-t border-border/60 py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 fossil-grain opacity-40" />
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(700px 400px at 50% 100%, color-mix(in oklab, var(--amber) 12%, transparent), transparent 60%)",
        }}
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <SectionLabel
            index="07"
            code="Discovery Point / Contact"
            title="Have an app, workflow, or AI idea to build?"
          />
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <div className="space-y-8">
              <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
                Send the basics and your email app will open with everything formatted. I am open to
                freelance projects, internships, and full-time roles around MERN, LangGraph agents,
                ML/DL, n8n automation, and agentic AI systems.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-xl border border-primary/25 bg-primary/[0.06] px-4 py-3 font-mono text-[9px] uppercase tracking-[0.23em] text-primary">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-primary" /> Communications
                  Lab · COM-001 · Online
                </div>
                <a
                  href="mailto:jarrarnemati@gmail.com"
                  className="group flex items-center justify-between rounded-2xl border border-border bg-secondary/40 p-5 transition-colors hover:border-amber/50"
                >
                  <div className="flex items-center gap-4">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-amber/15 text-amber">
                      <Mail size={18} />
                    </span>
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                        Channel ID · EMAIL-01
                      </div>
                      <div className="text-[15px]">jarrarnemati@gmail.com</div>
                    </div>
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="text-muted-foreground transition-colors group-hover:text-amber"
                  />
                </a>

                <a
                  href="tel:+923335406509"
                  className="group flex items-center justify-between rounded-2xl border border-border bg-secondary/40 p-5 transition-colors hover:border-amber/50"
                >
                  <div className="flex items-center gap-4">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-amber/15 text-amber">
                      <Phone size={18} />
                    </span>
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                        Channel ID · TEL-02
                      </div>
                      <div className="text-[15px]">+92 333 5406509</div>
                    </div>
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="text-muted-foreground transition-colors group-hover:text-amber"
                  />
                </a>
              </div>

              <div className="flex gap-3 pt-2">
                <a
                  href="https://github.com/JarrarHaiderNemati"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="GitHub"
                  className="grid h-11 w-11 place-items-center rounded-full border border-border bg-secondary/40 text-muted-foreground hover:border-amber/50 hover:text-amber transition-colors"
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/jarrar-haider-nemati-955a87285/"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="LinkedIn"
                  className="grid h-11 w-11 place-items-center rounded-full border border-border bg-secondary/40 text-muted-foreground hover:border-amber/50 hover:text-amber transition-colors"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "");
    const email = String(fd.get("email") || "");
    const message = String(fd.get("message") || "");
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    window.location.href = `mailto:jarrarnemati@gmail.com?subject=${encodeURIComponent(
      `New expedition request from ${name}`,
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form
      onSubmit={onSubmit}
      className="relative overflow-hidden rounded-3xl border border-amber/25 bg-gradient-to-br from-secondary/80 to-secondary/30 p-8 backdrop-blur"
    >
      <div className="absolute inset-0 fossil-grain opacity-30" />
      <div className="relative space-y-5">
        <div className="flex items-center justify-between gap-3 border-b border-amber/25 pb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-amber">
          <span className="flex items-center gap-2">
            <Sparkles size={12} /> Final Camp · Transmission
          </span>
          <span className="text-primary">TX-001</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Name
            </span>
            <input
              name="name"
              required
              className="w-full rounded-lg border border-border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-amber/60 focus:outline-none focus:ring-2 focus:ring-amber/30"
              placeholder="Your name"
            />
          </label>
          <label className="block">
            <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Email
            </span>
            <input
              type="email"
              name="email"
              required
              className="w-full rounded-lg border border-border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-amber/60 focus:outline-none focus:ring-2 focus:ring-amber/30"
              placeholder="you@domain.com"
            />
          </label>
        </div>
        <label className="block">
          <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Message
          </span>
          <textarea
            name="message"
            required
            rows={5}
            className="w-full resize-none rounded-lg border border-border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-amber/60 focus:outline-none focus:ring-2 focus:ring-amber/30"
            placeholder="Tell me about the app, workflow, or agent you want to build…"
          />
        </label>

        <button
          type="submit"
          className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber px-5 py-3.5 text-sm font-semibold text-amber-foreground transition-all glow-amber hover:scale-[1.01] sm:w-auto"
        >
          Send Transmission
          <ArrowUpRight
            size={16}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </button>
      </div>
    </form>
  );
}

/* ---------------------------------- Footer -------------------------------- */

function Footer() {
  return (
    <footer className="border-t border-border/60 py-10">
      <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-7 px-6 lg:px-10">
        <div>
          <div className="font-display text-3xl text-foreground">Museum Closed</div>
          <p className="mt-2 text-sm text-muted-foreground">
            Thanks for visiting. The expedition continues.
          </p>
          <div className="mt-4 font-mono text-[9px] uppercase tracking-[0.26em] text-muted-foreground">
            © {new Date().getFullYear()} · Jarrar Haider Nemati · Expedition Complete
          </div>
        </div>
        <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          <Compass size={12} className="text-amber" />
          <span>Return to Base Camp</span>
          <a
            href="#base-camp"
            aria-label="Return to Base Camp"
            className="grid h-12 w-12 place-items-center rounded-full border border-amber/50 bg-amber/10 text-amber shadow-[0_0_22px_color-mix(in_oklab,var(--amber)_20%,transparent)] transition-all hover:-translate-y-1 hover:bg-amber hover:text-amber-foreground"
          >
            <ArrowUp size={23} strokeWidth={2.2} />
          </a>
        </div>
      </div>
    </footer>
  );
}
