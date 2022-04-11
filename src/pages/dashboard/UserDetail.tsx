import { useEffect } from 'react';
import { paramCase } from 'change-case';
import { useParams } from 'react-router-dom';
// material
import { Container, Grid, Typography } from '@mui/material';
// redux
import { useDispatch, useSelector, RootState } from '../../redux/store';
import { getUserList } from '../../redux/slices/user';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { UserActivityLogs, UserInformationDetail } from 'components/_dashboard/user/detail';

// ----------------------------------------------------------------------

export default function UserDetail() {
  const dispatch = useDispatch();
  const { name = '' } = useParams();
  const { userList } = useSelector((state: RootState) => state.user);
  const currentUser = userList.find((user) => paramCase(user.displayName) === name);
  const isMember = currentUser?.roles.map((roles) => roles.name).includes('MEMBER') || false;

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  return (
    <Page title={`User: Detail - ${currentUser?.displayName} | CoopChick`}>
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading="User Detail"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: name }
          ]}
        />

        {currentUser ? (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <UserInformationDetail user={currentUser} />
            </Grid>
            {isMember && (
              <Grid item xs={12}>
                <UserActivityLogs user={currentUser} />
              </Grid>
            )}
          </Grid>
        ) : (
          <Typography variant="body1">No Data</Typography>
        )}
      </Container>
    </Page>
  );
}
