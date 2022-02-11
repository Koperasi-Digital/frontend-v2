// material
import { Container, Grid } from '@mui/material';
// components
import Page from '../../components/Page';
import {
  SaldoDisbursementRequestList,
  ShareDisbursementRequestList
} from '../../components/_dashboard/general-banking';

export default function DisbursementRequestList() {
  return (
    <Page title="Banking: Transaction Report | CoopChick">
      <Container maxWidth={false}>
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
