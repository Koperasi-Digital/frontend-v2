// material
import { Container, Grid, Card } from '@mui/material';

// components
import Page from '../../components/Page';
import DeprecationRegisterForm from '../../components/_dashboard/general-banking/DeprecationRegisterForm';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';

// routes
import { PATH_DASHBOARD } from '../../routes/paths';

export default function DeprecationRegister() {
  return (
    <Page title="Banking: Register Deprecation | CoopChick">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading={'Register'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Finance',
              href: PATH_DASHBOARD.finance.root
            },
            { name: 'Register Deprecation' }
          ]}
        />
        <Card sx={{ padding: 10 }}>
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
