import { useRef, useState, useEffect } from 'react';
import { sentenceCase } from 'change-case';
import { Icon } from '@iconify/react';
import arrowDownOutline from '@iconify/icons-eva/arrow-down-outline';
import diagonalArrowRightUpFill from '@iconify/icons-eva/diagonal-arrow-right-up-fill';
import diagonalArrowLeftDownFill from '@iconify/icons-eva/diagonal-arrow-left-down-fill';
// material
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  CardHeader,
  Grid,
  Table,
  Button,
  MenuItem,
  Stack,
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

import { handleListTransactions } from 'utils/financeAxios/financeTransaction';
import { handleShowUserCoopTransaction } from 'utils/financeAxios/financeCoopTransaction';
import useAuth from 'hooks/useAuth';

type Transaction = {
  id: string;
  order_details_table_id: string;
  time: Date;
  type: string;
  order_total_cost: number;
  total_cost: number;
  order_details_subtotal: number;
  status: string;
  firstuser_id: number;
  firstuser_display_name: string;
  destuser_display_name: string;
};

export function isOutcome(transaction: Transaction, userId: number) {
  return (
    transaction.firstuser_id === userId ||
    transaction.type === 'simpanan pokok' ||
    transaction.type === 'simpanan wajib' ||
    transaction.type === 'simpanan sukarela'
  );
}

export default function BankingTransactionsReport() {
  // Transactions Filter
  const filterTypeDropdownRef = useRef(null);
  const filterStatusDropdownRef = useRef(null);
  const [openTypeFilter, setOpenTypeFilter] = useState(false);
  const [openStatusFilter, setOpenStatusFilter] = useState(false);
  const [filterTypeMode, setFilterTypeMode] = useState<string>('semua');
  const [filterStatusMode, setFilterStatusMode] = useState<string>('semua');
  const [allTransactionData, setAllTransactionData] = useState<Transaction[]>([]);
  const [filteredTransactionData, setFilteredTransactionData] = useState<Transaction[]>([]);
  const { user } = useAuth();
  const userId = user?.id;
  const handleOpenTypeFilter = () => {
    setOpenTypeFilter(true);
  };
  const handleCloseTypeFilter = () => {
    setOpenTypeFilter(false);
  };
  const handleOpenStatusFilter = () => {
    setOpenStatusFilter(true);
  };
  const handleCloseStatusFilter = () => {
    setOpenStatusFilter(false);
  };
  const handleSearch = (param: { filterType?: string; filterStatus?: string }) => {
    let filteredTransaction: Transaction[] = allTransactionData;
    const typeFilter = param.filterType ? param.filterType : filterTypeMode;
    const statusFilter = param.filterStatus ? param.filterStatus : filterStatusMode;
    if (param.filterType) {
      handleCloseTypeFilter();
      setFilterTypeMode(param.filterType);
    }
    if (param.filterStatus) {
      handleCloseStatusFilter();
      setFilterStatusMode(param.filterStatus);
    }
    if (typeFilter === 'semua') {
      //do nothing
    } else if (typeFilter === 'pemasukan') {
      filteredTransaction = filteredTransaction.filter((data) => {
        return !isOutcome(data, userId);
      });
    } else {
      filteredTransaction = filteredTransaction.filter((data) => {
        return isOutcome(data, userId);
      });
    }

    if (statusFilter === 'semua') {
      //do nothing
    } else if (statusFilter === 'success') {
      filteredTransaction = filteredTransaction.filter((data) => {
        return data.status === 'success';
      });
    } else {
      filteredTransaction = filteredTransaction.filter((data) => {
        return data.status !== 'success';
      });
    }
    setFilteredTransactionData(filteredTransaction);
  };

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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredTransactionData.length) : 0;

  //Date picker
  const [fromDateValue, setFromDateValue] = useState<Date | null>(new Date());
  const [toDateValue, setToDateValue] = useState<Date | null>(new Date());

  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  useEffect(() => {
    const fetchData = async () => {
      if (userId && fromDateValue && toDateValue) {
        const fromDateString = `${fromDateValue.getFullYear()}-${
          fromDateValue.getMonth() + 1
        }-${fromDateValue.getDate()} 0:0:0`;
        const toDateString = `${toDateValue.getFullYear()}-${
          toDateValue.getMonth() + 1
        }-${toDateValue.getDate()} 23:59:59`;
        const fetchedTransactionList = await handleListTransactions(fromDateString, toDateString);
        const fetchedCoopTransactionList = await handleShowUserCoopTransaction(
          fromDateString,
          toDateString
        );
        let fetchedAllTransactionList = [...fetchedTransactionList, ...fetchedCoopTransactionList];
        fetchedAllTransactionList = fetchedAllTransactionList.sort((a, b) => {
          let da = new Date(a.time),
            db = new Date(b.time);
          return db.valueOf() - da.valueOf();
        });
        if (fetchedTransactionList && fetchedCoopTransactionList) {
          setAllTransactionData(fetchedAllTransactionList);
          setFilteredTransactionData(fetchedAllTransactionList);
        }
      }
    };
    fetchData();
  }, [userId, fromDateValue, toDateValue]);

  return (
    <>
      <Card sx={{ padding: 5 }}>
        <CardHeader
          title={<Typography variant="h6">Riwayat transaksi</Typography>}
          sx={{ mb: 3 }}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid
            container
            spacing={3}
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{ mb: 2 }}
          >
            <Grid item sm={12} lg={6}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <DatePicker
                  disableFuture
                  label="Dari"
                  views={['year', 'month', 'day']}
                  value={fromDateValue}
                  onChange={(newValue) => {
                    setFromDateValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Box>
            </Grid>

            <Grid item sm={12} lg={6}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <DatePicker
                  disableFuture
                  label="Sampai"
                  views={['year', 'month', 'day']}
                  value={toDateValue}
                  onChange={(newValue) => {
                    setToDateValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Box>
            </Grid>

            <Grid item sm={12} lg={6}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Stack direction="row" spacing={2}>
                  <Typography sx={{ mt: 2 }}>Filter tipe transaksi:</Typography>
                  <Button
                    onClick={handleOpenTypeFilter}
                    ref={filterTypeDropdownRef}
                    sx={{ typography: 'h6', py: 1, px: 2.5, border: 2 }}
                  >
                    {filterTypeMode}
                    <Icon icon={arrowDownOutline} width={16} height={16} />
                  </Button>

                  <MenuPopover
                    open={openTypeFilter}
                    onClose={handleCloseTypeFilter}
                    anchorEl={filterTypeDropdownRef.current}
                    sx={{ width: 220 }}
                  >
                    <MenuItem
                      onClick={() => handleSearch({ filterType: 'semua' })}
                      sx={{ typography: 'body2', py: 1, px: 2.5 }}
                    >
                      Semua
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleSearch({ filterType: 'pemasukan' })}
                      sx={{ typography: 'body2', py: 1, px: 2.5 }}
                    >
                      Pemasukan
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleSearch({ filterType: 'pengeluaran' })}
                      sx={{ typography: 'body2', py: 1, px: 2.5 }}
                    >
                      Pengeluaran
                    </MenuItem>
                  </MenuPopover>
                </Stack>
              </Box>
            </Grid>
            <Grid item sm={12} lg={6}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Stack direction="row" spacing={2}>
                  <Typography sx={{ mt: 2 }}>Filter status transaksi:</Typography>
                  <Button
                    onClick={handleOpenStatusFilter}
                    ref={filterStatusDropdownRef}
                    sx={{ typography: 'h6', py: 1, px: 2.5, border: 2 }}
                  >
                    {filterStatusMode}
                    <Icon icon={arrowDownOutline} width={16} height={16} />
                  </Button>

                  <MenuPopover
                    open={openStatusFilter}
                    onClose={handleCloseStatusFilter}
                    anchorEl={filterStatusDropdownRef.current}
                    sx={{ width: 220 }}
                  >
                    <MenuItem
                      onClick={() => handleSearch({ filterStatus: 'semua' })}
                      sx={{ typography: 'body2', py: 1, px: 2.5 }}
                    >
                      Semua
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleSearch({ filterStatus: 'success' })}
                      sx={{ typography: 'body2', py: 1, px: 2.5 }}
                    >
                      Berhasil
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleSearch({ filterStatus: 'not success' })}
                      sx={{ typography: 'body2', py: 1, px: 2.5 }}
                    >
                      Tidak berhasil
                    </MenuItem>
                  </MenuPopover>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </LocalizationProvider>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Deskripsi</TableCell>
                  <TableCell>Tanggal</TableCell>
                  <TableCell>Jumlah</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? filteredTransactionData.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : filteredTransactionData
                ).map((row) => (
                  <TableRow key={row.order_details_table_id ? row.order_details_table_id : row.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ position: 'relative' }}>
                          {/* {renderAvatar(row)} */}
                          <Box
                            sx={{
                              right: 0,
                              bottom: 0,
                              width: 18,
                              height: 18,
                              display: 'flex',
                              borderRadius: '50%',
                              position: 'absolute',
                              alignItems: 'center',
                              color: 'common.white',
                              bgcolor: 'success.main',
                              justifyContent: 'center',
                              ...(isOutcome(row, userId) && {
                                bgcolor: 'error.main'
                              })
                            }}
                          >
                            <Icon
                              icon={
                                isOutcome(row, userId)
                                  ? diagonalArrowRightUpFill
                                  : diagonalArrowLeftDownFill
                              }
                              width={16}
                              height={16}
                            />
                          </Box>
                        </Box>
                        <Box sx={{ ml: 2 }}>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {row.type ? row.type : 'E-Commerce '}
                          </Typography>
                          <Typography variant="subtitle2">
                            {row.type
                              ? row.type
                              : row.firstuser_id === userId
                              ? row.destuser_display_name
                              : row.firstuser_display_name}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Typography variant="subtitle2">
                        {`${new Date(row.time).getDate()}-${new Date(
                          row.time
                        ).getMonth()}-${new Date(row.time).getFullYear()}`}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {`${new Date(row.time).getHours()}:${new Date(
                          row.time
                        ).getMinutes()}:${new Date(row.time).getSeconds()}`}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      {fCurrency(
                        row.order_details_subtotal
                          ? row.order_details_subtotal
                          : row.order_total_cost
                          ? row.order_total_cost
                          : row.total_cost
                      )}
                    </TableCell>

                    <TableCell>
                      <Label
                        variant={isLight ? 'ghost' : 'filled'}
                        color={
                          (row.status === 'success' && 'success') ||
                          (row.status === 'pending' && 'warning') ||
                          'error'
                        }
                      >
                        {sentenceCase(row.status)}
                      </Label>
                    </TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
                {filteredTransactionData.length === 0 && (
                  <TableCell colSpan={5}>
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
          count={filteredTransactionData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </>
  );
}
