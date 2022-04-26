// material
import {
  Grid,
  Container,
  Stack,
  Select,
  MenuItem,
  SelectChangeEvent,
  Typography,
  Box,
  TextField
} from '@mui/material';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
//for calendar
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

// routes
import { PATH_DASHBOARD } from '../../routes/paths';

import { LabaRugiReport } from 'components/_dashboard/general-banking/LabaRugiReport';
import { NeracaReport } from 'components/_dashboard/general-banking/NeracaReport';
import { ArusKasReport } from 'components/_dashboard/general-banking/ArusKasReport';
import { MemberReport } from 'components/_dashboard/general-banking/MemberReport';

import { useState } from 'react';

export default function Finance() {
  const [menuName, setMenuName] = useState<String>('laporanNeraca');
  const [dateValue, setDateValue] = useState<Date | null>(new Date());

  return (
    <Page title="General: Finance | CoopChick">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading={'Finance Dashboard'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Finance',
              href: PATH_DASHBOARD.finance.root
            },
            { name: 'Home' }
          ]}
        />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
              <Typography variant="body1">
                Pilih laporan yang ingin datanya ditampilkan:{' '}
              </Typography>
              <Select
                labelId="report-name-select-label"
                id="report-name-select"
                value={menuName}
                label="Report Name"
                onChange={(event: SelectChangeEvent<String>) => {
                  setMenuName(event.target.value);
                }}
              >
                <MenuItem value={'laporanNeraca'}>Laporan Neraca</MenuItem>
                <MenuItem value={'laporanLabaRugi'}>Laporan Laba Rugi</MenuItem>
                <MenuItem value={'laporanArusKas'}>Laporan Arus Kas</MenuItem>
                <MenuItem value={'simpananDanSHU'}>Simpanan dan SHU</MenuItem>
              </Select>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
              <Typography>Pilih rentang waktu laporan untuk ditampilkan: </Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ mt: 2, mb: 2 }}
                >
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
      </Container>
    </Page>
  );
}
