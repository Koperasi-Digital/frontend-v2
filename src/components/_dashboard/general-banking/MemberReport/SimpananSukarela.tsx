import { Button, Stack, Typography, Link } from '@mui/material';
import { useEffect, useState } from 'react';

import { handleGetSimpananSukarela } from 'utils/financeAxios/financeSimpanan';

import useAuth from 'hooks/useAuth';

import { fCurrency } from 'utils/formatNumber';

import { PATH_DASHBOARD } from 'routes/paths';

export default function SimpananSukarela() {
  const { user } = useAuth();

  const [simpananSukarelaAmount, setSimpananSukarelaAmount] = useState<number | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const fetchedSimpananSukarela = await handleGetSimpananSukarela();
          setSimpananSukarelaAmount(fetchedSimpananSukarela.amount);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [user]);

  return (
    <>
      <Stack direction="column" spacing={2} alignItems="center">
        <Typography variant="h5" gutterBottom>
          Simpanan sukarela :{' '}
          {simpananSukarelaAmount !== undefined ? fCurrency(simpananSukarelaAmount) : ''}
        </Typography>
        <Link
          href={PATH_DASHBOARD.finance.addSimpananSukarela}
          sx={{
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline'
            }
          }}
        >
          <Button variant="contained">Tambahkan Simpanan Sukarela</Button>
        </Link>
      </Stack>
    </>
  );
}
