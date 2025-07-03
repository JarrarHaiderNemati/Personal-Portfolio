"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ExternalLink, Play, X, Github } from "lucide-react"

function Projects() {
  const [view, setView] = useState(false)
  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")
  const [image, setImage] = useState("")
  const [video, setVideo] = useState("")
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [liveLink, setLiveLink] = useState("")
  const videoRef = useRef(null)

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Function to open project details
  const viewing = (n, d, img, vid, link = "") => {
    setName(n)
    setDesc(d)
    setImage(img)
    setVideo(vid)
    setLiveLink(link)
    setView(true)
    setIsFullScreen(false)
  }

  // Function to open video in full-screen mode
  const playFullScreenVideo = () => {
    setIsFullScreen(true)
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current
          .requestFullscreen()
          .then(() => {
            videoRef.current.play()
          })
          .catch((err) => console.error("Error attempting full-screen mode:", err))
      }
    }, 100)
  }

  // Close Fullscreen if ESC is pressed
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsFullScreen(false)
      }
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [])

  const projects = [
    {
      name: "MangoMerce",
      shortDesc: "A full fledged ecommerce platform.",
      image: "/Mangoup.png",
      video: "/MangoMerce-Demo.mp4",
      liveLink: "https://mangomerce.netlify.app",
      fullDesc:
        "MangoMerce is a full-fledged e-commerce web app built for seamless item management and smooth customer experience. It features real-time inventory control, product photo uploads, discount handling, secure user authentication, and a dynamic cashier dashboard — all crafted with a clean and responsive React frontend and a powerful Node.js + MongoDB backend.",
    },
    {
      name: "MangoChat",
      shortDesc: "A full fledged chatting platform (Work in progress).",
      image: "/Chatup.png",
      video: "/MangoChatDemo.mp4",
      liveLink: "https://chatmango.netlify.app",
      fullDesc:
        "MangoChat is a real-time chat application built with React and Socket.IO, allowing users to send private messages instantly. It features live messaging, chat history, user search, and a sleek, responsive UI — making communication smooth and interactive.",
    },
    {
      name: "Oddly Satisfying Tracker",
      shortDesc: "A platform for users to share their satisfying moments.",
      image: "/ott.png",
      video: "/tracker.mp4",
      fullDesc:
        "This platform allows users to share their uniquely satisfying moments with a community. It provides a structured global feed where users can post their experiences, categorize them, and interact with others. The interface includes features such as filtering by category, along with options to edit or delete posts. This makes it an engaging platform for those who enjoy collecting and sharing small, everyday moments that bring joy.",
    },
    {
      name: "Expense Tracker",
      shortDesc: "An advanced expense tracking system to manage finances easily.",
      image: "/expensess.png",
      video: "/exptracker.mp4",
      fullDesc:
        "A sophisticated finance management system designed to help users track their expenses efficiently. The platform displays an itemized list of expenditures, categorized based on type (such as food, groceries, or entertainment), along with corresponding costs. It also includes a feature to highlight last week's expenses, enabling users to analyze their spending patterns. The clean interface ensures easy navigation, making it a valuable tool for individuals looking to manage their finances smartly.",
    },
  ]

  return (
    <section
      id="projects"
      ref={ref}
      className="py-24 px-6 sm:px-10 bg-gradient-to-b from-gray-900 to-gray-800 text-white"
    >
      <div className="container mx-auto max-w-5xl">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl font-bold mb-4 inline-block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            My Projects
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
          <p className="text-gray-300 mt-6 max-w-2xl mx-auto">
            Here are some of my recent projects. Click on any project to learn more and see a demo.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-blue-500/50 shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
            >
              {/* Project Image with Overlay */}
              <div className="relative overflow-hidden h-56">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10"></div>
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                />

                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <div className="bg-black/60 p-3 rounded-full backdrop-blur-sm">
                    <Play className="text-white fill-white" size={30} />
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white">{project.name}</h3>
                <p className="text-gray-400 mb-4">{project.shortDesc}</p>

                {/* Links */}
                <div className="flex items-center justify-between">
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <ExternalLink size={16} className="mr-1" />
                      <span>Live Demo</span>
                    </a>
                  )}

                  <button
                    onClick={() =>
                      viewing(project.name, project.fullDesc, project.image, project.video, project.liveLink)
                    }
                    className="ml-auto text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>

              {/* Clickable overlay */}
              <div
                className="absolute inset-0 cursor-pointer z-10"
                onClick={() => viewing(project.name, project.fullDesc, project.image, project.video, project.liveLink)}
              ></div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {view && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setView(false)}
          >
            <motion.div
              className="bg-gray-900 text-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Project Image */}
              <div className="relative h-64 sm:h-80">
                <img src={image || "/placeholder.svg"} alt={name} className="w-full h-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>

                {/* Video play button */}
                {video && (
                  <button
                    onClick={playFullScreenVideo}
                    className="absolute inset-0 flex items-center justify-center group"
                  >
                    <div className="bg-black/60 p-4 rounded-full backdrop-blur-sm group-hover:bg-blue-600/80 transition-colors duration-300">
                      <Play className="text-white fill-white" size={30} />
                    </div>
                  </button>
                )}

                {/* Close button */}
                <button
                  onClick={() => setView(false)}
                  className="absolute top-4 right-4 bg-black/60 p-2 rounded-full backdrop-blur-sm hover:bg-red-600/80 transition-colors duration-300"
                >
                  <X className="text-white" size={20} />
                </button>
              </div>

              {/* Project Content */}
              <div className="p-6 sm:p-8">
                <h3 className="text-2xl font-bold mb-4">{name}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{desc}</p>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-4">
                  {video && (
                    <button
                      onClick={playFullScreenVideo}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                    >
                      <Play size={18} />
                      <span>Watch Demo</span>
                    </button>
                  )}

                  {liveLink && (
                    <a
                      href={liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                    >
                      <ExternalLink size={18} />
                      <span>Visit Site</span>
                    </a>
                  )}

                  <a
                    href="https://github.com/JarrarHaiderNemati"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                  >
                    <Github size={18} />
                    <span>View Code</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-Screen Video Mode */}
      {isFullScreen && video && (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
          <video ref={videoRef} controls autoPlay className="max-w-full max-h-full object-contain">
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <button
            onClick={() => setIsFullScreen(false)}
            className="absolute top-5 right-5 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors duration-300"
          >
            <X size={24} />
          </button>
        </div>
      )}
    </section>
  )
}

export default Projects
