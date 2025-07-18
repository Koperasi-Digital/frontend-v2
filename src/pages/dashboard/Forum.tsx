import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import searchFill from '@iconify/icons-eva/search-fill';
import { Link as RouterLink } from 'react-router-dom';
import roundAccountBox from '@iconify/icons-ic/round-account-box';
// material
import {
  Box,
  Button,
  Container,
  OutlinedInput,
  InputAdornment,
  Pagination,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
// redux
import { RootState, useDispatch, useSelector } from '../../redux/store';
import { getPosts } from '../../redux/slices/forum';
// routes
import { PATH_DASHBOARD, PATH_PAGE } from '../../routes/paths';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { ForumPost } from '../../components/_dashboard/forum';
import useAuth from '../../hooks/useAuth';

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

export default function Forum() {
  const dispatch = useDispatch();
  const [filterTopic, setFilterTopic] = useState('');
  const { currentRole } = useAuth();
  const isCustomer = currentRole?.name === 'CUSTOMER';
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const { posts, totalPage, refresh } = useSelector((state: RootState) => state.forum);

  useEffect(() => {
    dispatch(getPosts(filterTopic, page));
    if (page > totalPage) {
      setPage(1);
    }
  }, [dispatch, filterTopic, page, totalPage, refresh]);

  return (
    <Page title="Forum | CoopChick">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading="Forum Diskusi"
          links={[
            { name: 'Beranda', href: PATH_PAGE.homepage },
            { name: 'Forum', href: PATH_DASHBOARD.general.forum }
          ]}
          action={
            isCustomer ? null : (
              <Button
                variant="contained"
                component={RouterLink}
                to={PATH_DASHBOARD.general.myforum}
                startIcon={<Icon icon={roundAccountBox} />}
              >
                Forumku
              </Button>
            )
          }
        />
        <SearchStyle
          value={filterTopic}
          onChange={(e) => setFilterTopic(e.target.value)}
          placeholder="Cari topik..."
          startAdornment={
            <InputAdornment position="start">
              <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          }
          sx={{ mb: 4 }}
        />
        {posts.length > 0 ? (
          <ForumPost posts={posts} />
        ) : (
          <Typography>Tidak ada forum dengan topik "{filterTopic}"</Typography>
        )}
        {totalPage > 0 && (
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Pagination count={totalPage} page={page} onChange={handleChange} color="primary" />
          </Box>
        )}
      </Container>
    </Page>
  );
}
