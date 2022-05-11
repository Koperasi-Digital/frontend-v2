import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Box, Card, CardHeader, TextField } from '@mui/material';
// utils
import { fNumber } from '../../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../../charts';
import { useEffect, useState } from 'react';
import useAuth from 'hooks/useAuth';
import { getProductStatistics } from 'utils/sellerCenterAxios/sellerDashboard';
import { ProductStatisticsItem } from '../../../../@types/seller-center';

// ----------------------------------------------------------------------

const SORT_DATA = ['Tertinggi', 'Terendah'];

export default function AllTimeProducts() {
  const { user } = useAuth();
  const storeId = user!.store.id;
  const [sortBy, setSortBy] = useState<string>('Tertinggi');
  const [productStatistics, setProductStatistics] = useState<ProductStatisticsItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const sortByTemp = sortBy === 'Tertinggi' ? 'DESC' : 'ASC';
      const response = await getProductStatistics(storeId, sortByTemp);
      setProductStatistics(response);
    };
    fetchData();
  }, [storeId, sortBy]);

  const handleChangeSortByOption = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortBy(event.target.value);
  };

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
      categories: productStatistics.map((item) => item.name)
    }
  });

  return (
    <Card>
      <CardHeader
        title="Statistik Top 5 Produk"
        subheader={'Diurutkan dari ' + sortBy}
        action={
          <TextField
            select
            fullWidth
            value={sortBy}
            SelectProps={{ native: true }}
            onChange={handleChangeSortByOption}
            sx={{
              '& fieldset': { border: '0 !important' },
              '& select': { pl: 1, py: 0.5, pr: '24px !important', typography: 'subtitle2' },
              '& .MuiOutlinedInput-root': { borderRadius: 0.75, bgcolor: 'background.neutral' },
              '& .MuiNativeSelect-icon': { top: 4, right: 0, width: 20, height: 20 }
            }}
          >
            {SORT_DATA.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </TextField>
        }
      />
      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart
          type="bar"
          series={[{ data: productStatistics.map((item) => item.total) }]}
          options={chartOptions}
          height={364}
        />
      </Box>
    </Card>
  );
}
