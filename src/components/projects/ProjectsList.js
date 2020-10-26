import React from 'react'
import Project from './Project'
// import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

const ProjectsList = ({projects}) => {
    
    return (
        <div >
            {projects && projects.length > 0 && (
                projects.map((project) => 
                    <Link to={'/project/' + project.id} key={project.id} >
                        <Project project={project} />
                    </Link>
                )
            )}
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