import { Icon } from '@iconify/react';
import downloadFill from '@iconify/icons-eva/download-fill';
// import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { PDFDownloadLink } from '@react-pdf/renderer';
// material
import { LoadingButton } from '@mui/lab';

import NeracaReportPDF from './NeracaReportPDF';

type NeracaData = {
  asetTetap: number;
  beban: number;
  harta: number;
  id: number;
  kas: number;
  modal: number;
  modalCalc: number;
  periode: string;
  persediaan: number;
  prive: number;
  user_id: number;
};

export default function NeracaReportToolbar(props: { neracaData: NeracaData | undefined }) {
  return props.neracaData ? (
    <>
      <PDFDownloadLink
        document={<NeracaReportPDF neracaData={props.neracaData} />}
        fileName={`LAPORAN-NERACA`}
        style={{ textDecoration: 'none' }}
      >
        {({ loading }) => (
          <LoadingButton
            size="small"
            loading={loading}
            variant="contained"
            loadingPosition="end"
            endIcon={<Icon icon={downloadFill} />}
          >
            Download Laporan Neraca
          </LoadingButton>
        )}
      </PDFDownloadLink>
    </>
  ) : (
    <div>Loading</div>
  );
}
