import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import { Icon } from '@iconify/react';
import trendingUpFill from '@iconify/icons-eva/trending-up-fill';
import trendingDownFill from '@iconify/icons-eva/trending-down-fill';
import diagonalArrowLeftDownFill from '@iconify/icons-eva/diagonal-arrow-left-down-fill';
// material
import { styled } from '@mui/material/styles';
import { Card, Typography, Stack } from '@mui/material';
// utils
import { fCurrency, fPercent } from '../../../utils/formatNumber';
import { useEffect, useState } from 'react';
//
import BaseOptionChart from '../../charts/BaseOptionChart';

import { handleGetLabaRugiInfo } from '../../../utils/financeReport';

// hooks
import useAuth from 'hooks/useAuth';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  boxShadow: 'none',
  position: 'relative',
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  width: 48,
  height: 48,
  display: 'flex',
  borderRadius: '50%',
  position: 'absolute',
  alignItems: 'center',
  top: theme.spacing(3),
  right: theme.spacing(3),
  justifyContent: 'center',
  color: theme.palette.primary.lighter,
  backgroundColor: theme.palette.primary.dark
}));

export default function BankingIncome() {
  const [percent, setPercent] = useState<number>(0);
  const [currentLabaRugi, setCurrentLabaRugi] = useState<any>();
  const [prevLabaRugi, setPrevLabaRugi] = useState<any>();

  const { user } = useAuth();

  const chartOptions = merge(BaseOptionChart(), {
    chart: { sparkline: { enabled: true } },
    xaxis: { labels: { show: false } },
    yaxis: { labels: { show: false } },
    stroke: { width: 4 },
    legend: { show: false },
    grid: { show: false },
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName: string) => fCurrency(seriesName),
        title: {
          formatter: () => ''
        }
      }
    },
    fill: { gradient: { opacityFrom: 0.56, opacityTo: 0.56 } }
  });

  useEffect(() => {
    const handleSetTotalPercent = async () => {
      const date = new Date();
      let currentPeriodeString = date.getFullYear() + '-' + (date.getMonth() + 1) + '-1';
      let previousPeriodeString = date.getFullYear() + '-' + date.getMonth() + '-1';
      if (user) {
        const currentLabaRugi = await handleGetLabaRugiInfo(user.id, currentPeriodeString);
        const prevLabaRugi = await handleGetLabaRugiInfo(user.id, previousPeriodeString);

        setCurrentLabaRugi(currentLabaRugi);
        setPrevLabaRugi(prevLabaRugi);
      }
    };

    handleSetTotalPercent();
  }, [user]);

  useEffect(() => {
    if (currentLabaRugi && prevLabaRugi) {
      setPercent(
        ((currentLabaRugi.jumlahPenjualan - prevLabaRugi.jumlahPenjualan) /
          currentLabaRugi.jumlahPenjualan) *
          100
      );
    }
  }, [currentLabaRugi, prevLabaRugi]);

  return (
    <RootStyle>
      {currentLabaRugi && prevLabaRugi ? (
        <>
          <IconWrapperStyle>
            <Icon icon={diagonalArrowLeftDownFill} width={24} height={24} />
          </IconWrapperStyle>

          <Stack spacing={1} sx={{ p: 3 }}>
            <Typography sx={{ typography: 'subtitle2' }}>Income</Typography>
            <Typography sx={{ typography: 'h3' }}>
              {fCurrency(currentLabaRugi.jumlahPenjualan)}
            </Typography>
            <Stack direction="row" alignItems="center" flexWrap="wrap">
              <Icon
                width={20}
                height={20}
                icon={percent >= 0 ? trendingUpFill : trendingDownFill}
              />
              <Typography variant="subtitle2" component="span" sx={{ ml: 0.5 }}>
                {percent > 0 && '+'}
                {fPercent(percent)}
              </Typography>
              <Typography variant="body2" component="span" sx={{ opacity: 0.72 }}>
                &nbsp;than last month
              </Typography>
            </Stack>
          </Stack>
          <ReactApexChart
            type="area"
            series={[{ data: [prevLabaRugi.jumlahPenjualan, currentLabaRugi.jumlahPenjualan] }]}
            options={chartOptions}
            height={120}
          />
        </>
      ) : (
        'Loading...'
      )}
    </RootStyle>
  );
}
