import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, TextField, Typography } from '@mui/material';
// hooks
import useAuth from 'hooks/useAuth';

import { handleGetSaldo } from 'utils/financeSaldo';
import { handleCreateReimbursement } from 'utils/financeReimbursement';
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

  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const saldo = await handleGetSaldo(user.id);
        if (saldo) {
          setSaldo(saldo.amount);
        }
      }
    };
    fetchData();
  }, [user]);

  const DisbursementRequestSchema = Yup.object().shape({
    amount: Yup.number()
      .required()
      .min(0, 'Min value 0.')
      .max(saldo ? saldo : 0, `Max value ${fCurrency(saldo ? saldo : 0)}`)
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      amount: ''
    },
    validationSchema: DisbursementRequestSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        if (user && props.bankAccount) {
          if (await handleCreateReimbursement(user.id, Number(values.amount))) {
            enqueueSnackbar('Create success', { variant: 'success' });
          } else {
            enqueueSnackbar('Create fail', { variant: 'error' });
          }
        }
        if (!props.bankAccount) {
          enqueueSnackbar('Create bank account first', { variant: 'error' });
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
                    label="Amount"
                    {...getFieldProps('amount')}
                    error={Boolean(touched.amount && errors.amount)}
                    helperText={touched.amount && errors.amount}
                  />
                  <Typography variant="body2" sx={{ mb: 10 }}>
                    {saldo
                      ? `Sisa saldo ${fCurrency(saldo)} / Maksimal pencairan ${fCurrency(saldo)}`
                      : ``}
                  </Typography>
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
