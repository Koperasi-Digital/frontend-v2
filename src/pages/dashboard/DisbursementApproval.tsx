// material
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import DisbursementApprovalForm from '../../components/_dashboard/general-banking/DisbursementApprovalForm';

// ----------------------------------------------------------------------

export default function DisbursementApproval() {
  const { disbursementRequestId = '' } = useParams();
  return (
    <Page title="Penyetujuan Pencairan Dana | CoopChick">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading={'Pembuatan Persetujuan Pencairan Dana'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Penyetujuan Pencairan' }
          ]}
        />

        <DisbursementApprovalForm disbursementRequestId={disbursementRequestId} />
      </Container>
    </Page>
  );
}
