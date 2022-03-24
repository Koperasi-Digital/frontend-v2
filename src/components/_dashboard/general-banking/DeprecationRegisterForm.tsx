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
// hooks
import useAuth from 'hooks/useAuth';

import {
  handleKerusakanAlatNeraca,
  handleKerusakanAlatLabaRugi,
  handleKerusakanBahanBakuNeraca,
  handleKerusakanBahanBakuLabaRugi
} from 'utils/financeReport';

export default function DeprecationRegisterForm() {
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useAuth();

  const DisbursementRequestSchema = Yup.object().shape({
    amount: Yup.number().required(),
    category: Yup.string().required().oneOf(['supply', 'equipment'])
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      amount: '',
      category: 'supply'
    },
    validationSchema: DisbursementRequestSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        if (user) {
          const currentPeriode = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-1`;
          if (values.category === 'supply') {
            const editedNeraca = await handleKerusakanBahanBakuNeraca(
              user.id,
              currentPeriode,
              Number(values.amount)
            );
            const editedLabaRugi = await handleKerusakanBahanBakuLabaRugi(
              user.id,
              currentPeriode,
              Number(values.amount)
            );
            if (editedNeraca && editedLabaRugi) {
              enqueueSnackbar('Supply deprecation register success', { variant: 'success' });
            } else {
              enqueueSnackbar('Supply deprecation register fail', { variant: 'error' });
            }
          } else {
            const editedNeraca = await handleKerusakanAlatNeraca(
              user.id,
              currentPeriode,
              Number(values.amount)
            );
            const editedLabaRugi = await handleKerusakanAlatLabaRugi(
              user.id,
              currentPeriode,
              Number(values.amount)
            );
            if (editedNeraca && editedLabaRugi) {
              enqueueSnackbar('Equipment deprecation register success', { variant: 'success' });
            } else {
              enqueueSnackbar('Equipment deprecation register fail', { variant: 'error' });
            }
          }
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
                    label="Amount"
                    {...getFieldProps('amount')}
                    error={Boolean(touched.amount && errors.amount)}
                    helperText={touched.amount && errors.amount}
                  />
                  <FormLabel id="deprecation-type-radio-buttons-group">Type</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    {...getFieldProps('category')}
                  >
                    <FormControlLabel value="supply" control={<Radio />} label="Supply" />
                    <FormControlLabel value="equipment" control={<Radio />} label="Equipment" />
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
              disabled={!user}
            >
              {user ? 'Create Disbursement Request' : 'Loading'}
            </LoadingButton>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
