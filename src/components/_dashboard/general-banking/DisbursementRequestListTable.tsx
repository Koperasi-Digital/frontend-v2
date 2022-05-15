import { useRef, useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Icon, IconifyIcon } from '@iconify/react';
import bookFill from '@iconify/icons-eva/book-fill';
import shareFill from '@iconify/icons-eva/share-fill';
import printerFill from '@iconify/icons-eva/printer-fill';
import downloadFill from '@iconify/icons-eva/download-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import {
  Box,
  Card,
  Menu,
  Table,
  Avatar,
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
import Scrollbar from '../../Scrollbar';
import { MIconButton } from '../../@material-extend';

import {
  handleListReimbursement,
  handleUserListReimbursement
} from 'utils/financeAxios/financeReimbursement';

// hooks
import useAuth from 'hooks/useAuth';

// ----------------------------------------------------------------------

type Reimbursement = {
  id: string;
  userId: number;
  time: string;
  type: string;
  total_cost: number;
  status: string;
  account_number: string;
  account_name: string;
  bank_name: string;
  display_name: string;
  photo_url: string;
};

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

function renderAvatar(request: Reimbursement) {
  return request.photo_url ? (
    <Avatar
      alt={request.display_name}
      src={request.photo_url}
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

export default function DisbursementRequestListTable() {
  const { currentRole } = useAuth();
  const [reimbursementList, setReimbursementList] = useState<Reimbursement[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      let reimbursementList;
      if (currentRole) {
        if (currentRole.name === 'ADMIN') {
          reimbursementList = await handleListReimbursement();
        } else {
          reimbursementList = await handleUserListReimbursement();
        }
        if (reimbursementList) {
          const filteredReimbursementList = reimbursementList.filter((data: { status: string }) => {
            return data.status !== 'success';
          });
          setReimbursementList(filteredReimbursementList);
        }
      }
    };
    fetchData();
  }, [currentRole]);

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
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - reimbursementList.length) : 0;

  return (
    <>
      <Card>
        <CardHeader title="Disbursement Request" sx={{ mb: 3 }} />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Type</TableCell>
                  {currentRole && currentRole.name === 'ADMIN' ? (
                    <TableCell>User</TableCell>
                  ) : (
                    <></>
                  )}
                  <TableCell>Date</TableCell>
                  {currentRole && currentRole.name === 'ADMIN' ? (
                    <>
                      <TableCell>Account Number</TableCell>
                      <TableCell>Account Name</TableCell>
                      <TableCell>Bank Name</TableCell>
                    </>
                  ) : (
                    <></>
                  )}
                  <TableCell>Amount</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {(reimbursementList && rowsPerPage > 0
                  ? reimbursementList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : reimbursementList
                ).map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.type}</TableCell>
                    {currentRole && currentRole.name === 'ADMIN' ? (
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ position: 'relative' }}>{renderAvatar(row)}</Box>
                          <Box sx={{ ml: 2 }}>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              {row.display_name}
                            </Typography>
                            <Typography variant="subtitle2"> {row.display_name}</Typography>
                          </Box>
                        </Box>
                      </TableCell>
                    ) : (
                      <></>
                    )}

                    <TableCell>
                      <Typography variant="subtitle2">
                        {format(new Date(row.time), 'dd MMM yyyy')}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {format(new Date(row.time), 'p')}
                      </Typography>
                    </TableCell>

                    {currentRole && currentRole.name === 'ADMIN' ? (
                      <>
                        <TableCell>{row.account_number}</TableCell>

                        <TableCell>{row.account_name}</TableCell>

                        <TableCell>{row.bank_name}</TableCell>
                      </>
                    ) : (
                      <></>
                    )}

                    <TableCell>{fCurrency(row.total_cost)}</TableCell>

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
          count={reimbursementList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </>
  );
}
