import { Typography, Link, Card } from '@mui/material';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { handleGetSaldo } from 'utils/financeAxios/financeSaldo';
import { fCurrency } from 'utils/formatNumber';
import { PATH_DASHBOARD } from 'routes/paths';

// hooks
import useAuth from 'hooks/useAuth';

export default function BankingSaldo() {
  const [saldo, setSaldo] = useState<number>();

  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const saldo = await handleGetSaldo(user.id);
        if (saldo) {
          setSaldo(saldo.amount);
        }
      }
    };
    fetchData();
  }, [user]);

  return (
    <>
      <Typography gutterBottom variant="h6" sx={{ mx: '0.5rem' }}>
        Saldo
      </Typography>
      <Card
        sx={{
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          height: '185px',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Typography component="span" variant="h3">
          {saldo ? fCurrency(saldo) : ''}
        </Typography>
      </Card>
      <Link underline="none" component={RouterLink} to={PATH_DASHBOARD.finance.disbursementRequest}>
        <Typography variant="body2" align="right" sx={{ m: '0.5rem', fontWeight: 'bold' }}>
          Pencairan saldo
        </Typography>
      </Link>
    </>
  );
}
