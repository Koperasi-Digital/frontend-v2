import { useEffect } from 'react';
import { Icon } from '@iconify/react';
import chevronRightFill from '@iconify/icons-eva/chevron-right-fill';
import chevronLeftFill from '@iconify/icons-eva/chevron-left-fill';
import { useParams } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Skeleton, Container, Typography, Divider, Button, Stack } from '@mui/material';
// redux
import { RootState, useDispatch, useSelector } from '../../redux/store';
import { getCourseItemById } from '../../redux/slices/course';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import Markdown from '../../components/Markdown';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';

// ----------------------------------------------------------------------

const SkeletonLoad = (
  <>
    <Skeleton width="100%" height={560} variant="rectangular" sx={{ borderRadius: 2 }} />
    <Box sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
      <Skeleton variant="circular" width={64} height={64} />
      <Box sx={{ flexGrow: 1, ml: 2 }}>
        <Skeleton variant="text" height={20} />
        <Skeleton variant="text" height={20} />
        <Skeleton variant="text" height={20} />
      </Box>
    </Box>
  </>
);

export default function CoursePage() {
  const dispatch = useDispatch();
  const { courseId = '', order = '' } = useParams();
  const { coursePost, error } = useSelector((state: RootState) => state.course);
  console.log(coursePost);

  useEffect(() => {
    if (parseInt(order) > 0 && parseInt(courseId)) {
      dispatch(getCourseItemById(parseInt(courseId), parseInt(order)));
    }
  }, [dispatch, courseId, order]);

  return (
    <Page title="Course Page | CoopChick">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading="Course"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Course',
              href: PATH_DASHBOARD.general.course
            },
            {
              name: coursePost ? coursePost.courseParentTitle : 'Course Title',
              href: `${PATH_DASHBOARD.general.course}/${courseId}`
            },
            {
              name: coursePost ? coursePost.course.title : `Page ${order}`
            }
          ]}
        />

        {coursePost && (
          <>
            <Card>
              <Box sx={{ p: { xs: 3, md: 5 } }}>
                <Typography variant="h3" sx={{ mb: 4 }}>
                  {coursePost.course.title}
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {coursePost.course.description}
                </Typography>
                <Markdown children={coursePost.course.body} />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae suscipit odio, a
                accumsan enim. Donec sit amet ultrices nulla. Vestibulum ornare enim quis mi
                venenatis, eget gravida nibh ornare. Morbi iaculis quam ut dolor maximus, quis
                euismod neque porta. Mauris in egestas turpis. Maecenas rhoncus nec lacus quis
                tristique. Aenean venenatis, diam eu blandit volutpat, elit turpis pretium odio,
                vulputate vehicula enim ex sit amet mauris. In accumsan mi sed arcu porttitor
                convallis. Quisque vel orci erat. Mauris cursus porta ornare. Proin ligula nisl,
                gravida elementum consectetur quis, luctus congue arcu. Suspendisse pulvinar
                lobortis diam, ut viverra turpis dapibus vitae. In ac elit lacus. Etiam nec tempor
                lectus, a pellentesque libero. Nam convallis euismod lectus scelerisque laoreet.
                Aliquam aliquet cursus enim in pellentesque. Aenean semper pellentesque neque.
                Quisque nulla metus, fringilla vel eros quis, hendrerit faucibus ligula. Vivamus
                tristique odio vel erat sollicitudin, vitae tincidunt eros feugiat. Nullam et
                egestas odio. Fusce efficitur sapien leo. Proin molestie ipsum eget ligula fringilla
                faucibus. Pellentesque tincidunt ante sit amet nulla consectetur, at lacinia augue
                convallis. Morbi at dolor rhoncus, faucibus risus a, congue massa. Aliquam at dui
                pretium mi vehicula tempus nec id leo. Donec ultrices sapien at rhoncus tristique.
                Mauris commodo feugiat dignissim. Sed eleifend ipsum quis lectus porta, pellentesque
                tempor neque scelerisque. In iaculis, eros in fermentum vehicula, lorem quam
                malesuada ante, a aliquet nisi neque at massa. Nulla sed erat nulla. Sed vel dolor
                vitae ipsum mollis posuere ut vel ipsum. Nullam facilisis elit id metus porttitor
                pellentesque.
              </Box>
            </Card>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mt: 4 }}
            >
              <Button
                variant="contained"
                component={RouterLink}
                to={`../${parseInt(order) - 1}`}
                startIcon={<Icon icon={chevronLeftFill} />}
                sx={{ visibility: coursePost.courseBefore ? undefined : 'hidden' }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                component={RouterLink}
                to={`../${parseInt(order) + 1}`}
                endIcon={<Icon icon={chevronRightFill} />}
                sx={{ visibility: coursePost.courseAfter ? undefined : 'hidden' }}
              >
                Next
              </Button>
            </Stack>
          </>
        )}

        {!coursePost && SkeletonLoad}

        {error && <Typography variant="h6">404 Post not found</Typography>}
      </Container>
    </Page>
  );
}
