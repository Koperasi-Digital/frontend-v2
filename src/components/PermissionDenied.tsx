import { Container, Alert, AlertTitle } from '@mui/material';

export default function PermissionDenied() {
  return (
    <Container
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
    >
      <Alert severity="error">
        <AlertTitle>Akses Ditolak</AlertTitle>
        Anda tidak memiliki izin untuk mengakses halaman ini
      </Alert>
    </Container>
  );
}
