import { useState, useEffect } from 'react';

import { handleGetLabaRugiInfo } from 'utils/financeAxios/financeReport';

import BalanceStatistics from './BalanceStatistics';
import Expenses from './Expenses';
import ExpensesCategories from './ExpensesCategories';
import Income from './Income';

import { useTheme, styled } from '@mui/material/styles';

import {
  IconButton,
  Stack,
  Table,
  TableRow,
  TableContainer,
  TableBody,
  TableHead,
  TableCell,
  Tooltip,
  Box,
  Typography,
  useMediaQuery
} from '@mui/material';

import { Icon } from '@iconify/react';

import questionMarkCircleOutline from '@iconify/icons-eva/question-mark-circle-outline';

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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  interface ILabaRugiData {
    jumlahPenjualan: number;
    sisaHasilUsaha: number;
    biayaProduksiProdukTerjual: number;
    biayaSimpananPokok: number;
    biayaSimpananWajib: number;
    biayaOperasi: number;
    net: number;
  }

  const [currentLabaRugiData, setCurrentLabaRugiData] = useState<ILabaRugiData | undefined>();
  const [prevLabaRugiData, setPrevLabaRugiData] = useState<ILabaRugiData | undefined>();
  const [incomePercent, setIncomePercent] = useState<number>();
  const [expensePercent, setExpensePercent] = useState<number>();
  const [dataNotExist, setDataNotExist] = useState<Boolean>(false);

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
        const currentLabaRugiData = await handleGetLabaRugiInfo(currentPeriodString);
        if (currentLabaRugiData) {
          setDataNotExist(false);
          setCurrentLabaRugiData(currentLabaRugiData);
        } else {
          setDataNotExist(true);
        }
      }
    };
    fetchData();
  }, [dateValue, user]);

  useEffect(() => {
    const fetchData = async () => {
      let prevDateValue = new Date(dateValue.getTime());
      prevDateValue.setMonth(prevDateValue.getMonth() - 1);
      let previousPeriodString =
        prevDateValue.getFullYear() + '-' + (prevDateValue.getMonth() + 1) + '-1';
      if (user) {
        let fetchedLabaRugiInfo = await handleGetLabaRugiInfo(previousPeriodString);
        if (!fetchedLabaRugiInfo) {
          fetchedLabaRugiInfo = {
            jumlahPenjualan: 0,
            sisaHasilUsaha: 0,
            biayaProduksiProdukTerjual: 0,
            biayaSimpananPokok: 0,
            biayaSimpananWajib: 0,
            biayaOperasi: 0,
            net: 0
          };
        }
        setPrevLabaRugiData(fetchedLabaRugiInfo);
      }
    };
    fetchData();
  }, [dateValue, user]);

  useEffect(() => {
    if (currentLabaRugiData && prevLabaRugiData) {
      const currentIncome =
        currentLabaRugiData.jumlahPenjualan + currentLabaRugiData.sisaHasilUsaha;
      const prevIncome = prevLabaRugiData.jumlahPenjualan + prevLabaRugiData.sisaHasilUsaha;
      setIncomePercent(
        currentIncome === 0 ? -100 : ((currentIncome - prevIncome) / currentIncome) * 100
      );
      const currentExpense =
        currentLabaRugiData.biayaProduksiProdukTerjual +
        currentLabaRugiData.biayaSimpananPokok +
        currentLabaRugiData.biayaSimpananWajib +
        currentLabaRugiData.biayaOperasi;
      const prevExpense =
        prevLabaRugiData.biayaProduksiProdukTerjual +
        prevLabaRugiData.biayaSimpananPokok +
        prevLabaRugiData.biayaSimpananWajib +
        prevLabaRugiData.biayaOperasi;
      setExpensePercent(
        currentExpense === 0 ? -100 : ((currentExpense - prevExpense) / currentExpense) * 100
      );
    }
  }, [currentLabaRugiData, prevLabaRugiData]);

  return (
    <>
      {dataNotExist ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography>Data tidak tersedia</Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {currentLabaRugiData &&
          prevLabaRugiData &&
          incomePercent !== undefined &&
          expensePercent !== undefined ? (
            <>
              <Grid item xs={12}>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                  <LabaRugiReportToolbar
                    currentLabaRugiData={currentLabaRugiData}
                    incomePercent={incomePercent}
                    expensePercent={expensePercent}
                    dateValue={dateValue}
                  />
                </Stack>
              </Grid>
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
                        <TableCell align="right">Jumlah</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell align="left">1</TableCell>
                        <TableCell align="left">
                          <Stack direction="row">
                            <Box height={15} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                              <Typography variant="inherit" sx={{ mt: '0.33rem' }}>
                                Jumlah penjualan
                              </Typography>
                            </Box>
                            <Tooltip
                              title={
                                'Jumlah penjualan adalah nilai dana yang didapatkan dari penjualan di E-Commerce selama periode yang dipilih.'
                              }
                            >
                              <IconButton sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                <Icon icon={questionMarkCircleOutline} width={15} height={15} />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </TableCell>
                        <TableCell align="right">
                          {fCurrency(currentLabaRugiData.jumlahPenjualan)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left">2</TableCell>
                        <TableCell align="left">
                          <Stack direction="row">
                            <Box height={15} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                              <Typography variant="inherit" sx={{ mt: '0.33rem' }}>
                                Sisa hasil usaha
                              </Typography>
                            </Box>
                            <Tooltip
                              title={
                                'Sisa hasil usaha adalah nilai dana yang didapatkan dari penerimaan sisa hasil usaha selama periode yang dipilih.'
                              }
                            >
                              <IconButton sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                <Icon icon={questionMarkCircleOutline} width={15} height={15} />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </TableCell>
                        <TableCell align="right">
                          {fCurrency(currentLabaRugiData.sisaHasilUsaha)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left">3</TableCell>
                        <TableCell align="left">
                          <Stack direction="row">
                            <Box height={15} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                              <Typography variant="inherit" sx={{ mt: '0.33rem' }}>
                                Biaya produksi produk terjual
                              </Typography>
                            </Box>
                            <Tooltip
                              title={
                                'Biaya produksi produk terjual adalah nilai dana bahan baku selama penjualan barang di E-Commerce selama periode yang dipilih.'
                              }
                            >
                              <IconButton sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                <Icon icon={questionMarkCircleOutline} width={15} height={15} />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </TableCell>
                        <TableCell align="right">
                          {fCurrency(currentLabaRugiData.biayaProduksiProdukTerjual)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left">4</TableCell>
                        <TableCell align="left">
                          <Stack direction="row">
                            <Box height={15} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                              <Typography variant="inherit" sx={{ mt: '0.33rem' }}>
                                Biaya simpanan pokok
                              </Typography>
                            </Box>
                            <Tooltip
                              title={
                                'Biaya simpanan pokok adalah nilai dana simpanan pokok yang Anda bayar selama periode yang dipilih.'
                              }
                            >
                              <IconButton sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                <Icon icon={questionMarkCircleOutline} width={15} height={15} />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </TableCell>
                        <TableCell align="right">
                          {fCurrency(currentLabaRugiData.biayaSimpananPokok)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left">5</TableCell>
                        <TableCell align="left">
                          <Stack direction="row">
                            <Box height={15} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                              <Typography variant="inherit" sx={{ mt: '0.33rem' }}>
                                Biaya simpanan wajib
                              </Typography>
                            </Box>
                            <Tooltip
                              title={
                                'Biaya simpanan wajib adalah nilai dana simpanan wajib yang Anda bayar selama periode yang dipilih.'
                              }
                            >
                              <IconButton sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                <Icon icon={questionMarkCircleOutline} width={15} height={15} />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </TableCell>
                        <TableCell align="right">
                          {fCurrency(currentLabaRugiData.biayaSimpananWajib)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left">5</TableCell>
                        <TableCell align="left">
                          <Stack direction="row">
                            <Box height={15} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                              <Typography variant="inherit" sx={{ mt: '0.33rem' }}>
                                Biaya operasi
                              </Typography>
                            </Box>
                            <Tooltip
                              title={
                                'Biaya operasi adalah dana operasi (biaya layanan) yang dibayar oleh Anda saat melakukan penjualan barang di E-Commerce selama periode yang dipilih.'
                              }
                            >
                              <IconButton sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                <Icon icon={questionMarkCircleOutline} width={15} height={15} />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </TableCell>
                        <TableCell align="right">
                          {fCurrency(currentLabaRugiData.biayaOperasi)}
                        </TableCell>
                      </TableRow>
                      <RowResultStyle>
                        <TableCell width={10}></TableCell>
                        <TableCell align="left">
                          <Stack direction="row">
                            <Box height={15} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                              <Typography variant="inherit" sx={{ mt: '0.33rem' }}>
                                <strong>Net</strong>
                              </Typography>
                            </Box>
                            <Tooltip
                              title={'Net adalah keuntungan Anda selama periode yang dipilih.'}
                            >
                              <IconButton sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                <Icon icon={questionMarkCircleOutline} width={15} height={15} />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </TableCell>
                        <TableCell align="right">{fCurrency(currentLabaRugiData.net)}</TableCell>
                      </RowResultStyle>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item xs={12} spacing={2}>
                <Stack spacing={2} direction={isMobile ? 'column' : 'row'}>
                  <Grid item xs={12} md={6}>
                    <Income
                      currentLabaRugiData={currentLabaRugiData}
                      prevLabaRugiData={prevLabaRugiData}
                      incomePercent={incomePercent}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Expenses
                      currentLabaRugiData={currentLabaRugiData}
                      prevLabaRugiData={prevLabaRugiData}
                      expensePercent={expensePercent}
                    />
                  </Grid>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Grid item xs={12}>
                  <BalanceStatistics dateValue={dateValue} />
                </Grid>
                <Grid item xs={12}>
                  <ExpensesCategories dateValue={dateValue} />
                </Grid>
              </Grid>
            </>
          ) : null}
        </Grid>
      )}
    </>
  );
}
