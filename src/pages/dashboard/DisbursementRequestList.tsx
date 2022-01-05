// material
import { Container, Grid } from '@mui/material';
// components
import Page from '../../components/Page';
import {
  SaldoDisbursementRequestList,
  ShareDisbursementRequestList
} from '../../components/_dashboard/general-banking';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';

// routes
import { PATH_DASHBOARD } from '../../routes/paths';

export default function DisbursementRequestList() {
  return (
    <Page title="Banking: Transaction Report | CoopChick">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading={'Create disbursement approval'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Finance',
              href: PATH_DASHBOARD.finance.root
            },
            { name: 'Disbursement Request List' }
          ]}
        />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <SaldoDisbursementRequestList />
          </Grid>
          <Grid item xs={12}>
            <ShareDisbursementRequestList />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
