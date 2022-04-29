import { merge } from 'lodash';
import { Icon } from '@iconify/react';
import ReactApexChart from 'react-apexcharts';
import trendingUpFill from '@iconify/icons-eva/trending-up-fill';
import trendingDownFill from '@iconify/icons-eva/trending-down-fill';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Typography, Stack } from '@mui/material';
// utils
import { fNumber, fPercent } from '../../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../../charts';
import { ProductAnnualReportItem } from '../../../../@types/seller-center';
import useAuth from 'hooks/useAuth';
import { useEffect, useState } from 'react';
import { getProductAnnualReport } from 'utils/sellerCenterAxios/sellerDashboard';

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

const PERCENT = 2.6;

export default function ProductSold() {
  const { user } = useAuth();
  const storeId = user!.store.id;
  const [productAnnualReport, setProductAnnualReport] = useState<ProductAnnualReportItem[]>([]);
  const [totalSold, setTotalSold] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getProductAnnualReport(storeId);
      setProductAnnualReport(response);
      setTotalSold(response[0].total);
    };
    fetchData();
  }, [storeId]);

  const chartOptions = merge(BaseOptionChart(), {
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
          Product Sold
        </Typography>
        <Typography variant="h3" gutterBottom>
          {fNumber(totalSold)}
        </Typography>

        <Stack direction="row" alignItems="center" flexWrap="wrap">
          <IconWrapperStyle
            sx={{
              ...(PERCENT < 0 && {
                color: 'error.main',
                bgcolor: (theme) => alpha(theme.palette.error.main, 0.16)
              })
            }}
          >
            <Icon width={16} height={16} icon={PERCENT >= 0 ? trendingUpFill : trendingDownFill} />
          </IconWrapperStyle>

          <Typography variant="subtitle2" component="span">
            {PERCENT > 0 && '+'}
            {fPercent(PERCENT)}
          </Typography>
          <Typography variant="body2" component="span" sx={{ color: 'text.secondary' }}>
            &nbsp;than last week
          </Typography>
        </Stack>
      </Box>

      <ReactApexChart
        type="line"
        series={[{ data: productAnnualReport.map((item) => item.total) }]}
        options={chartOptions}
        width={120}
        height={80}
      />
    </Card>
  );
}
