import { ReactNode } from 'react';
import { Container, Alert, AlertTitle, Button, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
// types
import { Role } from '../@types/role';
// hooks
import useAuth from '../hooks/useAuth';
import { PATH_DASHBOARD } from 'routes/paths';

// ----------------------------------------------------------------------

interface SellerPermissionDeniedProps {
  isMember: boolean;
}

function SellerPermissionDenied({ isMember }: SellerPermissionDeniedProps) {
  return (
    <Container
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
    >
      <Alert severity="error">
        <AlertTitle>Akses Ditolak</AlertTitle>
        <Typography variant="body1" gutterBottom>
          Halaman ini hanya dapat diakses oleh anggota koperasi yang memiliki toko
        </Typography>
        <Box display="flex" justifyContent="flex-end">
          {isMember ? (
            <Button
              variant="contained"
              size="small"
              color="error"
              component={Link}
              to={PATH_DASHBOARD.user.createStore}
            >
              Buka toko
            </Button>
          ) : (
            <Button
              variant="contained"
              size="small"
              color="error"
              component={Link}
              to={PATH_DASHBOARD.user.memberVerification.request}
            >
              Request menjadi anggota koperasi
            </Button>
          )}
        </Box>
      </Alert>
    </Container>
  );
}

type SellerGuardProps = {
  children: ReactNode;
};

export default function SellerGuard({ children }: SellerGuardProps) {
  const { user, isSeller } = useAuth();
  const isMember = user && user.roles.map((role: Role) => role.name).includes('MEMBER');

  if (!isMember || !isSeller) {
    return <SellerPermissionDenied isMember={isMember} />;
  }

  return <>{children}</>;
}
