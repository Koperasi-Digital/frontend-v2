import { useEffect } from 'react';
// material
import { Container, Typography } from '@mui/material';
// redux
import { RootState, useDispatch, useSelector } from '../../redux/store';
import { getOwnPosts } from '../../redux/slices/forum';
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
  const { posts } = useSelector((state: RootState) => state.forum);

  useEffect(() => {
    dispatch(getOwnPosts(user?.id));
  }, [dispatch, user]);

  return (
    <Page title="Forumku | CoopChick">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading="Forumku"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Forum', href: PATH_DASHBOARD.general.forum },
            { name: user?.displayName || '' }
          ]}
        />
        {posts.length > 0 ? (
          <MyForumPost posts={posts} />
        ) : (
          <Typography variant="h6">Anda tidak pernah memposting apa pun di forum</Typography>
        )}
      </Container>
    </Page>
  );
}
