import { useEffect } from 'react';
import { paramCase } from 'change-case';
import { useParams } from 'react-router-dom';
import { capitalize } from 'lodash';
// material
import { Container, Grid, Card, Typography } from '@mui/material';
// redux
import { useDispatch, useSelector, RootState } from '../../redux/store';
import { getUserList } from '../../redux/slices/user';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { UploadAvatar } from 'components/upload';

// ----------------------------------------------------------------------

export default function UserCreate() {
  const dispatch = useDispatch();
  const { name = '' } = useParams();
  const { userList } = useSelector((state: RootState) => state.user);
  const currentUser = userList.find((user) => paramCase(user.displayName) === name);

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

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 10, px: 3 }}>
              <UploadAvatar accept="image/*" file={currentUser?.photoURL || null} disabled={true} />
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    Name
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <Typography variant="body1">{currentUser?.displayName || '-'}</Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    Email Address
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <Typography variant="body1">{currentUser?.email || '-'}</Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    Phone Number
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <Typography variant="body1">{currentUser?.phoneNumber || '-'}</Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    Country
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <Typography variant="body1">{currentUser?.country || '-'}</Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    State/Region
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <Typography variant="body1">{currentUser?.state || '-'}</Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    City
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <Typography variant="body1">{currentUser?.city || '-'}</Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    Address
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <Typography variant="body1">{currentUser?.address || '-'}</Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    Zip Code
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <Typography variant="body1">{currentUser?.zipCode || '-'}</Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    Assigned Roles
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <Typography variant="body1">
                    {currentUser?.roles.map((role) => capitalize(role.name)).join(', ')}
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
