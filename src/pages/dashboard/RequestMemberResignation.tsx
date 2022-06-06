import { useEffect, useState } from 'react';
// material
import { styled } from '@mui/material/styles';
import { Alert, AlertTitle, Box, Container, Typography } from '@mui/material';
// utils
import axios from 'utils/axios';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from 'hooks/useAuth';
// components
import Page from 'components/Page';
import { RequestMemberResignationForm } from 'components/_dashboard/user/member-resignation';

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

export default function RequestMemberResignation() {
  const { user } = useAuth();
  const [isMember, setIsMember] = useState(false);
  const [memberResignation, setMemberResignation] = useState<any>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const getUserMemberResignation = (userId: number) => {
  //   axios
  //     .get(`member-resignation/${userId}`)
  //     .then((response) => {
  //       setMemberResignation(response.data.payload);
  //     })
  //     .catch((err) => setMemberResignation(undefined));
  // };

  // useEffect(() => {
  //   if (user) {
  //     getUserMemberResignation(user.id);
  //   }
  // }, [user]);

  useEffect(() => {
    if (user && user.roles) {
      setIsMember(user.roles.map((role: any) => role.name).includes('MEMBER'));
    }
  }, [user]);

  const renderContent = () => {
    if (isMember) {
      return (
        <ContentStyle>
          {memberResignation ? (
            <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
                  Pengunduran Keanggotaan Koperasi
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  Request pengunduran diri dari keanggotaan koperasi telah dikirimkan kepada Admin
                </Typography>
                <LoadingButton
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                  sx={{ my: 3 }}
                >
                  Batalkan
                </LoadingButton>
              </Box>
            </Box>
          ) : (
            <>
              <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h4" gutterBottom>
                    Pengunduran Keanggotaan Koperasi
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    Silakan isi formulir berikut untuk request pengunduran diri dari keanggotaan
                    koperasi.
                  </Typography>
                </Box>
              </Box>
              <RequestMemberResignationForm />
            </>
          )}
        </ContentStyle>
      );
    }
    return (
      <Container
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
      >
        <Alert severity="error">
          <AlertTitle>Akses ditolak</AlertTitle>
          Anda tidak memiliki <i>role</i> sebagai Anggota Koperasi
        </Alert>
      </Container>
    );
  };

  return (
    <Page title="Pengunduran Keanggotaan Koperasi | CoopChick" sx={{ height: '100%' }}>
      <Container sx={{ height: 'inherit' }}>{renderContent()}</Container>
    </Page>
  );
}
