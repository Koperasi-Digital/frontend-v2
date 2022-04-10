import { Icon } from '@iconify/react';
import downloadFill from '@iconify/icons-eva/download-fill';
// import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { PDFDownloadLink } from '@react-pdf/renderer';
// material
import { LoadingButton } from '@mui/lab';

import NeracaReportPDF from './NeracaReportPDF';
import { ExportToExcel } from 'components/ExportToExcel';
import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';

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
  const [sheetData, setSheetData] = useState<{ No: string; Komponen: string; Jumlah: number }[]>();

  useEffect(() => {
    if (props.neracaData) {
      let sheetData = [
        { No: '1', Komponen: 'Kas', Jumlah: props.neracaData.kas },
        { No: '2', Komponen: 'Persediaan', Jumlah: props.neracaData.persediaan },
        { No: '3', Komponen: 'Aset Tetap', Jumlah: props.neracaData.asetTetap },
        { No: '', Komponen: 'Total Aset', Jumlah: props.neracaData.harta },
        { No: '4', Komponen: 'Modal', Jumlah: props.neracaData.modal },
        { No: '5', Komponen: 'Prive', Jumlah: props.neracaData.prive },
        { No: '6', Komponen: 'Beban', Jumlah: props.neracaData.beban },
        { No: '', Komponen: 'Ekuitas', Jumlah: props.neracaData.modalCalc }
      ];

      setSheetData(sheetData);
    }
  }, [props.neracaData]);

  return props.neracaData ? (
    <>
      <Stack direction="row" spacing={2}>
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
        <ExportToExcel
          worksheetsNames={['Data Sheet']}
          sizes={[{ width: 0, height: 0 }]}
          contents={[
            {
              sheetData: sheetData
            }
          ]}
          filename={'LAPORAN-NERACA'}
        />
      </Stack>
    </>
  ) : (
    <div>Loading</div>
  );
}
