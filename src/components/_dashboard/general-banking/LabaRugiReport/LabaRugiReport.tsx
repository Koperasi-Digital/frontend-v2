import { useState, useEffect } from 'react';

import { handleGetLabaRugiInfo } from 'utils/financeReport';

import BalanceStatistics from './BalanceStatistics';
import Expenses from './Expenses';
import ExpensesCategories from './ExpensesCategories';
import Income from './Income';

import { styled } from '@mui/material/styles';

import {
  Stack,
  Table,
  TableRow,
  TableContainer,
  TableBody,
  TableHead,
  TableCell
} from '@mui/material';

import { fCurrency } from 'utils/formatNumber';

// hooks
import useAuth from 'hooks/useAuth';

import { Grid } from '@mui/material';

import LabaRugiReportToolbar from './LabaRugiReportToolbar';

type LabaRugiReportProps = {
  dateValue: Date;
};

export default function LabaRugiReport({ dateValue }: LabaRugiReportProps) {
  const { user } = useAuth();

  interface ILabaRugiData {
    id: number;
    user_id: number;
    periode: string;
    jumlahPenjualan: number;
    biayaProduksiProdukTerjual: number;
    biayaOperasi: number;
    net: number;
  }

  const [currentLabaRugiData, setCurrentLabaRugiData] = useState<ILabaRugiData | undefined>(
    undefined
  );
  const [prevLabaRugiData, setPrevLabaRugiData] = useState<ILabaRugiData | undefined>();
  const [incomePercent, setIncomePercent] = useState<number>(0);
  const [expensePercent, setExpensePercent] = useState<number>(0);

  const RowResultStyle = styled(TableRow)(({ theme }) => ({
    '& td': {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3)
    }
  }));

  useEffect(() => {
    const fetchData = async () => {
      let currentPeriodString = dateValue.getFullYear() + '-' + (dateValue.getMonth() + 1) + '-1';
      if (user) {
        const currentLabaRugiData = await handleGetLabaRugiInfo(user.id, currentPeriodString);
        setCurrentLabaRugiData(currentLabaRugiData);
      }
    };
    fetchData();
  }, [dateValue, user]);

  useEffect(() => {
    const fetchData = async () => {
      let previousPeriodString = dateValue.getFullYear() + '-' + dateValue.getMonth() + '-1';
      if (user) {
        setPrevLabaRugiData(await handleGetLabaRugiInfo(user.id, previousPeriodString));
      }
    };
    fetchData();
  }, [dateValue, user]);

  useEffect(() => {
    if (currentLabaRugiData && prevLabaRugiData) {
      setIncomePercent(
        ((currentLabaRugiData.jumlahPenjualan - prevLabaRugiData.jumlahPenjualan) /
          currentLabaRugiData.jumlahPenjualan) *
          100
      );
      const currentExpense =
        currentLabaRugiData.biayaProduksiProdukTerjual + currentLabaRugiData.biayaOperasi;
      const prevExpense =
        prevLabaRugiData.biayaProduksiProdukTerjual + prevLabaRugiData.biayaOperasi;
      setExpensePercent(((currentExpense - prevExpense) / currentExpense) * 100);
    }
  }, [currentLabaRugiData, prevLabaRugiData]);

  return (
    <>
      <Grid container spacing={3}>
        {currentLabaRugiData && prevLabaRugiData ? (
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
              <LabaRugiReportToolbar
                currentLabaRugiData={currentLabaRugiData}
                incomePercent={incomePercent}
                expensePercent={expensePercent}
              />
            </Stack>
          </Grid>
        ) : null}
        {currentLabaRugiData ? (
          <Grid item xs={12}>
            <TableContainer sx={{ minWidth: 100, minHeight: 20, mb: 10 }}>
              <Table>
                <TableHead
                  sx={{
                    borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                    '& th': { backgroundColor: 'transparent' }
                  }}
                >
                  <TableRow>
                    <TableCell width={10}>#</TableCell>
                    <TableCell align="left">Komponen</TableCell>
                    <TableCell align="left">Jumlah</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="left">1</TableCell>
                    <TableCell align="left">Jumlah Penjualan</TableCell>
                    <TableCell align="left">
                      {fCurrency(currentLabaRugiData.jumlahPenjualan)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">2</TableCell>
                    <TableCell align="left">Biaya Produksi Produk Terjual</TableCell>
                    <TableCell align="left">
                      {fCurrency(currentLabaRugiData.biayaProduksiProdukTerjual)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">3</TableCell>
                    <TableCell align="left">Biaya Operasi</TableCell>
                    <TableCell align="left">
                      {fCurrency(currentLabaRugiData.biayaOperasi)}
                    </TableCell>
                  </TableRow>
                  <RowResultStyle>
                    <TableCell width={10}></TableCell>
                    <TableCell align="left">Net</TableCell>
                    <TableCell align="left">{fCurrency(currentLabaRugiData.net)}</TableCell>
                  </RowResultStyle>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        ) : null}

        <Grid item xs={12} md={8}>
          <Stack spacing={2}>
            <BalanceStatistics dateValue={dateValue} />
            <ExpensesCategories dateValue={dateValue} />
          </Stack>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack spacing={2}>
            <Income
              currentLabaRugiData={currentLabaRugiData}
              prevLabaRugiData={prevLabaRugiData}
              incomePercent={incomePercent}
            />
            <Expenses
              currentLabaRugiData={currentLabaRugiData}
              prevLabaRugiData={prevLabaRugiData}
              expensePercent={expensePercent}
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
