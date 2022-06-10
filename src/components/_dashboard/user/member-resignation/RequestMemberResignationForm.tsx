import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Stack, Alert, Typography, TextField, Checkbox, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useIsMountedRef from 'hooks/useIsMountedRef';
import axios from 'utils/axios';
import useAuth from 'hooks/useAuth';

import { useEffect, useState } from 'react';

import { handleGetSaldo } from 'utils/financeAxios/financeSaldo';
import { handleShowUserSisaHasilUsaha } from 'utils/financeAxios/financeSisaHasilUsaha';
import {
  handleGetSimpananPokok,
  handleShowUserSimpananWajib,
  handleGetSimpananSukarela
} from 'utils/financeAxios/financeSimpanan';

//type
import {
  SimpananPokok as SimpananPokokType,
  SimpananWajib as SimpananWajibType
} from '../../../../@types/simpanan';
import { SisaHasilUsaha as SisaHasilUsahaType } from '../../../../@types/sisa-hasil-usaha';

//utils
import { fHTML } from 'utils/financeAxios/financeMemberResignation';
// ----------------------------------------------------------------------

interface InitialValues {
  reason: 'pengajuan' | 'meninggal';
  description: string;
  isSure: boolean;
  afterSubmit?: string;
}

export default function RequestMemberResignationForm() {
  const { user } = useAuth();
  const isMountedRef = useIsMountedRef();

  //finance
  const [saldoAmount, setSaldoAmount] = useState<number | undefined>();
  const [simpananSukarelaAmount, setSimpananSukarelaAmount] = useState<number | undefined>();
  const [simpananPokok, setSimpananPokok] = useState<SimpananPokokType | undefined>();
  const [simpananWajibList, setSimpananWajibList] = useState<SimpananWajibType[] | undefined>();
  const [sisaHasilUsahaList, setSisaHasilUsahaList] = useState<SisaHasilUsahaType[] | undefined>();
  const [financeDisbursementDesc, setFinanceDisbursementDesc] = useState<string>();

  useEffect(() => {
    if (
      saldoAmount !== undefined &&
      simpananSukarelaAmount !== undefined &&
      simpananPokok !== undefined &&
      simpananWajibList !== undefined &&
      sisaHasilUsahaList !== undefined
    ) {
      const jsonReport = {
        saldo: saldoAmount,
        simpananPokok:
          simpananPokok.order && simpananPokok.order.status === 'LUNAS' ? simpananPokok.amount : 0,
        simpananWajibList: simpananWajibList.filter(
          (simpananWajib) => simpananWajib.order && simpananWajib.order.status === 'LUNAS'
        ),
        simpananSukarela: simpananSukarelaAmount,
        sisaHasilUsahaList: sisaHasilUsahaList
      };
      setFinanceDisbursementDesc(JSON.stringify(jsonReport));
    }
  }, [saldoAmount, simpananSukarelaAmount, simpananPokok, simpananWajibList, sisaHasilUsahaList]);

  useEffect(() => {
    const fetchFinanceData = async () => {
      if (user) {
        if (await handleGetSaldo()) {
          setSaldoAmount((await handleGetSaldo()).amount);
        }
        if (await handleGetSimpananSukarela()) {
          setSimpananSukarelaAmount((await handleGetSimpananSukarela()).amount);
        }
        setSimpananPokok(await handleGetSimpananPokok());
        setSimpananWajibList(await handleShowUserSimpananWajib('LUNAS'));
        setSisaHasilUsahaList(await handleShowUserSisaHasilUsaha());
      }
    };
    fetchFinanceData();
  }, [user]);

  const formik = useFormik<InitialValues>({
    enableReinitialize: true,
    initialValues: {
      reason: 'pengajuan',
      description: '',
      isSure: false
    },
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await axios.post(`member-resignation/create`, {
          ...values,
          financeDisbursementDesc: financeDisbursementDesc
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

  const { errors, touched, handleSubmit, isSubmitting, values, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

          <TextField
            select
            fullWidth
            label="Alasan"
            placeholder="Alasan pengunduran diri"
            {...getFieldProps('reason')}
            SelectProps={{ native: true }}
            error={Boolean(touched.reason && errors.reason)}
            helperText={touched.reason && errors.reason}
          >
            <option value="pengajuan">Pengajuan pribadi</option>
            <option value="meninggal">Meninggal dunia</option>
          </TextField>

          <TextField
            fullWidth
            multiline
            rows={8}
            label="Deskripsi"
            {...getFieldProps('description')}
            error={Boolean(touched.description && errors.description)}
            helperText={touched.description && errors.description}
          />

          <FormControlLabel
            control={<Checkbox checked={values.isSure} {...getFieldProps('isSure')} />}
            label={
              <>
                <Typography variant="body2">
                  Saya mengerti bahwa pengunduran diri akan menyebabkan kehilangan hak-hak sebagai
                  anggota koperasi. Pengguna tetap dapat melakukan transaksi dalam <i>e-commerce</i>{' '}
                  sebagai <i>customer</i> <br />
                  <br />
                  {financeDisbursementDesc && fHTML(financeDisbursementDesc)}
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
            disabled={!values.isSure || financeDisbursementDesc === undefined}
          >
            Kirim
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
