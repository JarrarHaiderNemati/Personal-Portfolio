'use client'

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Bot, BrainCircuit, Code2, Database, Server, Sparkles, Workflow } from 'lucide-react'

function About() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  })

  const skills = [
    {
      category: "Frontend",
      icon: <Code2 size={22} />,
      items: ["React", "HTML", "CSS", "Tailwind CSS"]
    },
    {
      category: "Backend",
      icon: <Server size={22} />,
      items: ["Node.js", "Express", "Socket.IO", "FastAPI"]
    },
    {
      category: "Databases",
      icon: <Database size={22} />,
      items: ["MongoDB", "MySQL"]
    },
    {
      category: "Automation",
      icon: <Workflow size={22} />,
      items: ["n8n", "Webhooks", "API Integrations"]
    },
    {
      category: "Machine Learning",
      icon: <BrainCircuit size={22} />,
      items: ["Python", "Pandas", "NumPy", "Scikit-learn", "Deep Learning", "Model Evaluation"]
    },
    {
      category: "AI / Agents",
      icon: <Bot size={22} />,
      items: ["LangGraph", "LangChain", "LLMs", "Prompt Engineering", "Agentic Systems", "RAG"]
    }
  ]

  return (
    <section
      id="about"
      ref={ref}
      className="bg-gradient-to-b from-gray-950 via-gray-900 to-slate-950 px-5 py-24 text-white sm:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">About</p>
            <h2 className="mt-4 bg-gradient-to-r from-blue-300 via-cyan-200 to-purple-300 bg-clip-text text-4xl font-black leading-tight text-transparent sm:text-5xl">
              MERN products, LangGraph agents, ML/DL, and n8n automations.
            </h2>
          </div>

          <div className="rounded-2xl border border-blue-400/15 bg-gray-900/55 p-7 text-lg leading-8 text-gray-300 shadow-xl shadow-black/20 backdrop-blur">
            <p>
              I specialise in MERN stack development, LangGraph-based agentic systems,
              workflow automation, and applied machine learning/deep learning. I build
              production-ready applications that integrate LLMs, n8n automations,
              real-time APIs, and structured backend systems.
            </p>
            <p className="mt-5">
              I am especially interested in autonomous agent workflows: systems that
              can reason, use tools, remember context, call APIs, and reduce manual
              work while still feeling simple for the people using them.
            </p>
          </div>
        </motion.div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skillGroup, index) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.12 + index * 0.05 }}
              className="rounded-2xl border border-blue-400/15 bg-gray-900/60 p-6 shadow-xl shadow-black/20 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-blue-400/35 hover:shadow-blue-950/30"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-500/15 text-cyan-300">
                  {skillGroup.icon}
                </div>
                <h3 className="text-lg font-black text-white">{skillGroup.category}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-sm font-semibold text-gray-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.35 }}
          className="mt-8 flex flex-col gap-4 rounded-2xl border border-purple-400/20 bg-gradient-to-r from-blue-500/15 to-purple-500/15 p-6 text-white shadow-xl shadow-blue-950/20 backdrop-blur sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-start gap-4">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cyan-300 text-slate-950">
              <Sparkles size={22} />
            </div>
            <div>
              <h3 className="text-xl font-black">My operating style</h3>
              <p className="mt-1 max-w-3xl text-slate-300">
                Start with the real business problem, use LangGraph or n8n where they fit, and ship intelligent systems people can actually use.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
