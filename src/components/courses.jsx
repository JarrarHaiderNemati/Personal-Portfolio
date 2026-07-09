'use client'

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Award, BrainCircuit, CheckCircle2, Clock } from "lucide-react"

function Courses() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.18,
  })

  const courses = [
    {
      title: "AI Agents in LangGraph",
      provider: "DeepLearning.AI",
      status: "Completed",
      icon: <BrainCircuit size={24} />,
    },
    {
      title: "Deep Learning Specialization",
      provider: "Coursera",
      status: "In Progress",
      icon: <Clock size={24} />,
    },
    {
      title: "Retrieval-Augmented Generation",
      provider: "Coursera",
      status: "In Progress",
      icon: <Clock size={24} />,
    },
  ]

  return (
    <section
      id="courses"
      ref={ref}
      className="bg-gradient-to-b from-gray-950 via-slate-950 to-gray-950 px-5 py-24 text-white sm:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-12 max-w-3xl"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">Courses & Certificates</p>
          <h2 className="mt-4 bg-gradient-to-r from-blue-300 via-cyan-200 to-purple-300 bg-clip-text text-4xl font-black leading-tight text-transparent sm:text-5xl">
            Focused learning in agents, deep learning, and RAG systems.
          </h2>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {courses.map((course, index) => (
            <motion.article
              key={course.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
              className="rounded-2xl border border-blue-400/15 bg-gray-900/60 p-6 shadow-xl shadow-black/20 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-blue-400/35 hover:shadow-blue-950/30"
            >
              <div className="mb-5 flex items-center justify-between gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-950/30">
                  {course.icon}
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-300/15 bg-cyan-300/10 px-3 py-1 text-xs font-bold text-cyan-100">
                  {course.status === "Completed" && <CheckCircle2 size={14} />}
                  {course.status}
                </span>
              </div>

              <h3 className="text-xl font-black text-white">{course.title}</h3>
              <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-slate-300">
                <Award size={16} className="text-cyan-300" />
                {course.provider}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Courses
