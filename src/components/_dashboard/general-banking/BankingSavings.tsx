import { styled } from '@mui/material/styles';
import { Box, Card, CardHeader, Stack, Typography, Button, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import PaymentButton from '../general-banking/PaymentGateway';

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  backgroundColor: theme.palette.background.neutral,
  '& .slick-list': {
    paddingTop: '24px !important'
  }
}));

export default function BankingSavings() {
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
              <PaymentButton buttonName="Bayar" tokenName="a27981a8-fae3-47ba-86e9-feb3cbb77e66" />
            </Stack>
          </Box>
          <Box>
            <Link component={RouterLink} to="./transactions" sx={{ typography: 'button' }}>
              See Savings Report
            </Link>
          </Box>
        </Box>
      </RootStyle>
    </>
  );
}
