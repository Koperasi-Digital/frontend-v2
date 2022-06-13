import {
  Button,
  Box,
  Typography,
  Link,
  Card,
  Tooltip,
  IconButton,
  Stack,
  Grid
} from '@mui/material';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import questionMarkCircleOutline from '@iconify/icons-eva/question-mark-circle-outline';

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

  const saldoExplanation = `Saldo adalah akumulasi dana pembayaran dari koperasi kepada anggota. Dapat berupa pembayaran sisa hasil usaha maupun hasil penjualan toko di e-commerce. Saldo tidak dapat dipakai kembali untuk melakukan transaksi pembayaran, tetapi dapat dicairkan ke akun rekening bank yang didaftarkan oleh anggota`;

  return (
    <>
      <Stack direction="row">
        <Box height={20} sx={{ display: 'flex', alignItems: 'flex-start' }}>
          <Typography gutterBottom variant="h6" sx={{ mx: '0.5rem', mt: '0.1rem' }}>
            Saldo
          </Typography>
        </Box>
        <Tooltip title={saldoExplanation}>
          <IconButton sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Icon icon={questionMarkCircleOutline} width={20} height={20} />
          </IconButton>
        </Tooltip>
      </Stack>

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
        {/* <Button variant="contained" align="right" sx={{ m: '0.5rem', fontWeight: 'bold' }}>
          Cairkan saldo
        </Button> */}
        <Grid container justifyContent="flex-end">
          <Button variant="contained" sx={{ m: '0.5rem', fontWeight: 'bold' }}>
            Cairkan saldo
          </Button>
        </Grid>
      </Link>
    </>
  );
}
