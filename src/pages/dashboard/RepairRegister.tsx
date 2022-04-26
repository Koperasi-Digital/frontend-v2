// material
import { Container, Grid, Card, useMediaQuery } from '@mui/material';

// components
import Page from '../../components/Page';
import RepairRegisterForm from '../../components/_dashboard/general-banking/RepairRegisterForm';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';

import { useTheme } from '@mui/material/styles';

// routes
import { PATH_DASHBOARD } from '../../routes/paths';

export default function RepairRegister() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Page title="Mendaftarkan Perbaikan Peralatan | CoopChick">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading={'Mendaftarkan Perbaikan Peralatan'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Mendaftarkan Perbaikan Peralatan' }
          ]}
        />
        <Card sx={{ padding: isMobile ? 2 : 10, paddingTop: 10 }}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12}>
              <RepairRegisterForm />
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Page>
  );
}
