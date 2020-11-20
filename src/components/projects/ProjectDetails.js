import React, {useState} from 'react'
import {connect} from 'react-redux'
import FileDialog from '../layout/OpenFile'
import {Link} from 'react-router-dom';

const ProjectDetails = ({project, isAdmin}) => {
    const plusIconClass = "folderIcon far fa-plus-square "
    const minusIconClass = "folderIcon far fa-minus-square"
    // fas fa-folder-plus fas fa-folder-minus
    
    const [showI, setShowI]= useState(false);
    const [showII, setShowII]= useState(false);
    const [showIII, setShowIII]= useState(false);
    const [showIV, setShowIV]= useState(false);
    const [showV, setShowV]= useState(false);
    const [showVI, setShowVI]= useState(false);
    const [showMisc, setShowMisc]= useState(false);

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

    const handleClick = (e, func, value) => {
        e.preventDefault();
        func(value);
    }

    return (
        <div className="App">
            <div className="project-card project-card p-30 m-30">
            {project && (
                <>
                {
                    isAdmin && (
                        <div className='right'>
                        <Link to={'/edit/' + project.projectName} key={project.projectName}  className='action-icon blue-text'>
                            <i class="fas fa-pencil-alt"></i> <b>UPDATE</b>
                        </Link>
                        <span className='action-icon red-text'><i class="fas fa-trash-alt"></i> DELETE</span>
                        </div>
                    )
                } 
                <h1>{project.projectName}</h1>
                <table id="projectDetails">
                <tbody>
                <tr>
                    <th>Name</th>
                    <th>Number</th>
                    <th>Funding</th>
                    <th>Status</th>
                </tr>
                <tr>
                    <td>
                    {project.name} 
                    </td>
                    <td>
                    {project.number} 
                    </td>
                    <td>
                    {project.funding} 
                    </td>
                    <td>
                        <span className={className}>{statusLabel}</span>
                    </td>
                </tr>
                </tbody>
            </table>     
                </>
            )}
            
            <p 
                onClick={e => handleClick(e, setShowI, !showI)}
                className='folder'
            >
                <i class={showI ? minusIconClass : plusIconClass}></i> 
                PART I: SOURCE DOCUMENTS
            </p>
            {showI && (
                <div className='fileSubList'>
                    <p className='file'>Requirements Approval Document (RAD)</p>
                    <p className='file'>Quality Assurance Surveillance Plan (QASP)</p>
                    <p className='file'>Performance Work Statement(PWS) or Statement of Work (SOW)</p>
                    <p className='file'>Market Research Report</p>
                    <p className='file'>Justification & Approval (J&A)</p>
                    <p className='file'>COR Nomination & Training</p>
                    <p className='file'>Brand Name Justification </p>
                    <p className='file'>AF Form 9</p>
                </div>
            )}

            
            <p 
                onClick={e => handleClick(e, setShowII, !showII)}
                className='folder'
            >
                <i className={showII ? minusIconClass : plusIconClass}></i> 
                PART II: GENERAL CORRESPONDENCE
            </p>
            
            <p 
                onClick={e => handleClick(e, setShowIII, !showIII)}
                className='folder'
            >
                <i className={showIII ? minusIconClass : plusIconClass}></i>
                PART III: PROJECT SUPPORT AGREEMENT
            </p>
            
            <p 
                onClick={e => handleClick(e, setShowIV, !showIV)}
                className='folder'
            >
                <i className={showIV ? minusIconClass : plusIconClass}></i> 
                PART IV: ALLIED SUPPORT CONSTRUCTION
            </p>
            
            <p 
                onClick={e => handleClick(e, setShowV, !showV)}
                className='folder'
            >
                <i className={showV ? minusIconClass : plusIconClass}></i>
                PART V: COMMISSIONING DOCUMENTS
            </p>
            
            <p 
                onClick={e => handleClick(e, setShowVI, !showVI)}
                className='folder'
            >
                <i className={showVI ? minusIconClass : plusIconClass}></i> 
                PART VI: PROJECT PACKAGE/DRAWINGS
            </p>
            
            <p 
                onClick={e => handleClick(e, setShowMisc, !showMisc)}
                className='folder'
            >
                <i className={showMisc ? minusIconClass : plusIconClass}></i> 
                Miscellaneous
            </p>
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
        project,
        isAdmin: state.user.isAdmin
    }
}

export default connect(mapStateToProps)(ProjectDetails);
                