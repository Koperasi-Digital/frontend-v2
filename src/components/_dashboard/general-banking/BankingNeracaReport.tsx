import { useState } from 'react';

// redux
import { RootState, useDispatch, useSelector } from '../../../redux/store';
import { openModalNeraca, closeModalNeraca } from '../../../redux/slices/financeReport';

import { DialogAnimate } from '../../animate';
import Scrollbar from '../../Scrollbar';

import { Icon } from '@iconify/react';

import { handleGetNeracaInfo } from '../../../utils/financeAxios/financeReport';

// ----------------------------------------------------------------------

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

type BankingNeracaReportProps = {
  dateValue: Date;
};

export default function BankingNeracaReport({ dateValue }: BankingNeracaReportProps) {
  const dispatch = useDispatch();
  const { isOpenModalNeraca } = useSelector((state: RootState) => state.financeReport);

  const { user } = useAuth();

  interface INeracaData {
    asetTetap: number;
    beban: number;
    harta: number;
    id: number;
    kas: number;
    modal: number;
    modalCalc: number;
    periode: string;
    persediaan: number;
    prive: number;
    user_id: number;
  }

  const [neracaData, setNeracaData] = useState<INeracaData | undefined>(undefined);

  const RowResultStyle = styled(TableRow)(({ theme }) => ({
    '& td': {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3)
    }
  }));

  const handleOpenModalNeraca = async () => {
    let periodeString = dateValue.getFullYear() + '-' + (dateValue.getMonth() + 1) + '-1';
    if (user) {
      setNeracaData(await handleGetNeracaInfo(user.id, periodeString));
    }

    dispatch(openModalNeraca());
  };

  const handleCloseModalNeraca = () => {
    dispatch(closeModalNeraca());
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" onClick={handleOpenModalNeraca}>
          Lihat Laporan Neraca
        </Button>
      </Box>
      <DialogAnimate fullScreen open={isOpenModalNeraca} onClose={handleCloseModalNeraca}>
        <DialogActions
          sx={{
            zIndex: 9,
            padding: '12px !important',
            boxShadow: (theme) => theme.customShadows.z8
          }}
        >
          <Tooltip title="Close">
            <IconButton color="inherit" onClick={handleCloseModalNeraca}>
              <Icon icon={closeFill} />
            </IconButton>
          </Tooltip>
        </DialogActions>
        <Stack direction="row" justifyContent="center">
          <Typography variant="h3">Laporan Neraca</Typography>
        </Stack>
        {neracaData ? (
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
                    <TableCell align="left">Kas</TableCell>
                    <TableCell align="left">{fCurrency(neracaData.kas)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">2</TableCell>
                    <TableCell align="left">Persediaan</TableCell>
                    <TableCell align="left">{fCurrency(neracaData.persediaan)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">3</TableCell>
                    <TableCell align="left">Aset Tetap</TableCell>
                    <TableCell align="left">{fCurrency(neracaData.asetTetap)}</TableCell>
                  </TableRow>
                  <RowResultStyle>
                    <TableCell width={10}></TableCell>
                    <TableCell align="left">Total Aset</TableCell>
                    <TableCell align="left">{fCurrency(neracaData.harta)}</TableCell>
                  </RowResultStyle>
                  <TableRow>
                    <TableCell align="left">4</TableCell>
                    <TableCell align="left">Modal</TableCell>
                    <TableCell align="left">{fCurrency(neracaData.modal)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">5</TableCell>
                    <TableCell align="left">Prive</TableCell>
                    <TableCell align="left">{fCurrency(neracaData.prive)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">6</TableCell>
                    <TableCell align="left">Beban</TableCell>
                    <TableCell align="left">{fCurrency(neracaData.beban)}</TableCell>
                  </TableRow>
                  <RowResultStyle>
                    <TableCell width={10}></TableCell>
                    <TableCell align="left">Ekuitas</TableCell>
                    <TableCell align="left">{fCurrency(neracaData.modalCalc)}</TableCell>
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
