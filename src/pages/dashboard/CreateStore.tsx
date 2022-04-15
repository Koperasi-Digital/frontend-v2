import { useEffect, useState } from 'react';
// material
import { styled } from '@mui/material/styles';
import { Box, Typography, Alert, AlertTitle, Container } from '@mui/material';
// hooks
import useAuth from 'hooks/useAuth';
// components
import Page from 'components/Page';
import { CreateStoreForm } from 'components/_dashboard/user/store';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 960,
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function CreateStore() {
  const { user } = useAuth();
  const [hasStore, setHasStore] = useState(false);

  useEffect(() => {
    setHasStore(user && user.storeName);
  }, [user]);

  const renderContent = () => {
    if (hasStore) {
      return (
        <Container
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
        >
          <Alert severity="error">
            <AlertTitle>Akses ditolak</AlertTitle>
            {`Anda telah memiliki toko bernama ${user?.storeName || ''}`}
          </Alert>
        </Container>
      );
    }
    return (
      <ContentStyle>
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" gutterBottom>
              Pembukaan Toko
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Silakan isi formulir berikut untuk membuka toko pada koperasi.
            </Typography>
          </Box>
        </Box>
        <CreateStoreForm />
      </ContentStyle>
    );
  };

  return (
    <Page title="Buka Toko | CoopChick" sx={{ height: '100%' }}>
      {renderContent()}
    </Page>
  );
}
