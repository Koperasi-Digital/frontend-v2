// material
import { styled } from '@mui/material/styles';
import { Box, Card, CardHeader, Typography, Stack } from '@mui/material';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
//
import Scrollbar from '../../../Scrollbar';
import { ProductLatestItem } from '../../../../@types/seller-center';
import { useEffect, useState } from 'react';
import useAuth from 'hooks/useAuth';
import { getProductLatest } from 'utils/sellerCenterAxios/sellerDashboard';
import { fDateTime } from 'utils/formatTime';

// ----------------------------------------------------------------------

const ThumbImgStyle = styled('img')(({ theme }) => ({
  width: 48,
  height: 48,
  objectFit: 'cover',
  borderRadius: theme.shape.borderRadiusSm
}));

type ProductItemProps = {
  product: ProductLatestItem;
};

// ----------------------------------------------------------------------

function ProductItem({ product }: ProductItemProps) {
  const { name, cover, price, timestamp } = product;

  return (
    <Stack direction="row" spacing={2}>
      <ThumbImgStyle alt={name} src={cover} />

      <Box sx={{ flexGrow: 1, minWidth: 200 }}>
        <Typography variant="subtitle2">{name}</Typography>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {fCurrency(price)}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mx: 3 }}>
            {fDateTime(timestamp)}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
}

export default function EcommerceLatestProducts() {
  const { user } = useAuth();
  const storeId = user!.store.id;
  const [productLatestItem, setProductLatestItem] = useState<ProductLatestItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getProductLatest(storeId);
      setProductLatestItem(response);
    };
    fetchData();
  }, [storeId]);

  return productLatestItem.length === 0 ? (
    <></>
  ) : (
    <Card>
      <CardHeader title="Penjualan Terakhir" />
      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {productLatestItem.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </Stack>
      </Scrollbar>
    </Card>
  );
}
