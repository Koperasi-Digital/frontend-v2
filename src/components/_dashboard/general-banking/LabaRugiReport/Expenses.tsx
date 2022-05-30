import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import { Icon } from '@iconify/react';
import trendingUpFill from '@iconify/icons-eva/trending-up-fill';
import trendingDownFill from '@iconify/icons-eva/trending-down-fill';
import diagonalArrowRightUpFill from '@iconify/icons-eva/diagonal-arrow-right-up-fill';
// material
import { styled, useTheme } from '@mui/material/styles';
import { Card, Typography, Stack } from '@mui/material';
// utils
import { fCurrency, fPercent } from '../../../../utils/formatNumber';
//
import BaseOptionChart from '../../../charts/BaseOptionChart';

const RootStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  boxShadow: 'none',
  position: 'relative',
  color: theme.palette.warning.darker,
  backgroundColor: theme.palette.warning.lighter
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
  color: theme.palette.warning.lighter,
  backgroundColor: theme.palette.warning.dark
}));

type LabaRugiData = {
  jumlahPenjualan: number;
  sisaHasilUsaha: number;
  biayaProduksiProdukTerjual: number;
  biayaSimpananPokok: number;
  biayaSimpananWajib: number;
  biayaOperasi: number;
  net: number;
};

export default function Expenses(props: {
  currentLabaRugiData: LabaRugiData | undefined;
  prevLabaRugiData: LabaRugiData | undefined;
  expensePercent: number;
}) {
  const theme = useTheme();

  const chartOptions = merge(BaseOptionChart(), {
    colors: [theme.palette.warning.main],
    chart: { id: 'banking-expense-chart', sparkline: { enabled: true } },
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

  return (
    <RootStyle>
      {props.currentLabaRugiData && props.prevLabaRugiData ? (
        <>
          <IconWrapperStyle>
            <Icon icon={diagonalArrowRightUpFill} width={24} height={24} />
          </IconWrapperStyle>

          <Stack spacing={1} sx={{ p: 3 }}>
            <Typography sx={{ typography: 'subtitle2' }}>Pengeluaran</Typography>
            <Typography sx={{ typography: 'h3' }}>
              {fCurrency(
                props.currentLabaRugiData.biayaProduksiProdukTerjual +
                  props.currentLabaRugiData.biayaSimpananPokok +
                  props.currentLabaRugiData.biayaSimpananWajib +
                  props.currentLabaRugiData.biayaOperasi
              )}
            </Typography>
            <Stack direction="row" alignItems="center" flexWrap="wrap">
              <Icon
                width={20}
                height={20}
                icon={props.expensePercent >= 0 ? trendingUpFill : trendingDownFill}
              />
              <Typography variant="subtitle2" component="span" sx={{ ml: 0.5 }}>
                {props.expensePercent > 0 && '+'}
                {fPercent(props.expensePercent)}
              </Typography>
              <Typography variant="body2" component="span" sx={{ opacity: 0.72 }}>
                &nbsp;dari bulan lalu
              </Typography>
            </Stack>
          </Stack>
          <ReactApexChart
            type="area"
            series={[
              {
                data: [
                  props.prevLabaRugiData.biayaProduksiProdukTerjual +
                    props.prevLabaRugiData.biayaSimpananPokok +
                    props.prevLabaRugiData.biayaSimpananWajib +
                    props.prevLabaRugiData.biayaOperasi,
                  props.currentLabaRugiData.biayaProduksiProdukTerjual +
                    props.currentLabaRugiData.biayaSimpananPokok +
                    props.currentLabaRugiData.biayaSimpananWajib +
                    props.currentLabaRugiData.biayaOperasi
                ]
              }
            ]}
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
