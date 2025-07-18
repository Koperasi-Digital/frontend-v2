import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
// material
import { Box, Tab, Card, Grid, Divider, Skeleton, Container, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProduct, addCart, onGotoStep } from '../../redux/slices/product';
// routes
import { PATH_DASHBOARD, PATH_PAGE } from '../../routes/paths';
// @types
import { CartItem, ProductState } from '../../@types/products';
// components
import Page from '../../components/Page';
import Markdown from '../../components/Markdown';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import {
  ProductDetailsSummary,
  ProductDetailsCarousel
} from '../../components/_dashboard/e-commerce/product-details';
import CartWidget from '../../components/_dashboard/e-commerce/CartWidget';
import useAuth from 'hooks/useAuth';
import ProductDetailsStore from 'components/_dashboard/e-commerce/product-details/ProductDetailsStore';

// ----------------------------------------------------------------------

const SkeletonLoad = (
  <Grid container spacing={3}>
    <Grid item xs={12} md={6} lg={7}>
      <Skeleton variant="rectangular" width="100%" sx={{ paddingTop: '100%', borderRadius: 2 }} />
    </Grid>
    <Grid item xs={12} md={6} lg={5}>
      <Skeleton variant="circular" width={80} height={80} />
      <Skeleton variant="text" height={240} />
      <Skeleton variant="text" height={40} />
      <Skeleton variant="text" height={40} />
      <Skeleton variant="text" height={40} />
    </Grid>
  </Grid>
);

export default function EcommerceProductDetails() {
  const dispatch = useDispatch();
  const [value, setValue] = useState('1');
  const { name = '' } = useParams();
  const { user } = useAuth();
  const [isSeller, setIsSeller] = useState(false);
  const { product, error, checkout } = useSelector(
    (state: { product: ProductState }) => state.product
  );

  useEffect(() => {
    dispatch(getProduct(name));
  }, [dispatch, name]);

  useEffect(() => {
    if (user!.store != null && product != null) {
      setIsSeller(product!.store.id === user!.store.id);
    }
  }, [product, user]);

  const handleAddCart = (product: CartItem) => {
    dispatch(addCart(product));
  };

  const handleGotoStep = (step: number) => {
    dispatch(onGotoStep(step));
  };

  return (
    <Page title="Ecommerce: Product Details | CoopChick">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading="Product Details"
          links={[
            { name: 'Beranda', href: PATH_PAGE.homepage },
            {
              name: 'E-Commerce',
              href: PATH_DASHBOARD.eCommerce.root
            },
            { name: product?.name || 'Product' }
          ]}
        />

        <CartWidget />

        {product && (
          <>
            <Card>
              <Grid container>
                <Grid item xs={12} sm={6} lg={4}>
                  <ProductDetailsCarousel productImage={product.cover} />
                </Grid>
                <Grid item xs={12} sm={6} lg={8}>
                  <ProductDetailsSummary
                    product={product}
                    cart={checkout.cart}
                    onAddCart={handleAddCart}
                    onGotoStep={handleGotoStep}
                    isSeller={isSeller}
                  />
                </Grid>
              </Grid>
            </Card>

            <Card>
              <TabContext value={value}>
                <Box sx={{ px: 3, bgcolor: 'background.neutral' }}>
                  <TabList onChange={(e, value) => setValue(value)}>
                    <Tab disableRipple value="1" label="Deskripsi" />
                    <Tab
                      disableRipple
                      value="2"
                      label={`Informasi Toko`}
                      sx={{ '& .MuiTab-wrapper': { whiteSpace: 'nowrap' } }}
                    />
                  </TabList>
                </Box>

                <Divider />

                <TabPanel value="1">
                  <Box sx={{ p: 3 }}>
                    <Markdown children={product.description} />
                  </Box>
                </TabPanel>
                <TabPanel value="2">
                  <Box sx={{ p: 3 }}>
                    <ProductDetailsStore store={product.store} />
                  </Box>
                </TabPanel>
              </TabContext>
            </Card>
          </>
        )}

        {!product && SkeletonLoad}

        {error && <Typography variant="h6">404 Product not found</Typography>}
      </Container>
    </Page>
  );
}
