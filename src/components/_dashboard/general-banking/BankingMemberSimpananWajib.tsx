import { useRef, useState, useEffect } from 'react';
import { sentenceCase } from 'change-case';
import { Icon } from '@iconify/react';
import arrowDownOutline from '@iconify/icons-eva/arrow-down-outline';
// material
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  CardHeader,
  Stack,
  Table,
  Button,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer,
  TablePagination,
  TextField
} from '@mui/material';
// utils
import { fCurrency } from '../../../utils/formatNumber';

//Popover
import MenuPopover from '../../MenuPopover';

//for calendar
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import Label from '../../Label';
import Scrollbar from '../../Scrollbar';

// fetch backend data
import { handleListSimpananWajib } from 'utils/financeAxios/financeSimpanan';

type SimpananWajibProps = {
  id: number;
  amount: number;
  userId: number;
  orderId: number;
  period: string;
  user: {
    id: number;
    email: string;
    password: string;
    displayName: string;
  };
  order: {
    id: number;
    user_id: number;
    timestamp: string;
    total_cost: number;
    status: string;
  };
};

const isLunas = (simpananWajib: SimpananWajibProps) => {
  return simpananWajib.order && simpananWajib.order.status === 'LUNAS';
};

export default function BankingMemberSimpananWajib() {
  // Transactions Filter
  const filterDropdownRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [filterMode, setFilterMode] = useState<string>('Semua');
  const [allSimpananWajibData, setAllSimpananWajibData] = useState<SimpananWajibProps[]>([]);
  const [filteredSimpananWajibData, setFilteredSimpananWajibData] = useState<SimpananWajibProps[]>(
    []
  );
  //Date picker
  const [dateValue, setDateValue] = useState<Date | null>(new Date());
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = (filterName: string) => {
    handleClose();

    setFilterMode(filterName);

    if (filterName === 'Semua') {
      setFilteredSimpananWajibData(allSimpananWajibData);
    } else {
      let result = [];
      result = allSimpananWajibData.filter((data) => {
        if (filterName !== 'LUNAS') {
          return !isLunas(data);
        } else {
          return isLunas(data);
        }
      });
      setFilteredSimpananWajibData(result);
    }
  };

  useEffect(() => {
    const fetchSimpananWajibData = async () => {
      const allSimpananWajib = await handleListSimpananWajib(dateValue ? dateValue : new Date());
      setAllSimpananWajibData(allSimpananWajib);
      setFilteredSimpananWajibData(allSimpananWajib);
    };

    fetchSimpananWajibData();
  }, [dateValue]);

  //Table Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredSimpananWajibData.length) : 0;

  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  return (
    <>
      <Card sx={{ padding: 5 }}>
        <CardHeader
          title={<Typography variant="h6">Simpanan Wajib Anggota</Typography>}
          sx={{ mb: 3 }}
        />
        <Stack direction="row" spacing={10} justifyContent="center">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 2, mb: 2 }}>
              <DatePicker
                disableFuture
                label="Pilih bulan"
                openTo="year"
                views={['year', 'month']}
                value={dateValue}
                onChange={(newValue) => {
                  setDateValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </Box>
          </LocalizationProvider>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Button
              onClick={handleOpen}
              ref={filterDropdownRef}
              sx={{ typography: 'h6', py: 1, px: 2.5, border: 2 }}
            >
              {filterMode}
              <Icon icon={arrowDownOutline} width={16} height={16} />
            </Button>

            <MenuPopover
              open={open}
              onClose={handleClose}
              anchorEl={filterDropdownRef.current}
              sx={{ width: 220 }}
            >
              <MenuItem
                onClick={() => handleSearch('Semua')}
                sx={{ typography: 'body2', py: 1, px: 2.5 }}
              >
                Semua
              </MenuItem>
              <MenuItem
                onClick={() => handleSearch('LUNAS')}
                sx={{ typography: 'body2', py: 1, px: 2.5 }}
              >
                Lunas
              </MenuItem>
              <MenuItem
                onClick={() => handleSearch('BELUM LUNAS')}
                sx={{ typography: 'body2', py: 1, px: 2.5 }}
              >
                Belum Lunas
              </MenuItem>
            </MenuPopover>
          </Box>
        </Stack>

        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nama</TableCell>
                  <TableCell>Jumlah</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0 && filteredSimpananWajibData
                  ? filteredSimpananWajibData.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : filteredSimpananWajibData
                ).map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ ml: 2 }}>
                          <Typography variant="subtitle2">
                            {row.user ? row.user.displayName : 'Tidak ada data pengguna'}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Typography variant="subtitle2">{fCurrency(row.amount)}</Typography>
                    </TableCell>

                    <TableCell>
                      <Label
                        variant={isLight ? 'ghost' : 'filled'}
                        color={(isLunas(row) && 'success') || 'error'}
                      >
                        {sentenceCase(isLunas(row) ? 'LUNAS' : 'BELUM DIBAYAR')}
                      </Label>
                    </TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
                {filteredSimpananWajibData.length === 0 && (
                  <TableCell colSpan={3}>
                    <Stack direction="row" justifyContent="center">
                      Tidak ada data
                    </Stack>
                  </TableCell>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredSimpananWajibData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </>
  );
}
