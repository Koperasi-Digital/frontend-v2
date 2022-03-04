import { Box, Stack, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function BankingSaldo() {
  return (
    <>
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
          to="./../finance/create-disbursement-request"
          sx={{ typography: 'button' }}
        >
          Add disbursement request
        </Link>
      </Box>
    </>
  );
}
