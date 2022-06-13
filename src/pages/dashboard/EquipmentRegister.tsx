// material
import { Container, Grid, Card, Typography, useMediaQuery } from '@mui/material';

// components
import Page from '../../components/Page';
import EquipmentRegisterForm from 'components/_dashboard/general-banking/EquipmentRegisterForm';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';

import { useTheme } from '@mui/material/styles';

// routes
import { PATH_DASHBOARD } from '../../routes/paths';

export default function EquipmentRegister() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Page title="Pendaftaran Peralatan Baru | CoopChick">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading={'Pendaftaran Peralatan Baru'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Pendaftaran Peralatan Baru' }
          ]}
        />
        <Card sx={{ padding: isMobile ? 2 : 10, paddingTop: 10 }}>
          <Grid container spacing={3} justifyContent="center">
            <Typography paddingX={5} justifyContent="center" textAlign="center">
              Biaya pendaftaran peralatan adalah pendaftaran harga dari barang yang baru
              dibeli/diberikan kepada koperasi.
            </Typography>
            <Grid item xs={12}>
              <EquipmentRegisterForm />
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Page>
  );
}
