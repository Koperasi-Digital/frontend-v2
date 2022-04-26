import { Icon } from '@iconify/react';
import downloadFill from '@iconify/icons-eva/download-fill';
// import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { PDFDownloadLink } from '@react-pdf/renderer';
// material
import { LoadingButton } from '@mui/lab';

import { useState, useEffect } from 'react';

import CoopArusKasReportPDF from './CoopArusKasReportPDF';
import { ExportToExcel } from 'components/ExportToExcel';
import { Stack } from '@mui/material';

type CoopArusKasData = {
  jumlahKasAwal: number;
  kasMasuk: number;
  kasKeluar: number;
  jumlahKasAkhir: number;
};

export default function CoopArusKasReportToolbar(props: {
  coopArusKasData: CoopArusKasData | undefined;
}) {
  const [sheetData, setSheetData] = useState<{ No: string; Komponen: string; Jumlah: number }[]>();

  useEffect(() => {
    if (props.coopArusKasData) {
      let sheetData = [
        { No: '1', Komponen: 'Jumlah Kas Awal', Jumlah: props.coopArusKasData.jumlahKasAwal },
        { No: '2', Komponen: 'Kas Masuk', Jumlah: props.coopArusKasData.kasMasuk },
        { No: '3', Komponen: 'Kas Keluar', Jumlah: props.coopArusKasData.kasKeluar },
        { No: '', Komponen: 'Jumlah Kas Akhir', Jumlah: props.coopArusKasData.jumlahKasAkhir }
      ];

      setSheetData(sheetData);
    }
  }, [props.coopArusKasData]);

  return props.coopArusKasData ? (
    <>
      <Stack direction="row" spacing={2}>
        <PDFDownloadLink
          document={<CoopArusKasReportPDF coopArusKasData={props.coopArusKasData} />}
          fileName={`LAPORAN-ARUS-KAS-KOPERASI`}
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
              Download Laporan Arus Kas Koperasi
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
          filename={'LAPORAN-ARUS-KAS-KOPERASI'}
        />
      </Stack>
    </>
  ) : (
    <div>Loading</div>
  );
}
