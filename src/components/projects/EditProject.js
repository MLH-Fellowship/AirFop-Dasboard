import React, { useState } from 'react'
import {createProject} from '../../store/actions/projectActions'
import {connect} from 'react-redux'
import DatePickerTool from '../dashboard/DatePicker'
import Select from 'react-select'
var moment = require('moment');

const EditProject = ({createProject, project}) => {
  const [projectName, setProjectName] = useState(project.projectName);
  const [name, setName] = useState(project.name ? project.name : "");
  const [number, setNumber] = useState(project.number);
  const [funding, setFunding] = useState(project.funding ? project.funding : "");
  const [awardDate, setAwardDate] = useState(project.awardDate ? moment(project.awardDate).toDate() : null);
  const [POP, setPOP] = useState(project.POP ? project.POP : "");
  const [customer, setCustomer] = useState(project.customer ? project.customer : "");
  const [contractor, setContractor] = useState(project.contractor ? project.contractor : "");
  const [PM, setPM] = useState(project.PM ? project.PM : "");

  const phaseOptions = [
    { value: '', label: 'Select Phase' },
    { value: 'Pre-award', label: 'Pre-award' },
    { value: 'Exclusion', label: 'Exclusion' },
    { value: 'Closeout', label: 'Closeout' }
  ]
  let initPhase;
  switch (project.phase){
    case 'Pre-award':
      initPhase = phaseOptions[1]; 
      break;
    case 'Exclusion':
      initPhase = phaseOptions[2];
      break;
    case 'Closeout':
      initPhase = phaseOptions[3];
      break;
    default:
      initPhase = phaseOptions[0];
  }
  console.log(initPhase, 'ip');
  const [phase, setPhase] = useState(initPhase);

  const statusOptions = [
    { value: '', label: 'Select Status' },
    { value: 'green', label: 'Green' },
    { value: 'yellow', label: 'Yellow' },
    { value: 'red', label: 'Red' }
  ]

  let initStatus;
  switch (project.status){
    case 'green':
      initStatus = statusOptions[1]; 
      break;
    case 'yellow':
      initStatus = statusOptions[2];
      break;
    case 'red':
      initStatus = statusOptions[3];
      break;
    default:
      initStatus = statusOptions[0];
  }

  const [status, setStatus] = useState(initStatus);
  const [statusComment, setStatusComment] = useState(project.statusComment ? project.statusComment : "");

  const onSubmit = (e) => {
    e.preventDefault();
    createProject({
      projectName,
      name,
      number,
      funding,
      phase:phase.value,
      awardDate,
      POP,
      customer,
      contractor,
      PM,
      status,
      statusComment
    }); 
  }

  const validateForm = () => {
    return true;
  }

  const handlePhaseChange = (selectedOption) => {
    setPhase(selectedOption)
    console.log(`Option selected:`, selectedOption.value);
  }
  const handleStatusChange = (selectedOption) => {
    setStatus(selectedOption.value)
    console.log(`Option selected:`, selectedOption);
  }

  const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isFocused
          ? "#cccccc"
          : "#fff",
        color:"#000"
      };
    }
  };

  return (
    <div className="App">
      <div className="card p-30 m-30">
        <form onSubmit={e=>onSubmit(e)} className='new-project'>
        <h1  style={{width:'70%', margin:'auto', padding:'20px'}}className="grey-text">UPDATE PROJECT: {project.projectName}</h1>
          <table id="edit-project-table" style={{width:'70%', margin:'auto'}} >
          <tbody>
            <tr>
              <td className='tableData' colSpan="2">
                <label>Project Name</label>
                <input 
                  type="text" 
                  id="projectName"
                  className="form-input"
                  required 
                  onChange={e=> setProjectName(e.target.value)}
                  value={projectName}
                  placeholder="Project Name (UUID name + number + funding source)" 
                  name="projectName"
                />
              </td>
            </tr>

            <tr>
              <td className='tableData'>
              <label>Name</label>
                <input
                  type="text" 
                  id="name" 
                  onChange={e=> setName(e.target.value)}
                  className="form-input"
                  value={name}
                  name="name"
                />
              </td>
              <td className='tableData'>
              <label>Number</label>
                <input
                  type="text" 
                  id="number" 
                  onChange={e=> setNumber(e.target.value)}
                  className="form-input"
                  value={number}
                  name="number"
                />
              </td>
            </tr>
            <tr>
              <td className='tableData'>
              <label>Funding Source</label>
                <input
                  type="text" 
                  onChange={e=> setFunding(e.target.value)}
                  className="form-input"
                  value={funding}
                  name="funding"
                />
              </td>
              <td className='tableData'>
              <label>Customer</label>
                <input
                  type="text" 
                  id="customer" 
                  onChange={e=> setCustomer(e.target.value)}
                  className="form-input"
                  value={customer}
                  name="customer"
                />
              </td>
            </tr>

            <tr>
              <td className='tableData'>
              <label>Contractor</label>
                <input
                  type="text" 
                  id="contractor" 
                  onChange={e=> setContractor(e.target.value)}
                  className="form-input"
                  value={contractor}
                  name="contractor"
                />
              </td>
              <td className='tableData'>
              <label>PM</label>
                <input
                  type="text" 
                  id="PM" 
                  onChange={e=> setPM(e.target.value)}
                  className="form-input"
                  value={PM}
                  name="PM"
                />
              </td>
            </tr>

            <tr>
              <td className='tableData'>
              <label>POP</label>
                <input
                  type="text" 
                  id="POP" 
                  onChange={e=> setPOP(e.target.value)}
                  className="form-input"
                  value={POP}
                  name="POP"
                />
              </td>
              <td className='tableData' style={{width:'50%'}}>
                {/* <span style={{paddingRight:'8px'}}>Award Date</span> */}
                <label>Award Date</label>
                <br/>
                <DatePickerTool 
                  date={awardDate} 
                  setDate={setAwardDate} 
                  className='new-project-datePicker'
                />
              </td>
            </tr>

            <tr>
            <td className='tableData'>
              <label>Phase</label>
              <Select
                defaultValue={initPhase}
                label="phase"
                options={phaseOptions}
                styles={colourStyles}
                id="phase"
                onChange={handlePhaseChange}
              />
              </td>
              <td className='tableData'>
              <label>Status</label>
              <Select
                defaultValue={initStatus}
                label="phase"
                options={statusOptions}
                styles={colourStyles}
                id="phase"
                onChange={handleStatusChange}
              />
              </td>
            </tr>

            <tr>
            <td className='tableData' colSpan="2">
              <label>Status Comment</label>
                <input
                  type="text" 
                  id="statusComment" 
                  onChange={e=> setStatusComment(e.target.value)}
                  className="form-input"
                  value={statusComment}
                  name="statusComment"
                />
              </td>
            </tr>
          </tbody>
          </table>     
          <div className="input-field" style={{width:'70%', margin:'30px auto'}}>
            <button style={{width:'250px'}} className={validateForm() ? "btn btn-block" : "disabledBtn"} disabled={!validateForm()}>UPDATE</button>
          </div>
        </form>
      </div> 
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
    const projectName = ownProps.match.params.projectName;
    //make a call to the database for this project 
    const project = state.project.projects ? 
    state.project.projects.find(p=>p.projectName===projectName):
    null
    console.log('found:', project)
    return {
      project
    }
}

const mapDispatchToProps = (dispatch) => {
  return{
    createProject: (project) => dispatch(createProject(project))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProject);
