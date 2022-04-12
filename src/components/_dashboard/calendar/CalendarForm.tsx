import { useState } from 'react';
import * as Yup from 'yup';
import { isEmpty, merge, startCase } from 'lodash';
import { isBefore, format } from 'date-fns';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
import edit2Fill from '@iconify/icons-eva/edit-2-fill';
import { useFormik, Form, FormikProvider } from 'formik';
import {
  Box,
  Button,
  Select,
  Switch,
  Tooltip,
  TextField,
  IconButton,
  InputLabel,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  FormControlLabel,
  Autocomplete,
  Stack,
  Typography,
  Grid,
  Link
} from '@mui/material';
import { LoadingButton, MobileDateTimePicker } from '@mui/lab';
import { EventInput } from '@fullcalendar/common';
// hooks
import useAuth from 'hooks/useAuth';
// types
import { User } from '../../../@types/account';
// redux
import { useDispatch } from '../../../redux/store';
import {
  createEvent,
  updateEvent,
  deleteEvent,
  deleteUserFromEvent
} from '../../../redux/slices/calendar';
// utils
import { EVENT_COLOR } from 'utils/calendar';
import axios from 'utils/axios';

// ----------------------------------------------------------------------

const EVENT_TYPE_OPTIONS: string[] = ['koperasi', 'peternakan'];

const getInitialValues = (event: EventInput, range: { start: Date; end: Date } | null) => {
  // eslint-disable-next-line no-underscore-dangle
  const _event = {
    title: '',
    description: '',
    type: 'koperasi',
    textColor: EVENT_COLOR.koperasi,
    allDay: false,
    includeNotification: true,
    start: range ? new Date(range.start) : new Date(),
    end: range ? new Date(range.end) : new Date(),
    invitedUsersEmail: event && event.users ? event.users.map((user: User) => user.email) : [],
    meetingLink: ''
  };

  if (event || range) {
    return merge({}, _event, event);
  }

  return _event;
};

// ----------------------------------------------------------------------

type CalendarFormProps = {
  event: EventInput;
  range: {
    start: Date;
    end: Date;
  } | null;
  onCancel: VoidFunction;
};

const Field = ({
  name,
  value,
  field,
  isReadOnly
}: {
  name: string;
  value: string | JSX.Element;
  field?: JSX.Element;
  isReadOnly: boolean;
}) =>
  isReadOnly ? (
    <Grid container xs={12} sx={{ mb: 2 }}>
      <Grid item xs={12} sm={4} component={Typography} variant="body1" sx={{ fontWeight: 'bold' }}>
        {name}
      </Grid>
      <Grid item xs={12} sm={8} component={Typography} variant="body1">
        {value}
      </Grid>
    </Grid>
  ) : (
    <>{field}</>
  );

export default function CalendarForm({ event, range, onCancel }: CalendarFormProps) {
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const isCreating = !event || isEmpty(event);
  const isOrganizer = isCreating || user?.id === event.createdBy.id;
  const [isReadOnly, setIsReadOnly] = useState(!isCreating);

  const EventSchema = Yup.object().shape({
    title: Yup.string().max(255).required('Nama aktivitas harus diisi'),
    description: Yup.string().max(5000, 'Deskripsi terlalu panjang'),
    meetingLink: Yup.string().url('URL tidak valid').nullable()
  });

  const formik = useFormik({
    initialValues: getInitialValues(event, range),
    validationSchema: EventSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const newEvent = {
          name: values.title,
          description: values.description,
          type: values.type,
          allDay: values.allDay,
          includeNotification: values.includeNotification,
          startAt: values.start,
          endAt: values.end,
          invitedUsersEmail: values.invitedUsersEmail,
          meetingLink: values.meetingLink
        };
        if (event.id) {
          dispatch(updateEvent(event.id, newEvent));
          enqueueSnackbar('Sukses edit aktivitas', { variant: 'success' });
        } else {
          dispatch(createEvent(newEvent));
          enqueueSnackbar('Sukses menambahkan aktivitas', { variant: 'success' });
        }
        resetForm();
        onCancel();
        setSubmitting(false);
      } catch (error) {
        console.error(error);
      }
    }
  });

  const { values, errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } =
    formik;

  const handleDelete = async () => {
    if (!event.id) return;
    try {
      onCancel();
      dispatch(isOrganizer ? deleteEvent(event.id) : deleteUserFromEvent(event.id));
      enqueueSnackbar('Delete activity success', { variant: 'success' });
    } catch (error) {
      console.error(error);
    }
  };

  const isDateError = isBefore(new Date(values.end), new Date(values.start));

  const renderTitle = () => {
    if (event && !isEmpty(event)) {
      return isReadOnly ? 'Detail Aktivitas' : 'Edit Aktivitas';
    }
    return 'Tambah Aktivitas';
  };

  const handleClickCancelButton = () => {
    if (!isCreating && !isReadOnly) {
      setIsReadOnly(true);
    } else {
      onCancel();
    }
  };

  const recordMeetingPresence = (activityId: string) => {
    axios.post('activity-logs', { activityId, type: 'presensi_meeting' });
  };

  return (
    <FormikProvider value={formik}>
      <DialogTitle>{renderTitle()}</DialogTitle>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <DialogContent sx={{ pb: 0, overflowY: 'unset' }}>
          <Field
            name="Nama"
            value={values.title}
            isReadOnly={isReadOnly}
            field={
              <TextField
                fullWidth
                label="Nama"
                {...getFieldProps('title')}
                error={Boolean(touched.title && errors.title)}
                helperText={touched.title && errors.title}
                sx={{ mb: 3 }}
              />
            }
          />

          <Field
            name="Deskripsi"
            value={values.description || '-'}
            isReadOnly={isReadOnly}
            field={
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Deskripsi"
                {...getFieldProps('description')}
                error={Boolean(touched.description && errors.description)}
                helperText={touched.description && errors.description}
                sx={{ mb: 3 }}
                disabled={isReadOnly}
              />
            }
          />

          <Field
            name="Tipe"
            value={startCase(values.type)}
            isReadOnly={isReadOnly}
            field={
              <FormControl fullWidth disabled={isReadOnly}>
                <InputLabel>Tipe</InputLabel>
                <Select
                  label="Tipe"
                  native
                  {...getFieldProps('type')}
                  value={values.type}
                  sx={{ mb: 3 }}
                >
                  {EVENT_TYPE_OPTIONS.map((eventType) => (
                    <option key={eventType} value={eventType}>
                      {startCase(eventType)}
                    </option>
                  ))}
                </Select>
              </FormControl>
            }
          />

          <Field
            name="Berlangsung seharian"
            value={values.allDay ? 'Yes' : 'No'}
            isReadOnly={isReadOnly}
            field={
              <FormControlLabel
                control={<Switch checked={values.allDay} {...getFieldProps('allDay')} />}
                label="Berlangsung seharian"
                sx={{ mb: 3 }}
                disabled={isReadOnly}
              />
            }
          />

          {!values.allDay && (
            <Field
              name="Waktu"
              value={`${format(new Date(values.start), 'dd/MM/yyyy hh:mm a')} - ${format(
                new Date(values.end),
                'dd/MM/yyyy hh:mm a'
              )}`}
              isReadOnly={isReadOnly}
              field={
                <Stack direction="row" spacing={1}>
                  <MobileDateTimePicker
                    label="Waktu Mulai"
                    value={values.start}
                    inputFormat="dd/MM/yyyy hh:mm a"
                    onChange={(date) => setFieldValue('start', date)}
                    renderInput={(params) => <TextField {...params} sx={{ mb: 3 }} />}
                    disabled={isReadOnly}
                  />

                  <MobileDateTimePicker
                    label="Waktu Selesai"
                    value={values.end}
                    inputFormat="dd/MM/yyyy hh:mm a"
                    onChange={(date) => setFieldValue('end', date)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={Boolean(isDateError)}
                        helperText={isDateError && 'Waktu selesai harus berada setelah waktu mulai'}
                        sx={{ mb: 3 }}
                      />
                    )}
                    disabled={isReadOnly}
                  />
                </Stack>
              }
            />
          )}

          {event && event.createdBy && (
            <Field
              name="Penyelenggara"
              value={`${event.createdBy.displayName} (${event.createdBy.email})`}
              isReadOnly={isReadOnly}
            />
          )}

          <Field
            name="Tautan Meeting"
            value={
              values.meetingLink ? (
                <Link
                  href={values.meetingLink}
                  target="_blank"
                  onClick={() => (event?.id ? recordMeetingPresence(event.id) : {})}
                >
                  {values.meetingLink}
                </Link>
              ) : (
                '-'
              )
            }
            isReadOnly={isReadOnly}
            field={
              <TextField
                fullWidth
                label="Tautan Meeting"
                {...getFieldProps('meetingLink')}
                error={Boolean(touched.meetingLink && errors.meetingLink)}
                helperText={touched.meetingLink && errors.meetingLink}
                sx={{ mb: 3 }}
              />
            }
          />

          <Field
            name="Hadirin"
            value={values.invitedUsersEmail.join(',\n') || '-'}
            isReadOnly={isReadOnly}
            field={
              <Autocomplete
                multiple
                options={[]}
                filterSelectedOptions
                freeSolo
                onChange={(_, value) => setFieldValue('invitedUsersEmail', value)}
                value={values.invitedUsersEmail}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="Hadirin"
                    error={Boolean(touched.invitedUsersEmail && errors.invitedUsersEmail)}
                    helperText={touched.invitedUsersEmail && errors.invitedUsersEmail}
                    sx={{ mb: 3, mt: isReadOnly ? 1 : 'auto' }}
                  />
                )}
              />
            }
          />
        </DialogContent>

        <DialogActions>
          {!isCreating && isReadOnly && (
            <>
              <Tooltip title={isOrganizer ? 'Hapus Aktivitas' : 'Hapus Invitasi'}>
                <IconButton onClick={handleDelete}>
                  <Icon icon={trash2Fill} width={20} height={20} />
                </IconButton>
              </Tooltip>
              {isOrganizer && (
                <Tooltip title="Edit Aktivitas">
                  <IconButton onClick={() => setIsReadOnly(false)}>
                    <Icon icon={edit2Fill} width={20} height={20} />
                  </IconButton>
                </Tooltip>
              )}
            </>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <Button
            type="button"
            variant="outlined"
            color="inherit"
            onClick={handleClickCancelButton}
          >
            {isReadOnly ? 'Tutup' : 'Batal'}
          </Button>
          {!isReadOnly && (
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
              loadingIndicator="Loading..."
              disabled={isReadOnly}
            >
              {isCreating ? 'Tambah' : 'Edit'}
            </LoadingButton>
          )}
        </DialogActions>
      </Form>
    </FormikProvider>
  );
}
