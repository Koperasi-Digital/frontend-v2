import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme } from '@mui/material/styles';
import { Card, CardHeader, Box } from '@mui/material';
import Scrollbar from 'components/Scrollbar';

// utils
import { fCurrency } from '../../../../utils/formatNumber';

import { handleGetLabaRugiInfo } from '../../../../utils/financeAxios/financeReport';

// hooks
import useAuth from 'hooks/useAuth';

export default function BalanceStatistics(props: { dateValue: Date }) {
  const [chartData, setChartData] = useState<{ name: string; data: number[] }[]>([
    { name: 'Income', data: [] },
    { name: 'Expense', data: [] }
  ]);

  const { user } = useAuth();

  const theme = useTheme();

  const chartOptions = {
    chart: { id: 'banking-balance-statistics' },
    colors: [theme.palette.primary.main, theme.palette.warning.main],
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
    legend: {
      position: 'right' as 'right',
      itemMargin: {
        horizontal: 10,
        vertical: 5
      }
    },
    tooltip: {
      y: {
        formatter: (val: number) => fCurrency(val)
      }
    }
  };

  useEffect(() => {
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
            if (labaRugiInfo) {
              incomeArray.push(labaRugiInfo.jumlahPenjualan + labaRugiInfo.sisaHasilUsaha);
              expenseArray.push(
                labaRugiInfo.biayaProduksiProdukTerjual +
                  labaRugiInfo.biayaSimpananPokok +
                  labaRugiInfo.biayaSimpananWajib +
                  labaRugiInfo.biayaOperasi
              );
            }
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
        <CardHeader title="Balance Statistics" />
        <Scrollbar>
          <Box dir="ltr">
            <ReactApexChart
              type="bar"
              series={chartData}
              options={chartOptions}
              height={364}
              width={900}
            />
          </Box>
        </Scrollbar>
      </Card>
    </>
  );
}
