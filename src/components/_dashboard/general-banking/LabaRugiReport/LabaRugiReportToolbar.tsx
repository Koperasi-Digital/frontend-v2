import { Icon } from '@iconify/react';
import { useCallback, useEffect, useState } from 'react';
import downloadFill from '@iconify/icons-eva/download-fill';
// import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { PDFDownloadLink } from '@react-pdf/renderer';
// material
import { LoadingButton } from '@mui/lab';

import LabaRugiReportPDF from './LabaRugiReportPDF';
import { ExportToExcel } from 'components/ExportToExcel';
import { Stack } from '@mui/material';

import { fCurrency, fPercent } from 'utils/formatNumber';

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
  dateValue: Date;
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

  const getChartURICallback = useCallback(() => {
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

  useEffect(() => {
    getChartURICallback();
  }, [props.dateValue, getChartURICallback]);

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
              onClick={() => {
                setTimeout(() => {
                  getChartURICallback();
                }, 1000);
              }}
              endIcon={<Icon icon={downloadFill} />}
            >
              Download Laporan Laba Rugi
            </LoadingButton>
          )}
        </PDFDownloadLink>
        {bankingExpenseChartURI &&
        bankingIncomeChartURI &&
        bankingBalanceStatisticsChartURI &&
        bankingExpenseCategoriesChartURI &&
        sheetData ? (
          <ExportToExcel
            worksheetsNames={[
              'Data Sheet',
              'Grafik Pengeluaran Koperasi',
              'Grafik Pemasukan Koperasi',
              'Grafik Statistik Saldo Koperasi',
              'Grafik Kategori Pengeluaran Koperasi'
            ]}
            sizes={[
              { width: 0, height: 0 },
              { width: 200, height: 100 },
              { width: 200, height: 100 },
              { width: 500, height: 200 },
              { width: 700, height: 200 }
            ]}
            filename={'LAPORAN-LABA-RUGI'}
            contents={[
              {
                sheetData: sheetData
              },
              {
                chartInfo: [
                  `Expenses: ${fCurrency(
                    props.currentLabaRugiData.biayaProduksiProdukTerjual +
                      props.currentLabaRugiData.biayaOperasi
                  )}`,
                  `${props.expensePercent > 0 ? '+' : ''} ${fPercent(
                    props.expensePercent
                  )} than last month`
                ],
                chartBase64: bankingExpenseChartURI
              },
              {
                chartInfo: [
                  `Income: ${fCurrency(props.currentLabaRugiData.jumlahPenjualan)}`,
                  `${props.incomePercent > 0 ? '+' : ''} ${fPercent(
                    props.incomePercent
                  )} than last month`
                ],
                chartBase64: bankingIncomeChartURI
              },
              {
                chartInfo: ['Balance Statistics Chart'],
                chartBase64: bankingBalanceStatisticsChartURI
              },
              {
                chartInfo: ['Expense Categories Chart'],
                chartBase64: bankingExpenseCategoriesChartURI
              }
            ]}
            onClick={() => {
              setTimeout(() => {
                getChartURICallback();
              }, 1000);
            }}
          />
        ) : (
          <>Loading</>
        )}
      </Stack>
    </>
  ) : (
    <div>Loading</div>
  );
}
