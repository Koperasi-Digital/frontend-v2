import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, TextField } from '@mui/material';
// hooks
import useAuth from 'hooks/useAuth';

import {
  handleCreateBankAccount,
  handleEditBankAccount
} from 'utils/financeAxios/financeBankAccount';

type BankAccount = {
  accountNumber: string;
  accountName: string;
  bankName: string;
};

export default function BankAccountRegisterForm(props: {
  bankAccount: BankAccount | undefined;
  setBankAccount: React.Dispatch<React.SetStateAction<BankAccount | undefined>>;
}) {
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useAuth();

  const BankAccountRegisterSchema = Yup.object().shape({
    accountNumber: Yup.string().required(),
    accountName: Yup.string().required(),
    bankName: Yup.string().required()
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      accountNumber: props.bankAccount ? props.bankAccount.accountNumber : '',
      accountName: props.bankAccount ? props.bankAccount.accountName : '',
      bankName: props.bankAccount ? props.bankAccount.bankName : ''
    },
    validationSchema: BankAccountRegisterSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        if (user) {
          if (props.bankAccount) {
            const editedBankAccount = await handleEditBankAccount(
              values.accountNumber,
              values.accountName,
              values.bankName
            );
            if (editedBankAccount) {
              props.setBankAccount(editedBankAccount);
              enqueueSnackbar('Akun bank berhasil diedit', { variant: 'success' });
            } else {
              enqueueSnackbar('Akun bank gagal diedit', { variant: 'error' });
            }
          } else {
            const createdBankAccount = await handleCreateBankAccount(
              values.accountNumber,
              values.accountName,
              values.bankName
            );
            if (createdBankAccount) {
              props.setBankAccount(createdBankAccount);
              enqueueSnackbar('Akun bank berhasil dibuat', { variant: 'success' });
            } else {
              enqueueSnackbar('Akun bank gagal dibuat', { variant: 'error' });
            }
          }
        }
        resetForm();
        setSubmitting(false);
      } catch (error) {
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
                <TextField
                  fullWidth
                  label="Nomor rekening"
                  {...getFieldProps('accountNumber')}
                  error={Boolean(touched.accountNumber && errors.accountNumber)}
                  helperText={touched.accountNumber && errors.accountNumber}
                />
                <TextField
                  fullWidth
                  label="Nama rekening"
                  {...getFieldProps('accountName')}
                  error={Boolean(touched.accountName && errors.accountName)}
                  helperText={touched.accountName && errors.accountName}
                />
                <TextField
                  fullWidth
                  label="Nama bank"
                  {...getFieldProps('bankName')}
                  error={Boolean(touched.bankName && errors.bankName)}
                  helperText={touched.bankName && errors.bankName}
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
              disabled={!user}
            >
              {user ? (props.bankAccount ? 'Edit akun bank' : 'Daftarkan akun bank') : 'Loading'}
            </LoadingButton>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
