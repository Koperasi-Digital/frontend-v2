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
  TablePagination
} from '@mui/material';
// utils
import { fCurrency } from '../../../utils/formatNumber';

//Popover
import MenuPopover from '../../MenuPopover';

import Label from '../../Label';
import Scrollbar from '../../Scrollbar';

// fetch backend data
import { handleListSimpananPokok } from 'utils/financeAxios/financeSimpanan';

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

const isLunas = (simpananPokok: SimpananPokokProps) => {
  return simpananPokok.order && simpananPokok.order.status === 'LUNAS';
};

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
          return !isLunas(data);
        } else {
          return isLunas(data);
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

  return (
    <>
      <Card sx={{ padding: 5 }}>
        <CardHeader
          title={<Typography variant="h6">Simpanan Pokok Anggota</Typography>}
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
                {(rowsPerPage > 0 && filteredSimpananPokokData
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
                          <Typography variant="subtitle2">
                            {row.user ? row.user.displayName : 'No user data'}
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
