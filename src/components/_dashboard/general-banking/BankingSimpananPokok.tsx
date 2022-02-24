import { Box, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import PaymentButton from './PaymentCreation';

import { handleGetSimpananPokok, handleAddOrderSimpananPokok } from 'utils/financeSimpanan';
import { handleCreateOrder } from 'utils/financeOrder';
import useAuth from 'hooks/useAuth';

type SimpananPokok = {
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

export default function BankingSimpananPokok() {
  const { user } = useAuth();
  const userId = user?.id;

  const [simpananPokok, setSimpananPokok] = useState<SimpananPokok>();
  useEffect(() => {
    const fetchData = async () => {
      const fetchedSimpananPokok = await handleGetSimpananPokok(userId);
      console.log(fetchedSimpananPokok);
      if (fetchedSimpananPokok.orderId === null) {
        const createdOrder = await handleCreateOrder(userId, fetchedSimpananPokok.amount);
        const temp = await handleAddOrderSimpananPokok(userId, createdOrder.id);
        fetchedSimpananPokok.orderId = temp.orderId;
        fetchedSimpananPokok.order = temp.order;
      }
      setSimpananPokok(fetchedSimpananPokok);
    };
    fetchData();
  }, [userId]);

  return (
    <>
      <Box sx={{ mb: 5 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="overline" sx={{ color: 'text.primary' }}>
            Pembayaran Simpanan Pokok
          </Typography>
          {simpananPokok ? (
            simpananPokok.order.status !== 'success' ? (
              <PaymentButton
                user_id={2}
                buttonName="Bayar"
                transaction_details={{
                  order_id: simpananPokok.order.id,
                  gross_amount: simpananPokok.amount
                }}
              />
            ) : (
              <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                Lunas
              </Typography>
            )
          ) : (
            <Typography variant="overline" sx={{ color: 'text.secondary' }}>
              Loading
            </Typography>
          )}
        </Stack>
      </Box>
    </>
  );
}
