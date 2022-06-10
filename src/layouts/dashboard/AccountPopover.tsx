import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import { useRef, useEffect, useState } from 'react';
import homeFill from '@iconify/icons-eva/home-fill';
import personFill from '@iconify/icons-eva/person-fill';
import closeFill from '@iconify/icons-eva/close-fill';
import RoundGroups from '@iconify/icons-ic/round-groups';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import { alpha } from '@mui/material/styles';
import { Button, Box, Divider, MenuItem, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useAuth from '../../hooks/useAuth';
import useIsMountedRef from '../../hooks/useIsMountedRef';
// components
import { MIconButton } from '../../components/@material-extend';
import MyAvatar from '../../components/MyAvatar';
import MenuPopover from '../../components/MenuPopover';
import CurrentRoleSwitch from './CurrentRoleSwitch';
import BankingEMoney from 'components/_dashboard/general-banking/BankingEMoney';
import { registerEMoney } from 'redux/slices/emoney';
import { store } from 'redux/store';
import { useDispatch } from 'redux/store';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Beranda',
    icon: homeFill,
    linkTo: '/',
    accessibleRoles: ['CUSTOMER', 'MEMBER', 'ADMIN']
  },
  {
    label: 'Akun Saya',
    icon: personFill,
    linkTo: PATH_DASHBOARD.user.account,
    accessibleRoles: ['CUSTOMER', 'MEMBER', 'ADMIN']
  },
  {
    label: 'Request Anggota Koperasi',
    icon: RoundGroups,
    linkTo: PATH_DASHBOARD.user.memberVerification.request,
    accessibleRoles: ['CUSTOMER']
  }
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const navigate = useNavigate();
  const anchorRef = useRef(null);
  const { user, logout, currentRole } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout?.();
      if (isMountedRef.current) {
        navigate('/');
        handleClose();
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Error, silakan refresh halaman ini', {
        variant: 'error',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
    }
  };

  useEffect(() => {
    const handleCheckEMoney = async (
      hasBeenRedirected: boolean,
      phoneNumber: string,
      paymentType: string,
      countryCode: string
    ) => {
      dispatch(registerEMoney(hasBeenRedirected, phoneNumber, paymentType, countryCode));
    };
    const emoney = store.getState().emoney;
    if (
      emoney.phoneNumber &&
      emoney.paymentType &&
      emoney.countryCode &&
      emoney.registerStep === 1
    ) {
      handleCheckEMoney(
        emoney.hasBeenRedirected,
        emoney.phoneNumber,
        emoney.paymentType,
        emoney.countryCode
      );
    }
  }, [dispatch]);

  return (
    <>
      <MIconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
            }
          })
        }}
      >
        <MyAvatar />
      </MIconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {user?.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box sx={{ py: 1, px: 2.5 }}>
          <BankingEMoney />
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box sx={{ p: 2, pt: 1.5 }}>
          <CurrentRoleSwitch />
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.filter((option) =>
          currentRole ? option.accessibleRoles.includes(currentRole.name) : true
        ).map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: 'body2', py: 1, px: 2.5, whiteSpace: 'inherit' }}
          >
            <Box
              component={Icon}
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24
              }}
            />

            {option.label}
          </MenuItem>
        ))}

        <Divider sx={{ my: 1 }} />

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button fullWidth color="inherit" variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
