import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// material
import { Box, Card, Divider, Skeleton, Container, Typography } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getBlogById, addView } from '../../redux/slices/blog';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// @types
import { BlogState } from '../../@types/blog';
// components
import Page from '../../components/Page';
import Markdown from '../../components/Markdown';
import useAuth from 'hooks/useAuth';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { BlogPostHero, BlogPostTags } from '../../components/_dashboard/blog';
import PermissionDenied from 'components/PermissionDenied';

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

export default function BlogPost() {
  const dispatch = useDispatch();
  const { id = '' } = useParams();
  const { post, error } = useSelector((state: { blog: BlogState }) => state.blog);
  const { user, currentRole } = useAuth();
  const isAdmin = currentRole?.name === 'ADMIN';
  const userPermitted = post?.author.id === user?.id || isAdmin ? true : false;

  useEffect(() => {
    if (parseInt(id) > 0) {
      dispatch(getBlogById(parseInt(id)));
      dispatch(addView(parseInt(id)));
    }
  }, [dispatch, id]);

  return (
    <Page title="Blog Detail | CoopChick">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading="Blog Detail"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Blogs',
              href: PATH_DASHBOARD.general.blogs
            },
            { name: post ? post.title : `Title for ${id}` }
          ]}
        />

        {!post && SkeletonLoad}

        {error ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h6">404 Post not found</Typography>
          </Box>
        ) : post && (post.is_verified || userPermitted) ? (
          <Card>
            <BlogPostHero post={post} />

            <Box sx={{ p: { xs: 3, md: 5 } }}>
              <Typography variant="h6" sx={{ mb: 5 }}>
                {post.description}
              </Typography>

              <Markdown children={post.body} />

              <Box sx={{ my: 5 }}>
                <Divider />
                <BlogPostTags post={post} />
              </Box>
            </Box>
          </Card>
        ) : (
          <PermissionDenied />
        )}
      </Container>
    </Page>
  );
}
