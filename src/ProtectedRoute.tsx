import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

type Props = {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'student';
};

const ProtectedRoute = ({ children, requiredRole }: Props) => {
  const { user, role } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" replace />; // or show "403 Forbidden" page
  }

  return <>{children}</>;
};

export default ProtectedRoute;
