import { styled } from '@mui/material/styles';
import { Box, Card, CardHeader, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import BankingSimpananPokok from './BankingSimpananPokok';
import BankingSimpananWajib from './BankingSimpananWajib';

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  backgroundColor: theme.palette.background.neutral,
  '& .slick-list': {
    paddingTop: '24px !important'
  }
}));

export default function BankingSavings() {
  return (
    <>
      <RootStyle>
        <CardHeader title="Simpanan" />
        <Box sx={{ p: 3 }}>
          <BankingSimpananPokok />
          <BankingSimpananWajib />
          <Box>
            <Link component={RouterLink} to="./transactions" sx={{ typography: 'button' }}>
              See Savings Report
            </Link>
          </Box>
        </Box>
      </RootStyle>
    </>
  );
}
