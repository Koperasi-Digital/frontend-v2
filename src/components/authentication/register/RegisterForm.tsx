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
  firstName: string;
  lastName: string;
  registerAsMember: 'yes' | 'no';
  identityCardPhotoURL: File | null;
  selfiePhotoURL: File | null;
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
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().min(6, 'Too Short!').required('Password is required'),
    passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
  });

  const formik = useFormik<InitialValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: '',
      registerAsMember: 'no',
      identityCardPhotoURL: null,
      selfiePhotoURL: null
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      // TODO: Handle Upload Image
      try {
        await register(
          values.email,
          values.password,
          values.passwordConfirm,
          values.firstName,
          values.lastName,
          values.registerAsMember === 'yes'
        );
        enqueueSnackbar('Register success', {
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
        setFieldValue(fieldName, {
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="First name"
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Last name"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
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
            label="Password Confirmation"
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
                <LabelStyle>Upload KTP</LabelStyle>
                <UploadSingleFile
                  maxSize={10485760} // 10MB
                  accept="image/*"
                  file={values.identityCardPhotoURL}
                  withIllustration={false}
                  onDrop={handleDrop('identityCardPhotoURL')}
                  error={Boolean(touched.identityCardPhotoURL && errors.identityCardPhotoURL)}
                />
                {touched.identityCardPhotoURL && errors.identityCardPhotoURL && (
                  <FormHelperText error sx={{ px: 2 }}>
                    {touched.identityCardPhotoURL && errors.identityCardPhotoURL}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl>
                <LabelStyle>Upload Selfie dengan KTP</LabelStyle>
                <UploadSingleFile
                  maxSize={10485760} // 10MB
                  accept="image/*"
                  file={values.selfiePhotoURL}
                  withIllustration={false}
                  onDrop={handleDrop('selfiePhotoURL')}
                  error={Boolean(touched.selfiePhotoURL && errors.selfiePhotoURL)}
                />
                {touched.selfiePhotoURL && errors.selfiePhotoURL && (
                  <FormHelperText error sx={{ px: 2 }}>
                    {touched.selfiePhotoURL && errors.selfiePhotoURL}
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
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
