import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

function Contact() {
  const { ref, inView } = useInView({
    triggerOnce: true, // Ensures the animation plays only once
    threshold: 0.2, // Starts animation when 20% of the section is visible
  });

  return (
    <motion.section
      ref={ref}
      id="contact"
      className="py-20 px-10 bg-gray-900 text-white flex flex-col items-center justify-center text-center"
      initial={{ opacity: 0, y: 50 }} // Starts slightly below
      animate={inView ? { opacity: 1, y: 0 } : {}} // Moves up when in view
      transition={{ duration: 1, ease: "easeOut", type: "spring", stiffness: 100 }} // Smooth spring effect
    >
      <h2 className="text-4xl font-bold mb-6">Contact Me</h2>

      <p className="text-lg mb-4">Feel free to reach out to me via email or phone.</p>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center w-full max-w-md">
        {/* Email */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Email</h3>
          <p className="text-blue-400">jarrarnemati@gmail.com</p>
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Phone</h3>
          <p className="text-blue-400">+92 333 5406509</p>
        </div>

        {/* Social Links with Default Logos */}
        <div className="mt-6 flex justify-center space-x-6">
          {/* GitHub */}
          <a
            href="https://github.com/JarrarHaiderNemati"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 text-lg"
          >
            <img src="/git.png" alt="GitHub" className="w-6 h-6" />
            <span>GitHub</span>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/jarrar-haider-955a87285/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 text-lg"
          >
            <img src="/link.png" alt="LinkedIn" className="w-6 h-6" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </motion.section>
  );
}

export default Contact;
