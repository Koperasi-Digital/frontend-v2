import { Icon } from '@iconify/react';
import chevronRightFill from '@iconify/icons-eva/chevron-right-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Container,
  Stack,
  CardActionArea
} from '@mui/material';

// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useAuth from '../../hooks/useAuth';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { faqData } from '../../components/_dashboard/faq/FAQData';

export default function FAQ() {
  const { currentRole } = useAuth();
  const newData = faqData.filter((data) => {
    return currentRole && data.role.includes(currentRole?.name) ? data : null;
  });
  return (
    <Page title="FAQ | CoopChick">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading="FAQ"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'FAQ' }]}
        />
        <Stack direction="column" alignItems="center" mb={5}>
          <Typography variant="h3" gutterBottom>
            Frequently Asked Questions (FAQ)
          </Typography>
          <Typography variant="h6" gutterBottom>
            Pertanyaan dan jawaban yang sering ditanyakan tentang aplikasi
          </Typography>
        </Stack>
        {newData.map((data, index) => (
          <Card sx={{ mb: 3 }} key={index}>
            <CardActionArea component={RouterLink} to={`${data.id}`}>
              <CardContent>
                <Typography variant="h6">
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item xs={1}>
                      <Stack alignItems="center">{index + 1}.</Stack>
                    </Grid>
                    <Grid item xs={10}>
                      {data?.title}
                    </Grid>
                    <Grid item xs={1}>
                      <Stack alignItems="center">
                        <Icon icon={chevronRightFill} style={{ fontSize: '36px' }} />
                      </Stack>
                    </Grid>
                  </Grid>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Container>
    </Page>
  );
}
