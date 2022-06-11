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
  styled,
  Link,
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
import LightboxModal from 'components/LightboxModal';
import { DialogAnimate } from 'components/animate';
//
import { MIconButton } from 'components/@material-extend';

// ----------------------------------------------------------------------

const ImgStyle = styled('img')(() => ({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
}));

export default function MemberVerification() {
  const isMountedRef = useIsMountedRef();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [memberVerificationList, setMemberVerificationList] = useState([]);
  const [openLightbox, setOpenLightbox] = useState(false);
  const [lightboxImages, setLightboxImages] = useState({ images: [''], selectedIndex: 0 });
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false);

  const getMemberVerification = useCallback(async () => {
    try {
      const response = await axios.get('member-verification');
      if (isMountedRef.current) {
        setMemberVerificationList(response.data.payload);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getMemberVerification();
  }, [getMemberVerification]);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenLightbox = (index: number, images?: string[]) => {
    setOpenLightbox(true);
    setLightboxImages((prev) => ({
      images: images || prev.images,
      selectedIndex: index
    }));
  };

  const handleAcceptVerification = (userId: number) => {
    axios.post('member-verification/verify', { id: userId }).then(() => {
      enqueueSnackbar('Pengguna berhasil terverifikasi!', {
        variant: 'success',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
      setIsOpenSuccessModal(true);
    });
  };

  const handleRejectVerification = (userId: number) => {
    axios.post('member-verification/reject', { id: userId }).then(() => {
      setMemberVerificationList((prev) =>
        prev.filter((memberVerification: any) => memberVerification.user.id !== userId)
      );
      enqueueSnackbar('Verifikasi pengguna berhasil ditolak!', { variant: 'success' });
    });
  };

  const handleSendEmail = (userId: number, displayName: string, email: string) => {
    const formattedSubject = `[CoopChick] Request keanggotaan telah diverifikasi oleh Admin!`;
    const formattedBody = `Halo ${displayName}, Request keanggotaan koperasi akunmu telah diterima oleh Admin.\n\nSalam,\nAdmin Koperasi CoopChick`;
    const mailToLink = `mailto:${email}?subject=${encodeURIComponent(
      formattedSubject
    )}&body=${encodeURIComponent(formattedBody)}`;
    window.open(mailToLink, '_blank');
    handleCloseSuccessModal(userId);
  };

  const handleCloseSuccessModal = (userId: number) => {
    setIsOpenSuccessModal(false);
    setMemberVerificationList((prev) =>
      prev.filter((memberResignation: any) => memberResignation.user.id !== userId)
    );
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - memberVerificationList.length) : 0;

  return (
    <Page title="Verifikasi Calon Anggota Koperasi | CoopChick">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading="Verifikasi Calon Anggota Koperasi"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Verifikasi Calon Anggota Koperasi',
              href: PATH_DASHBOARD.user.memberVerification.verify
            }
          ]}
        />
        <Card>
          <CardHeader title="Verifikasi Calon Anggota Koperasi" sx={{ mb: 3 }} />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID Verifikasi</TableCell>
                    <TableCell>ID Pengguna</TableCell>
                    <TableCell>Nama</TableCell>
                    <TableCell sx={{ width: '15%' }}>Foto KTP</TableCell>
                    <TableCell sx={{ width: '15%' }}>Foto Selfie</TableCell>
                    <TableCell>Aksi</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {memberVerificationList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, user, identityCardPhotoURL, selfiePhotoURL } = row;
                      const { displayName, id: userId, email } = user;
                      const images = [identityCardPhotoURL, selfiePhotoURL];

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
                            <Box sx={{ pt: '100%', position: 'relative' }}>
                              <ImgStyle
                                alt={identityCardPhotoURL}
                                src={identityCardPhotoURL}
                                onClick={() => handleOpenLightbox(0, images)}
                              />
                            </Box>
                          </TableCell>
                          <TableCell align="left">
                            <Box sx={{ pt: '100%', position: 'relative' }}>
                              <ImgStyle
                                alt={selfiePhotoURL}
                                src={selfiePhotoURL}
                                onClick={() => handleOpenLightbox(1, images)}
                              />
                            </Box>
                          </TableCell>
                          <TableCell align="left">
                            <Box display="flex" gap={2}>
                              <Button
                                color="success"
                                variant="contained"
                                size="small"
                                onClick={() => handleAcceptVerification(userId)}
                              >
                                Terima
                              </Button>
                              <Button
                                color="error"
                                variant="contained"
                                size="small"
                                onClick={() => setIsOpenDeleteModal(true)}
                              >
                                Tolak
                              </Button>
                              <DialogAnimate
                                open={isOpenDeleteModal}
                                onClose={() => setIsOpenDeleteModal(false)}
                              >
                                <DialogTitle sx={{ pb: 1 }}>Tolak Verifikasi?</DialogTitle>
                                <DialogContent sx={{ overflowY: 'unset' }}>
                                  <Typography align={'justify'}>
                                    Data verifikasi pengguna yang ditolak akan hilang selamanya!
                                    Calon anggota harus mengajukan verifikasi kembali jika ingin
                                    menjadi anggota koperasi. Apakah Anda tetap ingin menolak
                                    verifikasi?
                                  </Typography>
                                  <Box display="flex" justifyContent="end" gap={2} pt={2} pb={1}>
                                    <Button
                                      variant="contained"
                                      onClick={() => handleRejectVerification(userId)}
                                      color="error"
                                    >
                                      Tolak
                                    </Button>
                                    <Button
                                      variant="contained"
                                      onClick={() => setIsOpenDeleteModal(false)}
                                    >
                                      Batal
                                    </Button>
                                  </Box>
                                </DialogContent>
                              </DialogAnimate>
                              <DialogAnimate
                                open={isOpenSuccessModal}
                                onClose={() => handleCloseSuccessModal(userId)}
                              >
                                <DialogTitle sx={{ pb: 1 }}>Sukses!</DialogTitle>
                                <DialogContent sx={{ overflowY: 'unset' }}>
                                  <Typography align={'justify'}>
                                    Request keanggotaan berhasil diverifikasi
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
                              </DialogAnimate>
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
                {!memberVerificationList.length && (
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
            count={memberVerificationList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, page) => setPage(page)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
        <LightboxModal
          images={lightboxImages.images}
          photoIndex={lightboxImages.selectedIndex}
          isOpen={openLightbox}
          setPhotoIndex={handleOpenLightbox}
          onClose={() => setOpenLightbox(false)}
        />
      </Container>
    </Page>
  );
}
