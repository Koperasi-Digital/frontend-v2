// material
import {
  Grid,
  Stack,
  Select,
  MenuItem,
  SelectChangeEvent,
  Typography,
  Box,
  TextField,
  Card,
  CardHeader,
  FormControl,
  InputLabel
} from '@mui/material';
//for calendar
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import { LabaRugiReport } from 'components/_dashboard/general-banking/LabaRugiReport';
import { NeracaReport } from 'components/_dashboard/general-banking/NeracaReport';
import { ArusKasReport } from 'components/_dashboard/general-banking/ArusKasReport';
import { MemberReport } from 'components/_dashboard/general-banking/MemberReport';

import { useState } from 'react';

export default function Finance() {
  const [menuName, setMenuName] = useState<String>('laporanNeraca');
  const [dateValue, setDateValue] = useState<Date | null>(new Date());

  return (
    <Card sx={{ padding: 5 }}>
      <CardHeader
        title={<Typography variant="h6">Laporan Keuangan Anggota</Typography>}
        sx={{ mb: 3 }}
      />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
            <Typography variant="body1">Pilih laporan yang ingin datanya ditampilkan: </Typography>
            <FormControl>
              <InputLabel>Nama Laporan</InputLabel>
              <Select
                labelId="report-name-select-label"
                id="report-name-select"
                value={menuName}
                label="Nama Laporan"
                onChange={(event: SelectChangeEvent<String>) => {
                  setMenuName(event.target.value);
                }}
              >
                <MenuItem value={'laporanNeraca'}>Laporan Neraca</MenuItem>
                <MenuItem value={'laporanLabaRugi'}>Laporan Laba Rugi</MenuItem>
                <MenuItem value={'laporanArusKas'}>Laporan Arus Kas</MenuItem>
                <MenuItem value={'simpananDanSHU'}>Simpanan dan SHU</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
            <Typography>Pilih rentang waktu laporan untuk ditampilkan: </Typography>
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
          </Stack>
        </Grid>
        {menuName === 'laporanNeraca' ? (
          <>
            <Grid item xs={12}>
              <NeracaReport dateValue={dateValue ? dateValue : new Date()} />
            </Grid>
          </>
        ) : null}
        {menuName === 'laporanLabaRugi' ? (
          <>
            <Grid item xs={12}>
              <LabaRugiReport dateValue={dateValue ? dateValue : new Date()} />
            </Grid>
          </>
        ) : null}
        {menuName === 'laporanArusKas' ? (
          <>
            <Grid item xs={12}>
              <ArusKasReport dateValue={dateValue ? dateValue : new Date()} />
            </Grid>
          </>
        ) : null}
        {menuName === 'simpananDanSHU' ? (
          <>
            <Grid item xs={12}>
              <MemberReport dateValue={dateValue ? dateValue : new Date()} />
            </Grid>
          </>
        ) : null}
      </Grid>
    </Card>
  );
}
