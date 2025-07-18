import { useEffect } from 'react';
import { getUserList } from 'redux/slices/user';
import { RootState, useDispatch, useSelector } from 'redux/store';
import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';
import { capitalize, orderBy } from 'lodash';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
// material
import {
  Box,
  Card,
  Table,
  Button,
  Divider,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  CardHeader,
  Typography,
  TableContainer,
  Stack
} from '@mui/material';
//
import Scrollbar from '../../Scrollbar';
import { PATH_DASHBOARD } from 'routes/paths';
import { fDateTime } from 'utils/formatTime';
import { UserMoreMenu } from 'components/_dashboard/user/list';
import { MAvatar } from 'components/@material-extend';
import createAvatar from 'utils/createAvatar';

// ----------------------------------------------------------------------

export default function RecentUsers() {
  const dispatch = useDispatch();
  const { userList } = useSelector((state: RootState) => state.user);
  const recentUsers = orderBy(userList, (user) => new Date(user.created_at), ['desc']).slice(0, 5);

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  return (
    <>
      <Card>
        <CardHeader title="Pengguna Terbaru" sx={{ mb: 3 }} />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nama</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Waktu Daftar</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {recentUsers.map((row) => {
                  const { id, displayName, email, photoURL, roles, created_at } = row;
                  const userData = { id, displayName, email, photoURL, roles, created_at };
                  const defaultAvatar = photoURL ? null : createAvatar(displayName);
                  return (
                    <TableRow hover key={id} tabIndex={-1} role="checkbox">
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
                      <TableCell align="left">{fDateTime(created_at)}</TableCell>

                      <TableCell align="right">
                        <UserMoreMenu user={userData} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Divider />

        <Box sx={{ p: 2, textAlign: 'right' }}>
          <Button
            to={PATH_DASHBOARD.user.list}
            size="small"
            color="inherit"
            component={RouterLink}
            endIcon={<Icon icon={arrowIosForwardFill} />}
          >
            Lihat Semua
          </Button>
        </Box>
      </Card>
    </>
  );
}
