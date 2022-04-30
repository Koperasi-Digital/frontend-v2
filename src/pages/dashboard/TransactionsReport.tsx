// material
import { Container } from '@mui/material';
// components
import Page from '../../components/Page';
import { BankingTransactionsReport } from '../../components/_dashboard/general-banking';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';

// routes
import { PATH_DASHBOARD } from '../../routes/paths';

export default function TransactionsReport() {
  return (
    <Page title="Transaction Report | CoopChick">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading={'Transactions Report'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Finance',
              href: PATH_DASHBOARD.finance.root
            },
            { name: 'Transactions Report' }
          ]}
        />
        <BankingTransactionsReport />
      </Container>
    </Page>
  );
}
