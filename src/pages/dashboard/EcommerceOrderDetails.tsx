import { Stack, Grid, Container, Typography, Card, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Page from '../../components/Page';
import { random, sample } from 'lodash';
import { fDate } from 'utils/formatTime';
import { fCurrency } from 'utils/formatNumber';

const PRODUCT_NAME = [
  'Ayam Petelur Utuh',
  'Telur Ayam Petelur',
  'Ayam Potong Utuh',
  'Itik Ayam',
  'Vaksin N.C.D',
  'Ayam Petelur Utuh',
  'Telur Ayam Petelur',
  'Ayam Potong Utuh',
  'Itik Ayam',
  'Vaksin N.C.D'
];

const SELLER_NAME = [
  'PT Mega Kriya',
  'PT Jaya Baya',
  'PT Koperasi Ayam',
  'PT Dokteral',
  'PT Futuristik Ayam',
  'PT Mega Kriya',
  'PT Jaya Baya',
  'PT Koperasi Ayam',
  'PT Dokteral',
  'PT Futuristik Ayam'
];

// ----------------------------------------------------------------------

const transactions = [...Array(10)].map((_, index) => {
  const setIndex = index + 1;

  return {
    id: random(10000),
    date: new Date(),
    cover: 'http://localhost:3000/static/mock-images/products/product_1.jpg',
    product: PRODUCT_NAME[index],
    seller: SELLER_NAME[index],
    quantity: random(50),
    total: random(50) * 50,
    status: sample(['Completed', 'Delivered', 'Pending'])
  };
});

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

export default function EcommerceOrderDetails() {
  const { id, date, cover, product, seller, quantity, total, status } = transactions[1];
  return (
    <Page title="Detail Transaction">
      <Container>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Detail Transaction #1
        </Typography>
        <Grid container>
          <Grid item xs={12} md={4}>
            <Card sx={{ mx: 2, px: 2, py: 2, maxHeight: '300px' }}>
              <Box sx={{ pt: '100%', position: 'relative' }}>
                <ProductImgStyle alt={product} src={cover} />
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
                <Typography>{fDate(date)}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle1">Nama Produk</Typography>
                <Typography>{product}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle1">Nama Penjual</Typography>
                <Typography>{seller}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle1">Quantity</Typography>
                <Typography>{quantity}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle1">Total</Typography>
                <Typography>{fCurrency(total)}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle1">Status</Typography>
                <Typography>{status}</Typography>
              </Stack>
            </Card>
            <Card sx={{ mx: 2, px: 2, py: 2, my: 2 }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle1">Kurir</Typography>
                <Typography>{seller}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle1">No Resi</Typography>
                <Typography>{id}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle1">Alamat</Typography>
                <Typography>Jalan Ganesha No. 10 Bandung</Typography>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
