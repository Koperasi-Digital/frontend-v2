import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { Form, FormikProvider, useFormik } from 'formik';
import { useEffect, useState } from 'react';
// redux
import { RootState, useSelector } from 'redux/store';
import { getPayAccount, chargePayAccount } from 'redux/slices/emoney';
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
// hooks
import useAuth from 'hooks/useAuth';
import { PATH_DASHBOARD } from 'routes/paths';
//
import { handleCreateTransaction } from 'utils/financeAxios/financeTransaction';
import { handleCreateOrder } from 'utils/financeAxios/financeOrder';
import {
  handleAddOrderSimpananSukarela,
  handleGetSimpananSukarela,
  handleCreateSimpananSukarela
} from 'utils/financeAxios/financeSimpanan';
import { TransactionDetails } from '../../../@types/transaction';

declare global {
  interface Window {
    snap: any;
  }
}

export default function AddSimpananSukarelaForm() {
  const { enqueueSnackbar } = useSnackbar();
  const { isLoadingCharge } = useSelector((state: RootState) => state.emoney);
  const [loadingSnap, setLoadingSnap] = useState<boolean>(false);

  const { user } = useAuth();
  const userId = user?.id;

  const AddSimpananSukarelaSchema = Yup.object().shape({
    amount: Yup.number().required().min(0, 'Min value 0.'),
    paymentType: Yup.string().required().oneOf(['GOPAY', 'OTHER'])
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
      amount: '',
      paymentType: 'OTHER'
    },
    validationSchema: AddSimpananSukarelaSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        const createdOrder = await handleCreateOrder(userId, Number(values.amount), 'OTHER');
        const fetchedSimpananSukarela = await handleGetSimpananSukarela(userId);
        if (!fetchedSimpananSukarela) {
          await handleCreateSimpananSukarela(userId);
        }
        await handleAddOrderSimpananSukarela(userId, createdOrder.id);
        await paymentFunction(
          {
            order_id: createdOrder.id,
            gross_amount: createdOrder.total_cost
          },
          values.paymentType
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

  const paymentFunction = async (transaction_details: TransactionDetails, paymentType: string) => {
    const snapOptions = {
      onSuccess: function (result: any) {
        //TODO: PUSH NOTIFICATION
        window.location.href = PATH_DASHBOARD.finance.addSimpananSukarela;
        enqueueSnackbar('Payment success', { variant: 'success' });
      },
      onPending: function (result: any) {
        //TODO: PUSH NOTIFICATION
        window.location.href = PATH_DASHBOARD.finance.addSimpananSukarela;
        enqueueSnackbar('Payment pending', { variant: 'warning' });
      },
      onError: function (result: any) {
        //TODO: PUSH NOTIFICATION
        window.location.href = PATH_DASHBOARD.finance.addSimpananSukarela;
        enqueueSnackbar('Payment error', { variant: 'error' });
      },
      onClose: function () {}
    };

    if (paymentType === 'OTHER') {
      setLoadingSnap(true);
      const tokenName = await handleCreateTransaction(transaction_details);
      window.snap.pay(tokenName, snapOptions);
    } else {
      const payAccount = await getPayAccount();
      if (payAccount) {
        const response = await chargePayAccount(transaction_details.order_id, window.location.href);
        if (response.status_code === '200') {
          enqueueSnackbar('Pembayaran menggunakan akun pembayaran terdaftar berhasil', {
            variant: 'success'
          });
          window.location.reload();
        }
      } else {
        enqueueSnackbar('Daftarkan terlebih dahulu akun pembayaran', { variant: 'error' });
      }
    }
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
              disabled={!user}
            >
              {user ? 'Penambahan Simpanan Sukarela' : 'Loading'}
            </LoadingButton>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
