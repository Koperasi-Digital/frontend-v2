import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import roundAccountBox from '@iconify/icons-ic/round-account-box';
import searchFill from '@iconify/icons-eva/search-fill';
import { Link as RouterLink } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useCallback, useState } from 'react';
// material
import {
  Box,
  Grid,
  Button,
  Skeleton,
  Container,
  Stack,
  InputAdornment,
  Typography,
  OutlinedInput
} from '@mui/material';
import { styled } from '@mui/material/styles';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getPostsBlogList, getPostsBlogListMore } from '../../redux/slices/blog';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// @types
import { BlogState } from '../../@types/blog';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { BlogPostCard, BlogPostsSort } from '../../components/_dashboard/blog';
import useAuth from '../../hooks/useAuth';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'TERBARU', label: 'Terbaru' },
  { value: 'POPULER', label: 'Populer' },
  { value: 'TERLAMA', label: 'Terlama' }
];

// ----------------------------------------------------------------------
const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`
  }
}));

const SkeletonLoad = (
  <Grid container spacing={3} sx={{ mt: 2 }}>
    {[...Array(4)].map((_, index) => (
      <Grid item xs={12} md={3} key={index}>
        <Skeleton variant="rectangular" width="100%" sx={{ height: 200, borderRadius: 2 }} />
        <Box sx={{ display: 'flex', mt: 1.5 }}>
          <Skeleton variant="circular" sx={{ width: 40, height: 40 }} />
          <Skeleton variant="text" sx={{ mx: 1, flexGrow: 1 }} />
        </Box>
      </Grid>
    ))}
  </Grid>
);

export default function BlogPosts() {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState('TERBARU');
  const [filterTitle, setFilterTitle] = useState('');
  const { posts, hasMore } = useSelector((state: { blog: BlogState }) => state.blog);
  const { currentRole } = useAuth();
  const isCustomer = currentRole?.name === 'CUSTOMER';

  const onScroll = useCallback(() => dispatch(getPostsBlogListMore()), [dispatch]);

  useEffect(() => {
    dispatch(getPostsBlogList(filterTitle, 0, filters));
  }, [dispatch, filterTitle, filters]);

  const handleChangeSort = (value?: string) => {
    if (value) {
      setFilters(value);
    }
  };

  return (
    <Page title="Blogs | CoopChick">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading="Blogs"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Blogs' }]}
          action={
            isCustomer ? null : (
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Button
                  variant="contained"
                  component={RouterLink}
                  to={PATH_DASHBOARD.general.newBlog}
                  startIcon={<Icon icon={plusFill} />}
                >
                  Buat Blog
                </Button>
                <Button
                  sx={{ ml: 1 }}
                  variant="contained"
                  component={RouterLink}
                  to={PATH_DASHBOARD.general.myBlog}
                  startIcon={<Icon icon={roundAccountBox} />}
                >
                  Blogku
                </Button>
              </Stack>
            )
          }
        />

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <SearchStyle
            value={filterTitle}
            onChange={(e) => setFilterTitle(e.target.value)}
            placeholder="Cari judul..."
            startAdornment={
              <InputAdornment position="start">
                <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            }
          />
          <BlogPostsSort query={filters} options={SORT_OPTIONS} onSort={handleChangeSort} />
        </Stack>

        {posts.length > 0 ? (
          <InfiniteScroll
            next={onScroll}
            hasMore={hasMore}
            loader={SkeletonLoad}
            dataLength={posts.length}
            style={{ overflow: 'inherit' }}
          >
            <Grid container spacing={3}>
              {posts.map((post, index) => (
                <BlogPostCard key={post.id} post={post} index={index} />
              ))}
            </Grid>
          </InfiniteScroll>
        ) : (
          <Typography>No Blogs with title "{filterTitle}" found</Typography>
        )}
      </Container>
    </Page>
  );
}
