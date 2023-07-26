import React from 'react';
import { PDFViewer, Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
    padding: 20,
  },
  section: {
    flexGrow: 1,
  },
  text: {
    marginBottom: 10,
  },
});

const PDFContent = ({ data }) => (
  <Document>
    {console.log(data)}
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        {data.map((item) => (
          <View key={item.id} style={{ marginBottom: 10 }}>
            <Text style={styles.text}>Text: {item.text}</Text>
            <Text style={styles.text}>Prediction: {item.prediction}</Text>
          </View>
        ))}
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
