import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { connect } from 'react-redux'
var moment = require('moment');

// Create styles
const styles = StyleSheet.create({
  page: {
    padding:20
  },
  section: {
    margin: 10,
    padding: 15,
    fontSize:12,
    border:1
  }
});

// Create Document Component

const MyDocument = ({projects, statusFilter, dateFilter, createdOn}) => (
  <Document title='report' fileName='report'>
    {projects && projects.length > 0 &&(
      <Page size="A4" style={styles.page}>
      <View>
        <Text style={{fontSize:16, textAlign:'center', textDecoration:'underline', paddingBottom:'10px'}}>Projects Report</Text>
      </View>
      <View style={styles.section} >
        <Text style={{fontWeight:'bold', fontSize:14}}>Created on: {createdOn}</Text>
        <Text style={{fontWeight:'bold', fontSize:14}}>Filtering:</Text>
        <Text style={{padding:'2px 10px'}}>Status:{statusFilter} </Text>
        <Text style={{padding:'2px 10px'}}>Date Range: {dateFilter}</Text>
      </View>
      <View style={styles.section}>
      <Text style={{fontWeight:'bold', fontSize:14, paddingBottom:'10px'}}>Projects:</Text>
        {projects && projects.length > 0 && projects.map(
          project => (
            <View>
              <Text key={project.project_name} style={{ borderBottom:'1', borderBottomColor:'#cccccc', padding:'10px'}}>{project.project_name} - Status: {project.status} </Text>
              <Text> phase:{project.phase}, award date: {project.award_date}, pop: {project.pop}, customer: {project.customer}, contractor: {project.contractor}, pm: {project.pm}, status: {project.status}, status comment: {project.status_comment}, funding source: {project.funding_source}
              </Text>
            </View>
          )
        )}
      </View>
    </Page>
    )}
  </Document>
);

const Report = ({projects,  greenSelected, yellowSelected, redSelected, startDate, endDate}) => {
    let statusFilter = " "
    if(greenSelected){statusFilter += '*Green '}
    if(yellowSelected){statusFilter += '*Yellow '}
    if(redSelected){statusFilter += '*Red '}
   
    let dateFilter = " *Start Date: "
    startDate ? dateFilter += moment(startDate).format("MM/DD/yyyy") : dateFilter += "None"
    dateFilter += " *End Date: "
    endDate ? dateFilter += moment(endDate).format("MM/DD/yyyy") : dateFilter += "None"

    const date = new Date();
    const createdOn = moment(date).format("MM/DD/yyyy")

    return(
      <div>
      <PDFDownloadLink document={<MyDocument projects={projects} statusFilter={statusFilter} dateFilter={dateFilter} createdOn={createdOn} />} fileName="report.pdf">
        {({ blob, url, loading, error }) => (
          loading ? 'Loading document...' :
          // <div style={{}}>
            <button  className= "small-btn-block" >Save Report</button>
          // </div>
        )}
      </PDFDownloadLink>
    </div>
  )
}

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
