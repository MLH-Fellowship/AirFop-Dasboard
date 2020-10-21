import React from 'react'
import Project from './Project'
import { connect } from 'react-redux'

const ProjectsList = ({projects}) => {
    return (
        <div>
            <h1>We are a list of Projects</h1>
            {projects && projects.length > 0 && (
                projects.map((project, idx) => 
                    <Project key={idx} project={project}/>
                )
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        projects: state.projects
    }
}
// const mapDispatchToProps = (dispatch) => {
//     return {
//         updateMsg: (message) => { dispatch(updateMsg(message))}
//     }
// }
export default connect(mapStateToProps)(ProjectsList);