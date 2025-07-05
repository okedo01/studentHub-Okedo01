import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

type Props = {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'student' | 'any'; // 👈 allow "any"
};

const ProtectedRoute = ({ children, requiredRole }: Props) => {
  const { user, role } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Only restrict role if requiredRole is defined and not "any"
  if (requiredRole && requiredRole !== 'any' && role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
