import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { connect } from 'react-redux'
var moment = require('moment');

// Create styles
const styles = StyleSheet.create({
  page: {
    padding:30
  },
  section: {
    margin: 10,
    padding: 10,
    fontSize:12,
    border:1
  }
});

// Create Document Component

const MyDocument = ({projects, statusFilter, dateFilter, createdOn, showSearch}) => (
  <Document title='report' fileName='report'>
    {projects && projects.length > 0 &&(
      <Page size="A4" style={styles.page}> 
      <View>
        <Text style={{fontSize:16, textAlign:'center', textDecoration:'underline', paddingBottom:'10px'}}>Projects Report</Text>
      </View>
      {!showSearch && (
        <View style={styles.section}>
        <Text style={{fontWeight:'bold'}}>Created on: {createdOn}</Text>
        <Text style={{fontWeight:'bold'}}>Filtering:</Text>
        <Text style={{padding:'2px 10px'}}>Status:{statusFilter} </Text>
        <Text style={{padding:'2px 10px'}}>Date Range: {dateFilter}</Text>
      </View>
      )}
      {showSearch && (
        <View style={styles.section}>
          <Text style={{fontWeight:'bold'}}>Created on: {createdOn}</Text>
        </View>
      )}
      
      <View style={styles.section}>
        {projects && projects.length > 0 && projects.map(
          project => (
            <View key={project.project_name} style={{ borderBottom:'1', borderBottomColor:'#cccccc', padding:'10px'}}>
              <Text style={{padding:'5px 0'}}>{project.project_name}: {project.name &&  project.name} </Text>
              <Text style={{padding:'0 5px', lineHeight: '1.5'}}> Status: {project.status}  -  Comments: {project.status_comment}
              </Text>
              <Text style={{padding:'0 5px', lineHeight: '1.5'}}>
              Funding Source: {project.funding_source}  -  Phase:{project.phase}
              </Text>
              <Text style={{padding:'0 5px', lineHeight: '1.5'}}>
              Award Date: {project.award_date}  -  POP: {project.pop} 
              </Text>
              <Text style={{padding:'0 5px', lineHeight: '1.5'}}> Customer: {project.customer}  -  Contractor: {project.contractor}  -  PM: {project.pm}
              </Text>
            </View>
          )
        )}
      </View>
    </Page>
    )}
  </Document>
);

const Report = ({projects,  greenSelected, yellowSelected, redSelected, startDate, endDate, showSearch}) => {
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
      <PDFDownloadLink document={<MyDocument projects={projects? projects : []} statusFilter={statusFilter} dateFilter={dateFilter} createdOn={createdOn} showSearch={showSearch} />} fileName="report.pdf">
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
    showAll: state.project.showAll,
    showSearch: state.project.showSearch
  }
}

export default connect(mapStateToProps)(Report);
