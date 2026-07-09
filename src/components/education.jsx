'use client'

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { BookOpen, Calendar, GraduationCap, MapPin } from 'lucide-react'

function Education() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  const coursework = ["Data Structures", "Algorithms", "Web Development", "Database Systems", "Software Engineering"]

  return (
    <section
      ref={ref}
      id="education"
      className="bg-gradient-to-b from-gray-900 to-gray-950 px-5 py-24 text-white sm:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">Education</p>
            <h2 className="mt-4 bg-gradient-to-r from-blue-300 via-cyan-200 to-purple-300 bg-clip-text text-4xl font-black leading-tight text-transparent sm:text-5xl">
              Software engineering foundation with a builder's mindset.
            </h2>
          </div>

          <div className="rounded-2xl border border-blue-400/15 bg-gray-900/60 p-6 shadow-xl shadow-black/20 backdrop-blur sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-950/30">
                <GraduationCap size={28} />
              </div>
              <div>
                <h3 className="text-3xl font-black text-white">NUST</h3>
                <p className="mt-2 text-xl font-bold text-gray-100">Bachelor's in Software Engineering</p>

                <div className="mt-5 grid gap-3 text-gray-300 sm:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-cyan-300" />
                    <span>Expected graduation: 2027</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={18} className="text-cyan-300" />
                    <span>Islamabad, Pakistan</span>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">
                    <BookOpen size={17} />
                    Relevant coursework
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {coursework.map((course) => (
                      <span
                        key={course}
                        className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-sm font-semibold text-gray-200"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Education
