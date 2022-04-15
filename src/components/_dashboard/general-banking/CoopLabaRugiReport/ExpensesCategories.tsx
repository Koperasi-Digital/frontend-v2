import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Box, Card, Divider, CardHeader, useMediaQuery } from '@mui/material';

import { handleGetCoopLabaRugiInfo } from '../../../../utils/financeAxios/financeCoopReport';

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [chartData, setChartData] = useState<number[]>([]);

  const [chartOptions] = useState<any>({
    chart: { id: 'coop-expense-categories' },
    labels: ['Biaya Sisa Hasil Usaha', 'Biaya Operasi'],
    colors: [theme.palette.primary.main, theme.palette.info.darker],
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
      const currentPeriodString =
        props.dateValue.getFullYear() + '-' + (props.dateValue.getMonth() + 1) + '-1';
      const currentCoopLabaRugiData = await handleGetCoopLabaRugiInfo(currentPeriodString);
      const series = [
        currentCoopLabaRugiData.biayaSisaHasilUsaha,
        currentCoopLabaRugiData.biayaOperasi
      ];
      setChartData(series);
    };
    fetchData();
  }, [props.dateValue]);

  return (
    <RootStyle>
      <CardHeader title="Expenses Categories" />

      <Box sx={{ my: 5 }} dir="ltr">
        <ReactApexChart
          options={chartOptions}
          series={chartData}
          type="pie"
          height={isMobile ? 360 : 240}
        />
      </Box>

      <Divider />
    </RootStyle>
  );
}
