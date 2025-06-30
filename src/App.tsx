import Home from './Pages/Home'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import About from './Pages/About'
import { Contact } from 'lucide-react'
import Cards from './Cards'
import Register from './Register'
import NotFound from './NotFound'
import HubLayout from './HubLayout'

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<HubLayout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/courses" element={<Cards />} />
          <Route path="/courses/:id" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
