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
                Informasi Pengguna
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Nama
              </Typography>
            </Grid>
            <Grid item xs={12} md={9}>
              <Typography variant="body1">{user?.displayName || '-'}</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Email
              </Typography>
            </Grid>
            <Grid item xs={12} md={9}>
              <Typography variant="body1">{user?.email || '-'}</Typography>
            </Grid>
            {user?.storeName && (
              <>
                <Grid item xs={12} md={3}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    Toko
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <Typography variant="body1">{user?.storeName || '-'}</Typography>
                </Grid>
              </>
            )}
            <Grid item xs={12} md={3}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Role
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
