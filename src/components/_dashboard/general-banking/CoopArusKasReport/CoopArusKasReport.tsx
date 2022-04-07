import { useState, useEffect } from 'react';

import { handleGetCoopArusKasInfo } from 'utils/financeCoopReport';

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

import CoopArusKasReportToolbar from './CoopArusKasReportToolbar';

type CoopArusKasReportProps = {
  dateValue: Date;
};

export default function CoopArusKasReport({ dateValue }: CoopArusKasReportProps) {
  const { user } = useAuth();

  interface ICoopArusKasData {
    id: number;
    periode: string;
    jumlahKasAwal: number;
    kasMasuk: number;
    kasCair: number;
    jumlahKasAkhir: number;
  }

  const [coopArusKasData, setCoopArusKasData] = useState<ICoopArusKasData | undefined>(undefined);

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
        setCoopArusKasData(coopArusKasData);
      }
    };
    fetchData();
  }, [dateValue, user]);

  return (
    <>
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
                    <TableCell align="left">Jumlah Kas Awal</TableCell>
                    <TableCell align="left">{fCurrency(coopArusKasData.jumlahKasAwal)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">2</TableCell>
                    <TableCell align="left">Kas Masuk</TableCell>
                    <TableCell align="left">{fCurrency(coopArusKasData.kasMasuk)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">3</TableCell>
                    <TableCell align="left">Kas Cair</TableCell>
                    <TableCell align="left">{fCurrency(coopArusKasData.kasCair)}</TableCell>
                  </TableRow>
                  <RowResultStyle>
                    <TableCell width={10}></TableCell>
                    <TableCell align="left">Jumlah Kas Akhir</TableCell>
                    <TableCell align="left">{fCurrency(coopArusKasData.jumlahKasAkhir)}</TableCell>
                  </RowResultStyle>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        ) : null}
      </Grid>
    </>
  );
}
