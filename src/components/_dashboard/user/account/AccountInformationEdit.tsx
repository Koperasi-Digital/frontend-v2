import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import { Icon } from '@iconify/react';
// material
import { Box, Grid, Card, Stack, TextField, Typography, FormHelperText } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from 'hooks/useAuth';
import useIsMountedRef from 'hooks/useIsMountedRef';
import { UploadAvatar } from '../../../upload';
// utils
import { fData } from 'utils/formatNumber';
import { handleUploadFile } from 'utils/bucket';
import { fTimestamp } from 'utils/formatTime';
// @types
import { User } from '../../../../@types/account';
import closeFill from '@iconify/icons-eva/close-fill';
import { MIconButton } from 'components/@material-extend';

// ----------------------------------------------------------------------

interface InitialState extends Partial<User> {
  afterSubmit?: string;
}

export default function AccountInformationEdit() {
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { user, updateProfile } = useAuth();

  const UpdateUserSchema = Yup.object().shape({
    displayName: Yup.string()
      .min(2, 'Terlalu pendek!')
      .max(50, 'Terlalu panjang!')
      .required('Nama harus diisi'),
    email: Yup.string().email('Email tidak valid').required('Email harus diisi')
  });

  const formik = useFormik<InitialState>({
    enableReinitialize: true,
    initialValues: {
      id: user?.id,
      displayName: user?.displayName || '',
      email: user?.email,
      photoURL: user?.photoURL,
      roles: user?.roles,
      store: user?.store
    },

    validationSchema: UpdateUserSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        if (values.photoURL && typeof values.photoURL === 'object') {
          const photoFile = values.photoURL as unknown as File;
          const photoUrl = await handleUploadFile(
            photoFile,
            `user/${user?.id}/profile`,
            `${fTimestamp(new Date())}-${photoFile.name}`
          );
          values.photoURL = photoUrl;
        }
        updateProfile(values);
        enqueueSnackbar('Pengguna berhasil diedit!', {
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
      } catch (error: any) {
        console.log(error);
        enqueueSnackbar('Error!', {
          variant: 'error',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.code });
          setSubmitting(false);
        }
      }
    }
  });

  const { values, errors, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } =
    formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue(
          'photoURL',
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        );
      }
    },
    [setFieldValue]
  );

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} order={{ xs: 2, md: 1 }}>
            <Card sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Stack spacing={{ xs: 2, md: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  Informasi Pengguna
                </Typography>
                <TextField
                  fullWidth
                  label="Nama"
                  {...getFieldProps('displayName')}
                  error={Boolean(touched.displayName && errors.displayName)}
                  helperText={touched.displayName && errors.displayName}
                />
                <TextField
                  fullWidth
                  disabled
                  label="Email"
                  {...getFieldProps('email')}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Stack>
              <Box
                sx={{
                  mt: 3,
                  display: 'flex',
                  justifyContent: 'end',
                  alignItems: 'end',
                  flexGrow: 1
                }}
              >
                <Box>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    Simpan
                  </LoadingButton>
                </Box>
              </Box>
            </Card>
          </Grid>

          <Grid
            item
            xs={12}
            md={4}
            sx={{
              order: {
                xs: 1,
                md: 2
              }
            }}
          >
            <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
              <UploadAvatar
                accept="image/*"
                file={values.photoURL}
                maxSize={3145728}
                onDrop={handleDrop}
                error={Boolean(touched.photoURL && errors.photoURL)}
                caption={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary'
                    }}
                  >
                    Ekstensi file: *.jpeg, *.jpg, *.png, *.gif
                    <br /> dengan ukuran {fData(3145728)}
                  </Typography>
                }
              />

              <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                {touched.photoURL && errors.photoURL}
              </FormHelperText>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
