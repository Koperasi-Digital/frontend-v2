import { useRef, useState, useEffect } from 'react';
import { format } from 'date-fns';
import { sentenceCase } from 'change-case';
import { Icon, IconifyIcon } from '@iconify/react';
import bookFill from '@iconify/icons-eva/book-fill';
import heartFill from '@iconify/icons-eva/heart-fill';
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
  CardHeader,
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

// ----------------------------------------------------------------------

const TRANSACTIONS = [
  {
    id: '1b0fc8a1-cd68-41f6-899e-d0e0676c90bb',
    avatar: '/static/mock-images/avatars/avatar_8.jpg',
    category: 'Annette Black',
    timestamp: 1627556358365,
    status: 'success',
    gross_amount: 200000,
    type: 'Income'
  },
  {
    id: '1b0fc8a1-cd72-41f6-899e-d0e0676c90bb',
    avatar: '/static/mock-images/avatars/avatar_8.jpg',
    category: 'Courtney Henry',
    timestamp: 1627554444465,
    status: 'pending',
    gross_amount: 150000,
    type: 'Expenses'
  },
  {
    id: '1b0fc8a1-cd72-41f6-8777-d0e0676c90bb',
    avatar: '/static/mock-images/avatars/avatar_8.jpg',
    category: 'Beth White',
    timestamp: 1627554444465,
    status: 'success',
    gross_amount: 170000,
    type: 'Income'
  },
  {
    id: '1b0fc8a1-cd54-41f6-899e-d0e0676c90bb',
    avatar: '/static/mock-images/avatars/avatar_8.jpg',
    category: 'Anne Henry',
    timestamp: 1621116358365,
    status: 'fail',
    gross_amount: 15000,
    type: 'Expenses'
  },
  {
    id: 'b7846c12-662c-465a-8e81-8a35df7531ef',
    avatar: null,
    category: 'Sisa hasil usaha',
    timestamp: 1627556329022,
    status: 'success',
    gross_amount: 20000,
    type: 'Income'
  },
  {
    id: 'b7846c12-555q-465a-8e81-8a35df7531ef',
    avatar: null,
    category: 'Simpanan pokok',
    timestamp: 2427556329038,
    status: 'fail',
    gross_amount: 1000000,
    type: 'Expenses'
  }
];

type AvatarIconProps = {
  icon: IconifyIcon;
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

type TransactionsProps = {
  id: string;
  avatar: string | null;
  category: string;
  timestamp: string | number | Date;
  status: string;
  gross_amount: number | string;
  type: 'Expenses' | 'Income' | string;
};

function renderAvatar(transitions: TransactionsProps) {
  if (transitions.category === 'Simpanan pokok') {
    return <AvatarIcon icon={bookFill} />;
  }
  if (transitions.category === 'Sisa hasil usaha') {
    return <AvatarIcon icon={heartFill} />;
  }
  return transitions.avatar ? (
    <Avatar
      alt={transitions.category}
      src={transitions.avatar}
      sx={{ width: 48, height: 48, boxShadow: (theme) => theme.customShadows.z8 }}
    />
  ) : null;
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
  const [allTransactionData, setAllTransactionData] = useState<TransactionsProps[]>([]);
  const [filteredTransactionData, setFilteredTransactionData] = useState<TransactionsProps[]>([]);
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
    } else {
      let result = [];
      result = allTransactionData.filter((data) => {
        return data.type === filterName;
      });
      setFilteredTransactionData(result);
    }
  };

  useEffect(() => {
    setAllTransactionData(TRANSACTIONS);
    setFilteredTransactionData(TRANSACTIONS);
  }, []);

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

  return (
    <>
      <Card>
        <CardHeader title="Transactions Report" sx={{ mb: 3 }} />
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
                    onClick={() => handleSearch('Income')}
                    sx={{ typography: 'body2', py: 1, px: 2.5 }}
                  >
                    Income
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleSearch('Expenses')}
                    sx={{ typography: 'body2', py: 1, px: 2.5 }}
                  >
                    Expenses
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
                              bgcolor: 'error.main',
                              justifyContent: 'center',
                              ...(row.type === 'Income' && {
                                bgcolor: 'success.main'
                              })
                            }}
                          >
                            <Icon
                              icon={
                                row.type === 'Income'
                                  ? diagonalArrowLeftDownFill
                                  : diagonalArrowRightUpFill
                              }
                              width={16}
                              height={16}
                            />
                          </Box>
                        </Box>
                        <Box sx={{ ml: 2 }}>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {row.category}
                          </Typography>
                          <Typography variant="subtitle2"> {row.category}</Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Typography variant="subtitle2">
                        {format(new Date(row.timestamp), 'dd MMM yyyy')}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {format(new Date(row.timestamp), 'p')}
                      </Typography>
                    </TableCell>

                    <TableCell>{fCurrency(row.gross_amount)}</TableCell>

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
