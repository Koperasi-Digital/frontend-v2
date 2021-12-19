// material
import { Container, Grid } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
// components
import Page from '../../components/Page';
import { AppWelcome } from '../../components/_dashboard/general-app';

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
        </Grid>
      </Container>
    </Page>
  );
}
