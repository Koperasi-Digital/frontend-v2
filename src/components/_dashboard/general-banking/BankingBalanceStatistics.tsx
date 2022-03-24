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

// hooks
import useAuth from 'hooks/useAuth';

export default function BankingBalanceStatistics() {
  const [chartData, setChartData] = useState<{ name: string; data: number[] }[]>([
    { name: 'Income', data: [] },
    { name: 'Expense', data: [] }
  ]);

  const { user } = useAuth();

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

  useEffect(() => {
    const handleSetChartData = async () => {
      const temp: { name: string; data: number[] }[] = [
        { name: 'Income', data: [] },
        { name: 'Expense', data: [] }
      ];
      let date = new Date();
      let stop = false;
      let incomeArray: number[] = [];
      let expenseArray: number[] = [];
      while (!stop) {
        if (date.getMonth() === 0) {
          stop = true;
        }
        date.setMonth(date.getMonth() - 1);
        if (user) {
          let periodeString = date.getFullYear() + '-' + (date.getMonth() + 1) + '-1';
          const labaRugiInfo = await handleGetLabaRugiInfo(user.id, periodeString);
          incomeArray.unshift(labaRugiInfo.jumlahPenjualan);
          expenseArray.unshift(labaRugiInfo.biayaProduksiProdukTerjual + labaRugiInfo.biayaOperasi);
        }
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
    handleSetChartData();
  }, [user]);

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
