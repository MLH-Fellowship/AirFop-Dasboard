import React from 'react'
import Project from './Project'
// import { connect } from 'react-redux'
// import {Link} from 'react-router-dom'

const ProjectsList = ({projects}) => {
    
    return (
        <div>
            <table id="projects">
                <tbody>
                <tr>
                    <th>Project Name</th>
                    <th>Funding</th>
                    <th>Phase</th>
                    <th>Award Date</th>
                    <th>POP</th>
                    <th>Customer</th>
                    <th>Contractor</th>
                    <th>PM</th>
                    <th>Status</th>
                    <th>Status Comment</th>
                </tr>
                {projects && projects.length > 0 && (
                    projects.map((project) => 
                        // <Link to={'/project/' + project.projectName} key={project.projectName} >
                            <Project project={project} key={project.projectName}/>
                        // </Link>
                    )
                )}
                </tbody>
            </table>     
        </div>
    )
}

// const mapStateToProps = (state) => {
//     return {
//         projects: state.project.projects
//     }
// }

// export default connect(mapStateToProps)(ProjectsList);
export default ProjectsList;