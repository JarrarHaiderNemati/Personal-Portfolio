'use client'

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { GraduationCap, Calendar, MapPin } from 'lucide-react'

function Education() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  return (
    <section
      ref={ref}
      id="education"
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
            Education
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </motion.div>

        {/* Education card */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Timeline line */}
          <div className="absolute left-0 sm:left-1/2 transform sm:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
          
          {/* Education card */}
          <div className="relative ml-8 sm:ml-0 sm:flex sm:justify-center">
            <div className="absolute left-0 sm:left-1/2 transform -translate-x-[calc(50%+16px)] sm:-translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <GraduationCap className="text-white" size={16} />
            </div>
            
            <div className="sm:w-5/12 sm:mr-8 sm:ml-auto bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl border border-blue-500/20 shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-lg bg-blue-500/10 mr-4">
                  <GraduationCap className="text-blue-400" size={24} />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  NUST
                </h3>
              </div>
              
              <p className="text-lg font-medium text-white mb-2">
                Bachelor's in Software Engineering
              </p>
              
              <div className="flex items-center text-gray-400 mb-1">
                <Calendar size={16} className="mr-2" />
                <span>Expected Graduation: 2027</span>
              </div>
              
              <div className="flex items-center text-gray-400 mb-4">
                <MapPin size={16} className="mr-2" />
                <span>Islamabad, Pakistan</span>
              </div>
              
              <p className="text-gray-300 leading-relaxed">
                Currently studying Software Engineering at the National University of Sciences and Technology (NUST), 
                one of Pakistan's premier technical institutions. Focusing on web development and constantly working 
                on projects to enhance my expertise in full-stack development.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Education
