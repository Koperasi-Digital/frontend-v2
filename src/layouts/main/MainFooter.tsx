import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Grid, Link, Divider, Container, Typography, Stack } from '@mui/material';
// components
import Logo from '../../components/Logo';
import { PATH_DASHBOARD } from 'routes/paths';

// ----------------------------------------------------------------------

const LINKS = [
  {
    headline: 'CoopChick',
    children: [
      { name: 'Koperasi', href: PATH_DASHBOARD.general.dashboard },
      { name: 'E-Commerce', href: PATH_DASHBOARD.eCommerce.root },
      { name: 'Blogs', href: PATH_DASHBOARD.general.blogs },
      { name: 'FAQ', href: PATH_DASHBOARD.general.faq }
    ]
  },
  {
    headline: 'Contact',
    children: [
      { name: 'coopchickitb@gmail.com', href: '#' },
      { name: 'Jalan Ganesha No. 10 Bandung', href: '#' }
    ]
  }
];

const RootStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.background.default
}));

// ----------------------------------------------------------------------

export default function MainFooter() {
  return (
    <RootStyle>
      <Divider />
      <Container sx={{ pt: 10 }}>
        <Grid
          container
          justifyContent={{ xs: 'center', md: 'space-between' }}
          sx={{ textAlign: { xs: 'center', md: 'left' } }}
        >
          <Grid item xs={12} sx={{ mb: 3 }}>
            <Logo sx={{ mx: { xs: 'auto', md: 'inherit' } }} />
          </Grid>
          <Grid item xs={8} md={5}>
            <Typography variant="body2" sx={{ pr: { md: 5 }, mb: { xs: 10, md: 0 } }}>
              CoopChick adalah sebuah platform koperasi digital yang mempertemukan para peternak
              ayam dan para konsumen yang hendak menggunakannya.
            </Typography>
          </Grid>

          <Grid item xs={12} md={7}>
            <Stack spacing={12} direction={{ xs: 'column', md: 'row' }} justifyContent="flex-end">
              {LINKS.map((list) => (
                <Stack key={list.headline} spacing={2}>
                  <Typography component="p" variant="overline">
                    {list.headline}
                  </Typography>
                  {list.children.map((link) =>
                    link.href === '#' ? (
                      <Typography variant="body2" color="inherit">
                        {link.name}
                      </Typography>
                    ) : (
                      <Link
                        to={link.href}
                        key={link.name}
                        color="inherit"
                        variant="body2"
                        component={RouterLink}
                        sx={{ display: 'block' }}
                      >
                        {link.name}
                      </Link>
                    )
                  )}
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Typography
          component="p"
          variant="body2"
          sx={{
            mt: 10,
            pb: 5,
            fontSize: 13,
            textAlign: { xs: 'center', md: 'left' }
          }}
        >
          © 2022 CoopChick. All right reserved
        </Typography>
      </Container>
    </RootStyle>
  );
}
