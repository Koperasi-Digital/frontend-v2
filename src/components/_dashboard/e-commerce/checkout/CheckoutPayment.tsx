import * as Yup from 'yup';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
import { useEffect } from 'react';
// material
import { Grid, Button } from '@mui/material';
import { useSnackbar } from 'notistack';

import { LoadingButton } from '@mui/lab';

// @types
import {
  DeliveryOption,
  PaymentOption,
  CardOption,
  ProductState
} from '../../../../@types/products';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import {
  onGotoStep,
  onBackStep,
  onNextStep,
  applyShipping,
  addCheckoutOrder
} from '../../../../redux/slices/product';
//
import CheckoutSummary from './CheckoutSummary';
import CheckoutDelivery from './CheckoutDelivery';
import CheckoutBillingInfo from './CheckoutBillingInfo';
import CheckoutPaymentMethods from './CheckoutPaymentMethods';
import { handleCreateOrder, handleEditOrder, handleGetOrder } from 'utils/financeOrder';
import { handleCreateTransaction } from 'utils/financeTransaction';
import { PATH_DASHBOARD } from 'routes/paths';
import useAuth from 'hooks/useAuth';

type transaction_details = {
  order_id: number;
  gross_amount: number;
};

declare global {
  interface Window {
    snap: any;
  }
}

const DELIVERY_OPTIONS: DeliveryOption[] = [
  {
    value: 0,
    title: 'Standard delivery (Free)',
    description: 'Delivered on Monday, August 12'
  },
  {
    value: 2,
    title: 'Fast delivery ($2,00)',
    description: 'Delivered on Monday, August 5'
  }
];

const PAYMENT_OPTIONS: PaymentOption[] = [
  {
    value: 'paypal',
    title: 'Pay with Paypal',
    description: 'You will be redirected to PayPal website to complete your purchase securely.',
    icons: ['/static/icons/ic_paypal.svg']
  },
  {
    value: 'credit_card',
    title: 'Credit / Debit Card',
    description: 'We support Mastercard, Visa, Discover and Stripe.',
    icons: ['/static/icons/ic_mastercard.svg', '/static/icons/ic_visa.svg']
  },
  {
    value: 'cash',
    title: 'Cash on CheckoutDelivery',
    description: 'Pay with cash when your order is delivered.',
    icons: []
  }
];

const CARDS_OPTIONS: CardOption[] = [
  { value: 'ViSa1', label: '**** **** **** 1212 - Jimmy Holland' },
  { value: 'ViSa2', label: '**** **** **** 2424 - Shawn Stokes' },
  { value: 'MasterCard', label: '**** **** **** 4545 - Cole Armstrong' }
];

const SELLERID = 1; //TODO: replace using user id of shop owner

export default function CheckoutPayment() {
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useAuth();
  const userId = user?.id;

  const { checkout } = useSelector((state: { product: ProductState }) => state.product);

  const dispatch = useDispatch();
  const { total, discount, subtotal, shipping, orderId } = checkout;

  const handleBackStep = () => {
    dispatch(onBackStep());
  };

  const handleGotoStep = (step: number) => {
    dispatch(onGotoStep(step));
  };

  const handleApplyShipping = (value: number) => {
    dispatch(applyShipping(value));
  };

  useEffect(() => {
    //for payment
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
    const handleNextStep = () => {
      dispatch(onNextStep());
    };

    const handleCheckOrderStatus = async () => {
      if (orderId) {
        const order = await handleGetOrder(orderId);
        if (order.status === 'LUNAS') {
          handleNextStep();
        }
      }
    };

    handleCheckOrderStatus();
  }, [dispatch, orderId]);

  const paymentFunction = async (user_id: number, transaction_details: transaction_details) => {
    const snapOptions = {
      onSuccess: function (result: any) {
        //TODO: PUSH NOTIFICATION
        window.location.href = PATH_DASHBOARD.eCommerce.checkout;
        enqueueSnackbar('Payment success', { variant: 'success' });
      },
      onPending: function (result: any) {
        //TODO: PUSH NOTIFICATION
        window.location.href = PATH_DASHBOARD.eCommerce.checkout;
        enqueueSnackbar('Payment pending', { variant: 'warning' });
      },
      onError: function (result: any) {
        //TODO: PUSH NOTIFICATION
        window.location.href = PATH_DASHBOARD.eCommerce.checkout;
        enqueueSnackbar('Payment error', { variant: 'error' });
      },
      onClose: function () {}
    };

    const tokenName = await handleCreateTransaction(transaction_details);
    window.snap.pay(tokenName, snapOptions);
  };

  const fetchData = async () => {
    if (!orderId) {
      const createdOrder = await handleCreateOrder(userId, Math.floor(total), SELLERID);
      dispatch(addCheckoutOrder(createdOrder.id));
      return createdOrder;
    } else {
      const editedOrder = await handleEditOrder(orderId, Math.floor(total));
      return editedOrder;
    }
    //TODO: INSERT ORDER DETAIL TO DB
  };

  const PaymentSchema = Yup.object().shape({
    payment: Yup.mixed().required('Payment is required')
  });

  const formik = useFormik({
    initialValues: {
      delivery: shipping,
      payment: ''
    },
    validationSchema: PaymentSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        const order = await fetchData();
        await paymentFunction(userId, {
          order_id: order.id,
          gross_amount: order.total_cost
        });
        // handleNextStep();
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error.message);
      }
    }
  });

  const { isSubmitting, handleSubmit } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <CheckoutDelivery
              formik={formik}
              onApplyShipping={handleApplyShipping}
              deliveryOptions={DELIVERY_OPTIONS}
            />
            <CheckoutPaymentMethods
              formik={formik}
              cardOptions={CARDS_OPTIONS}
              paymentOptions={PAYMENT_OPTIONS}
            />
            <Button
              type="button"
              size="small"
              color="inherit"
              onClick={handleBackStep}
              startIcon={<Icon icon={arrowIosBackFill} />}
            >
              Back
            </Button>
          </Grid>

          <Grid item xs={12} md={4}>
            <CheckoutBillingInfo onBackStep={handleBackStep} />
            <CheckoutSummary
              enableEdit
              total={total}
              subtotal={subtotal}
              discount={discount}
              shipping={shipping}
              onEdit={() => handleGotoStep(0)}
            />
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Complete Order
            </LoadingButton>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
