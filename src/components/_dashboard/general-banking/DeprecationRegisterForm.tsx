import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, TextField } from '@mui/material';

import { useState, useEffect } from 'react';
import {
  handleGetCoopNeracaInfo,
  handleRegisterKerusakanAlat
} from 'utils/financeAxios/financeCoopReport';
import { fCurrency } from 'utils/formatNumber';
import { createNotification } from 'redux/slices/notification';

type CoopNeracaData = {
  kas: number;
  asetTetap: number;
  aset: number;
  saldoMember: number;
  simpananSukarela: number;
  liabilitas: number;
  pendapatan: number;
  modal: number;
  beban: number;
  ekuitas: number;
};

export default function DeprecationRegisterForm() {
  const { enqueueSnackbar } = useSnackbar();

  const [coopNeracaData, setCoopNeracaData] = useState<CoopNeracaData | undefined>();

  const periode = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-1';

  const DeprecationRegisterSchema = Yup.object().shape({
    amount: Yup.number()
      .required()
      .min(0, `Jumlah Minimum ${fCurrency(0)}`)
      .max(
        coopNeracaData ? coopNeracaData.asetTetap : 0,
        `Jumlah maksimum ${fCurrency(coopNeracaData ? coopNeracaData.asetTetap : 0)}`
      )
  });

  useEffect(() => {
    const fetchData = async () => {
      setCoopNeracaData(await handleGetCoopNeracaInfo(periode));
    };
    fetchData();
  }, [periode]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      amount: ''
    },
    validationSchema: DeprecationRegisterSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        if (coopNeracaData) {
          const response = await handleRegisterKerusakanAlat(Number(values.amount), periode);
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
              'Pendaftaran kerusakan peralatan koperasi berhasil',
              notificationDescription
            );
            enqueueSnackbar('Pendaftaran kerusakan peralatan koperasi berhasil', {
              variant: 'success'
            });
            resetForm();
            setSubmitting(false);
          }
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
              disabled={!coopNeracaData}
            >
              {coopNeracaData ? 'Daftarkan Kerusakan Peralatan' : 'Loading'}
            </LoadingButton>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
