import { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import { handleCreateTransaction } from '../../../utils/financeTransaction';
import { handleGetOrder } from '../../../utils/financeTransaction';
import { useSnackbar } from 'notistack';

type PaymentCreationProps = {
  user_id: number;
  buttonName: string;
  transaction_details: transaction_details;
  item_details: any;
};

type transaction_details = {
  order_id: number;
  gross_amount: number;
};

type order = {
  id: number;
  user_id: number;
  grossAmount: number;
  status: string;
};

declare global {
  interface Window {
    snap: any;
  }
}

const PaymentCreation = ({
  user_id,
  buttonName,
  transaction_details,
  item_details
}: PaymentCreationProps) => {
  const [order, setOrder] = useState<order>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    const handleOrder = async () => {
      const order = await handleGetOrder(transaction_details.order_id);
      setOrder(order);
      setIsLoading(false);
    };

    handleOrder();
  }, [transaction_details.order_id]);

  const paymentFunction = async () => {
    const snapOptions = {
      onSuccess: function (result: any) {
        //TODO: PUSH NOTIFICATION
        window.location.href = './';
        enqueueSnackbar('Payment success', { variant: 'success' });
      },
      onPending: function (result: any) {
        //TODO: PUSH NOTIFICATION
        window.location.href = './';
        enqueueSnackbar('Payment pending', { variant: 'warning' });
      },
      onError: function (result: any) {
        //TODO: PUSH NOTIFICATION
        window.location.href = './';
        enqueueSnackbar('Payment error', { variant: 'error' });
      },
      onClose: function () {}
    };

    const tokenName = await handleCreateTransaction(user_id, transaction_details, item_details);
    window.snap.pay(tokenName, snapOptions);
  };

  return (
    <>
      {isLoading ? (
        <Typography variant="overline" sx={{ color: 'text.secondary' }}>
          Loading
        </Typography>
      ) : order?.status === 'success' ? (
        <></>
      ) : (
        <Button variant="contained" onClick={paymentFunction}>
          {buttonName}
        </Button>
      )}
    </>
  );
};

export default PaymentCreation;
