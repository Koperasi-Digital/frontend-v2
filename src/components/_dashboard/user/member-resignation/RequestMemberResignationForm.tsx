import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Stack, Alert, Typography, TextField, Checkbox, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useIsMountedRef from 'hooks/useIsMountedRef';
import axios from 'utils/axios';

// ----------------------------------------------------------------------

interface InitialValues {
  reason: 'pengajuan' | 'meninggal';
  description: string;
  isSure: boolean;
  afterSubmit?: string;
}

export default function RequestMemberResignationForm() {
  const isMountedRef = useIsMountedRef();

  const formik = useFormik<InitialValues>({
    enableReinitialize: true,
    initialValues: {
      reason: 'pengajuan',
      description: '',
      isSure: false
    },
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        const { reason, description } = values;
        await axios.post(`member-resignation/create`, { reason, description });
        if (isMountedRef.current) {
          setSubmitting(false);
        }
        window.location.reload();
      } catch (error: any) {
        console.error(error);
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.message });
          setSubmitting(false);
        }
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, values, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

          <TextField
            select
            fullWidth
            label="Alasan"
            placeholder="Alasan pengunduran diri"
            {...getFieldProps('reason')}
            SelectProps={{ native: true }}
            error={Boolean(touched.reason && errors.reason)}
            helperText={touched.reason && errors.reason}
          >
            <option value="pengajuan">Pengajuan pribadi</option>
            <option value="meninggal">Meninggal dunia</option>
          </TextField>

          <TextField
            fullWidth
            multiline
            rows={8}
            label="Deskripsi"
            {...getFieldProps('description')}
            error={Boolean(touched.description && errors.description)}
            helperText={touched.description && errors.description}
          />

          <FormControlLabel
            control={<Checkbox checked={values.isSure} {...getFieldProps('isSure')} />}
            label={
              <Typography variant="body2">
                Saya mengerti bahwa pengunduran diri akan menyebabkan kehilangan hak-hak sebagai
                anggota koperasi. Pengguna tetap dapat melakukan transaksi dalam <i>e-commerce</i>{' '}
                sebagai <i>customer</i>
              </Typography>
            }
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            disabled={!values.isSure}
          >
            Kirim
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
