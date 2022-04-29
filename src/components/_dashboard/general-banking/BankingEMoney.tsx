import { Box, Stack, Typography, Button, DialogTitle } from '@mui/material';
import { useEffect, useState } from 'react';
import BankingEMoneyForm from './BankingEMoneyForm';

import { fCurrency } from '../../../utils/formatNumber';
import LoadingScreen from '../../LoadingScreen';

import { DialogAnimate } from '../../animate';

// redux
import { RootState, useDispatch, useSelector } from 'redux/store';
import { registerEMoney, unbindEMoney, getPayAccount } from 'redux/slices/emoney';

export default function BankingEMoney() {
  const dispatch = useDispatch();
  const { isLoading, paymentType, phoneNumber, countryCode, hasRegistered, error } = useSelector(
    (state: RootState) => state.emoney
  );

  const [saldo, setSaldo] = useState<number>();
  const [openModalEMoney, setOpenModalEMoney] = useState<boolean>(false);

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
    console.log('Begin register emoney');
    const handleCheckEMoney = async () => {
      let payAccount = await getPayAccount();
      if (!payAccount && paymentType && phoneNumber && countryCode) {
        dispatch(registerEMoney(phoneNumber, paymentType, countryCode));
      }
    };

    handleCheckEMoney();
  }, [dispatch, paymentType, phoneNumber, countryCode]);

  useEffect(() => {
    console.log('Begin fetch emoney saldo');
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

    fetchSaldo();
  }, [hasRegistered]);

  return (
    <>
      <Box sx={{ mb: 5 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="overline" sx={{ color: 'text.primary' }}>
            Gopay
          </Typography>
          {error ? (
            <Typography>An Error occurs</Typography>
          ) : isLoading ? (
            <>
              <LoadingScreen />
            </>
          ) : hasRegistered && saldo ? (
            <div>
              <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                {saldo ? fCurrency(saldo) : null}
              </Typography>
              <Button onClick={handleUnregisterEMoney}>Unregister Gopay</Button>
            </div>
          ) : (
            <Button
              onClick={() => {
                setOpenModalEMoney(true);
              }}
            >
              Register E-Money
            </Button>
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
      </Box>
    </>
  );
}
