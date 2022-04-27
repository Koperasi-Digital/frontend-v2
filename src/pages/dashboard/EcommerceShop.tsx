import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
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
  OutlinedInput
} from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProducts } from '../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
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
    <Page title="Ecommerce: Shop | CoopChick">
      {values && (
        <Backdrop open={isSubmitting} sx={{ zIndex: 9999 }}>
          <CircularProgress />
        </Backdrop>
      )}

      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading="Shop"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'E-Commerce',
              href: PATH_DASHBOARD.eCommerce.root
            },
            { name: 'Shop' }
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

        <ShopProductList products={products} isLoad={!products && !initialValues} />
        <CartWidget />
      </Container>
    </Page>
  );
}
