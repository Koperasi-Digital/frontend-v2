import { useState, useEffect } from 'react';
// material
import {
  Box,
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  CardHeader,
  Stack,
  Tooltip,
  Typography,
  IconButton,
  TableContainer,
  TablePagination
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
import { Icon } from '@iconify/react';
import CashApp from '@iconify/icons-cib/cashapp';
// utils
import { fCurrency } from '../../../utils/formatNumber';
import { fDate, fTime } from '../../../utils/formatTime';
//
import Scrollbar from '../../Scrollbar';

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

export default function DisbursementRequestListTable(props: { status: String }) {
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
          let filteredReimbursementList;
          if (props.status !== 'success') {
            filteredReimbursementList = reimbursementList.filter((data: { status: string }) => {
              return data.status !== 'success';
            });
          } else {
            filteredReimbursementList = reimbursementList.filter((data: { status: string }) => {
              return data.status === 'success';
            });
          }
          setReimbursementList(filteredReimbursementList);
        }
      }
    };
    fetchData();
  }, [currentRole, props.status]);

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

  const disbursementExplanation = `Klik tombol ini untuk mengajukan pencairan dana untuk request pencairan dana id ini`;

  return (
    <>
      <Card>
        <CardHeader title="Pengajuan Pencairan Dana" sx={{ mb: 3 }} />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Tipe</TableCell>
                  {currentRole && currentRole.name === 'ADMIN' ? (
                    <TableCell>Pengguna</TableCell>
                  ) : (
                    <></>
                  )}
                  <TableCell>Tanggal</TableCell>
                  {currentRole && currentRole.name === 'ADMIN' ? (
                    <>
                      <TableCell>Nomor rekening</TableCell>
                      <TableCell>Nama rekening</TableCell>
                      <TableCell>Nama bank</TableCell>
                    </>
                  ) : (
                    <></>
                  )}
                  <TableCell>Jumlah</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {(reimbursementList && rowsPerPage > 0
                  ? reimbursementList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : reimbursementList
                ).map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Typography>{row.id}</Typography>
                        {props.status !== 'success' &&
                        currentRole &&
                        currentRole.name === 'ADMIN' ? (
                          <Tooltip title={disbursementExplanation}>
                            <IconButton
                              onClick={() => {
                                window.location.href = `${PATH_DASHBOARD.managementFinance.disbursementApproval}/${row.id}`;
                              }}
                              sx={{ display: 'flex', alignItems: 'flex-start' }}
                            >
                              <Icon icon={CashApp} width={20} height={20} />
                            </IconButton>
                          </Tooltip>
                        ) : (
                          <></>
                        )}
                      </Stack>
                    </TableCell>
                    <TableCell>{fCurrency(row.total_cost)}</TableCell>
                    <TableCell>{row.type}</TableCell>
                    {currentRole && currentRole.name === 'ADMIN' ? (
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {row.display_name}
                          </Typography>
                        </Box>
                      </TableCell>
                    ) : (
                      <></>
                    )}

                    <TableCell>
                      <Typography variant="subtitle2">{fDate(row.time)}</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {fTime(row.time)}
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
