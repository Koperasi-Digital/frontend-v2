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
  DialogActions
} from '@mui/material';
import { LoadingButton, MobileDateTimePicker } from '@mui/lab';
import { UserManager } from '../../../../@types/user';
import { isAfter, isBefore } from 'date-fns';
import axios from 'utils/axios';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';

// ----------------------------------------------------------------------

type UserActivityLogFormProps = {
  initialData: any;
  user: UserManager;
  open: boolean;
  onClose: VoidFunction;
};

export default function UserActivityLogForm({
  initialData,
  open,
  onClose,
  user
}: UserActivityLogFormProps) {
  const isEdit = !isEmpty(initialData);
  const UserActivityLogSchema = Yup.object().shape({
    name: Yup.string().required('Nama kegiatan harus diisi'),
    type: Yup.string().required('Tipe kegiatan harus diisi')
  });

  const formik = useFormik({
    initialValues: {
      email: user.email,
      name: '',
      type: 'koperasi',
      startAt: new Date(),
      endAt: new Date(),
      attendingAt: new Date()
    },
    validationSchema: UserActivityLogSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setSubmitting(true);
        if (isEdit) {
          await axios.patch(`activity-logs/${initialData.id}`, values);
        } else {
          await axios.post('activity-logs/manual', values);
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

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    setFieldValue,
    resetForm
  } = formik;

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  useEffect(() => {
    setFieldValue('name', initialData?.name || '');
    setFieldValue('startAt', initialData?.startAt ? new Date(initialData?.startAt) : new Date());
    setFieldValue('endAt', initialData?.endAt ? new Date(initialData?.endAt) : new Date());
    setFieldValue(
      'attendingAt',
      initialData?.attendingAt ? new Date(initialData?.attendingAt) : isEdit ? '' : new Date()
    );
  }, [initialData, setFieldValue, isEdit]);

  const isDateError = isBefore(new Date(values.endAt), new Date(values.startAt));
  const isAttendingDateError =
    isBefore(new Date(values.attendingAt), new Date(values.startAt)) ||
    isAfter(new Date(values.attendingAt), new Date(values.endAt));

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle>{isEdit ? `Edit Keaktifan Anggota` : `Tambah Keaktifan Anggota`}</DialogTitle>
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
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nama Kegiatan"
                  {...getFieldProps('name')}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                  disabled={isEdit}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <MobileDateTimePicker
                  label="Waktu Mulai"
                  value={values.startAt}
                  inputFormat="dd/MM/yyyy hh:mm a"
                  onChange={(date) => setFieldValue('startAt', date)}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                  disabled={isEdit}
                />
              </Grid>
              <Grid item xs={12} md={6}>
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
                  disabled={isEdit}
                />
              </Grid>
              <Grid item xs={12}>
                <MobileDateTimePicker
                  label="Waktu Kehadiran"
                  value={values.attendingAt}
                  inputFormat="dd/MM/yyyy hh:mm a"
                  onChange={(date) => setFieldValue('attendingAt', date)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={Boolean(isAttendingDateError)}
                      helperText={
                        isAttendingDateError &&
                        'Waktu kehadiran harus berada diantara waktu mulai dan waktu selesai'
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
            <Button type="button" color="inherit" variant="outlined" onClick={handleCancel}>
              Batal
            </Button>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              {isEdit ? `Simpan` : `Tambah`}
            </LoadingButton>
          </DialogActions>
        </Form>
      </FormikProvider>
    </Dialog>
  );
}
