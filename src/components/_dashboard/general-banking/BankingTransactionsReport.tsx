import { useRef, useState, useEffect } from 'react';
import { format } from 'date-fns';
import { sentenceCase } from 'change-case';
import { Icon, IconifyIcon } from '@iconify/react';
import bookFill from '@iconify/icons-eva/book-fill';
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
  Grid,
  Menu,
  Table,
  Avatar,
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

import { handleShowTransaction } from 'utils/financeTransaction';
import { handleShowCoopTransaction } from 'utils/financeCoopTransaction';
import useAuth from 'hooks/useAuth';

type AvatarIconProps = {
  icon: IconifyIcon;
};

type Transaction = {
  id: string;
  order_id: number;
  time: string;
  type: string;
  payment_type: string;
  total_cost: number;
  status: string;
  simpananpokok_id: number;
  simpananwajib_id: number;
  sisahasilusaha_id: string;
  reimbursement_id: string;
  sisahasilusaha_total_cost: number;
  reimbursement_total_cost: number;
  firstuser_id: number;
  firstuser_display_name: string;
  firstuser_photo_url: string;
  destuser_id: number;
  destuser_display_name: string;
  destuser_photo_url: string;
};

function AvatarIcon({ icon }: AvatarIconProps) {
  return (
    <Avatar
      sx={{
        width: 48,
        height: 48,
        color: 'text.secondary',
        bgcolor: 'background.neutral'
      }}
    >
      <Icon icon={icon} width={24} height={24} />
    </Avatar>
  );
}

function renderAvatar(transaction: Transaction) {
  if (transaction.simpananpokok_id) {
    return <AvatarIcon icon={bookFill} />;
  } else if (transaction.simpananwajib_id) {
    return <AvatarIcon icon={bookFill} />;
  } else {
    return transaction.destuser_photo_url ? (
      <Avatar
        alt={transaction.destuser_display_name}
        src={transaction.destuser_photo_url}
        sx={{ width: 48, height: 48, boxShadow: (theme) => theme.customShadows.z8 }}
      />
    ) : null;
  }
}

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

export default function BankingTransactionsReport() {
  // Transactions Filter
  const filterDropdownRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [filterMode, setFilterMode] = useState<string>('All');
  const [allTransactionData, setAllTransactionData] = useState<Transaction[]>([]);
  const [filteredTransactionData, setFilteredTransactionData] = useState<Transaction[]>([]);
  const { user } = useAuth();
  const userId = user?.id;
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
      setFilteredTransactionData(allTransactionData);
    } else if (filterName === 'income') {
      let result = [];
      result = allTransactionData.filter((data) => {
        return data.firstuser_id !== userId;
      });
      setFilteredTransactionData(result);
    } else if (filterName === 'outcome') {
      let result = [];
      result = allTransactionData.filter((data) => {
        return data.firstuser_id === userId;
      });
      setFilteredTransactionData(result);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredTransactionData.length) : 0;

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
      if (userId && fromDateValue && toDateValue) {
        const fromDateString = `${fromDateValue.getFullYear()}-${
          fromDateValue.getMonth() + 1
        }-${fromDateValue.getDate()} 0:0:0`;
        const toDateString = `${toDateValue.getFullYear()}-${
          toDateValue.getMonth() + 1
        }-${toDateValue.getDate()} 23:59:59`;
        const fetchedTransactionList = await handleShowTransaction(
          userId,
          fromDateString,
          toDateString
        );
        const fetchedCoopTransactionList = await handleShowCoopTransaction(
          userId,
          fromDateString,
          toDateString
        );
        setAllTransactionData([...fetchedTransactionList, ...fetchedCoopTransactionList]);
        setFilteredTransactionData([...fetchedTransactionList, ...fetchedCoopTransactionList]);
      }
    };
    fetchData();
  }, [userId, fromDateValue, toDateValue]);

  return (
    <>
      <Card sx={{ padding: 5 }}>
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
                  <TableCell>Description</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Amount</TableCell>
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
                  <TableRow key={row.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ position: 'relative' }}>
                          {renderAvatar(row)}
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
                              ...(row.firstuser_id === userId && {
                                bgcolor: 'error.main'
                              })
                            }}
                          >
                            <Icon
                              icon={
                                row.firstuser_id === userId
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
                            {row.sisahasilusaha_id
                              ? 'Sisa Hasil Usaha'
                              : row.reimbursement_id
                              ? 'Reimbursement'
                              : row.simpananpokok_id
                              ? 'Simpanan Pokok'
                              : row.simpananwajib_id
                              ? 'Simpanan Wajib'
                              : row.firstuser_id === userId
                              ? row.destuser_display_name
                              : row.firstuser_display_name}
                          </Typography>
                          <Typography variant="subtitle2">
                            {row.sisahasilusaha_id
                              ? 'Sisa Hasil Usaha'
                              : row.reimbursement_id
                              ? 'Reimbursement'
                              : row.simpananpokok_id
                              ? 'Simpanan Pokok'
                              : row.simpananwajib_id
                              ? 'Simpanan Wajib'
                              : row.firstuser_id === userId
                              ? row.destuser_display_name
                              : row.firstuser_display_name}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Typography variant="subtitle2">
                        {format(new Date(row.time), 'dd MMM yyyy')}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {format(new Date(row.time), 'p')}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      {row.total_cost
                        ? fCurrency(row.total_cost)
                        : row.sisahasilusaha_total_cost
                        ? fCurrency(row.sisahasilusaha_total_cost)
                        : fCurrency(row.reimbursement_total_cost)}
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
