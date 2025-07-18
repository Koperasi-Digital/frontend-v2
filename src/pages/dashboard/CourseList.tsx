/* eslint-disable @typescript-eslint/dot-notation */
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
// material
import { useTheme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import {
  Card,
  Table,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';
// redux
import { RootState, useDispatch, useSelector } from '../../redux/store';
import { getCourseAdminList, setPublished, deleteCourse } from '../../redux/slices/course';
// routes
import { PATH_DASHBOARD, PATH_PAGE } from '../../routes/paths';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { fDateTime } from '../../utils/formatTime';
import {
  CourseAdminHead,
  CourseAdminToolbar,
  CourseAdminMoreMenu
} from '../../components/_dashboard/course/list';
import createAvatar from 'utils/createAvatar';
import { MAvatar } from 'components/@material-extend';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'title', label: 'Title', alignRight: false },
  { id: 'none1' },
  { id: 'author', label: 'Created By', alignRight: false, disableSort: true },
  { id: 'created_at', label: 'Created At', alignRight: false },
  { id: 'course_item_length', label: 'Item Count', alignRight: false, disableSort: true },
  { id: 'is_published', label: 'Published', alignRight: false },
  { id: 'none2' }
];

// ----------------------------------------------------------------------

type Anonymous = Record<string | number, string>;

function descendingComparator(a: Anonymous, b: Anonymous, orderBy: string) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order: string, orderBy: string) {
  return order === 'desc'
    ? (a: Anonymous, b: Anonymous) => descendingComparator(a, b, orderBy)
    : (a: Anonymous, b: Anonymous) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array: any[], comparator: (a: any, b: any) => number, query: string) {
  const stabilizedThis = array.map((el, index) => [el, index] as const);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_course) => _course.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function CourseList() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { courseAdminList } = useSelector((state: RootState) => state.course);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState('title');
  const [filterTitle, setFilterTitle] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(getCourseAdminList());
  }, [dispatch]);

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByTitle = (filterTitle: string) => {
    setFilterTitle(filterTitle);
  };

  const handleDeleteCourse = async (courseId: number) => {
    try {
      await dispatch(deleteCourse(courseId));
      enqueueSnackbar(`Course berhasil dihapus`, { variant: 'success' });
    } catch (err) {
      console.error(err);
      enqueueSnackbar(`Gagal menghapus Course, mohon dicoba lagi!`, { variant: 'error' });
    }
  };

  const handlePublishCourse = async (courseId: number) => {
    try {
      await dispatch(setPublished(courseId));
      enqueueSnackbar(`Publikasi Course berhasil diubah`, {
        variant: 'success'
      });
    } catch (err) {
      console.error(err);
      enqueueSnackbar(`Gagal mengubah publikasi course, mohon dicoba lagi!`, { variant: 'error' });
    }
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - courseAdminList.length) : 0;

  const filteredCourses = applySortFilter(
    courseAdminList,
    getComparator(order, orderBy),
    filterTitle
  );

  const isCourseNotFound = filteredCourses.length === 0;

  return (
    <Page title="Course List | CoopChick">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading="Course List"
          links={[
            { name: 'Beranda', href: PATH_PAGE.homepage },
            { name: 'Course List', href: PATH_DASHBOARD.general.courseList }
          ]}
        />

        <Card>
          <CourseAdminToolbar filterTitle={filterTitle} onFilterTitle={handleFilterByTitle} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <CourseAdminHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredCourses
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const { id, title, created_at, author, is_published, course_items } = row;
                      const defaultAvatar = author.photoURL
                        ? null
                        : createAvatar(author.displayName);

                      return (
                        <TableRow hover key={index + 'course'} tabIndex={-1}>
                          <TableCell align="left">
                            <Typography
                              component={RouterLink}
                              to={`${PATH_DASHBOARD.root}/course/${id}`}
                              style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                              {title}
                            </Typography>
                          </TableCell>

                          <TableCell align="left"></TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <MAvatar
                                sx={{ width: 48, height: 48 }}
                                src={author.photoURL || undefined}
                                alt={author.displayName}
                                color={author.photoURL ? 'default' : defaultAvatar!.color}
                              >
                                {defaultAvatar?.name}
                              </MAvatar>
                              <Typography variant="subtitle2" noWrap>
                                {author.displayName}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{fDateTime(created_at)}</TableCell>
                          <TableCell align="left">{course_items.length}</TableCell>
                          <TableCell align="left">
                            <Label
                              variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                              color={(!is_published && 'error') || 'success'}
                            >
                              {sentenceCase(is_published ? 'Yes' : 'No')}
                            </Label>
                          </TableCell>

                          <TableCell align="right">
                            <CourseAdminMoreMenu
                              onDelete={() => handleDeleteCourse(id)}
                              onPublish={() => handlePublishCourse(id)}
                              id={id}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isCourseNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterTitle} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={courseAdminList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, page) => setPage(page)}
            onRowsPerPageChange={(e) => handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
