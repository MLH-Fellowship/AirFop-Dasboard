import React, { useState } from 'react'
import {createProject} from '../../store/actions/projectActions'
import {connect} from 'react-redux'
import DatePickerTool from '../dashboard/DatePicker'
import Select from 'react-select'

const CreateProject = ({createProject}) => {
  const [project_name, setProject_name] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [funding_source, setFunding] = useState("");
  const [phase, setPhase] = useState("");
  const [award_date, setAward] = useState("");
  const [pop, setPop] = useState("");
  const [customer, setCustomer] = useState("");
  const [contractor, setContractor] = useState("");
  const [pm, setPm] = useState("");
  const [status, setStatus] = useState("");
  const [status_comment, setStatusComment] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('stat: ', status)
    createProject({
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
      // project_num:4,
      funding_source,
    }); 
    // setProject_name(''); setName(''); setNumber(''); setFunding(''); setPhase(''); setAward(''); setPop(''); setCustomer(''); setContractor(''); setPm(''); setStatus(''); setStatusComment('');
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
    { value: 'Green', label: 'Green' },
    { value: 'Yellow', label: 'Yellow' },
    { value: 'Red', label: 'Red' }]
  
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
                  id="project_name"
                  className="form-input"
                  required 
                  onChange={e=> setProject_name(e.target.value)}
                  value={project_name}
                  placeholder="Project Name (UUID name + number + funding source)" 
                  name="project_name"
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
                  name="funding_source"
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
              <label>pm</label>
                <input
                  type="text" 
                  id="pm" 
                  onChange={e=> setPm(e.target.value)}
                  className="form-input"
                  value={pm}
                  name="pm"
                />
              </td>
            </tr>

            <tr>
              <td className='tableData'>
              <label>pop</label>
                <input
                  type="text" 
                  id="pop" 
                  onChange={e=> setPop(e.target.value)}
                  className="form-input"
                  value={pop}
                  name="pop"
                />
              </td>
              <td className='tableData' style={{width:'50%'}}>
                {/* <span style={{paddingRight:'8px'}}>Award Date</span> */}
                <label>Award Date</label>
                <br/>
                <DatePickerTool 
                  date={award_date} 
                  setDate={setAward} 
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
                  id="status_comment" 
                  onChange={e=> setStatusComment(e.target.value)}
                  className="form-input"
                  value={status_comment}
                  name="status_comment"
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
