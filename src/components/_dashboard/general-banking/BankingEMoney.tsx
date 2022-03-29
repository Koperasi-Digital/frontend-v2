import { Box, Stack, Typography, Button, DialogTitle } from '@mui/material';
import { useEffect, useState } from 'react';
import BankingEMoneyForm from './BankingEMoneyForm';
import { useSnackbar } from 'notistack';

import {
  handleRegister,
  handleGetPayAccountInfo,
  handleUnbindPayAccount
} from 'utils/financeEMoney';
import { fCurrency } from '../../../utils/formatNumber';

import { DialogAnimate } from '../../animate';
import useAuth from 'hooks/useAuth';

export default function BankingEMoney() {
  const { user } = useAuth();
  const userId = user?.id;

  const [saldo, setSaldo] = useState<number>();
  const [openModalEMoney, setOpenModalEMoney] = useState<boolean>(false);
  const [doesExist, setDoesExist] = useState<Boolean>(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleRegisterEMoney = async (
    userId: number,
    payment_type: string,
    phone_number: string,
    country_code: string
  ) => {
    window.localStorage.setItem(
      'registerData',
      JSON.stringify({
        payment_type: payment_type,
        phone_number: phone_number,
        country_code: country_code
      })
    );
    const response = await handleRegister(userId, payment_type, phone_number, country_code);
    if (response.actions) {
      const activationURL = response.actions[0].url;
      window.location.href = activationURL;
    } else {
      //for mock request
      window.location.href = './';
    }
  };

  const handleUnregisterEMoney = async () => {
    const fetchedRegisterData = window.localStorage.getItem('registerData');
    if (fetchedRegisterData) {
      const { payment_type, phone_number, country_code } = JSON.parse(fetchedRegisterData);
      const response1 = await handleRegister(userId, payment_type, phone_number, country_code);
      const response2 = await handleUnbindPayAccount(response1.account_id);
      if (!response2.mock) {
        window.localStorage.removeItem('registerData');
      }
      setDoesExist(false);
    }
  };

  const handleCloseModal = () => {
    setOpenModalEMoney(false);
  };

  useEffect(() => {
    const handleCheckEMoney = async () => {
      const fetchedRegisterData = window.localStorage.getItem('registerData');
      if (fetchedRegisterData) {
        const { payment_type, phone_number, country_code } = JSON.parse(fetchedRegisterData);
        const response = await handleRegister(userId, payment_type, phone_number, country_code);
        console.log(response);
        if (response.account_status === 'ENABLED') {
          setDoesExist(true);
          const response1 = await handleRegister(userId, payment_type, phone_number, country_code);
          const response2 = await handleGetPayAccountInfo(response1.account_id);
          setSaldo(response2.metadata.payment_options[0].balance.value);
          if (window.localStorage.getItem('isRegisterJustNow')) {
            window.localStorage.removeItem('isRegisterJustNow');
            enqueueSnackbar('Register Payment Account success', { variant: 'success' });
          }
        }
      }
    };

    handleCheckEMoney();
  }, [userId, enqueueSnackbar]);

  return (
    <>
      <Box sx={{ mb: 5 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="overline" sx={{ color: 'text.primary' }}>
            Gopay
          </Typography>
          {doesExist ? (
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
              Register GoPay
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
