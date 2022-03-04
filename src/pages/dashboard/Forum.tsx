import { Icon } from '@iconify/react';
import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import roundAccountBox from '@iconify/icons-ic/round-account-box';
// material
import { Button, Container } from '@mui/material';
// redux
import { RootState, useDispatch, useSelector } from '../../redux/store';
import { getPosts } from '../../redux/slices/user';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
// import useAuth from '../../hooks/useAuth';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { ForumPost } from '../../components/_dashboard/forum';

export default function Forum() {
  // const { user } = useAuth();
  const dispatch = useDispatch();
  const { posts } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <Page title="Forum | CoopChick">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading="Forum Discussion"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Forum', href: PATH_DASHBOARD.general.forum }
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.general.myforum}
              startIcon={<Icon icon={roundAccountBox} />}
            >
              My Forum
            </Button>
          }
        />
        <ForumPost posts={posts} />
      </Container>
    </Page>
  );
}
