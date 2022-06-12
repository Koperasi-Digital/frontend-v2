import { Icon } from '@iconify/react';
import { useCallback, useEffect, useState } from 'react';
import downloadFill from '@iconify/icons-eva/download-fill';
// import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { PDFDownloadLink } from '@react-pdf/renderer';
// material
import { LoadingButton } from '@mui/lab';

import LabaRugiReportPDF from './LabaRugiReportPDF';
import { ExportToExcel } from 'components/ExportToExcel';

import { Stack, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { fCurrency, fPercent } from 'utils/formatNumber';

type LabaRugiData = {
  jumlahPenjualan: number;
  sisaHasilUsaha: number;
  biayaProduksiProdukTerjual: number;
  biayaSimpananPokok: number;
  biayaSimpananWajib: number;
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
  const [isLoadingGetChartURI, setIsLoadingGetChartURI] = useState<boolean>(true);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
          Komponen: 'Sisa Hasil Usaha',
          Jumlah: props.currentLabaRugiData.sisaHasilUsaha
        },
        {
          No: '3',
          Komponen: 'Biaya Produksi Produk Terjual',
          Jumlah: props.currentLabaRugiData.biayaProduksiProdukTerjual
        },
        {
          No: '4',
          Komponen: 'Biaya Simpanan Pokok',
          Jumlah: props.currentLabaRugiData.biayaSimpananPokok
        },
        {
          No: '5',
          Komponen: 'Biaya Simpanan Wajib',
          Jumlah: props.currentLabaRugiData.biayaSimpananWajib
        },
        { No: '6', Komponen: 'Biaya Operasi', Jumlah: props.currentLabaRugiData.biayaOperasi },
        { No: '', Komponen: 'Net', Jumlah: props.currentLabaRugiData.net }
      ];

      setSheetData(sheetData);
    }
  }, [props.currentLabaRugiData]);

  const getChartURICallback = useCallback(() => {
    const getChartURI = async () => {
      setIsLoadingGetChartURI(true);
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
        setIsLoadingGetChartURI(false);
      } else {
        setTimeout(() => {
          getChartURI();
        }, 1500);
      }
    };
    setTimeout(() => {
      getChartURI();
    }, 1500);
  }, []);

  useEffect(() => {
    getChartURICallback();
  }, [props.dateValue, getChartURICallback, isMobile]);

  return props.currentLabaRugiData ? (
    <>
      <Stack direction="row" spacing={2}>
        {bankingExpenseChartURI &&
        bankingIncomeChartURI &&
        bankingBalanceStatisticsChartURI &&
        bankingExpenseCategoriesChartURI &&
        !isLoadingGetChartURI ? (
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
                Unduh Laporan Laba Rugi
              </LoadingButton>
            )}
          </PDFDownloadLink>
        ) : (
          <>Loading</>
        )}
        {bankingExpenseChartURI &&
        bankingIncomeChartURI &&
        bankingBalanceStatisticsChartURI &&
        bankingExpenseCategoriesChartURI &&
        sheetData &&
        !isLoadingGetChartURI ? (
          <ExportToExcel
            worksheetsNames={[
              'Data Sheet',
              'Grafik Pengeluaran',
              'Grafik Pemasukan',
              'Grafik Statistik Saldo',
              'Grafik Kategori Pengeluaran'
            ]}
            sizes={[
              { width: 0, height: 0 },
              { width: 200, height: 100 },
              { width: 200, height: 100 },
              { width: 500, height: 200 },
              { width: isMobile ? 150 : 450, height: 200 }
            ]}
            filename={'LAPORAN-LABA-RUGI'}
            contents={[
              {
                sheetData: sheetData
              },
              {
                chartInfo: [
                  `Pengeluaran: ${fCurrency(
                    props.currentLabaRugiData.biayaProduksiProdukTerjual +
                      props.currentLabaRugiData.biayaSimpananPokok +
                      props.currentLabaRugiData.biayaSimpananWajib +
                      props.currentLabaRugiData.biayaOperasi
                  )}`,
                  `${props.expensePercent > 0 ? '+' : ''} ${fPercent(
                    props.expensePercent
                  )} dari bulan lalu`
                ],
                chartBase64: bankingExpenseChartURI
              },
              {
                chartInfo: [
                  `Pemasukan: ${fCurrency(
                    props.currentLabaRugiData.jumlahPenjualan +
                      props.currentLabaRugiData.sisaHasilUsaha
                  )}`,
                  `${props.incomePercent > 0 ? '+' : ''} ${fPercent(
                    props.incomePercent
                  )} dari bulan lalu`
                ],
                chartBase64: bankingIncomeChartURI
              },
              {
                chartInfo: ['Grafik Statistik Saldo'],
                chartBase64: bankingBalanceStatisticsChartURI
              },
              {
                chartInfo: ['Grafik Kategori Pengeluaran'],
                chartBase64: bankingExpenseCategoriesChartURI
              }
            ]}
            onClick={() => {
              setTimeout(() => {
                getChartURICallback();
              }, 1500);
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
