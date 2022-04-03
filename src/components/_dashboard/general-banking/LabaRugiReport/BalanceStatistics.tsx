import { merge } from 'lodash';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@mui/material';
//
import { BaseOptionChart } from '../../../charts';
// utils
import { fCurrency } from '../../../../utils/formatNumber';

import { handleGetLabaRugiInfo } from '../../../../utils/financeReport';

// hooks
import useAuth from 'hooks/useAuth';

export default function BalanceStatistics(props: { dateValue: Date }) {
  const [chartData, setChartData] = useState<{ name: string; data: number[] }[]>([
    { name: 'Income', data: [] },
    { name: 'Expense', data: [] }
  ]);

  const { user } = useAuth();

  const chartOptions = merge(BaseOptionChart(), {
    chart: { id: 'banking-balance-statistics' },
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
    console.log('Masuk useeffect sini');
    const handleSetChartData = async () => {
      if (user) {
        let month = props.dateValue.getMonth();
        const temp: { name: string; data: number[] }[] = [
          { name: 'Income', data: [] },
          { name: 'Expense', data: [] }
        ];
        let incomeArray: number[] = [];
        let expenseArray: number[] = [];
        for (let i = 0; i < 12; i++) {
          if (i <= month) {
            let periodeString = props.dateValue.getFullYear() + '-' + (i + 1) + '-1';
            const labaRugiInfo = await handleGetLabaRugiInfo(user.id, periodeString);
            incomeArray.push(labaRugiInfo.jumlahPenjualan);
            expenseArray.push(labaRugiInfo.biayaProduksiProdukTerjual + labaRugiInfo.biayaOperasi);
          } else {
            incomeArray.push(0);
            expenseArray.push(0);
          }
        }
        temp[0].data = incomeArray;
        temp[1].data = expenseArray;

        setChartData(temp);
      }
    };
    handleSetChartData();
  }, [user, props.dateValue]);

  return (
    <>
      <Card>
        <CardHeader
          title="Balance Statistics"
          subheader="(+43% Income | +12% Expense) than last year"
        />
        <Box sx={{ mt: 3, mx: 3 }} dir="ltr">
          <ReactApexChart type="bar" series={chartData} options={chartOptions} height={364} />
        </Box>
      </Card>
    </>
  );
}
