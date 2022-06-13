import { useState, useEffect } from 'react';

import { handleGetCoopArusKasInfo } from 'utils/financeAxios/financeCoopReport';

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

import CoopArusKasReportToolbar from './CoopArusKasReportToolbar';

import { CoopArusKasData } from '../../../../@types/finance-report';

type CoopArusKasReportProps = {
  dateValue: Date;
};

export default function CoopArusKasReport({ dateValue }: CoopArusKasReportProps) {
  const { user } = useAuth();

  const [coopArusKasData, setCoopArusKasData] = useState<CoopArusKasData | undefined>(undefined);
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
        const coopArusKasData = await handleGetCoopArusKasInfo(currentPeriodString);
        if (coopArusKasData) {
          setCoopArusKasData(coopArusKasData);
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
          {coopArusKasData ? (
            <Grid item xs={12}>
              <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                <CoopArusKasReportToolbar coopArusKasData={coopArusKasData} />
              </Stack>
            </Grid>
          ) : null}
          {coopArusKasData ? (
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
                              Jumlah kas awal
                            </Typography>
                          </Box>
                          <Tooltip
                            title={
                              'Jumlah kas awal adalah nilai kas koperasi di awal periode yang dipilih.'
                            }
                          >
                            <IconButton sx={{ display: 'flex', alignItems: 'flex-start' }}>
                              <Icon icon={questionMarkCircleOutline} width={15} height={15} />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">{fCurrency(coopArusKasData.jumlahKasAwal)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">2</TableCell>
                      <TableCell align="left">
                        <Stack direction="row">
                          <Box height={15} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                            <Typography variant="inherit" sx={{ mt: '0.33rem' }}>
                              Kas masuk
                            </Typography>
                          </Box>
                          <Tooltip
                            title={
                              'Kas masuk adalah nilai dana yang masuk ke kas koperasi selama periode yang dipilih.'
                            }
                          >
                            <IconButton sx={{ display: 'flex', alignItems: 'flex-start' }}>
                              <Icon icon={questionMarkCircleOutline} width={15} height={15} />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">{fCurrency(coopArusKasData.kasMasuk)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">3</TableCell>
                      <TableCell align="left">
                        <Stack direction="row">
                          <Box height={15} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                            <Typography variant="inherit" sx={{ mt: '0.33rem' }}>
                              Kas keluar
                            </Typography>
                          </Box>
                          <Tooltip
                            title={
                              'Kas keluar adalah nilai dana yang keluar dari kas koperasi selama periode yang dipilih.'
                            }
                          >
                            <IconButton sx={{ display: 'flex', alignItems: 'flex-start' }}>
                              <Icon icon={questionMarkCircleOutline} width={15} height={15} />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">{fCurrency(coopArusKasData.kasKeluar)}</TableCell>
                    </TableRow>
                    <RowResultStyle>
                      <TableCell width={10}></TableCell>
                      <TableCell align="left">
                        <Stack direction="row">
                          <Box height={15} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                            <Typography variant="inherit" sx={{ mt: '0.33rem' }}>
                              <strong>Jumlah kas akhir</strong>
                            </Typography>
                          </Box>
                          <Tooltip
                            title={
                              'Jumlah kas akhir adalah nilai kas akhir koperasi selama periode yang dipilih / saat ini jika periode belum berakhir'
                            }
                          >
                            <IconButton sx={{ display: 'flex', alignItems: 'flex-start' }}>
                              <Icon icon={questionMarkCircleOutline} width={15} height={15} />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">
                        {fCurrency(coopArusKasData.jumlahKasAkhir)}
                      </TableCell>
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
