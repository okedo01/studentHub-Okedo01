import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Cards from './Cards';
import Register from './Register';
import StudentList from './StudentList';
import NotFound from './NotFound';
import HubLayout from './HubLayout';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public + Nested routes */}
      <Route path="/" element={<HubLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="courses" element={<Cards />} />
        <Route path="courses/:id" element={<Register />} />
        <Route path="students/:id" element={<StudentList />} />
        <Route path="login" element={<Login />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
