import { Box, Stack, Typography, Link } from '@mui/material';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { handleGetSaldo } from 'utils/financeSaldo';
import { fCurrency } from 'utils/formatNumber';

// hooks
import useAuth from 'hooks/useAuth';

export default function BankingSaldo() {
  const [saldo, setSaldo] = useState<number>();

  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const saldo = await handleGetSaldo(user.id);
        setSaldo(saldo.amount);
      }
    };
    fetchData();
  }, [user]);

  return (
    <>
      <Box sx={{ mb: 5 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="overline" sx={{ color: 'text.primary' }}>
            Saldo
          </Typography>
          <Typography variant="overline" sx={{ color: 'text.secondary' }}>
            {saldo ? fCurrency(saldo) : ''}
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
