import { Box, Card, Grid, Typography, Stack } from '@mui/material';
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

export default function OrderCard({ orderDetails }: { orderDetails: OrderDetails }) {
  const linkTo = `${PATH_DASHBOARD.eCommerce.root}/order/`;
  const { id, order, product, quantity, subtotal, status } = orderDetails;
  const store_name = product.store.name;
  const timestamp = order.timestamp;
  const product_name = product.name;
  const cover = product.cover;

  return (
    <Card sx={{ mx: 2, px: 2, py: 2, ':hover': { boxShadow: 50 } }}>
      <Link
        to={linkTo + id}
        color="inherit"
        style={{
          textDecoration: 'none',
          color: 'black'
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1">{fDate(timestamp)}</Typography>
          <Typography variant="subtitle1">{status}</Typography>
        </Stack>
        <Grid container>
          <Grid item xs>
            <Box sx={{ pt: '100%', position: 'relative' }}>
              <ProductImgStyle alt={product_name} src={cover} />
            </Box>
          </Grid>
          <Grid item xs={8} sx={{ mx: 2 }}>
            <Typography variant="subtitle1" noWrap>
              <h3>{product_name}</h3>
            </Typography>
            <Typography noWrap>{store_name}</Typography>
            <Typography noWrap>Quantity: {quantity}</Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="subtitle2" align="right">
              <h2>{fCurrency(subtotal)}</h2>
            </Typography>
          </Grid>
        </Grid>
      </Link>
    </Card>
  );
}
