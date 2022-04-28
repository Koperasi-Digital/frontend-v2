import * as Yup from 'yup';
import { useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { useDispatch } from '../../../redux/store';
import { Grid, Card, Stack, TextField, Typography, FormHelperText } from '@mui/material';
// utils
// @types
import { NewPostFormValues } from '../../../@types/course';
//
import { UploadSingleFile } from '../../upload';
import { editCourse } from 'redux/slices/course';
import { handleUploadFile } from 'utils/bucket';
import { fTimestamp } from 'utils/formatTime';
import { CourseDetailState } from '../../../@types/course';

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

// ----------------------------------------------------------------------

type CourseEditPostProps = {
  post: CourseDetailState;
  id: string;
};

export default function CourseEditPostForm({ post, id }: CourseEditPostProps) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const NewCourseSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    cover: Yup.mixed().required('Cover is required')
  });

  const formik = useFormik<NewPostFormValues>({
    initialValues: {
      title: post.title || '',
      description: post.description || '',
      cover: post.cover || null
    },
    validationSchema: NewCourseSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const uploadFileMessage = await handleUploadFile(
          values.cover,
          'course',
          values.cover.path + fTimestamp(new Date())
        );
        await dispatch(
          editCourse(parseInt(id), values.title, values.description, uploadFileMessage)
        );
        setSubmitting(false);
        enqueueSnackbar('Edit Course success', { variant: 'success' });
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        enqueueSnackbar('Edit Course failed', { variant: 'error' });
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } =
    formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('cover', Object.assign(file, { preview: URL.createObjectURL(file) }));
      }
    },
    [setFieldValue]
  );

  return (
    <>
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Judul Course"
                    {...getFieldProps('title')}
                    error={Boolean(touched.title && errors.title)}
                    helperText={touched.title && errors.title}
                  />

                  <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={5}
                    label="Deskripsi"
                    {...getFieldProps('description')}
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                  />

                  <div>
                    <LabelStyle>Cover</LabelStyle>
                    <UploadSingleFile
                      maxSize={3145728}
                      accept="image/*"
                      file={values.cover}
                      onDrop={handleDrop}
                      error={Boolean(touched.cover && errors.cover)}
                    />
                    {touched.cover && errors.cover && (
                      <FormHelperText error sx={{ px: 2 }}>
                        {touched.cover && errors.cover}
                      </FormHelperText>
                    )}
                  </div>
                </Stack>
                <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                  <LoadingButton
                    fullWidth
                    type="submit"
                    variant="contained"
                    size="large"
                    loading={isSubmitting}
                  >
                    Post
                  </LoadingButton>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </>
  );
}
