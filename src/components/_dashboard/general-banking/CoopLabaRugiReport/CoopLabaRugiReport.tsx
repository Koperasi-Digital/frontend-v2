import { useState, useEffect } from 'react';

import { handleGetCoopLabaRugiInfo } from 'utils/financeCoopReport';

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

import { Grid } from '@mui/material';

import CoopLabaRugiReportToolbar from './CoopLabaRugiReportToolbar';

type CoopLabaRugiReportProps = {
  dateValue: Date;
};

export default function CoopLabaRugiReport({ dateValue }: CoopLabaRugiReportProps) {
  interface ICoopLabaRugiData {
    id: number;
    periode: string;
    jumlahSimpananPokok: number;
    jumlahSimpananWajib: number;
    jumlahBiayaLayanan: number;
    biayaSisaHasilUsaha: number;
    biayaOperasi: number;
    net: number;
  }

  const [currentCoopLabaRugiData, setCurrentCoopLabaRugiData] = useState<
    ICoopLabaRugiData | undefined
  >(undefined);
  const [prevCoopLabaRugiData, setPrevCoopLabaRugiData] = useState<ICoopLabaRugiData | undefined>();
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
      const currentCoopLabaRugiData = await handleGetCoopLabaRugiInfo(currentPeriodString);
      setCurrentCoopLabaRugiData(currentCoopLabaRugiData);
    };
    fetchData();
  }, [dateValue]);

  useEffect(() => {
    const fetchData = async () => {
      let previousPeriodString = dateValue.getFullYear() + '-' + dateValue.getMonth() + '-1';
      setPrevCoopLabaRugiData(await handleGetCoopLabaRugiInfo(previousPeriodString));
    };
    fetchData();
  }, [dateValue]);

  useEffect(() => {
    if (currentCoopLabaRugiData && prevCoopLabaRugiData) {
      const currentIncome =
        currentCoopLabaRugiData.jumlahSimpananPokok +
        currentCoopLabaRugiData.jumlahSimpananWajib +
        currentCoopLabaRugiData.jumlahBiayaLayanan;
      const prevIncome =
        prevCoopLabaRugiData.biayaSisaHasilUsaha + prevCoopLabaRugiData.biayaOperasi;
      setIncomePercent(((currentIncome - prevIncome) / currentIncome) * 100);
      const currentExpense =
        currentCoopLabaRugiData.biayaSisaHasilUsaha + currentCoopLabaRugiData.biayaOperasi;
      const prevExpense =
        prevCoopLabaRugiData.biayaSisaHasilUsaha + prevCoopLabaRugiData.biayaOperasi;
      setExpensePercent(((currentExpense - prevExpense) / currentExpense) * 100);
    }
  }, [currentCoopLabaRugiData, prevCoopLabaRugiData]);

  return (
    <>
      <Grid container spacing={3}>
        {currentCoopLabaRugiData && prevCoopLabaRugiData ? (
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
              <CoopLabaRugiReportToolbar
                currentCoopLabaRugiData={currentCoopLabaRugiData}
                incomePercent={incomePercent}
                expensePercent={expensePercent}
                dateValue={dateValue}
              />
            </Stack>
          </Grid>
        ) : null}
        {currentCoopLabaRugiData ? (
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
                    <TableCell align="left">Jumlah Simpanan Pokok</TableCell>
                    <TableCell align="left">
                      {fCurrency(currentCoopLabaRugiData.jumlahSimpananPokok)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">2</TableCell>
                    <TableCell align="left">Jumlah Simpanan Wajib</TableCell>
                    <TableCell align="left">
                      {fCurrency(currentCoopLabaRugiData.jumlahSimpananWajib)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">3</TableCell>
                    <TableCell align="left">Jumlah Biaya Layanan</TableCell>
                    <TableCell align="left">
                      {fCurrency(currentCoopLabaRugiData.jumlahBiayaLayanan)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">4</TableCell>
                    <TableCell align="left">Biaya Sisa Hasil Usaha</TableCell>
                    <TableCell align="left">
                      {fCurrency(currentCoopLabaRugiData.biayaSisaHasilUsaha)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">5</TableCell>
                    <TableCell align="left">Biaya Operasi</TableCell>
                    <TableCell align="left">
                      {fCurrency(currentCoopLabaRugiData.biayaOperasi)}
                    </TableCell>
                  </TableRow>
                  <RowResultStyle>
                    <TableCell width={10}></TableCell>
                    <TableCell align="left">Net</TableCell>
                    <TableCell align="left">{fCurrency(currentCoopLabaRugiData.net)}</TableCell>
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
              currentCoopLabaRugiData={currentCoopLabaRugiData}
              prevCoopLabaRugiData={prevCoopLabaRugiData}
              incomePercent={incomePercent}
            />
            <Expenses
              currentCoopLabaRugiData={currentCoopLabaRugiData}
              prevCoopLabaRugiData={prevCoopLabaRugiData}
              expensePercent={expensePercent}
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
