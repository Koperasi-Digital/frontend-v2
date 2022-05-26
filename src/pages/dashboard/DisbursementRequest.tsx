// material
import { Container, Grid, Card, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// components
import Page from '../../components/Page';
import DisbursementRequestForm from '../../components/_dashboard/general-banking/DisbursementRequestForm';
import DisbursementRequestListTable from 'components/_dashboard/general-banking/DisbursementRequestListTable';
import BankAccountRegisterForm from 'components/_dashboard/general-banking/BankAccountRegisterForm';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { useState, useEffect } from 'react';

import { handleGetBankAccount } from 'utils/financeAxios/financeBankAccount';

// routes
import { PATH_DASHBOARD } from '../../routes/paths';

type BankAccount = {
  accountNumber: string;
  accountName: string;
  bankName: string;
};

export default function DisbursementRequest() {
  const [bankAccount, setBankAccount] = useState<BankAccount>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchData = async () => {
      const bankAccount = await handleGetBankAccount();
      if (bankAccount) {
        setBankAccount(bankAccount);
      }
    };
    fetchData();
  }, []);

  return (
    <Page title="Pengajuan Pencairan Dana | CoopChick">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading={'Pengajuan Pencairan Dana'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Pengajuan Pencairan' }
          ]}
        />
        <Card sx={{ padding: isMobile ? 1 : 10 }}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={6}>
              <DisbursementRequestForm bankAccount={bankAccount} />
            </Grid>
            <Grid item xs={12} md={6}>
              <BankAccountRegisterForm bankAccount={bankAccount} setBankAccount={setBankAccount} />
            </Grid>
            <Grid item xs={12}>
              <DisbursementRequestListTable />
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Page>
  );
}
