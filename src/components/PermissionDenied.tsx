import { Container, Alert, AlertTitle } from '@mui/material';

export default function PermissionDenied() {
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
