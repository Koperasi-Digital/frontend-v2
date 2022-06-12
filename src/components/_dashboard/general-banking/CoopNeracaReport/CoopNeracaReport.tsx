import { useState, useEffect } from 'react';

import { handleGetCoopNeracaInfo } from 'utils/financeAxios/financeCoopReport';

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

import CoopNeracaReportToolbar from './CoopNeracaReportToolbar';

type CoopNeracaReportProps = {
  dateValue: Date;
};

export default function CoopNeracaReport({ dateValue }: CoopNeracaReportProps) {
  const { user } = useAuth();

  interface ICoopNeracaData {
    kas: number;
    asetTetap: number;
    aset: number;
    saldoMember: number;
    simpananSukarela: number;
    liabilitas: number;
    pendapatan: number;
    modal: number;
    beban: number;
    ekuitas: number;
  }

  const [coopNeracaData, setCoopNeracaData] = useState<ICoopNeracaData | undefined>(undefined);
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
        const coopNeracaData = await handleGetCoopNeracaInfo(currentPeriodString);
        if (coopNeracaData) {
          setDataNotExist(false);
          setCoopNeracaData(coopNeracaData);
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
          {coopNeracaData ? (
            <Grid item xs={12}>
              <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                <CoopNeracaReportToolbar coopNeracaData={coopNeracaData} />
              </Stack>
            </Grid>
          ) : null}
          {coopNeracaData ? (
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
                          <Tooltip title={'Kas adalah jumlah kas yang dimiliki oleh koperasi.'}>
                            <IconButton sx={{ display: 'flex', alignItems: 'flex-start' }}>
                              <Icon icon={questionMarkCircleOutline} width={15} height={15} />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">{fCurrency(coopNeracaData.kas)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">2</TableCell>
                      <TableCell align="left">
                        <Stack direction="row">
                          <Box height={15} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                            <Typography variant="inherit" sx={{ mt: '0.33rem' }}>
                              Aset tetap
                            </Typography>
                          </Box>
                          <Tooltip
                            title={
                              'Aset tetap adalah nilai aset tetap baik peralatan maupun bangunan yang dimiliki oleh koperasi.'
                            }
                          >
                            <IconButton sx={{ display: 'flex', alignItems: 'flex-start' }}>
                              <Icon icon={questionMarkCircleOutline} width={15} height={15} />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">{fCurrency(coopNeracaData.asetTetap)}</TableCell>
                    </TableRow>
                    <RowResultStyle>
                      <TableCell width={10}></TableCell>
                      <TableCell align="left">
                        <Stack direction="row">
                          <Box height={15} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                            <Typography variant="inherit" sx={{ mt: '0.33rem' }}>
                              Aset
                            </Typography>
                          </Box>
                          <Tooltip
                            title={
                              'Aset adalah seluruh kepemilikan yang koperasi punya (lengan kiri dari neraca).'
                            }
                          >
                            <IconButton sx={{ display: 'flex', alignItems: 'flex-start' }}>
                              <Icon icon={questionMarkCircleOutline} width={15} height={15} />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">{fCurrency(coopNeracaData.aset)}</TableCell>
                    </RowResultStyle>
                    <TableRow>
                      <TableCell align="left">3</TableCell>
                      <TableCell align="left">
                        <Stack direction="row">
                          <Box height={15} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                            <Typography variant="inherit" sx={{ mt: '0.33rem' }}>
                              Saldo member
                            </Typography>
                          </Box>
                          <Tooltip
                            title={
                              'Saldo member adalah nilai total seluruh saldo dari anggota koperasi yang belum dicairkan.'
                            }
                          >
                            <IconButton sx={{ display: 'flex', alignItems: 'flex-start' }}>
                              <Icon icon={questionMarkCircleOutline} width={15} height={15} />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">{fCurrency(coopNeracaData.saldoMember)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">4</TableCell>
                      <TableCell align="left">
                        <Stack direction="row">
                          <Box height={15} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                            <Typography variant="inherit" sx={{ mt: '0.33rem' }}>
                              Simpanan sukarela member
                            </Typography>
                          </Box>
                          <Tooltip
                            title={
                              'Simpanan sukarela member adalah nilai total seluruh simpanan sukarela dari anggota koperasi yang belum dicairkan.'
                            }
                          >
                            <IconButton sx={{ display: 'flex', alignItems: 'flex-start' }}>
                              <Icon icon={questionMarkCircleOutline} width={15} height={15} />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">
                        {fCurrency(coopNeracaData.simpananSukarela)}
                      </TableCell>
                    </TableRow>
                    <RowResultStyle>
                      <TableCell width={10}></TableCell>
                      <TableCell align="left">
                        <Stack direction="row">
                          <Box height={15} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                            <Typography variant="inherit" sx={{ mt: '0.33rem' }}>
                              Liabilitas
                            </Typography>
                          </Box>
                          <Tooltip
                            title={
                              'Liabilitas adalah bagian aset yang tidak bersih / perlu dikembalikan di kemudian hari. (lengan kiri koperasi)'
                            }
                          >
                            <IconButton sx={{ display: 'flex', alignItems: 'flex-start' }}>
                              <Icon icon={questionMarkCircleOutline} width={15} height={15} />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">{fCurrency(coopNeracaData.liabilitas)}</TableCell>
                    </RowResultStyle>
                    <TableRow>
                      <TableCell align="left">5</TableCell>
                      <TableCell align="left">
                        <Stack direction="row">
                          <Box height={15} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                            <Typography variant="inherit" sx={{ mt: '0.33rem' }}>
                              Pendapatan
                            </Typography>
                          </Box>
                          <Tooltip
                            title={
                              'Pendapatan adalah keuntungan koperasi yang terdiri dari pembayaran simpanan pokok dan wajib maupun penerimaan biaya layanan di E-Commerce.'
                            }
                          >
                            <IconButton sx={{ display: 'flex', alignItems: 'flex-start' }}>
                              <Icon icon={questionMarkCircleOutline} width={15} height={15} />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">{fCurrency(coopNeracaData.pendapatan)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">6</TableCell>
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
                      <TableCell align="left">{fCurrency(coopNeracaData.modal)}</TableCell>
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
                              'Beban adalah biaya yang perlu dibayarkan pada periode saat ini dapat berupa biaya SHU maupun depresiasi/perbaikan peralatan.'
                            }
                          >
                            <IconButton sx={{ display: 'flex', alignItems: 'flex-start' }}>
                              <Icon icon={questionMarkCircleOutline} width={15} height={15} />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">{fCurrency(coopNeracaData.beban)}</TableCell>
                    </TableRow>
                    <RowResultStyle>
                      <TableCell width={10}></TableCell>
                      <TableCell align="left">
                        <Stack direction="row">
                          <Box height={15} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                            <Typography variant="inherit" sx={{ mt: '0.33rem' }}>
                              Ekuitas
                            </Typography>
                          </Box>
                          <Tooltip
                            title={
                              'Ekuitas adalah kepemilikan bersih yang koperasi punya (lengan kanan dari neraca: Aset-Liabilitas).'
                            }
                          >
                            <IconButton sx={{ display: 'flex', alignItems: 'flex-start' }}>
                              <Icon icon={questionMarkCircleOutline} width={15} height={15} />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">{fCurrency(coopNeracaData.ekuitas)}</TableCell>
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
