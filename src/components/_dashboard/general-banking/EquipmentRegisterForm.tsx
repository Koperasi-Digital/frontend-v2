import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, TextField } from '@mui/material';
// hooks
import useAuth from 'hooks/useAuth';
import { handleAddEquipment } from 'utils/financeAxios/financeReport';

export default function EquipmentRegisterForm() {
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useAuth();

  const EquipmentRegisterSchema = Yup.object().shape({
    price: Yup.number().required()
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      price: ''
    },
    validationSchema: EquipmentRegisterSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        if (user) {
          const currentPeriode = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-1`;
          const editedNeraca = await handleAddEquipment(
            user.id,
            currentPeriode,
            Number(values.price)
          );
          if (editedNeraca) {
            enqueueSnackbar('Equipment registration success', { variant: 'success' });
          } else {
            enqueueSnackbar('Equipment registration fail', { variant: 'error' });
          }
        }
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
                    label="Price"
                    {...getFieldProps('price')}
                    error={Boolean(touched.price && errors.price)}
                    helperText={touched.price && errors.price}
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
              {user ? 'Create Equipment Registration' : 'Loading'}
            </LoadingButton>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
