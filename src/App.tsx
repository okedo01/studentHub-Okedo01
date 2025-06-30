import Home from './Pages/Home'
import './App.css'
import Navbar from './Navbar'
import { Routes, Route } from 'react-router-dom'
import About from './Pages/About'
import { Contact } from 'lucide-react'
import Cards from './Cards'
import Register from './Register'

function App() {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/courses" element={<Cards />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}

export default App
