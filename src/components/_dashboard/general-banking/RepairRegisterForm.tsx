import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, TextField } from '@mui/material';

import { handleRegisterEquipmentRepairment } from 'utils/financeAxios/financeCoopReport';
import { fCurrency } from 'utils/formatNumber';
import { createNotification } from 'redux/slices/notification';

export default function RepairRegisterForm() {
  const { enqueueSnackbar } = useSnackbar();

  const periode = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-1';

  const RepairRegisterSchema = Yup.object().shape({
    amount: Yup.number()
      .required()
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
        const response = await handleRegisterEquipmentRepairment(Number(values.amount), periode);
        let notificationDescription = '';
        if (response) {
          for (let i = 0; i < response.length; i++) {
            notificationDescription += response[i].report + '\n';
            for (let j = 0; j < response[i].field.length; j++) {
              notificationDescription +=
                response[i].field[j] +
                ' ' +
                fCurrency(response[i].initial[j]) +
                '->' +
                fCurrency(response[i].final[j]) +
                '\n';
            }

            if (i < response.length - 1) {
              notificationDescription += '\n';
            }
          }
          createNotification(
            'Pendaftaran perbaikan peralatan koperasi berhasil',
            notificationDescription
          );
          enqueueSnackbar('Pendaftaran perbaikan peralatan koperasi berhasil', {
            variant: 'success'
          });
          resetForm();
          setSubmitting(false);
        }
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
              <Stack spacing={1}>
                <TextField
                  fullWidth
                  label="Amount"
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
