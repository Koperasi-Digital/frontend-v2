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
  kas: number;
  asetTetap: number;
  aset: number;
  saldoMember: number;
  simpananSukarela: number;
  liabilitas: number;
  pendapatan: number;
  modal: number;
  beban: number;
  ekuitas: number;
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
        { No: '', Komponen: 'Aset', Jumlah: props.coopNeracaData.aset },
        { No: '3', Komponen: 'Saldo Member', Jumlah: props.coopNeracaData.saldoMember },
        {
          No: '4',
          Komponen: 'Simpanan Sukarela Member',
          Jumlah: props.coopNeracaData.simpananSukarela
        },
        { No: '', Komponen: 'Liabilitas', Jumlah: props.coopNeracaData.liabilitas },
        { No: '5', Komponen: 'Pendapatan', Jumlah: props.coopNeracaData.pendapatan },
        { No: '6', Komponen: 'Modal', Jumlah: props.coopNeracaData.modal },
        { No: '7', Komponen: 'Beban', Jumlah: props.coopNeracaData.beban },
        { No: '', Komponen: 'Ekuitas', Jumlah: props.coopNeracaData.ekuitas }
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
        <ExportToExcel
          worksheetsNames={['Data Sheet']}
          sizes={[{ width: 0, height: 0 }]}
          contents={[
            {
              sheetData: sheetData
            }
          ]}
          filename={'LAPORAN-NERACA-KOPERASI'}
        />
      </Stack>
    </>
  ) : (
    <div>Loading</div>
  );
}
