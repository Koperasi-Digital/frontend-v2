import Page from '../../components/Page';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { OrderDetailsSummary } from 'components/_dashboard/e-commerce/order-details';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import { PATH_DASHBOARD, PATH_PAGE } from 'routes/paths';
import { Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getOrderDetails, getOrderDetailsLog } from '../../redux/slices/order';
import { OrderState } from '../../@types/order';
import useAuth from 'hooks/useAuth';

export default function EcommerceOrderDetails() {
  const { id = '' } = useParams();
  const dispatch = useDispatch();
  const [isSeller, setIsSeller] = useState(false);
  const { orderDetails, orderDetailsLog, isLoading } = useSelector(
    (state: { order: OrderState }) => state.order
  );

  const { user } = useAuth();

  useEffect(() => {
    dispatch(getOrderDetails(id));
    dispatch(getOrderDetailsLog(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (orderDetails != null && user!.store != null) {
      setIsSeller(orderDetails.product.store.id === user!.store.id);
    }
  }, [orderDetails, user]);

  return (
    <Page title="Detail Transaction">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading={'Order Details #' + (orderDetails && orderDetails.id)}
          links={[
            {
              name: isSeller ? 'Dashboard' : 'Homepage',
              href: isSeller ? PATH_DASHBOARD.root : PATH_PAGE.homepage
            },
            {
              name: isSeller ? 'Seller Center' : 'E-Commerce',
              href: isSeller ? PATH_DASHBOARD.eCommerce.seller.root : PATH_DASHBOARD.eCommerce.root
            },
            {
              name: isSeller ? 'Order List' : 'Order History',
              href: isSeller
                ? PATH_DASHBOARD.eCommerce.seller.orderList
                : PATH_DASHBOARD.eCommerce.orderHistory
            },
            {
              name: 'Order Details #' + (orderDetails && orderDetails.id)
            }
          ]}
        />
        {!isLoading && orderDetails && orderDetailsLog && (
          <OrderDetailsSummary
            orderDetails={orderDetails}
            orderDetailsLog={orderDetailsLog}
            isSeller={isSeller}
          />
        )}
      </Container>
    </Page>
  );
}
