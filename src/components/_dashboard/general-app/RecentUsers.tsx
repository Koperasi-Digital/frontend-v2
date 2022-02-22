import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
// material
import {
  Box,
  Card,
  Table,
  Avatar,
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

// ----------------------------------------------------------------------

const RECENT_USERS = [
  {
    id: '1b0fc8a1-cd68-41f6-899e-d0e0676c90bb',
    avatar: '/static/mock-images/avatars/avatar_8.jpg',
    name: 'Annette Black',
    timestamp: 1627556358365,
    email: 'annette@email.com',
    role: 'Anggota'
  },
  {
    id: 'b7846c12-662c-465a-8e81-8a35df7531ef',
    avatar: '/static/mock-images/avatars/avatar_2.jpg',
    name: 'John Doe',
    timestamp: 1627556329022,
    email: 'john@email.com',
    role: 'Anggota'
  },
  {
    id: 'b7846c12-555q-465a-8e81-8a35df7531ef',
    avatar: '/static/mock-images/avatars/avatar_1.jpg',
    name: 'Jane Doe',
    timestamp: 1627556329038,
    email: 'jane@email.com',
    role: 'Customer'
  },
  {
    id: '1b0fc8a1-cd72-41f6-899e-d0e0676c90bb',
    avatar: '/static/mock-images/avatars/avatar_6.jpg',
    name: 'Courtney Henry',
    timestamp: 1627554444465,
    email: 'courtney@email.com',
    role: 'Customer'
  },

  {
    id: '1b0fc8a1-cd54-41f6-899e-d0e0676c90bb',
    avatar: '/static/mock-images/avatars/avatar_7.jpg',
    name: 'Anne Henry',
    timestamp: 1621116358365,
    email: 'anne@email.com',
    role: 'Anggota'
  }
];

// ----------------------------------------------------------------------

export default function RecentUsers() {
  return (
    <>
      <Card>
        <CardHeader title="Recent Users" sx={{ mb: 3 }} />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Joined At</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {RECENT_USERS.map((row) => (
                  <TableRow hover key={row.id} tabIndex={-1} role="checkbox">
                    <TableCell component="th" scope="row" padding="none">
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar alt={row.name} src={row.avatar!} />
                        <Typography variant="subtitle2" noWrap>
                          {row.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">{row.role}</TableCell>
                    <TableCell align="left">{fDateTime(row.timestamp)}</TableCell>

                    <TableCell align="right">
                      <UserMoreMenu onDelete={() => undefined} userName={row.name} />
                    </TableCell>
                  </TableRow>
                ))}
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
            View All
          </Button>
        </Box>
      </Card>
    </>
  );
}
