import { useState, useRef, useEffect } from "react";

function Projects() {
  const [view, setView] = useState(false);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState('');
  const [video, setVideo] = useState('');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const videoRef = useRef(null);

  // Function to open project details
  const viewing = (n, d, img, vid) => {
    setName(n);
    setDesc(d);
    setImage(img);
    setVideo(vid);
    setView(true);
    setIsFullScreen(false);
  };

  // Function to open video in full-screen mode automatically
  const playFullScreenVideo = () => {
    setIsFullScreen(true);

    // Wait for state update, then play video in full screen
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.requestFullscreen()
          .then(() => {
            videoRef.current.play(); // Start playing automatically
          })
          .catch(err => console.error("Error attempting full-screen mode:", err));
      }
    }, 100);
  };

  // Close Fullscreen if ESC is pressed
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsFullScreen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <section id="projects" className="py-20 px-10 bg-gray-900 text-white text-center relative">
      {/* Section Title */}
      <h2 className="text-4xl font-bold mb-6">My Projects</h2>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 justify-center items-center">
        {/* Project 1 */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <img 
            src="/ott.png" 
            alt="Oddly Satisfying Tracker" 
            className="w-full h-40 object-cover rounded-md mb-4 cursor-pointer"
          />
          <h3 className="text-xl font-semibold">Oddly Satisfying Tracker</h3>
          <p className="text-gray-400">A platform for users to share their satisfying moments.</p>
          <div 
            onClick={() => viewing("Oddly Satisfying Tracker", "This platform allows users to share their uniquely satisfying moments with a community. It provides a structured global feed where users can post their experiences, categorize them, and interact with others. The interface includes features such as filtering by category, along with options to edit or delete posts. This makes it an engaging platform for those who enjoy collecting and sharing small, everyday moments that bring joy.", "/ott.png", "/tracker.mp4")}
            className="text-blue-400 hover:underline block mt-2 cursor-pointer"
          >
            View Project
          </div>
        </div>

        {/* Project 2 */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <img 
            src="/expensess.png" 
            alt="Expense Tracker" 
            className="w-full h-40 object-cover rounded-md mb-4 cursor-pointer"
          />
          <h3 className="text-xl font-semibold">Expense Tracker</h3>
          <p className="text-gray-400">An advanced expense tracking system to manage finances easily.</p>
          <div 
            onClick={() => viewing("Expense Tracker", "A sophisticated finance management system designed to help users track their expenses efficiently. The platform displays an itemized list of expenditures, categorized based on type (such as food, groceries, or entertainment), along with corresponding costs. It also includes a feature to highlight last week’s expenses, enabling users to analyze their spending patterns. The clean interface ensures easy navigation, making it a valuable tool for individuals looking to manage their finances smartly.", "/expensess.png", "/exptracker.mp4")}
            className="text-blue-400 hover:underline block mt-2 cursor-pointer"
          >
            View Project
          </div>
        </div>
      </div>

      {/* Overlay & Popup */}
      {view && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50">
          {/* Popup Content */}
          <div className="bg-white text-gray-900 p-6 rounded-lg shadow-lg max-w-md w-full text-center relative">
            
            {/* Project Thumbnail (Click to Open Fullscreen Video) */}
            <img 
              src={image} 
              alt={name} 
              className="cursor-pointer w-full h-48 object-cover rounded-t-lg mb-4 transition-transform hover:scale-105"
              onClick={playFullScreenVideo} // Clicking the image starts full-screen video
            />

            {/* Project Title */}
            <h3 className="text-2xl font-bold mb-2">{name}</h3>

            {/* Project Description */}
            <p className="text-gray-700 mb-4">{desc}</p>

            {/* Hide Button */}
            <button onClick={() => setView(false)} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Hide
            </button>
          </div>
        </div>
      )}

      {/* Full-Screen Video Mode */}
      {isFullScreen && (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
          <video ref={videoRef} controls autoPlay className="max-w-full max-h-full object-contain">
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <button 
            onClick={() => setIsFullScreen(false)} 
            className="absolute top-5 right-5 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700">
            Close Video
          </button>
        </div>
      )}
    </section>
  );
}

export default Projects;
