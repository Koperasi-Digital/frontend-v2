import { Icon } from '@iconify/react';
import downloadFill from '@iconify/icons-eva/download-fill';
// import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { PDFDownloadLink } from '@react-pdf/renderer';
// material
import { LoadingButton } from '@mui/lab';

import ArusKasReportPDF from './ArusKasReportPDF';

type ArusKasData = {
  id: number;
  user_id: number;
  periode: string;
  jumlahKasAwal: number;
  kasMasuk: number;
  kasCair: number;
  jumlahKasAkhir: number;
};

export default function NeracaReportToolbar(props: { arusKasData: ArusKasData | undefined }) {
  return props.arusKasData ? (
    <>
      <PDFDownloadLink
        document={<ArusKasReportPDF arusKasData={props.arusKasData} />}
        fileName={`LAPORAN-ARUS-KAS`}
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
            Download Laporan Arus Kas
          </LoadingButton>
        )}
      </PDFDownloadLink>
    </>
  ) : (
    <div>Loading</div>
  );
}
