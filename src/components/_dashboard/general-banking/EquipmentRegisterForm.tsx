import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Tooltip
} from '@mui/material';

import { Icon } from '@iconify/react';

import questionMarkCircleOutline from '@iconify/icons-eva/question-mark-circle-outline';

import { handleRegisterNewEquipment } from 'utils/financeAxios/financeCoopReport';

export default function EquipmentRegisterForm() {
  const { enqueueSnackbar } = useSnackbar();

  const EquipmentRegisterSchema = Yup.object().shape({
    price: Yup.number().required('Harga wajib diisi'),
    source: Yup.string().required('Sumber wajib diisi').oneOf(['KAS', 'MODAL'])
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      price: '',
      source: 'KAS'
    },
    validationSchema: EquipmentRegisterSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        const currentPeriode = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-1`;
        await handleRegisterNewEquipment(Number(values.price), values.source, currentPeriode);
        enqueueSnackbar(`Pendaftaran pembelian peralatan koperasi dari ${values.source} berhasil`, {
          variant: 'success'
        });
        resetForm();
        setSubmitting(false);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={5}>
                <Stack spacing={1}>
                  <TextField
                    fullWidth
                    label="Harga"
                    {...getFieldProps('price')}
                    error={Boolean(touched.price && errors.price)}
                    helperText={touched.price && errors.price}
                  />
                  <FormLabel id="source-radio-buttons-group">Sumber</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    {...getFieldProps('source')}
                  >
                    <Stack direction="row">
                      <Box height={15} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                        <FormControlLabel value="KAS" control={<Radio />} label="Kas" />
                      </Box>
                      <Box sx={{ mt: 0.6 }}>
                        <Tooltip
                          title={'Pilih "Kas" jika peralatan dibeli menggunakan kas koperasi'}
                        >
                          <IconButton sx={{ display: 'flex', alignItems: 'flex-start' }}>
                            <Icon icon={questionMarkCircleOutline} width={15} height={15} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Stack>
                    <Stack direction="row">
                      <Box height={15} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                        <FormControlLabel value="MODAL" control={<Radio />} label="Pemberian" />
                      </Box>
                      <Box sx={{ mt: 0.6 }}>
                        <Tooltip
                          title={
                            'Pilih "Pemberian" jika peralatan diberikan, pada laporan keuangan akan dimodifikasi pada field modal'
                          }
                        >
                          <IconButton sx={{ display: 'flex', alignItems: 'flex-start' }}>
                            <Icon icon={questionMarkCircleOutline} width={15} height={15} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Stack>
                  </RadioGroup>
                </Stack>
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
              Daftarkan Pembelian Peralatan
            </LoadingButton>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
