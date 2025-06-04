
import { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'investor' | 'entrepreneur' | 'philanthropist';
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { authState } = useAuth();

  if (!authState.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole && authState.userRole !== requiredRole) {
    // Redirect to appropriate dashboard if role doesn't match
    const dashboardPath = authState.userRole === 'entrepreneur' 
      ? '/entrepreneur-dashboard' 
      : '/dashboard';
    return <Navigate to={dashboardPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
