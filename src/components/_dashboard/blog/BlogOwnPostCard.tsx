import { Icon } from '@iconify/react';
import { useState, useRef } from 'react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import editFill from '@iconify/icons-eva/edit-fill';
import { useSnackbar } from 'notistack';
import { styled, useTheme } from '@mui/material/styles';
import { useDispatch } from '../../../redux/store';
import { deleteBlog } from '../../../redux/slices/blog';
import {
  Box,
  Card,
  Grid,
  Typography,
  CardContent,
  Chip,
  Stack,
  MenuItem,
  Button,
  DialogTitle,
  DialogContent,
  ListItemIcon,
  ListItemText,
  IconButton,
  Menu
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// utils
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
import Label from 'components/Label';
// @types
import { BlogList } from '../../../@types/blog';
//
import SvgIconStyle from '../../SvgIconStyle';
import createAvatar from 'utils/createAvatar';
import { MAvatar } from 'components/@material-extend';
import { DialogAnimate } from '../../../components/animate';

// ----------------------------------------------------------------------

const CardMediaStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)'
}));

const TitleStyle = styled(RouterLink)(({ theme }) => ({
  ...theme.typography.subtitle2,
  height: 44,
  color: 'inherit',
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline'
  }
}));

const InfoStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled
}));

const CoverImgStyle = styled('img')(({ theme }) => ({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
}));

// ----------------------------------------------------------------------

type BlogPostCardProps = {
  post: BlogList;
};

export default function BlogOwnPostCard({ post }: BlogPostCardProps) {
  const theme = useTheme();
  const ref = useRef(null);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModalDeleteBlog, setIsOpenModalDeleteBlog] = useState<boolean>(false);
  const { id, cover, title, view, author, created_at, tags } = post;
  const linkTo = `${PATH_DASHBOARD.root}/blogs/${id}`;
  const postAvatar = author.photoURL ? null : createAvatar(author.displayName);
  const { enqueueSnackbar } = useSnackbar();

  const POST_INFO = [{ number: view, icon: eyeFill }];

  const handleDeleteBlog = async () => {
    setIsOpenModalDeleteBlog(!setIsOpenModalDeleteBlog);
    try {
      await dispatch(deleteBlog(parseInt(post.id)));
      enqueueSnackbar(`Blog berhasil dihapus`, { variant: 'success' });
    } catch (err) {
      console.error(err);
      enqueueSnackbar(`Gagal menghapus Blog, mohon dicoba lagi!`, { variant: 'error' });
    }
  };

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card sx={{ position: 'relative' }}>
        <CardMediaStyle>
          <SvgIconStyle
            color="paper"
            src="/static/icons/shape-avatar.svg"
            sx={{
              width: 80,
              height: 36,
              zIndex: 9,
              bottom: -15,
              position: 'absolute'
            }}
          />
          <MAvatar
            sx={{
              zIndex: 9,
              width: 32,
              height: 32,
              position: 'absolute',
              left: 24,
              bottom: -16
            }}
            src={post.author.photoURL || undefined}
            alt={post.author.displayName}
            color={post.author.photoURL ? 'default' : postAvatar!.color}
          >
            {postAvatar?.name}
          </MAvatar>
          <IconButton
            sx={{
              bgcolor: 'background.paper',
              zIndex: 9,
              width: 32,
              height: 32,
              position: 'absolute',
              top: 20,
              right: 20
            }}
            ref={ref}
            onClick={() => setIsOpen(true)}
          >
            <Icon icon={moreVerticalFill} width={30} height={30} />
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
              onClick={() => setIsOpenModalDeleteBlog(!isOpenModalDeleteBlog)}
              sx={{ color: 'text.secondary' }}
            >
              <ListItemIcon>
                <Icon icon={trash2Outline} width={24} height={24} />
              </ListItemIcon>
              <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
            </MenuItem>
            <MenuItem
              component={RouterLink}
              to={`${PATH_DASHBOARD.root}/blogs/edit/${id}`}
              sx={{ color: 'text.secondary' }}
            >
              <ListItemIcon>
                <Icon icon={editFill} width={24} height={24} />
              </ListItemIcon>
              <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
            </MenuItem>
          </Menu>
          <CoverImgStyle alt={title} src={cover} />
        </CardMediaStyle>

        <CardContent
          sx={{
            pt: 4
          }}
        >
          <Stack mb={1} direction="row" alignItems="center" justifyContent="space-between">
            <Typography
              gutterBottom
              variant="caption"
              sx={{ color: 'text.disabled', display: 'block' }}
            >
              {fDate(created_at)}
            </Typography>
            <Label
              variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
              color={(!post.is_verified && 'error') || 'success'}
            >
              {post.is_verified ? 'Verified' : 'Not Verified'}
            </Label>
          </Stack>
          <TitleStyle to={linkTo}>{title}</TitleStyle>

          <InfoStyle>
            <Box>
              {tags ? (
                tags
                  .split(';/;')
                  .slice(0, 2)
                  .map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size={'small'}
                      sx={{
                        mx: 0.5
                      }}
                    />
                  ))
              ) : (
                <Box sx={{ mb: 3 }}></Box>
              )}
            </Box>
            {POST_INFO.map((info, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  ml: index === 0 ? 0 : 1.5
                }}
              >
                <Box component={Icon} icon={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} />
                <Typography variant="caption">{fShortenNumber(info.number)}</Typography>
              </Box>
            ))}
          </InfoStyle>
        </CardContent>
      </Card>
      <DialogAnimate
        open={isOpenModalDeleteBlog}
        onClose={() => setIsOpenModalDeleteBlog(!isOpenModalDeleteBlog)}
      >
        <DialogTitle sx={{ pb: 1 }}>Delete Blog ?</DialogTitle>
        <DialogContent sx={{ overflowY: 'unset' }}>
          <Typography align={'justify'}>
            Blog yang sudah dihapus akan hilang selamanya ! Apakah anda tetap ingin menghapus Blog ?
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              p: 1.5
            }}
          >
            <Button variant="contained" onClick={() => handleDeleteBlog()}>
              Delete
            </Button>
            <Button
              color="error"
              variant="contained"
              onClick={() => setIsOpenModalDeleteBlog(!isOpenModalDeleteBlog)}
            >
              Cancel
            </Button>
          </Box>
        </DialogContent>
      </DialogAnimate>
    </Grid>
  );
}
