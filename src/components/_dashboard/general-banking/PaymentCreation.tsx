import { useEffect, useState } from 'react';
import { handleCreateTransaction } from '../../../utils/financeAxios/financeTransaction';
import { useSnackbar } from 'notistack';

// redux
import { RootState, useSelector } from 'redux/store';
import { useDispatch } from 'redux/store';
import {
  getPayAccount,
  chargePayAccount,
  finishLoadingChargePaymentAccount
} from 'redux/slices/emoney';

// material
import { LoadingButton } from '@mui/lab';
import { Typography } from '@mui/material';

type PaymentCreationProps = {
  buttonName: string;
  transaction_details: transaction_details;
  paymentType: string;
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

export const paymentFunction = async (
  setLoadingSnap: any,
  paymentType: string,
  transaction_details: transaction_details,
  dispatch: any,
  enqueueSnackbar: any,
  redirectURL?: string
) => {
  const coopChickCurrentURL = window.location.href;
  const snapOptions = {
    onSuccess: function (result: any) {
      setLoadingSnap(false);
      window.location.href = redirectURL ? redirectURL : coopChickCurrentURL;
      enqueueSnackbar('Payment success', { variant: 'success' });
    },
    onPending: function (result: any) {
      setLoadingSnap(false);
      window.location.href = redirectURL ? redirectURL : coopChickCurrentURL;
      enqueueSnackbar('Payment pending', { variant: 'warning' });
    },
    onError: function (result: any) {
      setLoadingSnap(false);
      window.location.href = redirectURL ? redirectURL : coopChickCurrentURL;
      enqueueSnackbar('Payment error', { variant: 'error' });
    },
    onClose: function () {
      setLoadingSnap(false);
      window.location.href = redirectURL ? redirectURL : coopChickCurrentURL;
    }
  };

  // transaction_details.order_id = '45f3a3f7-cf93-4a08-ba38-1284450d882c'; // --> simulation for third party payment gateway error

  if (paymentType === 'OTHER') {
    setLoadingSnap(true);
    const response = await handleCreateTransaction(transaction_details);
    if (response && response.message === 'Error on creating transaction token') {
      enqueueSnackbar('Pembuatan transaksi gagal, third party payment gateway/server error', {
        variant: 'error'
      });
      setLoadingSnap(false);
    } else {
      if (window.snap) {
        window.snap.pay(response, snapOptions);
      } else {
        window.location.reload();
      }
    }
  } else {
    const payAccount = await getPayAccount();
    if (payAccount) {
      const response = await chargePayAccount(
        transaction_details.order_id,
        redirectURL ? redirectURL : window.location.href
      );
      if (response && response.status_code === '200') {
        enqueueSnackbar('Pembayaran menggunakan akun pembayaran terdaftar berhasil', {
          variant: 'success'
        });
        if (redirectURL) {
          window.location.href = redirectURL;
        } else {
          window.location.reload();
        }
      } else if (response && response.status_code === '201') {
        window.location.href = response.actions[0].url;
      } else {
        enqueueSnackbar(response.message, { variant: 'error' });
        dispatch(finishLoadingChargePaymentAccount());
      }
    } else {
      enqueueSnackbar('Daftarkan terlebih dahulu akun pembayaran', { variant: 'error' });
    }
  }
};

const PaymentCreation = ({
  buttonName,
  transaction_details,
  paymentType
}: PaymentCreationProps) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { isLoadingCharge } = useSelector((state: RootState) => state.emoney);
  const [loadingSnap, setLoadingSnap] = useState<boolean>(false);
  const [payAccountExist, setPayAccountExist] = useState<Boolean>(false);

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
    const fetchPayAccount = async () => {
      const payAccount = await getPayAccount();
      if (payAccount) {
        setPayAccountExist(true);
      } else {
        setPayAccountExist(false);
      }
    };
    fetchPayAccount();
  }, []);

  return (
    <>
      {paymentType === 'OTHER' || payAccountExist ? (
        <LoadingButton
          variant="contained"
          loading={isLoadingCharge || loadingSnap}
          onClick={() => {
            paymentFunction(
              setLoadingSnap,
              paymentType,
              transaction_details,
              dispatch,
              enqueueSnackbar
            );
          }}
        >
          {buttonName}
        </LoadingButton>
      ) : !payAccountExist ? (
        <Typography>Belum ada akun gopay terdaftar</Typography>
      ) : null}
    </>
  );
};

export default PaymentCreation;
