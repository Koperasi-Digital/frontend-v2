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
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { BlogState } from '../../@types/blog';
import { getBlogVerificationList, setVerified, deleteBlog } from '../../redux/slices/blog';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { fDateTime } from '../../utils/formatTime';
import {
  BlogVerificationHead,
  BlogVerificationToolbar,
  BlogVerificationMoreMenu
} from '../../components/_dashboard/blog/list';
import createAvatar from 'utils/createAvatar';
import { MAvatar } from 'components/@material-extend';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'title', label: 'Title', alignRight: false },
  { id: 'none1' },
  { id: 'author', label: 'Created By', alignRight: false, disableSort: true },
  { id: 'created_at', label: 'Created At', alignRight: false },
  { id: 'is_verified', label: 'Verified', alignRight: false },
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
    return filter(array, (_blog) => _blog.title.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function BlogVerification() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { blogVerificationList } = useSelector((state: { blog: BlogState }) => state.blog);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = useState<string[]>([]);
  const [orderBy, setOrderBy] = useState('title');
  const [filterTitle, setFilterTitle] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(getBlogVerificationList());
  }, [dispatch]);

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  console.log(orderBy);
  console.log(order);

  const handleSelectAllClick = (checked: boolean) => {
    if (checked) {
      const newSelecteds = blogVerificationList.map((n: { title: any }) => n.title);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (title: string) => {
    const selectedIndex = selected.indexOf(title);
    let newSelected: string[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, title);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByTitle = (filterTitle: string) => {
    setFilterTitle(filterTitle);
  };

  const handleDeleteBlog = (blogId: number) => {
    dispatch(deleteBlog(blogId));
  };

  const handleVerifyBlog = (blogId: number) => {
    dispatch(setVerified(blogId));
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - blogVerificationList.length) : 0;

  const filteredBlogs = applySortFilter(
    blogVerificationList,
    getComparator(order, orderBy),
    filterTitle
  );

  const isBlogNotFound = filteredBlogs.length === 0;

  return (
    <Page title="Blog Verification | CoopChick">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading="Blog Verification"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Blog Verification', href: PATH_DASHBOARD.general.blogVerification }
          ]}
        />

        <Card>
          <BlogVerificationToolbar
            numSelected={selected.length}
            filterTitle={filterTitle}
            onFilterTitle={handleFilterByTitle}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <BlogVerificationHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={blogVerificationList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredBlogs
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const { id, title, created_at, author, is_verified } = row;
                      const isItemSelected = selected.indexOf(title) !== -1;
                      const defaultAvatar = author.photoURL
                        ? null
                        : createAvatar(author.displayName);

                      return (
                        <TableRow
                          hover
                          key={index + 'blog'}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox checked={isItemSelected} onClick={() => handleClick(title)} />
                          </TableCell>
                          <TableCell align="left">
                            <Typography
                              component={RouterLink}
                              to={`${PATH_DASHBOARD.root}/blogs/${id}`}
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
                          <TableCell align="left">
                            <Label
                              variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                              color={(!is_verified && 'error') || 'success'}
                            >
                              {sentenceCase(is_verified ? 'Yes' : 'No')}
                            </Label>
                          </TableCell>

                          <TableCell align="right">
                            <BlogVerificationMoreMenu
                              onDelete={() => handleDeleteBlog(id)}
                              onVerify={() => handleVerifyBlog(id)}
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
                {isBlogNotFound && (
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
            count={blogVerificationList.length}
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
