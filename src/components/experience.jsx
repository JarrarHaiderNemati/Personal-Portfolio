'use client'

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { BriefcaseBusiness, Calendar, Sparkles } from "lucide-react"

function Experience() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  })

  const roles = [
    {
      period: "Summer 2025",
      title: "Full Stack Intern",
      company: "nuSoft, Pakistan",
      points: [
        "Contributed to nuTalent, nuSoft's internal HR platform, implementing frontend features with Next.js and SCSS.",
        "Built an AI-powered Resume Analyzer that parses resumes, extracts structured data, and evaluates candidate skills with LLM-driven techniques.",
        "Worked in an agile team across code reviews, feature planning, and delivery during a 2-month engagement.",
      ],
    },
    {
      period: "Summer 2024",
      title: "IT Intern",
      company: "NLC (National Logistics Corporation), Pakistan",
      points: [
        "Assisted the IT department with network configuration and maintenance tasks across operational infrastructure.",
      ],
    },
  ]

  return (
    <section
      id="experience"
      ref={ref}
      className="bg-gradient-to-b from-slate-950 via-gray-950 to-slate-950 px-5 py-24 text-white sm:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-12 max-w-3xl"
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">Experience</p>
          <h2 className="mt-4 bg-gradient-to-r from-blue-300 via-cyan-200 to-purple-300 bg-clip-text text-4xl font-black leading-tight text-transparent sm:text-5xl">
            Internship work across AI tooling, HR platforms, and IT infrastructure.
          </h2>
        </motion.div>

        <div className="grid gap-5">
          {roles.map((role, index) => (
            <motion.article
              key={`${role.company}-${role.period}`}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + index * 0.1 }}
              className="rounded-2xl border border-blue-400/15 bg-gray-900/60 p-6 shadow-xl shadow-black/20 backdrop-blur sm:p-8"
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div className="flex gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-950/30">
                    <BriefcaseBusiness size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white">{role.title}</h3>
                    <p className="mt-1 text-lg font-semibold text-cyan-200">{role.company}</p>
                  </div>
                </div>

                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-300/20 bg-blue-500/10 px-3 py-1.5 text-sm font-bold text-blue-100">
                  <Calendar size={16} />
                  {role.period}
                </div>
              </div>

              <ul className="mt-6 space-y-3 text-gray-300">
                {role.points.map((point) => (
                  <li key={point} className="flex gap-3 leading-7">
                    <Sparkles size={17} className="mt-1 shrink-0 text-cyan-300" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
