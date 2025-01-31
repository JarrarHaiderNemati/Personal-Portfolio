import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

function Education() {
  const { ref, inView } = useInView({
    triggerOnce: true, // Triggers only once when it appears
    threshold: 0.2, // Starts animation when 20% of the section is visible
  });

  return (
    <motion.section
      ref={ref}
      id="education"
      className="py-20 px-10 bg-gray-900 text-white flex flex-col items-center justify-center text-center"
      initial={{ opacity: 0, x: -100 }} // Starts hidden and shifted left
      animate={inView ? { opacity: 1, x: 0 } : {}} // Moves into place when in view
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Section Title */}
      <h2 className="text-4xl font-bold mb-6">Education</h2>

      {/* Education Details */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center w-full max-w-md">
        <h3 className="text-xl font-semibold">NUST</h3>
        <p className="text-gray-400">Bachelor’s in Software Engineering</p>
        <p className="text-gray-400">Expected Graduation: 2027</p>
      </div>

      {/* Short Description */}
      <p className="max-w-2xl text-lg text-gray-300 mt-6">
        I am currently studying Software Engineering at National University Of Sciences And Technology (NUST) and  
        expect to graduate in 2027. Passionate about web development, I am constantly  
        improving my skills and working on projects to enhance my expertise in full-stack development.
      </p>
    </motion.section>
  );
}

export default Education;
