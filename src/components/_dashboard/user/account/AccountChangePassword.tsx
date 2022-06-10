import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Stack, Card, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// utils
import useAuth from 'hooks/useAuth';
import closeFill from '@iconify/icons-eva/close-fill';
import { MIconButton } from 'components/@material-extend';
import { Icon } from '@iconify/react';

// ----------------------------------------------------------------------

export default function AccountChangePassword() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { changePassword } = useAuth();

  const ChangePassWordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Password lama harus diisi'),
    newPassword: Yup.string()
      .min(6, 'Password berisi minimal 6 karakter')
      .required('Password baru harus diisi'),
    confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Password harus sesuai')
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    },
    validationSchema: ChangePassWordSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await changePassword(values.oldPassword, values.newPassword, values.confirmNewPassword);
        setSubmitting(false);
        enqueueSnackbar('Password berhasil diubah!', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
      } catch (err) {
        setSubmitting(false);
        enqueueSnackbar('Error!', {
          variant: 'error',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
      }
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Card sx={{ p: 3 }}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3} alignItems="flex-end">
            <TextField
              {...getFieldProps('oldPassword')}
              fullWidth
              autoComplete="on"
              type="password"
              label="Password Lama"
              error={Boolean(touched.oldPassword && errors.oldPassword)}
              helperText={touched.oldPassword && errors.oldPassword}
            />

            <TextField
              {...getFieldProps('newPassword')}
              fullWidth
              autoComplete="on"
              type="password"
              label="Password Baru"
              error={Boolean(touched.newPassword && errors.newPassword)}
              helperText={
                (touched.newPassword && errors.newPassword) || 'Password berisi minimal 6 karakter'
              }
            />

            <TextField
              {...getFieldProps('confirmNewPassword')}
              fullWidth
              autoComplete="on"
              type="password"
              label="Konfirmasi Password Baru"
              error={Boolean(touched.confirmNewPassword && errors.confirmNewPassword)}
              helperText={touched.confirmNewPassword && errors.confirmNewPassword}
            />

            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Simpan
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
    </Card>
  );
}
