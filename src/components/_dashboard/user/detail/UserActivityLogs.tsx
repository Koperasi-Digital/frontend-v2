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
  Typography,
  Box,
  DialogContent,
  DialogTitle
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
import { DialogAnimate } from 'components/animate';

// ----------------------------------------------------------------------

interface UserActivityLogsProps {
  user: UserManager;
}

export default function UserActivityLogs({ user }: UserActivityLogsProps) {
  const isMountedRef = useIsMountedRef();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [activityLogList, setActivityLogList] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const { currentRole } = useAuth();
  const isAdmin = currentRole && currentRole?.name === 'ADMIN';
  const [selectedActivityLog, setSelectedActivityLog] = useState();

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
          let activityLogId;
          const activityLog = activityLogs.filter(
            (activityLog: any) => activityLog.activity.id === activity.id
          );
          if (activityLog.length) {
            attendingAt = activityLog[0].created_at;
            activityLogId = activityLog[0].id;
          }
          return {
            ...activity,
            attendingAt,
            activityLogId
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

  const handleOpenEditModal = (data: any) => {
    setIsOpenModal(true);
    setSelectedActivityLog(data);
  };

  const handleOpenDeleteModal = (data: any) => {
    setIsOpenDeleteModal(true);
    setSelectedActivityLog(data);
  };

  const handleActivityLogFormClose = () => {
    setSelectedActivityLog(undefined);
    getUserActivityLogs();
    setIsOpenModal(false);
  };

  const handleDeleteModalClose = () => {
    setSelectedActivityLog(undefined);
    getUserActivityLogs();
    setIsOpenDeleteModal(false);
  };

  const handleDeleteActivityLog = async () => {
    if (selectedActivityLog) {
      await axios.delete(`activity-logs/${(selectedActivityLog as any).activityLogId}`);
      handleDeleteModalClose();
    }
  };

  return (
    <>
      <Card>
        <CardHeader
          title="Keaktifan Anggota (Presensi Meeting)"
          sx={{ mb: 3 }}
          action={
            isAdmin && (
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
                  {isAdmin && <TableCell>Aksi</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {activityLogList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const { id, name, type, startAt, endAt, attendingAt, activityLogId } = row;
                    const data = {
                      id,
                      name,
                      type,
                      startAt,
                      endAt,
                      attendingAt,
                      activityLogId
                    };

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
                        {isAdmin && (
                          <TableCell align="left">
                            <Box display="flex" gap={2}>
                              <Button
                                variant="contained"
                                onClick={() => handleOpenEditModal(data)}
                                size="small"
                              >
                                Edit
                              </Button>
                              {attendingAt && (
                                <Button
                                  variant="contained"
                                  color="error"
                                  onClick={() => handleOpenDeleteModal(data)}
                                  size="small"
                                >
                                  Hapus
                                </Button>
                              )}
                            </Box>
                          </TableCell>
                        )}
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
      <Link
        underline="none"
        component={RouterLink}
        to={
          user.id
            ? `${PATH_DASHBOARD.eCommerce.orderHistory}?id=${user?.id}`
            : PATH_DASHBOARD.eCommerce.orderHistory
        }
      >
        <Typography variant="body2" align="right" sx={{ m: '0.5rem', fontWeight: 'bold' }}>
          Lihat keaktifan transaksi
        </Typography>
      </Link>
      <UserActivityLogForm
        open={isOpenModal}
        onClose={handleActivityLogFormClose}
        user={user}
        initialData={selectedActivityLog}
      />
      <DialogAnimate open={isOpenDeleteModal} onClose={handleDeleteModalClose}>
        <DialogTitle sx={{ pb: 1 }}>Hapus Presensi?</DialogTitle>
        <DialogContent sx={{ overflowY: 'unset' }}>
          <Typography align={'justify'}>
            Data presensi pengguna akan hilang selamanya! Apakah Anda tetap ingin menghapus data
            presensi?
          </Typography>
          <Box display="flex" justifyContent="end" gap={2} pt={2} pb={1}>
            <Button variant="contained" onClick={handleDeleteActivityLog} color="error">
              Hapus
            </Button>
            <Button variant="contained" onClick={handleDeleteModalClose}>
              Batal
            </Button>
          </Box>
        </DialogContent>
      </DialogAnimate>
    </>
  );
}
