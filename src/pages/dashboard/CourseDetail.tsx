import { Icon } from '@iconify/react';
import { useParams } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import expandIcon from '@iconify/icons-eva/chevron-down-fill';
import { useEffect } from 'react';
// material
import {
  Container,
  Typography,
  Stack,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button
} from '@mui/material';
// redux
import { RootState, useDispatch, useSelector } from '../../redux/store';
import { getCourseById } from '../../redux/slices/course';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import useAuth from 'hooks/useAuth';
import PermissionDenied from 'components/PermissionDenied';

export default function Course() {
  const dispatch = useDispatch();
  const { id = '' } = useParams();
  const { course, error } = useSelector((state: RootState) => state.course);
  const { currentRole } = useAuth();
  const isAdmin = currentRole?.name === 'ADMIN';

  useEffect(() => {
    if (parseInt(id) > 0) {
      dispatch(getCourseById(parseInt(id)));
    }
  }, [dispatch, id]);

  return (
    <Page title="Course Detail | CoopChick">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading="Course Detail"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Course', href: PATH_DASHBOARD.general.course },
            { name: course ? course.title : 'Title' }
          ]}
        />

        {error ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h6">404 Post not found</Typography>
          </Box>
        ) : course && (course.is_published || isAdmin) ? (
          <>
            <Typography variant="h2" gutterBottom>
              {course.title}
            </Typography>
            <Stack sx={{ my: 3, flexDirection: { xs: 'column', md: 'row' } }}>
              <Box
                component="img"
                alt="cover"
                src={course.cover}
                sx={{
                  width: 300,
                  height: 250,
                  borderRadius: 1
                }}
              />
              <Typography
                variant="h6"
                sx={{ mx: { xs: 0, md: 2 }, my: { xs: 1, md: 0 } }}
                gutterBottom
              >
                {course.description}
              </Typography>
            </Stack>
            <Typography
              variant="h6"
              sx={{ my: 2 }}
              gutterBottom
            >{`Terdapat ${course.course_items.length} materi dalam course ini`}</Typography>
            {course.course_items.map((item, id) => {
              return (
                <Accordion key={id}>
                  <AccordionSummary expandIcon={<Icon icon={expandIcon} width={20} height={20} />}>
                    <Typography variant="subtitle1">
                      {id + 1}. {item.title}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography style={{ textDecoration: 'none', color: 'inherit' }}>
                        {item.description}
                      </Typography>
                      <Button component={RouterLink} to={`page/${id + 1}`}>
                        See Course
                      </Button>
                    </Stack>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </>
        ) : (
          <PermissionDenied />
        )}
      </Container>
    </Page>
  );
}
