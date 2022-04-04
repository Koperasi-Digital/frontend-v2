import { useState, useEffect } from 'react';

import { handleGetArusKasInfo } from 'utils/financeReport';

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

import ArusKasReportToolbar from './ArusKasReportToolbar';

type ArusKasReportProps = {
  dateValue: Date;
};

export default function ArusKasReport({ dateValue }: ArusKasReportProps) {
  const { user } = useAuth();

  interface IArusKasData {
    id: number;
    user_id: number;
    periode: string;
    jumlahKasAwal: number;
    kasMasuk: number;
    kasCair: number;
    jumlahKasAkhir: number;
  }

  const [arusKasData, setArusKasData] = useState<IArusKasData | undefined>(undefined);

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
        const arusKasData = await handleGetArusKasInfo(user.id, currentPeriodString);
        setArusKasData(arusKasData);
      }
    };
    fetchData();
  }, [dateValue, user]);

  return (
    <>
      <Grid container spacing={3}>
        {arusKasData ? (
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
              <ArusKasReportToolbar arusKasData={arusKasData} />
            </Stack>
          </Grid>
        ) : null}
        {arusKasData ? (
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
                    <TableCell align="left">{fCurrency(arusKasData.jumlahKasAwal)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">2</TableCell>
                    <TableCell align="left">Kas Masuk</TableCell>
                    <TableCell align="left">{fCurrency(arusKasData.kasMasuk)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">3</TableCell>
                    <TableCell align="left">Kas Cair</TableCell>
                    <TableCell align="left">{fCurrency(arusKasData.kasCair)}</TableCell>
                  </TableRow>
                  <RowResultStyle>
                    <TableCell width={10}></TableCell>
                    <TableCell align="left">Jumlah Kas Akhir</TableCell>
                    <TableCell align="left">{fCurrency(arusKasData.jumlahKasAkhir)}</TableCell>
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
