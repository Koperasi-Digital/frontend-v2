import { Icon } from '@iconify/react';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import roundSend from '@iconify/icons-ic/round-send';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import {
  Box,
  Link,
  Card,
  Stack,
  Paper,
  Avatar,
  TextField,
  CardProps,
  Typography,
  CardHeader,
  IconButton
} from '@mui/material';
// @types
import { ForumPostType } from '../../../@types/forum';
// hooks
// import useAuth from '../../../hooks/useAuth';
// utils
import { fDate } from '../../../utils/formatTime';
//
import MyAvatar from '../../MyAvatar';

// ----------------------------------------------------------------------

interface PostCardProps extends CardProps {
  post: ForumPostType;
}

export default function ForumPostCard({ post }: PostCardProps) {
  // const { user } = useAuth();
  const [message, setMessage] = useState('');
  const hasComments = post.comments.length > 0;

  const handleChangeMessage = (value: string) => {
    setMessage(value);
  };

  return (
    <Card>
      <CardHeader
        disableTypography
        avatar={<MyAvatar />}
        title={
          <Link to="#" variant="subtitle2" color="text.primary" component={RouterLink}>
            {post.author.name}
          </Link>
        }
        subheader={
          <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
            {fDate(post.createdAt)}
          </Typography>
        }
        action={
          <IconButton>
            <Icon icon={moreVerticalFill} width={20} height={20} />
          </IconButton>
        }
      />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Typography variant="h3">{post.topic}</Typography>
        <Typography variant="body1">{post.message}</Typography>
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

        {hasComments && (
          <Stack spacing={1.5}>
            {post.comments.map((comment) => (
              <Stack key={comment.id} direction="row" spacing={2}>
                <Avatar alt={comment.author.name} src={comment.author.avatarUrl} />
                <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: 'background.neutral' }}>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    alignItems={{ sm: 'center' }}
                    justifyContent="space-between"
                    sx={{ mb: 0.5 }}
                  >
                    <Typography variant="subtitle2">{comment.author.name}</Typography>
                    <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                      {fDate(comment.createdAt)}
                    </Typography>
                  </Stack>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {comment.message}
                  </Typography>
                </Paper>
              </Stack>
            ))}
          </Stack>
        )}

        <Stack direction="row" alignItems="center">
          <MyAvatar />
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
          <IconButton>
            <Icon icon={roundSend} width={24} height={24} />
          </IconButton>
        </Stack>
      </Stack>
    </Card>
  );
}
