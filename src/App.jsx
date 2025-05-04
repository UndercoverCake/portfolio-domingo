import "./App.css"
import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Hero from "./pages/Hero"
import AboutMe from "./pages/About-Me"
import Blog from "./pages/Blog"
import BlogPost from "./pages/BlogPost"
import Projects from "./pages/Projects"
import Contact from "./pages/Contact"
import TechParticles from "./components/TechParticles"
import GlowEffect from "./components/GlowEffect"

function App() {
  return (
    <div>
      <TechParticles />
      <GlowEffect />
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/aboutme" element={<AboutMe />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  )
}

export default App
