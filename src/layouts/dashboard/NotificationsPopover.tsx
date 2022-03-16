import { noCase } from 'change-case';
import { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import bellFill from '@iconify/icons-eva/bell-fill';
import clockFill from '@iconify/icons-eva/clock-fill';
import doneAllFill from '@iconify/icons-eva/done-all-fill';
import outlineMailOutline from '@iconify/icons-ic/outline-mail-outline';
import outlineMarkEmailUnread from '@iconify/icons-ic/outline-mark-email-unread';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
// material
import {
  Box,
  List,
  Badge,
  Avatar,
  Tooltip,
  Divider,
  Typography,
  ListItemText,
  ListItemAvatar,
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
import Scrollbar from '../../components/Scrollbar';
import MenuPopover from '../../components/MenuPopover';
import { MIconButton } from '../../components/@material-extend';

// ----------------------------------------------------------------------

function renderContent(notification: Notification) {
  const avatar = (
    <Icon icon={notification.isUnread ? outlineMarkEmailUnread : outlineMailOutline} />
  );

  const title = (
    <Typography variant="subtitle2">
      {notification.title}
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {noCase(notification.description)}
      </Typography>
    </Typography>
  );

  return {
    avatar,
    title
  };
}

function NotificationItem({ notification }: { notification: Notification }) {
  const { avatar, title } = renderContent(notification);

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
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
        </ListItemAvatar>
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
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  // const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const dispatch = useDispatch();
  const { notifications } = useSelector((state: RootState) => state.notification);

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  const totalUnread = notifications.filter((item) => item.isUnread === true).length;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMarkAllAsRead = () => {
    // setNotifications(
    //   notifications.map((notification) => ({
    //     ...notification,
    //     isUnRead: false
    //   }))
    // );
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

          {totalUnread > 0 && (
            <Tooltip title=" Mark all as read">
              <MIconButton color="primary" onClick={handleMarkAllAsRead}>
                <Icon icon={doneAllFill} width={20} height={20} />
              </MIconButton>
            </Tooltip>
          )}
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
