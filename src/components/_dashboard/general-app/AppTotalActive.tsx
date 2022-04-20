import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Typography, Stack, Link, Skeleton } from '@mui/material';
// routes
import { PATH_DASHBOARD } from 'routes/paths';
// utils
import axios from 'utils/axios';
import { fNumber, fPercent } from 'utils/formatNumber';

// ----------------------------------------------------------------------

export default function AppTotalActive() {
  const [totalActive, setTotalActive] = useState({ totalLogs: 0, totalActivities: 0 });
  const { totalLogs, totalActivities } = totalActive;

  const getTotalActive = () =>
    axios
      .get('activity-logs/summary', {
        params: {
          type: 'presensi_meeting'
        }
      })
      .then((response) => {
        const { totalLogs, totalActivities } = response.data.payload;
        setTotalActive({ totalLogs, totalActivities });
      });

  useEffect(() => {
    getTotalActive();
  }, []);

  const renderPercentage = () => {
    if (typeof totalLogs !== 'undefined' && typeof totalActivities !== 'undefined') {
      return totalActivities ? fPercent((totalLogs / totalActivities) * 100) : '100%';
    }
    return <Skeleton width={50} />;
  };

  return (
    <>
      <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle2">Keaktifan Anggota</Typography>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2, mb: 1 }}>
            <Typography variant="subtitle2">{`${fNumber(totalLogs)} / ${fNumber(
              totalActivities
            )}`}</Typography>
          </Stack>
        </Box>

        <Typography component="span" variant="h3">
          {/* use default 100% to prevent divide by zero */}
          {renderPercentage()}
        </Typography>
      </Card>
      <Link underline="none" component={RouterLink} to={PATH_DASHBOARD.user.account}>
        <Typography variant="body2" align="right" sx={{ m: '0.5rem', fontWeight: 'bold' }}>
          Lebih lanjut
        </Typography>
      </Link>
    </>
  );
}
