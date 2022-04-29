import * as Yup from 'yup';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
// material
import { Grid, Button } from '@mui/material';
import { useSnackbar } from 'notistack';

import { LoadingButton } from '@mui/lab';

// @types
import {
  DeliveryOption,
  PaymentOption,
  CardOption,
  ProductState,
  ShipmentForm,
  ShipmentOptions
} from '../../../../@types/products';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import {
  onGotoStep,
  onBackStep,
  onNextStep,
  applyShipping
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
import { useEffect, useState } from 'react';
import { getAllShipmentCost } from 'utils/checkoutAxios/shipment';
import { getCityIDByName } from 'components/_dashboard/user/cities';

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

const CARDS_OPTIONS: CardOption[] = [
  { value: 'ViSa1', label: '**** **** **** 1212 - Jimmy Holland' },
  { value: 'ViSa2', label: '**** **** **** 2424 - Shawn Stokes' },
  { value: 'MasterCard', label: '**** **** **** 4545 - Cole Armstrong' }
];

export default function CheckoutPayment() {
  const navigate = useNavigate();
  const [deliveryOptions, setDeliveryOptions] = useState<ShipmentOptions[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  const userId = user?.id;
  const { checkout } = useSelector((state: { product: ProductState }) => state.product);
  const dispatch = useDispatch();
  const { total, subtotal, shipping, cart, billing: address } = checkout;

  // Retrieve all delivery options
  useEffect(() => {
    const shipmentInfo: ShipmentForm = {
      origin: 2,
      destination: getCityIDByName(address!.city),
      weight: 15
    };
    const fetchShippingData = async (shipmentInfo: ShipmentForm) => {
      const response: ShipmentOptions[] = await getAllShipmentCost(shipmentInfo);
      setDeliveryOptions(response);
    };
    fetchShippingData(shipmentInfo);
  }, [cart]);

  const handleBackStep = () => {
    dispatch(onBackStep());
  };

  const handleGotoStep = (step: number) => {
    dispatch(onGotoStep(step));
  };

  const handleApplyShipping = (value: number) => {
    dispatch(applyShipping(value));
  };

  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  const PaymentSchema = Yup.object().shape({
    delivery: Yup.mixed().required('Shipment delivery is required'),
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

  const { isSubmitting, handleSubmit } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <CheckoutDelivery
              formik={formik}
              onApplyShipping={handleApplyShipping}
              deliveryOptions={deliveryOptions}
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
