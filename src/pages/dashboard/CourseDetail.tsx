import { useParams } from 'react-router-dom';
import { sentenceCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  CardActionArea,
  Stack
} from '@mui/material';
// redux
// import { useDispatch } from '../../redux/store';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';

export default function Course() {
  // const dispatch = useDispatch();
  const { title = '' } = useParams();

  return (
    <Page title="Course Detail | CoopChick">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading="Course Detail"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Course', href: PATH_DASHBOARD.general.course },
            { name: sentenceCase(title) }
          ]}
        />
        <Typography variant="h2" gutterBottom>
          {sentenceCase(title)}
        </Typography>
        <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
          Description : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean accumsan
          tincidunt elit id malesuada. Aliquam at lectus imperdiet, ultrices tortor ut, imperdiet
          sapien. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus
          mus. Integer a cursus justo. Maecenas commodo eros odio, et vehicula purus suscipit nec.
          Cras metus quam, egestas non maximus ac, imperdiet id orci. Proin ultrices eros a tellus
          laoreet, quis mattis ligula ultricies. Aliquam condimentum iaculis augue, nec volutpat
          turpis laoreet vitae. Vivamus mattis faucibus ultricies.
        </Typography>
        <Card sx={{ mb: 3 }}>
          <CardActionArea component={RouterLink} to={'1'}>
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
                    <Stack alignItems="center">1</Stack>
                  </Grid>
                  <Grid item xs={11}>
                    First Step
                  </Grid>
                </Grid>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card sx={{ mb: 3 }}>
          <CardActionArea component={RouterLink} to={'2'}>
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
                    <Stack alignItems="center">2</Stack>
                  </Grid>
                  <Grid item xs={11}>
                    Second Step
                  </Grid>
                </Grid>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card sx={{ mb: 3 }}>
          <CardActionArea component={RouterLink} to={'3'}>
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
                    <Stack alignItems="center">3</Stack>
                  </Grid>
                  <Grid item xs={11}>
                    Third Step
                  </Grid>
                </Grid>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Container>
    </Page>
  );
}
