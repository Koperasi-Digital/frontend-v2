import { styled } from '@mui/material/styles';
import { Box, Card, CardHeader, Stack, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  backgroundColor: theme.palette.background.neutral,
  '& .slick-list': {
    paddingTop: '24px !important'
  },
  height: 300
}));

export default function BankingEMoneyBalance() {
  return (
    <>
      <RootStyle>
        <CardHeader title="Current Balance" />
        <Box sx={{ p: 3 }}>
          <Box sx={{ mb: 5 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="overline" sx={{ color: 'text.primary' }}>
                Saldo
              </Typography>
              <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                Rp 200.000,00
              </Typography>
            </Stack>
            <Link
              component={RouterLink}
              to="./../create-disbursement-request"
              sx={{ typography: 'button' }}
            >
              Add disbursement request
            </Link>
          </Box>
          <Box sx={{ mb: 5 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="overline" sx={{ color: 'text.primary' }}>
                Gopay
              </Typography>
              <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                Rp 350.000,00
              </Typography>
            </Stack>
          </Box>
        </Box>
      </RootStyle>
    </>
  );
}
