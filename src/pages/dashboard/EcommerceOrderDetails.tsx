import Page from '../../components/Page';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { OrderDetailsSummary } from 'components/_dashboard/e-commerce/order-details';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from 'routes/paths';
import { Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getOrderDetails, getOrderDetailsLog } from '../../redux/slices/order';
import { OrderState } from '../../@types/order';

export default function EcommerceOrderDetails() {
  const { id = '' } = useParams();
  const dispatch = useDispatch();
  const { orderDetails, orderDetailsLog, isLoading } = useSelector(
    (state: { order: OrderState }) => state.order
  );

  useEffect(() => {
    dispatch(getOrderDetails(id));
    dispatch(getOrderDetailsLog(id));
  }, [dispatch, id]);

  return (
    <Page title="Detail Transaction">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading={'Order Details #' + (orderDetails && orderDetails.id)}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'E-Commerce',
              href: PATH_DASHBOARD.eCommerce.root
            },
            { name: 'Order List', href: PATH_DASHBOARD.eCommerce.orderList },
            {
              name: 'Order Details #' + (orderDetails && orderDetails.id)
            }
          ]}
        />
        {!isLoading && orderDetails && orderDetailsLog && (
          <OrderDetailsSummary orderDetails={orderDetails} orderDetailsLog={orderDetailsLog} />
        )}
      </Container>
    </Page>
  );
}
