import { capitalize } from 'lodash';
// material
import { Grid, Card, Typography } from '@mui/material';
// types
import { UserManager } from '../../../../@types/user';
// components
import { UploadAvatar } from 'components/upload';

// ----------------------------------------------------------------------

interface UserDetailProps {
  user: UserManager;
}

export default function UserDetail({ user }: UserDetailProps) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Card sx={{ py: 10, px: 3 }}>
          <UploadAvatar accept="image/*" file={user?.photoURL || null} disabled={true} />
        </Card>
      </Grid>
      <Grid item xs={12} md={8}>
        <Card sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                User Information
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Name
              </Typography>
            </Grid>
            <Grid item xs={12} md={9}>
              <Typography variant="body1">{user?.displayName || '-'}</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Email Address
              </Typography>
            </Grid>
            <Grid item xs={12} md={9}>
              <Typography variant="body1">{user?.email || '-'}</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Phone Number
              </Typography>
            </Grid>
            <Grid item xs={12} md={9}>
              <Typography variant="body1">{user?.phoneNumber || '-'}</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Country
              </Typography>
            </Grid>
            <Grid item xs={12} md={9}>
              <Typography variant="body1">{user?.country || '-'}</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                State/Region
              </Typography>
            </Grid>
            <Grid item xs={12} md={9}>
              <Typography variant="body1">{user?.state || '-'}</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                City
              </Typography>
            </Grid>
            <Grid item xs={12} md={9}>
              <Typography variant="body1">{user?.city || '-'}</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Address
              </Typography>
            </Grid>
            <Grid item xs={12} md={9}>
              <Typography variant="body1">{user?.address || '-'}</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Zip Code
              </Typography>
            </Grid>
            <Grid item xs={12} md={9}>
              <Typography variant="body1">{user?.zipCode || '-'}</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Assigned Roles
              </Typography>
            </Grid>
            <Grid item xs={12} md={9}>
              <Typography variant="body1">
                {user?.roles.map((role) => capitalize(role.name)).join(', ')}
              </Typography>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}
