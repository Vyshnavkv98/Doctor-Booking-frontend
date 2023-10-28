import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import PropTypes from 'prop-types'
const styles = StyleSheet.create({
  page: {
    marginTop:'40px',
    backgroundColor: 'white',
    padding: 20,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  column: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 5,
  },
  prescription: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: "20px"
  },
  table: {
    display: 'table',
    marginTop:'10px',
    width: '100%',
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    flex: 1,
   
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    padding: 5,
    fontSize: 12,
  },
});


function MyPdf({ data }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <View style={styles.column}>
            <Text style={styles.label}>Name : {data?.name} </Text>
            <Text style={styles.label}>Address : {data.user?.address}</Text>
            <Text style={styles.label}>Gender : {data?.user?.gender}</Text>
          </View>
          <View style={styles.column}>
            {/* <Text style={styles.label}>Doctor : {data.docData[0].name}</Text> */}
            <Text style={styles.label}>Date : {data.date}</Text>
            <Text style={styles.label}>Time : {data.time}</Text>
          </View>
        </View>
        {data?.prescription && (
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.label}>Medication Name</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.label}>Dosage</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.label}>Frequency</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.label}>Instructions</Text>
              </View>
            </View>
            {data.prescription.map((medication, index) => (
              <View style={styles.tableRow} key={index}>
                <View style={styles.tableCell}>
                  <Text>{medication.medicationName}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{medication.dosage}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{medication.frequency}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{medication.instructions}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );

}

export default MyPdf;