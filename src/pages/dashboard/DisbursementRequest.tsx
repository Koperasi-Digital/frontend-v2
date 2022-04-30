// material
import { Container, Grid, Card } from '@mui/material';
// components
import Page from '../../components/Page';
import DisbursementRequestForm from '../../components/_dashboard/general-banking/DisbursementRequestForm';
import BankAccountRegisterForm from 'components/_dashboard/general-banking/BankAccountRegisterForm';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { useState, useEffect } from 'react';

import { handleGetBankAccount } from 'utils/financeAxios/financeBankAccount';
// hooks
import useAuth from 'hooks/useAuth';

// routes
import { PATH_DASHBOARD } from '../../routes/paths';

type BankAccount = {
  accountNumber: string;
  accountName: string;
  bankName: string;
};

export default function DisbursementRequest() {
  const { user } = useAuth();
  const [bankAccount, setBankAccount] = useState<BankAccount>();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const bankAccount = await handleGetBankAccount(user.id);
        if (bankAccount) {
          setBankAccount(bankAccount);
        }
      }
    };
    fetchData();
  }, [user]);

  return (
    <Page title="Transaction Report | CoopChick">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading={'Pengajuan Pencairan'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Keuangan',
              href: PATH_DASHBOARD.finance.root
            },
            { name: 'Pengajuan Pencairan' }
          ]}
        />
        <Card sx={{ padding: 10 }}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={6}>
              <DisbursementRequestForm bankAccount={bankAccount} />
            </Grid>
            <Grid item xs={12} md={6}>
              <BankAccountRegisterForm bankAccount={bankAccount} setBankAccount={setBankAccount} />
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Page>
  );
}
