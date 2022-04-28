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
        const fetchedSimpananWajib = await handleGetSimpananWajib(user.id, props.dateValue);
        if (fetchedSimpananWajib && fetchedSimpananWajib.order === null) {
          const createdOrder = await handleCreateOrder(
            user.id,
            fetchedSimpananWajib.amount,
            'OTHER'
          );
          const temp = await handleAddOrderSimpananWajib(user.id, new Date(), createdOrder.id);
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
          <Stack direction="row" spacing={5} justifyContent="center" sx={{ mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Simpanan wajib : {fCurrency(simpananWajib.amount)}
            </Typography>

            {simpananWajib.order && simpananWajib.order.status !== 'LUNAS' ? (
              <PaymentButton
                user_id={2}
                buttonName="Bayar"
                transaction_details={{
                  order_id: simpananWajib.order.id.toString(),
                  gross_amount: simpananWajib.amount
                }}
              />
            ) : (
              <Typography variant="body1" gutterBottom>
                Lunas
              </Typography>
            )}
          </Stack>
          <Stack direction="row" justifyContent="center">
            <Typography variant="overline" sx={{ color: 'text.secondary' }}>
              periode {new Date(simpananWajib.period).getDate()} -{' '}
              {new Date(simpananWajib.period).getMonth() + 1} -{' '}
              {new Date(simpananWajib.period).getFullYear()}
            </Typography>
          </Stack>
        </>
      ) : dataNotExist ? (
        <>
          <Stack direction="row" justifyContent="center">
            <Typography variant="body1" gutterBottom>
              Data tidak tersedia
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="center">
            <Typography variant="body1" gutterBottom>
              (Coba refresh jika yakin memang data ada)
            </Typography>
          </Stack>
        </>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}
