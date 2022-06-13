import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';

// material
import {
  Backdrop,
  Container,
  Typography,
  CircularProgress,
  Stack,
  InputAdornment,
  Box,
  styled,
  OutlinedInput,
  TablePagination,
  IconButton,
  Link
} from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProducts } from '../../redux/slices/product';
// routes
import { PATH_DASHBOARD, PATH_PAGE } from '../../routes/paths';
// utils
import fakeRequest from '../../utils/fakeRequest';
// @types
import { ProductState, ProductFilter } from '../../@types/products';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import {
  ShopTagFiltered,
  ShopProductSort,
  ShopProductList,
  ShopFilterSidebar
} from '../../components/_dashboard/e-commerce/shop';
import CartWidget from '../../components/_dashboard/e-commerce/CartWidget';
import questionMarkCircleOutline from '@iconify/icons-eva/question-mark-circle-outline';

// ----------------------------------------------------------------------

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 300,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`
  }
}));

export default function EcommerceShop() {
  const dispatch = useDispatch();
  const [openFilter, setOpenFilter] = useState(false);
  const [filterName, setFilterName] = useState('');
  const { products, sortBy, filters } = useSelector(
    (state: { product: ProductState }) => state.product
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(12);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formik = useFormik<ProductFilter>({
    initialValues: {
      city: filters.city,
      category: filters.category,
      priceRange: filters.priceRange
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await fakeRequest(500);
        setSubmitting(false);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
  });

  const { values, resetForm, handleSubmit, isSubmitting, initialValues } = formik;

  const isDefault =
    filterName === '' && !values.priceRange && values.city.length === 0 && values.category === '';

  useEffect(() => {
    dispatch(getProducts(values, filterName, sortBy));
  }, [dispatch, values, filterName, sortBy]);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
    setFilterName('');
  };

  return (
    <Page title="Ecommerce | CoopChick">
      {values && (
        <Backdrop open={isSubmitting} sx={{ zIndex: 9999 }}>
          <CircularProgress />
        </Backdrop>
      )}

      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading="E-Commerce"
          links={[
            { name: 'Beranda', href: PATH_PAGE.homepage },
            {
              name: 'E-Commerce'
            }
          ]}
        />

        {!isDefault && (
          <Typography gutterBottom>
            <Typography component="span" variant="subtitle1">
              {products.length}
            </Typography>
            &nbsp;Products found
          </Typography>
        )}

        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <SearchStyle
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            placeholder="Cari produk..."
            startAdornment={
              <InputAdornment position="start">
                <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            }
          />
          <ShopTagFiltered
            filters={filters}
            formik={formik}
            isShowReset={openFilter}
            onResetFilter={handleResetFilter}
            isDefault={isDefault}
          />

          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <Link
              variant="body2"
              component={RouterLink}
              to={`${PATH_DASHBOARD.general.faq}/bagaimana-cara-melakukan-pembayaran-checkout-e-commerce`}
            >
              <IconButton sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Icon icon={questionMarkCircleOutline} width={20} height={20} />
              </IconButton>
            </Link>
            <ShopFilterSidebar
              formik={formik}
              isOpenFilter={openFilter}
              onResetFilter={handleResetFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ShopProductSort />
          </Stack>
        </Stack>

        <ShopProductList
          products={products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
          isLoad={!products && !initialValues}
        />
        <TablePagination
          rowsPerPageOptions={[6, 12, 24]}
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, value) => setPage(value)}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <CartWidget />
      </Container>
    </Page>
  );
}
