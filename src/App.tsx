import { Routes, Route, Navigate, useParams, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Cards from './Cards';
import Register from './Register';
import StudentList from './StudentList';
import Login from './Login';
import HubLayout from './HubLayout';
import NotFound from './NotFound';
import SignUp from './SignUp';
import { useAuth } from './AuthProvider';
import CourseProgress from './MockProgress/CourseProgress';

const AppRoutes = () => {
  const { role } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Admin-Only Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute requiredRole="admin">
            <StudentList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/students/:id"
        element={
          <ProtectedRoute requiredRole="admin">
            <StudentList />
          </ProtectedRoute>
        }
      />

      {/* Shared Route (admin or student) for Course Progress */}
      <Route
        path="/progress/:courseID/:studentID"
        element={
          <ProtectedRoute requiredRole="any">
            <CourseProgressWrapper />
          </ProtectedRoute>
        }
      />

      {/* Student Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute requiredRole="student">
            <HubLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="courses" element={<Cards />} />
        <Route path="courses/:id" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Catch-All Redirect */}
      <Route
        path="*"
        element={
          <Navigate
            to={role === 'admin' ? '/dashboard' : role === 'student' ? '/' : '/login'}
            replace
          />
        }
      />
    </Routes>
  );
};

// Wrapper for CourseProgress that reads params
const CourseProgressWrapper = () => {
  const { courseID, studentID } = useParams();
  const navigate = useNavigate();

  return (
    <CourseProgress
      courseID={Number(courseID)}
      studentID={studentID!}
      onClose={() => navigate(-1)}
    />
  );
};

export default AppRoutes;
