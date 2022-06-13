import { Button, Stack, Typography, Link, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';

import { handleGetSimpananSukarela } from 'utils/financeAxios/financeSimpanan';

import useAuth from 'hooks/useAuth';

import { fCurrency } from 'utils/formatNumber';

import { PATH_DASHBOARD } from 'routes/paths';
import { Link as RouterLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import questionMarkCircleOutline from '@iconify/icons-eva/question-mark-circle-outline';

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
        <Stack direction="row" alignItems="center">
          <Typography variant="h5">
            Simpanan sukarela :{' '}
            {simpananSukarelaAmount !== undefined ? fCurrency(simpananSukarelaAmount) : ''}
          </Typography>
          <Link
            variant="body2"
            component={RouterLink}
            to={`${PATH_DASHBOARD.general.faq}/apa-itu-simpanan-sukarela`}
          >
            <IconButton sx={{ display: 'flex', alignItems: 'flex-start' }}>
              <Icon icon={questionMarkCircleOutline} width={20} height={20} />
            </IconButton>
          </Link>
        </Stack>
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
