'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Download, Menu, X } from 'lucide-react'

function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleScroll =() => {
    setMobileMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gray-900/95 backdrop-blur-md shadow-lg py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Jarrar's Portfolio
          </h1>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.nav 
          className="hidden md:block"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ul className="flex space-x-8">
            {['about', 'projects', 'education', 'contact'].map((item, index) => (
              <li key={item}>
                <button 
                  onClick={() => handleScroll(item)} 
                  className="relative text-gray-300 hover:text-white transition-colors duration-300 group"
                >
                  <span className="capitalize">{item}</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                </button>
              </li>
            ))}
          </ul>
        </motion.nav>

        {/* Resume Button */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="hidden md:block"
        >
          <a 
            href="/Jarrar_Resume.pdf" 
            target="_blank" 
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-5 py-2.5 rounded-full shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
          >
            <Download size={16} />
            <span>Resume</span>
          </a>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          className="md:hidden bg-gray-800 shadow-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto py-4 px-6 flex flex-col space-y-4">
            <ul className="flex flex-col space-y-3">
              {['about', 'projects', 'education', 'contact'].map((item) => (
                <li key={item}>
                  <button 
                    onClick={() => handleScroll(item)} 
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300 capitalize w-full text-left py-2"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
            <a 
              href="/Jarrar_Resume.pdf" 
              target="_blank" 
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full"
            >
              <Download size={16} />
              <span>Download Resume</span>
            </a>
          </div>
        </motion.div>
      )}
    </header>
  )
}

export default Header
