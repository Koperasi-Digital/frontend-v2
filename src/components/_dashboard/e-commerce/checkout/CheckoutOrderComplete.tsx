import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
// material
import { styled } from '@mui/material/styles';
import { Box, Button, Divider, Typography, Stack, DialogProps } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import { resetCart } from '../../../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
//
import { DialogAnimate } from '../../../animate';
import { OrderCompleteIllustration } from '../../../../assets';
import { ProductState } from '../../../../@types/products';

// ----------------------------------------------------------------------

const DialogStyle = styled(DialogAnimate)(({ theme }) => ({
  '& .MuiDialog-paper': {
    margin: 0,
    [theme.breakpoints.up('md')]: {
      maxWidth: 'calc(100% - 48px)',
      maxHeight: 'calc(100% - 48px)'
    }
  }
}));

// ----------------------------------------------------------------------

export default function CheckoutOrderComplete({ open }: DialogProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { checkout } = useSelector((state: { product: ProductState }) => state.product);
  const { orderId, paymentType } = checkout;

  const handleContinuePayment = () => {
    dispatch(resetCart());
    navigate(PATH_DASHBOARD.eCommerce.root + '/order/' + orderId + '/payment/' + paymentType);
  };

  const handleContinueShopping = () => {
    dispatch(resetCart());
    navigate(PATH_DASHBOARD.eCommerce.root);
  };

  return (
    <DialogStyle fullScreen open={open}>
      <Box sx={{ p: 4, maxWidth: 480, margin: 'auto' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" paragraph>
            Terima kasih atas pembelian Anda!
          </Typography>

          <OrderCompleteIllustration sx={{ height: 260, my: 10 }} />

          <Typography align="left" paragraph>
            Terima kasih atas pesanan pada order &nbsp;{orderId}
          </Typography>

          <Typography align="left" sx={{ color: 'text.secondary' }}>
            Anda bisa melihat status pesanan Anda pada halaman Riwayat Pesanan.
            <br /> <br /> Anda bisa melakukan pembayaran dengan menekan tombol "Bayar" pada dialog
            berikut ini atau tombol "Bayar Nanti" apabila ingin membayar nanti. <br /> <br />
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Stack
          direction={{ xs: 'column-reverse', sm: 'row' }}
          justifyContent="space-between"
          spacing={2}
        >
          <Button
            color="inherit"
            onClick={handleContinuePayment}
            startIcon={<Icon icon="uil:bill" />}
          >
            Bayar Sekarang
          </Button>
          <Button
            color="inherit"
            onClick={handleContinueShopping}
            startIcon={<Icon icon={arrowIosBackFill} />}
          >
            Lanjut Berbelanja
          </Button>
        </Stack>
      </Box>
    </DialogStyle>
  );
}
