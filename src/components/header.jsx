function Header() {

  const handleScroll=(id)=>{
    document.getElementById(id).scrollIntoView({behavior:'smooth'});
  }

  return (
    <header className="bg-gray-900 text-white p-4 shadow-md fixed w-full">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Portfolio Name / Logo */}
        <h1 className="text-2xl font-bold">Jarrar's Portfolio</h1>

        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-6">
            <li><button onClick={() => handleScroll('about')} className="hover:text-blue-400">About</button></li>
            <li><button onClick={() => handleScroll('projects')} className="hover:text-blue-400">Projects</button></li>
            <li><button onClick={() => handleScroll('contact')} className="hover:text-blue-400">Contact</button></li>
          </ul>
        </nav>

        {/* Resume Download Button */}
        <a href="/Jarrar_Resume.pdf" target="_blank" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
          Download Resume
        </a>

      </div>
    </header>
  );
}

export default Header;
