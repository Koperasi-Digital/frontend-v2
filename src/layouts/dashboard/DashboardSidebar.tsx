import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { capitalize } from 'lodash';
// material
import { styled } from '@mui/material/styles';
import { Box, Link, Stack, Drawer, Typography } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Logo from '../../components/Logo';
import MyAvatar from '../../components/MyAvatar';
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
//
import sidebarConfig from './SidebarConfig';
// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.complex
    })
  }
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[500_12]
}));

// ----------------------------------------------------------------------

type DashboardSidebarProps = {
  isOpenSidebar: boolean;
  onCloseSidebar: VoidFunction;
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }: DashboardSidebarProps) {
  const { pathname } = useLocation();
  const { user, currentRole } = useAuth();

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column'
        }
      }}
    >
      <Stack
        spacing={3}
        sx={{
          px: 2.5,
          pt: 3,
          pb: 2
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Box component={RouterLink} to="/" sx={{ display: 'inline-flex' }}>
            <Logo />
          </Box>
        </Stack>
      </Stack>
      <Box sx={{ flexGrow: 1 }}>
        <NavSection navConfig={sidebarConfig} isShow={true} />
      </Box>
      <Stack
        spacing={3}
        sx={{
          position: 'sticky',
          bottom: 0,
          px: 2.5,
          pt: 3,
          pb: 2,
          backgroundColor: (theme) => theme.palette.background.paper
        }}
      >
        <Link underline="none" component={RouterLink} to={PATH_DASHBOARD.user.account}>
          <AccountStyle>
            <MyAvatar />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {user?.displayName}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {capitalize(currentRole?.name)}
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Stack>
    </Scrollbar>
  );

  return (
    <RootStyle>
      <Drawer
        open={isOpenSidebar}
        onClose={onCloseSidebar}
        PaperProps={{
          sx: { width: DRAWER_WIDTH }
        }}
      >
        {renderContent}
      </Drawer>
    </RootStyle>
  );
}
