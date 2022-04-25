// material
import { styled } from '@mui/material/styles';
import { Card, Typography, Stack } from '@mui/material';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
import { useEffect, useState } from 'react';

import { handleGetSaldo } from 'utils/financeAxios/financeSaldo';
import { handleGetLabaRugiInfo } from 'utils/financeAxios/financeReport';

import useAuth from 'hooks/useAuth';

import LoadingScreen from '../../../../components/LoadingScreen';

// ----------------------------------------------------------------------

const RowStyle = styled('div')({
  display: 'flex',
  justifyContent: 'space-between'
});

// ----------------------------------------------------------------------

export default function CurrentBalance() {
  const { user } = useAuth();

  const [currentBalance, setCurrentBalance] = useState<number>();
  const [incomeAmount, setIncomeAmount] = useState<number>();
  const [expenseAmount, setExpenseAmount] = useState<number>();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const saldo = await handleGetSaldo(user.id);
        setCurrentBalance(saldo.amount);
        const periodeString = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-1';
        console.log('User id: ', user.id);
        console.log('Periode string: ', periodeString);
        const laporanLabaRugi = await handleGetLabaRugiInfo(user.id, periodeString);
        if (laporanLabaRugi) {
          setIncomeAmount(laporanLabaRugi.jumlahPenjualan);
          setExpenseAmount(
            laporanLabaRugi.biayaProduksiProdukTerjual + laporanLabaRugi.biayaOperasi
          );
        }
      }
    };
    fetchData();
  }, [user]);

  return currentBalance && incomeAmount && expenseAmount ? (
    <>
      <Card sx={{ p: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          Your Current Balance
        </Typography>

        <Stack spacing={1}>
          <Typography variant="h3">{fCurrency(currentBalance)}</Typography>

          <RowStyle>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Your Current Balance
            </Typography>
            <Typography variant="body2">{fCurrency(currentBalance)}</Typography>
          </RowStyle>

          <RowStyle>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Income Amount
            </Typography>
            <Typography variant="body2">- {fCurrency(incomeAmount)}</Typography>
          </RowStyle>

          <RowStyle>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Expense Amount
            </Typography>
            <Typography variant="subtitle1">{fCurrency(expenseAmount)}</Typography>
          </RowStyle>
        </Stack>
      </Card>
    </>
  ) : (
    <LoadingScreen />
  );
}
