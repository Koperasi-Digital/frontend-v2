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
import {
  BankingSaldo,
  BankingMemberSimpananPokok,
  BankingMemberSimpananWajib
} from 'components/_dashboard/general-banking';
import { MemberFinance } from 'components/_dashboard/general-banking';
import { AdminFinance } from 'components/_dashboard/general-banking';
import { BankingTransactionsReport } from 'components/_dashboard/general-banking';
import { RecentUsers, UserActiveness } from 'components/_dashboard/user';

// ----------------------------------------------------------------------

interface ActivityListDashboardProps {
  height?: number;
}

function ActivityListDashboard({ height }: ActivityListDashboardProps) {
  return (
    <>
      <Typography gutterBottom variant="h6" sx={{ mx: '0.5rem' }}>
        Aktivitas Minggu Ini
      </Typography>
      <Calendar
        injectedView="listWeek"
        withToolbar={false}
        injectedHeight={height || 240}
        clickable={false}
      />
      <Link underline="none" component={RouterLink} to={PATH_DASHBOARD.general.activities}>
        <Typography variant="body2" align="right" sx={{ m: '0.5rem', fontWeight: 'bold' }}>
          Lebih lanjut
        </Typography>
      </Link>
    </>
  );
}

function AdminDashboard() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <ActivityListDashboard />
      </Grid>
      <Grid item xs={12}>
        <RecentUsers />
      </Grid>
      <Grid item xs={12} md={6}>
        <BankingMemberSimpananPokok />
      </Grid>
      <Grid item xs={12} md={6}>
        <BankingMemberSimpananWajib />
      </Grid>
      <Grid item xs={12}>
        <BankingTransactionsReport />
      </Grid>
      <Grid item xs={12}>
        <AdminFinance />
      </Grid>
    </Grid>
  );
}

function MemberDashboard() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <BankingSaldo />
      </Grid>
      <Grid item xs={12} md={5}>
        <UserActiveness />
      </Grid>
      <Grid item xs={12} md={4}>
        <ActivityListDashboard height={185} />
      </Grid>
      <Grid item xs={12}>
        <BankingTransactionsReport />
      </Grid>
      <Grid item xs={12}>
        <MemberFinance />
      </Grid>
    </Grid>
  );
}

export default function Dashboard() {
  const { currentRole } = useAuth();
  const role = currentRole?.name;

  return (
    <Page title="Dashboard | CoopChick">
      <Container maxWidth={false}>
        {role === 'ADMIN' ? <AdminDashboard /> : <MemberDashboard />}
      </Container>
    </Page>
  );
}
