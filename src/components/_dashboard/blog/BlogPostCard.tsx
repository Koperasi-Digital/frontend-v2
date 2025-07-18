import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Grid, Typography, CardContent, Chip } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// utils
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
// @types
import { BlogList } from '../../../@types/blog';
//
import SvgIconStyle from '../../SvgIconStyle';
import createAvatar from 'utils/createAvatar';
import { MAvatar } from 'components/@material-extend';

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
  index: number;
};

export default function BlogPostCard({ post, index }: BlogPostCardProps) {
  const { id, cover, title, view, author, created_at, tags } = post;
  const linkTo = `${PATH_DASHBOARD.root}/blogs/${id}`;
  const latestPostLarge = index === 0;
  const latestPost = index === 1 || index === 2;
  const postAvatar = author.photoURL ? null : createAvatar(author.displayName);

  const POST_INFO = [{ number: view, icon: eyeFill }];

  return (
    <Grid item xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
      <Card sx={{ position: 'relative' }}>
        <CardMediaStyle
          sx={{
            ...((latestPostLarge || latestPost) && {
              pt: 'calc(100% * 4 / 3)',
              '&:after': {
                top: 0,
                content: "''",
                width: '100%',
                height: '100%',
                position: 'absolute',
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
              }
            }),
            ...(latestPostLarge && {
              pt: {
                xs: 'calc(100% * 4 / 3)',
                sm: 'calc(100% * 3 / 4.66)'
              }
            })
          }}
        >
          <SvgIconStyle
            color="paper"
            src="/static/icons/shape-avatar.svg"
            sx={{
              width: 80,
              height: 36,
              zIndex: 9,
              bottom: -15,
              position: 'absolute',
              ...((latestPostLarge || latestPost) && { display: 'none' })
            }}
          />
          <MAvatar
            sx={{
              zIndex: 9,
              width: 32,
              height: 32,
              position: 'absolute',
              left: 24,
              bottom: -16,
              ...((latestPostLarge || latestPost) && {
                zIndex: 9,
                top: 24,
                left: 24,
                width: 40,
                height: 40
              })
            }}
            src={post.author.photoURL || undefined}
            alt={post.author.displayName}
            color={post.author.photoURL ? 'default' : postAvatar!.color}
          >
            {postAvatar?.name}
          </MAvatar>

          <CoverImgStyle alt={title} src={cover} />
        </CardMediaStyle>

        <CardContent
          sx={{
            pt: 4,
            ...((latestPostLarge || latestPost) && {
              bottom: 0,
              width: '100%',
              position: 'absolute'
            })
          }}
        >
          <Typography
            gutterBottom
            variant="caption"
            sx={{ color: 'text.disabled', display: 'block' }}
          >
            {fDate(created_at)}
          </Typography>

          <TitleStyle
            to={linkTo}
            sx={{
              ...(latestPostLarge && { typography: 'h5', height: 60 }),
              ...((latestPostLarge || latestPost) && {
                color: 'common.white'
              })
            }}
          >
            {title}
          </TitleStyle>

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
                        mx: 0.5,
                        ...((latestPostLarge || latestPost) && {
                          color: 'grey.500'
                        })
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
                  ml: index === 0 ? 0 : 1.5,
                  ...((latestPostLarge || latestPost) && {
                    color: 'grey.500'
                  })
                }}
              >
                <Box component={Icon} icon={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} />
                <Typography variant="caption">{fShortenNumber(info.number)}</Typography>
              </Box>
            ))}
          </InfoStyle>
        </CardContent>
      </Card>
    </Grid>
  );
}
