import { Grid, Container } from '@mui/material';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from 'routes/paths';
// components
import Page from '../../components/Page';
import {
  InfoFinishedOrders,
  InfoNewOrders,
  InfoDeliveringOrders,
  ProductSold,
  LatestProducts,
  AllTimeProducts,
  MonthlySales,
  TotalBalance,
  CurrentBalance
} from '../../components/_dashboard/e-commerce/seller';

// ----------------------------------------------------------------------
export default function SellerCenter() {
  return (
    <Page title="Seller Center">
      <Container maxWidth="xl">
        <HeaderBreadcrumbs
          heading="Seller Center"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'E-Commerce',
              href: PATH_DASHBOARD.eCommerce.root
            },
            { name: 'Seller Center' }
          ]}
        />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={2}>
            <InfoNewOrders />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <InfoDeliveringOrders />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <InfoFinishedOrders />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CurrentBalance />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <MonthlySales />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <div style={{ marginBottom: 20 }}>
              <TotalBalance />
            </div>
            <ProductSold />
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
