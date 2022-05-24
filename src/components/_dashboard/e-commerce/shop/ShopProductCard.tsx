import { paramCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
//

import { Product } from '../../../../@types/products';

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')(({ theme }) => ({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
}));

// ----------------------------------------------------------------------

type ShopProductCardProps = {
  product: Product;
};

export default function ShopProductCard({ product }: ShopProductCardProps) {
  const { id, name, cover, price } = product;
  const linkTo = `${PATH_DASHBOARD.eCommerce.root}/product/${paramCase(id.toString())}`;

  return (
    <Card>
      <Link
        to={linkTo}
        color="inherit"
        component={RouterLink}
        style={{
          textDecoration: 'none'
        }}
      >
        <Box sx={{ pt: '100%', position: 'relative' }}>
          <ProductImgStyle alt={name} src={cover} />
        </Box>

        <Stack spacing={1} sx={{ p: 3 }}>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle1">{fCurrency(price)}</Typography>
          </Stack>
        </Stack>
      </Link>
    </Card>
  );
}
