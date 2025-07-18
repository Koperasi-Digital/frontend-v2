import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { DialogActions, DialogContent, Stack, TextField, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';

type BankingEMoneyFormProps = {
  handleCloseModal: VoidFunction;
  handleRegisterEMoney: any;
};

export default function BankingEMoneyForm({
  handleCloseModal,
  handleRegisterEMoney
}: BankingEMoneyFormProps) {
  const getInitialValues = () => {
    const _event = {
      payment_type: 'gopay',
      phone_number: '',
      country_code: '62'
    };

    return _event;
  };

  const EventSchema = Yup.object().shape({
    payment_type: Yup.string().max(255).required('Tipe pembayaran wajib diisi').oneOf(['gopay']),
    phone_number: Yup.string().max(13).required('Nomor telepon wajib diisi'),
    country_code: Yup.string().max(255).required('Kode negara wajib diisi')
  });

  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema: EventSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        await handleRegisterEMoney(values.payment_type, values.phone_number, values.country_code);
        handleCloseModal();
      } catch (err) {
        console.log(err);
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <DialogContent sx={{ pb: 0, overflowY: 'unset' }}>
          <TextField
            fullWidth
            label="Tipe Pembayaran"
            {...getFieldProps('payment_type')}
            error={Boolean(touched.payment_type && errors.payment_type)}
            helperText={touched.payment_type && errors.payment_type}
            sx={{ mb: 3 }}
          />
          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              multiline
              label="Kode Negara"
              {...getFieldProps('country_code')}
              error={Boolean(touched.country_code && errors.country_code)}
              helperText={touched.country_code && errors.country_code}
              disabled={true}
              sx={{ mb: 3 }}
            />
            <TextField
              fullWidth
              multiline
              label="Nomor Telepon"
              {...getFieldProps('phone_number')}
              error={Boolean(touched.phone_number && errors.phone_number)}
              helperText={touched.phone_number && errors.phone_number}
              sx={{ mb: 3 }}
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button type="button" variant="outlined" color="inherit" onClick={handleCloseModal}>
            Batal
          </Button>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
            loadingIndicator="Loading..."
          >
            Kirim
          </LoadingButton>
        </DialogActions>
      </Form>
    </FormikProvider>
  );
}
