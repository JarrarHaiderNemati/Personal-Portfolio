"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Github, Linkedin, Mail, Phone, Send } from "lucide-react"

function Contact() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const subject = encodeURIComponent(`Portfolio inquiry from ${formState.name}`)
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`
    )
    window.location.href = `mailto:jarrarnemati@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <motion.section
      ref={ref}
      id="contact"
      className="bg-gradient-to-b from-gray-950 via-slate-950 to-gray-950 px-5 py-24 text-white sm:px-8"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.7 }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">Contact</p>
            <h2 className="mt-4 bg-gradient-to-r from-blue-300 via-cyan-200 to-purple-300 bg-clip-text text-4xl font-black leading-tight text-transparent sm:text-5xl">
              Have an app, workflow, or AI idea to build?
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              Send the basics and your email app will open with everything formatted.
              I am open to freelance projects, internships, and full-time roles around MERN,
              LangGraph agents, ML/DL, n8n automation, and agentic AI systems.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href="mailto:jarrarnemati@gmail.com"
                className="flex items-center gap-4 rounded-2xl border border-blue-400/15 bg-gray-900/55 p-4 shadow-lg shadow-black/10 backdrop-blur transition hover:-translate-y-1 hover:bg-blue-500/10"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  <Mail size={21} />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-slate-400">Email</span>
                  <span className="break-all font-bold text-white">jarrarnemati@gmail.com</span>
                </span>
              </a>

              <a
                href="tel:+923335406509"
                className="flex items-center gap-4 rounded-2xl border border-blue-400/15 bg-gray-900/55 p-4 shadow-lg shadow-black/10 backdrop-blur transition hover:-translate-y-1 hover:bg-blue-500/10"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  <Phone size={21} />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-slate-400">Phone</span>
                  <span className="font-bold text-white">+92 333 5406509</span>
                </span>
              </a>
            </div>

            <div className="mt-6 flex gap-3">
              <a
                href="https://github.com/JarrarHaiderNemati"
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-11 w-11 place-items-center rounded-xl border border-blue-400/15 bg-white/10 text-white transition hover:-translate-y-1 hover:bg-blue-500/20"
                aria-label="GitHub"
              >
                <Github size={22} />
              </a>
              <a
                href="https://www.linkedin.com/in/jarrar-haider-nemati-955a87285/"
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-11 w-11 place-items-center rounded-xl border border-blue-400/15 bg-white/10 text-white transition hover:-translate-y-1 hover:bg-blue-500/20"
                aria-label="LinkedIn"
              >
                <Linkedin size={22} />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-2xl border border-blue-400/15 bg-gray-900/60 p-6 shadow-2xl shadow-black/25 backdrop-blur sm:p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-bold text-slate-200">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-bold text-slate-200">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-bold text-slate-200">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full resize-none rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400"
                  placeholder="Tell me what you want to build..."
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-5 py-3 font-black text-white shadow-xl shadow-blue-950/30 transition hover:-translate-y-1 hover:shadow-blue-500/20"
              >
                <Send size={18} />
                Send email
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default Contact
