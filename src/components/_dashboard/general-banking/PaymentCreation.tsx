import { useEffect, useState } from 'react';
import { handleCreateTransaction } from '../../../utils/financeAxios/financeTransaction';
import { useSnackbar } from 'notistack';

import { DialogAnimate } from 'components/animate';

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
import { DialogActions, DialogTitle, Typography, Stack, Button } from '@mui/material';

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
      enqueueSnackbar('Pembayaran berhasil', { variant: 'success' });
    },
    onPending: function (result: any) {
      setLoadingSnap(false);
      window.location.href = redirectURL ? redirectURL : coopChickCurrentURL;
      enqueueSnackbar('Pembayaran tertunda', { variant: 'warning' });
    },
    onError: function (result: any) {
      setLoadingSnap(false);
      window.location.href = redirectURL ? redirectURL : coopChickCurrentURL;
      enqueueSnackbar('Pembayaran gagal', { variant: 'error' });
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
  const [isOpenGopayPopUp, setIsOpenGopayPopUp] = useState<boolean>(false);
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

  const PaymentButton = () => {
    return (
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
        {buttonName !== 'GOPAY TERDAFTAR' ? buttonName : 'YA'}
      </LoadingButton>
    );
  };

  return (
    <>
      {paymentType === 'OTHER' ? (
        <PaymentButton />
      ) : payAccountExist ? (
        <>
          <DialogAnimate
            open={isOpenGopayPopUp}
            onClose={() => {
              setIsOpenGopayPopUp(false);
            }}
          >
            <DialogTitle sx={{ pb: 1 }}>Apakah anda yakin ingin membayar dengan gopay?</DialogTitle>
            <DialogActions>
              <Stack direction="row" spacing={2}>
                <PaymentButton />
                <Button
                  onClick={() => {
                    setIsOpenGopayPopUp(false);
                  }}
                >
                  Tidak
                </Button>
              </Stack>
            </DialogActions>
          </DialogAnimate>
          <Button
            variant="contained"
            onClick={() => {
              setIsOpenGopayPopUp(true);
            }}
          >
            GOPAY TERDAFTAR
          </Button>
        </>
      ) : !payAccountExist ? (
        <Typography>Belum ada akun gopay terdaftar</Typography>
      ) : null}
    </>
  );
};

export default PaymentCreation;
