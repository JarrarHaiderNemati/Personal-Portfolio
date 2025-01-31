import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

function About() {
  const { ref, inView } = useInView({
    triggerOnce: true, // Only triggers once when it comes into view
    threshold: 0.2, // Fires when 20% of the section is visible
  });

  return (
    <motion.section
      id="about"
      ref={ref}
      className="py-20 px-10 bg-gray-900 text-white flex flex-col items-center justify-center text-center"
      initial={{ opacity: 0, y: 50 }} // Start hidden and slightly below
      animate={inView ? { opacity: 1, y: 0 } : {}} // Animate only when in view
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Section Title */}
      <h2 className="text-4xl font-bold mb-6">More About Me</h2>

      {/* Learning Journey */}
      <p className="max-w-2xl text-lg text-gray-400 mb-6">
        I'm a self-taught full-stack developer with a strong focus on the <strong>MERN stack</strong> (MongoDB, Express.js, React, Node.js).  
        Even though I'm relatively new to the industry, I have built several projects that showcase my ability  
        to develop functional, modern, and responsive web applications.
      </p>

      {/* Technical Skills */}
      <div className="max-w-2xl text-lg text-gray-400 mb-6">
        <p><strong>💡 Frontend:</strong> React.js, Tailwind CSS, JavaScript, Responsive Design</p>
        <p><strong>⚙️ Backend:</strong> Node.js, Express.js, REST APIs, MongoDB, MySQL</p>
        <p><strong>🔗 Other:</strong> Git/GitHub, Deployment</p>
      </div>

      {/* What Makes You Unique? */}
      <p className="max-w-2xl text-lg text-gray-300 mb-6">
        I have <strong>dedication, a strong learning mindset, and problem-solving skills</strong>.  
        I focus on writing <strong>clean, efficient code</strong> and delivering high-quality projects.  
        Plus, I offer my services at <strong>an affordable cost</strong> without compromising on quality!
      </p>

      {/* Personal Touch */}
      <p className="text-gray-400 mt-6">
        🎯 I enjoy learning about new technologies and building projects that challenge my skills.
      </p>
    </motion.section>
  );
}

export default About;
