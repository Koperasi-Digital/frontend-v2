import { useState, useEffect } from 'react';

import { handleGetLabaRugiInfo } from 'utils/financeReport';

import {
  BankingBalanceStatistics,
  BankingExpensesCategories,
  BankingIncome,
  BankingExpenses
} from 'components/_dashboard/general-banking';

import { styled } from '@mui/material/styles';

import {
  Stack,
  Typography,
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

  const [labaRugiData, setLabaRugiData] = useState<ILabaRugiData | undefined>(undefined);

  const RowResultStyle = styled(TableRow)(({ theme }) => ({
    '& td': {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3)
    }
  }));

  useEffect(() => {
    const fetchData = async () => {
      let periodString = dateValue.getFullYear() + '-' + (dateValue.getMonth() + 1) + '-1';
      if (user) {
        setLabaRugiData(await handleGetLabaRugiInfo(user.id, periodString));
      }
    };
    fetchData();
  }, [dateValue, user]);

  return (
    <>
      {labaRugiData ? (
        <>
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
                  <TableCell align="left">{fCurrency(labaRugiData.jumlahPenjualan)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">2</TableCell>
                  <TableCell align="left">Biaya Produksi Produk Terjual</TableCell>
                  <TableCell align="left">
                    {fCurrency(labaRugiData.biayaProduksiProdukTerjual)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">3</TableCell>
                  <TableCell align="left">Biaya Operasi</TableCell>
                  <TableCell align="left">{fCurrency(labaRugiData.biayaOperasi)}</TableCell>
                </TableRow>
                <RowResultStyle>
                  <TableCell width={10}></TableCell>
                  <TableCell align="left">Net</TableCell>
                  <TableCell align="left">{fCurrency(labaRugiData.net)}</TableCell>
                </RowResultStyle>
              </TableBody>
            </Table>
          </TableContainer>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                <LabaRugiReportToolbar />
              </Stack>
            </Grid>
            <Grid item xs={12} md={8}>
              <Stack spacing={2}>
                <BankingBalanceStatistics />
                <BankingExpensesCategories />
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack spacing={2}>
                <BankingIncome />
                <BankingExpenses />
              </Stack>
            </Grid>
          </Grid>
        </>
      ) : (
        <Stack direction="row" justifyContent="center">
          <Typography variant="h6">Data Tidak Tersedia</Typography>
        </Stack>
      )}
    </>
  );
}
