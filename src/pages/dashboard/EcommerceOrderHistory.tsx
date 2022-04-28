import { useState, useEffect } from 'react';
// material
import { Card, Container, TablePagination, Grid, Typography, Box } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getOrdersByCustomer } from '../../redux/slices/order';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// @types
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { OrderCard } from 'components/_dashboard/e-commerce/order-history';
import { OrderState } from '../../@types/order';
import useAuth from 'hooks/useAuth';

export default function EcommerceProductList() {
  const dispatch = useDispatch();
  const { orderDetailsList: orders } = useSelector((state: { order: OrderState }) => state.order);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { user } = useAuth();

  useEffect(() => {
    dispatch(getOrdersByCustomer(user?.id.toString()));
  }, [dispatch, user]);

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
          {orders.length === 0 ? (
            <Box display="flex" justifyContent="center" sx={{ width: '100%', p: 3 }}>
              <Typography variant="body2">Kamu belum pernah melakukan pemesanan.</Typography>
            </Box>
          ) : (
            <>
              <Grid container spacing={3}>
                {orders.map((order) => (
                  <Grid key={order.id} item xs={12}>
                    <OrderCard orderDetails={order} />
                  </Grid>
                ))}
              </Grid>

              <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={orders.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(event, value) => setPage(value)}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          )}
        </Card>
      </Container>
    </Page>
  );
}
