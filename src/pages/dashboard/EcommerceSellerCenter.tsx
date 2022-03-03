import { Box, Grid, Container, Typography, styled } from '@mui/material';
// components
import Page from '../../components/Page';
import {
  AppNewUsers,
  AppBugReports,
  InfoDeliveringOrders,
  AppWeeklySales,
  RecentSold,
  LatestProducts,
  AllTimeProducts,
  MonthlySales,
  TotalBalance,
  CurrentBalance
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
            <InfoDeliveringOrders />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <MonthlySales />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <div style={{ marginBottom: 20 }}>
              <TotalBalance />
            </div>
            <CurrentBalance />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <AllTimeProducts />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <LatestProducts />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
