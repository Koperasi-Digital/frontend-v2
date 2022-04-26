// material
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { CourseNewItemForm } from '../../components/_dashboard/course';
import { useParams } from 'react-router-dom';
import { RootState, useDispatch, useSelector } from '../../redux/store';
import { getCourseById } from '../../redux/slices/course';
import { useEffect } from 'react';
import { Typography, Box } from '@mui/material';

// ----------------------------------------------------------------------

export default function CourseNewItem() {
  const dispatch = useDispatch();
  const { id = '' } = useParams();
  const { course } = useSelector((state: RootState) => state.course);

  useEffect(() => {
    if (parseInt(id) > 0) {
      dispatch(getCourseById(parseInt(id)));
    }
  }, [dispatch, id]);
  return (
    <Page title="Buat Course Item | CoopChick">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading="Buat course item baru"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Course List',
              href: PATH_DASHBOARD.general.courseList
            },
            {
              name: course ? course.title : 'Title',
              href: `${PATH_DASHBOARD.general.course}/${id}`
            },
            { name: 'Course item baru' }
          ]}
        />
        {course != null ? (
          <CourseNewItemForm />
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h6">Course not found</Typography>
          </Box>
        )}
      </Container>
    </Page>
  );
}
