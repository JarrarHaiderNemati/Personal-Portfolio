import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

function Hero() {
  const viewSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white p-10 text-center">
      {/* Name & Title with Typewriter Effect */}
      <motion.h1
        className="text-5xl font-bold mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        Hi, I'm{" "}
        <span className="text-blue-400">
          <Typewriter
            words={["Jarrar Haider", "a Full Stack Developer", "a MERN Stack Developer"]}
            loop={0} // Infinite loop
            cursor
            cursorStyle="|"
            typeSpeed={100} // Speed of typing
            deleteSpeed={50} // Speed of deleting
            delaySpeed={1500} // Delay before retyping
          />
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-xl text-gray-300 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
      >
        Full Stack Developer | MERN Stack | React & Tailwind Enthusiast
      </motion.p>

      {/* About Me Section */}
      <motion.p
        className="max-w-2xl text-lg text-gray-400 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
      >
        I am a passionate full-stack developer specializing in the MERN stack
        (MongoDB, Express.js, React, Node.js). With a strong foundation in
        frontend and backend development, I build modern, responsive, and
        scalable web applications. My expertise in React.js & Tailwind CSS
        allows me to craft visually stunning and user-friendly interfaces.
      </motion.p>

      {/* Pricing Information */}
      <motion.p
        className="max-w-xl text-lg text-gray-300 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
      >
        💰 I provide high-quality development services at a very affordable
        cost. My focus is on delivering great value without charging high rates!
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        className="flex space-x-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
      >
        <div
          onClick={() => viewSection("projects")}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 cursor-pointer"
        >
          View My Work
        </div>
        <div
          onClick={() => viewSection("contact")}
          className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-600 cursor-pointer"
        >
          Hire Me
        </div>
      </motion.div>

      {/* Profile Image Animation */}
      <motion.div
        className="mt-10"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1, ease: "easeOut" }}
      >
        <img
          src="/Jar.jpeg"
          alt="Jarrar Haider"
          className="w-40 h-40 rounded-full border-4 border-blue-500 shadow-lg"
        />
      </motion.div>
    </section>
  );
}

export default Hero;
