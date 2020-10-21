import React from 'react'

const ProjectDetails = (props) => {
    const id = props.match.params.id
    
    return (
        <div>
            <h1>this will have detailed information for project {id}</h1>
        </div>
    )
}

export default ProjectDetails
