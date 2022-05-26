import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, TextField, Typography, FormHelperText } from '@mui/material';
// utils
import { UploadSingleFile } from '../../upload';

import {
  handleEditReimbursement,
  handleShowReimbursement
} from 'utils/financeAxios/financeReimbursement';
import { handleCreateCoopTransaction } from 'utils/financeAxios/financeCoopTransaction';
import { handleEditSaldo } from 'utils/financeAxios/financeSaldo';
import { handleEditSimpananSukarela } from 'utils/financeAxios/financeSimpanan';

import { handleUploadFile } from 'utils/bucket';

import { handlePencairanDana } from 'utils/financeAxios/financeReport';

// ----------------------------------------------------------------------

type DisbursementApprovalValues = {
  disbursementRequestId: string;
  receipt: File | any;
};

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

export default function DisbursementApprovalForm() {
  const { enqueueSnackbar } = useSnackbar();

  const NewProductSchema = Yup.object().shape({
    disbursementRequestId: Yup.string().required('Id pencairan dana wajib diisi'),
    receipt: Yup.mixed().required('Kuitansi wajib diisi')
  });

  const formik = useFormik<DisbursementApprovalValues>({
    initialValues: {
      disbursementRequestId: '',
      receipt: null
    },
    validationSchema: NewProductSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        const reimbursement = await handleShowReimbursement(values.disbursementRequestId);
        const uploadFileMessage = await handleUploadFile(
          values.receipt,
          'disbursement',
          values.disbursementRequestId
        );
        const editedReimbursement = await handleEditReimbursement(
          values.disbursementRequestId,
          'success',
          uploadFileMessage
        );
        let editedSaldo;
        let editedSimpananSukarela;
        if (reimbursement.type === 'saldo') {
          editedSaldo = await handleEditSaldo(reimbursement.user.id, reimbursement.total_cost, 0);
        } else {
          editedSimpananSukarela = await handleEditSimpananSukarela(
            reimbursement.user.id,
            reimbursement.total_cost,
            0
          );
        }

        const createdCoopTransaction = await handleCreateCoopTransaction({
          destUserId: reimbursement.user.id,
          type: `reimbursement ${reimbursement.type}`,
          total_cost: reimbursement.total_cost,
          paymentType: 'transfer admin',
          status: 'success'
        });

        const currentPeriode = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-1`;

        const financeReportInput = await handlePencairanDana(
          reimbursement.user.id,
          currentPeriode,
          reimbursement.total_cost,
          reimbursement.type
        );

        resetForm();
        setSubmitting(false);
        if (
          editedReimbursement &&
          (editedSaldo || editedSimpananSukarela) &&
          createdCoopTransaction &&
          uploadFileMessage &&
          financeReportInput
        ) {
          enqueueSnackbar('Persetujuan pencairan dana berhasil dibuat', { variant: 'success' });
        } else {
          enqueueSnackbar('Persetujuan pencairan dana gagal dibuat', { variant: 'error' });
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
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('receipt', Object.assign(file, { preview: URL.createObjectURL(file) }));
      }
    },
    [setFieldValue]
  );

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="ID pengajuan pencairan dana"
                  {...getFieldProps('disbursementRequestId')}
                  error={Boolean(touched.disbursementRequestId && errors.disbursementRequestId)}
                  helperText={touched.disbursementRequestId && errors.disbursementRequestId}
                />
                <div>
                  <LabelStyle>Unggah kuitansi</LabelStyle>
                  <UploadSingleFile
                    maxSize={3145728}
                    accept="image/*"
                    file={values.receipt}
                    onDrop={handleDrop}
                    error={Boolean(touched.receipt && errors.receipt)}
                  />
                  {touched.receipt && errors.receipt && (
                    <FormHelperText error sx={{ px: 2 }}>
                      {touched.receipt && errors.receipt}
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
              Buat persetujuan pencairan dana
            </LoadingButton>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
