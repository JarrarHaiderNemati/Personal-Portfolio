"use client"

import { motion } from "framer-motion"
import { ArrowUp } from "lucide-react"

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-blue-400/10 bg-gray-950 px-5 py-10 text-white sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-black">Jarrar Haider Nemati</h2>
          <p className="mt-1 text-sm text-slate-400">&copy; {currentYear} Built with React and Tailwind CSS.</p>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
          <a href="#about" className="text-sm font-semibold text-slate-400 transition hover:text-white">
            About
          </a>
          <a href="#experience" className="text-sm font-semibold text-slate-400 transition hover:text-white">
            Experience
          </a>
          <a href="#projects" className="text-sm font-semibold text-slate-400 transition hover:text-white">
            Projects
          </a>
          <a href="#courses" className="text-sm font-semibold text-slate-400 transition hover:text-white">
            Courses
          </a>
          <a href="#contact" className="text-sm font-semibold text-slate-400 transition hover:text-white">
            Contact
          </a>
          <motion.button
            onClick={scrollToTop}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-950/25 transition sm:ml-2"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            aria-label="Back to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
