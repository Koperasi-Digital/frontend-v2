import { useState } from 'react';
// material
import {
  Container,
  Grid,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem
} from '@mui/material';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';

// routes
import { PATH_DASHBOARD } from '../../routes/paths';

import DisbursementRequestListTable from 'components/_dashboard/general-banking/DisbursementRequestListTable';

export default function DisbursementRequestList() {
  const [status, setStatus] = useState<String>('not-success');
  return (
    <Page title="Daftar Pengajuan Pencairan Dana | CoopChick">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading={'Daftar Pengajuan Pencairan Dana'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Daftar Pengajuan Pencairan' }
          ]}
        />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl>
              <InputLabel>Status disbursement request</InputLabel>
              <Select
                labelId="report-name-select-label"
                id="report-name-select"
                value={status}
                label="Nama Laporan"
                onChange={(event: SelectChangeEvent<String>) => {
                  setStatus(event.target.value);
                }}
              >
                <MenuItem value={'success'}>Berhasil</MenuItem>
                <MenuItem value={'not-success'}>Tidak berhasil</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <DisbursementRequestListTable status={status} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
