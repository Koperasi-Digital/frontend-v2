import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
// material
import { Box, Grid, Card, Button, Typography } from '@mui/material';
// @types
import { OnCreateBilling, ProductState } from '../../../../@types/products';
import { UserAddressBook } from '../../../../@types/user';
// redux
import { useDispatch, useSelector, RootState } from 'redux/store';
import { onBackStep, onNextStep, createBilling } from 'redux/slices/product';
import { getAddressBook } from 'redux/slices/user';
//
import Label from '../../../Label';
import CheckoutSummary from './CheckoutSummary';
import AccountAddressForm from 'components/_dashboard/user/account/AccountAddressForm';

// ----------------------------------------------------------------------

type AddressItemProps = {
  address: UserAddressBook;
  onNextStep: VoidFunction;
  onCreateBilling: OnCreateBilling;
};

function AddressItem({ address, onNextStep, onCreateBilling }: AddressItemProps) {
  const { country, state, city, address: street, zipCode, phoneNumber, isDefault } = address;

  const handleCreateBilling = () => {
    onCreateBilling(address);
    onNextStep();
  };

  return (
    <Card sx={{ p: 3, mb: 3, position: 'relative' }}>
      <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
        <Typography variant="subtitle1">{phoneNumber}</Typography>
        {isDefault && (
          <Label color="info" sx={{ ml: 1 }}>
            Alamat Utama
          </Label>
        )}
      </Box>
      <Typography variant="body2" gutterBottom>
        {`${street}, ${city}, ${state}, ${country} ${zipCode}`}
      </Typography>

      <Box
        sx={{
          mt: 3,
          display: 'flex',
          position: { sm: 'absolute' },
          right: { sm: 24 },
          bottom: { sm: 24 }
        }}
      >
        <Box sx={{ mx: 0.5 }} />
        <Button variant="outlined" size="small" onClick={handleCreateBilling}>
          Deliver to this Address
        </Button>
      </Box>
    </Card>
  );
}

export default function CheckoutBillingAddress() {
  //
  const dispatch = useDispatch();
  const { checkout } = useSelector((state: { product: ProductState }) => state.product);
  const { total, subtotal } = checkout;
  const { addressBook } = useSelector((state: RootState) => state.user);
  //
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getAddressBook());
  }, [dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  const handleBackStep = () => {
    dispatch(onBackStep());
  };

  const handleCreateBilling = (value: UserAddressBook) => {
    dispatch(createBilling(value));
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {addressBook.map((address, index) => (
            <AddressItem
              key={index}
              address={address}
              onNextStep={handleNextStep}
              onCreateBilling={handleCreateBilling}
            />
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              size="small"
              color="inherit"
              onClick={handleBackStep}
              startIcon={<Icon icon={arrowIosBackFill} />}
            >
              Kembali
            </Button>
            <Button size="small" onClick={handleClickOpen} startIcon={<Icon icon={plusFill} />}>
              Add new address
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <CheckoutSummary subtotal={subtotal} total={total} />
        </Grid>
      </Grid>

      <AccountAddressForm open={open} onClose={handleClose} />
    </>
  );
}
