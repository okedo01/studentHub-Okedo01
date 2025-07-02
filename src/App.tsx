import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import ProtectedRoute from './ProtectedRoute';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Cards from './Cards';
import Register from './Register';
import StudentList from './StudentList';
import NotFound from './NotFound';
import HubLayout from './HubLayout';
import AdminDashboard from './AdminDashboard';
import LogIn from './Login';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public + Nested routes under HubLayout */}
      <Route path="/" element={<HubLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="courses" element={<Cards />} />
        <Route path="courses/:id" element={<Register />} />
        <Route path="students/:id" element={<StudentList />} />
        <Route path="/login" element={<LogIn />} />

        {/* ✅ Protected dashboard (any authenticated user) */}
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* ✅ Admin-only dashboard */}
        <Route
          path="admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
