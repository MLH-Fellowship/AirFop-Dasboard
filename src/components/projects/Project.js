import React from 'react';
import {Link} from 'react-router-dom';
var moment = require('moment');

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

    const date = project.awardDate ? moment(project.awardDate).format("MM/DD/yyyy") : 'None'
    
    return (
        <>
        <tr>        
            <td>
                {/* {action} */}
                <Link to={'/project/' + project.projectName} key={project.projectName} >
                    {project.projectName}
                </Link> 
            </td>
            <td>{project.funding}</td>
            <td>{project.phase}</td>
            <td>{date}</td>
            <td>{project.pop}</td>
            <td>{project.customer}</td>
            <td>{project.contractor}</td>
            <td>{project.PM}</td>
            <td>
                <span className={className}>{statusLabel}</span>
            </td>
            <td>{project.statusComment}</td>
        </tr>
        </>
    )
}

export default Project;