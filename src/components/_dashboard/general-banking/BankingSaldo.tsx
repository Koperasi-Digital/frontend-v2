import { Typography, Link, Card } from '@mui/material';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { handleGetSaldo } from 'utils/financeAxios/financeSaldo';
import { fCurrency } from 'utils/formatNumber';
import { PATH_DASHBOARD } from 'routes/paths';

export default function BankingSaldo() {
  const [saldo, setSaldo] = useState<number | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      const saldo = await handleGetSaldo();
      if (saldo) {
        setSaldo(saldo.amount);
      }
    };
    fetchData();
  }, []);

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
          {saldo !== undefined ? fCurrency(saldo) : ''}
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
