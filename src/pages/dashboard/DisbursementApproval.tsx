import { useEffect } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// material
import { Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProducts } from '../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// @types
import { ProductState } from '../../@types/products';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import DisbursementApprovalForm from '../../components/_dashboard/general-banking/DisbursementApprovalForm';

// ----------------------------------------------------------------------

export default function DisbursementApproval() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { name = '' } = useParams();
  const { products } = useSelector((state: { product: ProductState }) => state.product);
  const isEdit = pathname.includes('edit');
  const currentProduct = products.find((product) => paramCase(product.name) === name);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Page title="Finance: Disbursement | CoopChick">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading={'Create disbursement approval'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Finance',
              href: PATH_DASHBOARD.finance.root
            },
            { name: 'Disbursement Approval' }
          ]}
        />

        <DisbursementApprovalForm />
      </Container>
    </Page>
  );
}
