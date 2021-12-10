import { Link as RouterLink } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import { Box, Card, CardHeader, Link } from '@mui/material';

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  backgroundColor: theme.palette.background.neutral,
  '& .slick-list': {
    paddingTop: '24px !important'
  }
}));

export default function BankingTransactions() {
  return (
    <>
      <RootStyle>
        <CardHeader title="Transactions" />
        <Box sx={{ p: 3 }}>
          <Link component={RouterLink} to="./transactions" sx={{ typography: 'button' }}>
            See transactions Report
          </Link>
        </Box>
      </RootStyle>
    </>
  );
}
