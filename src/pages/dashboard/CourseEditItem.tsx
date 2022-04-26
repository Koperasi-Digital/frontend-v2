// material
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { CourseEditItemForm } from '../../components/_dashboard/course';
import { useParams } from 'react-router-dom';
import { RootState, useDispatch, useSelector } from '../../redux/store';
import { getCourseItemById } from '../../redux/slices/course';
import { useEffect } from 'react';
import { Typography, Box } from '@mui/material';

// ----------------------------------------------------------------------

export default function CourseEditItem() {
  const dispatch = useDispatch();
  const { courseId = '', order = '' } = useParams();
  const { coursePost, refresh } = useSelector((state: RootState) => state.course);

  useEffect(() => {
    if (parseInt(order) > 0 && parseInt(courseId)) {
      dispatch(getCourseItemById(parseInt(courseId), parseInt(order)));
    }
  }, [dispatch, courseId, order, refresh]);

  return (
    <Page title="Edit Course Item | CoopChick">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading="Edit course item"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Course List',
              href: PATH_DASHBOARD.general.courseList
            },
            {
              name: coursePost ? coursePost.courseParentTitle : 'Title',
              href: `${PATH_DASHBOARD.general.course}/${courseId}`
            },
            { name: 'Edit Course Item' }
          ]}
        />
        {coursePost != null ? (
          <CourseEditItemForm post={coursePost} />
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h6">Course not found</Typography>
          </Box>
        )}
      </Container>
    </Page>
  );
}
