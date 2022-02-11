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
  BankingBalance,
  BankingReport
} from '../../components/_dashboard/general-banking';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';

// routes
import { PATH_DASHBOARD } from '../../routes/paths';

export default function Finance() {
  return (
    <Page title="General: Finance | CoopChick">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading={'Finance Dashboard'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Finance',
              href: PATH_DASHBOARD.finance.root
            },
            { name: 'Home' }
          ]}
        />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <BankingSavings />
          </Grid>
          <Grid item xs={12} md={6}>
            <BankingBalance />
          </Grid>
          <Grid item xs={12} md={8}>
            <Stack spacing={3}>
              <BankingBalanceStatistics />
              <BankingExpensesCategories />
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <BankingReport />
              <BankingIncome />
              <BankingExpenses />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
