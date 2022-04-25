import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import searchFill from '@iconify/icons-eva/search-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Box,
  Container,
  OutlinedInput,
  InputAdornment,
  Stack,
  Pagination,
  Typography,
  Button
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { getCourseList } from '../../redux/slices/course';
// redux
import { RootState, useDispatch, useSelector } from '../../redux/store';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { CourseListCard, CourseSort } from '../../components/_dashboard/course';
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

const SORT_OPTIONS = [
  { value: 'TERBARU', label: 'Terbaru' },
  { value: 'TERLAMA', label: 'Terlama' }
];

export default function Course() {
  const dispatch = useDispatch();
  const { currentRole } = useAuth();
  const [filterCourse, setFilterCourse] = useState('');
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('TERBARU');
  const { courseList, totalPage } = useSelector((state: RootState) => state.course);
  const isAdmin = currentRole?.name === 'ADMIN';

  useEffect(() => {
    dispatch(getCourseList(filterCourse, page, sort));
  }, [dispatch, filterCourse, page, sort]);

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleChangeSort = (value?: string) => {
    if (value) {
      setSort(value);
    }
  };

  return (
    <Page title="Course | CoopChick">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading="Course"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Course' }]}
          action={
            isAdmin ? (
              <Button
                variant="contained"
                component={RouterLink}
                to={PATH_DASHBOARD.general.newBlog}
                startIcon={<Icon icon={plusFill} />}
              >
                Buat Course
              </Button>
            ) : null
          }
        />

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <SearchStyle
            value={filterCourse}
            onChange={(e) => setFilterCourse(e.target.value)}
            placeholder="Cari course..."
            startAdornment={
              <InputAdornment position="start">
                <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            }
            sx={{ mb: 1 }}
          />
          <CourseSort query={sort} options={SORT_OPTIONS} onSort={handleChangeSort} />
        </Stack>

        {courseList.length > 0 ? (
          <CourseListCard courseList={courseList} />
        ) : (
          <Typography>No Course with title "{filterCourse}" found</Typography>
        )}

        {totalPage > 0 && (
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Pagination count={totalPage} page={page} onChange={handleChangePage} color="primary" />
          </Box>
        )}
      </Container>
    </Page>
  );
}
