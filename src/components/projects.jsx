"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ExternalLink, Github, Play, X } from "lucide-react"

const projects = [
  {
    name: "Memory Chatbot",
    shortDesc: "LangGraph chatbot that remembers conversations across chats and uses PDF generation plus web search tools.",
    tags: ["LangGraph", "LLMs", "Memory", "PDF Tool", "Web Search"],
    fullDesc:
      "Memory Chatbot is a LangGraph-powered conversational assistant that remembers context across separate chats, allowing users to continue naturally over time instead of restarting from zero. The agent includes two tools: a PDF generation tool for creating documents from conversation output, and a web search tool for retrieving fresh information when the answer needs external context."
  },
  {
    name: "Debate Agent",
    shortDesc: "Autonomous multi-agent debate platform with research, critique, and AI judging.",
    tags: ["Python", "FastAPI", "LangGraph", "Groq LLM", "Tavily API"],
    fullDesc:
      "Debate Agent is an autonomous multi-agent debate platform where AI agents independently research, argue opposing perspectives, critique one another, and then pass the discussion to an AI judge. It includes iterative refinement loops, stateful LangGraph orchestration, live web search integration, and a FastAPI backend powering a real-time web interface."
  },
  {
    name: "MailMind",
    shortDesc: "Autonomous email agent that classifies inboxes and sends WhatsApp summaries.",
    tags: ["n8n", "APIs", "WhatsApp", "Automation"],
    fullDesc:
      "MailMind continuously monitors an inbox, classifies incoming emails by category, and delivers concise summaries to the business owner via WhatsApp, reducing email triage time."
  },
  {
    name: "FlowMind",
    shortDesc: "Agentic n8n workflow that routes natural-language inputs into Notion databases.",
    tags: ["n8n", "APIs", "Notion", "Agentic Workflow"],
    fullDesc:
      "FlowMind is an agentic automation workflow in n8n that interprets natural-language user inputs and routes structured data directly into Notion databases via API, eliminating manual data entry."
  },
  {
    name: "Resume Analyzer",
    shortDesc: "AI tool for parsing resumes, scoring candidate skills, and surfacing structured insights.",
    tags: ["React", "Node.js", "AI", "LLMs"],
    fullDesc:
      "Resume Analyzer was developed during my internship at nuSoft. It processes uploaded resumes, extracts key information, scores candidate skills against job criteria, and surfaces structured insights using AI-driven analysis."
  }
]

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const videoRef = useRef(null)

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const playFullScreenVideo = () => {
    setIsFullScreen(true)
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current
          .requestFullscreen?.()
          .then(() => videoRef.current.play())
          .catch(() => videoRef.current.play())
      }
    }, 100)
  }

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsFullScreen(false)
        setSelectedProject(null)
      }
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [])

  return (
    <section
      id="projects"
      ref={ref}
      className="bg-gradient-to-b from-slate-950 via-gray-950 to-gray-900 px-5 py-24 text-white sm:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">Selected work</p>
            <h2 className="mt-4 max-w-3xl bg-gradient-to-r from-blue-300 via-cyan-200 to-purple-300 bg-clip-text text-4xl font-black leading-tight text-transparent sm:text-5xl">
              Built products with real workflows, not just static screens.
            </h2>
          </div>
          <a
            href="https://github.com/JarrarHaiderNemati"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-300/20 bg-white/10 px-5 py-3 font-semibold text-white shadow-lg shadow-black/10 transition hover:-translate-y-1 hover:bg-blue-500/20"
          >
            <Github size={18} />
            GitHub
          </a>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.article
              key={project.name}
              initial={{ opacity: 0, y: 34 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.12 + index * 0.08 }}
              className="group overflow-hidden rounded-2xl border border-blue-400/15 bg-gray-900/65 shadow-2xl shadow-black/20 backdrop-blur transition duration-300 hover:-translate-y-2 hover:border-blue-400/45 hover:shadow-blue-950/40"
            >
              <button
                onClick={() => setSelectedProject(project)}
                className="block w-full overflow-hidden bg-slate-950 text-left"
              >
                {project.image ? (
                  <img
                    src={project.image}
                    alt={`${project.name} preview`}
                    className="h-64 w-full object-cover object-top transition duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="relative flex h-64 flex-col justify-between overflow-hidden bg-gradient-to-br from-blue-950 via-slate-950 to-purple-950 p-6">
                    <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-blue-400/20 blur-3xl" />
                    <div className="absolute -bottom-16 left-8 h-44 w-44 rounded-full bg-purple-400/20 blur-3xl" />
                    <div className="relative flex items-center justify-between">
                      <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">
                        {project.status || "AI Build"}
                      </span>
                      <span className="text-4xl font-black text-white/10">0{index + 1}</span>
                    </div>
                    <div className="relative">
                      <h3 className="text-4xl font-black text-white">{project.name}</h3>
                      <p className="mt-3 max-w-md text-sm leading-6 text-slate-300">{project.shortDesc}</p>
                    </div>
                  </div>
                )}
              </button>

              <div className="p-6">
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-cyan-300/15 bg-cyan-300/10 px-2.5 py-1 text-xs font-bold text-cyan-100">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-2xl font-black text-white">{project.name}</h3>
                  {project.status && (
                    <span className="shrink-0 rounded-full bg-purple-500/15 px-3 py-1 text-xs font-bold text-purple-100">
                      {project.status}
                    </span>
                  )}
                </div>
                <p className="mt-3 leading-7 text-slate-300">{project.shortDesc}</p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2.5 font-bold text-white shadow-lg shadow-blue-950/25 transition hover:-translate-y-0.5"
                  >
                    <Play size={17} />
                    Details
                  </button>

                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 font-bold text-white transition hover:bg-white/10"
                    >
                      <ExternalLink size={17} />
                      Live
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-blue-400/20 bg-gray-950 text-white shadow-2xl shadow-blue-950/30"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative bg-slate-950">
                {selectedProject.image ? (
                  <img
                    src={selectedProject.image}
                    alt={`${selectedProject.name} preview`}
                    className="h-64 w-full object-cover object-top sm:h-80"
                  />
                ) : (
                  <div className="flex h-64 items-end bg-gradient-to-br from-blue-950 via-slate-950 to-purple-950 p-8 sm:h-80">
                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-200">
                        {selectedProject.status || "AI Project"}
                      </p>
                      <h3 className="mt-3 text-4xl font-black text-white sm:text-5xl">{selectedProject.name}</h3>
                    </div>
                  </div>
                )}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-slate-950/80 text-white backdrop-blur transition hover:bg-red-500"
                  aria-label="Close project details"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 sm:p-8">
                <h3 className="text-3xl font-black">{selectedProject.name}</h3>
                <p className="mt-4 max-w-3xl leading-7 text-slate-300">{selectedProject.fullDesc}</p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {selectedProject.video && (
                    <button
                      onClick={playFullScreenVideo}
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2.5 font-bold text-white transition hover:-translate-y-0.5"
                    >
                      <Play size={18} />
                      Watch demo
                    </button>
                  )}

                  {selectedProject.liveLink && (
                    <a
                      href={selectedProject.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 font-bold transition hover:bg-white/10"
                    >
                      <ExternalLink size={18} />
                      Visit site
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {isFullScreen && selectedProject?.video && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <video ref={videoRef} controls autoPlay className="max-h-full max-w-full object-contain">
            <source src={selectedProject.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <button
            onClick={() => setIsFullScreen(false)}
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-lg bg-red-600 text-white transition hover:bg-red-700"
            aria-label="Close video"
          >
            <X size={24} />
          </button>
        </div>
      )}
    </section>
  )
}

export default Projects
