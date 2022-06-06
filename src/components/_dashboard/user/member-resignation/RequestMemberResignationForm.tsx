import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
import closeFill from '@iconify/icons-eva/close-fill';
// material
import {
  Stack,
  Alert,
  styled,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useIsMountedRef from 'hooks/useIsMountedRef';
import useAuth from 'hooks/useAuth';
//
import { MIconButton } from '../../../@material-extend';
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
  const { user } = useAuth();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const formik = useFormik<InitialValues>({
    enableReinitialize: true,
    initialValues: {
      reason: 'pengajuan',
      description: '',
      isSure: false
    },
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await axios.post(`member-resignation/create`, values);
        enqueueSnackbar('Request pengunduran keanggotaan berhasil dikirim!', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
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
            placeholder="Alasan penghapusan akun"
            // {...getFieldProps('city')}
            SelectProps={{ native: true }}
            // error={Boolean(touched.city && errors.city)}
            // helperText={touched.city && errors.city}
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
