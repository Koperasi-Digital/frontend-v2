import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import {
  Card,
  Grid,
  Stack,
  Switch,
  Select,
  TextField,
  InputLabel,
  Typography,
  FormControl,
  InputAdornment,
  FormHelperText,
  FormControlLabel
} from '@mui/material';
// utils
import fakeRequest from '../../../utils/fakeRequest';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// @types
import { Product } from '../../../@types/products';
//
import { QuillEditor } from '../../editor';
import { UploadMultiFile } from '../../upload';
import addProduct from 'utils/products';

// ----------------------------------------------------------------------

const CATEGORY_OPTION = [
  { group: 'Infrastruktur', classify: ['Kandang', 'Handmade'] },
  { group: 'Bahan Mentah', classify: ['Telur', 'Daging'] }
];

const TYPE_OPTION = [
  { group: 'Infrastruktur', classify: ['Kandang', 'Handmade'] },
  { group: 'Bahan Mentah', classify: ['Telur', 'Daging'] }
];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

// ----------------------------------------------------------------------

type ProductNewFormProps = {
  isEdit: boolean;
  currentProduct?: Product;
};

export default function ProductNewForm({ isEdit, currentProduct }: ProductNewFormProps) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    images: Yup.array().min(1, 'Images is required'),
    price: Yup.number().required('Price is required')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: currentProduct?.name || '',
      description: currentProduct?.description || '',
      images: currentProduct?.images || [],
      id: currentProduct?.code || '',
      price: currentProduct?.price || '',
      active: Boolean(currentProduct?.inventoryType !== 'out_of_stock'),
      category: currentProduct?.category || CATEGORY_OPTION[0].classify[1],
      type: currentProduct?.category || CATEGORY_OPTION[0].classify[1]
    },
    validationSchema: NewProductSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        // await fakeRequest(500);
        await addProduct(values);
        resetForm();
        setSubmitting(false);
        enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
        // navigate(PATH_DASHBOARD.eCommerce.list);
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
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Product Name"
                  {...getFieldProps('name')}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />

                <div>
                  <LabelStyle>Description</LabelStyle>
                  <QuillEditor
                    simple
                    id="product-description"
                    value={values.description}
                    onChange={(val) => setFieldValue('description', val)}
                    error={Boolean(touched.description && errors.description)}
                  />
                  {touched.description && errors.description && (
                    <FormHelperText error sx={{ px: 2 }}>
                      {touched.description && errors.description}
                    </FormHelperText>
                  )}
                </div>

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

          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <Card sx={{ p: 3 }}>
                <FormControlLabel
                  control={<Switch {...getFieldProps('active')} checked={values.active} />}
                  label="In stock"
                  sx={{ mb: 2 }}
                />

                <Stack spacing={3}>
                  <TextField fullWidth label="Product ID" {...getFieldProps('id')} />

                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      label="Category"
                      native
                      {...getFieldProps('category')}
                      value={values.category}
                    >
                      {CATEGORY_OPTION.map((category) => (
                        <optgroup key={category.group} label={category.group}>
                          {category.classify.map((classify) => (
                            <option key={classify} value={classify}>
                              {classify}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select label="Type" native {...getFieldProps('type')} value={values.type}>
                      {TYPE_OPTION.map((type) => (
                        <optgroup key={type.group} label={type.group}>
                          {type.classify.map((classify) => (
                            <option key={classify} value={classify}>
                              {classify}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>
              </Card>

              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    placeholder="0"
                    label="Price"
                    {...getFieldProps('price')}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
                      type: 'number'
                    }}
                    error={Boolean(touched.price && errors.price)}
                    helperText={touched.price && errors.price}
                  />
                </Stack>
              </Card>

              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                loading={isSubmitting}
              >
                {!isEdit ? 'Create Product' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
