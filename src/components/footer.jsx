"use client"

import { motion } from "framer-motion"
import { ArrowUp } from "lucide-react"

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white py-12 px-6 border-t border-gray-800">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and copyright */}
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
              Jarrar Haider
            </h2>
            <p className="text-gray-400 text-sm">&copy; {currentYear} All rights reserved.</p>
          </div>

          {/* Quick links */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-medium mb-3 text-center md:text-left">Quick Links</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#about" className="text-gray-400 hover:text-blue-400 transition-colors">
                About
              </a>
              <a href="#projects" className="text-gray-400 hover:text-blue-400 transition-colors">
                Projects
              </a>
              <a href="#education" className="text-gray-400 hover:text-blue-400 transition-colors">
                Education
              </a>
              <a href="#contact" className="text-gray-400 hover:text-blue-400 transition-colors">
                Contact
              </a>
            </div>
          </div>

          {/* Back to top button */}
          <motion.button
            onClick={scrollToTop}
            className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-1"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp size={20} />
          </motion.button>
        </div>

        {/* Bottom text */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Designed and developed by Jarrar Haider</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
