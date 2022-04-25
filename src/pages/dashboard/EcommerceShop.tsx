import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { filter, orderBy } from 'lodash';
// material
import { Backdrop, Container, Typography, CircularProgress, Stack } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProducts, filterProducts } from '../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// utils
import fakeRequest from '../../utils/fakeRequest';
// @types
import { Product, ProductState, ProductFilter } from '../../@types/products';
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

function applyFilter(products: Product[], sortBy: string | null, filters: ProductFilter) {
  // SORT BY
  if (sortBy === 'newest') {
    products = orderBy(products, ['created_at'], ['desc']);
  }
  if (sortBy === 'priceDesc') {
    products = orderBy(products, ['price'], ['desc']);
  }
  if (sortBy === 'priceAsc') {
    products = orderBy(products, ['price'], ['asc']);
  }
  // FILTER PRODUCTS
  if (filters.category !== 'Semua') {
    products = filter(products, (_product) => _product.category === filters.category);
  }

  if (filters.priceRange) {
    products = filter(products, (_product) => {
      if (filters.priceRange === 'below') {
        return _product.price < 50000;
      }
      if (filters.priceRange === 'between') {
        return _product.price >= 50000 && _product.price <= 100000;
      }
      return _product.price > 100000;
    });
  }

  return products;
}

export default function EcommerceShop() {
  const dispatch = useDispatch();
  const [openFilter, setOpenFilter] = useState(false);
  const { products, sortBy, filters } = useSelector(
    (state: { product: ProductState }) => state.product
  );

  const filteredProducts = applyFilter(products, sortBy, filters);

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

  const isDefault = !values.priceRange && values.city.length === 0 && values.category === 'Semua';

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(filterProducts(values));
  }, [dispatch, values]);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
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
              {filteredProducts.length}
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

        <ShopProductList products={filteredProducts} isLoad={!filteredProducts && !initialValues} />
        <CartWidget />
      </Container>
    </Page>
  );
}
