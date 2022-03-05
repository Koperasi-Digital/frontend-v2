import { useRef, useState, useEffect } from 'react';
import { sentenceCase } from 'change-case';
import { Icon } from '@iconify/react';
import shareFill from '@iconify/icons-eva/share-fill';
import printerFill from '@iconify/icons-eva/printer-fill';
import downloadFill from '@iconify/icons-eva/download-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import arrowDownOutline from '@iconify/icons-eva/arrow-down-outline';
// material
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  CardHeader,
  Stack,
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
  TablePagination
} from '@mui/material';
// utils
import { fCurrency } from '../../../utils/formatNumber';

//Popover
import MenuPopover from '../../MenuPopover';

import Label from '../../Label';
import Scrollbar from '../../Scrollbar';
import { MIconButton } from '../../@material-extend';

// fetch backend data
import { handleListSimpananPokok } from 'utils/financeSimpanan';

type SimpananPokokProps = {
  id: number;
  amount: number;
  userId: number;
  orderId: number;
  user: {
    id: number;
    email: string;
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

export default function BankingMemberSimpananPokok() {
  // Transactions Filter
  const filterDropdownRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [filterMode, setFilterMode] = useState<string>('All');
  const [allSimpananPokokData, setAllSimpananPokokData] = useState<SimpananPokokProps[]>([]);
  const [filteredSimpananPokokData, setFilteredSimpananPokokData] = useState<SimpananPokokProps[]>(
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
      setFilteredSimpananPokokData(allSimpananPokokData);
    } else {
      let result = [];
      result = allSimpananPokokData.filter((data) => {
        if (filterName !== 'LUNAS') {
          return data.order.status !== 'success';
        } else {
          return data.order.status === 'success';
        }
      });
      setFilteredSimpananPokokData(result);
    }
  };

  useEffect(() => {
    const fetchSimpananPokokData = async () => {
      const allSimpananPokok = await handleListSimpananPokok();
      setAllSimpananPokokData(allSimpananPokok);
      setFilteredSimpananPokokData(allSimpananPokok);
    };

    fetchSimpananPokokData();
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredSimpananPokokData.length) : 0;

  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  const handleClickDownload = () => {};
  const handleClickPrint = () => {};
  const handleClickShare = () => {};
  const handleClickDelete = () => {};

  return (
    <>
      <Card sx={{ padding: 5 }}>
        <CardHeader
          title={<Typography variant="h6">Member Simpanan Pokok</Typography>}
          sx={{ mb: 3 }}
        />
        <Stack direction="row" justifyContent="center" sx={{ mb: 3 }}>
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
                onClick={() => handleSearch('LUNAS')}
                sx={{ typography: 'body2', py: 1, px: 2.5 }}
              >
                Lunas
              </MenuItem>
              <MenuItem
                onClick={() => handleSearch('BELUM DIBAYAR')}
                sx={{ typography: 'body2', py: 1, px: 2.5 }}
              >
                Belum Dibayar
              </MenuItem>
            </MenuPopover>
          </Box>
        </Stack>

        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? filteredSimpananPokokData.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : filteredSimpananPokokData
                ).map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ ml: 2 }}>
                          <Typography variant="subtitle2">{row.user.displayName}</Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Typography variant="subtitle2">{fCurrency(row.amount)}</Typography>
                    </TableCell>

                    <TableCell>
                      <Label
                        variant={isLight ? 'ghost' : 'filled'}
                        color={(row.order.status === 'success' && 'success') || 'error'}
                      >
                        {sentenceCase(row.order.status === 'success' ? 'LUNAS' : 'BELUM DIBAYAR')}
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
          count={filteredSimpananPokokData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </>
  );
}
