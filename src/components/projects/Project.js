import React from 'react'

export const Project = ({project}) => {
    let className='';
    let statusLabel = '';

    switch (project.status){
        case 'green':
         className='status status-green'
         statusLabel="G"
            break;
        case 'yellow':
            className='status status-yellow'
            statusLabel="Y"
            break;
        case 'red':
            className='status status-red'
            statusLabel='R'
            break
        default:
            className='status status-unknown'
            statusLabel='U'
    }

    return (
        <div className='project'>
             <div className="status-box">
                <div className={className}>{statusLabel}</div>
            </div>
            <p className="left">{project.title}</p>
        </div>
    )
}

export default Project;