import React from 'react'
import StatusFilter from './StatusFilter'
import DateRangeFilter from './DateRangeFilter'
import { connect } from 'react-redux'
import { updateFilter,  getProjects } from '../../store/actions/projectActions'
import Search from './Search'

const Filter = ({filterProjects, projects, project, updateFilter, greenSelected, yellowSelected, redSelected, startDate, endDate, showAll, showReportBtn}) => {

  const handleCheckboxChange = (e) => {
    const id = e.target.id    
    if(id === 'green'){
      filterProjects(!greenSelected, yellowSelected, redSelected, startDate,endDate)
      updateFilter('green', !greenSelected)
    }else if (id === 'yellow'){
      filterProjects(greenSelected, !yellowSelected, redSelected, startDate,endDate)
      updateFilter('yellow', !yellowSelected)
    }else if (id === 'red'){
      filterProjects(greenSelected, yellowSelected, !redSelected, startDate,endDate)
      updateFilter('red', !redSelected)
    }else if (id === "clear"){
      if(startDate){
        updateFilter('start', null);    
      }
      if(endDate){
        updateFilter('end', null);    
      }
      updateFilter('showAll', true);
    }
  }

  return (
    <div className="header">
       <table style={{width:'100%', margin:'0'}}>
        <tbody>
          <tr>
            <th className="header-label">
              Filter by Date Range & Status
            </th>
            <th className="header-label">
              Search by Project Name
            </th>
          </tr>
          <tr>        
            <td id='filter-grid' style={{padding:'10px'}}>
              <StatusFilter
                className='filter'
                filterProjects={filterProjects}
                handleCheckboxChange={handleCheckboxChange}
              />
                <DateRangeFilter
                className='filter'
                handleCheckboxChange={handleCheckboxChange}
                projects={projects}
                project={project}
              />
            </td>
            <td style={{width:'30vw'}} >
              <Search
                className='filter'
              />
            </td>  
          </tr>
        </tbody>
      </table>
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
    // projects:state.project.projects
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    updateFilter: (label,value) => dispatch(updateFilter(label,value)),
    getProjects: (filters) => dispatch(getProjects(filters))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Filter);
