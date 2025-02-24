import './App.css'
import Hero from './pages/Hero'
import AboutMe from './pages/About-Me'
import { Route, Routes } from 'react-router'

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Hero/>} />
        <Route path="/aboutme" element={<AboutMe/>} />
      </Routes>
    </div>
  )
}

export default App
