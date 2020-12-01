import React, { useState } from 'react'
import {createProject} from '../../store/actions/projectActions'
import {connect} from 'react-redux'
import DatePickerTool from '../dashboard/DatePicker'
import Select from 'react-select'

const CreateProject = ({createProject}) => {
  const [projectName, setProjectName] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [funding, setFunding] = useState("");
  const [phase, setPhase] = useState("");
  const [awardDate, setAwardDate] = useState("");
  const [POP, setPOP] = useState("");
  const [customer, setCustomer] = useState("");
  const [contractor, setContractor] = useState("");
  const [PM, setPM] = useState("");
  const [status, setStatus] = useState("");
  const [statusComment, setStatusComment] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('stat: ', status)
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
    setProjectName(''); setName(''); setNumber(''); setFunding(''); setPhase(''); setAwardDate(''); setPOP(''); setCustomer(''); setContractor(''); setPM(''); setStatus(''); setStatusComment('');
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

  const phaseOptions = [
    { value: '', label: 'Select Phase' },
    { value: 'Pre-award', label: 'Pre-award' },
    { value: 'Exclusion', label: 'Exclusion' },
    { value: 'Closeout', label: 'Closeout' }]
  
    const statusOptions = [
    { value: '', label: 'Select Status' },
    { value: 'green', label: 'Green' },
    { value: 'yellow', label: 'Yellow' },
    { value: 'red', label: 'Red' }]
  
  return (
    <div className="App">
      <div className="card p-30 m-30">
        <form onSubmit={e=>onSubmit(e)} className='new-project'>
          <h1  style={{width:'70%', margin:'auto', padding:'20px'}}className="grey-text">New Project</h1>
          <table id="new-project-table" style={{width:'70%', margin:'auto'}} >
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
                defaultValue={phaseOptions[0]}
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
                defaultValue={statusOptions[0]}
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
            <button style={{width:'250px'}} className={validateForm() ? "btn btn-block" : "disabledBtn"} disabled={!validateForm()}>CREATE</button>
          </div>
        </form>
      </div> 
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return{
    createProject: (project) => dispatch(createProject(project))
  }
}

export default connect(null, mapDispatchToProps)(CreateProject);
