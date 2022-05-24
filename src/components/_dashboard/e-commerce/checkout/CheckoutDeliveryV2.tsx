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
import {
  ApplyShipping,
  ApplyShippingV2,
  CartItem,
  IconType,
  PaymentFormikProps
} from '../../../../@types/products';
import { fCurrency } from '../../../../utils/formatNumber';
import { MHidden } from 'components/@material-extend';
import { UserAddressBook } from '../../../../@types/user';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import CheckoutShipmentDialogV2 from './CheckoutShipmentDialogV2';
import editFill from '@iconify/icons-eva/edit-fill';

// ----------------------------------------------------------------------

const ItemStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginLeft: '3%',
  marginRight: '3%',
  padding: theme.spacing(0, 2.5),
  justifyContent: 'space-between',
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('all'),
  border: `solid 1px ${theme.palette.grey[500_32]}`
}));

const StoreStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 2.5),
  justifyContent: 'space-between'
}));

const icons: IconType = {
  tiki: '/static/icons/ic_tiki.png',
  jne: '/static/icons/ic_jne.png',
  pos: '/static/icons/ic_pos.png'
};

// ----------------------------------------------------------------------

const ThumbImgStyle = styled('img')(({ theme }) => ({
  width: 64,
  height: 64,
  objectFit: 'cover',
  marginRight: theme.spacing(2),
  borderRadius: theme.shape.borderRadiusSm
}));

type CheckoutDeliveryProps = {
  formik: PaymentFormikProps;
  cart: CartItem[];
  user_address: UserAddressBook | null;
  onApplyShipping: (shipping: ApplyShippingV2) => void;
  onReset: (value: number) => void;
};

const ProductItemList = ({ cart }: { cart: CartItem[] }) => {
  return (
    <Grid container spacing={1}>
      {cart.map((cartItem, index) => (
        <Grid key={index} item xs={12}>
          <ItemStyle
            sx={{
              boxShadow: (theme) => theme.customShadows.z8
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ThumbImgStyle alt="Product" src={cartItem.cover} />
              <Box>
                <Typography variant="subtitle2">{cartItem.name}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Jumlah: {cartItem.quantity}
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center'
                  }}
                ></Box>
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
                  <Typography variant="subtitle2">&nbsp;</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {fCurrency(cartItem.subtotal)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </ItemStyle>
        </Grid>
      ))}
    </Grid>
  );
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
  const [storeCity, setStoreCity] = useState('');
  const [storeName, setStoreName] = useState('');

  const handleOpenModalShipment = (id: number, store_city: string, store_name: string) => {
    setStoreCity(store_city);
    setStoreName(store_name);
    setIsOpenModalShipment(!isOpenModalShipment);
  };

  const cartGroupByStore = cart.reduce(
    (objectsByKeyValue: { [key: string]: CartItem[] }, obj: CartItem) => {
      const value: string = obj.store_name!;
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
      return objectsByKeyValue;
    },
    {}
  );

  return (
    <Card {...other}>
      <CardHeader title="Opsi Pengiriman Produk" />
      <CardContent>
        {Object.keys(cartGroupByStore).map((store, idx) => {
          const cartItem = cartGroupByStore[store][0];
          const store_city = cartGroupByStore[store][0].store_city;
          return (
            <>
              <Box sx={{ mb: 2 }}>
                <StoreStyle>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Icon icon="dashicons:store" width={48} height={48} />
                    <Box sx={{ px: 2 }}>
                      <Typography variant="subtitle2">{store}</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {store_city}
                      </Typography>

                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      ></Box>
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
                                  {fCurrency(
                                    cartGroupByStore[store].reduce(
                                      (a, b) => a + (b.shipment_price || 0),
                                      0
                                    )
                                  )}
                                </Typography>
                              </Box>
                              <IconButton
                                onClick={() => handleOpenModalShipment(idx, store_city!, store)}
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
                            onClick={() => handleOpenModalShipment(idx, store_city!, store)}
                          >
                            Pilih Pengiriman
                          </LoadingButton>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </StoreStyle>
                <ProductItemList cart={cartGroupByStore[store]} />
              </Box>
              <Box sx={{ mb: 2 }}>
                <StoreStyle>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Icon icon="dashicons:store" width={48} height={48} />
                    <Box sx={{ px: 2 }}>
                      <Typography variant="subtitle2">{store}</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {store_city}
                      </Typography>

                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      ></Box>
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
                                  {fCurrency(
                                    cartGroupByStore[store].reduce(
                                      (a, b) => a + (b.shipment_price || 0),
                                      0
                                    )
                                  )}
                                </Typography>
                              </Box>
                              <IconButton
                                onClick={() => handleOpenModalShipment(idx, store_city!, store)}
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
                            onClick={() => handleOpenModalShipment(idx, store_city!, store)}
                          >
                            Pilih Pengiriman
                          </LoadingButton>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </StoreStyle>
                <ProductItemList cart={cartGroupByStore[store]} />
              </Box>
            </>
          );
        })}
        <CheckoutShipmentDialogV2
          formik={formik}
          chosenStore={storeName}
          cartStore={cartGroupByStore['Toko Sumber Maju']}
          origin={storeCity}
          destination={user_address!.city}
          open={isOpenModalShipment}
          onApplyShipping={onApplyShipping}
          onClose={setIsOpenModalShipment}
          onReset={onReset}
        ></CheckoutShipmentDialogV2>
      </CardContent>
    </Card>
  );
}
