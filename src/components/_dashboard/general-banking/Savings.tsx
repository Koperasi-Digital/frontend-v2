import { styled } from '@mui/material/styles';
import { Box, Card, CardHeader, Stack, Typography, Button } from '@mui/material';

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  backgroundColor: theme.palette.background.neutral,
  '& .slick-list': {
    paddingTop: '24px !important'
  }
}));

export default function Savings() {
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
              <Button>Bayar</Button>
            </Stack>
          </Box>
        </Box>
      </RootStyle>
    </>
  );
}
