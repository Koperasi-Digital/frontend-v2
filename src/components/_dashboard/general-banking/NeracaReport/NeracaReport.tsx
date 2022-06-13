import { useState, useEffect } from 'react';

import { handleGetNeracaInfo } from 'utils/financeAxios/financeReport';

import { styled } from '@mui/material/styles';

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
  Typography
} from '@mui/material';

import { Icon } from '@iconify/react';

import questionMarkCircleOutline from '@iconify/icons-eva/question-mark-circle-outline';

import { fCurrency } from 'utils/formatNumber';

// hooks
import useAuth from 'hooks/useAuth';

import { Grid } from '@mui/material';

import NeracaReportToolbar from './NeracaReportToolbar';

type NeracaReportProps = {
  dateValue: Date;
};

export default function NeracaReport({ dateValue }: NeracaReportProps) {
  const { user } = useAuth();

  interface INeracaData {
    kas: number;
    persediaan: number;
    simpananSukarela: number;
    aset: number;
    pendapatan: number;
    modal: number;
    prive: number;
    beban: number;
    ekuitas: number;
  }

  const [neracaData, setNeracaData] = useState<INeracaData | undefined>(undefined);
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
        const neracaData = await handleGetNeracaInfo(currentPeriodString);
        if (neracaData) {
          setNeracaData(neracaData);
          setDataNotExist(false);
        } else {
          setDataNotExist(true);
        }
      }
    };
    fetchData();
  }, [dateValue, user]);

  return (
    <>
      {dataNotExist ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography>Data tidak tersedia</Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {neracaData ? (
            <Grid item xs={12}>
              <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                <NeracaReportToolbar neracaData={neracaData} />
              </Stack>
            </Grid>
          ) : null}
          {neracaData ? (
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
                              Kas
                            </Typography>
                          </Box>
                          <Tooltip title={'Kas adalah jumlah saldo yang dipunyai oleh Anda.'}>
                            <IconButton sx={{ display: 'flex', alignItems: 'flex-start' }}>
                              <Icon icon={questionMarkCircleOutline} width={15} height={15} />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">{fCurrency(neracaData.kas)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">2</TableCell>
                      <TableCell align="left">
                        <Stack direction="row">
                          <Box height={15} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                            <Typography variant="inherit" sx={{ mt: '0.33rem' }}>
                              Persediaan
                            </Typography>
                          </Box>
                          <Tooltip
                            title={'Persediaan adalah total bahan baku tersedia di toko Anda.'}
                          >
                            <IconButton sx={{ display: 'flex', alignItems: 'flex-start' }}>
                              <Icon icon={questionMarkCircleOutline} width={15} height={15} />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">{fCurrency(neracaData.persediaan)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">3</TableCell>
                      <TableCell align="left">
                        <Stack direction="row">
                          <Box height={15} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                            <Typography variant="inherit" sx={{ mt: '0.33rem' }}>
                              Simpanan sukarela
                            </Typography>
                          </Box>
                          <Tooltip
                            title={'Simpanan sukarela adalah jumlah simpanan sukarela Anda.'}
                          >
                            <IconButton sx={{ display: 'flex', alignItems: 'flex-start' }}>
                              <Icon icon={questionMarkCircleOutline} width={15} height={15} />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">{fCurrency(neracaData.simpananSukarela)}</TableCell>
                    </TableRow>
                    <RowResultStyle>
                      <TableCell width={10}></TableCell>
                      <TableCell align="left">
                        <Stack direction="row">
                          <Box height={15} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                            <Typography variant="inherit" sx={{ mt: '0.33rem' }}>
                              <strong>Aset</strong>
                            </Typography>
                          </Box>
                          <Tooltip
                            title={
                              'Aset adalah seluruh kepemilikan yang Anda punya (lengan kiri dari neraca).'
                            }
                          >
                            <IconButton sx={{ display: 'flex', alignItems: 'flex-start' }}>
                              <Icon icon={questionMarkCircleOutline} width={15} height={15} />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">{fCurrency(neracaData.aset)}</TableCell>
                    </RowResultStyle>
                    <TableRow>
                      <TableCell align="left">4</TableCell>
                      <TableCell align="left">
                        <Stack direction="row">
                          <Box height={15} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                            <Typography variant="inherit" sx={{ mt: '0.33rem' }}>
                              Pendapatan
                            </Typography>
                          </Box>
                          <Tooltip
                            title={
                              'Pendapatan adalah keuntungan jumlah penjualan bersih dari penjualan di toko maupun penerimaan SHU pada periode yand dipilih'
                            }
                          >
                            <IconButton sx={{ display: 'flex', alignItems: 'flex-start' }}>
                              <Icon icon={questionMarkCircleOutline} width={15} height={15} />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">{fCurrency(neracaData.pendapatan)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">5</TableCell>
                      <TableCell align="left">
                        <Stack direction="row">
                          <Box height={15} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                            <Typography variant="inherit" sx={{ mt: '0.33rem' }}>
                              Modal
                            </Typography>
                          </Box>
                          <Tooltip title={'Modal adalah total aset Anda dari periode sebelumnya.'}>
                            <IconButton sx={{ display: 'flex', alignItems: 'flex-start' }}>
                              <Icon icon={questionMarkCircleOutline} width={15} height={15} />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">{fCurrency(neracaData.modal)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">6</TableCell>
                      <TableCell align="left">
                        <Stack direction="row">
                          <Box height={15} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                            <Typography variant="inherit" sx={{ mt: '0.33rem' }}>
                              Prive
                            </Typography>
                          </Box>
                          <Tooltip
                            title={
                              'Prive adalah jumlah penarikan dana yang dilakukan pada periode ini (berupa penarikan saldo/simpanan sukarela).'
                            }
                          >
                            <IconButton sx={{ display: 'flex', alignItems: 'flex-start' }}>
                              <Icon icon={questionMarkCircleOutline} width={15} height={15} />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">{fCurrency(neracaData.prive)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">7</TableCell>
                      <TableCell align="left">
                        <Stack direction="row">
                          <Box height={15} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                            <Typography variant="inherit" sx={{ mt: '0.33rem' }}>
                              Beban
                            </Typography>
                          </Box>
                          <Tooltip
                            title={
                              'Beban adalah biaya yang perlu dibayarkan pada periode saat ini dapat berupa biaya simpanan pokok/simpanan wajib/ biaya layanan pada E-Commerce.'
                            }
                          >
                            <IconButton sx={{ display: 'flex', alignItems: 'flex-start' }}>
                              <Icon icon={questionMarkCircleOutline} width={15} height={15} />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">{fCurrency(neracaData.beban)}</TableCell>
                    </TableRow>
                    <RowResultStyle>
                      <TableCell width={10}></TableCell>
                      <TableCell align="left">
                        <Stack direction="row">
                          <Box height={15} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                            <Typography variant="inherit" sx={{ mt: '0.33rem' }}>
                              <strong>Ekuitas</strong>
                            </Typography>
                          </Box>
                          <Tooltip
                            title={
                              'Ekuitas adalah kepemilikan bersih yang Anda punya (lengan kanan dari neraca).'
                            }
                          >
                            <IconButton sx={{ display: 'flex', alignItems: 'flex-start' }}>
                              <Icon icon={questionMarkCircleOutline} width={15} height={15} />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">{fCurrency(neracaData.ekuitas)}</TableCell>
                    </RowResultStyle>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          ) : null}
        </Grid>
      )}
    </>
  );
}
