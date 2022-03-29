import { merge } from 'lodash';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Box, Card, Divider, CardHeader, useMediaQuery } from '@mui/material';
//
import { BaseOptionChart } from '../../charts';

import { handleGetLabaRugiInfo } from '../../../utils/financeReport';

// ----------------------------------------------------------------------

// hooks
import useAuth from 'hooks/useAuth';

const RootStyle = styled(Card)(({ theme }) => ({
  '& .apexcharts-legend': {
    width: 240,
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
      flexWrap: 'wrap',
      height: 160,
      width: '50%'
    }
  },
  '& .apexcharts-datalabels-group': {
    display: 'none'
  }
}));

export default function BankingExpensesCategories() {
  const [chartData, setChartData] = useState<{ labels: string[]; data: number[] }>({
    labels: ['Biaya Produksi Produk Terjual', 'Biaya Operasi'],
    data: []
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { user } = useAuth();

  const chartOptions = merge(BaseOptionChart(), {
    labels: chartData.labels,
    colors: [
      theme.palette.primary.main,
      theme.palette.info.darker,
      theme.palette.chart.yellow[0],
      theme.palette.chart.blue[0],
      theme.palette.chart.red[0],
      theme.palette.chart.violet[2],
      theme.palette.chart.violet[0],
      theme.palette.success.darker,
      theme.palette.chart.green[0]
    ],
    stroke: {
      colors: [theme.palette.background.paper]
    },
    fill: { opacity: 0.8 },
    legend: {
      position: 'right',
      itemMargin: {
        horizontal: 10,
        vertical: 5
      }
    },
    responsive: [
      {
        breakpoint: theme.breakpoints.values.sm,
        options: {
          legend: {
            position: 'bottom',
            horizontalAlign: 'left'
          }
        }
      }
    ]
  });

  useEffect(() => {
    const handleSetChartData = async () => {
      const temp: { labels: string[]; data: number[] } = {
        labels: ['Biaya Produksi Produk Terjual', 'Biaya Operasi'],
        data: []
      };
      let tempData = [];
      const date = new Date();
      let periodeString = date.getFullYear() + '-' + (date.getMonth() + 1) + '-1';
      if (user) {
        const labaRugiInfo = await handleGetLabaRugiInfo(user.id, periodeString);
        tempData.push(labaRugiInfo.biayaProduksiProdukTerjual);
        tempData.push(labaRugiInfo.biayaOperasi);
        temp.data = tempData;
        setChartData(temp);
      }
    };

    handleSetChartData();
  }, [user]);

  return (
    <RootStyle>
      <CardHeader title="Expenses Categories" />

      <Box sx={{ my: 5 }} dir="ltr">
        <ReactApexChart
          type="pie"
          series={chartData.data}
          options={chartOptions}
          height={isMobile ? 360 : 240}
        />
      </Box>

      <Divider />
    </RootStyle>
  );
}
