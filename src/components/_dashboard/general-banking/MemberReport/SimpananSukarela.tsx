import { Stack, Typography, Link } from '@mui/material';
import { useEffect, useState } from 'react';

import { handleGetSimpananSukarela } from 'utils/financeAxios/financeSimpanan';

import useAuth from 'hooks/useAuth';

import { fCurrency } from 'utils/formatNumber';

import { PATH_DASHBOARD } from 'routes/paths';

export default function SimpananSukarela() {
  const { user } = useAuth();

  const [simpananSukarelaAmount, setSimpananSukarelaAmount] = useState<number>();

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
          Simpanan sukarela : {fCurrency(simpananSukarelaAmount ? simpananSukarelaAmount : 0)}
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
          Tambahkan Simpanan Sukarela
        </Link>
      </Stack>
    </>
  );
}
