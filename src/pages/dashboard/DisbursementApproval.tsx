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
          heading={'Pembuatan Persetujuan Pencairan'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Keuangan',
              href: PATH_DASHBOARD.managementFinance.root
            },
            { name: 'Persetujuan Pencairan' }
          ]}
        />

        <DisbursementApprovalForm />
      </Container>
    </Page>
  );
}
