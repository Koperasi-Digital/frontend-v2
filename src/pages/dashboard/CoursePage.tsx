import { useEffect } from 'react';
import { sentenceCase } from 'change-case';
import { useParams } from 'react-router-dom';
// material
import { Box, Card, Skeleton, Container, Typography, Pagination } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getPost, getRecentPosts } from '../../redux/slices/blog';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// @types
import { BlogState } from '../../@types/blog';
// components
import Page from '../../components/Page';
import Markdown from '../../components/Markdown';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { BlogPostHero } from '../../components/_dashboard/blog';

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
  const { title = '', page = '' } = useParams();
  const { post, error } = useSelector((state: { blog: BlogState }) => state.blog);

  useEffect(() => {
    dispatch(getPost(title));
    dispatch(getRecentPosts(title));
  }, [dispatch, title]);

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
            { name: sentenceCase(title), href: `${PATH_DASHBOARD.general.course}/${title}` },
            {
              name: page
            }
          ]}
        />

        {post && (
          <Card>
            <BlogPostHero post={post} />

            <Box sx={{ p: { xs: 3, md: 5 } }}>
              <Typography variant="h6" sx={{ mb: 5 }}>
                {post.description}
              </Typography>

              <Markdown children={post.body} />
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Pagination count={3} color="primary" />
              </Box>
            </Box>
          </Card>
        )}

        {!post && SkeletonLoad}

        {error && <Typography variant="h6">404 Post not found</Typography>}
      </Container>
    </Page>
  );
}
