import { useState } from 'react';

// redux
import { RootState, useDispatch, useSelector } from '../../../redux/store';
import { openModalArusKas, closeModalArusKas } from '../../../redux/slices/financeReport';

import { DialogAnimate } from '../../animate';
import Scrollbar from '../../Scrollbar';

import { handleGetArusKasInfo } from '../../../utils/financeReport';

import { Icon } from '@iconify/react';

import { styled } from '@mui/material/styles';
import {
  Box,
  Button,
  Stack,
  Typography,
  Table,
  TableRow,
  TableContainer,
  TableBody,
  TableHead,
  TableCell,
  DialogActions,
  Tooltip,
  IconButton
} from '@mui/material';

import closeFill from '@iconify/icons-eva/close-fill';
import { fCurrency } from '../../../utils/formatNumber';

type BankingArusKasReportProps = {
  dateValue: Date;
};

export default function BankingArusKasReport({ dateValue }: BankingArusKasReportProps) {
  const dispatch = useDispatch();
  const { isOpenModalArusKas } = useSelector((state: RootState) => state.financeReport);

  interface IArusKasData {
    id: number;
    user_id: number;
    periode: string;
    jumlahKasAwal: number;
    kasMasuk: number;
    kasCair: number;
    jumlah_kas_akhir: number;
  }

  const [arusKasData, setArusKasData] = useState<IArusKasData | undefined>(undefined);

  const RowResultStyle = styled(TableRow)(({ theme }) => ({
    '& td': {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3)
    }
  }));

  const handleOpenModalArusKas = async () => {
    setArusKasData(await handleGetArusKasInfo(dateValue));
    dispatch(openModalArusKas());
  };

  const handleCloseModalArusKas = () => {
    dispatch(closeModalArusKas());
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" onClick={handleOpenModalArusKas}>
          Lihat Laporan Arus Kas
        </Button>
      </Box>
      <DialogAnimate fullScreen open={isOpenModalArusKas} onClose={handleCloseModalArusKas}>
        <DialogActions
          sx={{
            zIndex: 9,
            padding: '12px !important',
            boxShadow: (theme) => theme.customShadows.z8
          }}
        >
          <Tooltip title="Close">
            <IconButton color="inherit" onClick={handleCloseModalArusKas}>
              <Icon icon={closeFill} />
            </IconButton>
          </Tooltip>
        </DialogActions>
        <Stack direction="row" justifyContent="center">
          <Typography variant="h3">Laporan Arus Kas</Typography>
        </Stack>
        {arusKasData ? (
          <Scrollbar>
            <TableContainer sx={{ minWidth: 100 }}>
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
                    <TableCell align="left">{fCurrency(arusKasData.jumlah_kas_akhir)}</TableCell>
                  </RowResultStyle>
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        ) : (
          <Stack direction="row" justifyContent="center">
            <Typography variant="h6">Data Tidak Tersedia</Typography>
          </Stack>
        )}
      </DialogAnimate>
    </>
  );
}
