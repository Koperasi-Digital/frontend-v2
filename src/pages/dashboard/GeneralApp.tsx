// material
import { Container, Grid } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
// components
import Page from '../../components/Page';
import { AppWelcome } from '../../components/_dashboard/general-app';
import { BankingMemberSimpananPokok } from 'components/_dashboard/general-banking';
import { BankingMemberSimpananWajib } from 'components/_dashboard/general-banking';

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { user } = useAuth();

  return (
    <Page title="General: App | CoopChick">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <AppWelcome displayName={user?.displayName} />
          </Grid>
          <Grid item xs={12} md={6}>
            <BankingMemberSimpananPokok />
          </Grid>
          <Grid item xs={12} md={6}>
            <BankingMemberSimpananWajib />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
