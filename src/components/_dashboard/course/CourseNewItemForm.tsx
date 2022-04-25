import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
import { useParams } from 'react-router-dom';
// material
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { useDispatch } from '../../../redux/store';
import { Grid, Card, Stack, TextField, Typography, FormHelperText } from '@mui/material';
// utils
// @types
import { NewPostItemFormValues } from '../../../@types/course';
//
import { QuillEditor } from '../../editor';
import useAuth from 'hooks/useAuth';
import { createCourseItem } from 'redux/slices/course';

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

// ----------------------------------------------------------------------

export default function CourseNewItemForm() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { id = '' } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const NewCourseSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    content: Yup.string().min(100).required('Content is required')
  });

  const formik = useFormik<NewPostItemFormValues>({
    initialValues: {
      title: '',
      description: '',
      content: ''
    },
    validationSchema: NewCourseSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await dispatch(
          createCourseItem(user?.id, values.title, values.description, values.content, parseInt(id))
        );
        resetForm();
        setSubmitting(false);
        enqueueSnackbar('Create Course Item success', { variant: 'success' });
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        enqueueSnackbar('Create Course Item failed', { variant: 'error' });
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } =
    formik;

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
                    <LabelStyle>Konten Course</LabelStyle>
                    <QuillEditor
                      id="post-content"
                      value={values.content}
                      onChange={(val) => setFieldValue('content', val)}
                      error={Boolean(touched.content && errors.content)}
                    />
                    {touched.content && errors.content && (
                      <FormHelperText error sx={{ px: 2, textTransform: 'capitalize' }}>
                        {touched.content && errors.content}
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
