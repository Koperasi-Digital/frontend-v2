import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { Typography, Box, Stack } from '@mui/material';
// components
import Page from '../../components/Page';
import { useNavigate, useParams } from 'react-router-dom';
import { handleCreateTransaction } from 'utils/financeAxios/financeTransaction';
import { handleGetOrder } from 'utils/financeAxios/financeOrder';
import { TransactionDetails } from '../../@types/transaction';
import { PATH_DASHBOARD } from 'routes/paths';
import { setCheckoutOrder } from 'redux/slices/product';

//redux
import { RootState, useDispatch, useSelector } from 'redux/store';
import { getPayAccount, chargePayAccount } from 'redux/slices/emoney';

declare global {
  interface Window {
    snap: any;
  }
}

// ----------------------------------------------------------------------
export default function PaymentPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoadingCharge } = useSelector((state: RootState) => state.emoney);
  const { id: orderId = '', paymentType } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [transactionDetails, setTransactionDetails] = useState<TransactionDetails>();
  const [payAccountExist, setPayAccountExist] = useState<Boolean>(false);

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
  }, [orderId, dispatch]);

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
    const payWithOthers = () => {
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
    };

    const payWithGopay = async () => {
      const path = PATH_DASHBOARD.eCommerce.checkout;
      const payAccount = await getPayAccount();
      if (payAccount) {
        setPayAccountExist(true);
        const currentURL = window.location.href;
        const pathName = window.location.pathname;
        const rootPath = currentURL.replace(pathName, '');
        const response = await chargePayAccount(orderId, rootPath + '/e-commerce/checkout');
        console.log('The response is');
        console.log(response);
        if (response.status_code === '200') {
          navigate(path);
        } else if (response.status_code === '201') {
        }
      } else {
        setPayAccountExist(false);
      }
    };

    if (paymentType === 'OTHER') {
      payWithOthers();
    } else {
      payWithGopay();
    }
  }, [transactionDetails, enqueueSnackbar, navigate, orderId, paymentType]);

  return (
    <Page title="Payment">
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
              : isLoadingCharge
              ? 'Pembayaran sedang diproses'
              : 'Terjadi error'}
          </Typography>
        </Stack>
      </Box>
    </Page>
  );
}
