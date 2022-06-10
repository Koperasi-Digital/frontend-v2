import { Icon } from '@iconify/react';
import { useState, useRef } from 'react';
import { useDispatch } from '../../../redux/store';
import { Link as RouterLink } from 'react-router-dom';
import { deleteForum, createComment, deleteComment } from '../../../redux/slices/forum';
import roundSend from '@iconify/icons-ic/round-send';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import closeOutline from '@iconify/icons-eva/close-circle-outline';
import { useSnackbar } from 'notistack';
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
  Button,
  DialogTitle,
  DialogContent,
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
import { DialogAnimate } from '../../../components/animate';
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

interface PostCardProps extends CardProps {
  post: ForumPostType;
}

const CardMediaStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
  '@media (min-width: 768px)': {
    paddingTop: '20%'
  }
}));

const CoverImgStyle = styled('img')(({ theme }) => ({
  top: 0,
  width: '100%',
  height: '100%',
  borderRadius: '2%',
  objectFit: 'cover',
  position: 'absolute',
  '@media (min-width: 768px)': {
    width: 'auto',
    height: 'auto',
    minHeight: '20%',
    minWidth: '20%',
    maxHeight: '100%',
    maxWidth: '100%'
  }
}));

export default function ForumPostCard({ post }: PostCardProps) {
  const { user, currentRole } = useAuth();
  const [message, setMessage] = useState('');
  const [isOpenModalDeleteForum, setIsOpenModalDeleteForum] = useState<boolean>(false);
  const [isOpenModalDeleteComment, setIsOpenModalDeleteComment] = useState<boolean>(false);
  const [currentCommentId, setCurrentCommentId] = useState(0);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const hasComments = post.comments.length > 0;
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const isAdmin = currentRole?.name === 'ADMIN';
  const isCustomer = currentRole?.name === 'CUSTOMER';
  const forumCanBeDeleted = post.author.id === user?.id || isAdmin ? true : false;
  const postAvatar = post.author.photoURL ? null : createAvatar(post.author.displayName);
  const userAvatar = user?.photoURL ? null : createAvatar(user?.displayName);

  const handleChangeMessage = (value: string) => {
    setMessage(value);
  };

  const handleOpenModalDeleteComment = (commentId: number) => {
    setCurrentCommentId(commentId);
    setIsOpenModalDeleteComment(!isOpenModalDeleteComment);
  };

  const postComment = async () => {
    try {
      await dispatch(createComment(user?.id, parseInt(post.id), message));
      enqueueSnackbar(`Komentar berhasil dibuat`, { variant: 'success' });
      setMessage('');
    } catch (err) {
      console.error(err);
      enqueueSnackbar(`Gagal membuat komentar, mohon dicoba lagi!`, { variant: 'error' });
    }
  };

  const handlePostComment = () => {
    if (message === '') {
      enqueueSnackbar(`Komentar perlu diisi`, { variant: 'error' });
    } else {
      postComment();
    }
  };

  const handleDeleteForum = async () => {
    setIsOpenModalDeleteForum(!setIsOpenModalDeleteForum);
    try {
      await dispatch(deleteForum(parseInt(post.id)));
      enqueueSnackbar(`Forum berhasil dihapus`, { variant: 'success' });
    } catch (err) {
      console.error(err);
      enqueueSnackbar(`Gagal menghapus forum, mohon dicoba lagi!`, { variant: 'error' });
    }
  };

  const handleDeleteComment = async () => {
    setIsOpenModalDeleteComment(!setIsOpenModalDeleteComment);
    try {
      await dispatch(deleteComment(currentCommentId));
      enqueueSnackbar(`Komentar berhasil dihapus`, { variant: 'success' });
    } catch (err) {
      console.error(err);
      enqueueSnackbar(`Gagal menghapus komentar, mohon dicoba lagi!`, { variant: 'error' });
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
                  onClick={() => setIsOpenModalDeleteForum(!isOpenModalDeleteForum)}
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
          // <Box sx={{ position: 'relative', pt: '20%' }}>
          //   <Box
          //     component="img"
          //     alt="post media"
          //     src={post.media}
          //     sx={{
          //       top: 0,
          //       height: 'auto',
          //       width: 'auto',
          //       maxHeight: 1,
          //       maxWidth: 1,
          //       borderRadius: 1,
          //       objectFit: 'cover',
          //       position: 'absolute'
          //     }}
          //   />
          // </Box>
          <CardMediaStyle>
            <CoverImgStyle alt="post media" src={post.media} />
          </CardMediaStyle>
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
                        direction={{ xs: 'row' }}
                        alignItems={{ sm: 'center' }}
                        justifyContent="space-between"
                        spacing={0.5}
                      >
                        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                          {fDateTime(comment.created_at)}
                        </Typography>
                        {comment.author.id === user?.id || isAdmin ? (
                          <IconButton
                            onClick={() => handleOpenModalDeleteComment(parseInt(comment.id))}
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
                  <DialogAnimate
                    open={isOpenModalDeleteComment}
                    onClose={() => setIsOpenModalDeleteComment(!isOpenModalDeleteComment)}
                  >
                    <DialogTitle sx={{ pb: 1 }}>Delete Komentar ?</DialogTitle>
                    <DialogContent sx={{ overflowY: 'unset' }}>
                      <Typography align={'justify'}>
                        Komentar yang sudah dihapus akan hilang selamanya ! Apakah anda tetap ingin
                        menghapus komentar ?
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-around',
                          p: 1.5
                        }}
                      >
                        <Button variant="contained" onClick={() => handleDeleteComment()}>
                          Delete
                        </Button>
                        <Button
                          color="error"
                          variant="contained"
                          onClick={() => setIsOpenModalDeleteComment(!isOpenModalDeleteComment)}
                        >
                          Cancel
                        </Button>
                      </Box>
                    </DialogContent>
                  </DialogAnimate>
                </Stack>
              );
            })}
          </Stack>
        )}
        {isCustomer ? null : (
          <Stack direction="row" alignItems="center">
            <MAvatar
              src={user?.photoURL || undefined}
              alt={user?.displayName}
              color={user?.photoURL ? 'default' : userAvatar!.color}
            >
              {userAvatar?.name}
            </MAvatar>
            <TextField
              fullWidth
              size="small"
              value={message}
              placeholder="Tulis komentar di sini…"
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
            <IconButton onClick={() => handlePostComment()}>
              <Icon icon={roundSend} width={24} height={24} />
            </IconButton>
          </Stack>
        )}
      </Stack>
      <DialogAnimate
        open={isOpenModalDeleteForum}
        onClose={() => setIsOpenModalDeleteForum(!isOpenModalDeleteForum)}
      >
        <DialogTitle sx={{ pb: 1 }}>Delete Forum ?</DialogTitle>
        <DialogContent sx={{ overflowY: 'unset' }}>
          <Typography align={'justify'}>
            Forum yang sudah dihapus akan hilang selamanya ! Apakah anda tetap ingin menghapus Forum
            ?
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              p: 1.5
            }}
          >
            <Button variant="contained" onClick={() => handleDeleteForum()}>
              Delete
            </Button>
            <Button
              color="error"
              variant="contained"
              onClick={() => setIsOpenModalDeleteForum(!isOpenModalDeleteForum)}
            >
              Cancel
            </Button>
          </Box>
        </DialogContent>
      </DialogAnimate>
    </Card>
  );
}
