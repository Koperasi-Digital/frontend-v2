import { ReactNode } from 'react';
import { Container, Alert, AlertTitle } from '@mui/material';
import useAuth from 'hooks/useAuth';

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
    return (
      <Container
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
      >
        <Alert severity="error">
          <AlertTitle>Permission Denied</AlertTitle>
          You do not have permission to access this page
        </Alert>
      </Container>
    );
  }

  return <>{children}</>;
}
