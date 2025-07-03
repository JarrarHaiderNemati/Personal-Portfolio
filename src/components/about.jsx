'use client'

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Code, Server, GitBranch, Zap } from 'lucide-react'

function About() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  const skills = [
    { 
      category: "Frontend", 
      icon: <Code className="text-blue-400" size={24} />,
      items: ["React.js", "Tailwind CSS", "JavaScript", "Responsive Design"]
    },
    { 
      category: "Backend", 
      icon: <Server className="text-purple-400" size={24} />,
      items: ["Node.js", "Express.js", "REST APIs", "MongoDB", "MySQL"]
    },
    { 
      category: "Other", 
      icon: <GitBranch className="text-green-400" size={24} />,
      items: ["Git/GitHub", "Deployment", "CI/CD", "Problem Solving"]
    }
  ]

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 px-6 sm:px-10 bg-gradient-to-b from-gray-800 to-gray-900 text-white"
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
            About Me
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* About text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-blue-500/20 shadow-xl h-full">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Zap className="text-yellow-400 mr-3" size={24} />
                <span>My Journey</span>
              </h3>
              
              <div className="space-y-6 text-gray-300">
                <p className="leading-relaxed">
                  I'm a self-taught full-stack developer with a strong focus on the <span className="text-blue-400 font-medium">MERN stack</span> (MongoDB, Express.js, React, Node.js). 
                  Even though I'm relatively new to the industry, I have built several projects that showcase my ability 
                  to develop functional, modern, and responsive web applications.
                </p>
                
                <p className="leading-relaxed">
                  What sets me apart is my <span className="text-blue-400 font-medium">dedication, strong learning mindset, and problem-solving skills</span>. 
                  I focus on writing <span className="text-blue-400 font-medium">clean, efficient code</span> and delivering high-quality projects.
                </p>
                
                <p className="leading-relaxed">
                  Plus, I offer my services at <span className="text-yellow-400 font-medium">an affordable cost</span> without compromising on quality!
                </p>
                
                <div className="pt-4 border-t border-gray-700">
                  <p className="flex items-center">
                    <span className="text-xl mr-2">🎯</span>
                    I enjoy learning about new technologies and building projects that challenge my skills.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="space-y-6"
          >
            {skills.map((skillGroup, index) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-blue-500/20 shadow-xl"
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-lg bg-gray-700/50 mr-3">
                    {skillGroup.icon}
                  </div>
                  <h3 className="text-xl font-bold">{skillGroup.category}</h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <span 
                      key={skill}
                      className="px-3 py-1 bg-gray-700/50 rounded-full text-sm font-medium text-gray-200 border border-gray-600/50"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
