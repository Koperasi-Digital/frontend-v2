import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, TextField, Typography } from '@mui/material';
// utils
import fakeRequest from '../../../utils/fakeRequest';

// ----------------------------------------------------------------------

export default function DisbursementRequestForm() {
  const { enqueueSnackbar } = useSnackbar();

  const NewProductSchema = Yup.object().shape({
    amount: Yup.number().required(),
    bankNumber: Yup.string().required()
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      amount: '',
      bankNumber: '',
      images: []
    },
    validationSchema: NewProductSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        await fakeRequest(500);
        resetForm();
        setSubmitting(false);
        enqueueSnackbar('Create success', { variant: 'success' });
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
                  <Typography variant="body2" sx={{ mb: 10 }}>
                    Sisa saldo Rp100.000,00 / Maksimal pencairan Rp100.000,00
                  </Typography>
                </Stack>
                <TextField
                  fullWidth
                  label="Bank Number"
                  {...getFieldProps('bankNumber')}
                  error={Boolean(touched.bankNumber && errors.bankNumber)}
                  helperText={touched.bankNumber && errors.bankNumber}
                />
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
            >
              {'Create Disbursement Request'}
            </LoadingButton>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
