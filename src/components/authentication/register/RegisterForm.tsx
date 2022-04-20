import * as Yup from 'yup';
import { useCallback, useState } from 'react';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import closeFill from '@iconify/icons-eva/close-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Alert,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  styled,
  Typography,
  FormHelperText
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
//
import { MIconButton } from '../../@material-extend';
import { UploadSingleFile } from 'components/upload';

// ----------------------------------------------------------------------

type InitialValues = {
  email: string;
  password: string;
  passwordConfirm: string;
  displayName: string;
  registerAsMember: 'yes' | 'no';
  identityCardPhoto: File | null;
  selfiePhoto: File | null;
  afterSubmit?: string;
};

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

export default function RegisterForm() {
  const { register } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    displayName: Yup.string()
      .min(2, 'Terlalu pendek!')
      .max(50, 'Terlalu panjang!')
      .required('Nama harus diisi'),
    email: Yup.string().email('Email tidak valid').required('Email harus diisi'),
    password: Yup.string()
      .min(6, 'Password minimal harus terdiri dari 6 karakter!')
      .required('Password harus diisi'),
    passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Password tidak sesuai')
  });

  const formik = useFormik<InitialValues>({
    initialValues: {
      displayName: '',
      email: '',
      password: '',
      passwordConfirm: '',
      registerAsMember: 'no',
      identityCardPhoto: null,
      selfiePhoto: null
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await register(
          values.email,
          values.password,
          values.passwordConfirm,
          values.displayName,
          values.registerAsMember === 'yes',
          values.identityCardPhoto,
          values.selfiePhoto
        );
        enqueueSnackbar('Pendaftaran sukses!', {
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
        console.error(error);
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.message });
          setSubmitting(false);
        }
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, values, setFieldValue } =
    formik;
  const { registerAsMember } = values;

  const handleDrop = useCallback(
    (fieldName: string) => (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue(
          fieldName,
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
        <Stack spacing={3}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

          <TextField
            fullWidth
            label="Nama"
            {...getFieldProps('displayName')}
            error={Boolean(touched.displayName && errors.displayName)}
            helperText={touched.displayName && errors.displayName}
          />

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          <TextField
            fullWidth
            type={showConfirmPassword ? 'text' : 'password'}
            label="Konfirmasi Password"
            {...getFieldProps('passwordConfirm')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowConfirmPassword((prev) => !prev)}>
                    <Icon icon={showConfirmPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.passwordConfirm && errors.passwordConfirm)}
            helperText={touched.passwordConfirm && errors.passwordConfirm}
          />

          <FormControl>
            <FormLabel id="registerAsMember">
              Apakah Anda ingin mendaftar sebagai Anggota Koperasi?
            </FormLabel>
            <RadioGroup row {...getFieldProps('registerAsMember')}>
              <FormControlLabel value="yes" control={<Radio />} label="Ya" />
              <FormControlLabel
                value="no"
                control={<Radio />}
                label={
                  <>
                    Tidak, saya hanya ingin menjadi <i>customer</i> dari <i>E-Commerce</i>
                  </>
                }
              />
            </RadioGroup>
          </FormControl>

          {registerAsMember === 'yes' && (
            <>
              <FormControl>
                <LabelStyle>Upload Foto KTP</LabelStyle>
                <UploadSingleFile
                  maxSize={10485760} // 10MB
                  accept="image/*"
                  file={values.identityCardPhoto}
                  withIllustration={false}
                  onDrop={handleDrop('identityCardPhoto')}
                  error={Boolean(touched.identityCardPhoto && errors.identityCardPhoto)}
                />
                {touched.identityCardPhoto && errors.identityCardPhoto && (
                  <FormHelperText error sx={{ px: 2 }}>
                    {touched.identityCardPhoto && errors.identityCardPhoto}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl>
                <LabelStyle>Upload Foto Selfie dengan KTP</LabelStyle>
                <UploadSingleFile
                  maxSize={10485760} // 10MB
                  accept="image/*"
                  file={values.selfiePhoto}
                  withIllustration={false}
                  onDrop={handleDrop('selfiePhoto')}
                  error={Boolean(touched.selfiePhoto && errors.selfiePhoto)}
                />
                {touched.selfiePhoto && errors.selfiePhoto && (
                  <FormHelperText error sx={{ px: 2 }}>
                    {touched.selfiePhoto && errors.selfiePhoto}
                  </FormHelperText>
                )}
              </FormControl>
            </>
          )}

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Daftar
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
