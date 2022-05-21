import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Box, Card, Divider, CardHeader, useMediaQuery } from '@mui/material';
import Scrollbar from 'components/Scrollbar';

import { handleGetLabaRugiInfo } from '../../../../utils/financeAxios/financeReport';

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

export default function ExpensesCategories(props: { dateValue: Date }) {
  const { user } = useAuth();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [chartData, setChartData] = useState<number[]>();

  const [chartOptions] = useState<any>({
    chart: { id: 'banking-expense-categories' },
    labels: [
      'Biaya Produksi Produk Terjual',
      'Biaya Simpanan Pokok',
      'Biaya Simpanan Wajib',
      'Biaya Operasi'
    ],
    colors: [
      theme.palette.primary.main,
      theme.palette.info.darker,
      theme.palette.chart.yellow[0],
      theme.palette.chart.blue[0]
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
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const currentPeriodString =
          props.dateValue.getFullYear() + '-' + (props.dateValue.getMonth() + 1) + '-1';
        const currentLabaRugiData = await handleGetLabaRugiInfo(currentPeriodString);
        if (currentLabaRugiData) {
          const series = [
            currentLabaRugiData.biayaProduksiProdukTerjual,
            currentLabaRugiData.biayaSimpananPokok,
            currentLabaRugiData.biayaSimpananWajib,
            currentLabaRugiData.biayaOperasi
          ];
          setChartData(series);
        }
      }
    };
    fetchData();
  }, [props.dateValue, user]);

  return (
    <RootStyle>
      <CardHeader title="Expenses Categories" />
      {chartData ? (
        <Scrollbar>
          <Box sx={{ my: 5 }} dir="ltr">
            <ReactApexChart
              options={chartOptions}
              series={chartData}
              type="pie"
              height={isMobile ? 240 : 250}
              width={isMobile ? 700 : 800}
            />
          </Box>
        </Scrollbar>
      ) : null}

      <Divider />
    </RootStyle>
  );
}
