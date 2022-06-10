import { useState, useEffect, useCallback } from 'react';
import {
  Card,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  CardHeader,
  Container,
  Box,
  Button,
  Link,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { paramCase } from 'change-case';
import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
// utils
import axios from 'utils/axios';
// routes
import { PATH_DASHBOARD } from 'routes/paths';
// hooks
import useIsMountedRef from 'hooks/useIsMountedRef';
// components
import Scrollbar from 'components/Scrollbar';
import Page from 'components/Page';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
//
import { MIconButton } from 'components/@material-extend';

// ----------------------------------------------------------------------

const RESIGNATION_REASON = {
  pengajuan: 'Pengajuan pribadi',
  meninggal: 'Meninggal dunia'
};

export default function MemberResignation() {
  const isMountedRef = useIsMountedRef();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [memberResignationList, setMemberResignationList] = useState<any[]>([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [isOpenConfirmationModal, setIsOpenConfirmationModal] = useState(false);
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false);

  const getMemberResignation = useCallback(async () => {
    try {
      const response = await axios.get('member-resignation');
      if (isMountedRef.current) {
        setMemberResignationList(
          response.data.payload.filter((resignation: any) => resignation.status === 'pending')
        );
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getMemberResignation();
  }, [getMemberResignation]);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAcceptResignation = (userId: number) => {
    axios.post('member-resignation/verify', { id: userId }).then(() => {
      enqueueSnackbar('Request pengunduran keanggotaan berhasil diverifikasi!', {
        variant: 'success',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
      setIsOpenConfirmationModal(false);
      setIsOpenSuccessModal(true);
    });
  };

  const handleCloseSuccessModal = (userId: number) => {
    setIsOpenSuccessModal(false);
    setMemberResignationList((prev) =>
      prev.filter((memberResignation: any) => memberResignation.user.id !== userId)
    );
  };

  const handleRejectResignation = (userId: number) => {
    axios.post('member-resignation/reject', { id: userId }).then(() => {
      setMemberResignationList((prev) =>
        prev.filter((memberResignation: any) => memberResignation.user.id !== userId)
      );
      enqueueSnackbar('Request pengunduran diri berhasil ditolak!', { variant: 'success' });
    });
  };

  const handleSendEmail = (userId: number, displayName: string, email: string) => {
    const formattedSubject = `[CoopChick] Pengunduran keanggotaan telah diverifikasi oleh Admin!`;
    const formattedBody = `Halo ${displayName}, Request pengunduran diri dari keanggotaan koperasi telah diterima oleh Admin.\nKamu masih dapat melakukan transaksi pada e-commerce aplikasi CoopChick.\nSaldo keanggotaan yang masih tersisa akan dikirim pada rekening yang terdaftar.\n\nSalam,\nAdmin Koperasi CoopChick`;
    const mailToLink = `mailto:${email}?subject=${encodeURIComponent(
      formattedSubject
    )}&body=${encodeURIComponent(formattedBody)}`;
    window.open(mailToLink, '_blank');
    handleCloseSuccessModal(userId);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - memberResignationList.length) : 0;

  return (
    <Page title="Verifikasi Pengunduran Keanggotaan Koperasi | CoopChick">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading="Verifikasi Pengunduran Keanggotaan Koperasi"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Verifikasi Pengunduran Keanggotaan',
              href: PATH_DASHBOARD.user.memberResignation.verify
            }
          ]}
        />
        <Card>
          <CardHeader title="Pengunduran Keanggotaan Koperasi " sx={{ mb: 3 }} />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID Pengunduran</TableCell>
                    <TableCell>ID Pengguna</TableCell>
                    <TableCell>Nama</TableCell>
                    <TableCell sx={{ width: '15%' }}>Alasan</TableCell>
                    <TableCell sx={{ width: '15%' }}>Deskripsi</TableCell>
                    <TableCell>Aksi</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {memberResignationList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, user, reason, description } = row;
                      const { displayName, id: userId, email } = user;

                      return (
                        <TableRow hover key={id} tabIndex={-1}>
                          <TableCell align="left">{id}</TableCell>
                          <TableCell align="left">{userId}</TableCell>
                          <TableCell align="left">
                            <Link
                              to={PATH_DASHBOARD.user.detail.replace(
                                ':name',
                                paramCase(displayName)
                              )}
                              component={RouterLink}
                            >
                              {displayName}
                            </Link>
                          </TableCell>
                          <TableCell align="left">
                            {RESIGNATION_REASON[reason as keyof typeof RESIGNATION_REASON]}
                          </TableCell>
                          <TableCell align="left">{description}</TableCell>
                          <TableCell align="left">
                            <Box display="flex" gap={2}>
                              <Button
                                color="success"
                                variant="contained"
                                size="small"
                                onClick={() => setIsOpenConfirmationModal(true)}
                              >
                                Terima
                              </Button>
                              <Button
                                color="error"
                                variant="contained"
                                size="small"
                                onClick={() => handleRejectResignation(userId)}
                              >
                                Tolak
                              </Button>
                              <Dialog
                                open={isOpenConfirmationModal}
                                onClose={() => setIsOpenConfirmationModal(false)}
                              >
                                <DialogTitle sx={{ pb: 1 }}>
                                  Terima Pengunduran Keanggotaan?
                                </DialogTitle>
                                <DialogContent sx={{ overflowY: 'unset' }}>
                                  <Typography align={'justify'}>
                                    Saldo anggota koperasi milik pengguna yang masih tersisa akan
                                    dikirimkan kepada rekening yang telah terdaftar. Apakah Anda
                                    tetap ingin menerima pengunduran keanggotaan?
                                  </Typography>
                                  <Box
                                    display="flex"
                                    justifyContent="end"
                                    alignItems="center"
                                    gap={2}
                                    pt={2}
                                    pb={1}
                                  >
                                    <Button
                                      variant="contained"
                                      onClick={() => handleAcceptResignation(userId)}
                                      color="error"
                                    >
                                      Terima
                                    </Button>
                                    <Button
                                      variant="contained"
                                      onClick={() => setIsOpenConfirmationModal(false)}
                                    >
                                      Batal
                                    </Button>
                                  </Box>
                                </DialogContent>
                              </Dialog>
                              <Dialog
                                open={isOpenSuccessModal}
                                onClose={() => handleCloseSuccessModal(userId)}
                              >
                                <DialogTitle sx={{ pb: 1 }}>Sukses!</DialogTitle>
                                <DialogContent sx={{ overflowY: 'unset' }}>
                                  <Typography align={'justify'}>
                                    Pengunduran diri anggota berhasil diverifikasi
                                  </Typography>
                                  <Box
                                    display="flex"
                                    justifyContent="end"
                                    alignItems="center"
                                    gap={2}
                                    pt={2}
                                    pb={1}
                                  >
                                    <Button
                                      variant="contained"
                                      onClick={() => handleSendEmail(userId, displayName, email)}
                                    >
                                      Kirim Email
                                    </Button>
                                    <Button
                                      variant="contained"
                                      onClick={() => handleCloseSuccessModal(userId)}
                                      color="error"
                                    >
                                      Tutup
                                    </Button>
                                  </Box>
                                </DialogContent>
                              </Dialog>
                            </Box>
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
                {!memberResignationList.length && (
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
            count={memberResignationList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, page) => setPage(page)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
