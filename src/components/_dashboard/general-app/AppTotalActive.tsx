import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Typography, Stack, Link } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// utils
import { fNumber, fPercent } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

const PERCENT = 95;
const TOTAL_ACTIVE = 19;
const TOTAL_ACTIVITIES = 20;

export default function AppTotalActive() {
  return (
    <>
      <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle2">Total Active</Typography>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2, mb: 1 }}>
            <Typography variant="subtitle2">{`${fNumber(TOTAL_ACTIVE)} / ${fNumber(
              TOTAL_ACTIVITIES
            )}`}</Typography>
          </Stack>
        </Box>

        <Typography component="span" variant="h3">
          {fPercent(PERCENT)}
        </Typography>
      </Card>
      <Link underline="none" component={RouterLink} to={PATH_DASHBOARD.general.faq}>
        <Typography variant="body2" align="right" sx={{ m: '0.5rem', fontWeight: 'bold' }}>
          Learn More
        </Typography>
      </Link>
    </>
  );
}
