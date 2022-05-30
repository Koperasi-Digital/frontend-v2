import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import {
  Grid,
  Dialog,
  Button,
  Divider,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import { LoadingButton, MobileDateTimePicker } from '@mui/lab';
import { UserManager } from '../../../../@types/user';
import { startCase } from 'lodash';
import { isAfter, isBefore } from 'date-fns';

// ----------------------------------------------------------------------

type UserActivityLogFormProps = {
  user: UserManager;
  open: boolean;
  onClose: VoidFunction;
};

const EVENT_TYPE_OPTIONS: string[] = ['koperasi', 'peternakan'];

export default function UserActivityLogForm({ open, onClose, user }: UserActivityLogFormProps) {
  const UserActivityLogSchema = Yup.object().shape({
    name: Yup.string().required('Nama kegiatan harus diisi'),
    type: Yup.string().required('Tipe kegiatan harus diisi')
  });

  const formik = useFormik({
    initialValues: {
      email: user.email,
      name: '',
      type: '',
      startAt: '',
      endAt: '',
      attendingAt: ''
    },
    enableReinitialize: true,
    validationSchema: UserActivityLogSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setSubmitting(true);
        // await addAddress(values);
        onClose();
        resetForm();
        setSubmitting(false);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
  });

  const { values, errors, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } =
    formik;

  const isDateError = isBefore(new Date(values.endAt), new Date(values.startAt));
  const isAttendingDateError =
    isBefore(new Date(values.attendingAt), new Date(values.startAt)) ||
    isAfter(new Date(values.attendingAt), new Date(values.endAt));

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle>{`Tambah Keaktifan Anggota`}</DialogTitle>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  {...getFieldProps('email')}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                  disabled={true}
                />
              </Grid>
              <Grid item xs={6} md={6}>
                <TextField
                  fullWidth
                  label="Nama Kegiatan"
                  {...getFieldProps('name')}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Tipe Kegiatan</InputLabel>
                  <Select label="Tipe" native {...getFieldProps('type')} value={values.type}>
                    {EVENT_TYPE_OPTIONS.map((eventType) => (
                      <option key={eventType} value={eventType}>
                        {startCase(eventType)}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <MobileDateTimePicker
                  label="Waktu Mulai"
                  value={values.startAt}
                  inputFormat="dd/MM/yyyy hh:mm a"
                  onChange={(date) => setFieldValue('startAt', date)}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <MobileDateTimePicker
                  label="Waktu Selesai"
                  value={values.endAt}
                  inputFormat="dd/MM/yyyy hh:mm a"
                  onChange={(date) => setFieldValue('endAt', date)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={Boolean(isDateError)}
                      helperText={isDateError && 'Waktu selesai harus berada setelah waktu mulai'}
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <MobileDateTimePicker
                  label="Waktu Presensi"
                  value={values.attendingAt}
                  inputFormat="dd/MM/yyyy hh:mm a"
                  onChange={(date) => setFieldValue('attendingAt', date)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={Boolean(isAttendingDateError)}
                      helperText={
                        isAttendingDateError &&
                        'Waktu presensi harus berada diantara waktu mulai dan waktu selesai'
                      }
                      fullWidth
                    />
                  )}
                />
              </Grid>
            </Grid>
          </DialogContent>

          <Divider />

          <DialogActions>
            <Button type="button" color="inherit" variant="outlined" onClick={onClose}>
              Batal
            </Button>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Tambah
            </LoadingButton>
          </DialogActions>
        </Form>
      </FormikProvider>
    </Dialog>
  );
}
