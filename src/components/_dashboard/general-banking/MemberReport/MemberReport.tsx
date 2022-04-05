// material
import { Card, Grid } from '@mui/material';

import SimpananPokok from './SimpananPokok';
import SimpananWajib from './SimpananWajib';
import SisaHasilUsaha from './SisaHasilUsaha';

export default function MemberReport(props: { dateValue: Date }) {
  return (
    <Card sx={{ padding: 5 }}>
      <SimpananPokok />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <SimpananWajib dateValue={props.dateValue} />
        </Grid>
        <Grid item xs={12} md={6}>
          <SisaHasilUsaha dateValue={props.dateValue} />
        </Grid>
      </Grid>
    </Card>
  );
}
