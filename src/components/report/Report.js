import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
// import { projects } from '../../data/Data';

// Create styles
const styles = StyleSheet.create({
  page: {
  
  },
  section: {
    margin: 10,
    padding: 10,
    // fontSize:'20px'
  }
});

// Create Document Component

const MyDocument = ({projects, greenSelected, yellowSelected, redSelected}) => (
  <Document title='report' fileName='report'>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Filtering</Text>
        <Text>Status: {greenSelected && <Text>Green </Text>} {yellowSelected && <Text>Yellow </Text>} {redSelected && <Text>Red</Text>} </Text>
      </View>
      <View style={styles.section}>
      <Text>Projects</Text>
        {projects && projects.length > 0 && projects.map(
            project => (
                <Text>Title:{project.title}({project.id}) - Status: {project.status} </Text>
            )
        )}
      </View>
    </Page>
  </Document>
);

const Report = ({projects,  greenSelected, yellowSelected, redSelected}) => (
    <div>
      <PDFDownloadLink document={<MyDocument projects={projects} greenSelected={greenSelected} yellowSelected={yellowSelected} redSelected={redSelected}/>} fileName="report.pdf">
        {({ blob, url, loading, error }) => (
            loading ? 'Loading document...' :
            <div style={{display:'block', width:'100%'}}>
                <button style={{ margin:'10px 25%'}} className= "btn-block" >Print Report</button>
            </div>
        )}
      </PDFDownloadLink>
    </div>
  )

  const mapStateToProps = (state) => {
    return {
      greenSelected: state.project.greenSelected,
      yellowSelected: state.project.yellowSelected,
      redSelected: state.project.redSelected,
      startDate: state.project.startDate,
      endDate: state.project.endDate,
      showAll: state.project.showAll
    }
  }
  
  export default connect(mapStateToProps)(Report);