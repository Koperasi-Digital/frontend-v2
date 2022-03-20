import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import { useEffect } from 'react';
// material
import { Button, Container } from '@mui/material';
// redux
import { useDispatch, useSelector, RootState } from '../../redux/store';
// import { getPostsInitial, getMorePosts } from '../../redux/slices/blog';
import { getGallery } from '../../redux/slices/user';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// @types
// import { Post, BlogState } from '../../@types/blog';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../../components/_dashboard/blog';
import { ProfileGallery } from '../../components/_dashboard/user/profile';

// ----------------------------------------------------------------------

export default function MyBlog() {
  const dispatch = useDispatch();
  const { gallery } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(getGallery());
  }, [dispatch]);

  return (
    <Page title="My Blog | CoopChick">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading="My Blog"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Blogs',
              href: PATH_DASHBOARD.general.blogs
            },
            { name: 'My Blog' }
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.general.newBlog}
              startIcon={<Icon icon={plusFill} />}
            >
              New Blog
            </Button>
          }
        />
        <ProfileGallery gallery={gallery} />
      </Container>
    </Page>
  );
}
