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
  TableCell
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
    id: number;
    periode: string;
    kas: number;
    asetTetap: number;
    modal: number;
    prive: number;
    beban: number;
    harta: number;
    modalCalc: number;
  }

  const [coopNeracaData, setCoopNeracaData] = useState<ICoopNeracaData | undefined>(undefined);

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
        setCoopNeracaData(coopNeracaData);
      }
    };
    fetchData();
  }, [dateValue, user]);

  return (
    <>
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
                    <TableCell align="left">Total</TableCell>
                    <TableCell align="left">{fCurrency(coopNeracaData.harta)}</TableCell>
                  </RowResultStyle>
                  <TableRow>
                    <TableCell align="left">3</TableCell>
                    <TableCell align="left">Modal</TableCell>
                    <TableCell align="left">{fCurrency(coopNeracaData.modal)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">4</TableCell>
                    <TableCell align="left">Prive</TableCell>
                    <TableCell align="left">{fCurrency(coopNeracaData.prive)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">5</TableCell>
                    <TableCell align="left">Beban</TableCell>
                    <TableCell align="left">{fCurrency(coopNeracaData.beban)}</TableCell>
                  </TableRow>
                  <RowResultStyle>
                    <TableCell width={10}></TableCell>
                    <TableCell align="left">Ekuitas</TableCell>
                    <TableCell align="left">{fCurrency(coopNeracaData.modalCalc)}</TableCell>
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
