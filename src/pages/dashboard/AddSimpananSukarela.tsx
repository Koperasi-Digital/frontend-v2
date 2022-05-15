// material
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Card, useMediaQuery } from '@mui/material';
// components
import Page from '../../components/Page';
import AddSimpananSukarelaForm from '../../components/_dashboard/general-banking/AddSimpananSukarelaForm';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';

// routes
import { PATH_DASHBOARD } from '../../routes/paths';

export default function AddSimpananSukarela() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Page title="Penambahan Simpanan Sukarela | CoopChick">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading={'Penambahan Simpanan Sukarela'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Finance',
              href: PATH_DASHBOARD.finance.root
            },
            { name: 'Penambahan Simpanan Sukarela' }
          ]}
        />
        <Card sx={{ padding: isMobile ? 3 : 10 }}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12}>
              <AddSimpananSukarelaForm />
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Page>
  );
}
