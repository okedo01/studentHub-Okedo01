// import { Routes, Route, Navigate } from 'react-router-dom';
// import ProtectedRoute from './ProtectedRoute';
// import Home from './Pages/Home';
// import About from './Pages/About';
// import Contact from './Pages/Contact';
// import Cards from './Cards';
// import Register from './Register';
// import StudentList from './StudentList';
// import Login from './Login';
// import Dashboard from './Dashboard';
// import HubLayout from './HubLayout'; // For students
// import NotFound from './NotFound';
// import SignUp from './SignUp';

// const AppRoutes = () => {
//   return (
//     <Routes>
//       {/* Public Routes */}
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<SignUp />} />

//       {/* Admin-Only Layout */}
//       <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute requiredRole="admin">
//             <Dashboard />
//           </ProtectedRoute>
//         }
//       />

//       {/* Student-Only Layout */}
//       <Route
//         path="/"
//         element={
//           <ProtectedRoute requiredRole="student">
//             <HubLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route index element={<Home />} />
//         <Route path="about" element={<About />} />
//         <Route path="contact" element={<Contact />} />
//         <Route path="courses" element={<Cards />} />
//         <Route path="courses/:id" element={<Register />} />
//         <Route path="students/:id" element={<StudentList />} />
//         <Route path="*" element={<NotFound />} />
//       </Route>

//       {/* Fallback route */}
//       <Route path="*" element={<Navigate to="/login" replace />} />
//     </Routes>
//   );
// };

// export default AppRoutes;





// AppRoutes.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Cards from './Cards';
import Register from './Register';
import StudentList from './StudentList';
import Login from './Login';
import Dashboard from './AdminDashboard';
import HubLayout from './HubLayout';
import NotFound from './NotFound';
import SignUp from './SignUp';
import { useAuth } from './AuthProvider';
import AdminDashboard from './AdminDashboard';

const AppRoutes = () => {
  const { role } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Admin-Only */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Student-Only Pages inside HubLayout */}
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

      {/* Admin-only Student View (outside HubLayout) */}
      <Route
        path="/students/:id"
        element={
          <ProtectedRoute requiredRole="admin">
            <StudentList />
          </ProtectedRoute>
        }
      />

      {/* Catch-All Redirect */}
      <Route path="*" element={<Navigate to={role === 'admin' ? '/dashboard' : role === 'student' ? '/' : '/login'} replace />} />
    </Routes>
  );
};

export default AppRoutes;
