import { Box, Stack, Typography, Button, DialogTitle } from '@mui/material';
import { useEffect, useState } from 'react';
import BankingEMoneyForm from './BankingEMoneyForm';

import {
  handleRegister,
  handleGetPayAccountInfo,
  handleUnbindPayAccount
} from '../../../utils/financeEMoney';
import { fCurrency } from '../../../utils/formatNumber';

import { DialogAnimate } from '../../animate';

export default function BankingEMoney() {
  const user_id = 3;

  const [saldo, setSaldo] = useState<number>();
  const [openModalEMoney, setOpenModalEMoney] = useState<boolean>(false);
  const [doesExist, setDoesExist] = useState<Boolean>(false);

  const handleCheckEMoney = async () => {
    const fetchedRegisterData = window.localStorage.getItem('registerData');
    if (fetchedRegisterData) {
      const { payment_type, phone_number, country_code } = JSON.parse(fetchedRegisterData);
      const response = await handleRegister(user_id, payment_type, phone_number, country_code);
      console.log(response.account_status);
      if (response.account_status === 'ENABLED') {
        setDoesExist(true);
        const response1 = await handleRegister(user_id, payment_type, phone_number, country_code);
        console.log('This is response 1');
        console.log(response1);
        const response2 = await handleGetPayAccountInfo(response1.account_id);
        console.log('This is response 2');
        setSaldo(response2.metadata.payment_options[0].balance.value);
      }
    }
  };

  const handleRegisterEMoney = async (
    user_id: number,
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
    const response = await handleRegister(user_id, payment_type, phone_number, country_code);
    const activationURL = response.actions[0].url;
    window.location.href = activationURL;
    // setOpenModalEMoney(true);
  };

  const handleUnregisterEMoney = async () => {
    const fetchedRegisterData = window.localStorage.getItem('registerData');
    if (fetchedRegisterData) {
      const { payment_type, phone_number, country_code } = JSON.parse(fetchedRegisterData);
      const response1 = await handleRegister(user_id, payment_type, phone_number, country_code);
      console.log('Response 1');
      console.log(response1);
      const response2 = await handleUnbindPayAccount(response1.account_id);
      console.log('Response 2');
      console.log(response2);
      window.localStorage.removeItem('registerData');
      setDoesExist(false);
    }
  };

  const handleCloseModal = () => {
    setOpenModalEMoney(false);
  };

  useEffect(() => {
    handleCheckEMoney();
  }, []);

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
