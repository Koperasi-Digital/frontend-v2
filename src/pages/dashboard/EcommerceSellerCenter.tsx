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
import { useEffect, useState } from 'react';
import useAuth from 'hooks/useAuth';
import { OrderSummaryReport } from '../../@types/seller-center';
import { getOrderSummaryReport } from 'utils/sellerCenterAxios/sellerDashboard';

// ----------------------------------------------------------------------
export default function SellerCenter() {
  const { user } = useAuth();
  const storeId = user!.store.id;
  const [orderSummaryReport, setOrderSummaryReport] = useState<OrderSummaryReport>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getOrderSummaryReport(storeId);
      setOrderSummaryReport(response);
    };
    fetchData();
  }, [storeId]);

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
            <InfoNewOrders total={orderSummaryReport?.LUNAS} />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <InfoDeliveringOrders total={orderSummaryReport?.['DALAM PENGIRIMAN']} />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <InfoFinishedOrders total={orderSummaryReport?.SELESAI} />
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
