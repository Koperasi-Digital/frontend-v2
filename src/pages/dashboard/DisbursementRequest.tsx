// material
import { Container, Grid } from '@mui/material';
// components
import Page from '../../components/Page';
import DisbursementRequestForm from '../../components/_dashboard/general-banking/DisbursementRequestForm';

export default function DisbursementRequest() {
  return (
    <Page title="Banking: Transaction Report | CoopChick">
      <Container maxWidth={false}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={6}>
            <DisbursementRequestForm />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
