import * as Yup from 'yup';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
// material
import { Grid, Button } from '@mui/material';
import { useSnackbar } from 'notistack';

import { LoadingButton } from '@mui/lab';

// @types
import { PaymentOption, ProductState } from '../../../../@types/products';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import {
  onGotoStep,
  onBackStep,
  onNextStep,
  applyShipping,
  resetShipment
} from '../../../../redux/slices/product';
//
import CheckoutSummary from './CheckoutSummary';
import CheckoutDelivery from './CheckoutDelivery';
import CheckoutBillingInfo from './CheckoutBillingInfo';
import CheckoutPaymentMethods from './CheckoutPaymentMethods';
import { handleCreateOrder } from 'utils/financeAxios/financeOrder';
import { PATH_DASHBOARD } from 'routes/paths';
import useAuth from 'hooks/useAuth';
import { useNavigate } from 'react-router';

const PAYMENT_OPTIONS: PaymentOption[] = [
  {
    value: 'GOPAY',
    title: 'GO-PAY',
    description: 'Pembayaran akan menggunakan saldo GO-PAY terdaftar.',
    icons: ['/static/icons/ic_gopay.png']
  },
  {
    value: 'OTHER',
    title: 'Credit / Debit Card / Lainnya',
    description: 'Pembayaran menggunakan Kartu Credit / Debit',
    icons: ['/static/icons/ic_mastercard.svg', '/static/icons/ic_visa.svg']
  }
];

export default function CheckoutPayment() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  const userId = user?.id;
  const { checkout } = useSelector((state: { product: ProductState }) => state.product);
  const dispatch = useDispatch();
  const { total, subtotal, shipping, cart, billing: address } = checkout;

  const handleBackStep = () => {
    dispatch(onBackStep());
  };

  const handleGotoStep = (step: number) => {
    dispatch(onGotoStep(step));
  };

  const handleApplyShipping = (value: {
    chosenItem: number;
    shipment: string;
    shipment_price: number;
  }) => {
    dispatch(applyShipping(value));
  };

  const handleResetShipment = (value: number) => {
    dispatch(resetShipment(value));
    setFieldValue('shipment', '');
  };

  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  const PaymentSchema = Yup.object().shape({
    delivery: Yup.number()
      .positive('Must be more than 0')
      .required('Shipment delivery is required'),
    payment: Yup.mixed().required('Payment is required'),
    shipment: Yup.mixed().required('Shipment is required')
  });

  const formik = useFormik({
    initialValues: {
      delivery: shipping,
      payment: '',
      shipment: ''
    },
    validationSchema: PaymentSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        const createdOrder = await handleCreateOrder(
          userId,
          Math.floor(total),
          values.payment,
          cart,
          address ? address : undefined
        );
        enqueueSnackbar('Pesanan berhasil dibuat.', { variant: 'success' });
        handleNextStep();
        navigate(PATH_DASHBOARD.eCommerce.root + '/order/' + createdOrder.id + '/payment');
      } catch (error) {
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const { isSubmitting, handleSubmit, setFieldValue } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <CheckoutDelivery
              formik={formik}
              cart={cart}
              user_address={address}
              onApplyShipping={handleApplyShipping}
              onReset={handleResetShipment}
            />

            <CheckoutPaymentMethods formik={formik} paymentOptions={PAYMENT_OPTIONS} />
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
