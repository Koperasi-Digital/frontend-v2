import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import downloadFill from '@iconify/icons-eva/download-fill';
// import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { PDFDownloadLink } from '@react-pdf/renderer';
// material
import { LoadingButton } from '@mui/lab';

import LabaRugiReportPDF from './LabaRugiReportPDF';

export default function LaporanLabaRugiToolbar() {
  const [bankingExpenseChartURI, setBankingExpenseChartURI] = useState<string>();

  useEffect(() => {
    const getChartURI = async () => {
      const chartURI = await ApexCharts.exec('banking-expense-chart', 'dataURI');
      if (chartURI) {
        setBankingExpenseChartURI(chartURI.imgURI);
      } else {
        setTimeout(() => {
          getChartURI();
        }, 10);
      }
    };

    setTimeout(() => {
      getChartURI();
    }, 10);
  }, []);

  console.log('BankingExpenseChartURI: ', bankingExpenseChartURI);

  return bankingExpenseChartURI ? (
    <>
      <PDFDownloadLink
        document={<LabaRugiReportPDF bankingExpenseChartURI={bankingExpenseChartURI} />}
        fileName={`LAPORAN-NERACA-1`}
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
