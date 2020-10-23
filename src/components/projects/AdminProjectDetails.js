import React from 'react'
import {connect} from 'react-redux'

const AdminProjectDetails = ({project}) => {
    
    return (
        <div className="App">
        <div className='container'>
            <div className="project-card">
                <p>Update</p>
                <p>id:{project.id}</p>
                <p>title:{project.title}</p>
                <p>status:{project.status}</p>
            </div>
        </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    const projectId = ownProps.match.params.id;
    //make a call to the database for this project 
    const project = state.project.projects ? 
    state.project.projects.find(p=>p.id.toString()===projectId):
    null
    return {
        project
    }
}

export default connect(mapStateToProps)(AdminProjectDetails);
