// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
// utils
import { fDateTime } from '../../../utils/formatTime';
// @types
import { BlogPost } from '../../../@types/blog';
import createAvatar from 'utils/createAvatar';
import { MAvatar } from 'components/@material-extend';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  height: 480,
  position: 'relative',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  [theme.breakpoints.up('md')]: {
    height: 'auto',
    paddingTop: 'calc(100% * 9 / 16)'
  },
  '&:before': {
    top: 0,
    zIndex: 9,
    content: "''",
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: alpha(theme.palette.grey[900], 0.72)
  }
}));

const TitleStyle = styled('h1')(({ theme }) => ({
  top: 0,
  zIndex: 10,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3),
  color: theme.palette.common.white,
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(10)
  }
}));

const FooterStyle = styled('div')(({ theme }) => ({
  bottom: 0,
  zIndex: 10,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'flex-end',
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(2),
  paddingBottom: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('sm')]: {
    alignItems: 'center',
    paddingRight: theme.spacing(3)
  },
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(10)
  }
}));

const CoverImgStyle = styled('img')(({ theme }) => ({
  top: 0,
  zIndex: 8,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
}));

// ----------------------------------------------------------------------

type BlogPostHeroProps = {
  post: BlogPost;
};

export default function BlogPostHero({ post }: BlogPostHeroProps) {
  const { cover, title, author, created_at } = post;
  const postAvatar = post.author.photoURL ? null : createAvatar(post.author.displayName);

  return (
    <RootStyle>
      <CoverImgStyle alt="post cover" src={cover} />

      <TitleStyle sx={{ typography: 'h2' }}>{title}</TitleStyle>

      <FooterStyle>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <MAvatar
            sx={{ width: 48, height: 48 }}
            src={post.author.photoURL || undefined}
            alt={post.author.displayName}
            color={post.author.photoURL ? 'default' : postAvatar!.color}
          >
            {postAvatar?.name}
          </MAvatar>
          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle1" sx={{ color: 'common.white' }}>
              {author.displayName}
            </Typography>
            <Typography variant="body2" sx={{ color: 'grey.500' }}>
              {fDateTime(created_at)}
            </Typography>
          </Box>
        </Box>
      </FooterStyle>
    </RootStyle>
  );
}
