import { capitalize, filter } from 'lodash';
import { useState, useEffect } from 'react';
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
import { useSnackbar } from 'notistack';
// redux
import { RootState, useDispatch, useSelector } from '../../redux/store';
import { getUserList, deleteUser } from '../../redux/slices/user';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// @types
import { UserManager } from '../../@types/user';
// components
import Page from 'components/Page';
import Scrollbar from 'components/Scrollbar';
import SearchNotFound from 'components/SearchNotFound';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import { MAvatar } from 'components/@material-extend';
import { UserListHead, UserListToolbar, UserMoreMenu } from 'components/_dashboard/user/list';
import { fDateTime } from 'utils/formatTime';
import createAvatar from 'utils/createAvatar';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Nama', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false, disableSort: true },
  { id: 'created_at', label: 'Waktu Daftar', alignRight: false },
  { id: '' }
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

function applySortFilter(
  array: UserManager[],
  comparator: (a: any, b: any) => number,
  query?: string,
  role?: string
) {
  if (role) {
    array = filter(array, (_user) => _user.roles.map((_role) => _role.name).includes(role || ''));
  }
  if (query) {
    query = query.toLowerCase();
    return filter(
      array,
      (_user) =>
        _user.displayName.toLowerCase().indexOf(query!) !== -1 ||
        _user.email.toLowerCase().indexOf(query!) !== -1
    );
  }
  const stabilizedThis = array.map((el, index) => [el, index] as const);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function UserList() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { userList } = useSelector((state: RootState) => state.user);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = useState<string[]>([]);
  const [orderBy, setOrderBy] = useState('created_at');
  const [filterName, setFilterName] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (checked: boolean) => {
    if (checked) {
      const newSelecteds = userList.map((n) => n.displayName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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

  const handleFilterByName = (filterName: string) => {
    setFilterName(filterName);
  };

  const handleFilterByRole = (filterRole: string) => {
    setFilterRole(filterRole);
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId);
      enqueueSnackbar(`Pengguna (ID: ${userId}) berhasil dihapus!`, { variant: 'success' });
    } catch (err) {
      console.error(err);
    }
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

  const filteredUsers = applySortFilter(
    userList,
    getComparator(order, orderBy),
    filterName,
    filterRole
  );

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="List Pengguna | CoopChick">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading="List Pengguna"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Pengguna', href: PATH_DASHBOARD.user.list }
          ]}
        />

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            filterRole={filterRole}
            onFilterName={handleFilterByName}
            onFilterRole={handleFilterByRole}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={userList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, displayName, roles, email, photoURL, created_at } = row;
                      const isItemSelected = selected.indexOf(displayName) !== -1;
                      const defaultAvatar = photoURL ? null : createAvatar(displayName);

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
                            <Checkbox
                              checked={isItemSelected}
                              onClick={() => handleClick(displayName)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <MAvatar
                                src={photoURL || undefined}
                                alt={displayName}
                                color={photoURL ? 'default' : defaultAvatar!.color}
                              >
                                {defaultAvatar?.name}
                              </MAvatar>
                              <Typography variant="subtitle2" noWrap>
                                {displayName}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{email}</TableCell>
                          <TableCell align="left">
                            {roles.map((role) => capitalize(role.name)).join(', ')}
                          </TableCell>
                          <TableCell align="left">{fDateTime(new Date(created_at))}</TableCell>

                          <TableCell align="right">
                            <UserMoreMenu
                              onDelete={() => handleDeleteUser(id)}
                              userName={displayName}
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
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
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
            count={filteredUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, page) => setPage(page)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
