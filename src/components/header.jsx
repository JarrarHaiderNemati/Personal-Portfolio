'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Download, Menu, X } from 'lucide-react'

function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navItems = ['about', 'experience', 'projects', 'education', 'contact']

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleScroll = (id) => {
    setMobileMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header 
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'border-b border-blue-400/10 bg-gray-950/85 py-3 shadow-2xl shadow-black/20 backdrop-blur-xl' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 text-left"
            aria-label="Back to top"
          >
            <span className="grid h-10 w-10 place-items-center rounded-full border border-blue-300/30 bg-gradient-to-br from-blue-500/30 to-purple-500/30 text-sm font-bold text-white shadow-lg shadow-blue-950/30">
              JH
            </span>
            <span className="hidden sm:block">
              <span className="block text-sm font-semibold text-white">Jarrar Haider Nemati</span>
              <span className="block text-xs text-slate-400">AI-Powered Full Stack Developer</span>
            </span>
          </button>
        </motion.div>

        <motion.nav 
          className="hidden md:block"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ul className="flex items-center rounded-full border border-blue-300/15 bg-gray-900/45 p-1 shadow-lg shadow-black/10 backdrop-blur">
            {navItems.map((item) => (
              <li key={item}>
                <button 
                  onClick={() => handleScroll(item)} 
                  className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition-colors duration-300 hover:bg-blue-500/20 hover:text-white"
                >
                  <span className="capitalize">{item}</span>
                </button>
              </li>
            ))}
          </ul>
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="hidden md:block"
        >
          <a 
            href="/Final_cv.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-950/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-blue-500/25"
          >
            <Download size={16} />
            <span>CV</span>
          </a>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid h-10 w-10 place-items-center rounded-full border border-blue-300/20 bg-white/10 text-white md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {mobileMenuOpen && (
        <motion.div 
          className="mx-4 mt-3 rounded-2xl border border-blue-300/15 bg-gray-900/95 shadow-2xl backdrop-blur-xl md:hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col space-y-4 px-5 py-4">
            <ul className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <li key={item}>
                  <button 
                    onClick={() => handleScroll(item)} 
                    className="w-full rounded-xl px-3 py-2 text-left capitalize text-slate-300 transition-colors duration-300 hover:bg-blue-500/20 hover:text-white"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
            <a 
              href="/Final_cv.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-3 font-semibold text-white"
            >
              <Download size={16} />
              <span>Download CV</span>
            </a>
          </div>
        </motion.div>
      )}
    </header>
  )
}

export default Header
