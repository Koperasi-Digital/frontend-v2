import { useState, useEffect } from 'react';

import { handleGetCoopNeracaInfo } from 'utils/financeAxios/financeCoopReport';

import { styled } from '@mui/material/styles';

import {
  Stack,
  Table,
  TableRow,
  TableContainer,
  TableBody,
  TableHead,
  TableCell,
  Box,
  Typography
} from '@mui/material';

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
                      <TableCell align="left">Kas</TableCell>
                      <TableCell align="left">{fCurrency(coopNeracaData.kas)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">2</TableCell>
                      <TableCell align="left">Aset Tetap</TableCell>
                      <TableCell align="left">{fCurrency(coopNeracaData.asetTetap)}</TableCell>
                    </TableRow>
                    <RowResultStyle>
                      <TableCell width={10}></TableCell>
                      <TableCell align="left">Aset</TableCell>
                      <TableCell align="left">{fCurrency(coopNeracaData.aset)}</TableCell>
                    </RowResultStyle>
                    <TableRow>
                      <TableCell align="left">3</TableCell>
                      <TableCell align="left">Saldo Member</TableCell>
                      <TableCell align="left">{fCurrency(coopNeracaData.saldoMember)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">4</TableCell>
                      <TableCell align="left">Simpanan Sukarela Member</TableCell>
                      <TableCell align="left">
                        {fCurrency(coopNeracaData.simpananSukarela)}
                      </TableCell>
                    </TableRow>
                    <RowResultStyle>
                      <TableCell width={10}></TableCell>
                      <TableCell align="left">Liabilitas</TableCell>
                      <TableCell align="left">{fCurrency(coopNeracaData.liabilitas)}</TableCell>
                    </RowResultStyle>
                    <TableRow>
                      <TableCell align="left">5</TableCell>
                      <TableCell align="left">Pendapatan</TableCell>
                      <TableCell align="left">{fCurrency(coopNeracaData.pendapatan)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">6</TableCell>
                      <TableCell align="left">Modal</TableCell>
                      <TableCell align="left">{fCurrency(coopNeracaData.modal)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">7</TableCell>
                      <TableCell align="left">Beban</TableCell>
                      <TableCell align="left">{fCurrency(coopNeracaData.beban)}</TableCell>
                    </TableRow>
                    <RowResultStyle>
                      <TableCell width={10}></TableCell>
                      <TableCell align="left">Ekuitas</TableCell>
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
