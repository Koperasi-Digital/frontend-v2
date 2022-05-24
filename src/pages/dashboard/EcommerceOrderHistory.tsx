import { useState, useEffect } from 'react';
// material
import { Container, TablePagination, Grid, Typography, Box } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getOrdersByCustomer } from '../../redux/slices/order';
// routes
import { PATH_DASHBOARD, PATH_PAGE } from '../../routes/paths';
// @types
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { OrderCard } from 'components/_dashboard/e-commerce/order-history';
import { OrderState } from '../../@types/order';
import useAuth from 'hooks/useAuth';

export default function EcommerceProductList() {
  const dispatch = useDispatch();
  const { orderDetailsList: orders, orderDetailsGroupByOrder } = useSelector(
    (state: { order: OrderState }) => state.order
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { user } = useAuth();

  useEffect(() => {
    dispatch(getOrdersByCustomer(user?.id.toString()));
  }, [dispatch, user]);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Page title="Ecommerce: Riwayat Pesanan | CoopChick">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading="Riwayat Pesanan"
          links={[
            { name: 'Beranda', href: PATH_PAGE.homepage },
            {
              name: 'E-Commerce',
              href: PATH_DASHBOARD.eCommerce.root
            },
            { name: 'Riwayat Pesanan' }
          ]}
        />

        <Box justifyContent="center" sx={{ m: 'auto' }} width={{ xs: '100%', md: '80%' }}>
          {orders.length === 0 ? (
            <Box display="flex" justifyContent="center" sx={{ width: '100%', p: 3 }}>
              <Typography variant="body2">Kamu belum pernah melakukan pemesanan.</Typography>
            </Box>
          ) : (
            <>
              <Grid container spacing={3}>
                {Object.keys(orderDetailsGroupByOrder)
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((orderId) => (
                    <>
                      <Grid key={orderId} item xs={12}>
                        <OrderCard
                          orderDetails={orderDetailsGroupByOrder[orderId]}
                          orderId={orderId}
                        />
                      </Grid>
                    </>
                  ))}
              </Grid>

              <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={Object.keys(orderDetailsGroupByOrder).length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(event, value) => setPage(value)}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          )}
        </Box>
      </Container>
    </Page>
  );
}
