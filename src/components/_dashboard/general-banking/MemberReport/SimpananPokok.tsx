import { Button, Stack, Typography, DialogActions, DialogTitle } from '@mui/material';
import { useEffect, useState } from 'react';
import { PaymentCreation as PaymentButton } from 'components/_dashboard/general-banking';
import { DialogAnimate } from 'components/animate';
import {
  handleGetSimpananPokok,
  handleAddOrderSimpananPokok
} from 'utils/financeAxios/financeSimpanan';
import { handleCreateOrder } from 'utils/financeAxios/financeOrder';
import useAuth from 'hooks/useAuth';

import { fCurrency } from 'utils/formatNumber';

import LoadingScreen from 'components/LoadingScreen';

import { SimpananPokok as SimpananPokokType } from '../../../../@types/simpanan';

export default function SimpananPokok() {
  const { user } = useAuth();

  const [simpananPokok, setSimpananPokok] = useState<SimpananPokokType>();
  const [dataNotExist, setDataNotExist] = useState<Boolean>(false);
  const [isOpenGopayPopUp, setIsOpenGopayPopUp] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const fetchedSimpananPokok = await handleGetSimpananPokok();
        if (fetchedSimpananPokok && fetchedSimpananPokok.order === null) {
          const createdOrder = await handleCreateOrder(
            user?.id,
            fetchedSimpananPokok.amount,
            'OTHER'
          );
          const temp = await handleAddOrderSimpananPokok(createdOrder.id);
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
          <Stack direction="column" spacing={2} alignItems="center">
            <Stack direction="row" spacing={5} justifyContent="center" sx={{ mb: 2 }}>
              <Typography variant="h5" gutterBottom>
                Simpanan pokok : {fCurrency(simpananPokok.amount)}
              </Typography>
              <Typography variant="h5" gutterBottom>
                {simpananPokok.order.status}
              </Typography>
            </Stack>
            {simpananPokok.order && simpananPokok.order.status !== 'LUNAS' && (
              <>
                <Typography>Bayar dengan</Typography>
                {/* <DialogAnimate
                  open={isOpenGopayPopUp}
                  onClose={() => {
                    setIsOpenGopayPopUp(false);
                  }}
                >
                  <DialogTitle sx={{ pb: 1 }}>
                    Apakah anda yakin ingin membayar dengan gopay?
                  </DialogTitle>
                  <DialogActions>
                    <Stack direction="row" spacing={2}>
                      <PaymentButton
                        buttonName="Ya"
                        transaction_details={{
                          order_id: simpananPokok.order.id,
                          gross_amount: simpananPokok.amount
                        }}
                        paymentType="GOPAY"
                      />
                      <Button
                        onClick={() => {
                          setIsOpenGopayPopUp(false);
                        }}
                      >
                        Tidak
                      </Button>
                    </Stack>
                  </DialogActions>
                </DialogAnimate>
                <Button
                  variant="contained"
                  onClick={() => {
                    setIsOpenGopayPopUp(true);
                  }}
                >
                  Gopay
                </Button> */}
                <PaymentButton
                  buttonName="GOPAY TERDAFTAR"
                  transaction_details={{
                    order_id: simpananPokok.order.id,
                    gross_amount: simpananPokok.amount
                  }}
                  paymentType="GOPAY"
                />
                <PaymentButton
                  buttonName="Alternatif lain"
                  transaction_details={{
                    order_id: simpananPokok.order.id,
                    gross_amount: simpananPokok.amount
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
            Data tidak tersedia (coba refresh jika yakin memang data ada)
          </Typography>
        </>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}
