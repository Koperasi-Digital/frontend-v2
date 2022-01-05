// material
import { Container } from '@mui/material';
import { Card, CardHeader, Typography, Paper, Stack, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

// components
import Page from '../../components/Page';
import { PeriodicMemberReport } from '../../components/_dashboard/general-banking';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(4),
  textAlign: 'center'
}));

export default function MemberReport() {
  return (
    <Page title="Banking: Cooperation Report | CoopChick">
      <Container maxWidth={false}>
        <Card>
          <CardHeader title="Cooperation Report" sx={{ mb: 3 }} />
          <Item>
            <Typography variant="h6" gutterBottom>
              Simpanan pokok : Rp 4.000.000,00
            </Typography>
            <Typography variant="body1" gutterBottom>
              Lunas
            </Typography>
          </Item>
          <PeriodicMemberReport />
        </Card>
      </Container>
    </Page>
  );
}
