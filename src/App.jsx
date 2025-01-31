import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/header.jsx'
import Contact from './components/contact.jsx'
import Hero from './components/hero.jsx'
import About from './components/about.jsx'
import Projects from './components/projects.jsx'
import Education from './components/education.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header></Header>
      <Hero></Hero>
      <About></About>
      <Education></Education>
      <Projects></Projects>
      <Contact></Contact>
    </>
  )
}

export default App
