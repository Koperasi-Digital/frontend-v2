import { Icon } from '@iconify/react';
import { paramCase } from 'change-case';
import { useRef, useState, useEffect, useCallback } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import editFill from '@iconify/icons-eva/edit-fill';
import personFill from '@iconify/icons-eva/person-fill';
import { Link as RouterLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import {
  Checkbox,
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Box,
  Button,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormHelperText,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import { DialogAnimate } from 'components/animate';
import { UploadSingleFile } from 'components/upload';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { deleteUser } from 'redux/slices/user';
import { useSnackbar } from 'notistack';
import { Role } from '../../../../@types/role';
//types
import { BankAccount } from '../../../../@types/bankAccount';
//utils
import { handleGetBankAccount } from 'utils/financeAxios/financeBankAccount';
import { handleGetSaldo } from 'utils/financeAxios/financeSaldo';
import { handleUploadFile } from 'utils/bucket';
import { handleShowUserSisaHasilUsaha } from 'utils/financeAxios/financeSisaHasilUsaha';
import {
  handleGetSimpananPokok,
  handleShowUserSimpananWajib,
  handleGetSimpananSukarela
} from 'utils/financeAxios/financeSimpanan';
import { fHTML as fHTMLFinanceData } from 'utils/financeFormatting/financeMemberResignation';
import { fHTML as fHTMLBankAccount } from 'utils/financeFormatting/financeBankAccount';
//type
import {
  SimpananPokok as SimpananPokokType,
  SimpananWajib as SimpananWajibType
} from '../../../../@types/simpanan';
import { SisaHasilUsaha as SisaHasilUsahaType } from '../../../../@types/sisa-hasil-usaha';
import closeFill from '@iconify/icons-eva/close-fill';
import { MIconButton } from 'components/@material-extend';

// ----------------------------------------------------------------------

type UserMoreMenuProps = {
  user: any;
};

export default function UserMoreMenu({ user }: UserMoreMenuProps) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { id, displayName, roles } = user;
  const isMember = roles.map((role: Role) => role.name).includes('MEMBER');
  const [bankAccount, setBankAccount] = useState<BankAccount>();
  //finance
  const [saldoAmount, setSaldoAmount] = useState<number | undefined>();
  const [simpananSukarelaAmount, setSimpananSukarelaAmount] = useState<number | undefined>();
  const [simpananPokok, setSimpananPokok] = useState<SimpananPokokType | undefined>();
  const [simpananWajibList, setSimpananWajibList] = useState<SimpananWajibType[] | undefined>();
  const [sisaHasilUsahaList, setSisaHasilUsahaList] = useState<SisaHasilUsahaType[] | undefined>();
  const [financeDisbursementDesc, setFinanceDisbursementDesc] = useState<string>();

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

  // const onDelete = async () => {
  //   try {
  //     await deleteUser(id);
  //     enqueueSnackbar(`Pengguna ${displayName} berhasil dihapus!`, {
  //       variant: 'success',
  //       action: (key) => (
  //         <MIconButton size="small" onClick={() => closeSnackbar(key)}>
  //           <Icon icon={closeFill} />
  //         </MIconButton>
  //       )
  //     });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const onPrevDelete = async () => {
    if (bankAccount) {
      setIsOpenDeleteModal(true);
    } else {
      enqueueSnackbar(`Member ${displayName} belum mempunyai akun bank`, { variant: 'error' });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (isMember) {
        const bankAccount = await handleGetBankAccount(id);
        if (bankAccount) {
          setBankAccount(bankAccount);
        }
      }
    };
    fetchData();
  }, [isMember, id]);

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

  const formik = useFormik<InitialValues>({
    enableReinitialize: true,
    initialValues: {
      isDone: false,
      receipt: null
    },
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        if (values.receipt) {
          try {
            await handleUploadFile(values.receipt, 'resignationDisbursement', id);
            await deleteUser(id);
            enqueueSnackbar(`User ${id} berhasil didelete`, {
              variant: 'success',
              action: (key) => (
                <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                  <Icon icon={closeFill} />
                </MIconButton>
              )
            });
          } catch (err) {
            enqueueSnackbar('Persetujuan resignation gagal', {
              variant: 'error',
              action: (key) => (
                <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                  <Icon icon={closeFill} />
                </MIconButton>
              )
            });
          }
        } else {
          enqueueSnackbar('Persetujuan resignation gagal. Upload kuitansi terlebih dahulu', {
            variant: 'error',
            action: (key) => (
              <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                <Icon icon={closeFill} />
              </MIconButton>
            )
          });
        }
      } catch (error: any) {
        setErrors({ afterSubmit: error.message });
        setSubmitting(false);
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
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem
          component={RouterLink}
          to={`${PATH_DASHBOARD.user.root}/${paramCase(displayName)}/detail`}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Icon icon={personFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Detail" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem
          component={RouterLink}
          to={`${PATH_DASHBOARD.user.root}/${paramCase(displayName)}/edit`}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem onClick={() => onPrevDelete()} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Hapus" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>

      <DialogAnimate open={isOpenDeleteModal} onClose={() => setIsOpenDeleteModal(false)}>
        <DialogTitle sx={{ pb: 1 }}>Hapus Pengguna?</DialogTitle>
        <DialogContent
          sx={{ overflowY: 'unset', display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Typography align={'justify'}>
                Pengguna yang sudah dihapus akan hilang selamanya! Apakah Anda tetap ingin menghapus
                pengguna?
              </Typography>
              {isMember && (
                <>
                  <Typography fontWeight="bold" variant="h6">
                    Dana-dana anggota perlu dikembalikan
                  </Typography>
                  <Typography align={'justify'}>
                    Lakukan transfer dana sebagai berikut
                    {financeDisbursementDesc && fHTMLFinanceData(financeDisbursementDesc)}
                    <br />
                    ke akun rekening bank berikut
                    {bankAccount && fHTMLBankAccount(bankAccount)}
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
                          Saya telah melakukan pencairan dana kepada akun bank anggota yang tertera
                          sejumlah total yang tertera
                        </Typography>
                      </>
                    }
                  />
                </>
              )}
              <Box display="flex" justifyContent="end" gap={2} pt={2} pb={1}>
                <Button variant="contained" type="submit" color="error">
                  Hapus
                </Button>
                <Button variant="contained" onClick={() => setIsOpenDeleteModal(false)}>
                  Batal
                </Button>
              </Box>
            </Form>
          </FormikProvider>
        </DialogContent>
      </DialogAnimate>
    </>
  );
}
