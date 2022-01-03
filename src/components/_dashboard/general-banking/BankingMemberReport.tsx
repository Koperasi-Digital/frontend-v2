import { useState } from 'react';
import { styled } from '@mui/material/styles';

// material
import { Box, Card, CardHeader, Typography, TextField, Paper } from '@mui/material';

//for calendar
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

// ----------------------------------------------------------------------

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(4),
  textAlign: 'center'
}));

export default function BankingMemberReport() {
  //Date picker
  const [dateValue, setDateValue] = useState<Date | null>(new Date());

  return (
    <>
      <Card>
        <CardHeader title="Cooperation Report" sx={{ mb: 3 }} />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ mb: 10 }}>
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

        <Item>
          <Typography variant="h4" gutterBottom>
            Total simpanan koperasi: Rp4.000.000,00
          </Typography>
        </Item>
        <Item>
          <Typography variant="h6" gutterBottom>
            SHU/anggota: Rp200.000,00
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: (theme) => theme.palette.error.main }}
            gutterBottom
          >
            *SHU = 2% dari total simpanan koperasi
          </Typography>
        </Item>
      </Card>
    </>
  );
}
