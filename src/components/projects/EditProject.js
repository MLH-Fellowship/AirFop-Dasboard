import React, { useState, useEffect } from 'react'
import {updateProject, getProjectByName} from '../../store/actions/projectActions'
import {connect} from 'react-redux'
import DatePickerTool from '../dashboard/DatePicker'
import Select from 'react-select'

var moment = require('moment');

const EditProject = ({updateProject, project, projectName, getProjectByName}) => {
  
  useEffect(() => {
    if(!project){
      getProjectByName(projectName);
    }else{
      setProjectName(project.project_name);
      // setName(project.name);
      setNumber(project.id);
      setFunding(project.funding_source);
      setAwardDate(project.award_date ? moment(project.award_date).toDate() : null);
      setPop(project.pop);
      setCustomer(project.customer);
      setContractor(project.contractor);
      setPm(project.pm);
      setStatus(project.status);
      setStatusComment(project.status_comment);
    }
  }, [project])
  
  const [project_name, setProjectName] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [funding_source, setFunding] = useState("");
  const [award_date, setAwardDate] = useState(null);
  const [pop, setPop] = useState("");
  const [customer, setCustomer] = useState("");
  const [contractor, setContractor] = useState("");
  const [pm, setPm] = useState("");

  const phaseOptions = [
    { value: '', label: 'Select Phase' },
    { value: 'Pre-award', label: 'Pre-award' },
    { value: 'Exclusion', label: 'Exclusion' },
    { value: 'Closeout', label: 'Closeout' }
  ]
  let initPhase;
  switch (project && project.phase){
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
  // const [phase, setPhase] = useState(initPhase);
  const [phase, setPhase] = useState(phaseOptions[2]);

  const statusOptions = [
    { value: '', label: 'Select Status' },
    { value: 'Green', label: 'Green' },
    { value: 'Yellow', label: 'Yellow' },
    { value: 'Red', label: 'Red' }
  ]

  let initStatus;
  switch (project && project.status){
    case 'Green':
      initStatus = statusOptions[1]; 
      break;
    case 'Yellow':
      initStatus = statusOptions[2];
      break;
    case 'Red':
      initStatus = statusOptions[3];
      break;
    default:
      initStatus = statusOptions[0];
  }

  const [status, setStatus] = useState(initStatus);
  const [status_comment, setStatusComment] = useState(project && project.status_comment ? project.status_comment : "");

  const onSubmit = (e) => {
    e.preventDefault();
    const updatedProject={
      project_name,
      // name,
      phase:phase.value,
      award_date,
      pop,
      customer,
      contractor,
      pm,
      status,
      status_comment,
      project_num:project.id,
      funding_source
    }

    updateProject(project.id,updatedProject); 
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
        {project && (
          <form onSubmit={e=>onSubmit(e)} className='new-project'>
          <h1  style={{width:'70%', margin:'auto', padding:'20px'}}className="grey-text">UPDATE PROJECT: {project_name}</h1>
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
                    value={project_name}
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
                    value={funding_source}
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
                    onChange={e=> setPm(e.target.value)}
                    className="form-input"
                    value={pm}
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
                    onChange={e=> setPop(e.target.value)}
                    className="form-input"
                    value={pop}
                    name="POP"
                  />
                </td>
                <td className='tableData' style={{width:'50%'}}>
                  {/* <span style={{paddingRight:'8px'}}>Award Date</span> */}
                  <label>Award Date</label>
                  <br/>
                  <DatePickerTool 
                    date={award_date} 
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
                    value={status_comment}
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
        )}
        {!project && <h1> No Project found with that id</h1>}
      </div> 
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
    const projectName = ownProps.match.params.projectName;
    return {
      project: state.project.project[0],
      isAdmin: state.user.isAdmin,
      projectName:projectName
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    updateProject: (id, project) => dispatch(updateProject(id, project)),
    getProjectByName: (name) => dispatch(getProjectByName(name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProject);
