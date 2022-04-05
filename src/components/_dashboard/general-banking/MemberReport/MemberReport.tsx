// material
import { Card, Typography, Grid } from '@mui/material';

import SimpananPokok from './SimpananPokok';
import SimpananWajib from './SimpananWajib';

export default function MemberReport(props: { dateValue: Date }) {
  return (
    <Card sx={{ padding: 5 }}>
      <SimpananPokok />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <SimpananWajib dateValue={props.dateValue} />
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
  );
}
