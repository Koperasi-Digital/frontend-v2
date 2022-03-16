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
import { fData } from '../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// @types
import { UserManager } from '../../../@types/user';
//
import { UploadAvatar } from '../../upload';
import countries from './countries';
import useAuth from 'hooks/useAuth';
import { editUser } from 'redux/slices/user';

// ----------------------------------------------------------------------

type UserNewFormProps = {
  isEdit: boolean;
  currentUser?: UserManager;
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
    displayName: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email(),
    phoneNumber: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    country: Yup.string().required('country is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    roles: Yup.array().required('Assigned Roles is required')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      displayName: currentUser?.displayName || '',
      email: currentUser?.email || '',
      phoneNumber: currentUser?.phoneNumber || '',
      address: currentUser?.address || '',
      country: currentUser?.country || '',
      state: currentUser?.state || '',
      city: currentUser?.city || '',
      zipCode: currentUser?.zipCode || '',
      photoURL: currentUser?.photoURL || null,
      roles: currentUser?.roles.map((role) => role.name) || []
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        if (isEdit) {
          await editUser(currentUser!.id, {
            ...values,
            roles: roles.filter((_role) => values.roles.includes(_role.name))
          });
        }
        resetForm();
        setSubmitting(false);
        enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
        navigate(PATH_DASHBOARD.user.list);
      } catch (error: any) {
        console.error(error);
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
        setFieldValue('avatarUrl', {
          ...file,
          preview: URL.createObjectURL(file)
        });
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
                      Allowed *.jpeg, *.jpg, *.png, *.gif
                      <br /> max size of {fData(3145728)}
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
                    label="Name"
                    {...getFieldProps('displayName')}
                    error={Boolean(touched.displayName && errors.displayName)}
                    helperText={touched.displayName && errors.displayName}
                  />
                  <TextField
                    fullWidth
                    label="Email Address"
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    {...getFieldProps('phoneNumber')}
                    error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                  />
                  <TextField
                    select
                    fullWidth
                    label="Country"
                    placeholder="Country"
                    {...getFieldProps('country')}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.country && errors.country)}
                    helperText={touched.country && errors.country}
                  >
                    <option value="" />
                    {countries.map((option) => (
                      <option key={option.code} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="State/Region"
                    {...getFieldProps('state')}
                    error={Boolean(touched.state && errors.state)}
                    helperText={touched.state && errors.state}
                  />
                  <TextField
                    fullWidth
                    label="City"
                    {...getFieldProps('city')}
                    error={Boolean(touched.city && errors.city)}
                    helperText={touched.city && errors.city}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Address"
                    {...getFieldProps('address')}
                    error={Boolean(touched.address && errors.address)}
                    helperText={touched.address && errors.address}
                  />
                  <TextField fullWidth label="Zip/Code" {...getFieldProps('zipCode')} />
                </Stack>

                <FormControl>
                  <InputLabel id="assigned-roles-label">Assigned Roles</InputLabel>
                  <Select
                    labelId="assigned-roles-label"
                    id="assigned-roles"
                    multiple
                    value={values.roles}
                    onChange={handleChangeAssignedRole}
                    input={<OutlinedInput label="Assigned Roles" />}
                    renderValue={(selected) => selected.map(capitalize).join(', ')}
                    disabled={currentUser?.id === loggedInUser?.id}
                  >
                    {roles.map(({ name }) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={values.roles.indexOf(name) > -1} />
                        <ListItemText primary={capitalize(name)} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {!isEdit ? 'Create User' : 'Save Changes'}
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
