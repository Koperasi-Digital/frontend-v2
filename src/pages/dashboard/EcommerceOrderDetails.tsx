import Page from '../../components/Page';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderDetails } from 'utils/ecommerceOrder';
import { OrderDetailsSummary } from 'components/_dashboard/e-commerce/order-details';
import { OrderDetails } from '../../@types/order';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from 'routes/paths';
import { Container } from '@mui/material';

export default function EcommerceOrderDetails() {
  const { id = '' } = useParams();
  const [orderDetails, setOrderDetails] = useState<OrderDetails>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      const orderDetails = await getOrderDetails(id);
      console.log(orderDetails);
      setOrderDetails(orderDetails);
      setIsLoading(false);
    }
    fetchOrder();
  }, [id]);

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
        {!isLoading && orderDetails && <OrderDetailsSummary orderDetails={orderDetails} />}
      </Container>
    </Page>
  );
}
