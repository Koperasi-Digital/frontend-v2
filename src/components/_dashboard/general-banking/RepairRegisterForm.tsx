import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, TextField, Typography } from '@mui/material';

import { handleRegisterEquipmentRepairment } from 'utils/financeAxios/financeCoopReport';
import { fCurrency } from 'utils/formatNumber';

export default function RepairRegisterForm() {
  const { enqueueSnackbar } = useSnackbar();

  const periode = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-1';

  const RepairRegisterSchema = Yup.object().shape({
    amount: Yup.number()
      .required('Jumlah wajib diisi')
      .min(0, `Jumlah Minimum ${fCurrency(0)}`)
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      amount: ''
    },
    validationSchema: RepairRegisterSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        await handleRegisterEquipmentRepairment(Number(values.amount), periode);
        enqueueSnackbar('Pendaftaran perbaikan peralatan koperasi berhasil', {
          variant: 'success'
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

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            <Card sx={{ p: 1 }}>
              <Stack direction="row" spacing={3}>
                <Typography variant="inherit" sx={{ mt: '1rem' }}>
                  Rp
                </Typography>
                <TextField
                  fullWidth
                  label="Nominal"
                  {...getFieldProps('amount')}
                  error={Boolean(touched.amount && errors.amount)}
                  helperText={touched.amount && errors.amount}
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
              Daftarkan Perbaikan Peralatan
            </LoadingButton>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
