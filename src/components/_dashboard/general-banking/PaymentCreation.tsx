import React from 'react';
import { Button } from '@mui/material';
import { handleCreateTransaction } from '../../../utils/transaction';

type PaymentCreationProps = {
  buttonName: string;
  transaction_details: transaction_details;
  item_details: any;
};

type transaction_details = {
  order_id: string;
  gross_amount: number;
};

declare global {
  interface Window {
    snap: any;
  }
}

const PaymentCreation = ({
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
    const tokenName = await handleCreateTransaction(transaction_details, item_details);
    window.snap.pay(tokenName);
  };

  return (
    <Button variant="contained" onClick={paymentFunction}>
      {buttonName}
    </Button>
  );
};

export default PaymentCreation;
