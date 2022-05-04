import { Box, Card, Grid, Typography, Stack, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { fDate } from '../../../../utils/formatTime';
import { fCurrency } from '../../../../utils/formatNumber';
import { OrderDetails } from '../../../../@types/order';
import { PATH_DASHBOARD } from 'routes/paths';

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// --------------------------------------------s--------------------------

export default function OrderCard({
  orderDetails,
  orderId
}: {
  orderDetails: OrderDetails[];
  orderId: string;
}) {
  const paymentLink = `${PATH_DASHBOARD.eCommerce.root}/order/${orderId}/payment/`;

  return (
    <Card sx={{ mx: 1, px: 1, py: 2, ':hover': { boxShadow: 50 } }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems="center"
        justifyContent={{ xs: 'center', sm: 'space-between' }}
        spacing={{ xs: 0.5, sm: 2 }}
        sx={{ mb: 5 }}
        textAlign="center"
      >
        <Typography variant="h6">Id order: {orderId}</Typography>
        <Typography variant="subtitle1">{fDate(orderDetails[0].order.timestamp)}</Typography>
      </Stack>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 3 }}
      >
        <Stack direction="row" spacing={1}>
          <Typography variant="subtitle1">{orderDetails[0].order.status}</Typography>
          <Typography>{orderDetails[0].order.status !== 'LUNAS' && '-'}</Typography>
          <Typography variant="subtitle1">
            {orderDetails[0].order.status !== 'LUNAS' && 'Bayar dengan'}
          </Typography>
        </Stack>
        {orderDetails[0].order.status !== 'LUNAS' && (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="right"
            spacing={2}
            sx={{ mb: 3 }}
          >
            <Link
              to={`${paymentLink}GOPAY`}
              style={{
                textDecoration: 'none'
              }}
            >
              <Button variant="contained">Gopay terdaftar</Button>
            </Link>
            <Link
              to={`${paymentLink}OTHER`}
              style={{
                textDecoration: 'none'
              }}
            >
              <Button variant="contained">Alternatif lain</Button>
            </Link>
          </Stack>
        )}
      </Stack>

      {orderDetails.map((orderDetail) => (
        <>
          <Grid container sx={{ mb: 3 }}>
            <Grid item xs={12} md>
              <Box sx={{ pt: '100%', position: 'relative' }}>
                <ProductImgStyle alt={orderDetail.product.name} src={orderDetail.product.cover} />
              </Box>
            </Grid>
            <Grid item xs={8} sx={{ mx: 2 }}>
              <Typography variant="subtitle1" noWrap>
                <h3>{orderDetail.product.name}</h3>
              </Typography>
              <Typography noWrap>{orderDetail.product.store.name}</Typography>
              <Typography noWrap>Quantity: {orderDetail.quantity}</Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="subtitle1" align="right">
                {fCurrency(orderDetail.subtotal)}
              </Typography>
            </Grid>
          </Grid>
        </>
      ))}
      <Typography sx={{ mt: 3 }} variant="h6" align="center">
        Order subtotal: {fCurrency(orderDetails[0].order.total_cost)}
      </Typography>
    </Card>
  );
}
