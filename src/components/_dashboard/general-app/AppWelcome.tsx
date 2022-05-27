import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Typography, Button, Card, CardContent, Stack, Box } from '@mui/material';
import useAuth from 'hooks/useAuth';
import { PATH_DASHBOARD } from 'routes/paths';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  textAlign: 'center',
  backgroundColor: theme.palette.primary.lighter,
  [theme.breakpoints.up('md')]: {
    height: '100%',
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}));

// ----------------------------------------------------------------------

export default function AppWelcome() {
  const { user } = useAuth();
  const isCustomer = user?.roles.length === 1 && user.roles[0].name === 'CUSTOMER';
  return (
    <RootStyle>
      <CardContent
        sx={{
          p: { md: 0 },
          pl: { md: 5 },
          color: 'grey.800'
        }}
      >
        <Typography gutterBottom variant="h4">
          Selamat datang,
          <br /> {user?.displayName || 'Pengunjung'}!
        </Typography>

        <Typography variant="body2" sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 560, mx: 'auto' }}>
          Segala kebutuhan Anda terkait peternakan ayam bisa Anda dapatkan dari aplikasi ini.
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          sx={{
            justifyContent: {
              xs: 'center',
              md: 'initial'
            }
          }}
        >
          {isCustomer && (
            <Button
              variant="contained"
              to={PATH_DASHBOARD.user.memberVerification.request}
              component={RouterLink}
            >
              Upgrade Akun
            </Button>
          )}
          <Button variant="contained" to={PATH_DASHBOARD.general.faq} component={RouterLink}>
            Pelajari Lebih Lanjut
          </Button>
        </Stack>
      </CardContent>

      <Box
        sx={{ width: 320, height: 320, p: 3, margin: { xs: 'auto', md: 'inherit' } }}
        component="img"
        alt="coopchick logo"
        src={'/CoopChick_Logo.png'}
      />
    </RootStyle>
  );
}
