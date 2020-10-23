import React, { useState } from 'react'
import {createProject} from '../../store/actions/projectActions'
import {connect} from 'react-redux'

const CreateProject = ({createProject}) => {

  const [title, setTitle] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    createProject({title, status:'yellow'});
    setTitle('');
  }

  const validateForm = () => {
    return title.length > 0;
  }
  return (
    <div className="App">
      <form onSubmit={e=>onSubmit(e)} className='card p-30'>
        <div className="input-field">
            <h1 className="grey-text">New Project</h1>
        <label htmlFor="title">Title{' '}</label>
            <input type="text" id="title" required onChange={e=> setTitle(e.target.value)}/>
        </div>
      
        <div className="input-field" style={{width:'350px'}}>
            <button className={validateForm() ? "btn-block" : "disabledBtn"} disabled={!validateForm()}>Create</button>
        </div>
      </form>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return{
    createProject: (project) => dispatch(createProject(project))
  }
}
export default connect(null, mapDispatchToProps)(CreateProject);
