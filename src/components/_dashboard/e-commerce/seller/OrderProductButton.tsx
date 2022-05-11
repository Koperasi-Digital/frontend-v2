import { Stack, Button } from '@mui/material';
import { PATH_DASHBOARD } from 'routes/paths';
// components
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

// ----------------------------------------------------------------------
export default function OrderProductButton() {
  return (
    <Stack direction="column">
      <Link
        to={PATH_DASHBOARD.eCommerce.seller.orderList}
        color="inherit"
        style={{ textDecoration: 'none' }}
      >
        <Button
          fullWidth
          size="large"
          sx={{ mb: 1 }}
          variant="contained"
          startIcon={<Icon icon="il:market" />}
        >
          Lihat Daftar Order
        </Button>
      </Link>
      <Link
        to={PATH_DASHBOARD.eCommerce.seller.list}
        color="inherit"
        style={{ textDecoration: 'none' }}
      >
        <Button fullWidth size="large" variant="contained" startIcon={<Icon icon="bxs:cart" />}>
          Lihat Daftar Produk
        </Button>
      </Link>
    </Stack>
  );
}
