import { useCallback } from 'react';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
import closeFill from '@iconify/icons-eva/close-fill';
import { isEmpty } from 'lodash';
// material
import { Stack, Alert, FormControl, styled, Typography, FormHelperText } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import { fTimestamp } from 'utils/formatTime';
import useIsMountedRef from 'hooks/useIsMountedRef';
import useAuth from 'hooks/useAuth';
// utils
import { handleUploadFile } from 'utils/bucket';
//
import { MIconButton } from '../../../@material-extend';
import { UploadSingleFile } from 'components/upload';
import axios from 'utils/axios';

// ----------------------------------------------------------------------

interface InitialValues {
  identityCardPhotoURL: File | string | null;
  selfiePhotoURL: File | string | null;
  afterSubmit?: string;
}

interface RequestMemberVerificationFormProps {
  initialData?: {
    identityCardPhotoURL: File | string | null;
    selfiePhotoURL: File | string | null;
  };
}

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

export default function RequestMemberVerificationForm({
  initialData
}: RequestMemberVerificationFormProps) {
  const isMountedRef = useIsMountedRef();
  const { user } = useAuth();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const isCreate =
    isEmpty(initialData?.identityCardPhotoURL) && isEmpty(initialData?.selfiePhotoURL);

  const formik = useFormik<InitialValues>({
    enableReinitialize: true,
    initialValues: {
      identityCardPhotoURL: initialData?.identityCardPhotoURL || null,
      selfiePhotoURL: initialData?.selfiePhotoURL || null
    },
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      const fileUrlPromises: Promise<string>[] = [];
      fileUrlPromises.push(
        handleUploadFile(
          values.identityCardPhotoURL as File,
          `user/${user?.id}/verification`,
          `${fTimestamp(new Date())}-KTP-${(values.identityCardPhotoURL as File).name}`
        )
      );
      fileUrlPromises.push(
        handleUploadFile(
          values.selfiePhotoURL as File,
          `user/${user?.id}/verification`,
          `${fTimestamp(new Date())}-Selfie-${(values.selfiePhotoURL as File).name}`
        )
      );
      const [identityCardPhotoUrl, selfiePhotoUrl] = await Promise.all(fileUrlPromises);
      values.identityCardPhotoURL = identityCardPhotoUrl || values.identityCardPhotoURL;
      values.selfiePhotoURL = selfiePhotoUrl || values.selfiePhotoURL;
      try {
        if (isCreate) {
          await axios.post(`member-verification/create`, values);
        } else {
          await axios.patch(`member-verification/${user?.id}`, values);
        }
        enqueueSnackbar('Request keanggotaan koperasi sukses!', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
        if (isMountedRef.current) {
          setSubmitting(false);
        }
        window.location.reload();
      } catch (error: any) {
        console.error(error);
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.message });
          setSubmitting(false);
        }
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, values, setFieldValue } = formik;

  const handleDrop = useCallback(
    (fieldName: string) => (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue(
          fieldName,
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        );
      }
    },
    [setFieldValue]
  );

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

          <FormControl>
            <LabelStyle>Upload Foto KTP</LabelStyle>
            <UploadSingleFile
              maxSize={10485760} // 10MB
              accept="image/*"
              file={values.identityCardPhotoURL}
              onDrop={handleDrop('identityCardPhotoURL')}
              error={Boolean(touched.identityCardPhotoURL && errors.identityCardPhotoURL)}
            />
            {touched.identityCardPhotoURL && errors.identityCardPhotoURL && (
              <FormHelperText error sx={{ px: 2 }}>
                {touched.identityCardPhotoURL && errors.identityCardPhotoURL}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl>
            <LabelStyle>Upload Foto Selfie dengan KTP</LabelStyle>
            <UploadSingleFile
              maxSize={10485760} // 10MB
              accept="image/*"
              file={values.selfiePhotoURL}
              onDrop={handleDrop('selfiePhotoURL')}
              error={Boolean(touched.selfiePhotoURL && errors.selfiePhotoURL)}
            />
            {touched.selfiePhotoURL && errors.selfiePhotoURL && (
              <FormHelperText error sx={{ px: 2 }}>
                {touched.selfiePhotoURL && errors.selfiePhotoURL}
              </FormHelperText>
            )}
          </FormControl>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Kirim Request
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
