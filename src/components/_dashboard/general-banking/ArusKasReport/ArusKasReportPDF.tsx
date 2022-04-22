import { Page, Text, View, Document, Font, StyleSheet } from '@react-pdf/renderer';

import { fCurrency } from 'utils/formatNumber';

Font.register({
  family: 'Roboto',
  fonts: [{ src: '/fonts/Roboto-Regular.ttf' }, { src: '/fonts/Roboto-Bold.ttf' }]
});

// Create styles
const styles = StyleSheet.create({
  col4: { width: '25%' },
  col8: { width: '75%' },
  col6: { width: '50%' },
  mb8: { marginBottom: 8 },
  mb40: { marginBottom: 40 },
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

type ArusKasData = {
  jumlahKasAwal: number;
  kasMasuk: number;
  kasKeluar: number;
  jumlahKasAkhir: number;
};

// Create Document Component
export default function ArusKasReportPDF(props: { arusKasData: ArusKasData }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={[styles.overline]}>Laporan Arus Kas</Text>
        </View>
        <View style={styles.table}>
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
                <Text style={styles.subtitle2}>Jumlah Kas Awal</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.subtitle2}>{fCurrency(props.arusKasData.jumlahKasAwal)}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell_1}>
                <Text style={styles.subtitle2}>2</Text>
              </View>
              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>Kas Masuk</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.subtitle2}>{fCurrency(props.arusKasData.kasMasuk)}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell_1}>
                <Text style={styles.subtitle2}>3</Text>
              </View>
              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>Kas Keluar</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.subtitle2}>{fCurrency(props.arusKasData.kasKeluar)}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell_1}>
                <Text style={styles.subtitle2}></Text>
              </View>
              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>Jumlah Kas Akhir</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.subtitle2}>{fCurrency(props.arusKasData.jumlahKasAkhir)}</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
