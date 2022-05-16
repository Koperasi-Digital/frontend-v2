import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { Form, FormikProvider, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import useAuth from 'hooks/useAuth';
// redux
import { RootState, useSelector } from 'redux/store';
import { useDispatch } from 'redux/store';
// material
import { LoadingButton } from '@mui/lab';
import {
  Card,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField
} from '@mui/material';
import { handleCreateOrder } from 'utils/financeAxios/financeOrder';
import {
  handleAddOrderSimpananSukarela,
  handleGetSimpananSukarela,
  handleCreateSimpananSukarela
} from 'utils/financeAxios/financeSimpanan';
import { paymentFunction } from './PaymentCreation';

declare global {
  interface Window {
    snap: any;
  }
}

export default function AddSimpananSukarelaForm() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { isLoadingCharge } = useSelector((state: RootState) => state.emoney);
  const [loadingSnap, setLoadingSnap] = useState<boolean>(false);
  const { user } = useAuth();

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

  const AddSimpananSukarelaSchema = Yup.object().shape({
    amount: Yup.number().required().min(0, 'Min value 0.'),
    paymentType: Yup.string().required().oneOf(['GOPAY', 'OTHER'])
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      amount: '',
      paymentType: 'OTHER'
    },
    validationSchema: AddSimpananSukarelaSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        const createdOrder = await handleCreateOrder(user?.id, Number(values.amount), 'OTHER');
        const fetchedSimpananSukarela = await handleGetSimpananSukarela();
        if (!fetchedSimpananSukarela) {
          await handleCreateSimpananSukarela();
        }
        await handleAddOrderSimpananSukarela(createdOrder.id);
        await paymentFunction(
          setLoadingSnap,
          values.paymentType,
          {
            order_id: createdOrder.id,
            gross_amount: createdOrder.total_cost
          },
          dispatch,
          enqueueSnackbar
        );
        resetForm();
        setSubmitting(false);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={5}>
                <Stack spacing={1}>
                  <TextField
                    fullWidth
                    label="Amount"
                    {...getFieldProps('amount')}
                    error={Boolean(touched.amount && errors.amount)}
                    helperText={touched.amount && errors.amount}
                  />
                  <FormLabel id="payment-type-radio-buttons-group">Metode Pembayaran</FormLabel>
                  <RadioGroup
                    aria-labelledby="payment-type-radio-buttons-group"
                    {...getFieldProps('paymentType')}
                  >
                    <FormControlLabel value="GOPAY" control={<Radio />} label="GOPAY" />
                    <FormControlLabel value="OTHER" control={<Radio />} label="OTHER" />
                  </RadioGroup>
                </Stack>
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              loading={isSubmitting || isLoadingCharge || loadingSnap}
            >
              Penambahan Simpanan Sukarela
            </LoadingButton>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
