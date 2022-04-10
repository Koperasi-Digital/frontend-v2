import { useEffect, useState } from 'react';
// material
import { styled } from '@mui/material/styles';
import { Alert, AlertTitle, Box, Container, Typography, Card, Grid, Button } from '@mui/material';
// utils
import axios from 'utils/axios';
// hooks
import useAuth from 'hooks/useAuth';
// components
import Page from 'components/Page';
import { RequestMemberVerificationForm } from 'components/_dashboard/user/member-verification';

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

const ImgStyle = styled('img')(() => ({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  position: 'absolute'
}));

export default function RequestMemberVerification() {
  const { user } = useAuth();
  const [isCustomer, setIsCustomer] = useState(false);
  const [memberVerification, setMemberVerification] = useState<any>();
  const [isEdit, setIsEdit] = useState(false);

  const getUserMemberVerification = (userId: number) => {
    axios
      .get(`member-verification/${userId}`)
      .then((response) => {
        setMemberVerification(response.data.payload);
      })
      .catch((err) => setMemberVerification(undefined));
  };

  useEffect(() => {
    if (user) {
      getUserMemberVerification(user.id);
    }
  }, [user]);

  useEffect(() => {
    if (user && user.roles) {
      setIsCustomer(user.roles.length === 1 && user.roles[0].name === 'CUSTOMER');
    }
  }, [user]);

  const renderContent = () => {
    if (isCustomer) {
      return (
        <ContentStyle>
          {memberVerification ? (
            <>
              <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h4" gutterBottom>
                    Request Keanggotaan Koperasi
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    Data verifikasi telah dikirimkan pada Admin Koperasi
                  </Typography>
                </Box>
              </Box>
              {isEdit ? (
                <RequestMemberVerificationForm
                  initialData={{
                    identityCardPhotoURL: memberVerification.identityCardPhotoURL,
                    selfiePhotoURL: memberVerification.selfiePhotoURL
                  }}
                />
              ) : (
                <Card sx={{ p: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                        Data Verifikasi
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        Nama
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={9}>
                      <Typography variant="body1">{user?.displayName || '-'}</Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        Email
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={9}>
                      <Typography variant="body1">{user?.email || '-'}</Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        Foto KTP
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={9}>
                      <Box sx={{ pt: '50%', position: 'relative' }}>
                        <ImgStyle alt="Foto KTP" src={memberVerification.identityCardPhotoURL} />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        Foto Selfie dengan KTP
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={9}>
                      <Box sx={{ pt: '50%', position: 'relative' }}>
                        <ImgStyle alt="Foto KTP" src={memberVerification.selfiePhotoURL} />
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box display="flex" justifyContent="end">
                        <Button variant="contained" onClick={() => setIsEdit(true)}>
                          Edit
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Card>
              )}
            </>
          ) : (
            <>
              <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h4" gutterBottom>
                    Request Keanggotaan Koperasi
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    Silakan isi formulir berikut untuk request menjadi anggota koperasi.
                  </Typography>
                </Box>
              </Box>
              <RequestMemberVerificationForm />
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
          Anda telah memiliki <i>role</i> sebagai Anggota Koperasi
        </Alert>
      </Container>
    );
  };

  return <Page title="Request Keanggotaan Koperasi | CoopChick">{renderContent()}</Page>;
}
