import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { PATH_AUTH } from 'routes/paths';
// hooks
import useAuth from '../hooks/useAuth';

// ----------------------------------------------------------------------

type AuthGuardProps = {
  children: ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={PATH_AUTH.login} />;
  }

  return <>{children}</>;
}
