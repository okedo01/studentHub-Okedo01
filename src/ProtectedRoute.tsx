// // import React from 'react'
// // import { Navigate } from 'react-router-dom'
// // import { useAuth } from './AuthProvider'

// // const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
// //   const { isAuthenticated } = useAuth()

// //   return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
// // }

// // export default ProtectedRoute



// // ProtectedRoute.tsx
// import { Navigate } from 'react-router-dom';
// import { useAuth } from './AuthProvider';

// const ProtectedRoute: React.FC<{ children: React.ReactNode; role?: 'admin' | 'student' }> = ({ children, role }) => {
//   const { user } = useAuth();

//   if (!user) return <Navigate to="/login" replace />;
//   if (role && user.role !== role) return <Navigate to="/" replace />;

//   return <>{children}</>;
// };

// export default ProtectedRoute;



import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
