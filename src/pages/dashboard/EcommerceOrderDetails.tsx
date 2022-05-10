import Page from '../../components/Page';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { OrderDetailsSummary } from 'components/_dashboard/e-commerce/order-details';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from 'routes/paths';
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

  const { user, currentRole } = useAuth();
  console.log(user);
  console.log(currentRole);

  useEffect(() => {
    dispatch(getOrderDetails(id));
    dispatch(getOrderDetailsLog(id));
    setIsSeller(currentRole!.name === 'MEMBER');
  }, [dispatch, id, currentRole]);

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
