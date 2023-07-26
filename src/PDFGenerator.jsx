import React from 'react';
import { PDFViewer, Page, Document, StyleSheet, PDFDownloadLink, View, Text } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  section: {
    flexGrow: 1,
    marginBottom: 10,
  },
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCellTextHeader: {
    width: '66.67%',
    padding: 5,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 12,
  },
  tableCellPredictionHeader: {
    width: '33.33%',
    padding: 5,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 12,
  },
  textCell: {
    width: '66.67%',
    padding: 5,
    borderWidth: 1,
    borderColor: '#000',
    textAlign: 'left',
    fontSize: 10,
  },  
  predictionCell: {
    width: '33.33%',
    padding: 5,
    borderWidth: 1,
    borderColor: '#000',
    textAlign: 'center',
    fontSize: 10,
  },
  headerText: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  titleText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

const PDFContent = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={{ fontSize: 24, textAlign: 'center', marginBottom: 10 }}>Report</Text>
        <Text style={{ fontSize: 16, textAlign: 'center' }}>Observations and Results</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellTextHeader}>Text</Text>
            <Text style={styles.tableCellPredictionHeader}>Prediction</Text>
          </View>
          {data.map((item) => (
            <View style={styles.tableRow} key={item.id}>
              <Text style={styles.textCell}>{item.text}</Text>
              <Text style={styles.predictionCell}>{item.prediction}</Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

const PDFGenerator = ({ theData }) => { 
  return (
    <div>
      {/* Button to generate and download the PDF */}
      <PDFDownloadLink document={<PDFContent data={theData}/>} fileName="The_Report.pdf">
        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
      </PDFDownloadLink>

      {/* PDF Viewer */}
      <div style={{ height: '1000px', width: '800px', margin: '20px auto' }}>
        <PDFViewer>
          <PDFContent data={theData}/>
        </PDFViewer>
      </div>
    </div>
  );
};

export default PDFGenerator;
