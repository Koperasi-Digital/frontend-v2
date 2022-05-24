import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box, TextField } from '@mui/material';
//
import { BaseOptionChart } from '../../../charts';
import { handleGetAnnualLabaRugiInfo } from 'utils/financeAxios/financeReport';

import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

function createMonthlySales(labaRugiData: any, year: string) {
  let i = 0;
  let dataPenjualan = [];
  let dataModal = [];
  while (i < labaRugiData.length) {
    dataPenjualan.push(labaRugiData[i].jumlahPenjualan);
    dataModal.push(labaRugiData[i].biayaOperasi + labaRugiData[i].biayaProduksiProdukTerjual);
    i++;
  }
  while (i < 12) {
    dataPenjualan.push(0);
    dataModal.push(0);
    i++;
  }

  return {
    year: year,
    data: [
      { name: 'Total Penjualan', data: dataPenjualan },
      { name: 'Total Biaya Modal', data: dataModal }
    ]
  };
}

type ChartItem = {
  name: string;
  data: number[];
};

type ChartData = {
  year: string;
  data: ChartItem[];
};

export default function MonthlySales() {
  const YEARS = ['2020', '2021', '2022'];
  const [seriesData, setSeriesData] = useState('2022');
  const [chartData, setChartData] = useState<ChartData>();

  useEffect(() => {
    const fetchData = async () => {
      const labaRugiData = await handleGetAnnualLabaRugiInfo(seriesData);
      const data = createMonthlySales(labaRugiData, seriesData);
      setChartData(data);
    };
    fetchData();
  }, [seriesData]);

  const handleChangeSeriesData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeriesData(event.target.value);
  };

  const chartOptions = merge(BaseOptionChart(), {
    legend: { position: 'top', horizontalAlign: 'right' },
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Okt',
        'Nov',
        'Des'
      ]
    }
  });

  return (
    <Card>
      <CardHeader
        title={`Penjualan Setiap Bulan pada Tahun ${seriesData}`}
        action={
          <TextField
            select
            fullWidth
            value={seriesData}
            SelectProps={{ native: true }}
            onChange={handleChangeSeriesData}
            sx={{
              '& fieldset': { border: '0 !important' },
              '& select': { pl: 1, py: 0.5, pr: '24px !important', typography: 'subtitle2' },
              '& .MuiOutlinedInput-root': { borderRadius: 0.75, bgcolor: 'background.neutral' },
              '& .MuiNativeSelect-icon': { top: 4, right: 0, width: 20, height: 20 }
            }}
          >
            {YEARS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </TextField>
        }
      />

      {chartData && (
        <Box sx={{ mt: 3, mx: 3 }} dir="ltr">
          <ReactApexChart type="area" series={chartData.data} options={chartOptions} height={364} />
        </Box>
      )}
    </Card>
  );
}
