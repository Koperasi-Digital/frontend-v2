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
  const isMember = user.roles.map((role) => role.name).includes('MEMBER');
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8} order={{ xs: 2, md: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
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
          {isMember && user?.store && (
            <Grid item xs={12}>
              <Card sx={{ p: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                      Informasi Toko
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      Nama
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <Typography variant="body1">{user.store.name || '-'}</Typography>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      Deskripsi
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <Typography variant="body1">{user.store.description || '-'}</Typography>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      No. Telepon
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <Typography variant="body1">{user.store.phoneNumber || '-'}</Typography>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      Alamat
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <Typography variant="body1">
                      {`${user.store.address}, ${user.store.city}, ${user.store.state}, ${user.store.country} ${user.store.zipCode}`}
                    </Typography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        md={4}
        sx={{
          order: {
            xs: 1,
            md: 2
          }
        }}
      >
        <Card sx={{ py: 10, px: 3, height: '100%', display: 'flex', alignItems: 'center' }}>
          <UploadAvatar accept="image/*" file={user?.photoURL || null} disabled={true} />
        </Card>
      </Grid>
    </Grid>
  );
}
