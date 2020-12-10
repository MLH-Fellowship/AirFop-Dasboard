import React from 'react';
import {Link} from 'react-router-dom';
var moment = require('moment');

export const Project = ({project}) => {
    let className='';
    let statusLabel = '';

    switch (project.status){
        case 'Green':
         className='status status-green'
         statusLabel="G"
            break;
        case 'Yellow':
            className='status status-yellow'
            statusLabel="Y"
            break;
        case 'Red':
            className='status status-red'
            statusLabel='R'
            break
        default:
            className='status status-unknown'
            statusLabel='U'
    }

    const date = project.award_date ? moment(project.award_date).format("MM/DD/yyyy") : 'None'
    
    return (
        <>
        <tr>        
            <td>
                <Link to={'/project/' + project.project_name} key={project.project_name} >
                {/* <Link to={'/project/' + project.id} key={project.id} > */}
                    {project.project_name}
                </Link> 
            </td>
            <td>{project.funding_source}</td>
            <td>{project.phase}</td>
            <td>{date}</td>
            <td>{project.pop}</td>
            <td>{project.customer}</td>
            <td>{project.contractor}</td>
            <td>{project.pm}</td>
            <td>
                <span className={className}>{statusLabel}</span>
            </td>
            <td>{project.status_comment}</td>
        </tr>
        </>
    )
}

export default Project;