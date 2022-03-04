import { merge } from 'lodash';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@mui/material';
//
import { BaseOptionChart } from '../../charts';
// utils
import { fCurrency } from '../../../utils/formatNumber';

import { handleGetLabaRugiInfo } from '../../../utils/financeReport';

export default function BankingBalanceStatistics() {
  const [chartData, setChartData] = useState<{ name: string; data: number[] }[]>([
    { name: 'Income', data: [] },
    { name: 'Expense', data: [] }
  ]);

  const chartOptions = merge(BaseOptionChart(), {
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
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
    },
    tooltip: {
      y: {
        formatter: (val: number) => fCurrency(val)
      }
    }
  });

  const handleSetChartData = async () => {
    const temp: { name: string; data: number[] }[] = [
      { name: 'Income', data: [] },
      { name: 'Expense', data: [] }
    ];
    let date = new Date();
    let i = 0;
    let incomeArray: number[] = [];
    let expenseArray: number[] = [];
    while (date.getMonth() !== 0) {
      date.setMonth(date.getMonth() - i);
      const labaRugiInfo = await handleGetLabaRugiInfo(date);
      incomeArray.unshift(labaRugiInfo.jumlahPenjualan);
      expenseArray.unshift(labaRugiInfo.biayaProduksiProdukTerjual + labaRugiInfo.biayaOperasi);
      i += 1;
    }
    const paddingNumber = 12 - incomeArray.length;
    for (let i = 0; i < paddingNumber; i++) {
      incomeArray.push(0);
      expenseArray.push(0);
    }
    temp[0].data = incomeArray;
    temp[1].data = expenseArray;
    setChartData(temp);
  };

  useEffect(() => {
    handleSetChartData();
  }, []);

  return (
    <Card>
      <CardHeader
        title="Balance Statistics"
        subheader="(+43% Income | +12% Expense) than last year"
      />
      <Box sx={{ mt: 3, mx: 3 }} dir="ltr">
        <ReactApexChart type="bar" series={chartData} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
