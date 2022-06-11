import { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Typography, Stack, Link } from '@mui/material';
// routes
import { PATH_DASHBOARD } from 'routes/paths';
// utils
import axios from 'utils/axios';
import { fNumber, fPercent } from 'utils/formatNumber';
import { UserManager } from '../../../@types/user';

// ----------------------------------------------------------------------

interface UserActivenessProps {
  user?: UserManager;
  withViewMoreButton?: boolean;
}

export default function UserActiveness({ user, withViewMoreButton }: UserActivenessProps) {
  const [totalActive, setTotalActive] = useState({
    userActivities: 0,
    totalActivities: 0,
    userTransactions: 0,
    totalTransactions: 0,
    finalActiveness: 0
  });
  const { userActivities, totalActivities, userTransactions, totalTransactions, finalActiveness } =
    totalActive;
  const ecommerceActivity = totalTransactions ? userTransactions / totalTransactions : 1;
  const meetingActivity = totalActivities ? userActivities / totalActivities : 1;
  const netActivity = (ecommerceActivity + meetingActivity) / 2;

  const getTotalActive = useCallback(
    () =>
      axios
        .get('activity-logs/annual-summary', {
          params: {
            type: 'presensi_meeting',
            id: user?.id
          }
        })
        .then((response) => {
          const { totalAttendedMeetings, totalMeetings } = response.data.payload;
          setTotalActive((prev) => ({
            ...prev,
            userActivities: totalAttendedMeetings,
            totalActivities: totalMeetings
          }));
        }),
    [user?.id]
  );

  const getTotalTransaction = useCallback(
    () =>
      axios.get('order/annual-summary', { params: { id: user?.id } }).then((response) => {
        const { totalEcommerceActivities, userEcommerceActivites } = response.data.payload;
        setTotalActive((prev) => ({
          ...prev,
          userTransactions: userEcommerceActivites,
          totalTransactions: totalEcommerceActivities
        }));
      }),
    [user?.id]
  );

  const getUserFinalTotalActiveness = () =>
    axios.get('sisa-hasil-usaha/percentage').then((response) => {
      const finalActiveness = response.data.payload;
      setTotalActive((prev) => ({ ...prev, finalActiveness }));
    });

  useEffect(() => {
    getTotalActive();
    getTotalTransaction();
    getUserFinalTotalActiveness();
  }, [getTotalActive, getTotalTransaction]);

  return (
    <>
      <Typography gutterBottom variant="h6" sx={{ mx: '0.5rem' }}>
        Keaktifan Anggota
      </Typography>
      <Card
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 3,
          flexDirection: { xs: 'column', lg: 'row' }
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Stack direction="column" justifyContent="center" spacing={1} sx={{ mt: 2, mb: 1 }}>
            <Stack direction="row" spacing={1} justifyContent="space-between">
              <Typography variant="subtitle2">{`Total Transaksi `}</Typography>
              <Typography variant="subtitle2">{`${fNumber(userTransactions)}`}</Typography>
            </Stack>
            <Stack direction="row" spacing={1} justifyContent="space-between">
              <Typography variant="subtitle2">{`Presensi Meeting `}</Typography>
              <Typography variant="subtitle2">{`${fNumber(userActivities)} / ${fNumber(
                totalActivities
              )}`}</Typography>
            </Stack>
            <Stack direction="row" spacing={1} justifyContent="space-between">
              <Typography variant="subtitle2">{`Persentase Keaktifan Anggota (Personal) `}</Typography>
              <Typography variant="subtitle2">{`${fPercent(netActivity * 100)}`}</Typography>
            </Stack>
            <Stack direction="row" spacing={1} justifyContent="space-between">
              <Typography variant="subtitle2">{`Persentase Keaktifan Anggota (SHU) `}</Typography>
              <Typography variant="subtitle2">{`${fPercent(finalActiveness * 100)}`}</Typography>
            </Stack>
          </Stack>
        </Box>
        <Box sx={{ mr: { lg: 3 }, ml: { lg: 8 }, mt: { xs: 2, lg: 0 }, width: { lg: '25%' } }}>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Typography component="span" variant="h3">
              {fPercent(finalActiveness * 100)}
            </Typography>
          </Box>
        </Box>
      </Card>
      {withViewMoreButton && (
        <Link underline="none" component={RouterLink} to={PATH_DASHBOARD.user.account}>
          <Typography variant="body2" align="right" sx={{ m: '0.5rem', fontWeight: 'bold' }}>
            Lebih lanjut
          </Typography>
        </Link>
      )}
    </>
  );
}
