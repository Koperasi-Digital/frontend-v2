import { useState, useEffect } from 'react';

import { handleGetCoopLabaRugiInfo } from 'utils/financeAxios/financeCoopReport';

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
  Typography,
  Box,
  useMediaQuery
} from '@mui/material';

import { Icon } from '@iconify/react';

import questionMarkCircleOutline from '@iconify/icons-eva/question-mark-circle-outline';

import { fCurrency } from 'utils/formatNumber';

import { Grid } from '@mui/material';

import CoopLabaRugiReportToolbar from './CoopLabaRugiReportToolbar';

import { CoopLabaRugiData } from '../../../../@types/finance-report';

type CoopLabaRugiReportProps = {
  dateValue: Date;
};

export default function CoopLabaRugiReport({ dateValue }: CoopLabaRugiReportProps) {
  const [currentCoopLabaRugiData, setCurrentCoopLabaRugiData] = useState<
    CoopLabaRugiData | undefined
  >();
  const [prevCoopLabaRugiData, setPrevCoopLabaRugiData] = useState<CoopLabaRugiData | undefined>();
  const [incomePercent, setIncomePercent] = useState<number>();
  const [expensePercent, setExpensePercent] = useState<number>();
  const [dataNotExist, setDataNotExist] = useState<Boolean>(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
      if (currentCoopLabaRugiData) {
        setDataNotExist(false);
        setCurrentCoopLabaRugiData(currentCoopLabaRugiData);
      } else {
        setDataNotExist(true);
      }
    };
    fetchData();
  }, [dateValue]);

  useEffect(() => {
    const fetchData = async () => {
      let prevDateValue = new Date(dateValue.getTime());
      prevDateValue.setMonth(prevDateValue.getMonth() - 1);
      let previousPeriodString =
        prevDateValue.getFullYear() + '-' + (prevDateValue.getMonth() + 1) + '-1';
      let fetchedCoopLabaRugiInfo = await handleGetCoopLabaRugiInfo(previousPeriodString);
      if (!fetchedCoopLabaRugiInfo) {
        fetchedCoopLabaRugiInfo = {
          jumlahSimpananPokok: 0,
          jumlahSimpananWajib: 0,
          jumlahBiayaLayanan: 0,
          biayaSisaHasilUsaha: 0,
          biayaOperasi: 0,
          net: 0
        };
      }
      setPrevCoopLabaRugiData(fetchedCoopLabaRugiInfo);
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
        prevCoopLabaRugiData.jumlahSimpananPokok +
        prevCoopLabaRugiData.jumlahSimpananWajib +
        prevCoopLabaRugiData.jumlahBiayaLayanan;
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
      {dataNotExist ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography>Data tidak tersedia</Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {currentCoopLabaRugiData &&
          prevCoopLabaRugiData &&
          incomePercent !== undefined &&
          expensePercent !== undefined ? (
            <>
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
                        <TableCell align="left">
                          <Stack direction="row">
                            <Box height={15} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                              <Typography variant="inherit" sx={{ mt: '0.33rem' }}>
                                Jumlah simpanan pokok
                              </Typography>
                            </Box>
                            <Tooltip
                              title={
                                'Jumlah simpanan pokok adalah nilai dana simpanan pokok yang diterima dari member selama periode yang dipilih.'
                              }
                            >
                              <IconButton sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                <Icon icon={questionMarkCircleOutline} width={15} height={15} />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">
                          {fCurrency(currentCoopLabaRugiData.jumlahSimpananPokok)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left">2</TableCell>
                        <TableCell align="left">
                          <Stack direction="row">
                            <Box height={15} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                              <Typography variant="inherit" sx={{ mt: '0.33rem' }}>
                                Jumlah simpanan wajib
                              </Typography>
                            </Box>
                            <Tooltip
                              title={
                                'Jumlah simpanan wajib adalah nilai dana simpanan wajib yang diterima dari member selama periode yang dipilih.'
                              }
                            >
                              <IconButton sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                <Icon icon={questionMarkCircleOutline} width={15} height={15} />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">
                          {fCurrency(currentCoopLabaRugiData.jumlahSimpananWajib)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left">3</TableCell>
                        <TableCell align="left">
                          <Stack direction="row">
                            <Box height={15} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                              <Typography variant="inherit" sx={{ mt: '0.33rem' }}>
                                Jumlah biaya layanan
                              </Typography>
                            </Box>
                            <Tooltip
                              title={
                                'Jumlah biaya layanan adalah nilai dana biaya layanan yang diterima dari transaksi penjualan di E-Commerce selama periode yang dipilih.'
                              }
                            >
                              <IconButton sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                <Icon icon={questionMarkCircleOutline} width={15} height={15} />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">
                          {fCurrency(currentCoopLabaRugiData.jumlahBiayaLayanan)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left">4</TableCell>
                        <TableCell align="left">
                          <Stack direction="row">
                            <Box height={15} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                              <Typography variant="inherit" sx={{ mt: '0.33rem' }}>
                                Biaya sisa hasil usaha
                              </Typography>
                            </Box>
                            <Tooltip
                              title={
                                'Biaya sisa hasil usaha adalah biaya sisa hasil usaha yang dibayarkan ke anggota selama periode yang dipilih'
                              }
                            >
                              <IconButton sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                <Icon icon={questionMarkCircleOutline} width={15} height={15} />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">
                          {fCurrency(currentCoopLabaRugiData.biayaSisaHasilUsaha)}
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
                                'Biaya operasi adalah biaya yang dibayarkan karena alasan depresiasi/perbaikan peralatan/bangunan koperasi'
                              }
                            >
                              <IconButton sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                <Icon icon={questionMarkCircleOutline} width={15} height={15} />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">
                          {fCurrency(currentCoopLabaRugiData.biayaOperasi)}
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
                              title={
                                'Net adalah biaya bersih keuntungan koperasi selama periode yang dipilih'
                              }
                            >
                              <IconButton sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                <Icon icon={questionMarkCircleOutline} width={15} height={15} />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{fCurrency(currentCoopLabaRugiData.net)}</TableCell>
                      </RowResultStyle>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item xs={12} spacing={2}>
                <Stack spacing={2} direction={isMobile ? 'column' : 'row'}>
                  <Grid item xs={12} md={6}>
                    <Income
                      currentCoopLabaRugiData={currentCoopLabaRugiData}
                      prevCoopLabaRugiData={prevCoopLabaRugiData}
                      incomePercent={incomePercent}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Expenses
                      currentCoopLabaRugiData={currentCoopLabaRugiData}
                      prevCoopLabaRugiData={prevCoopLabaRugiData}
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
