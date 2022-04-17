import { Stack, Grid, Container, Typography, Card, Box, styled } from '@mui/material';
import { fDate } from 'utils/formatTime';
import { fCurrency } from 'utils/formatNumber';
import { OrderDetails } from '../../../../@types/order';

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

type OrderDetailsSummaryProps = {
  orderDetails: OrderDetails;
};

export default function OrderDetailsSummary({ orderDetails }: OrderDetailsSummaryProps) {
  const { id, order, product, seller, quantity, subtotal, status } = orderDetails;
  const timestamp = order.timestamp;
  const product_name = product.name;
  const cover = product.cover;
  const seller_name = seller.displayName;
  return (
    <Container>
      <Grid container>
        <Grid item xs={12} md={4}>
          <Card sx={{ mx: 2, px: 2, py: 2, maxHeight: '300px' }}>
            <Box sx={{ pt: '100%', position: 'relative' }}>
              <ProductImgStyle alt={product_name} src={cover} />
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md>
          <Card sx={{ mx: 2, px: 2, py: 2 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="subtitle1">ID Transaksi</Typography>
              <Typography>{id}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="subtitle1">Tanggal Pemesanan</Typography>
              <Typography>{fDate(timestamp)}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="subtitle1">Nama Produk</Typography>
              <Typography>{product_name}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="subtitle1">Nama Penjual</Typography>
              <Typography>{seller_name}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="subtitle1">Quantity</Typography>
              <Typography>{quantity}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="subtitle1">Total</Typography>
              <Typography>{fCurrency(subtotal)}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="subtitle1">Status</Typography>
              <Typography>{status}</Typography>
            </Stack>
          </Card>
          <Card sx={{ mx: 2, px: 2, py: 2, my: 2 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="subtitle1">Kurir</Typography>
              <Typography>{seller_name}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="subtitle1">Alamat</Typography>
              <Typography>Jalan Ganesha No. 10 Bandung</Typography>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
