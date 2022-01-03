import React from 'react';
import { Button } from '@mui/material';

type PaymentButtonProps = {
  buttonName: string;
  tokenName: string;
};

declare global {
  interface Window {
    snap: any;
  }
}

const PaymentButton = ({ buttonName, tokenName }: PaymentButtonProps) => {
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

  const paymentFunction = () => {
    window.snap.pay(tokenName);
  };

  return (
    <Button variant="contained" onClick={paymentFunction}>
      {buttonName}
    </Button>
  );
};

export default PaymentButton;
