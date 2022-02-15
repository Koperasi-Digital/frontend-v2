import React from 'react';
import { Button } from '@mui/material';
import { handleCreateTransaction } from '../../../utils/financeTransaction';

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
  React.useEffect(() => {
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

  const paymentFunction = async () => {
    const snapOptions = {
      onSuccess: function (result: any) {
        //TODO: PUSH NOTIFICATION
        window.location.href = './';
      },
      onPending: function (result: any) {
        //TODO: PUSH NOTIFICATION
        window.location.href = './';
      },
      onError: function (result: any) {
        //TODO: PUSH NOTIFICATION
        window.location.href = './';
      },
      onClose: function () {}
    };

    const tokenName = await handleCreateTransaction(user_id, transaction_details, item_details);
    window.snap.pay(tokenName, snapOptions);
  };

  return (
    <Button variant="contained" onClick={paymentFunction}>
      {buttonName}
    </Button>
  );
};

export default PaymentCreation;
