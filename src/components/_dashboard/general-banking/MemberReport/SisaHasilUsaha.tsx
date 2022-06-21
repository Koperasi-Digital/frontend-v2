import { Typography, Stack, Link, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';

import { handleGetSisaHasilUsaha } from 'utils/financeAxios/financeSisaHasilUsaha';

import { fCurrency } from 'utils/formatNumber';

import { PATH_DASHBOARD } from 'routes/paths';
import { Link as RouterLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import questionMarkCircleOutline from '@iconify/icons-eva/question-mark-circle-outline';

import LoadingScreen from 'components/LoadingScreen';

type SisaHasilUsahaType = {
  id: number;
  periode: Date;
  total_cost: number;
  user: {
    id: number;
  };
};

export default function SisaHasilUsaha(props: { dateValue: Date }) {
  const [sisaHasilUsaha, setSisaHasilUsaha] = useState<SisaHasilUsahaType>();
  const [dataNotExist, setDataNotExist] = useState<Boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedSisaHasilUsaha = await handleGetSisaHasilUsaha(props.dateValue);
      if (!fetchedSisaHasilUsaha) {
        setDataNotExist(true);
      }
      setSisaHasilUsaha(fetchedSisaHasilUsaha);
    };
    fetchData();
  }, [props.dateValue]);

  return (
    <>
      {sisaHasilUsaha ? (
        <>
          <Stack direction="column" alignItems="center" spacing={2} sx={{ mb: 2 }}>
            <Stack direction="row" alignItems="center">
              <Typography variant="h6">SHU : {fCurrency(sisaHasilUsaha.total_cost)}</Typography>
              <Link
                variant="body2"
                component={RouterLink}
                to={`${PATH_DASHBOARD.general.faq}/bagaimana-mekanisme-pembagian-shu-berdasarkan-keaktifan-anggota`}
              >
                <IconButton sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <Icon icon={questionMarkCircleOutline} width={20} height={20} />
                </IconButton>
              </Link>
            </Stack>
            <Typography variant="h6">
              periode {new Date(sisaHasilUsaha.periode).getDate()} - {1} -{' '}
              {new Date(sisaHasilUsaha.periode).getFullYear()}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="center">
            <Typography
              variant="body1"
              sx={{ color: (theme) => theme.palette.error.main, textAlign: 'center' }}
              gutterBottom
            >
              *25% SHU Koperasi dibagikan kepada anggota berdasarkan keaktifan anggota dalam
              menghadiri rapat dan melakukan pembelian pada E-Commerce
            </Typography>
          </Stack>
        </>
      ) : dataNotExist ? (
        <>
          <Stack direction="row" justifyContent="center">
            <Typography variant="body1" gutterBottom>
              Data tidak tersedia
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="center">
            <Typography variant="body1" gutterBottom>
              (Coba refresh jika data ada)
            </Typography>
          </Stack>
        </>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}
