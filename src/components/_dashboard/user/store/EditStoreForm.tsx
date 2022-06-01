import { useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { Box, Grid, Card, Stack, TextField, Typography, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../../hooks/useAuth';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
// utils
import axios from 'utils/axios';
// @types
import { Store } from '../../../../@types/store';
import countries from '../countries';
import provinces from '../provinces';
import PhoneNumberField from 'components/PhoneNumberField';

// ----------------------------------------------------------------------

interface InitialState extends Omit<Store, 'id'> {
  afterSubmit?: string;
}

export default function AccountInformationEdit() {
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const { user, updateUser } = useAuth();
  const store: Store | null = user?.store;

  const UpdateUserSchema = Yup.object().shape({
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

  const formik = useFormik<InitialState>({
    enableReinitialize: true,
    initialValues: {
      name: store?.name || '',
      description: store?.description || '',
      address: store?.address || '',
      city: store?.city || '',
      phoneNumber: store?.phoneNumber || '',
      country: store?.country || countries[0].label,
      state: store?.state || provinces[0].province,
      zipCode: store?.zipCode || ''
    },

    validationSchema: UpdateUserSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        const response = await axios.patch(`users/store`, values);
        const updatedUser = response.data.payload;
        updateUser(updatedUser);
        enqueueSnackbar('Toko berhasil diedit!', { variant: 'success' });
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error: any) {
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.code });
          setSubmitting(false);
        }
      }
    }
  });

  const { errors, values, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } =
    formik;

  const [cities, setCities] = useState([
    {
      city_id: 9999999,
      province_id: 9999999,
      type: '',
      city_name: 'Silakan pilih provinsi terlebih dahulu'
    }
  ]);

  const fetchCityData = useCallback(async () => {
    const provinceId = values.state
      ? provinces.filter((province) => province.province === values.state)[0].province_id
      : null;
    if (provinceId) {
      const response = await axios.get('shipment/city', {
        params: {
          province: values.state
            ? provinces.filter((province) => province.province === values.state)[0].province_id
            : null
        }
      });
      if (response.data.payload) {
        setCities(response.data.payload);
      }
    }
  }, [values.state]);

  useEffect(() => {
    fetchCityData();
  }, [fetchCityData]);

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Stack spacing={{ xs: 2, md: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  Informasi Toko
                </Typography>
                {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

                <TextField
                  fullWidth
                  label="Nama Toko"
                  {...getFieldProps('name')}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />

                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Deskripsi"
                  {...getFieldProps('description')}
                  error={Boolean(touched.description && errors.description)}
                  helperText={touched.description && errors.description}
                />

                <PhoneNumberField
                  fullWidth
                  {...getFieldProps('phoneNumber')}
                  error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                  onChange={(value) => setFieldValue('phoneNumber', value)}
                />

                <TextField
                  fullWidth
                  label="Alamat"
                  {...getFieldProps('address')}
                  error={Boolean(touched.address && errors.address)}
                  helperText={touched.address && errors.address}
                />

                <Stack spacing={{ xs: 2, md: 3 }} direction={{ xs: 'column', md: 'row' }}>
                  <TextField
                    select
                    fullWidth
                    label="Provinsi"
                    placeholder="Provinsi"
                    {...getFieldProps('state')}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.state && errors.state)}
                    helperText={touched.state && errors.state}
                  >
                    <option defaultValue=""></option>
                    {provinces.map((option) => (
                      <option key={option.province_id} value={option.province}>
                        {option.province}
                      </option>
                    ))}
                  </TextField>
                  <TextField
                    select
                    fullWidth
                    label="Kota/Kabupaten"
                    placeholder="Kota/Kabupaten"
                    {...getFieldProps('city')}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.city && errors.city)}
                    helperText={touched.city && errors.city}
                  >
                    {cities.map((option) => (
                      <option key={option.city_id} value={`${option.type} ${option.city_name}`}>
                        {`${option.type} ${option.city_name}`}
                      </option>
                    ))}
                  </TextField>
                  <TextField
                    fullWidth
                    label="Kode Pos"
                    {...getFieldProps('zipCode')}
                    error={Boolean(touched.zipCode && errors.zipCode)}
                    helperText={touched.zipCode && errors.zipCode}
                  />
                </Stack>

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
        </Grid>
      </Form>
    </FormikProvider>
  );
}
