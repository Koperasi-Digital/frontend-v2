import { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import { handleCreateTransaction } from '../../../utils/financeTransaction';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';
import addOrder from 'utils/order';

type CompleteOrderProps = {
  user_id: number;
  buttonName: string;
  checkout: any;
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

const CompleteOrder = ({ user_id, buttonName, checkout }: CompleteOrderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const temp = {
    user_id: user_id,
    total_cost: checkout.total
  };

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
    setIsLoading(false);
  }, []);

  const paymentFunction = async () => {
    const { id, total_cost } = await addOrder(temp);
    const transactionDetails = {
      order_id: id,
      gross_amount: total_cost
    };

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

    console.log(id);
    console.log(total_cost);
    console.log(transactionDetails);
    const tokenName = await handleCreateTransaction(user_id, transactionDetails, null);
    console.log(tokenName);
    window.snap.pay(tokenName, snapOptions);
  };

  return (
    <LoadingButton
      fullWidth
      size="large"
      type="submit"
      variant="contained"
      onClick={paymentFunction}
    >
      {buttonName}
    </LoadingButton>
  );
};

export default CompleteOrder;
