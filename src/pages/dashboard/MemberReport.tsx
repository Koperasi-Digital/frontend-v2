// material
import { Container } from '@mui/material';
import { Card, Typography, Stack } from '@mui/material';

// components
import Page from '../../components/Page';
import { PeriodicMemberReport } from '../../components/_dashboard/general-banking';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';

// routes
import { PATH_DASHBOARD } from '../../routes/paths';

export default function MemberReport() {
  return (
    <Page title="Banking: Cooperation Report | CoopChick">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading={'Member Report'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Finance',
              href: PATH_DASHBOARD.finance.root
            },
            { name: 'Member Report' }
          ]}
        />
        <Card sx={{ padding: 5 }}>
          <Stack direction="row" spacing={5} justifyContent="center">
            <Typography variant="h6" gutterBottom>
              Simpanan pokok : Rp 4.000.000,00
            </Typography>
            <Typography variant="body1" gutterBottom>
              Lunas
            </Typography>
          </Stack>
          <PeriodicMemberReport />
        </Card>
      </Container>
    </Page>
  );
}
