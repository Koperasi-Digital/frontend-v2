import { useState } from 'react';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import editFill from '@iconify/icons-eva/edit-fill';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
import checkmarkOutline from '@iconify/icons-eva/checkmark-outline';
// material
import {
  Box,
  Card,
  Button,
  Typography,
  CardProps,
  Stack,
  Paper,
  DialogContent,
  DialogTitle
} from '@mui/material';
// @types
import { UserAddressBook } from '../../../../@types/user';
// components
import Label from 'components/Label';
import { deleteAddress, setAddressAsDefault } from 'redux/slices/user';
import { AccountAddressForm } from '.';
import { DialogAnimate } from 'components/animate';

// ----------------------------------------------------------------------

interface AccountAddressBookProp extends CardProps {
  userId?: string;
  addressBook: UserAddressBook[];
  isEdit?: boolean;
}

export default function AccountAddressBook({
  userId,
  addressBook,
  isEdit
}: AccountAddressBookProp) {
  const [open, setOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<UserAddressBook>();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const handleOpen = (address?: UserAddressBook) => {
    setSelectedAddress(address);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedAddress(undefined);
  };

  const handleOpenDeleteModal = (address?: UserAddressBook) => {
    setSelectedAddress(address);
    setIsOpenDeleteModal(true);
  };

  const handleDeleteAddress = () => {
    if (selectedAddress) {
      deleteAddress(selectedAddress.id, userId);
    }
    setIsOpenDeleteModal(false);
  };

  return (
    <>
      <Card sx={{ p: 3 }}>
        <Stack spacing={3} alignItems="flex-start">
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Buku Alamat
          </Typography>

          {addressBook.length ? (
            addressBook.map((address) => (
              <Paper
                key={address.id}
                sx={{
                  p: 3,
                  width: 1,
                  bgcolor: 'background.neutral'
                }}
              >
                <Typography variant="body2" gutterBottom>
                  <Typography
                    variant="body2"
                    component="span"
                    sx={{ color: 'text.secondary', fontWeight: 'bold' }}
                  >
                    Alamat: &nbsp;
                  </Typography>
                  {`${address.address}, ${address.city}, ${address.state}, ${address.country} ${address.zipCode}`}
                  {address.isDefault && (
                    <Label color="info" sx={{ ml: 1 }}>
                      Utama
                    </Label>
                  )}
                </Typography>

                <Typography variant="body2" gutterBottom>
                  <Typography
                    variant="body2"
                    component="span"
                    sx={{ color: 'text.secondary', fontWeight: 'bold' }}
                  >
                    No. Telepon: &nbsp;
                  </Typography>
                  {address.phoneNumber}
                </Typography>

                {isEdit && (
                  <Box sx={{ mt: 1 }}>
                    <Button
                      color="error"
                      size="small"
                      startIcon={<Icon icon={trash2Fill} />}
                      onClick={() => handleOpenDeleteModal(address)}
                      sx={{ mr: 1 }}
                    >
                      Hapus
                    </Button>
                    <Button
                      size="small"
                      startIcon={<Icon icon={editFill} />}
                      onClick={() => handleOpen(address)}
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                    {!address.isDefault && (
                      <Button
                        size="small"
                        color="info"
                        startIcon={<Icon icon={checkmarkOutline} />}
                        onClick={() => setAddressAsDefault(address.id, userId)}
                      >
                        Jadikan Alamat Utama
                      </Button>
                    )}
                  </Box>
                )}
              </Paper>
            ))
          ) : (
            <Box display="flex" justifyContent="center" sx={{ width: '100%', p: 3 }}>
              <Typography variant="body2">Tidak ada alamat</Typography>
            </Box>
          )}

          {isEdit && (
            <Box display="flex" width="100%" justifyContent="end">
              <Button
                variant="contained"
                startIcon={<Icon icon={plusFill} />}
                onClick={() => handleOpen()}
              >
                Tambah Alamat
              </Button>
            </Box>
          )}
        </Stack>
      </Card>
      <AccountAddressForm
        open={open}
        onClose={handleClose}
        existingAddress={selectedAddress}
        userId={userId}
      />

      <DialogAnimate open={isOpenDeleteModal} onClose={() => setIsOpenDeleteModal(false)}>
        <DialogTitle sx={{ pb: 1 }}>Hapus Alamat?</DialogTitle>
        <DialogContent sx={{ overflowY: 'unset' }}>
          <Typography align={'justify'}>
            Alamat yang sudah dihapus akan hilang selamanya! Apakah Anda tetap ingin menghapus
            alamat?
          </Typography>
          <Box display="flex" justifyContent="end" gap={2} pt={2} pb={1}>
            <Button variant="contained" onClick={handleDeleteAddress} color="error">
              Hapus
            </Button>
            <Button variant="contained" onClick={() => setIsOpenDeleteModal(false)}>
              Batal
            </Button>
          </Box>
        </DialogContent>
      </DialogAnimate>
    </>
  );
}
