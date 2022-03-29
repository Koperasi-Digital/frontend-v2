import { useState } from 'react';

// material
import { Box, Typography, TextField, Card, Grid, Stack } from '@mui/material';

//for calendar
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

export default function PeriodicMemberReport() {
  //Date picker
  const [dateValue, setDateValue] = useState<Date | null>(new Date());

  return (
    <>
      <Card sx={{ margin: 5, padding: 10, borderColor: 'red' }}>
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
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Stack direction="row" spacing={5} justifyContent="center">
              <Typography variant="h6" gutterBottom>
                Simpanan wajib : Rp 500.000,00
              </Typography>
              <Typography variant="body1" gutterBottom>
                Lunas
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6} textAlign={'center'}>
            <Typography variant="h6" gutterBottom sx={{ marginBottom: 2 }}>
              SHU/anggota: Rp200.000,00
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: (theme) => theme.palette.error.main }}
              gutterBottom
            >
              *SHU = 2% dari total simpanan koperasi
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
