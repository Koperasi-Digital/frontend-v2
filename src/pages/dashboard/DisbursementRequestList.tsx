// material
import { Container, Grid } from '@mui/material';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';

// routes
import { PATH_DASHBOARD } from '../../routes/paths';

import DisbursementRequestListTable from 'components/_dashboard/general-banking/DisbursementRequestListTable';

export default function DisbursementRequestList() {
  return (
    <Page title="Transaction Report | CoopChick">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading={'Daftar Pengajuan Pencairan'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Daftar Pengajuan Pencairan' }
          ]}
        />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <DisbursementRequestListTable />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
