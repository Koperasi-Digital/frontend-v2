import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@mui/lab';
import {
  Card,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography
} from '@mui/material';
// hooks
import useAuth from 'hooks/useAuth';

import { handleGetSaldo } from 'utils/financeAxios/financeSaldo';
import { handleCreateReimbursement } from 'utils/financeAxios/financeReimbursement';
import { handleGetSimpananSukarela } from 'utils/financeAxios/financeSimpanan';
import { fCurrency } from 'utils/formatNumber';

// ----------------------------------------------------------------------

type BankAccount = {
  accountNumber: string;
  accountName: string;
  bankName: string;
};

export default function DisbursementRequestForm(props: { bankAccount: BankAccount | undefined }) {
  const { enqueueSnackbar } = useSnackbar();

  const [saldo, setSaldo] = useState<number>();
  const [simpananSukarelaAmount, setSimpananSukarelaAmount] = useState<number>();
  const [maxDisbursement, setMaxDisbursement] = useState<number>();

  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const saldo = await handleGetSaldo();
        if (saldo) {
          setSaldo(saldo.amount);
          setMaxDisbursement(saldo.amount);
        }
        const simpananSukarela = await handleGetSimpananSukarela();
        if (simpananSukarela) {
          setSimpananSukarelaAmount(simpananSukarela.amount);
        }
      }
    };
    fetchData();
  }, [user]);

  const DisbursementRequestSchema = Yup.object().shape({
    amount: Yup.number()
      .required('Jumlah pencairan dana wajib diisi')
      .min(0, 'Jumlah minimum 0.')
      .max(
        maxDisbursement ? maxDisbursement : 0,
        `Jumlah maksimum ${fCurrency(maxDisbursement ? maxDisbursement : 0)}`
      ),
    disbType: Yup.string().required('Tipe pencairan dana perlu diisi')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      amount: '',
      disbType: 'saldo'
    },
    validationSchema: DisbursementRequestSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        if (user && props.bankAccount) {
          if (await handleCreateReimbursement(Number(values.amount), values.disbType)) {
            window.location.reload();
            enqueueSnackbar('Pengajuan pencairan dana berhasil dibuat', { variant: 'success' });
          } else {
            enqueueSnackbar('Pengajuan pencairan dana gagal dibuat', { variant: 'error' });
          }
        }
        if (!props.bankAccount) {
          enqueueSnackbar('Buat akun bank terlebih dahulu', { variant: 'error' });
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

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, values, setFieldValue } =
    formik;

  const handleChange = (event: any) => {
    setFieldValue('disbType', event.target.value);
    setMaxDisbursement(
      event.target.value === 'saldo' && saldo
        ? saldo
        : event.target.value === 'simpanan-sukarela' && simpananSukarelaAmount
        ? simpananSukarelaAmount
        : 0
    );
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
                    label="Jumlah"
                    {...getFieldProps('amount')}
                    error={Boolean(touched.amount && errors.amount)}
                    helperText={touched.amount && errors.amount}
                  />
                  <Typography variant="body2" sx={{ mb: 10 }}>
                    {values.disbType === 'saldo' && saldo
                      ? `Sisa saldo ${fCurrency(saldo)} / Maksimal pencairan ${fCurrency(saldo)}`
                      : ``}
                    {values.disbType === 'simpanan-sukarela' && simpananSukarelaAmount
                      ? `Sisa simpanan sukarela ${fCurrency(
                          simpananSukarelaAmount
                        )} / Maksimal pencairan ${fCurrency(simpananSukarelaAmount)}`
                      : ``}
                  </Typography>
                </Stack>
                <Stack spacing={1}>
                  <FormControl>
                    <FormLabel id="type-radio-buttons-group-label">Tipe</FormLabel>
                    <RadioGroup
                      aria-labelledby="type-radio-buttons-group-label"
                      name="disbType"
                      value={values.disbType}
                      onChange={handleChange}
                    >
                      <FormControlLabel value="saldo" control={<Radio />} label="Saldo" />
                      <FormControlLabel
                        value="simpanan-sukarela"
                        control={<Radio />}
                        label="Simpanan Sukarela"
                      />
                    </RadioGroup>
                  </FormControl>
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
              {user ? 'Pengajuan Pencairan' : 'Loading'}
            </LoadingButton>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
