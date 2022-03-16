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
    <Page title="Banking: Transaction Report | CoopChick">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading={'Disbursement Request List'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Finance',
              href: PATH_DASHBOARD.managementFinance.root
            },
            { name: 'Disbursement Request List' }
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
