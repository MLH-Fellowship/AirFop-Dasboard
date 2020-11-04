import React from 'react'
import StatusFilter from './StatusFilter'
import DateRangeFilter from './DateRangeFilter'
import { connect } from 'react-redux'
import { updateFilter } from '../../store/actions/projectActions'

const Filter = ({filterProjects, projects, updateFilter, greenSelected, yellowSelected, redSelected, startDate, endDate, showAll}) => {
  
  const handleCheckboxChange = (e) => {
    console.log(projects, 'P')
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
    <div >
      <div className="header">
        <StatusFilter
          filterProjects={filterProjects}
          handleCheckboxChange={handleCheckboxChange}
        />
        <DateRangeFilter
          handleCheckboxChange={handleCheckboxChange}
        />
      </div>
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

const mapDispatchToProps = (dispatch) => {
  return{
    updateFilter: (label,value) => dispatch(updateFilter(label,value))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Filter);
