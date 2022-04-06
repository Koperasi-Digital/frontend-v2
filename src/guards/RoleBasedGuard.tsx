import { ReactNode } from 'react';
import useAuth from 'hooks/useAuth';
import PermissionDenied from 'components/PermissionDenied';

// ----------------------------------------------------------------------

type RoleBasedGuardProp = {
  accessibleRoles: string[];
  children: ReactNode | string;
};

const useCurrentRole = (): string | undefined => {
  const { currentRole } = useAuth();
  if (currentRole) {
    return currentRole.name;
  }
};

export default function RoleBasedGuard({ accessibleRoles, children }: RoleBasedGuardProp) {
  const currentRole = useCurrentRole();

  if (!currentRole || !accessibleRoles.includes(currentRole)) {
    return <PermissionDenied />;
  }

  return <>{children}</>;
}
