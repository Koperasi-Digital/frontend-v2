import { styled } from '@mui/material/styles';
import { Box, Card, CardHeader, TextField } from '@mui/material';
import { useState } from 'react';

//for calendar
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import BankingNeracaReport from './BankingNeracaReport';
import BankingLabaRugiReport from './BankingLabaRugiReport';
import BankingArusKasReport from './BankingArusKasReport';

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  backgroundColor: theme.palette.background.neutral,
  '& .slick-list': {
    paddingTop: '24px !important'
  },
  height: 300
}));

export default function BankingReport() {
  //Date picker
  const [dateValue, setDateValue] = useState<Date | null>(new Date());

  return (
    <>
      <RootStyle>
        <CardHeader title="Finance Report" />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 2, mb: 2 }}>
            <DatePicker
              disableFuture
              label="Pilih bulan"
              openTo="year"
              views={['year', 'month']}
              value={dateValue}
              onChange={(newValue) => {
                setDateValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
        </LocalizationProvider>
        <BankingNeracaReport dateValue={dateValue ? dateValue : new Date()} />
        <BankingLabaRugiReport dateValue={dateValue ? dateValue : new Date()} />
        <BankingArusKasReport dateValue={dateValue ? dateValue : new Date()} />
      </RootStyle>
    </>
  );
}
