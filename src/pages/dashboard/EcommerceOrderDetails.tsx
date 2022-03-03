import Page from '../../components/Page';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrder } from 'utils/orders';
import { OrderDetailsSummary } from 'components/_dashboard/e-commerce/order-details';
import { Order } from '../../@types/order';

export default function EcommerceOrderDetails() {
  const { id = '' } = useParams();
  const [orderDetails, setOrderDetails] = useState<Order>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      const orderDetails = await getOrder(id);
      console.log(orderDetails);
      setOrderDetails(orderDetails);
      setIsLoading(false);
    }
    fetchOrder();
  }, []);

  return (
    <Page title="Detail Transaction">
      {!isLoading && orderDetails && <OrderDetailsSummary order={orderDetails} />}
    </Page>
  );
}
