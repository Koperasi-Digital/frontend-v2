import { useState } from 'react';

// redux
import { RootState, useDispatch, useSelector } from '../../../redux/store';
import { openModalLabaRugi, closeModalLabaRugi } from '../../../redux/slices/financeReport';

import { DialogAnimate } from '../../animate';
import Scrollbar from '../../Scrollbar';

import { Icon } from '@iconify/react';

import { handleGetLabaRugiInfo } from '../../../utils/financeAxios/financeReport';

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

// hooks
import useAuth from 'hooks/useAuth';

type BankingLabaRugiReportProps = {
  dateValue: Date;
};

export default function BankingLabaRugiReport({ dateValue }: BankingLabaRugiReportProps) {
  const dispatch = useDispatch();
  const { isOpenModalLabaRugi } = useSelector((state: RootState) => state.financeReport);

  const { user } = useAuth();

  interface ILabaRugiData {
    id: number;
    user_id: number;
    periode: string;
    jumlahPenjualan: number;
    biayaProduksiProdukTerjual: number;
    biayaOperasi: number;
    net: number;
  }

  const [labaRugiData, setLabaRugiData] = useState<ILabaRugiData | undefined>(undefined);

  const RowResultStyle = styled(TableRow)(({ theme }) => ({
    '& td': {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3)
    }
  }));

  const handleOpenModalLabaRugi = async () => {
    if (user) {
      let currentPeriodeString = dateValue.getFullYear() + '-' + (dateValue.getMonth() + 1) + '-1';
      setLabaRugiData(await handleGetLabaRugiInfo(user.id, currentPeriodeString));
    }
    dispatch(openModalLabaRugi());
  };

  const handleCloseModalLabaRugi = () => {
    dispatch(closeModalLabaRugi());
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <Button variant="contained" onClick={handleOpenModalLabaRugi}>
          Lihat Laporan Laba Rugi
        </Button>
      </Box>
      <DialogAnimate fullScreen open={isOpenModalLabaRugi} onClose={handleCloseModalLabaRugi}>
        <DialogActions
          sx={{
            zIndex: 9,
            padding: '12px !important',
            boxShadow: (theme) => theme.customShadows.z8
          }}
        >
          <Tooltip title="Close">
            <IconButton color="inherit" onClick={handleCloseModalLabaRugi}>
              <Icon icon={closeFill} />
            </IconButton>
          </Tooltip>
        </DialogActions>
        <Stack direction="row" justifyContent="center">
          <Typography variant="h3">Laporan Laba Rugi</Typography>
        </Stack>
        {labaRugiData ? (
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
                    <TableCell align="left">Jumlah Penjualan</TableCell>
                    <TableCell align="left">{fCurrency(labaRugiData.jumlahPenjualan)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">2</TableCell>
                    <TableCell align="left">Biaya Produksi Produk Terjual</TableCell>
                    <TableCell align="left">
                      {fCurrency(labaRugiData.biayaProduksiProdukTerjual)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">3</TableCell>
                    <TableCell align="left">Biaya Operasi</TableCell>
                    <TableCell align="left">{fCurrency(labaRugiData.biayaOperasi)}</TableCell>
                  </TableRow>
                  <RowResultStyle>
                    <TableCell width={10}></TableCell>
                    <TableCell align="left">Net</TableCell>
                    <TableCell align="left">{fCurrency(labaRugiData.net)}</TableCell>
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
