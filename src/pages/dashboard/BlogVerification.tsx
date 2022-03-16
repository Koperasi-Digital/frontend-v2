import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
// material
import { useTheme } from '@mui/material/styles';
import {
  Card,
  Table,
  Stack,
  Avatar,
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
import { RootState, useDispatch, useSelector } from '../../redux/store';
import { getUserList, deleteUser } from '../../redux/slices/user';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// @types
// import { UserManager } from '../../@types/user';
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
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'title', label: 'Title', alignRight: false },
  { id: 'createdBy', label: 'Created By', alignRight: false },
  { id: 'createdAt', label: 'Created At', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------

type Anonymous = Record<string | number, string>;

function makeMockData(arr: any[]) {
  let mock = [...Array(24)].map((_, index) => ({
    id: index,
    avatarUrl: undefined,
    title: sample([
      'Cara merawat DOC (Day Old Chick)',
      'Cara menyuntik vaksin pada ayam',
      'Cara merawat ayam'
    ]),
    createdBy: sample(['John Doe', 'Jane Doe']),
    isVerified: index % 2,
    createdAt: sample([new Date(1592452800000), new Date()]),
    role: sample(['Admin', 'Non-Admin'])
  }));
  for (let i = 0; i < mock.length; i++) {
    mock[i].createdBy = arr[i].name;
    mock[i].avatarUrl = arr[i].avatarUrl;
  }
  return mock;
}

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

  const { userList } = useSelector((state: RootState) => state.user);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = useState<string[]>([]);
  const [orderBy, setOrderBy] = useState('title');
  const [filterTitle, setFilterTitle] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]) as any[];

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  useEffect(() => {
    if (userList.length > 0) {
      setData(makeMockData(userList));
    }
  }, [userList]);
  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (checked: boolean) => {
    if (checked) {
      const newSelecteds = data.map((n: { title: any }) => n.title);
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

  const handleDeleteUser = (userId: string) => {
    deleteUser(userId);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const filteredBlogs = applySortFilter(data, getComparator(order, orderBy), filterTitle);

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
                  rowCount={userList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredBlogs
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, title, createdBy, createdAt, avatarUrl, isVerified, role } = row;
                      const isItemSelected = selected.indexOf(title) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox checked={isItemSelected} onClick={() => handleClick(title)} />
                          </TableCell>
                          <TableCell align="left">{title}</TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar alt={createdBy} src={avatarUrl} />
                              <Typography variant="subtitle2" noWrap>
                                {createdBy}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{fDateTime(createdAt)}</TableCell>
                          <TableCell align="left">{role}</TableCell>
                          <TableCell align="left">
                            <Label
                              variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                              color={(!isVerified && 'error') || 'success'}
                            >
                              {sentenceCase(isVerified ? 'Yes' : 'No')}
                            </Label>
                          </TableCell>

                          <TableCell align="right">
                            <BlogVerificationMoreMenu
                              onDelete={() => handleDeleteUser(id)}
                              title={title}
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
            count={userList.length}
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
