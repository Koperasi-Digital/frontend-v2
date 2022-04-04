import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import downloadFill from '@iconify/icons-eva/download-fill';
// import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { PDFDownloadLink } from '@react-pdf/renderer';
// material
import { LoadingButton } from '@mui/lab';

import LabaRugiReportPDF from './LabaRugiReportPDF';
import { ExportToExcel } from 'components/ExportToExcel';
import { Stack } from '@mui/material';

type LabaRugiData = {
  id: number;
  user_id: number;
  periode: string;
  jumlahPenjualan: number;
  biayaProduksiProdukTerjual: number;
  biayaOperasi: number;
  net: number;
};

export default function LaporanLabaRugiToolbar(props: {
  currentLabaRugiData: LabaRugiData | undefined;
  incomePercent: number;
  expensePercent: number;
}) {
  const [bankingExpenseChartURI, setBankingExpenseChartURI] = useState<string>();
  const [bankingIncomeChartURI, setBankingIncomeChartURI] = useState<string>();
  const [bankingBalanceStatisticsChartURI, setBankingBalanceStatisticsChartURI] =
    useState<string>();
  const [bankingExpenseCategoriesChartURI, setBankingExpenseCategoriesChartURI] =
    useState<string>();

  const [sheetData, setSheetData] = useState<{ No: string; Komponen: string; Jumlah: number }[]>();

  useEffect(() => {
    if (props.currentLabaRugiData) {
      let sheetData = [
        {
          No: '1',
          Komponen: 'Jumlah Penjualan',
          Jumlah: props.currentLabaRugiData.jumlahPenjualan
        },
        {
          No: '2',
          Komponen: 'Biaya Produksi Produk Terjual',
          Jumlah: props.currentLabaRugiData.biayaProduksiProdukTerjual
        },
        { No: '3', Komponen: 'Biaya Operasi', Jumlah: props.currentLabaRugiData.biayaOperasi },
        { No: '', Komponen: 'Net', Jumlah: props.currentLabaRugiData.net }
      ];

      setSheetData(sheetData);
    }
  }, [props.currentLabaRugiData]);

  useEffect(() => {
    const getChartURI = async () => {
      const bankingExpenseChartURI = await ApexCharts.exec('banking-expense-chart', 'dataURI');
      const bankingIncomeChartURI = await ApexCharts.exec('banking-income-chart', 'dataURI');
      const bankingBalanceStatisticsChartURI = await ApexCharts.exec(
        'banking-balance-statistics',
        'dataURI'
      );
      const bankingExpenseCategoriesChartURI = await ApexCharts.exec(
        'banking-expense-categories',
        'dataURI'
      );
      if (
        bankingExpenseChartURI &&
        bankingIncomeChartURI &&
        bankingBalanceStatisticsChartURI &&
        bankingExpenseCategoriesChartURI
      ) {
        setBankingExpenseChartURI(bankingExpenseChartURI.imgURI);
        setBankingIncomeChartURI(bankingIncomeChartURI.imgURI);
        setBankingBalanceStatisticsChartURI(bankingBalanceStatisticsChartURI.imgURI);
        setBankingExpenseCategoriesChartURI(bankingExpenseCategoriesChartURI.imgURI);
      } else {
        setTimeout(() => {
          getChartURI();
        }, 1000);
      }
    };

    setTimeout(() => {
      getChartURI();
    }, 1000);
  }, []);

  return props.currentLabaRugiData ? (
    <>
      <Stack direction="row" spacing={2}>
        <PDFDownloadLink
          document={
            <LabaRugiReportPDF
              bankingExpenseChartURI={bankingExpenseChartURI}
              bankingIncomeChartURI={bankingIncomeChartURI}
              bankingBalanceStatisticsChartURI={bankingBalanceStatisticsChartURI}
              bankingExpenseCategoriesChartURI={bankingExpenseCategoriesChartURI}
              currentLabaRugiData={props.currentLabaRugiData}
              incomePercent={props.incomePercent}
              expensePercent={props.expensePercent}
            />
          }
          fileName={`LAPORAN-LABA-RUGI`}
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
              Download Laporan Laba Rugi
            </LoadingButton>
          )}
        </PDFDownloadLink>
        <ExportToExcel csvData={sheetData} fileName={'LAPORAN-LABA-RUGI'} />
      </Stack>
    </>
  ) : (
    <div>Loading</div>
  );
}
