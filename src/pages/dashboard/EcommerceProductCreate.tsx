import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
// material
import { Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProduct } from '../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// @types
import { ProductState } from '../../@types/products';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import ProductNewForm from '../../components/_dashboard/e-commerce/ProductNewForm';

// ----------------------------------------------------------------------

export default function EcommerceProductCreate() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { name = '' } = useParams();
  const { product } = useSelector((state: { product: ProductState }) => state.product);
  const isEdit = pathname.includes('edit');
  const currentProduct = product;

  useEffect(() => {
    dispatch(getProduct(name));
  }, [dispatch, name]);

  return (
    <Page
      title={'Ecommerce: ' + (!isEdit ? 'Create a new product' : 'Edit product') + ' | CoopChick'}
    >
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Create a new product' : 'Edit product'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Seller Center',
              href: PATH_DASHBOARD.eCommerce.seller.root
            },
            {
              name: 'Product List',
              href: PATH_DASHBOARD.eCommerce.seller.list
            },
            { name: !isEdit ? 'New product' : currentProduct?.name || 'Product' }
          ]}
        />

        {currentProduct && <ProductNewForm isEdit={isEdit} currentProduct={currentProduct} />}
      </Container>
    </Page>
  );
}
