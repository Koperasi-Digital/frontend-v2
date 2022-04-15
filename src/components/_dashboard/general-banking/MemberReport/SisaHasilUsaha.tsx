import { Typography, Stack } from '@mui/material';
import { useEffect, useState } from 'react';

import { handleGetSisaHasilUsaha } from 'utils/financeAxios/financeSisaHasilUsaha';

import useAuth from 'hooks/useAuth';

import { fCurrency } from 'utils/formatNumber';

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
  const { user } = useAuth();

  const [sisaHasilUsaha, setSisaHasilUsaha] = useState<SisaHasilUsahaType>();
  const [dataNotExist, setDataNotExist] = useState<Boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const fetchedSisaHasilUsaha = await handleGetSisaHasilUsaha(user.id, props.dateValue);
        if (!fetchedSisaHasilUsaha) {
          setDataNotExist(true);
        }
        setSisaHasilUsaha(fetchedSisaHasilUsaha);
      }
    };
    fetchData();
  }, [user, props.dateValue]);

  return (
    <>
      {sisaHasilUsaha ? (
        <>
          <Stack direction="row" justifyContent="center">
            <Typography variant="h6" gutterBottom sx={{ marginBottom: 2 }}>
              SHU : {fCurrency(sisaHasilUsaha.total_cost)}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="center">
            <Typography
              variant="body1"
              sx={{ color: (theme) => theme.palette.error.main }}
              gutterBottom
            >
              *SHU = 2% dari total simpanan koperasi
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="center">
            <Typography variant="overline" sx={{ color: 'text.secondary' }}>
              periode {new Date(sisaHasilUsaha.periode).getDate()} -{' '}
              {new Date(sisaHasilUsaha.periode).getMonth() + 1} -{' '}
              {new Date(sisaHasilUsaha.periode).getFullYear()}
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
              (Coba refresh jika yakin memang data ada)
            </Typography>
          </Stack>
        </>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}
