import { Icon } from '@iconify/react';
import { useState, useRef } from 'react';
import { useDispatch } from '../../../redux/store';
import { Link as RouterLink } from 'react-router-dom';
import { deleteForum, createComment, deleteComment } from '../../../redux/slices/forum';
import roundSend from '@iconify/icons-ic/round-send';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import closeOutline from '@iconify/icons-eva/close-circle-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import {
  Box,
  Link,
  Card,
  Stack,
  Paper,
  TextField,
  CardProps,
  Typography,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
// @types
import { ForumPostType } from '../../../@types/forum';
// hooks
import useAuth from '../../../hooks/useAuth';
// utils
import { fDateTime } from '../../../utils/formatTime';
import createAvatar from 'utils/createAvatar';
//
import { MAvatar } from 'components/@material-extend';

// ----------------------------------------------------------------------

interface PostCardProps extends CardProps {
  post: ForumPostType;
}

export default function ForumPostCard({ post }: PostCardProps) {
  const { user, currentRole } = useAuth();
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const hasComments = post.comments.length > 0;
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const isAdmin = currentRole?.name === 'ADMIN';
  const forumCanBeDeleted = post.author.id === user?.id || isAdmin ? true : false;
  const postAvatar = post.author.photoURL ? null : createAvatar(post.author.displayName);
  const userAvatar = user?.photoURL ? null : createAvatar(user?.displayName);

  const handleChangeMessage = (value: string) => {
    setMessage(value);
  };

  const onClickAddComment = () => {
    if (message === '') {
      console.log('you need to input message');
    } else {
      dispatch(createComment(user?.id, parseInt(post.id), message));
      setMessage('');
    }
  };

  return (
    <Card>
      <CardHeader
        disableTypography
        avatar={
          <MAvatar
            src={post.author.photoURL || undefined}
            alt={post.author.displayName}
            color={post.author.photoURL ? 'default' : postAvatar!.color}
          >
            {postAvatar?.name}
          </MAvatar>
        }
        title={
          <Link to="#" variant="subtitle2" color="text.primary" component={RouterLink}>
            {post.author.displayName}
          </Link>
        }
        subheader={
          <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
            {fDateTime(post.created_at)}
          </Typography>
        }
        action={
          forumCanBeDeleted ? (
            <>
              <IconButton ref={ref} onClick={() => setIsOpen(true)}>
                <Icon icon={moreVerticalFill} width={20} height={20} />
              </IconButton>
              <Menu
                open={isOpen}
                anchorEl={ref.current}
                onClose={() => setIsOpen(false)}
                PaperProps={{
                  sx: { width: 200, maxWidth: '100%' }
                }}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem
                  onClick={() => dispatch(deleteForum(parseInt(post.id)))}
                  sx={{ color: 'text.secondary' }}
                >
                  <ListItemIcon>
                    <Icon icon={trash2Outline} width={24} height={24} />
                  </ListItemIcon>
                  <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
                </MenuItem>
              </Menu>
            </>
          ) : null
        }
      />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Typography variant="h3">{post.topic}</Typography>
        <Typography variant="body1">{post.message}</Typography>
        {post.media ? (
          <Box sx={{ position: 'relative', pt: 'calc(100% / 16 * 9)' }}>
            <Box
              component="img"
              alt="post media"
              src={post.media}
              sx={{
                top: 0,
                width: 1,
                height: 1,
                borderRadius: 1,
                objectFit: 'cover',
                position: 'absolute'
              }}
            />
          </Box>
        ) : (
          <></>
        )}
        {hasComments && (
          <Stack spacing={1.5}>
            {post.comments.map((comment) => {
              const defaultAvatar = comment.author.photoURL
                ? null
                : createAvatar(comment.author.displayName);
              return (
                <Stack key={comment.id} direction="row" spacing={2}>
                  <MAvatar
                    src={comment.author.photoURL || undefined}
                    alt={comment.author.displayName}
                    color={comment.author.photoURL ? 'default' : defaultAvatar!.color}
                  >
                    {defaultAvatar?.name}
                  </MAvatar>
                  <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: 'background.neutral' }}>
                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      alignItems={{ sm: 'center' }}
                      justifyContent="space-between"
                      sx={{ mb: 0.5 }}
                    >
                      <Typography variant="subtitle2">{comment.author.displayName}</Typography>
                      <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        alignItems={{ sm: 'center' }}
                        justifyContent="space-between"
                        spacing={0.5}
                      >
                        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                          {fDateTime(comment.created_at)}
                        </Typography>
                        {comment.author.id === user?.id || isAdmin ? (
                          <IconButton
                            onClick={() => dispatch(deleteComment(parseInt(comment.id)))}
                            size={'small'}
                          >
                            <Icon icon={closeOutline} width={12} height={12} />
                          </IconButton>
                        ) : null}
                      </Stack>
                    </Stack>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {comment.message}
                    </Typography>
                  </Paper>
                </Stack>
              );
            })}
          </Stack>
        )}

        <Stack direction="row" alignItems="center">
          <MAvatar
            src={post.author.photoURL || undefined}
            alt={post.author.displayName}
            color={post.author.photoURL ? 'default' : userAvatar!.color}
          >
            {userAvatar?.name}
          </MAvatar>
          <TextField
            fullWidth
            size="small"
            value={message}
            placeholder="Tulis komen di sini…"
            onChange={(event) => handleChangeMessage(event.target.value)}
            sx={{
              ml: 2,
              mr: 1,
              '& fieldset': {
                borderWidth: `1px !important`,
                borderColor: (theme) => `${theme.palette.grey[500_32]} !important`
              }
            }}
          />
          <IconButton onClick={() => onClickAddComment()}>
            <Icon icon={roundSend} width={24} height={24} />
          </IconButton>
        </Stack>
      </Stack>
    </Card>
  );
}
