
import './App.css'
import Hero from './pages/Hero'
import { Route, Routes } from 'react-router'

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Hero/>} />
        
      </Routes>
    </div>
  )
}

export default App
