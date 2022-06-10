import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
// material
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import {
  Alert,
  AlertTitle,
  Box,
  Chip,
  Container,
  Grid,
  Typography,
  Link,
  Button,
  Stack
} from '@mui/material';
// utils
import axios from 'utils/axios';
import { handleGetBankAccount } from 'utils/financeAxios/financeBankAccount';
import { fHTML } from 'utils/financeAxios/financeMemberResignation';
// hooks
import useAuth from 'hooks/useAuth';
// components
import Page from 'components/Page';
import { RequestMemberResignationForm } from 'components/_dashboard/user/member-resignation';
import { MIconButton } from 'components/@material-extend';

import { Link as RouterLink } from 'react-router-dom';

// routes
import { PATH_DASHBOARD } from 'routes/paths';

// ----------------------------------------------------------------------

const RESIGNATION_REASON = {
  pengajuan: 'Pengajuan pribadi',
  meninggal: 'Meninggal dunia'
};

const RESIGNATION_STATUS = {
  accepted: 'Diterima',
  rejected: 'Ditolak',
  pending: 'Menunggu Keputusan'
};

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 960,
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

type BankAccount = {
  accountNumber: string;
  accountName: string;
  bankName: string;
};

// ----------------------------------------------------------------------

export default function RequestMemberResignation() {
  const { user } = useAuth();
  const [isMember, setIsMember] = useState(false);
  const [memberResignation, setMemberResignation] = useState<any>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bankAccount, setBankAccount] = useState<BankAccount>();
  const linkTo = PATH_DASHBOARD.finance.disbursementRequest;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const getUserMemberResignation = (userId: number) => {
    axios
      .get(`member-resignation/${userId}`)
      .then((response) => {
        setMemberResignation(response.data.payload);
      })
      .catch(() => setMemberResignation(undefined));
  };

  useEffect(() => {
    if (user) {
      getUserMemberResignation(user.id);
    }
  }, [user]);

  const handleCancleResignation = () => {
    if (user) {
      setIsSubmitting(true);
      axios.delete(`member-resignation/${user.id}`).then(() => {
        setIsSubmitting(false);
        setMemberResignation(undefined);
        enqueueSnackbar('Request pengunduran diri berhasil dibatalkan!', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const bankAccount = await handleGetBankAccount();
      if (bankAccount) {
        setBankAccount(bankAccount);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (user && user.roles) {
      setIsMember(user.roles.map((role: any) => role.name).includes('MEMBER'));
    }
  }, [user]);

  const renderContent = () => {
    if (isMember) {
      return (
        <>
          {bankAccount ? (
            <ContentStyle>
              {memberResignation ? (
                <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h4" gutterBottom>
                      Pengunduran Keanggotaan Koperasi
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                      Request pengunduran diri dari keanggotaan koperasi telah dikirimkan kepada
                      Admin
                      <br />
                      <br />
                      <pre>Pencairan dana sedang diproses</pre>
                      {fHTML(memberResignation.financeDisbursementDescription)}
                    </Typography>
                    <Grid container spacing={2} sx={{ my: 1 }}>
                      <Grid item xs={12} md={3}>
                        <Typography variant="body1" fontWeight="bold">
                          Alasan
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <Typography variant="body1">
                          {
                            RESIGNATION_REASON[
                              memberResignation.reason as keyof typeof RESIGNATION_REASON
                            ]
                          }
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <Typography variant="body1" fontWeight="bold">
                          Deskripsi
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <Typography variant="body1">
                          {memberResignation.description || '-'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <Typography variant="body1" fontWeight="bold">
                          Status
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <Typography variant="body1">
                          <Chip
                            label={
                              RESIGNATION_STATUS[
                                memberResignation.status as keyof typeof RESIGNATION_STATUS
                              ]
                            }
                            color={
                              memberResignation.status === 'pending'
                                ? 'warning'
                                : memberResignation.status === 'accepted'
                                ? 'success'
                                : 'error'
                            }
                            sx={{ fontWeight: 'bold' }}
                          />
                        </Typography>
                      </Grid>
                    </Grid>
                    <LoadingButton
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      loading={isSubmitting}
                      sx={{ my: 3 }}
                      onClick={handleCancleResignation}
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
          ) : (
            <Container
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%'
              }}
            >
              <Alert severity="error">
                <AlertTitle>Akses ditolak</AlertTitle>
                <Stack
                  spacing={1}
                  direction="column"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography>
                    Anda tidak memiliki akun bank yang terdaftar untuk pengembalian keuangan.
                    Silakan daftarkan akun bank terlebih dahulu
                  </Typography>
                  <Link
                    to={linkTo}
                    color="inherit"
                    component={RouterLink}
                    style={{
                      textDecoration: 'none'
                    }}
                  >
                    <Button size="medium" variant="contained">
                      Daftarkan akun bank
                    </Button>
                  </Link>
                </Stack>
              </Alert>
            </Container>
          )}
        </>
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
