import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Box, Card, CardHeader } from '@mui/material';
// utils
import { fNumber } from '../../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../../charts';

// ----------------------------------------------------------------------

const CHART_DATA = [{ data: [580, 690, 1100, 1200, 1380] }];

export default function AllTimeProducts() {
  const chartOptions = merge(BaseOptionChart(), {
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName: string) => fNumber(seriesName),
        title: {
          formatter: () => ''
        }
      }
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: '28%', borderRadius: 2 }
    },
    xaxis: {
      categories: ['Telur', 'Daging', 'Pakan', 'Vaksin', 'Kandang']
    }
  });

  return (
    <Card>
      <CardHeader
        title="Lima Produk dengan Penjualan Terbesar"
        subheader="Diurutkan dari tertinggi"
      />
      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart type="bar" series={CHART_DATA} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
