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
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// @types
import { Product, ProductFormikRaw } from '../../../@types/products';
//
import { QuillEditor } from '../../editor';
// import addProduct from 'utils/products';

import { UploadSingleFile } from '../../upload';
import { addProduct, editProduct } from 'redux/slices/product';
import { dispatch } from 'redux/store';

import useAuth from 'hooks/useAuth';
import { handleUploadFile } from 'utils/bucket';
import { fTimestamp } from 'utils/formatTime';

// ----------------------------------------------------------------------

const CATEGORY_OPTION = ['Ayam', 'Infrastruktur', 'Pakan'];

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
  const { user } = useAuth();

  const NewProductSchema = Yup.object().shape({
    sku: Yup.string().required('SKU is required'),
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    images: Yup.array().min(1, 'Images is required'),
    price: Yup.number().required('Price is required'),
    productionCost: Yup.number().required('Production cost is required'),
    available: Yup.number().required('Quantity is required'),
    weight: Yup.number().required('Weight is required')
  });

  const product_id = currentProduct?.id || '';

  const formik = useFormik<ProductFormikRaw>({
    enableReinitialize: true,
    initialValues: {
      sku: currentProduct?.sku || '',
      name: currentProduct?.name || '',
      category: currentProduct?.category || CATEGORY_OPTION[0],
      price: currentProduct?.price || '',
      productionCost: currentProduct?.productionCost || '',
      available: currentProduct?.available || '',
      description: currentProduct?.description || '',
      status: Boolean(currentProduct?.status === 'Active') || true,
      store_id: currentProduct?.store?.id || user?.store?.id,
      weight: currentProduct?.weight || '',
      cover: currentProduct?.cover || null
    },
    validationSchema: NewProductSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        const uploadFileMessage = await handleUploadFile(
          values.cover,
          'products',
          values.cover.path + fTimestamp(new Date())
        );
        let status = values.status ? 'Active' : 'Inactive';
        if (isEdit) {
          let prevProductionCost = currentProduct ? currentProduct.productionCost : 0;
          let prevAvailable = currentProduct ? currentProduct.available : 0;
          dispatch(
            editProduct(
              {
                ...values,
                status: status,
                cover: uploadFileMessage
              },
              product_id,
              prevProductionCost,
              prevAvailable
            )
          );
        } else {
          dispatch(
            addProduct({
              ...values,
              status: status,
              cover: uploadFileMessage
            })
          );
        }
        resetForm();
        setSubmitting(false);
        enqueueSnackbar(!isEdit ? 'Create product success' : 'Update product success', {
          variant: 'success'
        });
        navigate(PATH_DASHBOARD.eCommerce.seller.list);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } =
    formik;

  console.log(values.status);
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
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Nama Produk"
                  {...getFieldProps('name')}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />

                <div>
                  <LabelStyle>Deskripsi</LabelStyle>
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
                  <LabelStyle>Gambar Produk</LabelStyle>
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
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <Card sx={{ p: 3 }}>
                <FormControlLabel
                  control={<Switch {...getFieldProps('status')} checked={values.status} />}
                  label="Aktif"
                  sx={{ mb: 2 }}
                />

                <Stack spacing={3}>
                  <TextField fullWidth label="SKU Produk" {...getFieldProps('sku')} />

                  <FormControl fullWidth>
                    <InputLabel>Kategori</InputLabel>
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
                </Stack>
              </Card>

              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    placeholder="0"
                    label="Berat"
                    {...getFieldProps('weight')}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                      type: 'number'
                    }}
                    error={Boolean(touched.weight && errors.weight)}
                    helperText={touched.weight && errors.weight}
                  />
                  <TextField
                    fullWidth
                    placeholder="0"
                    label="Jumlah"
                    {...getFieldProps('available')}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">pcs</InputAdornment>,
                      type: 'number'
                    }}
                    error={Boolean(touched.available && errors.available)}
                    helperText={touched.available && errors.available}
                  />
                  <TextField
                    fullWidth
                    placeholder="0"
                    label="Harga Jual"
                    {...getFieldProps('price')}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
                      type: 'number'
                    }}
                    error={Boolean(touched.price && errors.price)}
                    helperText={touched.price && errors.price}
                  />
                  <TextField
                    fullWidth
                    placeholder="0"
                    label="Harga Produksi (Modal)"
                    {...getFieldProps('productionCost')}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
                      type: 'number'
                    }}
                    error={Boolean(touched.productionCost && errors.productionCost)}
                    helperText={touched.productionCost && errors.productionCost}
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
