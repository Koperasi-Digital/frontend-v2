import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { Container } from '@mui/material';
// components
import Page from '../../components/Page';
import { useNavigate, useParams } from 'react-router-dom';
import { handleCreateTransaction } from 'utils/financeAxios/financeTransaction';
import { handleGetOrder } from 'utils/financeAxios/financeOrder';
import { TransactionDetails } from '../../@types/transaction';
import { PATH_DASHBOARD } from 'routes/paths';
import { dispatch } from 'redux/store';
import { setCheckoutOrder } from 'redux/slices/product';

declare global {
  interface Window {
    snap: any;
  }
}

// ----------------------------------------------------------------------
export default function PaymentPage() {
  const navigate = useNavigate();
  const { id: orderId = '' } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [transactionDetails, setTransactionDetails] = useState<TransactionDetails>();

  useEffect(() => {
    dispatch(setCheckoutOrder(orderId));
    const snapSrcUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';
    const myMidtransClientKey = 'SB-Mid-client-hGP5UBKXCE-VIit4'; //change this according to your client-key

    const script = document.createElement('script');
    script.src = snapSrcUrl;
    script.setAttribute('data-client-key', myMidtransClientKey);
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [orderId]);

  useEffect(() => {
    const fetchOrder = async () => {
      const order = await handleGetOrder(orderId);
      console.log(order);
      if (order) {
        setTransactionDetails({
          order_id: orderId,
          gross_amount: order.total_cost
        });
      }
    };
    fetchOrder();
  }, [orderId]);

  useEffect(() => {
    const path = PATH_DASHBOARD.eCommerce.checkout;
    const payFun = async () => {
      if (transactionDetails) {
        const snapOptions = {
          onSuccess: function (result: any) {
            //TODO: PUSH NOTIFICATION
            enqueueSnackbar('Payment success', { variant: 'success' });
            navigate(path);
          },
          onPending: function (result: any) {
            //TODO: PUSH NOTIFICATION
            enqueueSnackbar('Payment pending', { variant: 'warning' });
            navigate(path);
          },
          onError: function (result: any) {
            //TODO: PUSH NOTIFICATION
            enqueueSnackbar('Payment error', { variant: 'error' });
            navigate(path);
          },
          onClose: function () {
            //TODO: PUSH NOTIFICATION
            enqueueSnackbar('Payment pending', { variant: 'warning' });
            navigate(path);
          }
        };

        const tokenName = await handleCreateTransaction(transactionDetails);
        window.snap.pay(tokenName, snapOptions);
      }
    };
    payFun();
  }, [transactionDetails, enqueueSnackbar, navigate]);

  return (
    <Page title="Payment">
      <Container maxWidth="xl"></Container>
    </Page>
  );
}
