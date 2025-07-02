// import Home from './Pages/Home'
// import './App.css'
// import { Routes, Route } from 'react-router-dom'
// import About from './Pages/About'
// import Cards from './Cards'
// import Register from './Register'
// import NotFound from './NotFound'
// import HubLayout from './HubLayout'
// import Contact from './Pages/Contact'
// import StudentList from './StudentList'

// function App() {

//   return (
//     <div>
//       <Routes>
//         <Route path="/" element={<HubLayout />}>
//           <Route index element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/courses" element={<Cards />} />
//           <Route path="/courses/:id" element={<Register />} />
//           <Route path="/students/:id" element={<StudentList />} />
//           <Route path="*" element={<NotFound />} />
//         </Route>
//       </Routes>
//     </div>
//   )
// }

// export default App



import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Cards from './Cards';
import Register from './Register';
import NotFound from './NotFound';
import HubLayout from './HubLayout';
import StudentList from './StudentList';
import Dashboard from './Dashboard'; 
import ProtectedRoute from './ProtectedRoute'; 
import './App.css';
import { Routes, Route } from 'react-router-dom';

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
          <Route path="/students/:id" element={<StudentList />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
