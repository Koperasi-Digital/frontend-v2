import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { isEmpty } from 'lodash';
// material
import {
  Grid,
  Dialog,
  Button,
  Divider,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// types
import { UserAddressBook } from '../../../../@types/user';
//
import countries from '../countries';
import { addAddress, editAddress } from 'redux/slices/user';
import provinces from '../provinces';
import cities from '../cities';

// ----------------------------------------------------------------------

type AccountAddressFormProps = {
  existingAddress?: UserAddressBook;
  open: boolean;
  onClose: VoidFunction;
};

export default function AccountAddressForm({
  existingAddress,
  open,
  onClose
}: AccountAddressFormProps) {
  const isEdit = !isEmpty(existingAddress);
  const AccountAddressSchema = Yup.object().shape({
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

  const formik = useFormik({
    initialValues: {
      phoneNumber: existingAddress?.phoneNumber || '',
      country: existingAddress?.country || 'Indonesia',
      state: existingAddress?.state || '',
      city: existingAddress?.city || '',
      address: existingAddress?.address || '',
      zipCode: existingAddress?.zipCode || ''
    },
    enableReinitialize: true,
    validationSchema: AccountAddressSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setSubmitting(true);
        if (isEdit) {
          await editAddress(existingAddress!.id, values);
        } else {
          await addAddress(values);
        }
        onClose();
        resetForm();
        setSubmitting(false);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle>{`${isEdit ? 'Edit' : 'Tambah'} Alamat`}</DialogTitle>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={3} direction="column">
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
                      select
                      fullWidth
                      label="Kota"
                      placeholder="Kota"
                      {...getFieldProps('city')}
                      SelectProps={{ native: true }}
                      error={Boolean(touched.city && errors.city)}
                      helperText={touched.city && errors.city}
                    >
                      {cities.map((option) => (
                        <option key={option.city_id} value={option.city_name}>
                          {option.city_name}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={4}>
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
                      {provinces.map((option) => (
                        <option key={option.province_id} value={option.province}>
                          {option.province}
                        </option>
                      ))}
                    </TextField>
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
            </Grid>
          </DialogContent>

          <Divider />

          <DialogActions>
            <Button type="button" color="inherit" variant="outlined" onClick={onClose}>
              Batal
            </Button>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Kirim
            </LoadingButton>
          </DialogActions>
        </Form>
      </FormikProvider>
    </Dialog>
  );
}
