import { Icon } from '@iconify/react';
// material
import { styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Grid,
  Typography,
  CardHeader,
  CardContent,
  IconButton,
  Stack
} from '@mui/material';
// @types
import { ApplyShipping, CartItem, IconType, PaymentFormikProps } from '../../../../@types/products';
import { fCurrency } from '../../../../utils/formatNumber';
import { MHidden } from 'components/@material-extend';
import { UserAddressBook } from '../../../../@types/user';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import CheckoutShipmentDialog from './CheckoutShipmentDialog';
import editFill from '@iconify/icons-eva/edit-fill';

// ----------------------------------------------------------------------

const ItemStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 2.5),
  justifyContent: 'space-between',
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('all'),
  border: `solid 1px ${theme.palette.grey[500_32]}`
}));

const icons: IconType = {
  tiki: '/static/icons/ic_tiki.png',
  jne: '/static/icons/ic_jne.png',
  pos: '/static/icons/ic_pos.png'
};

// ----------------------------------------------------------------------

type CheckoutDeliveryProps = {
  formik: PaymentFormikProps;
  cart: CartItem[];
  user_address: UserAddressBook | null;
  onApplyShipping: (shipping: ApplyShipping) => void;
  onReset: (value: number) => void;
};

export default function CheckoutDelivery({
  formik,
  cart,
  user_address,
  onApplyShipping,
  onReset,
  ...other
}: CheckoutDeliveryProps) {
  const [isOpenModalShipment, setIsOpenModalShipment] = useState(false);
  const [chosenItem, setChosenItem] = useState(0);
  const [storeCity, setStoreCity] = useState('');

  const handleOpenModalShipment = (id: number, store_city: string) => {
    setChosenItem(id);
    setStoreCity(store_city);
    setIsOpenModalShipment(!isOpenModalShipment);
  };

  return (
    <Card {...other}>
      <CardHeader title="Opsi Pengiriman Produk" />
      <CardContent>
        <Grid container spacing={2}>
          {cart.map((cartItem, index) => {
            const { store_city } = cartItem;
            return (
              <Grid key={index} item xs={12}>
                <ItemStyle
                  sx={{
                    boxShadow: (theme) => theme.customShadows.z8
                  }}
                >
                  <Box sx={{ py: 3, flexGrow: 1, mr: 0 }}>
                    <Box sx={{ ml: 1 }}>
                      <Typography variant="subtitle2">
                        {cartItem.name}&nbsp;-&nbsp;{fCurrency(cartItem.subtotal)}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {cartItem.store_name}
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Box
                      sx={{
                        py: 3,
                        flexGrow: 1,
                        display: 'flex',
                        alignItems: 'right'
                      }}
                    >
                      <Box sx={{ mr: 1, maxHeight: 40 }}>
                        {cartItem.shipment && cartItem.shipment_price ? (
                          <>
                            <Stack direction="row" alignItems="center" justifyContent="cener">
                              <MHidden width="smDown">
                                <Box
                                  component="img"
                                  alt="ONGKIR"
                                  src={
                                    icons[
                                      cartItem.shipment
                                        .split(' ')[0]
                                        .toLowerCase() as keyof IconType
                                    ]
                                  }
                                  sx={{
                                    mr: 1,
                                    maxHeight: 30
                                  }}
                                />
                              </MHidden>
                              <Box sx={{ ml: 1 }}>
                                <Typography variant="subtitle2" alignItems="right">
                                  {cartItem.shipment}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{ color: 'text.secondary' }}
                                  alignItems="right"
                                >
                                  {fCurrency(cartItem.shipment_price)}
                                </Typography>
                              </Box>
                              <IconButton
                                onClick={() => handleOpenModalShipment(index, store_city!)}
                              >
                                <Icon icon={editFill} width={20} height={20} />
                              </IconButton>
                            </Stack>
                          </>
                        ) : (
                          <LoadingButton
                            fullWidth
                            size="medium"
                            type="submit"
                            variant="outlined"
                            startIcon={<Icon icon="fe:truck" />}
                            onClick={() => handleOpenModalShipment(index, store_city!)}
                          >
                            Pilih Pengiriman
                          </LoadingButton>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </ItemStyle>
              </Grid>
            );
          })}
        </Grid>
        <CheckoutShipmentDialog
          formik={formik}
          cartID={chosenItem}
          origin={storeCity}
          destination={user_address!.city}
          weight={cart[chosenItem].weight}
          open={isOpenModalShipment}
          onApplyShipping={onApplyShipping}
          onClose={setIsOpenModalShipment}
          onReset={onReset}
        ></CheckoutShipmentDialog>
      </CardContent>
    </Card>
  );
}
