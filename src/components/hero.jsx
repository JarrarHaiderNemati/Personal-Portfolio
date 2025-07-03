'use client'

import { motion } from "framer-motion"
import { Typewriter } from "react-simple-typewriter"
import { ArrowDown, Code, Briefcase } from 'lucide-react'

function Hero() {
  const viewSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  // Particle animation for background
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 10 + 5,
    duration: Math.random() * 20 + 10
  }))

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white px-6 sm:px-10 text-center pt-24 pb-16">
      {/* Animated background particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-blue-500/10"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}

      {/* Profile Image with glow effect */}
      <motion.div
        className="mb-10 relative"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.8, 
          delay: 0.2,
          type: "spring",
          stiffness: 100
        }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 blur-xl opacity-30 animate-pulse" />
        <img
          src="/Jar.jpeg"
          alt="Jarrar Haider"
          className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-blue-500/50 shadow-xl object-cover z-10"
        />
      </motion.div>

      {/* Name & Title with Typewriter Effect */}
      <motion.h1
        className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        Hi, I'm{" "}
        <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          <Typewriter
            words={["Jarrar Haider", "a Full Stack Developer", "a MERN Stack Developer"]}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={100}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </span>
      </motion.h1>

      {/* Subtitle with gradient border */}
      <motion.div
        className="inline-block mb-8 px-6 py-2 border-2 border-blue-500/30 rounded-full backdrop-blur-sm bg-gray-900/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        <p className="text-lg sm:text-xl bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent font-medium">
          Full Stack Developer | MERN Stack | React & Tailwind Enthusiast
        </p>
      </motion.div>

      {/* About Me Section */}
      <motion.p
        className="max-w-xl text-base sm:text-lg text-gray-300 mb-8 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        I am a passionate full-stack developer specializing in the MERN stack.
        I build modern, responsive, and scalable web applications with clean code
        and exceptional user experiences.
      </motion.p>

      {/* Pricing Information with highlight */}
      <motion.div
        className="max-w-md bg-gradient-to-r from-blue-900/40 to-purple-900/40 backdrop-blur-sm p-4 rounded-xl border border-blue-500/20 mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.1 }}
      >
        <p className="text-base sm:text-lg text-gray-200">
          <span className="text-yellow-400 text-xl">💰</span> I provide high-quality development services at a very affordable
          cost. My focus is on delivering great value without charging high rates!
        </p>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.3 }}
      >
        <button
          onClick={() => viewSection("projects")}
          className="group flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 w-full"
        >
          <Code size={20} className="group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-medium">View My Work</span>
        </button>
        <button
          onClick={() => viewSection("contact")}
          className="group flex items-center justify-center gap-2 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 text-white px-8 py-4 rounded-xl border border-gray-600 hover:border-gray-500 transition-all duration-300 w-full"
        >
          <Briefcase size={20} className="group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-medium">Hire Me</span>
        </button>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <ArrowDown className="text-blue-400 animate-pulse" size={24} />
      </motion.div>
    </section>
  )
}

export default Hero
