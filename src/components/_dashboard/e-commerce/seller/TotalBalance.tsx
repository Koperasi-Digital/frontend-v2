import { merge } from 'lodash';
import { Icon } from '@iconify/react';
import ReactApexChart from 'react-apexcharts';
import trendingUpFill from '@iconify/icons-eva/trending-up-fill';
import trendingDownFill from '@iconify/icons-eva/trending-down-fill';
// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Card, Typography, Stack } from '@mui/material';
// utils
import { fNumber, fPercent } from '../../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../../charts';
import { handleGetAnnualArusKasInfo } from 'utils/financeAxios/financeReport';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
  width: 24,
  height: 24,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: theme.spacing(1),
  color: theme.palette.success.main,
  backgroundColor: alpha(theme.palette.success.main, 0.16)
}));

// ----------------------------------------------------------------------

type ChartData = {
  data: number[];
};

function createTotalBalance(arusKasData: any) {
  const balanceData = arusKasData.map(
    (item: any) => item.jumlahKasAwal + item.kasMasuk - item.kasKeluar
  );
  return [{ data: balanceData }];
}

function createPercent(before: number, after: number) {
  return ((after - before) * 100) / before;
}

const YEAR = new Date().getFullYear().toString();

export default function TotalBalance() {
  const theme = useTheme();

  const [percent, setPercent] = useState<number>(-0.06);
  const [chartData, setChartData] = useState<ChartData[]>();

  useEffect(() => {
    const fetchData = async () => {
      const arusKasData = await handleGetAnnualArusKasInfo(YEAR);
      const data = createTotalBalance(arusKasData);
      const N = data[0].data.length;
      setChartData(data);
      setPercent(createPercent(data[0].data[N - 2], data[0].data[N - 1]));
    };
    fetchData();
  }, []);

  const chartOptions = merge(BaseOptionChart(), {
    colors: [theme.palette.chart.green[0]],
    chart: { animations: { enabled: true }, sparkline: { enabled: true } },
    stroke: { width: 2 },
    tooltip: {
      x: { show: false },
      y: {
        formatter: (seriesName: string) => fNumber(seriesName),
        title: {
          formatter: () => ''
        }
      },
      marker: { show: false }
    }
  });

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2" paragraph>
          Total Saldo
        </Typography>
        <Typography variant="h3" gutterBottom>
          {fNumber(
            chartData && chartData[0].data[chartData[0].data.length - 1]
              ? chartData[0].data[chartData[0].data.length - 1]
              : 0
          )}
        </Typography>

        <Stack direction="row" alignItems="center" flexWrap="wrap">
          <IconWrapperStyle
            sx={{
              ...(percent < 0 && {
                color: 'error.main',
                bgcolor: alpha(theme.palette.error.main, 0.16)
              })
            }}
          >
            <Icon width={16} height={16} icon={percent >= 0 ? trendingUpFill : trendingDownFill} />
          </IconWrapperStyle>

          <Typography variant="subtitle2" component="span">
            {percent > 0 && '+'}
            {fPercent(percent)}
          </Typography>
          <Typography variant="body2" component="span" sx={{ color: 'text.secondary' }}>
            &nbsp;dari bulan lalu
          </Typography>
        </Stack>
      </Box>

      {chartData && (
        <ReactApexChart
          type="line"
          series={chartData}
          options={chartOptions}
          width={120}
          height={80}
        />
      )}
    </Card>
  );
}
