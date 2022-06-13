import {
  Box,
  Card,
  DialogActions,
  DialogTitle,
  Link,
  Grid,
  Typography,
  Stack,
  Button
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme, styled } from '@mui/material/styles';
import { fDateTime } from '../../../../utils/formatTime';
import { fCurrency } from '../../../../utils/formatNumber';
import { OrderDetails } from '../../../../@types/order';
import { PATH_DASHBOARD } from 'routes/paths';
import Label from '../../../Label';
import useAuth from 'hooks/useAuth';
import { useState } from 'react';
import { DialogAnimate } from 'components/animate';

const OrderDetailStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 2.5),
  justifyContent: 'space-between',
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('all'),
  border: `solid 1px ${theme.palette.grey[500_32]}`
}));

const ProductImgStyle = styled('img')(({ theme }) => ({
  width: 64,
  height: 64,
  objectFit: 'cover',
  marginRight: theme.spacing(2),
  borderRadius: theme.shape.borderRadiusSm
}));

// --------------------------------------------s--------------------------

export default function OrderCard({
  orderDetails,
  orderId
}: {
  orderDetails: OrderDetails[];
  orderId: string;
}) {
  const theme = useTheme();
  const paymentLink = `${PATH_DASHBOARD.eCommerce.root}/order/${orderId}/payment/`;
  const orderDetailsLink = `${PATH_DASHBOARD.eCommerce.root}/order/`;
  const { currentRole } = useAuth();
  const isAdmin = currentRole?.name === 'ADMIN';
  const [isOpenGopayPopUp, setIsOpenGopayPopUp] = useState<boolean>(false);

  return (
    <Card sx={{ m: 0.5, p: 2, ':hover': { boxShadow: 50 } }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems="center"
        justifyContent={{ xs: 'center', sm: 'space-between' }}
        spacing={{ xs: 0.5, sm: 2 }}
        sx={{ mb: 5 }}
        textAlign="center"
      >
        <Typography variant="subtitle1">Order ID: {orderId}</Typography>
        <Typography variant="subtitle2">{fDateTime(orderDetails[0].order.timestamp)}</Typography>
      </Stack>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 3 }}
      >
        <Stack direction="row" spacing={1}>
          <Typography variant="subtitle1">{orderDetails[0].order.status}</Typography>
          <Typography>{orderDetails[0].order.status !== 'LUNAS' && !isAdmin && '-'}</Typography>
          <Typography variant="subtitle1">
            {orderDetails[0].order.status !== 'LUNAS' && !isAdmin && 'Bayar dengan'}
          </Typography>
        </Stack>
        {orderDetails[0].order.status !== 'LUNAS' && !isAdmin && (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="right"
            spacing={2}
            sx={{ mb: 3 }}
          >
            <DialogAnimate
              open={isOpenGopayPopUp}
              onClose={() => {
                setIsOpenGopayPopUp(false);
              }}
            >
              <DialogTitle sx={{ pb: 1 }}>
                Apakah anda yakin ingin membayar dengan gopay?
              </DialogTitle>
              <DialogActions>
                <Stack direction="row" spacing={2}>
                  <Link
                    to={`${paymentLink}GOPAY`}
                    component={RouterLink}
                    style={{
                      textDecoration: 'none'
                    }}
                  >
                    <Button variant="contained">Ya</Button>
                  </Link>
                  <Button
                    onClick={() => {
                      setIsOpenGopayPopUp(false);
                    }}
                  >
                    Tidak
                  </Button>
                </Stack>
              </DialogActions>
            </DialogAnimate>
            <Button
              variant="contained"
              onClick={() => {
                setIsOpenGopayPopUp(true);
              }}
            >
              GOPAY TERDAFTAR
            </Button>
            <Link
              to={`${paymentLink}OTHER`}
              component={RouterLink}
              style={{
                textDecoration: 'none'
              }}
            >
              <Button variant="contained">Alternatif lain</Button>
            </Link>
          </Stack>
        )}
      </Stack>
      <Grid container spacing={1}>
        {orderDetails.map((orderDetail, index) => (
          <Grid key={index} item xs={12}>
            <Link
              to={
                !isAdmin
                  ? `${orderDetailsLink + orderDetail.id}`
                  : window.location.href.replace(/^.*\/\/[^/]+/, '')
              }
              color="inherit"
              component={RouterLink}
              style={{
                textDecoration: 'none'
              }}
            >
              <OrderDetailStyle
                sx={{
                  boxShadow: (theme) => theme.customShadows.z8
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ProductImgStyle alt={orderDetail.product.name} src={orderDetail.product.cover} />
                  <Box>
                    <Typography variant="subtitle2">{orderDetail.product.name}</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {orderDetail.product.store.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Jumlah: {orderDetail.quantity}
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
                      alignItems: 'flex-end'
                    }}
                  >
                    <Box sx={{ mr: 1, maxHeight: 40 }}>
                      <Box sx={{ display: 'flex' }} justifyContent="flex-end">
                        <Label
                          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                          color={
                            (orderDetail.status === 'DALAM PENGIRIMAN' && 'warning') ||
                            (orderDetail.status === 'PENDING' && 'error') ||
                            (orderDetail.status === 'LUNAS' && 'info') ||
                            'success'
                          }
                        >
                          {orderDetail.status ? orderDetail.status : ''}
                        </Label>
                      </Box>
                      <Typography variant="subtitle1">{fCurrency(orderDetail.subtotal)}</Typography>
                    </Box>
                  </Box>
                </Box>
              </OrderDetailStyle>
            </Link>
          </Grid>
        ))}
      </Grid>

      <Typography sx={{ mt: 3, mx: 2 }} variant="h6" align="right">
        Total: {fCurrency(orderDetails[0].order.total_cost)}
      </Typography>
    </Card>
  );
}
