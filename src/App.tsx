import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Cards from './Cards';
import Register from './Register';
import StudentList from './StudentList';
import Login from './Login';
import Dashboard from './Dashboard';
import HubLayout from './HubLayout';
import NotFound from './NotFound';
import SignUp from './SignUp';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Protected routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HubLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="courses" element={<Cards />} />
        <Route path="courses/:id" element={<Register />} />
        <Route path="students/:id" element={<StudentList />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Optional default fallback */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
