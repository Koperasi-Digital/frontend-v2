import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, TextField, Typography, FormHelperText } from '@mui/material';
// utils
import { UploadMultiFile } from '../../upload';

import { handleEditReimbursement, handleShowOneReimbursement } from 'utils/financeReimbursement';
import { handleCreateCoopTransaction } from 'utils/financeCoopTransaction';
import { handleEditSaldo } from 'utils/financeSaldo';

// ----------------------------------------------------------------------

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
      images: []
    },
    validationSchema: NewProductSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        const reimbursement = await handleShowOneReimbursement(values.disbursementRequestId);
        const editedReimbursement = await handleEditReimbursement(
          values.disbursementRequestId,
          'success',
          undefined
        );
        const editedSaldo = await handleEditSaldo(
          reimbursement.userId,
          reimbursement.total_cost,
          0
        );
        const createdCoopTransaction = await handleCreateCoopTransaction({
          sisaHasilUsahaId: undefined,
          reimbursementId: reimbursement.id,
          paymentType: 'Transfer Bank BCA',
          status: 'success'
        });
        resetForm();
        setSubmitting(false);
        if (editedReimbursement && editedSaldo && createdCoopTransaction) {
          enqueueSnackbar('Create success', { variant: 'success' });
        } else {
          enqueueSnackbar('Create fail', { variant: 'error' });
        }
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
              Create Disbursement Approval
            </LoadingButton>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
