// material
import { Container } from '@mui/material';
// components
import Page from '../../components/Page';
import { BankingRecentTransitions } from '../../components/_dashboard/general-banking';

export default function TransactionsReport() {
  return (
    <Page title="Banking: Transaction Report | CoopChick">
      <Container maxWidth={false}>
        <BankingRecentTransitions />
      </Container>
    </Page>
  );
}
