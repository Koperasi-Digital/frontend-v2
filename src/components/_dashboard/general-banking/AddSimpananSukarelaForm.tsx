import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { Form, FormikProvider, useFormik } from 'formik';
import { useEffect } from 'react';
// material
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, TextField } from '@mui/material';
// hooks
import useAuth from 'hooks/useAuth';
import { PATH_DASHBOARD } from 'routes/paths';
//
import { handleCreateTransaction } from 'utils/financeTransaction';
import { handleCreateOrder } from 'utils/financeOrder';
import { handleAddOrderSimpananSukarela } from 'utils/financeSimpanan';

type transaction_details = {
  order_id: number;
  gross_amount: number;
};

declare global {
  interface Window {
    snap: any;
  }
}

export default function AddSimpananSukarelaForm() {
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useAuth();
  const userId = user?.id;

  const AddSimpananSukarelaSchema = Yup.object().shape({
    amount: Yup.number().required().min(0, 'Min value 0.')
  });

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

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      amount: ''
    },
    validationSchema: AddSimpananSukarelaSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        const createdOrder = await handleCreateOrder(userId, Number(values.amount));
        await handleAddOrderSimpananSukarela(userId, createdOrder.id);
        await paymentFunction(userId, {
          order_id: createdOrder.id,
          gross_amount: createdOrder.total_cost
        });
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
              loading={isSubmitting}
              disabled={!user}
            >
              {user ? 'Add Simpanan Sukarela' : 'Loading'}
            </LoadingButton>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
