// material
import { Container, Grid, Card, useMediaQuery } from '@mui/material';

// components
import Page from '../../components/Page';
import DeprecationRegisterForm from '../../components/_dashboard/general-banking/DeprecationRegisterForm';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';

import { useTheme } from '@mui/material/styles';

// routes
import { PATH_DASHBOARD } from '../../routes/paths';

export default function DeprecationRegister() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Page title="Pendaftaran Depresiasi Peralatan | CoopChick">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading={'Pendaftaran Depresiasi Peralatan'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Pendaftaran Depresiasi Peralatan' }
          ]}
        />
        <Card sx={{ padding: isMobile ? 2 : 10, paddingTop: 10 }}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12}>
              <DeprecationRegisterForm />
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Page>
  );
}
