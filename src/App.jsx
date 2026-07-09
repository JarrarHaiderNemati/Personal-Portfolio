import './App.css'
import Header from './components/header.jsx'
import Contact from './components/contact.jsx'
import Hero from './components/hero.jsx'
import About from './components/about.jsx'
import Experience from './components/experience.jsx'
import Projects from './components/projects.jsx'
import Education from './components/education.jsx'
import Courses from './components/courses.jsx'
import Footer from './components/footer.jsx'

function App() {
  return (
    <main className="min-h-screen bg-[#0d1117] text-slate-100">
      <Header></Header>
      <Hero></Hero>
      <About></About>
      <Experience></Experience>
      <Projects></Projects>
      <Education></Education>
      <Courses></Courses>
      <Contact></Contact>
      <Footer></Footer>
    </main>
  )
}

export default App
