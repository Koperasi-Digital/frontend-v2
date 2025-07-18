import { Box, Stack, Typography, Button, DialogTitle } from '@mui/material';
import { useEffect, useState } from 'react';
import BankingEMoneyForm from './BankingEMoneyForm';
import { useSnackbar } from 'notistack';

import { fCurrency } from '../../../utils/formatNumber';

import { DialogAnimate } from '../../animate';

import LoadingScreen from 'components/LoadingScreen';

// redux
import { RootState, useDispatch, useSelector } from 'redux/store';
import {
  registerEMoney,
  unbindEMoney,
  getPayAccount,
  resetPayAccount,
  resetErrorType
} from 'redux/slices/emoney';

export default function BankingEMoney() {
  const dispatch = useDispatch();
  const {
    isLoadingGetPaymentAccount,
    isLoadingCharge,
    isLoadingUnbind,
    registerStep,
    hasBeenRedirected,
    errorType
  } = useSelector((state: RootState) => state.emoney);

  const [saldo, setSaldo] = useState<number | undefined>(undefined);
  const [openModalEMoney, setOpenModalEMoney] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleRegisterEMoney = async (
    payment_type: string,
    phone_number: string,
    country_code: string
  ) => {
    dispatch(registerEMoney(hasBeenRedirected, phone_number, payment_type, country_code));
  };

  const handleUnregisterEMoney = async () => {
    dispatch(unbindEMoney());
  };

  const handleCloseModal = () => {
    setOpenModalEMoney(false);
  };

  useEffect(() => {
    const fetchSaldo = async () => {
      const payAccount = await getPayAccount();
      if (payAccount && payAccount.metadata && payAccount.metadata.payment_options) {
        for (let i = 0; i < payAccount.metadata.payment_options.length; i++) {
          if (payAccount.metadata.payment_options[i].name === 'GOPAY_WALLET') {
            setSaldo(payAccount.metadata.payment_options[i].balance.value);
          }
        }
      }
    };
    if (registerStep === 2) {
      fetchSaldo();
    }
  }, [registerStep]);

  useEffect(() => {
    if (errorType) {
      if (errorType === 'Unauthorized') {
        enqueueSnackbar('Akun pembayaran sudah digunakan oleh akun lain', { variant: 'error' });
      } else {
        enqueueSnackbar('Pendaftaran akun pembayaran gagal', { variant: 'error' });
      }
      dispatch(resetErrorType());
    }
  }, [dispatch, enqueueSnackbar, errorType]);

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        {saldo &&
        !isLoadingGetPaymentAccount &&
        !isLoadingCharge &&
        registerStep === 2 &&
        !isLoadingUnbind ? (
          <Box width="100%" display="flex" flexDirection="column" gap={2} justifyContent="center">
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="overline" sx={{ color: 'text.primary' }}>
                Gopay
              </Typography>
              <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                {saldo ? fCurrency(saldo) : null}
              </Typography>
            </Stack>
            <Button variant="contained" onClick={handleUnregisterEMoney}>
              Batalkan pendaftaran E-Money
            </Button>
          </Box>
        ) : !isLoadingGetPaymentAccount &&
          !isLoadingCharge &&
          registerStep === 0 &&
          !isLoadingUnbind ? (
          <Button
            variant="contained"
            onClick={() => {
              setOpenModalEMoney(true);
            }}
          >
            Daftarkan E-Money
          </Button>
        ) : isLoadingGetPaymentAccount ||
          isLoadingCharge ||
          registerStep === 1 ||
          isLoadingUnbind ? (
          <LoadingScreen />
        ) : (
          <Box width="100%" display="flex" flexDirection="column" gap={2} justifyContent="center">
            <Typography>Terjadi error</Typography>
            <Button
              variant="contained"
              onClick={() => {
                resetPayAccount();
              }}
            >
              Mulai lagi
            </Button>
          </Box>
        )}
      </Stack>
      <DialogAnimate
        open={openModalEMoney}
        onClose={() => {
          setOpenModalEMoney(false);
        }}
      >
        <DialogTitle>Daftarkan E-Money</DialogTitle>
        <BankingEMoneyForm
          handleCloseModal={handleCloseModal}
          handleRegisterEMoney={handleRegisterEMoney}
        />
      </DialogAnimate>
    </>
  );
}
