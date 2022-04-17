import { Icon } from '@iconify/react';
import { capitalCase } from 'change-case';
import { useState, useEffect } from 'react';
import roundVpnKey from '@iconify/icons-ic/round-vpn-key';
import roundAccountBox from '@iconify/icons-ic/round-account-box';
import edit from '@iconify/icons-ic/edit';
// material
import { Container, Tab, Box, Tabs, Grid } from '@mui/material';
// hooks
import useAuth from 'hooks/useAuth';
// redux
import { RootState, useDispatch, useSelector } from 'redux/store';
import { getAddressBook } from 'redux/slices/user';
// routes
import { PATH_DASHBOARD } from 'routes/paths';
// types
import { AuthUser } from '../../@types/authentication';
import { UserManager } from '../../@types/user';
// components
import Page from 'components/Page';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import {
  AccountInformationEdit,
  AccountChangePassword,
  AccountAddressBook
} from 'components/_dashboard/user/account';
import { UserInformationDetail, UserActivityLogs } from 'components/_dashboard/user/detail';

// ----------------------------------------------------------------------

export default function UserAccount() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { addressBook } = useSelector((state: RootState) => state.user);

  const [currentTab, setCurrentTab] = useState('detail');

  useEffect(() => {
    dispatch(getAddressBook());
  }, [dispatch]);

  const toUserManager = (user: AuthUser): UserManager => ({
    id: user!.id,
    displayName: user!.displayName,
    email: user!.email,
    photoURL: user!.photoURL,
    roles: user!.roles,
    store: user!.store,
    created_at: user!.created_at,
    updated_at: user!.updated_at
  });

  const currentUser = toUserManager(user);

  const ACCOUNT_TABS = [
    {
      value: 'detail',
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <UserInformationDetail user={currentUser} />
          </Grid>
          <Grid item xs={12}>
            <AccountAddressBook addressBook={addressBook} />
          </Grid>
          <Grid item xs={12}>
            <UserActivityLogs user={currentUser} />
          </Grid>
        </Grid>
      )
    },
    {
      value: 'edit',
      icon: <Icon icon={edit} width={20} height={20} />,
      component: (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <AccountInformationEdit />
          </Grid>
          <Grid item xs={12}>
            <AccountAddressBook addressBook={addressBook} isEdit={true} />
          </Grid>
        </Grid>
      )
    },
    {
      value: 'ubah_password',
      icon: <Icon icon={roundVpnKey} width={20} height={20} />,
      component: <AccountChangePassword />
    }
  ];

  return (
    <Page title="Akun Saya | CoopChick">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading="Akun Saya"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Pengguna', href: PATH_DASHBOARD.user.root },
            { name: 'Akun Saya' }
          ]}
        />

        <Tabs
          value={currentTab}
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile
          onChange={(e, value) => setCurrentTab(value)}
        >
          {ACCOUNT_TABS.map((tab) => (
            <Tab
              disableRipple
              key={tab.value}
              label={capitalCase(tab.value)}
              icon={tab.icon}
              value={tab.value}
            />
          ))}
        </Tabs>

        <Box sx={{ mb: 5 }} />

        {ACCOUNT_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
