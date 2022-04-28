// material
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import DisbursementApprovalForm from '../../components/_dashboard/general-banking/DisbursementApprovalForm';

// ----------------------------------------------------------------------

export default function DisbursementApproval() {
  return (
    <Page title="Finance: Disbursement | CoopChick">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading={'Create disbursement approval'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Finance',
              href: PATH_DASHBOARD.managementFinance.root
            },
            { name: 'Disbursement Approval' }
          ]}
        />

        <DisbursementApprovalForm />
      </Container>
    </Page>
  );
}
