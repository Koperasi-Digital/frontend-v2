import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, TextField, Typography } from '@mui/material';

import { useState, useEffect } from 'react';
import {
  handleGetCoopNeracaInfo,
  handleRegisterKerusakanAlat
} from 'utils/financeAxios/financeCoopReport';
import { fCurrency } from 'utils/formatNumber';

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
      .required('Jumlah wajib diisi')
      .min(0, `Jumlah minimum ${fCurrency(0)}`)
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
          await handleRegisterKerusakanAlat(Number(values.amount), periode);
          enqueueSnackbar('Pendaftaran kerusakan peralatan koperasi berhasil', {
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
