import { useRef, useState, useEffect } from 'react';
import { sentenceCase } from 'change-case';
import { Icon } from '@iconify/react';
import shareFill from '@iconify/icons-eva/share-fill';
import printerFill from '@iconify/icons-eva/printer-fill';
import downloadFill from '@iconify/icons-eva/download-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
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
  Menu,
  Table,
  Button,
  Divider,
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
import { MIconButton } from '../../@material-extend';

import { handleListCoopTransactions } from 'utils/financeAxios/financeCoopTransaction';

type CoopTransaction = {
  id: string;
  type: string;
  time: Date;
  total_cost: number;
  status: string;
  destUser: {
    displayName: string;
  };
};

type MoreMenuButtonProps = {
  onDownload: VoidFunction;
  onPrint: VoidFunction;
  onShare: VoidFunction;
  onDelete: VoidFunction;
};

function MoreMenuButton({ onDownload, onPrint, onShare, onDelete }: MoreMenuButtonProps) {
  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <>
        <MIconButton ref={menuRef} size="large" onClick={handleOpen}>
          <Icon icon={moreVerticalFill} width={20} height={20} />
        </MIconButton>
      </>

      <Menu
        open={open}
        anchorEl={menuRef.current}
        onClose={handleClose}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={onDownload}>
          <Icon icon={downloadFill} width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Download
          </Typography>
        </MenuItem>
        <MenuItem onClick={onPrint}>
          <Icon icon={printerFill} width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Print
          </Typography>
        </MenuItem>
        <MenuItem onClick={onShare}>
          <Icon icon={shareFill} width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Share
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={onDelete} sx={{ color: 'error.main' }}>
          <Icon icon={trash2Outline} width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Delete
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
}

export function isOutcome(coopTransaction: CoopTransaction) {
  return (
    coopTransaction.type === 'sisa hasil usaha' ||
    coopTransaction.type === 'reimbursement saldo' ||
    coopTransaction.type === 'reimbursement simpanan-sukarela'
  );
}

export default function BankingCoopTransactionsReport() {
  // Transactions Filter
  const filterDropdownRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [filterMode, setFilterMode] = useState<string>('All');
  const [allCoopTransactionData, setAllCoopTransactionData] = useState<CoopTransaction[]>([]);
  const [filteredCoopTransactionData, setFilteredCoopTransactionData] = useState<CoopTransaction[]>(
    []
  );
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSearch = (filterName: string) => {
    handleClose();

    setFilterMode(filterName);

    if (filterName === 'All') {
      setFilteredCoopTransactionData(allCoopTransactionData);
    } else if (filterName === 'income') {
      let result = [];
      result = allCoopTransactionData.filter((data) => {
        return !isOutcome(data);
      });
      setFilteredCoopTransactionData(result);
    } else if (filterName === 'outcome') {
      let result = [];
      result = allCoopTransactionData.filter((data) => {
        return isOutcome(data);
      });
      setFilteredCoopTransactionData(result);
    }
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredCoopTransactionData.length) : 0;

  //Date picker
  const [fromDateValue, setFromDateValue] = useState<Date | null>(new Date());
  const [toDateValue, setToDateValue] = useState<Date | null>(new Date());

  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  const handleClickDownload = () => {};
  const handleClickPrint = () => {};
  const handleClickShare = () => {};
  const handleClickDelete = () => {};

  useEffect(() => {
    const fetchData = async () => {
      if (fromDateValue && toDateValue) {
        const fromDateString = `${fromDateValue.getFullYear()}-${
          fromDateValue.getMonth() + 1
        }-${fromDateValue.getDate()} 0:0:0`;
        const toDateString = `${toDateValue.getFullYear()}-${
          toDateValue.getMonth() + 1
        }-${toDateValue.getDate()} 23:59:59`;
        const fetchedCoopTransactionList = await handleListCoopTransactions(
          fromDateString,
          toDateString
        );
        if (fetchedCoopTransactionList) {
          setAllCoopTransactionData(fetchedCoopTransactionList);
          setFilteredCoopTransactionData(fetchedCoopTransactionList);
        }
      }
    };
    fetchData();
  }, [fromDateValue, toDateValue]);

  return (
    <>
      <Card sx={{ padding: 5 }}>
        <CardHeader
          title={<Typography variant="h6">Riwayat transaksi koperasi</Typography>}
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
            <Grid item sm={12} lg={4}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <DatePicker
                  disableFuture
                  label="Dari"
                  openTo="year"
                  views={['year', 'month', 'day']}
                  value={fromDateValue}
                  onChange={(newValue) => {
                    setFromDateValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Box>
            </Grid>

            <Grid item sm={12} lg={4}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <DatePicker
                  disableFuture
                  label="Sampai"
                  openTo="year"
                  views={['year', 'month', 'day']}
                  value={toDateValue}
                  onChange={(newValue) => {
                    setToDateValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Box>
            </Grid>

            <Grid item sm={12} lg={4}>
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
                    onClick={() => handleSearch('All')}
                    sx={{ typography: 'body2', py: 1, px: 2.5 }}
                  >
                    All
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleSearch('income')}
                    sx={{ typography: 'body2', py: 1, px: 2.5 }}
                  >
                    Income
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleSearch('outcome')}
                    sx={{ typography: 'body2', py: 1, px: 2.5 }}
                  >
                    Outcome
                  </MenuItem>
                </MenuPopover>
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
                  ? filteredCoopTransactionData.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : filteredCoopTransactionData
                ).map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ position: 'relative' }}>
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
                              ...(isOutcome(row) && {
                                bgcolor: 'error.main'
                              })
                            }}
                          >
                            <Icon
                              icon={
                                isOutcome(row)
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
                            {row.type}
                          </Typography>
                          <Typography variant="subtitle2">{row.destUser.displayName}</Typography>
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

                    <TableCell>{fCurrency(row.total_cost)}</TableCell>

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

                    <TableCell align="right">
                      <MoreMenuButton
                        onDownload={handleClickDownload}
                        onPrint={handleClickPrint}
                        onShare={handleClickShare}
                        onDelete={handleClickDelete}
                      />
                    </TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredCoopTransactionData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </>
  );
}
