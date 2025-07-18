import {
  Page,
  Text,
  View,
  Document,
  Font,
  Image,
  Svg,
  Path,
  StyleSheet
} from '@react-pdf/renderer';

import { fCurrency, fPercent } from 'utils/formatNumber';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

Font.register({
  family: 'Roboto',
  fonts: [{ src: '/fonts/Roboto-Regular.ttf' }, { src: '/fonts/Roboto-Bold.ttf' }]
});

// Create styles
const styles = StyleSheet.create({
  col3: { width: '25%' },
  col6: { width: '50%' },
  col9: { width: '75%' },
  col12: { width: '100%' },
  height2: { height: '17%' },
  height3: { height: '25%' },
  height6: { height: '50%' },
  height7: { height: '58%' },
  height9: { height: '75%' },
  height12: { height: '100%' },
  mb0: { marginBottom: 0 },
  mb15: { marginBottom: 15 },
  mb40: { marginBottom: 40 },
  mb70: { marginBottom: 70 },
  ml05: { marginLeft: 0.5 },
  overline: {
    fontSize: 8,
    marginBottom: 8,
    fontWeight: 700,
    letterSpacing: 1.2,
    textTransform: 'uppercase'
  },
  h3: { fontSize: 16, fontWeight: 700 },
  h4: { fontSize: 13, fontWeight: 700 },
  body1: { fontSize: 10 },
  body2: { fontSize: 9, textTransform: 'lowercase' },
  opacity072: { opacity: 0.72 },
  subtitle2: { fontSize: 9, fontWeight: 700 },
  alignRight: { textAlign: 'right' },
  incomeRoot: {
    width: '100%',
    boxShadow: 'none',
    position: 'relative',
    color: '#1B5E20',
    borderColor: '#1B5E20',
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 10,
    spacing: 1
  },
  expensesRoot: {
    width: '100%',
    boxShadow: 'none',
    position: 'relative',
    color: '#7A4F01',
    borderColor: '#7A4F01',
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 10,
    spacing: 1
  },
  bgGreen: {
    backgroundColor: '#C8E6C9'
  },
  page: {
    padding: '40px 24px 0 24px',
    fontSize: 9,
    lineHeight: 1.6,
    fontFamily: 'Roboto',
    backgroundColor: '#fff',
    textTransform: 'capitalize'
  },
  footer: {
    left: 0,
    right: 0,
    bottom: 0,
    padding: 24,
    margin: 'auto',
    borderTopWidth: 1,
    borderStyle: 'solid',
    position: 'absolute',
    borderColor: '#DFE3E8'
  },
  gridContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  gridContainer2: { flexDirection: 'row' },
  table: { display: 'flex', width: 'auto' },
  tableHeader: {},
  tableBody: {},
  tableRow: {
    padding: '8px 0',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#DFE3E8'
  },
  noBorder: { paddingTop: 8, paddingBottom: 0, borderBottomWidth: 0 },
  tableCell_1: { width: '5%' },
  tableCell_2: { width: '50%', paddingRight: 16 },
  tableCell_3: { width: '15%' }
});

type LabaRugiData = {
  jumlahPenjualan: number;
  sisaHasilUsaha: number;
  biayaProduksiProdukTerjual: number;
  biayaSimpananPokok: number;
  biayaSimpananWajib: number;
  biayaOperasi: number;
  net: number;
};

// Create Document Component
export default function LabaRugiReportPDF(props: {
  bankingExpenseChartURI: string | undefined;
  bankingIncomeChartURI: string | undefined;
  bankingBalanceStatisticsChartURI: string | undefined;
  bankingExpenseCategoriesChartURI: string | undefined;
  currentLabaRugiData: LabaRugiData;
  incomePercent: number;
  expensePercent: number;
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={[styles.overline]}>Laporan Laba Rugi</Text>
        </View>
        <View style={[styles.table, isMobile ? styles.mb40 : styles.mb0]}>
          <View style={styles.tableHeader}>
            <View style={styles.tableRow}>
              <View style={styles.tableCell_1}>
                <Text style={styles.subtitle2}>#</Text>
              </View>
              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>Komponen</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.subtitle2}>Jumlah</Text>
              </View>
            </View>
          </View>
          <View style={styles.tableBody}>
            <View style={styles.tableRow}>
              <View style={styles.tableCell_1}>
                <Text style={styles.subtitle2}>1</Text>
              </View>
              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>Jumlah Penjualan</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.subtitle2}>
                  {fCurrency(props.currentLabaRugiData.jumlahPenjualan)}
                </Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell_1}>
                <Text style={styles.subtitle2}>2</Text>
              </View>
              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>Sisa Hasil Usaha</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.subtitle2}>
                  {fCurrency(props.currentLabaRugiData.sisaHasilUsaha)}
                </Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell_1}>
                <Text style={styles.subtitle2}>3</Text>
              </View>
              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>Biaya Produksi Produk Terjual</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.subtitle2}>
                  {fCurrency(props.currentLabaRugiData.biayaProduksiProdukTerjual)}
                </Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell_1}>
                <Text style={styles.subtitle2}>4</Text>
              </View>
              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>Biaya Simpanan Pokok</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.subtitle2}>
                  {fCurrency(props.currentLabaRugiData.biayaSimpananPokok)}
                </Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell_1}>
                <Text style={styles.subtitle2}>5</Text>
              </View>
              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>Biaya Simpanan Wajib</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.subtitle2}>
                  {fCurrency(props.currentLabaRugiData.biayaSimpananWajib)}
                </Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell_1}>
                <Text style={styles.subtitle2}>6</Text>
              </View>
              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>Biaya Operasi</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.subtitle2}>
                  {fCurrency(props.currentLabaRugiData.biayaOperasi)}
                </Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell_1}>
                <Text style={styles.subtitle2}></Text>
              </View>
              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>Net</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.subtitle2}>{fCurrency(props.currentLabaRugiData.net)}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={[styles.gridContainer, isMobile ? styles.mb40 : styles.mb0]}>
          <View style={styles.col6}>
            <View style={styles.incomeRoot}>
              <View style={styles.gridContainer}>
                <View style={styles.col9}>
                  <Text style={styles.subtitle2}>Pemasukan</Text>
                  <Text style={styles.h3}>
                    {fCurrency(
                      props.currentLabaRugiData.jumlahPenjualan +
                        props.currentLabaRugiData.sisaHasilUsaha
                    )}
                  </Text>
                </View>
                <View style={styles.col3}>
                  <Svg width="20" height="20">
                    <Path
                      d="M17.71 6.29a1 1 0 0 0-1.42 0L8 14.59V9a1 1 0 0 0-2 0v8a1 1 0 0 0 1 1h8a1 1 0 0 0 0-2H9.41l8.3-8.29a1 1 0 0 0 0-1.42Z"
                      stroke="#1B5E20"
                      strokeWidth={1}
                    />
                  </Svg>
                </View>
              </View>
              <View style={styles.gridContainer2}>
                <Svg width="25" height="25">
                  {props.incomePercent >= 0 ? (
                    <Path
                      d="M21 7a.78.78 0 0 0 0-.21a.64.64 0 0 0-.05-.17a1.1 1.1 0 0 0-.09-.14a.75.75 0 0 0-.14-.17l-.12-.07a.69.69 0 0 0-.19-.1h-.2A.7.7 0 0 0 20 6h-5a1 1 0 0 0 0 2h2.83l-4 4.71l-4.32-2.57a1 1 0 0 0-1.28.22l-5 6a1 1 0 0 0 .13 1.41A1 1 0 0 0 4 18a1 1 0 0 0 .77-.36l4.45-5.34l4.27 2.56a1 1 0 0 0 1.27-.21L19 9.7V12a1 1 0 0 0 2 0V7Z"
                      stroke="#1B5E20"
                      strokeWidth={1}
                    />
                  ) : (
                    <Path
                      d="M21 12a1 1 0 0 0-2 0v2.3l-4.24-5a1 1 0 0 0-1.27-.21L9.22 11.7L4.77 6.36a1 1 0 1 0-1.54 1.28l5 6a1 1 0 0 0 1.28.22l4.28-2.57l4 4.71H15a1 1 0 0 0 0 2h5a1.1 1.1 0 0 0 .36-.07l.14-.08a1.19 1.19 0 0 0 .15-.09a.75.75 0 0 0 .14-.17a1.1 1.1 0 0 0 .09-.14a.64.64 0 0 0 .05-.17A.78.78 0 0 0 21 17Z"
                      stroke="#1B5E20"
                      strokeWidth={1}
                    />
                  )}
                </Svg>
                <Text style={[styles.subtitle2, styles.ml05]}>
                  {props.incomePercent > 0 && '+'}
                  {fPercent(props.incomePercent)}
                </Text>
                <Text style={[styles.body2, styles.opacity072]}>&nbsp;dari bulan lalu</Text>
              </View>
              {props.bankingIncomeChartURI ? (
                <Image style={styles.bgGreen} src={props.bankingIncomeChartURI} />
              ) : null}
            </View>
          </View>
          <View style={styles.col6}>
            <View style={styles.expensesRoot}>
              <View style={styles.gridContainer}>
                <View style={styles.col9}>
                  <Text style={styles.subtitle2}>Pengeluaran</Text>
                  <Text style={styles.h3}>
                    {fCurrency(
                      props.currentLabaRugiData.biayaProduksiProdukTerjual +
                        props.currentLabaRugiData.biayaSimpananPokok +
                        props.currentLabaRugiData.biayaSimpananWajib +
                        props.currentLabaRugiData.biayaOperasi
                    )}
                  </Text>
                </View>
                <View style={styles.col3}>
                  <Svg width="20" height="20">
                    <Path
                      d="M18 7.05a1 1 0 0 0-1-1L9 6a1 1 0 0 0 0 2h5.56l-8.27 8.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0L16 9.42V15a1 1 0 0 0 1 1a1 1 0 0 0 1-1Z"
                      stroke="#7A4F01"
                      strokeWidth={1}
                    />
                  </Svg>
                </View>
              </View>
              <View style={styles.gridContainer2}>
                <Svg width="25" height="25">
                  {props.expensePercent >= 0 ? (
                    <Path
                      d="M21 7a.78.78 0 0 0 0-.21a.64.64 0 0 0-.05-.17a1.1 1.1 0 0 0-.09-.14a.75.75 0 0 0-.14-.17l-.12-.07a.69.69 0 0 0-.19-.1h-.2A.7.7 0 0 0 20 6h-5a1 1 0 0 0 0 2h2.83l-4 4.71l-4.32-2.57a1 1 0 0 0-1.28.22l-5 6a1 1 0 0 0 .13 1.41A1 1 0 0 0 4 18a1 1 0 0 0 .77-.36l4.45-5.34l4.27 2.56a1 1 0 0 0 1.27-.21L19 9.7V12a1 1 0 0 0 2 0V7Z"
                      stroke="#7A4F01"
                      strokeWidth={1}
                    />
                  ) : (
                    <Path
                      d="M21 12a1 1 0 0 0-2 0v2.3l-4.24-5a1 1 0 0 0-1.27-.21L9.22 11.7L4.77 6.36a1 1 0 1 0-1.54 1.28l5 6a1 1 0 0 0 1.28.22l4.28-2.57l4 4.71H15a1 1 0 0 0 0 2h5a1.1 1.1 0 0 0 .36-.07l.14-.08a1.19 1.19 0 0 0 .15-.09a.75.75 0 0 0 .14-.17a1.1 1.1 0 0 0 .09-.14a.64.64 0 0 0 .05-.17A.78.78 0 0 0 21 17Z"
                      stroke="#7A4F01"
                      strokeWidth={1}
                    />
                  )}
                </Svg>
                <Text style={[styles.subtitle2, styles.ml05]}>
                  {props.expensePercent > 0 && '+'}
                  {fPercent(props.expensePercent)}
                </Text>
                <Text style={[styles.body2, styles.opacity072]}>&nbsp;dari bulan lalu</Text>
              </View>
              {props.bankingExpenseChartURI ? <Image src={props.bankingExpenseChartURI} /> : null}
            </View>
          </View>
        </View>
        <View style={[styles.col12, isMobile ? styles.mb70 : styles.mb0]}>
          <Text style={styles.subtitle2}>Statistik Saldo</Text>
          {props.bankingBalanceStatisticsChartURI ? (
            <Image src={props.bankingBalanceStatisticsChartURI} />
          ) : null}
        </View>
        <View style={isMobile ? styles.col3 : styles.col6}>
          <Text style={styles.subtitle2}>Kategori Pengeluaran</Text>
          {props.bankingExpenseCategoriesChartURI ? (
            <Image src={props.bankingExpenseCategoriesChartURI} />
          ) : null}
        </View>
      </Page>
    </Document>
  );
}
