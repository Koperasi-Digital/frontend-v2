import { useEffect, useState } from 'react';
import { paramCase } from 'change-case';
import { useParams } from 'react-router-dom';
// material
import { Container, Grid, Typography } from '@mui/material';
// redux
import { useDispatch, useSelector, RootState } from '../../redux/store';
import { getUserList } from '../../redux/slices/user';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// utils
import axios from 'utils/axios';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { UserActivityLogs, UserInformationDetail } from 'components/_dashboard/user/detail';
import { AccountAddressBook } from 'components/_dashboard/user/account';
import { UserActiveness } from 'components/_dashboard/user';

// ----------------------------------------------------------------------

export default function UserDetail() {
  const dispatch = useDispatch();
  const { name = '' } = useParams();
  const { userList } = useSelector((state: RootState) => state.user);
  const currentUser = userList.find((user) => paramCase(user.displayName) === name);
  const isMember = currentUser?.roles.map((roles) => roles.name).includes('MEMBER') || false;
  const [addressBook, setAddressBook] = useState([]);

  const getUserAddressBook = (userId: string) => {
    axios.get(`user-addresses`, { params: { userId } }).then((response) => {
      setAddressBook(response.data.payload);
    });
  };

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      getUserAddressBook(currentUser.id);
    }
  }, [currentUser]);

  return (
    <Page title={`Detail Pengguna - ${currentUser?.displayName} | CoopChick`}>
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading="Detail Pengguna"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Pengguna', href: PATH_DASHBOARD.user.list },
            { name }
          ]}
        />

        {currentUser ? (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <UserInformationDetail user={currentUser} />
            </Grid>
            <Grid item xs={12}>
              <AccountAddressBook addressBook={addressBook} />
            </Grid>
            {isMember && (
              <>
                <Grid item xs={12}>
                  <UserActivityLogs user={currentUser} />
                </Grid>
                <Grid item xs={12}>
                  <UserActiveness user={currentUser} />
                </Grid>
              </>
            )}
          </Grid>
        ) : (
          <Typography variant="body1">No Data</Typography>
        )}
      </Container>
    </Page>
  );
}
