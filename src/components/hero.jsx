'use client'

import { motion } from "framer-motion"
import { Typewriter } from "react-simple-typewriter"
import { ArrowDown, Bot, Briefcase, Code2, Sparkles, Workflow } from 'lucide-react'

const particles = Array.from({ length: 26 }).map((_, index) => ({
  id: index,
  x: (index * 37) % 100,
  y: (index * 53) % 100,
  size: 5 + (index % 7) * 2,
  duration: 12 + (index % 6) * 3,
}))

function Hero() {
  const viewSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  const highlights = [
    { label: "MERN Stack", icon: <Code2 size={18} /> },
    { label: "LangGraph Agents", icon: <Bot size={18} /> },
    { label: "n8n + APIs", icon: <Workflow size={18} /> },
  ]

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-950 via-slate-900 to-gray-950 px-5 pb-16 pt-28 text-center text-white sm:px-8 lg:pt-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(59,130,246,0.22),transparent_30%),radial-gradient(circle_at_82%_16%,rgba(168,85,247,0.22),transparent_28%),radial-gradient(circle_at_50%_85%,rgba(20,184,166,0.14),transparent_34%)]" />

      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-blue-400/20 shadow-[0_0_24px_rgba(96,165,250,0.4)]"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            x: [0, (particle.id % 2 === 0 ? 1 : -1) * (24 + particle.id)],
            y: [0, (particle.id % 3 === 0 ? 1 : -1) * (18 + particle.id)],
            opacity: [0.15, 0.5, 0.15],
            scale: [1, 1.35, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-8rem)] max-w-6xl flex-col items-center justify-center">
        <motion.div
          className="relative mb-8"
          initial={{ opacity: 0, scale: 0.7, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.75, type: "spring", stiffness: 110 }}
        >
          <div className="absolute -inset-5 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 opacity-35 blur-2xl" />
          <div className="absolute -inset-2 rounded-full border border-blue-300/30" />
          <div className="relative h-36 w-36 overflow-hidden rounded-full border-4 border-blue-400/60 shadow-2xl shadow-blue-950/60 sm:h-44 sm:w-44">
            <img
              src="/Jar.jpeg"
              alt="Jarrar Haider Nemati"
              className="h-full w-full object-cover object-[50%_42%]"
            />
          </div>
        </motion.div>

        <motion.div
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-100 backdrop-blur"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18 }}
        >
          <Sparkles size={16} className="text-cyan-300" />
          Agentic AI, ML/DL & Full Stack Development
        </motion.div>

        <motion.h1
          className="max-w-5xl text-4xl font-black leading-tight text-white sm:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.28 }}
        >
          Hi, I'm{" "}
          <span className="bg-gradient-to-r from-blue-300 via-cyan-200 to-purple-300 bg-clip-text text-transparent">
            <Typewriter
              words={["Jarrar Haider Nemati", "a LangGraph Builder", "an Agentic AI Developer"]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={85}
              deleteSpeed={45}
              delaySpeed={1400}
            />
          </span>
        </motion.h1>

        <motion.p
          className="mt-6 max-w-3xl text-base leading-8 text-gray-300 sm:text-xl"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.42 }}
        >
          I build production-ready MERN applications, LangGraph-powered agentic
          systems, ML/DL experiments, and n8n automations that connect LLMs,
          APIs, and real business workflows.
        </motion.p>

        <motion.div
          className="mt-8 flex w-full max-w-md flex-col gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.56 }}
        >
          <button
            onClick={() => viewSection("projects")}
            className="group flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-7 py-4 font-bold text-white shadow-xl shadow-blue-950/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-blue-500/25"
          >
            <Code2 size={20} className="transition-transform group-hover:rotate-12" />
            View My Work
          </button>
          <button
            onClick={() => viewSection("contact")}
            className="group flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-7 py-4 font-bold text-white backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-blue-300/50 hover:bg-white/15"
          >
            <Briefcase size={20} className="transition-transform group-hover:rotate-12" />
            Hire Me
          </button>
        </motion.div>

        <motion.div
          className="mt-8 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.68 }}
        >
          {highlights.map((item) => (
            <span
              key={item.label}
              className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-gray-900/55 px-4 py-2 text-sm font-medium text-gray-200 shadow-lg shadow-black/10 backdrop-blur"
            >
              <span className="text-cyan-300">{item.icon}</span>
              {item.label}
            </span>
          ))}
        </motion.div>
      </div>

      <motion.button
        onClick={() => viewSection("about")}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-blue-300"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        aria-label="Scroll to about"
      >
        <ArrowDown size={26} />
      </motion.button>
    </section>
  )
}

export default Hero
