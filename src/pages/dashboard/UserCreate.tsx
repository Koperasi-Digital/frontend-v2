import { useEffect, useState } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// material
import { Container, Grid } from '@mui/material';
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
import UserNewForm from '../../components/_dashboard/user/UserNewForm';
import { AccountAddressBook } from 'components/_dashboard/user/account';

// ----------------------------------------------------------------------

export default function UserCreate() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { name = '' } = useParams();
  const { userList } = useSelector((state: RootState) => state.user);
  const isEdit = pathname.includes('edit');
  const currentUser = userList.find((user) => paramCase(user.displayName) === name);
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
    <Page
      title={`${
        isEdit ? `Edit Pengguna - ${currentUser?.displayName}` : `Buat Pengguna Baru`
      } | CoopChick`}
    >
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Buat Pengguna Baru' : 'Edit Pengguna'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Pengguna', href: PATH_DASHBOARD.user.list },
            { name: !isEdit ? 'Pengguna Baru' : name }
          ]}
        />

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <UserNewForm isEdit={isEdit} currentUser={currentUser} />
          </Grid>
          <Grid item xs={12}>
            <AccountAddressBook addressBook={addressBook} isEdit={true} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
