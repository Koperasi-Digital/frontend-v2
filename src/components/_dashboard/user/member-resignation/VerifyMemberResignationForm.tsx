import { useEffect, useState, useCallback } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import {
  Stack,
  Alert,
  Typography,
  Checkbox,
  FormControlLabel,
  FormHelperText
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
// hooks
import useIsMountedRef from 'hooks/useIsMountedRef';
import axios from 'utils/axios';

//utils
import { fHTML as fHTMLMemberResignation } from 'utils/financeFormatting/financeMemberResignation';
import { fHTML as fHTMLBankAccount } from 'utils/financeFormatting/financeBankAccount';
import { UploadSingleFile } from 'components/upload';

// ----------------------------------------------------------------------

interface InitialValues {
  isDone: boolean;
  afterSubmit?: string;
  receipt: File | null;
}

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

export default function VerifyMemberResignationForm(props: { memberId: number }) {
  const isMountedRef = useIsMountedRef();
  const [memberResignation, setMemberResignation] = useState<any>();

  const getMemberResignation = useCallback(async () => {
    try {
      const response = await axios.get(`member-resignation/${props.memberId}`);
      if (isMountedRef.current) {
        setMemberResignation(response.data.payload);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef, props.memberId]);

  useEffect(() => {
    getMemberResignation();
  }, [getMemberResignation]);

  const formik = useFormik<InitialValues>({
    enableReinitialize: true,
    initialValues: {
      isDone: false,
      receipt: null
    },
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        // await axios.post(`member-resignation/create`, {
        //   ...values,
        //   financeDisbursementDesc: financeDisbursementDesc
        // });
        // if (isMountedRef.current) {
        //   setSubmitting(false);
        // }
        // window.location.reload();
        console.log('VerifyMemberResignationForm submitted');
      } catch (error: any) {
        console.error(error);
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.message });
          setSubmitting(false);
        }
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, values, getFieldProps, setFieldValue } =
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
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

          <Typography variant="inherit">
            Berikut adalah daftar pengembalian dana:
            {memberResignation &&
              fHTMLMemberResignation(memberResignation.financeDisbursementDescription)}
          </Typography>

          <Typography variant="inherit">
            Lakukan transfer ke akun bank berikut:
            {memberResignation &&
              memberResignation.bankAccount &&
              fHTMLBankAccount(memberResignation.bankAccount)}
          </Typography>

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

          <FormControlLabel
            control={<Checkbox checked={values.isDone} {...getFieldProps('isDone')} />}
            label={
              <>
                <Typography variant="body2">
                  Saya telah melakukan pencairan dana kepada akun bank anggota yang tertera sejumlah
                  total yang tertera
                </Typography>
              </>
            }
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            disabled={!values.isDone || memberResignation === undefined}
          >
            Kirim
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
