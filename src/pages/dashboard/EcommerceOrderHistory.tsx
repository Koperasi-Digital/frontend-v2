import { useState, useEffect } from 'react';
// material
import { Card, Container, TablePagination, Grid } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// @types
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { getOrdersByCustomer } from 'utils/ecommerceOrder';
import { OrderCard } from 'components/_dashboard/e-commerce/order-history';

export default function EcommerceProductList() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    async function fetchOrders() {
      const orderList = await getOrdersByCustomer('2');
      setOrders(orderList);
    }
    fetchOrders();
  }, []);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Page title="Ecommerce: Order History | CoopChick">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading="Order History"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'E-Commerce',
              href: PATH_DASHBOARD.eCommerce.root
            },
            { name: 'Order History' }
          ]}
        />

        <Card sx={{ py: 2 }}>
          <Grid container spacing={3}>
            {orders.map((order) => (
              <Grid key={order} item xs={12}>
                <OrderCard orderDetails={order} />
              </Grid>
            ))}
          </Grid>

          <TablePagination
            rowsPerPageOptions={[10, 20, 30]}
            component="div"
            count={orders.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, value) => setPage(value)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
