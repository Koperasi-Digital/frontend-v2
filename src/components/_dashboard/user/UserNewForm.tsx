import * as Yup from 'yup';
import { useCallback, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import { capitalize } from 'lodash';
// material
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  Grid,
  Stack,
  TextField,
  Typography,
  FormHelperText,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent
} from '@mui/material';
// redux
import { useDispatch, useSelector, RootState } from '../../../redux/store';
import { getRoles } from '../../../redux/slices/role';
// utils
import { fData } from 'utils/formatNumber';
import { handleUploadFile } from 'utils/bucket';
import { fTimestamp } from 'utils/formatTime';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// @types
import { UserManager } from '../../../@types/user';
//
import { UploadAvatar } from '../../upload';
import useAuth from 'hooks/useAuth';
import { editUser } from 'redux/slices/user';

// ----------------------------------------------------------------------

type UserNewFormProps = {
  isEdit: boolean;
  currentUser?: UserManager;
};

type InitialValues = {
  displayName: string;
  email: string;
  photoURL: string | null;
  password: null | string;
  confirmPassword: string;
  roles: string[];
};

export default function UserNewForm({ isEdit, currentUser }: UserNewFormProps) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const { user: loggedInUser } = useAuth();
  const { roles } = useSelector((state: RootState) => state.role);

  useEffect(() => {
    dispatch(getRoles());
  }, [dispatch]);

  const NewUserSchema = Yup.object().shape({
    displayName: Yup.string().required('Nama harus diisi'),
    email: Yup.string().required('Email harus diisi').email(),
    roles: Yup.array().min(1, 'Pengguna minimal harus memiliki satu role'),
    password: Yup.string().min(6, 'Password berisi minimal 6 karakter').nullable(),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Password harus sesuai')
      .nullable()
  });

  const formik = useFormik<InitialValues>({
    enableReinitialize: true,
    initialValues: {
      displayName: currentUser?.displayName || '',
      email: currentUser?.email || '',
      photoURL: currentUser?.photoURL || null,
      roles: currentUser?.roles.map((role) => role.name) || [],
      password: '',
      confirmPassword: ''
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...otherValues } = values;
      if (otherValues.password === '') {
        otherValues.password = null;
      }
      try {
        if (otherValues.photoURL && typeof otherValues.photoURL === 'object') {
          const photoFile = otherValues.photoURL as unknown as File;
          const photoUrl = await handleUploadFile(
            photoFile,
            `user/${currentUser?.id}/profile`,
            `${fTimestamp(new Date())}-${photoFile.name}`
          );
          otherValues.photoURL = photoUrl;
        }
        if (isEdit) {
          await editUser(currentUser!.id, {
            ...otherValues,
            roles: roles.filter((_role) => values.roles.includes(_role.name))
          });
        }
        resetForm();
        setSubmitting(false);
        enqueueSnackbar(!isEdit ? 'Pengguna berhasil dibuat!' : 'Pengguna berhasil diedit!', {
          variant: 'success'
        });
        navigate(PATH_DASHBOARD.user.list);
      } catch (error: any) {
        console.error(error);
        enqueueSnackbar('Error!', { variant: 'error' });
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } =
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

  const handleChangeAssignedRole = (event: SelectChangeEvent<typeof values.roles>) => {
    const {
      target: { value }
    } = event;
    setFieldValue('roles', typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 10, px: 3 }}>
              <Box sx={{ mb: 5 }}>
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
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Nama"
                    {...getFieldProps('displayName')}
                    error={Boolean(touched.displayName && errors.displayName)}
                    helperText={touched.displayName && errors.displayName}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    {...getFieldProps('password')}
                    fullWidth
                    type="password"
                    label="Password Baru"
                    error={Boolean(touched.password && errors.password)}
                    helperText={
                      (touched.password && errors.password) || 'Password berisi minimal 6 karakter'
                    }
                  />

                  <TextField
                    {...getFieldProps('confirmPassword')}
                    fullWidth
                    type="password"
                    label="Konfirmasi Password"
                    error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                    helperText={touched.confirmPassword && errors.confirmPassword}
                  />
                </Stack>

                <FormControl>
                  <InputLabel id="assigned-roles-label">Role</InputLabel>
                  <Select
                    labelId="assigned-roles-label"
                    id="assigned-roles"
                    multiple
                    value={values.roles}
                    onChange={handleChangeAssignedRole}
                    input={<OutlinedInput label="Role" />}
                    renderValue={(selected) => selected.map(capitalize).join(', ')}
                    disabled={currentUser?.id === loggedInUser?.id}
                    error={Boolean(touched.roles && errors.roles)}
                  >
                    {roles.map(({ name }) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={values.roles.indexOf(name) > -1} />
                        <ListItemText primary={capitalize(name)} />
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText error sx={{ textAlign: 'left' }}>
                    {touched.roles && errors.roles}
                  </FormHelperText>
                </FormControl>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    Simpan
                  </LoadingButton>
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
