import { Icon } from '@iconify/react';
import downloadFill from '@iconify/icons-eva/download-fill';
// import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { PDFDownloadLink } from '@react-pdf/renderer';
// material
import { LoadingButton } from '@mui/lab';

import { useState, useEffect } from 'react';

import CoopNeracaReportPDF from './CoopNeracaReportPDF';
import { ExportToExcel } from 'components/ExportToExcel';
import { Stack } from '@mui/material';

type CoopNeracaData = {
  id: number;
  periode: string;
  kas: number;
  asetTetap: number;
  modal: number;
  prive: number;
  beban: number;
  harta: number;
  modalCalc: number;
};

export default function CoopNeracaReportToolbar(props: {
  coopNeracaData: CoopNeracaData | undefined;
}) {
  const [sheetData, setSheetData] = useState<{ No: string; Komponen: string; Jumlah: number }[]>();

  useEffect(() => {
    if (props.coopNeracaData) {
      let sheetData = [
        { No: '1', Komponen: 'Kas', Jumlah: props.coopNeracaData.kas },
        { No: '2', Komponen: 'Aset Tetap', Jumlah: props.coopNeracaData.asetTetap },
        { No: '', Komponen: 'Total Aset', Jumlah: props.coopNeracaData.harta },
        { No: '3', Komponen: 'Modal', Jumlah: props.coopNeracaData.modal },
        { No: '4', Komponen: 'Prive', Jumlah: props.coopNeracaData.prive },
        { No: '5', Komponen: 'Beban', Jumlah: props.coopNeracaData.beban },
        { No: '', Komponen: 'Ekuitas', Jumlah: props.coopNeracaData.modalCalc }
      ];

      setSheetData(sheetData);
    }
  }, [props.coopNeracaData]);

  return props.coopNeracaData ? (
    <>
      <Stack direction="row" spacing={2}>
        <PDFDownloadLink
          document={<CoopNeracaReportPDF coopNeracaData={props.coopNeracaData} />}
          fileName={`LAPORAN-NERACA-KOPERASI`}
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
              Download Laporan Neraca Koperasi
            </LoadingButton>
          )}
        </PDFDownloadLink>
        <ExportToExcel csvData={sheetData} fileName={'LAPORAN-NERACA-KOPERASI'} />
      </Stack>
    </>
  ) : (
    <div>Loading</div>
  );
}
