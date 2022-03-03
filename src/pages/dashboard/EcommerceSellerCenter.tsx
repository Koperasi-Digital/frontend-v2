import { addIcon } from '@iconify/react';
import { Button, Box, Grid, Container, Typography, styled, Icon } from '@mui/material';
// components
import Page from '../../components/Page';
import {
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppWeeklySales,
  RecentSold,
  BestProduct
} from '../../components/_dashboard/e-commerce/seller';

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

export default function SellerCenter() {
  return (
    <Page title="Seller Center">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWeeklySales />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppNewUsers />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppItemOrders />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports />
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <RecentSold />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <BestProduct />
            <Button
              sx={{ mx: 2, my: 2 }}
              variant="contained"
              href="/ecommerce/new-product"
              startIcon={addIcon}
            >
              Add New Product
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
