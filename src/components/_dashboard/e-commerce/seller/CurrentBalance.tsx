// material
import { styled } from '@mui/material/styles';
import { Card, Typography, Stack } from '@mui/material';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
import { useEffect, useState } from 'react';

import { handleGetSaldo } from 'utils/financeAxios/financeSaldo';
import { handleGetLabaRugiInfo } from 'utils/financeAxios/financeReport';

import useAuth from 'hooks/useAuth';

// ----------------------------------------------------------------------

const RowStyle = styled('div')({
  display: 'flex',
  justifyContent: 'space-between'
});

// ----------------------------------------------------------------------

export default function CurrentBalance() {
  const { user } = useAuth();

  const [currentBalance, setCurrentBalance] = useState<number>(0);
  const [incomeAmount, setIncomeAmount] = useState<number>(0);
  const [expenseAmount, setExpenseAmount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const saldo = await handleGetSaldo();
        setCurrentBalance(saldo.amount);
        const periodeString = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-1';
        const laporanLabaRugi = await handleGetLabaRugiInfo(periodeString);
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

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="subtitle2" gutterBottom>
        Saldo Anda
      </Typography>

      <Stack spacing={1}>
        <Typography variant="h3">{fCurrency(currentBalance)}</Typography>

        <RowStyle>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Total Saldo
          </Typography>
          <Typography variant="body2">{fCurrency(currentBalance)}</Typography>
        </RowStyle>

        <RowStyle>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Total Pemasukan
          </Typography>
          <Typography variant="body2">- {fCurrency(incomeAmount)}</Typography>
        </RowStyle>

        <RowStyle>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Total Pengeluaran
          </Typography>
          <Typography variant="subtitle1">{fCurrency(expenseAmount)}</Typography>
        </RowStyle>
      </Stack>
    </Card>
  );
}
