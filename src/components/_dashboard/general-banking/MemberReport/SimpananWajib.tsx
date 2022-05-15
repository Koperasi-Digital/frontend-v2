import { Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { PaymentCreation as PaymentButton } from 'components/_dashboard/general-banking';

import {
  handleGetSimpananWajib,
  handleAddOrderSimpananWajib
} from 'utils/financeAxios/financeSimpanan';
import { handleCreateOrder } from 'utils/financeAxios/financeOrder';
import useAuth from 'hooks/useAuth';

import { fCurrency } from 'utils/formatNumber';

import LoadingScreen from 'components/LoadingScreen';

import { SimpananWajibType } from '../../../../@types/simpanan';

export default function SimpananWajib(props: { dateValue: Date }) {
  const { user } = useAuth();

  const [simpananWajib, setSimpananWajib] = useState<SimpananWajibType>();
  const [dataNotExist, setDataNotExist] = useState<Boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const fetchedSimpananWajib = await handleGetSimpananWajib(props.dateValue);
        if (fetchedSimpananWajib && fetchedSimpananWajib.order === null) {
          const createdOrder = await handleCreateOrder(
            user?.id,
            fetchedSimpananWajib.amount,
            'OTHER'
          );
          const temp = await handleAddOrderSimpananWajib(new Date(), createdOrder.id);
          fetchedSimpananWajib.order = temp.order;
        }
        if (!fetchedSimpananWajib) {
          setDataNotExist(true);
        }
        setSimpananWajib(fetchedSimpananWajib);
      }
    };
    fetchData();
  }, [user, props.dateValue]);

  return (
    <>
      {simpananWajib ? (
        <>
          <Stack direction="column" spacing={0.5} alignItems="center">
            <Stack direction="row" spacing={5} justifyContent="center" sx={{ mb: 0.5 }}>
              <Typography variant="h5" gutterBottom>
                Simpanan wajib : {fCurrency(simpananWajib.amount)}
              </Typography>
              <Typography variant="h5" gutterBottom>
                {simpananWajib.order.status}
              </Typography>
            </Stack>
            <Typography variant="h6">
              periode {new Date(simpananWajib.period).getDate()} -{' '}
              {new Date(simpananWajib.period).getMonth() + 1} -{' '}
              {new Date(simpananWajib.period).getFullYear()}
            </Typography>
            {simpananWajib.order && simpananWajib.order.status !== 'LUNAS' && (
              <>
                <Typography>Bayar dengan</Typography>
                <PaymentButton
                  buttonName="Gopay terdaftar"
                  transaction_details={{
                    order_id: simpananWajib.order.id,
                    gross_amount: simpananWajib.amount
                  }}
                  paymentType="GOPAY"
                />
                <PaymentButton
                  buttonName="Alternatif lain"
                  transaction_details={{
                    order_id: simpananWajib.order.id,
                    gross_amount: simpananWajib.amount
                  }}
                  paymentType="OTHER"
                />
              </>
            )}
          </Stack>
        </>
      ) : dataNotExist ? (
        <>
          <Typography variant="body1" gutterBottom>
            Data tidak tersedia (silakan coba muat ulang halaman ini)
          </Typography>
        </>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}
