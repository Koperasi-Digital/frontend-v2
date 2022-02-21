import { Link as RouterLink } from 'react-router-dom';
// material
import { Container, Grid, Typography, Link } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import { Calendar } from 'components/_dashboard/calendar';
import { AppWelcome, AppTotalActive, RecentUsers } from 'components/_dashboard/general-app';
import {
  BankingSavings,
  BankingEMoney,
  BankingMemberSimpananPokok,
  BankingMemberSimpananWajib
} from 'components/_dashboard/general-banking';

// ----------------------------------------------------------------------

function AdminDashboard() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sx={{ my: 1 }}>
        <RecentUsers />
      </Grid>
      <Grid item xs={12} md={6} sx={{ my: 1 }}>
        <BankingMemberSimpananPokok />
      </Grid>
      <Grid item xs={12} md={6} sx={{ my: 1 }}>
        <BankingMemberSimpananWajib />
      </Grid>
    </Grid>
  );
}

function UserDashboard() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <AppTotalActive />
      </Grid>
      <Grid item xs={12} md={4}>
        <BankingSavings />
      </Grid>
      <Grid item xs={12} md={4}>
        <BankingEMoney />
      </Grid>
    </Grid>
  );
}

export default function GeneralApp() {
  const { user } = useAuth();
  const role = user?.role.name;

  return (
    <Page title="Dashboard | CoopChick">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <div>
              <AppWelcome displayName={user?.displayName} />
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography gutterBottom variant="h6" sx={{ mx: '0.5rem' }}>
              Activities This Week
            </Typography>
            <Calendar injectedView="listWeek" withToolbar={false} injectedHeight={240} />
            <Link underline="none" component={RouterLink} to={PATH_DASHBOARD.general.activities}>
              <Typography variant="body2" align="right" sx={{ m: '0.5rem', fontWeight: 'bold' }}>
                See More
              </Typography>
            </Link>
          </Grid>
        </Grid>
        {role === 'ADMIN' ? <AdminDashboard /> : <UserDashboard />}
      </Container>
    </Page>
  );
}
