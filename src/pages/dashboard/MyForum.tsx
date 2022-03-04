import { useEffect } from 'react';
// material
import { Container, Typography } from '@mui/material';
// redux
import { RootState, useDispatch, useSelector } from '../../redux/store';
import { getPosts } from '../../redux/slices/user';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useAuth from '../../hooks/useAuth';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { MyForumPost } from '../../components/_dashboard/forum';

export default function MyForum() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { posts } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <Page title="My Forum | CoopChick">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading="My Forum"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Forum', href: PATH_DASHBOARD.general.forum },
            { name: user?.displayName || '' }
          ]}
        />
        {posts.length > 0 ? (
          <MyForumPost posts={posts} />
        ) : (
          <Typography variant="h6">You never post anything in the Forum</Typography>
        )}
      </Container>
    </Page>
  );
}
