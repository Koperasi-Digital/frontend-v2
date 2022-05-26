import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { Typography, Box, Stack } from '@mui/material';
// components
import Page from '../../components/Page';
import { useParams } from 'react-router-dom';
import { handleGetOrder } from 'utils/financeAxios/financeOrder';
import { TransactionDetails } from '../../@types/transaction';

//redux
import { RootState, useDispatch, useSelector } from 'redux/store';
import { getPayAccount } from 'redux/slices/emoney';
import { paymentFunction } from 'components/_dashboard/general-banking/PaymentCreation';

declare global {
  interface Window {
    snap: any;
  }
}

// ----------------------------------------------------------------------
export default function PaymentPage() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { isLoadingCharge, errorType } = useSelector((state: RootState) => state.emoney);
  const [loadingSnap, setLoadingSnap] = useState<boolean>(false);
  const { id: orderId = '', paymentType } = useParams();
  const [transactionDetails, setTransactionDetails] = useState<TransactionDetails>();
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
    const fetchOrder = async () => {
      const order = await handleGetOrder(orderId);
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

  useEffect(() => {
    const payFun = async () => {
      const currentURL = window.location.href;
      const pathName = window.location.pathname;
      const rootPath = currentURL.replace(pathName, '');
      if (paymentType && transactionDetails) {
        await paymentFunction(
          setLoadingSnap,
          paymentType,
          transactionDetails,
          dispatch,
          enqueueSnackbar,
          `${rootPath}/dashboard/e-commerce/order-history`
        );
      }
    };
    payFun();
  }, [paymentType, transactionDetails, dispatch, enqueueSnackbar]);

  return (
    <Page title="Pembayaran">
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignContent: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100vh'
        }}
      >
        <Stack alignItems="center" spacing={2}>
          <Box
            sx={{ width: 320, height: 320, p: 3, margin: { xs: 'auto', md: 'inherit' } }}
            component="img"
            alt="coopchick logo"
            src={'/CoopChick_Logo.png'}
          />
          <Typography variant="h3">
            {paymentType === 'OTHER'
              ? null
              : !payAccountExist
              ? 'Akun pembayaran tidak tersedia. Silahkan daftarkan akun pembayaran terlebih dahulu'
              : isLoadingCharge || loadingSnap
              ? 'Pembayaran sedang diproses'
              : errorType
              ? errorType
              : ''}
          </Typography>
        </Stack>
      </Box>
    </Page>
  );
}
