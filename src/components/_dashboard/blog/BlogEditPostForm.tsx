import * as Yup from 'yup';
import { useCallback, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from '../../../redux/store';
import {
  Grid,
  Card,
  Chip,
  Stack,
  Button,
  TextField,
  Typography,
  Autocomplete,
  FormHelperText
} from '@mui/material';
// utils
// @types
import { NewPostFormValues, BlogState } from '../../../@types/blog';
//
import { QuillEditor } from '../../editor';
import { UploadSingleFile } from '../../upload';
import BlogNewPostPreview from './BlogNewPostPreview';
import { editBlog, getBlogById } from 'redux/slices/blog';

// ----------------------------------------------------------------------

const TAGS_OPTION = [
  'Chicken',
  'Ayam',
  'Peternakan Ayam',
  'Penyakit Ayam',
  'Kandang Ayam',
  'Peternak Ayam'
];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

// ----------------------------------------------------------------------

export default function BlogEditPostForm() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { id = '' } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const { post, refresh } = useSelector((state: { blog: BlogState }) => state.blog);

  useEffect(() => {
    if (parseInt(id) > 0) {
      dispatch(getBlogById(parseInt(id)));
    }
  }, [dispatch, id, refresh]);

  const handleOpenPreview = () => {
    setOpen(true);
  };

  const handleClosePreview = () => {
    setOpen(false);
  };

  const NewBlogSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    content: Yup.string().min(100).required('Content is required'),
    cover: Yup.mixed().required('Cover is required')
  });

  const formik = useFormik<NewPostFormValues>({
    enableReinitialize: true,
    initialValues: {
      title: post?.title || '',
      description: post?.description || '',
      content: post?.body || '',
      cover: post?.cover || null,
      tags: post?.tags ? post?.tags.split(';/;') : []
    },
    validationSchema: NewBlogSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await dispatch(
          editBlog(parseInt(id), values.title, values.description, values.content, values.tags)
        );
        resetForm();
        handleClosePreview();
        setSubmitting(false);
        enqueueSnackbar('Post success', { variant: 'success' });
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } =
    formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('cover', {
          ...file,
          preview: URL.createObjectURL(file)
        });
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
                    label="Judul Blog"
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
                    <LabelStyle>Konten Blog</LabelStyle>
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
                  <Autocomplete
                    multiple
                    freeSolo
                    value={values.tags}
                    onChange={(event, newValue) => {
                      setFieldValue('tags', newValue);
                    }}
                    options={TAGS_OPTION.map((option) => option)}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          {...getTagProps({ index })}
                          key={option}
                          size="small"
                          label={option}
                        />
                      ))
                    }
                    renderInput={(params) => <TextField {...params} label="Tags" />}
                  />
                </Stack>
                <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                  <Button
                    fullWidth
                    type="button"
                    color="inherit"
                    variant="outlined"
                    size="large"
                    onClick={handleOpenPreview}
                    sx={{ mr: 1.5 }}
                  >
                    Preview
                  </Button>
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

      <BlogNewPostPreview
        formik={formik}
        isOpenPreview={open}
        onClosePreview={handleClosePreview}
      />
    </>
  );
}
