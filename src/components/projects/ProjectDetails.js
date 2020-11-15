import React from 'react'
import {connect} from 'react-redux'

const ProjectDetails = ({project}) => {
    
    return (
        <div className="App">
        <div className='container'>
            <div className="project-card">
            {project && (
                <>
                <p>project name: {project.projectName}</p>
                <p>status:{project.status}</p>
                </>
            )}
            </div>
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

export default connect(mapStateToProps)(ProjectDetails);
                