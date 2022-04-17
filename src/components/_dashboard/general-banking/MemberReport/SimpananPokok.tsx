import { Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { PaymentCreation as PaymentButton } from 'components/_dashboard/general-banking';

import {
  handleGetSimpananPokok,
  handleAddOrderSimpananPokok
} from 'utils/financeAxios/financeSimpanan';
import { handleCreateOrder } from 'utils/financeAxios/financeOrder';
import useAuth from 'hooks/useAuth';

import { fCurrency } from 'utils/formatNumber';

import LoadingScreen from 'components/LoadingScreen';

type SimpananPokokType = {
  id: number;
  status: string;
  amount: number;
  userId: number;
  user: {
    id: number;
    email: string;
    password: string;
    username: string;
    name: string;
    role: string;
    language: string;
    created_at: string;
    updated_at: string;
  };
  order: {
    id: number;
    user_id: number;
    total_cost: number;
    status: string;
  };
};

export default function SimpananPokok() {
  const { user } = useAuth();

  const [simpananPokok, setSimpananPokok] = useState<SimpananPokokType>();
  const [dataNotExist, setDataNotExist] = useState<Boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const fetchedSimpananPokok = await handleGetSimpananPokok(user.id);
        if (fetchedSimpananPokok && fetchedSimpananPokok.order === null) {
          const createdOrder = await handleCreateOrder(user.id, fetchedSimpananPokok.amount);
          const temp = await handleAddOrderSimpananPokok(user.id, createdOrder.id);
          fetchedSimpananPokok.order = temp.order;
        }
        if (!fetchedSimpananPokok) {
          setDataNotExist(true);
        }
        setSimpananPokok(fetchedSimpananPokok);
      }
    };
    fetchData();
  }, [user]);

  return (
    <>
      {simpananPokok ? (
        <>
          <Stack direction="row" spacing={5} justifyContent="center" sx={{ mb: 15 }}>
            <Typography variant="h6" gutterBottom>
              Simpanan pokok : {fCurrency(simpananPokok.amount)}
            </Typography>
            {simpananPokok.order && simpananPokok.order.status !== 'LUNAS' ? (
              <PaymentButton
                user_id={2}
                buttonName="Bayar"
                transaction_details={{
                  order_id: simpananPokok.order.id,
                  gross_amount: simpananPokok.amount
                }}
              />
            ) : (
              <Typography variant="body1" gutterBottom>
                Lunas
              </Typography>
            )}
          </Stack>
        </>
      ) : dataNotExist ? (
        <>
          <Typography variant="body1" gutterBottom>
            Data tidak tersedia (coba refresh jika yakin memang data ada)
          </Typography>
        </>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}
