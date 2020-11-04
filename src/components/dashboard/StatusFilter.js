import React from 'react'
import { connect } from 'react-redux'

const StatusFilter = ({ greenSelected, yellowSelected,redSelected, handleCheckboxChange}) => {
  return (
    <div className="form-check filter status-filter-grid">
      <label className="form-check">Filter Status: </label>
      <div>
      <label>
        <input
          type="checkbox"
          id='green'
          checked={greenSelected}
          onChange={e=>handleCheckboxChange(e)}
          className="form-check-input"
        />
        {" "}Green
      </label>
      <label>
        <input
          type="checkbox"
          id='yellow'
          checked={yellowSelected}
          onChange={e=>handleCheckboxChange(e)}
          className="form-check-input"
        />
        {" "}Yellow
      </label>
      <label>
        <input
          type="checkbox"
          id='red'
          checked={redSelected}
          onChange={e=>handleCheckboxChange(e)}
          className="form-check-input"
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