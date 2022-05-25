import { merge } from 'lodash';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme } from '@mui/material/styles';
import { Card, CardHeader, Box } from '@mui/material';
import Scrollbar from 'components/Scrollbar';

// utils
import { fCurrency } from '../../../../utils/formatNumber';

import BaseOptionChart from '../../../charts/BaseOptionChart';

import { handleGetCoopLabaRugiAnnualData } from '../../../../utils/financeAxios/financeCoopReport';

export default function BalanceStatistics(props: { dateValue: Date }) {
  let [incomeList, setIncomeList] = useState<number[]>();
  let [expenseList, setExpenseList] = useState<number[]>();

  const theme = useTheme();

  const chartOptions = merge(BaseOptionChart(), {
    chart: { id: 'coop-balance-statistics' },
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
        'Mei',
        'Jun',
        'Jul',
        'Agt',
        'Sep',
        'Okt',
        'Nov',
        'Des'
      ]
    },
    legend: {
      position: 'right' as 'right'
    },
    tooltip: {
      y: {
        formatter: (val: number) => fCurrency(val)
      }
    }
  });

  useEffect(() => {
    const handleSetChartData = async () => {
      let incomeArray: number[] = [];
      let expenseArray: number[] = [];
      const coopAnnualLabaRugiData = await handleGetCoopLabaRugiAnnualData(
        props.dateValue.getFullYear()
      );
      if (coopAnnualLabaRugiData) {
        incomeArray = coopAnnualLabaRugiData.map(
          (labaRugiData: any) =>
            labaRugiData.jumlahSimpananPokok +
            labaRugiData.jumlahSimpananWajib +
            labaRugiData.jumlahBiayaLayanan
        );
        expenseArray = coopAnnualLabaRugiData.map(
          (labaRugiData: any) => labaRugiData.biayaSisaHasilUsaha + labaRugiData.biayaOperasi
        );
      }
      for (let i = incomeArray.length; i < 12; i++) {
        incomeArray.push(0);
        expenseArray.push(0);
      }

      setIncomeList(incomeArray);
      setExpenseList(expenseArray);
    };
    handleSetChartData();
  }, [props.dateValue]);

  return (
    <>
      {incomeList !== undefined && expenseList !== undefined ? (
        <Card>
          <CardHeader title="Statistik Saldo Koperasi" />
          <Scrollbar>
            <Box dir="ltr">
              <ReactApexChart
                type="bar"
                series={[
                  { name: 'Pendapatan', data: incomeList },
                  { name: 'Pengeluaran', data: expenseList }
                ]}
                options={chartOptions}
                height={364}
                width={900}
              />
            </Box>
          </Scrollbar>
        </Card>
      ) : null}
    </>
  );
}
