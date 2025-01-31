function Header() {
  const handleScroll = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="bg-gray-900 text-white p-4 shadow-md fixed w-full z-50">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between px-4">
        {/* Portfolio Name / Logo */}
        <h1 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-0">Jarrar's Portfolio</h1>

        {/* Navigation Links */}
        <nav>
          <ul className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 text-center">
            <li><button onClick={() => handleScroll('about')} className="hover:text-blue-400">About</button></li>
            <li><button onClick={() => handleScroll('projects')} className="hover:text-blue-400">Projects</button></li>
            <li><button onClick={() => handleScroll('contact')} className="hover:text-blue-400">Contact</button></li>
          </ul>
        </nav>

        {/* Resume Download Button */}
        <a href="/Jarrar_Resume.pdf" target="_blank" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
          Download Resume
        </a>
      </div>
    </header>
  );
}

export default Header;
