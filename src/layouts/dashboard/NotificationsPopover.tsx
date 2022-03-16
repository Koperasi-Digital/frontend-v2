import { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import bellFill from '@iconify/icons-eva/bell-fill';
import clockFill from '@iconify/icons-eva/clock-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
// material
import {
  Box,
  List,
  Badge,
  Tooltip,
  Divider,
  Typography,
  ListItemText,
  ListItemButton,
  IconButton,
  ListItem
} from '@mui/material';
// redux
import { RootState, useDispatch, useSelector } from '../../redux/store';
import {
  deleteNotification,
  getNotifications,
  readNotification
} from '../../redux/slices/notification';
// utils
import { fToNow } from '../../utils/formatTime';
// types
import { Notification } from '../../@types/notification';
// components
import { onMessageListener } from '../../firebase';
import Scrollbar from '../../components/Scrollbar';
import MenuPopover from '../../components/MenuPopover';
import { MIconButton } from '../../components/@material-extend';

// ----------------------------------------------------------------------

function NotificationItem({ notification }: { notification: Notification }) {
  const title = (
    <>
      <Typography variant="subtitle2">{notification.title}</Typography>
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        {notification.description}
      </Typography>
    </>
  );

  const handleMarkAsRead = () => {
    if (notification.isUnread) {
      readNotification(notification.id);
    }
  };

  const handleDelete = () => {
    deleteNotification(notification.id);
  };

  return (
    <ListItem
      disablePadding
      secondaryAction={
        <Tooltip title="Delete" arrow>
          <IconButton onClick={handleDelete}>
            <Icon icon={trash2Outline} width={20} height={20} />
          </IconButton>
        </Tooltip>
      }
      divider
    >
      <ListItemButton
        onClick={handleMarkAsRead}
        sx={{
          py: 1.5,
          px: 2.5,
          mt: '1px',
          ...(notification.isUnread && {
            bgcolor: 'action.selected'
          })
        }}
      >
        <ListItemText
          primary={title}
          secondary={
            <Typography
              variant="caption"
              sx={{
                mt: 0.5,
                display: 'flex',
                alignItems: 'center',
                color: 'text.disabled'
              }}
            >
              <Box component={Icon} icon={clockFill} sx={{ mr: 0.5, width: 16, height: 16 }} />
              {fToNow(notification.created_at)}
            </Typography>
          }
        />
      </ListItemButton>
    </ListItem>
  );
}

export default function NotificationsPopover() {
  const dispatch = useDispatch();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const { notifications } = useSelector((state: RootState) => state.notification);

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  onMessageListener().then((payload) => {
    dispatch(getNotifications());
  });

  const totalUnread = notifications.filter((item) => item.isUnread === true).length;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MIconButton
        ref={anchorRef}
        size="large"
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
      >
        <Badge badgeContent={totalUnread} color="error">
          <Icon icon={bellFill} width={20} height={20} />
        </Badge>
      </MIconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 360 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {totalUnread} unread messages
            </Typography>
          </Box>
        </Box>

        <Divider />

        <Scrollbar sx={{ maxHeight: 340 }}>
          <List disablePadding>
            {notifications.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </List>
        </Scrollbar>
      </MenuPopover>
    </>
  );
}
