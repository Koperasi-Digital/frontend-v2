import { useState, useEffect, useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { capitalize } from 'lodash';
import {
  Button,
  Card,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  CardHeader,
  Chip,
  Link,
  Typography
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from 'routes/paths';
// utils
import axios from 'utils/axios';
import { fDateTime } from 'utils/formatTime';
// types
import { UserManager } from '../../../../@types/user';
// hooks
import useIsMountedRef from 'hooks/useIsMountedRef';
import useAuth from 'hooks/useAuth';
// components
import Scrollbar from 'components/Scrollbar';
import UserActivityLogForm from './UserActivityLogForm';

// ----------------------------------------------------------------------

interface UserActivityLogsProps {
  user: UserManager;
}

export default function UserActivityLogs({ user }: UserActivityLogsProps) {
  const isMountedRef = useIsMountedRef();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [activityLogList, setActivityLogList] = useState([]);
  const { currentRole } = useAuth();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const getUserActivityLogs = useCallback(async () => {
    try {
      const response = await axios.get('activity-logs', {
        params: {
          id: user.id
        }
      });
      if (isMountedRef.current) {
        const { activityLogs, allActivities } = response.data.payload;
        const finalActivityLogs = allActivities.map((activity: any) => {
          let attendingAt;
          const activityLog = activityLogs.filter(
            (activityLog: any) => activityLog.activity.id === activity.id
          );
          if (activityLog.length) attendingAt = activityLog[0].created_at;
          return {
            ...activity,
            attendingAt
          };
        });
        setActivityLogList(finalActivityLogs);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef, user.id]);

  useEffect(() => {
    getUserActivityLogs();
  }, [getUserActivityLogs]);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - activityLogList.length) : 0;

  const handleActivityLogFormClose = () => {
    getUserActivityLogs();
    setIsOpenModal(false);
  };

  return (
    <>
      <Card>
        <CardHeader
          title="Keaktifan Anggota (Presensi Meeting)"
          sx={{ mb: 3 }}
          action={
            currentRole &&
            currentRole?.name === 'ADMIN' && (
              <Button variant="contained" onClick={() => setIsOpenModal(true)}>
                Tambah
              </Button>
            )
          }
        />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nama</TableCell>
                  <TableCell>Tipe</TableCell>
                  <TableCell>Waktu Mulai</TableCell>
                  <TableCell>Waktu Selesai</TableCell>
                  <TableCell>Waktu Hadir</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activityLogList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const { id, name, type, startAt, endAt, attendingAt } = row;

                    return (
                      <TableRow hover key={id} tabIndex={-1}>
                        <TableCell align="left">{id}</TableCell>
                        <TableCell align="left">{name}</TableCell>
                        <TableCell align="left">
                          <Chip
                            label={capitalize(type)}
                            color={type === 'koperasi' ? 'primary' : 'secondary'}
                            sx={{ fontWeight: 'bold' }}
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="left">{fDateTime(new Date(startAt))}</TableCell>
                        <TableCell align="left">{fDateTime(new Date(endAt))}</TableCell>
                        <TableCell align="left">
                          {attendingAt ? (
                            fDateTime(new Date(attendingAt))
                          ) : (
                            <Chip label="Tidak hadir" color="error" size="small" />
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              {!activityLogList.length && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                      Kosong
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={activityLogList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, page) => setPage(page)}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
      <Link underline="none" component={RouterLink} to={PATH_DASHBOARD.eCommerce.orderHistory}>
        <Typography variant="body2" align="right" sx={{ m: '0.5rem', fontWeight: 'bold' }}>
          Lihat keaktifan transaksi
        </Typography>
      </Link>
      <UserActivityLogForm open={isOpenModal} onClose={handleActivityLogFormClose} user={user} />
    </>
  );
}
