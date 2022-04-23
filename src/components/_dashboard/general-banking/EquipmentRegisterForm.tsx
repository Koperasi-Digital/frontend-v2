import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { Form, FormikProvider, useFormik } from 'formik';
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

import { fCurrency } from 'utils/formatNumber';
import { createNotification } from 'redux/slices/notification';
import { handleRegisterNewEquipment } from 'utils/financeAxios/financeCoopReport';

export default function EquipmentRegisterForm() {
  const { enqueueSnackbar } = useSnackbar();

  const EquipmentRegisterSchema = Yup.object().shape({
    price: Yup.number().required(),
    source: Yup.string().required().oneOf(['kas', 'lainnya'])
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      price: '',
      source: 'kas'
    },
    validationSchema: EquipmentRegisterSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        const currentPeriode = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-1`;
        const response = await handleRegisterNewEquipment(
          Number(values.price),
          values.source,
          currentPeriode
        );
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
            'Pendaftaran pembelian peralatan koperasi berhasil',
            notificationDescription
          );
          enqueueSnackbar('Pendaftaran pembelian peralatan koperasi berhasil', {
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
            <Card sx={{ p: 3 }}>
              <Stack spacing={5}>
                <Stack spacing={1}>
                  <TextField
                    fullWidth
                    label="Harga"
                    {...getFieldProps('price')}
                    error={Boolean(touched.price && errors.price)}
                    helperText={touched.price && errors.price}
                  />
                  <FormLabel id="source-radio-buttons-group">Sumber</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    {...getFieldProps('source')}
                  >
                    <FormControlLabel value="kas" control={<Radio />} label="Kas" />
                    <FormControlLabel value="lainnya" control={<Radio />} label="Lainnya" />
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
              loading={isSubmitting}
            >
              Daftarkan Pembelian Peralatan
            </LoadingButton>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
