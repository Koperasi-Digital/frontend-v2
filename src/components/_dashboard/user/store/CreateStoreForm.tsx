import * as Yup from 'yup';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
import closeFill from '@iconify/icons-eva/close-fill';
// material
import { TextField, Alert, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useIsMountedRef from 'hooks/useIsMountedRef';
import useAuth from 'hooks/useAuth';
//
import { MIconButton } from '../../../@material-extend';
import countries from '../countries';
import axios from 'utils/axios';
import { PATH_DASHBOARD } from 'routes/paths';

// ----------------------------------------------------------------------

type InitialValues = {
  name: string;
  description: string;
  phoneNumber: string;
  country: string;
  state: string;
  city: string;
  address: string;
  zipCode: string;
  afterSubmit?: string;
};

export default function CreateStoreForm() {
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { updateUser } = useAuth();
  const navigate = useNavigate();

  const RegisterSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Terlalu pendek!')
      .max(50, 'Terlalu panjang!')
      .required('Nama toko harus diisi'),
    description: Yup.string().required('Deskripsi toko harus diisi'),
    phoneNumber: Yup.string()
      .required('Nomor telepon harus diisi')
      .matches(
        /^\(?(?:\+62|62|0)(?:\d{2,3})?\)?[ .-]?\d{2,4}[ .-]?\d{2,4}[ .-]?\d{2,4}$/,
        'Nomor telepon tidak valid'
      ),
    country: Yup.string().required('Negara harus diisi'),
    state: Yup.string().required('Provinsi harus diisi'),
    city: Yup.string().required('Kota harus diisi'),
    address: Yup.string().required('Alamat harus diisi'),
    zipCode: Yup.string().required('Kode pos harus diisi')
  });

  const formik = useFormik<InitialValues>({
    initialValues: {
      name: '',
      description: '',
      phoneNumber: '',
      country: countries[99].label,
      state: '',
      city: '',
      address: '',
      zipCode: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        const response = await axios.post(`users/create-store`, values);
        const updatedUser = response.data.payload;
        updateUser(updatedUser);
        enqueueSnackbar('Pembukaan toko sukses!', {
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
        navigate(PATH_DASHBOARD.eCommerce.seller);
      } catch (error: any) {
        console.error(error);
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.message });
          setSubmitting(false);
        }
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3} direction="column">
          <Grid item>
            {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}
          </Grid>

          <Grid item>
            <TextField
              fullWidth
              label="Nama Toko"
              {...getFieldProps('name')}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
            />
          </Grid>

          <Grid item>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Deskripsi"
              {...getFieldProps('description')}
              error={Boolean(touched.description && errors.description)}
              helperText={touched.description && errors.description}
            />
          </Grid>

          <Grid item>
            <TextField
              fullWidth
              label="Nomor Telepon"
              {...getFieldProps('phoneNumber')}
              error={Boolean(touched.phoneNumber && errors.phoneNumber)}
              helperText={touched.phoneNumber && errors.phoneNumber}
            />
          </Grid>

          <Grid item>
            <TextField
              fullWidth
              label="Alamat"
              {...getFieldProps('address')}
              error={Boolean(touched.address && errors.address)}
              helperText={touched.address && errors.address}
            />
          </Grid>

          <Grid item>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Kota"
                  {...getFieldProps('city')}
                  error={Boolean(touched.city && errors.city)}
                  helperText={touched.city && errors.city}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Provinsi"
                  {...getFieldProps('state')}
                  error={Boolean(touched.state && errors.state)}
                  helperText={touched.state && errors.state}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Kode Pos"
                  {...getFieldProps('zipCode')}
                  error={Boolean(touched.zipCode && errors.zipCode)}
                  helperText={touched.zipCode && errors.zipCode}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <TextField
              select
              fullWidth
              label="Negara"
              placeholder="Negara"
              {...getFieldProps('country')}
              SelectProps={{ native: true }}
              error={Boolean(touched.country && errors.country)}
              helperText={touched.country && errors.country}
            >
              {countries.map((option) => (
                <option key={option.code} value={option.label}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </Grid>

          <Grid item sx={{ mt: 2 }}>
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Buka Toko
            </LoadingButton>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
