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
        <div style={{clear:'both'}}>
             <div className="status-box">
                <div className={className}>{statusLabel}</div>
            </div>
            <h1 className="left">{project.title}</h1>
        </div>
    )
}

export default Project;