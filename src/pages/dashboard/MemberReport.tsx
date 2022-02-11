// material
import { Container } from '@mui/material';
// components
import Page from '../../components/Page';
import { BankingMemberReport } from '../../components/_dashboard/general-banking';

export default function MemberReport() {
  return (
    <Page title="Banking: Cooperation Report | CoopChick">
      <Container maxWidth={false}>
        <BankingMemberReport />
      </Container>
    </Page>
  );
}
