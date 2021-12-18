import { useRef, useState } from 'react';
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
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import diagonalArrowRightUpFill from '@iconify/icons-eva/diagonal-arrow-right-up-fill';
import diagonalArrowLeftDownFill from '@iconify/icons-eva/diagonal-arrow-left-down-fill';
// material
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
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
  TablePagination
} from '@mui/material';
// utils
import { fCurrency } from '../../../utils/formatNumber';
//
import Label from '../../Label';
import Scrollbar from '../../Scrollbar';
import { MIconButton } from '../../@material-extend';

// ----------------------------------------------------------------------

const SALDO_DISBURSEMENT_REQUEST = [
  {
    id: '1b0fc8a1-cd68-41f6-899e-d0e0676c90bb',
    avatar: '/static/mock-images/avatars/avatar_8.jpg',
    username: 'Annette Hammer',
    timestamp: 1627556358365,
    bankNumber: '2232323243232',
    amount: 200000
  },
  {
    id: '1b0fc8a1-cd68-41f6-899e-d0e0676c75as',
    avatar: '/static/mock-images/avatars/avatar_1.jpg',
    username: 'Vincent James',
    timestamp: 1655336358365,
    bankNumber: '2445623243232',
    amount: 350000
  },
  {
    id: '1b0ak8a1-cd68-41f6-899e-d0e0676c75as',
    avatar: '/static/mock-images/avatars/avatar_2.jpg',
    username: 'Bell Tom',
    timestamp: 1655226358365,
    bankNumber: '2445623243232',
    amount: 700000
  },
  {
    id: '1b0fc8t6-cd68-41f6-899e-d0e0676c90bb',
    avatar: '/static/mock-images/avatars/avatar_8.jpg',
    username: 'Annette Hammer',
    timestamp: 1627556358365,
    bankNumber: '2232323243232',
    amount: 100000
  },
  {
    id: '1b0fc8g3-cd68-41f6-899e-d0e0676c75as',
    avatar: '/static/mock-images/avatars/avatar_1.jpg',
    username: 'Vincent James',
    timestamp: 1655336358365,
    bankNumber: '2445623243232',
    amount: 540000
  },
  {
    id: '1b0fc8a1-cd68-41f6-899e-d0e0676c75as',
    avatar: '/static/mock-images/avatars/avatar_2.jpg',
    username: 'Bell Tom',
    timestamp: 1655336358365,
    bankNumber: '2445623243232',
    amount: 340000
  }
];

// ----------------------------------------------------------------------

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

type SaldoDisbursementRequestListProps = {
  id: string;
  avatar: string | null;
  username: string;
  timestamp: string | number | Date;
  bankNumber: string;
  amount: number;
};

function renderAvatar(request: SaldoDisbursementRequestListProps) {
  return request.avatar ? (
    <Avatar
      alt={request.username}
      src={request.avatar}
      sx={{ width: 48, height: 48, boxShadow: (theme) => theme.customShadows.z8 }}
    />
  ) : (
    <AvatarIcon icon={bookFill} />
  );
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

export default function SaldoDisbursementRequestList() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  const handleClickDownload = () => {};
  const handleClickPrint = () => {};
  const handleClickShare = () => {};
  const handleClickDelete = () => {};

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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - SALDO_DISBURSEMENT_REQUEST.length) : 0;

  return (
    <>
      <Card>
        <CardHeader title="Saldo Disbursement Request" sx={{ mb: 3 }} />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Bank Number</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? SALDO_DISBURSEMENT_REQUEST.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : SALDO_DISBURSEMENT_REQUEST
                ).map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ position: 'relative' }}>{renderAvatar(row)}</Box>
                        <Box sx={{ ml: 2 }}>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {row.username}
                          </Typography>
                          <Typography variant="subtitle2"> {row.username}</Typography>
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

                    <TableCell>{row.bankNumber}</TableCell>

                    <TableCell>{fCurrency(row.amount)}</TableCell>

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
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={SALDO_DISBURSEMENT_REQUEST.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </>
  );
}
