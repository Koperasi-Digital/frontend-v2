// material
import { Grid, Container, Stack } from '@mui/material';
// components
import Page from '../../components/Page';
import {
  BankingIncome,
  BankingExpenses,
  BankingSavings,
  BankingBalanceStatistics,
  BankingExpensesCategories,
  BankingEMoneyBalance
} from '../../components/_dashboard/general-banking';

// ----------------------------------------------------------------------

export default function Finance() {
  return (
    <Page title="General: Finance | CoopChick">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <BankingSavings />
          </Grid>
          <Grid item xs={12} md={6}>
            <BankingEMoneyBalance />
          </Grid>
          <Grid item xs={12} md={8}>
            <Stack spacing={3}>
              <BankingBalanceStatistics />
              <BankingExpensesCategories />
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <BankingIncome />
              <BankingExpenses />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
