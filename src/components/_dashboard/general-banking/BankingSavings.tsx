import { styled } from '@mui/material/styles';
import { Box, Card, CardHeader, Stack, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import PaymentButton from './PaymentCreation';

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  backgroundColor: theme.palette.background.neutral,
  '& .slick-list': {
    paddingTop: '24px !important'
  },
  height: 300
}));

export default function BankingSavings() {
  const transaction_details = {
    order_id: 21,
    gross_amount: 10000
  };

  const item_details = [
    {
      price: 10000,
      quantity: 1,
      name: 'Simpanan Pokok',
      category: 'Simpanan'
    }
  ];

  return (
    <>
      <RootStyle>
        <CardHeader title="Simpanan" />
        <Box sx={{ p: 3 }}>
          <Box sx={{ mb: 5 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="overline" sx={{ color: 'text.primary' }}>
                Pembayaran Simpanan Pokok
              </Typography>
              <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                Lunas
              </Typography>
            </Stack>
          </Box>
          <Box sx={{ mb: 5 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="overline" sx={{ color: 'text.primary' }}>
                Pembayaran Simpanan Wajib
              </Typography>
              <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                Belum Dibayar
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                periode 1/1/2022 - 31/1/2022
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                lunasi sebelum 15/1/2022
              </Typography>
              <PaymentButton
                user_id={2}
                buttonName="Bayar"
                transaction_details={transaction_details}
                item_details={item_details}
              />
            </Stack>
          </Box>
          <Box>
            <Link component={RouterLink} to="./../member-report" sx={{ typography: 'button' }}>
              See Savings Report
            </Link>
          </Box>
        </Box>
      </RootStyle>
    </>
  );
}
