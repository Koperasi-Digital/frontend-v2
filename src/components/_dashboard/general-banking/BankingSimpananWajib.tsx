import { Box, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import PaymentButton from './PaymentCreation';

import { handleGetSimpananWajib, handleAddOrderSimpananWajib } from 'utils/financeSimpanan';
import { handleCreateOrder } from 'utils/financeOrder';
import useAuth from 'hooks/useAuth';

type SimpananWajib = {
  id: number;
  status: string;
  amount: number;
  period: Date;
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

export default function BankingSimpananWajib() {
  const { user } = useAuth();
  const userId = user?.id;

  const [simpananWajib, setSimpananWajib] = useState<SimpananWajib>();
  useEffect(() => {
    const fetchData = async () => {
      const fetchedSimpananWajib = await handleGetSimpananWajib(userId, new Date());
      if (fetchedSimpananWajib.order === null) {
        const createdOrder = await handleCreateOrder(userId, fetchedSimpananWajib.amount);
        const temp = await handleAddOrderSimpananWajib(userId, new Date(), createdOrder.id);
        fetchedSimpananWajib.order = temp.order;
      }
      setSimpananWajib(fetchedSimpananWajib);
    };
    fetchData();
  }, [userId]);

  console.log(simpananWajib);

  return (
    <>
      <Box sx={{ mb: 5 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="overline" sx={{ color: 'text.primary' }}>
            Pembayaran Simpanan Wajib
          </Typography>
          {simpananWajib ? (
            simpananWajib.order.status !== 'LUNAS' ? (
              <PaymentButton
                user_id={2}
                buttonName="Bayar"
                transaction_details={{
                  order_id: simpananWajib.order.id,
                  gross_amount: simpananWajib.amount
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
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="overline" sx={{ color: 'text.secondary' }}>
            periode 1/1/2022 - 31/1/2022
          </Typography>
        </Stack>
      </Box>
    </>
  );
}
