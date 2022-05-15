import { Box, Stack, Typography, Button, DialogTitle } from '@mui/material';
import { useEffect, useState } from 'react';
import BankingEMoneyForm from './BankingEMoneyForm';
import { useSnackbar } from 'notistack';

import { fCurrency } from '../../../utils/formatNumber';

import { DialogAnimate } from '../../animate';

// redux
import { RootState, useDispatch, useSelector } from 'redux/store';
import {
  registerEMoney,
  unbindEMoney,
  getPayAccount,
  resetPayAccount,
  resetErrorType
} from 'redux/slices/emoney';
// import { resetState } from 'redux/slices/emoney';

export default function BankingEMoney() {
  const dispatch = useDispatch();
  const {
    isLoadingGetPaymentAccount,
    isLoadingCharge,
    isLoadingUnbind,
    registerStep,
    paymentType,
    phoneNumber,
    countryCode,
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
    dispatch(registerEMoney(phone_number, payment_type, country_code));
  };

  const handleUnregisterEMoney = async () => {
    dispatch(unbindEMoney());
  };

  const handleCloseModal = () => {
    setOpenModalEMoney(false);
  };

  useEffect(() => {
    const handleCheckEMoney = async (
      phoneNumber: string,
      paymentType: string,
      countryCode: string
    ) => {
      dispatch(registerEMoney(phoneNumber, paymentType, countryCode));
    };

    if (paymentType && phoneNumber && countryCode && registerStep === 1) {
      handleCheckEMoney(phoneNumber, paymentType, countryCode);
    }
  }, [dispatch, paymentType, phoneNumber, countryCode, registerStep]);

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
  }, [registerStep, saldo]);

  useEffect(() => {
    if (errorType) {
      if (errorType === 'Unauthorized') {
        enqueueSnackbar('Payment account has already used in other account', { variant: 'error' });
      } else {
        enqueueSnackbar('Register payment account fail', { variant: 'error' });
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
              Unregister Gopay
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
            Register E-Money
          </Button>
        ) : isLoadingGetPaymentAccount ||
          isLoadingCharge ||
          registerStep === 1 ||
          isLoadingUnbind ? (
          <Typography>Loading</Typography>
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
        <DialogTitle>Register EMoney</DialogTitle>
        <BankingEMoneyForm
          handleCloseModal={handleCloseModal}
          handleRegisterEMoney={handleRegisterEMoney}
        />
      </DialogAnimate>
    </>
  );
}
