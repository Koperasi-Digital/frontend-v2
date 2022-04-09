import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import { useEffect } from 'react';
// material
import { Grid, Button, Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import useAuth from '../../hooks/useAuth';
import { getBlogByUserId } from '../../redux/slices/blog';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// @types
import { BlogState } from '../../@types/blog';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { BlogOwnPostCard } from '../../components/_dashboard/blog';

export default function MyBlog() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { ownPosts } = useSelector((state: { blog: BlogState }) => state.blog);

  useEffect(() => {
    dispatch(getBlogByUserId(user?.id));
  }, [dispatch, user]);

  return (
    <Page title="Blogku | CoopChick">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading="Blogku"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Blogs',
              href: PATH_DASHBOARD.general.blogs
            },
            { name: 'Blogku' }
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.general.newBlog}
              startIcon={<Icon icon={plusFill} />}
            >
              Buat Blog
            </Button>
          }
        />

        <Grid container spacing={3}>
          {ownPosts.map((post) => (
            <BlogOwnPostCard key={post.id} post={post} />
          ))}
        </Grid>
      </Container>
    </Page>
  );
}
