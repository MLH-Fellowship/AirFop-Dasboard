import React from 'react'
import { connect } from 'react-redux'

const StatusFilter = ({ greenSelected, yellowSelected,redSelected, handleCheckboxChange}) => {
  return (
    <div className=" filter status-filter-grid">
      <label className="">Filter Status: </label>
      <div>
      <label className="status-check-box">
        <input
          type="checkbox"
          id='green'
          checked={greenSelected}
          onChange={e=>handleCheckboxChange(e)}
          
        />
        {" "}Green
      </label>
      <label className="status-check-box">
        <input
          type="checkbox"
          id='yellow'
          checked={yellowSelected}
          onChange={e=>handleCheckboxChange(e)}
          
        />
        {" "}Yellow
      </label>
      <label className="status-check-box">
        <input
          type="checkbox"
          id='red'
          checked={redSelected}
          onChange={e=>handleCheckboxChange(e)}
          
        />
        {" "}Red
      </label>
      </div>
      
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    greenSelected: state.project.greenSelected,
    yellowSelected: state.project.yellowSelected,
    redSelected: state.project.redSelected,
  }
}


export default connect(mapStateToProps)(StatusFilter);