import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Link, Card, CardHeader, Typography, Stack } from '@mui/material';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
import mockData from '../../../..//utils/mock-data';
//
import Scrollbar from '../../../Scrollbar';

// ----------------------------------------------------------------------

const PRODUCT_NAME = [
  'Ayam Petelur Daging',
  'Telur Ayam Kampung',
  'Daging Ayam',
  'Itik Ayam',
  'Vaksin Ayam'
];

const MOCK_PRODUCTS = [...Array(5)].map((_, index) => ({
  id: mockData.id(index),
  name: PRODUCT_NAME[index],
  image: mockData.image.product(index),
  price: mockData.number.price(index) * 1000
}));

const ThumbImgStyle = styled('img')(({ theme }) => ({
  width: 48,
  height: 48,
  objectFit: 'cover',
  borderRadius: theme.shape.borderRadiusSm
}));

// ----------------------------------------------------------------------

type ProductItemProps = {
  product: {
    id: string;
    name: string;
    image: string;
    price: number;
  };
};

function ProductItem({ product }: ProductItemProps) {
  const { name, image, price } = product;

  return (
    <Stack direction="row" spacing={2}>
      <ThumbImgStyle alt={name} src={image} />

      <Box sx={{ flexGrow: 1, minWidth: 200 }}>
        <Link component={RouterLink} to="#" sx={{ color: 'text.primary', typography: 'subtitle2' }}>
          {name}
        </Link>

        <Stack direction="row">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {fCurrency(price)}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
}

export default function EcommerceLatestProducts() {
  return (
    <Card>
      <CardHeader title="Penjualan Terakhir" />
      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {MOCK_PRODUCTS.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </Stack>
      </Scrollbar>
    </Card>
  );
}
