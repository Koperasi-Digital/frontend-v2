import { Icon } from '@iconify/react';
import { useCallback, useEffect, useState } from 'react';
import downloadFill from '@iconify/icons-eva/download-fill';
// import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { PDFDownloadLink } from '@react-pdf/renderer';
// material
import { LoadingButton } from '@mui/lab';

import CoopLabaRugiReportPDF from './CoopLabaRugiReportPDF';
import { ExportToExcel } from 'components/ExportToExcel';
import { Stack } from '@mui/material';

import { fCurrency, fPercent } from 'utils/formatNumber';

import { CoopLabaRugiData } from '../../../../@types/finance-report';

export default function CoopLabaRugiReportToolbar(props: {
  currentCoopLabaRugiData: CoopLabaRugiData | undefined;
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
    if (props.currentCoopLabaRugiData) {
      let sheetData = [
        {
          No: '1',
          Komponen: 'Jumlah Simpanan Pokok',
          Jumlah: props.currentCoopLabaRugiData.jumlahSimpananPokok
        },
        {
          No: '2',
          Komponen: 'Jumlah Simpanan Wajib',
          Jumlah: props.currentCoopLabaRugiData.jumlahSimpananWajib
        },
        {
          No: '3',
          Komponen: 'Jumlah Biaya Layanan',
          Jumlah: props.currentCoopLabaRugiData.jumlahBiayaLayanan
        },
        {
          No: '4',
          Komponen: 'Biaya Sisa Hasil Usaha',
          Jumlah: props.currentCoopLabaRugiData.biayaSisaHasilUsaha
        },
        { No: '5', Komponen: 'Biaya Operasi', Jumlah: props.currentCoopLabaRugiData.biayaOperasi },
        { No: '', Komponen: 'Net', Jumlah: props.currentCoopLabaRugiData.net }
      ];

      setSheetData(sheetData);
    }
  }, [props.currentCoopLabaRugiData]);

  const getChartURICallback = useCallback(() => {
    const getChartURI = async () => {
      const bankingExpenseChartURI = await ApexCharts.exec('coop-expense-chart', 'dataURI');
      const bankingIncomeChartURI = await ApexCharts.exec('coop-income-chart', 'dataURI');
      const bankingBalanceStatisticsChartURI = await ApexCharts.exec(
        'coop-balance-statistics',
        'dataURI'
      );
      const bankingExpenseCategoriesChartURI = await ApexCharts.exec(
        'coop-expense-categories',
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

  return props.currentCoopLabaRugiData ? (
    <>
      <Stack direction="row" spacing={2}>
        <PDFDownloadLink
          document={
            <CoopLabaRugiReportPDF
              bankingExpenseChartURI={bankingExpenseChartURI}
              bankingIncomeChartURI={bankingIncomeChartURI}
              bankingBalanceStatisticsChartURI={bankingBalanceStatisticsChartURI}
              bankingExpenseCategoriesChartURI={bankingExpenseCategoriesChartURI}
              currentCoopLabaRugiData={props.currentCoopLabaRugiData}
              incomePercent={props.incomePercent}
              expensePercent={props.expensePercent}
            />
          }
          fileName={`LAPORAN-LABA-RUGI-KOPERASI`}
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
              Unduh Laporan Laba Rugi Koperasi
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
            filename={'LAPORAN-LABA-RUGI-KOPERASI'}
            contents={[
              {
                sheetData: sheetData
              },
              {
                chartInfo: [
                  `Pengeluaran: ${fCurrency(
                    props.currentCoopLabaRugiData.biayaSisaHasilUsaha +
                      props.currentCoopLabaRugiData.biayaOperasi
                  )}`,
                  `${props.expensePercent > 0 ? '+' : ''} ${fPercent(
                    props.expensePercent
                  )} dari bulan lalu`
                ],
                chartBase64: bankingExpenseChartURI
              },
              {
                chartInfo: [
                  `Pendapatan: ${fCurrency(
                    props.currentCoopLabaRugiData.jumlahSimpananPokok +
                      props.currentCoopLabaRugiData.jumlahSimpananWajib +
                      props.currentCoopLabaRugiData.jumlahBiayaLayanan
                  )}`,
                  `${props.incomePercent > 0 ? '+' : ''} ${fPercent(
                    props.incomePercent
                  )} dari bulan lalu`
                ],
                chartBase64: bankingIncomeChartURI
              },
              {
                chartInfo: ['Statistik Saldo Koperasi'],
                chartBase64: bankingBalanceStatisticsChartURI
              },
              {
                chartInfo: ['Kategori Pengeluaran Koperasi'],
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
