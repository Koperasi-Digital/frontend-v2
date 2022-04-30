import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Container, Grid, Stack, Typography, Link, Box, Card } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../redux/store';
import { styled } from '@mui/material/styles';
import { Icon } from '@iconify/react';
import BalanceScale from '@iconify/icons-emojione-monotone/balance-scale';
import Forum from '@iconify/icons-ic/round-forum';
import RoundReceiptLong from '@iconify/icons-ic/round-receipt-long';
import ShoppingBags from '@iconify/icons-emojione-monotone/shopping-bags';
import Blogger from '@iconify/icons-cib/blogger';
import Course from '@iconify/icons-ant-design/book-twotone';
import Activity from '@iconify/icons-ic/twotone-local-activity';
// hooks
import useAuth from 'hooks/useAuth';
// routes
import { PATH_DASHBOARD } from 'routes/paths';
// components
import Page from 'components/Page';
import { ShopProductList } from 'components/_dashboard/e-commerce/shop';
import { getProducts } from 'redux/slices/product';
import { getPostsBlogList } from 'redux/slices/blog';
import { ProductState } from '../@types/products';
import { BlogState } from '../@types/blog';
import { BlogPostCard } from 'components/_dashboard/blog';
import { IconifyIcon } from '@iconify/types';
import { AppWelcome } from 'components/_dashboard/general-app';
//Footer
import MainFooter from 'layouts/main/MainFooter';
import { ProductFilter } from '../@types/products';
// ----------------------------------------------------------------------

const RedirectCardStyle = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(3),
  margin: `${theme.spacing(3)} auto`,
  ':hover': {
    color: theme.palette.primary.main
  },
  width: 128,
  height: 128,
  [theme.breakpoints.up('lg')]: { width: 196, height: 128 }
}));

interface HomeRedirectButtonProps {
  icon: IconifyIcon;
  name: string;
  to: string;
}

function HomeRedirectButton({ icon, name, to }: HomeRedirectButtonProps) {
  return (
    <Link underline="none" component={RouterLink} to={to}>
      <RedirectCardStyle>
        <Box component={Icon} icon={icon} sx={{ width: 36, height: 36 }} />
        <Typography textAlign="center">{name}</Typography>
      </RedirectCardStyle>
    </Link>
  );
}

export default function Dashboard() {
  const dispatch = useDispatch();
  const { products } = useSelector((state: { product: ProductState }) => state.product);
  const { posts } = useSelector((state: { blog: BlogState }) => state.blog);
  const { user } = useAuth();
  const isCustomer = user ? user.roles.length === 1 && user.roles[0].name === 'CUSTOMER' : false;

  useEffect(() => {
    const productFilter: ProductFilter = {
      city: ['Bandung'],
      category: 'Ayam',
      priceRange: '100000-200000'
    };
    dispatch(getProducts(productFilter, null, null));
    dispatch(getPostsBlogList('', 0, 'POPULER'));
  }, [dispatch]);

  return (
    <Page title="Beranda | CoopChick">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <AppWelcome />
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" spacing={2} justifyContent="center" sx={{ overflow: 'auto' }}>
              <HomeRedirectButton
                to={
                  isCustomer
                    ? PATH_DASHBOARD.user.memberVerification.request
                    : PATH_DASHBOARD.general.dashboard
                }
                icon={BalanceScale}
                name="Koperasi"
              />
              <HomeRedirectButton to={PATH_DASHBOARD.general.forum} icon={Forum} name="Forum" />
              <HomeRedirectButton
                to={PATH_DASHBOARD.eCommerce.root}
                icon={ShoppingBags}
                name="E-Commerce"
              />
              <HomeRedirectButton to={PATH_DASHBOARD.general.blogs} icon={Blogger} name="Blog" />
              <HomeRedirectButton
                to={
                  isCustomer
                    ? PATH_DASHBOARD.user.memberVerification.request
                    : PATH_DASHBOARD.general.course
                }
                icon={Course}
                name="Course"
              />
              <HomeRedirectButton
                to={
                  isCustomer
                    ? PATH_DASHBOARD.user.memberVerification.request
                    : PATH_DASHBOARD.general.activities
                }
                icon={Activity}
                name="Aktivitas"
              />
              <HomeRedirectButton
                to={PATH_DASHBOARD.eCommerce.orderHistory}
                icon={RoundReceiptLong}
                name="Transaksi"
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <Typography sx={{ my: 2 }}>
                <h3>Beli Produk Ternak Ayam Disini</h3>
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
              <ShopProductList products={products.slice(0, 6)} isLoad={!products} />
            </Stack>
            <Stack direction="row" justifyContent="flex-end" spacing={2}>
              <Link to={PATH_DASHBOARD.eCommerce.root} component={RouterLink}>
                <Typography sx={{ my: 2, textAlign: 'right' }}>
                  <h4>Lihat Semua Produk</h4>
                </Typography>
              </Link>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Typography sx={{ my: 2 }}>
                <h3>Informasi Blog Terpopuler</h3>
              </Typography>
            </Stack>
            <Stack direction="row">
              <Grid container spacing={3}>
                {posts.slice(0, 4).map((post, index) => (
                  <BlogPostCard key={post.id} post={post} index={index + 3} />
                ))}
              </Grid>
            </Stack>
            <Stack direction="row" justifyContent="flex-end" spacing={2}>
              <Link to={PATH_DASHBOARD.general.blogs} component={RouterLink}>
                <Typography sx={{ my: 2, textAlign: 'right' }}>
                  <h4>Lihat Blog Lainnya</h4>
                </Typography>
              </Link>
            </Stack>
          </Grid>
        </Grid>
      </Container>
      <Box mt={6}>
        <MainFooter />
      </Box>
    </Page>
  );
}
