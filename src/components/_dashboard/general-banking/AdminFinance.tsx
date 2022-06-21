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
  CardHeader
} from '@mui/material';
//for calendar
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import { CoopArusKasReport } from 'components/_dashboard/general-banking/CoopArusKasReport';
import { CoopNeracaReport } from 'components/_dashboard/general-banking/CoopNeracaReport';
import { CoopLabaRugiReport } from 'components/_dashboard/general-banking/CoopLabaRugiReport';

import { useState } from 'react';

export default function AdminFinance() {
  const [menuName, setMenuName] = useState<String>('laporanNeraca');
  const [dateValue, setDateValue] = useState<Date | null>(new Date());

  return (
    <Card sx={{ p: 5 }}>
      <CardHeader
        title={<Typography variant="h6">Laporan Keuangan Koperasi</Typography>}
        sx={{ mb: 3 }}
      />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
            <Typography variant="body1">Pilih laporan yang ingin datanya ditampilkan: </Typography>
            <Select
              labelId="report-name-select-label"
              id="report-name-select"
              value={menuName}
              label="Report Name"
              onChange={(event: SelectChangeEvent<String>) => {
                setMenuName(event.target.value);
              }}
            >
              <MenuItem value={'laporanNeraca'}>
                <Typography variant="body1">Laporan Neraca</Typography>
              </MenuItem>
              <MenuItem value={'laporanLabaRugi'}>
                <Typography variant="body1">Laporan Laba Rugi</Typography>
              </MenuItem>
              <MenuItem value={'laporanArusKas'}>
                <Typography variant="body1">Laporan Arus Kas</Typography>
              </MenuItem>
            </Select>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
            <Typography variant="body1">Pilih rentang waktu laporan untuk ditampilkan: </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 2, mb: 2 }}>
                <DatePicker
                  disableFuture
                  label="Pilih bulan"
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
              <CoopNeracaReport dateValue={dateValue ? dateValue : new Date()} />
            </Grid>
          </>
        ) : null}
        {menuName === 'laporanLabaRugi' ? (
          <>
            <Grid item xs={12}>
              <CoopLabaRugiReport dateValue={dateValue ? dateValue : new Date()} />
            </Grid>
          </>
        ) : null}
        {menuName === 'laporanArusKas' ? (
          <>
            <Grid item xs={12}>
              <CoopArusKasReport dateValue={dateValue ? dateValue : new Date()} />
            </Grid>
          </>
        ) : null}
      </Grid>
    </Card>
  );
}
