import { useRef, useState, useEffect } from 'react';
import { format } from 'date-fns';
import { sentenceCase } from 'change-case';
import { Icon, IconifyIcon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';
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
import { styled } from '@mui/material/styles';

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
  TextField,
  Paper
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

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(4),
  textAlign: 'center'
}));

export default function BankingMemberReport() {
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

    if (filterName == 'All') {
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
  }, [TRANSACTIONS]);

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
  const [dateValue, setDateValue] = useState<Date | null>(new Date());

  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  const handleClickDownload = () => {};
  const handleClickPrint = () => {};
  const handleClickShare = () => {};
  const handleClickDelete = () => {};

  return (
    <>
      <Card>
        <CardHeader title="Cooperation Report" sx={{ mb: 3 }} />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ mb: 10 }}>
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

        <Item>
          <Typography variant="h4" gutterBottom>
            Total simpanan koperasi: Rp4.000.000,00
          </Typography>
        </Item>
        <Item>
          <Typography variant="h6" gutterBottom>
            SHU/anggota: Rp200.000,00
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: (theme) => theme.palette.error.main }}
            gutterBottom
          >
            *SHU = 2% dari total simpanan koperasi
          </Typography>
        </Item>
      </Card>
    </>
  );
}
