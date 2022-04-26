import { Icon } from '@iconify/react';
import downloadFill from '@iconify/icons-eva/download-fill';
// import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { PDFDownloadLink } from '@react-pdf/renderer';
// material
import { LoadingButton } from '@mui/lab';

import { useState, useEffect } from 'react';

import ArusKasReportPDF from './ArusKasReportPDF';
import { ExportToExcel } from 'components/ExportToExcel';
import { Stack } from '@mui/material';

type ArusKasData = {
  jumlahKasAwal: number;
  kasMasuk: number;
  kasKeluar: number;
  jumlahKasAkhir: number;
};

export default function ArusKasReportToolbar(props: { arusKasData: ArusKasData | undefined }) {
  const [sheetData, setSheetData] = useState<{ No: string; Komponen: string; Jumlah: number }[]>();

  useEffect(() => {
    if (props.arusKasData) {
      let sheetData = [
        { No: '1', Komponen: 'Jumlah Kas Awal', Jumlah: props.arusKasData.jumlahKasAwal },
        { No: '2', Komponen: 'Kas Masuk', Jumlah: props.arusKasData.kasMasuk },
        { No: '3', Komponen: 'Kas Keluar', Jumlah: props.arusKasData.kasKeluar },
        { No: '', Komponen: 'Jumlah Kas Akhir', Jumlah: props.arusKasData.jumlahKasAkhir }
      ];

      setSheetData(sheetData);
    }
  }, [props.arusKasData]);

  return props.arusKasData ? (
    <>
      <Stack direction="row" spacing={2}>
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
        <ExportToExcel
          worksheetsNames={['Data Sheet']}
          sizes={[{ width: 0, height: 0 }]}
          contents={[
            {
              sheetData: sheetData
            }
          ]}
          filename={'LAPORAN-ARUS-KAS'}
        />
      </Stack>
    </>
  ) : (
    <div>Loading</div>
  );
}
