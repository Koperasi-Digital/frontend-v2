import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import {
  Card,
  Grid,
  Stack,
  Select,
  TextField,
  InputLabel,
  Typography,
  FormControl,
  FormHelperText
} from '@mui/material';
// utils
import fakeRequest from '../../../utils/fakeRequest';
import { UploadMultiFile } from '../../upload';

// ----------------------------------------------------------------------

const CATEGORY_OPTION = ['Saldo', 'Sharing'];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

export default function DisbursementApprovalForm() {
  const { enqueueSnackbar } = useSnackbar();

  const NewProductSchema = Yup.object().shape({
    disbursementRequestId: Yup.string().required(),
    images: Yup.array().min(1, 'Images is required')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      disbursementRequestId: '',
      category: CATEGORY_OPTION[0],
      images: []
    },
    validationSchema: NewProductSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        await fakeRequest(500);
        resetForm();
        setSubmitting(false);
        enqueueSnackbar('Create success', { variant: 'success' });
      } catch (error) {
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
      setFieldValue(
        'images',
        acceptedFiles.map((file: File | string) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    },
    [setFieldValue]
  );

  const handleRemoveAll = () => {
    setFieldValue('images', []);
  };

  const handleRemove = (file: File | string) => {
    const filteredItems = values.images.filter((_file) => _file !== file);
    setFieldValue('images', filteredItems);
  };

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Disbursement Request ID"
                  {...getFieldProps('disbursementRequestId')}
                  error={Boolean(touched.disbursementRequestId && errors.disbursementRequestId)}
                  helperText={touched.disbursementRequestId && errors.disbursementRequestId}
                />
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    label="Category"
                    native
                    {...getFieldProps('category')}
                    value={values.category}
                  >
                    {CATEGORY_OPTION.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <div>
                  <LabelStyle>Add Images</LabelStyle>
                  <UploadMultiFile
                    showPreview
                    maxSize={3145728}
                    accept="image/*"
                    files={values.images}
                    onDrop={handleDrop}
                    onRemove={handleRemove}
                    onRemoveAll={handleRemoveAll}
                    error={Boolean(touched.images && errors.images)}
                  />
                  {touched.images && errors.images && (
                    <FormHelperText error sx={{ px: 2 }}>
                      {touched.images && errors.images}
                    </FormHelperText>
                  )}
                </div>
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              loading={isSubmitting}
            >
              {'Create Product'}
            </LoadingButton>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
